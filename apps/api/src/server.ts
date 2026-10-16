import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createStore } from './store';
import { createApp } from './app';
import { startWorker } from './worker';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
config({ path: path.join(root, '.env'), quiet: true });
process.env.SQLITE_PATH = path.resolve(root, process.env.SQLITE_PATH || '.data/portfolio.db');
const store = await createStore();
const webDir = path.join(root, 'apps/web/build/client');
const app = createApp(store, {
  webDir,
  origin: process.env.APP_ORIGIN || process.env.RENDER_EXTERNAL_URL || 'http://localhost:5173',
  emailMode: process.env.EMAIL_MODE || 'preview',
});
const server = app.listen(Number(process.env.PORT || 3001), process.env.HOST || '127.0.0.1', () =>
  console.log(
    `Portfolio API: http://${process.env.HOST || '127.0.0.1'}:${process.env.PORT || 3001} (${process.env.EMAIL_MODE || 'preview'} email mode)`,
  ),
);
const stopWorker = startWorker(store);
for (const signal of ['SIGTERM', 'SIGINT'] as const)
  process.on(signal, () => {
    stopWorker();
    server.close(() => {
      void store.close().then(() => process.exit(0));
    });
  });
