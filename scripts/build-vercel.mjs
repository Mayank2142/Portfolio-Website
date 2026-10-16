import { spawnSync } from 'node:child_process';
import { copyFile, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hostname = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const origin = process.env.APP_ORIGIN || (hostname ? `https://${hostname}` : '');
const environment = {
  ...process.env,
  SITE_BASE_PATH: '',
  VITE_STATIC_CONTACT: process.env.DATABASE_URL ? '' : 'email',
  VITE_PUBLIC_ORIGIN: origin,
};
function run(args) {
  const result = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', args, {
    cwd: repository, env: environment, stdio: 'inherit', shell: process.platform === 'win32',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}
run(['run', 'build']);
if (process.env.DATABASE_URL) run(['run', 'db:deploy']);

const client = path.join(repository, 'apps/web/build/client');
await copyFile(path.join(client, '__spa-fallback.html'), path.join(client, '404.html'));
if (origin) {
  const safeOrigin = new URL(origin).origin;
  const slugs = (await readdir(path.join(client, 'projects'), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  const routes = ['/', '/projects', ...slugs.map((slug) => `/projects/${slug}`)];
  for (const route of routes) {
    const file = path.join(client, route.slice(1), 'index.html');
    const html = await readFile(file, 'utf8');
    await writeFile(file, html.replace('</head>', `<link rel="canonical" href="${safeOrigin}${route}"/><meta property="og:url" content="${safeOrigin}${route}"/></head>`));
  }
  await writeFile(path.join(client, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${safeOrigin}${route}</loc></url>`).join('')}</urlset>`);
}
