import type { Request, Response } from 'express';
import { waitUntil } from '@vercel/functions';
import { createApp } from './app';
import { PostgreSQLStore } from './store-postgres';
import { processOne } from './worker';
import type { Store } from './store';

const unavailable = async (): Promise<never> => { throw new Error('DATABASE_NOT_CONFIGURED'); };
const unavailableStore: Store = {
  accept: unavailable, claim: unavailable, finish: unavailable,
  retry: unavailable, health: unavailable, close: async () => {},
};
const store = process.env.DATABASE_URL ? new PostgreSQLStore() : unavailableStore;
const hostname = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const origin = process.env.APP_ORIGIN || (hostname ? `https://${hostname}` : 'http://localhost:3001');
const app = createApp(store, { origin, emailMode: process.env.EMAIL_MODE || 'preview' });

async function drainOutbox() {
  try {
    // Bounded work fits within a request lifetime. The durable lease prevents
    // concurrent function instances from processing the same job.
    for (let count = 0; count < 2; count++) {
      if (!(await processOne(store))) break;
    }
  } catch {
    console.error(JSON.stringify({ event: 'serverless_worker_failed' }));
  }
}

export default function handler(req: Request, res: Response) {
  if (req.method === 'POST' && req.url?.split('?')[0] === '/api/contact') {
    res.once('finish', () => {
      if (res.statusCode === 202) waitUntil(drainOutbox());
    });
  }
  app(req, res);
}
