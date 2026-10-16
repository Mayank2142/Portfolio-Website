import { afterEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { randomUUID } from 'node:crypto';
import { createApp } from '../apps/api/src/app';
import { SQLiteStore } from '../apps/api/src/store';
import { processOne } from '../apps/api/src/worker';

const stores: SQLiteStore[] = [];
function fixture(max = 50) {
  const store = new SQLiteStore(':memory:');
  stores.push(store);
  return { store, app: createApp(store, { rateMax: max }) };
}
function message() {
  return {
    submissionId: randomUUID(),
    name: 'Test Recruiter',
    email: 'test@example.com',
    subject: 'Portfolio enquiry',
    message: 'A test message for checking the portfolio contact workflow.',
    website: '',
  };
}
afterEach(async () => {
  for (const store of stores.splice(0)) await store.close();
  vi.restoreAllMocks();
});
describe('durable contact workflow', () => {
  it('accepts valid messages atomically and deduplicates concurrent retries', async () => {
    const { store, app } = fixture(),
      input = message();
    const [first, second] = await Promise.all([
      request(app).post('/api/contact').send(input),
      request(app).post('/api/contact').send(input),
    ]);
    expect(first.status).toBe(202);
    expect(second.status).toBe(202);
    expect(first.body.id).toBe(second.body.id);
    expect(store.db.prepare('SELECT COUNT(*) AS n FROM messages').get()?.n).toBe(1);
    expect(store.db.prepare('SELECT COUNT(*) AS n FROM outbox').get()?.n).toBe(1);
    expect(first.body.mode).toBe('preview');
  });
  it('rejects invalid fields and honeypot submissions without storing them', async () => {
    const { store, app } = fixture();
    expect(
      (
        await request(app)
          .post('/api/contact')
          .send({ ...message(), email: 'invalid' })
      ).status,
    ).toBe(400);
    expect(
      (
        await request(app)
          .post('/api/contact')
          .send({ ...message(), website: 'bot' })
      ).status,
    ).toBe(400);
    expect(store.db.prepare('SELECT COUNT(*) AS n FROM messages').get()?.n).toBe(0);
  });
  it('detects reuse of a submission key for changed content', async () => {
    const { app } = fixture(),
      input = message();
    await request(app).post('/api/contact').send(input);
    const conflict = await request(app)
      .post('/api/contact')
      .send({ ...input, message: 'This is different content using the same previous key.' });
    expect(conflict.status).toBe(409);
  });
  it('blocks unsupported origins and bounds request size', async () => {
    const { app } = fixture();
    expect(
      (
        await request(app)
          .post('/api/contact')
          .set('Origin', 'https://unrelated.example')
          .send(message())
      ).status,
    ).toBe(403);
    expect(
      (
        await request(app)
          .post('/api/contact')
          .send({ ...message(), message: 'x'.repeat(20000) })
      ).status,
    ).toBe(413);
  });
  it('reports persistence failures instead of claiming acceptance', async () => {
    const { store, app } = fixture();
    vi.spyOn(store, 'accept').mockRejectedValue(new Error('database unavailable'));
    const response = await request(app).post('/api/contact').send(message());
    expect(response.status).toBe(503);
    expect(response.body.status).not.toBe('accepted');
  });
  it('rate limits repeated submissions with an actionable response', async () => {
    const { app } = fixture(2);
    await request(app).post('/api/contact').send(message());
    await request(app).post('/api/contact').send(message());
    const response = await request(app).post('/api/contact').send(message());
    expect(response.status).toBe(429);
    expect(response.body.error).toContain('wait');
  });
  it('records preview processing without invoking external email', async () => {
    const { store, app } = fixture();
    await request(app).post('/api/contact').send(message());
    const delivery = vi.fn(async () => ({ status: 'preview' as const }));
    await processOne(store, delivery);
    expect(delivery).toHaveBeenCalledOnce();
    expect(store.db.prepare('SELECT status FROM outbox').get()?.status).toBe('preview');
    expect(await processOne(store, delivery)).toBe(false);
  });
  it('retries a transient delivery failure and preserves the same message', async () => {
    const { store, app } = fixture();
    await request(app).post('/api/contact').send(message());
    await processOne(store, async () => {
      throw new Error('EMAIL_PROVIDER_503');
    });
    const first = store.db.prepare('SELECT * FROM outbox').get();
    expect(first?.status).toBe('pending');
    expect(first?.attempts).toBe(1);
    store.db.prepare('UPDATE outbox SET nextAttemptAt=?').run(Date.now() - 1);
    await processOne(store, async () => ({ status: 'sent', providerId: 'provider-test-id' }));
    const recovered = store.db.prepare('SELECT * FROM outbox').get();
    expect(recovered?.status).toBe('sent');
    expect(recovered?.attempts).toBe(2);
    expect(recovered?.providerId).toBe('provider-test-id');
  });
  it('leases a job once and recovers it after an interrupted worker', async () => {
    const { store, app } = fixture();
    await request(app).post('/api/contact').send(message());
    const first = await store.claim();
    expect(first).not.toBeNull();
    expect(await store.claim()).toBeNull();
    store.db.prepare('UPDATE outbox SET nextAttemptAt=?').run(Date.now() - 1);
    const recovered = await store.claim();
    expect(recovered?.id).toBe(first?.id);
    expect(recovered?.attempts).toBe(2);
  });
  it('returns links without inventing coding statistics', async () => {
    const { app } = fixture();
    const response = await request(app).get('/api/profiles');
    expect(response.body.metrics).toBeNull();
    expect(response.body.links.leetcode).toContain('Mayank1720');
  });
});
