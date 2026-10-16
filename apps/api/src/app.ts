import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { randomUUID, createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { contactSchema, profile, projects } from '@portfolio/core';
import { SubmissionConflict, type Store } from './store';

export function createApp(
  store: Store,
  {
    webDir,
    origin = 'http://localhost:5173',
    emailMode = 'preview',
    rateMax = 5,
  }: { webDir?: string; origin?: string; emailMode?: string; rateMax?: number } = {},
) {
  const app = express();
  app.disable('x-powered-by');
  if (process.env.TRUST_PROXY === '1') app.set('trust proxy', 1);
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:'],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
        },
      },
    }),
  );
  app.use((req, res, next) => {
    const id = randomUUID();
    res.setHeader('X-Request-Id', id);
    res.on('finish', () => {
      if (req.path.startsWith('/api'))
        console.info(
          JSON.stringify({
            requestId: id,
            method: req.method,
            path: req.path,
            status: res.statusCode,
          }),
        );
    });
    next();
  });
  app.use(express.json({ limit: '16kb' }));
  app.get('/api/health/live', (_req, res) => res.json({ status: 'ok' }));
  app.get('/api/health/ready', async (_req, res) => {
    try {
      await store.health();
      const configured =
        emailMode === 'preview' ||
        !!(process.env.RESEND_API_KEY && process.env.EMAIL_FROM && process.env.EMAIL_TO);
      res
        .status(configured ? 200 : 503)
        .json({ status: configured ? 'ready' : 'unavailable', emailMode });
    } catch {
      res.status(503).json({ status: 'unavailable' });
    }
  });
  app.get('/api/profiles', (_req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.json({
      links: {
        github: profile.github,
        linkedin: profile.linkedin,
        leetcode: profile.leetcode,
        codolio: profile.codolio,
      },
      metrics: null,
      source: 'user-supplied profile links',
      updatedAt: '2026-10-14',
      status: 'links-only',
    });
  });
  app.post(
    '/api/contact',
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: rateMax,
      standardHeaders: 'draft-7',
      legacyHeaders: false,
      handler: (_req, res) =>
        res
          .status(429)
          .json({ error: 'Too many messages. Please wait a little or email me directly.' }),
    }),
    async (req, res) => {
      if (req.get('origin') && req.get('origin') !== origin) {
        res.status(403).json({ error: 'This request came from an unsupported origin.' });
        return;
      }
      const parsed = contactSchema.safeParse(req.body);
      if (!parsed.success) {
        res
          .status(400)
          .json({
            error: 'Please check the message fields.',
            fields: parsed.error.flatten().fieldErrors,
          });
        return;
      }
      if (parsed.data.website) {
        res.status(400).json({ error: 'The message could not be accepted.' });
        return;
      }
      const input = parsed.data;
      const hash = createHash('sha256')
        .update(JSON.stringify([input.name, input.email, input.subject, input.message]))
        .digest('hex');
      try {
        const accepted = await store.accept(input, hash);
        res
          .status(202)
          .json({
            id: accepted.id,
            duplicate: accepted.duplicate,
            status: 'accepted',
            mode: emailMode,
          });
      } catch (error) {
        if (error instanceof SubmissionConflict) {
          res
            .status(409)
            .json({
              error:
                'Your message changed after a previous submission. Please start a new message.',
            });
        } else {
          res
            .status(503)
            .json({ error: 'The message could not be saved. Please retry or email me directly.' });
        }
      }
    },
  );
  app.use('/api', (_req, res) => res.status(404).json({ error: 'Endpoint not found.' }));
  if (webDir && existsSync(webDir)) {
    app.use(
      '/assets',
      express.static(path.join(webDir, 'assets'), { immutable: true, maxAge: '1y' }),
    );
    app.use(
      express.static(webDir, {
        index: false,
        redirect: false,
        maxAge: '1h',
        setHeaders: (res, file) => {
          if (file.endsWith('.data')) res.setHeader('Cache-Control', 'no-cache');
        },
      }),
    );
    app.get('/sitemap.xml', (_req, res) => {
      const urls = ['/', '/projects', ...projects.map((p) => `/projects/${p.slug}`)];
      res
        .type('application/xml')
        .send(
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${origin.replaceAll('&', '&amp;')}${url}</loc></url>`).join('')}</urlset>`,
        );
    });
    app.use((req, res, next) => {
      if (req.method !== 'GET' || !req.accepts('html')) {
        next();
        return;
      }
      const routePath = req.path === '/' ? '/' : req.path.replace(/\/+$/, '');
      const page = path.join(webDir, routePath.replace(/^\//, ''), 'index.html');
      const allowed =
        routePath === '/' ||
        routePath === '/projects' ||
        projects.some((p) => routePath === `/projects/${p.slug}`);
      if (allowed && existsSync(page)) {
        let html = readFileSync(page, 'utf8');
        const full = origin.replace(/\/$/, '');
        html = html.replace(
          /(<meta property="og:image" content=")\/social\/([a-z0-9-]+\.png)/,
          `$1${full}/social/$2`,
        );
        html = html.replace(
          '</head>',
          `<link rel="canonical" href="${full}${routePath}"/><meta property="og:url" content="${full}${routePath}"/></head>`,
        );
        res.type('html').send(html);
        return;
      }
      if (!allowed) {
        const fallback = path.join(webDir, '__spa-fallback.html');
        if (existsSync(fallback)) {
          res.status(404).type('html').send(readFileSync(fallback, 'utf8'));
          return;
        }
      }
      next();
    });
  }
  app.use((_req, res) => res.status(404).json({ error: 'Not found' }));
  app.use(
    (
      error: Error & { status?: number },
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      res
        .status(error.status === 413 ? 413 : 400)
        .json({
          error:
            error.status === 413 ? 'This message is too large.' : 'The request could not be read.',
        });
    },
  );
  return app;
}
