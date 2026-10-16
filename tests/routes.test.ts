import { afterAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import path from 'node:path';
import { createApp } from '../apps/api/src/app';
import { SQLiteStore } from '../apps/api/src/store';
const store = new SQLiteStore(':memory:');
const app = createApp(store, {
  webDir: path.resolve('apps/web/build/client'),
  origin: 'https://portfolio.example',
});
afterAll(() => store.close());
describe('compiled route delivery', () => {
  it('delivers case-study HTML on direct loads with and without trailing slashes', async () => {
    for (const route of ['/projects/cinebook', '/projects/cinebook/']) {
      const response = await request(app).get(route);
      expect(response.status).toBe(200);
      expect(response.text).toContain('CineBook | Mayank Gupta');
      expect(response.text).toContain('https://portfolio.example/social/cinebook.png');
      expect(response.text).toContain(
        'rel="canonical" href="https://portfolio.example/projects/cinebook"',
      );
    }
  });
  it('returns real 404 responses for missing pages and does not expose contact data', async () => {
    expect((await request(app).get('/missing-page')).status).toBe(404);
    expect((await request(app).get('/api/messages')).status).toBe(404);
    expect((await request(app).get('/projects/smartchat')).status).toBe(404);
  });
  it('serves the resume and pre-rendered loader data independently of database state', async () => {
    expect((await request(app).get('/resume.pdf')).headers['content-type']).toContain(
      'application/pdf',
    );
    const data = await request(app).get('/projects/cinebook.data');
    expect(data.status).toBe(200);
    expect(data.headers['cache-control']).toBe('no-cache');
  });
  it('generates a sitemap for the configured public origin', async () => {
    const response = await request(app).get('/sitemap.xml');
    expect(response.status).toBe(200);
    expect(response.text).toContain('https://portfolio.example/projects/campusmate');
    expect(response.text).toContain('https://portfolio.example/projects/smart-helmet');
    expect(response.text).not.toContain('smartchat');
  });
});
