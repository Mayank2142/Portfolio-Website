import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { randomUUID } from 'node:crypto';
import type { ContactInput } from '@portfolio/core';

export type StoredMessage = ContactInput & { id: string; payloadHash: string };
export type Job = { id: string; attempts: number; message: StoredMessage };
export class SubmissionConflict extends Error {}
export interface Store {
  accept(input: ContactInput, hash: string): Promise<{ id: string; duplicate: boolean }>;
  claim(): Promise<Job | null>;
  finish(job: Job, status: 'sent' | 'preview' | 'failed', providerId?: string): Promise<void>;
  retry(job: Job, code: string): Promise<void>;
  health(): Promise<void>;
  close(): Promise<void>;
}
export class SQLiteStore implements Store {
  readonly db: DatabaseSync;
  constructor(path: string) {
    if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true });
    this.db = new DatabaseSync(path);
    this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS messages (id TEXT PRIMARY KEY, submissionKey TEXT UNIQUE NOT NULL, payloadHash TEXT NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL, subject TEXT NOT NULL, message TEXT NOT NULL, createdAt INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS outbox (id TEXT PRIMARY KEY, messageId TEXT UNIQUE NOT NULL REFERENCES messages(id), status TEXT NOT NULL, attempts INTEGER NOT NULL DEFAULT 0, nextAttemptAt INTEGER NOT NULL, providerId TEXT, errorCode TEXT);
      CREATE INDEX IF NOT EXISTS outbox_due ON outbox(status, nextAttemptAt);`);
  }
  async accept(input: ContactInput, hash: string) {
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const existing = this.db
        .prepare('SELECT id,payloadHash FROM messages WHERE submissionKey=?')
        .get(input.submissionId) as { id: string; payloadHash: string } | undefined;
      if (existing) {
        if (existing.payloadHash !== hash)
          throw new SubmissionConflict('This submission key belongs to another message.');
        this.db.exec('COMMIT');
        return { id: existing.id, duplicate: true };
      }
      const id = randomUUID(),
        now = Date.now();
      this.db
        .prepare('INSERT INTO messages VALUES(?,?,?,?,?,?,?,?)')
        .run(
          id,
          input.submissionId,
          hash,
          input.name,
          input.email,
          input.subject,
          input.message,
          now,
        );
      this.db
        .prepare('INSERT INTO outbox(id,messageId,status,nextAttemptAt) VALUES(?,?,?,?)')
        .run(randomUUID(), id, 'pending', now);
      this.db.exec('COMMIT');
      return { id, duplicate: false };
    } catch (error) {
      this.db.exec('ROLLBACK');
      throw error;
    }
  }
  async claim(): Promise<Job | null> {
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const row = this.db
        .prepare(
          `SELECT o.id AS jobId,o.attempts,m.* FROM outbox o JOIN messages m ON m.id=o.messageId WHERE o.status IN ('pending','sending') AND o.nextAttemptAt<=? ORDER BY o.nextAttemptAt LIMIT 1`,
        )
        .get(Date.now()) as Record<string, string | number> | undefined;
      if (!row) {
        this.db.exec('COMMIT');
        return null;
      }
      this.db
        .prepare('UPDATE outbox SET status=?,attempts=attempts+1,nextAttemptAt=? WHERE id=?')
        .run('sending', Date.now() + 90000, row.jobId);
      this.db.exec('COMMIT');
      return {
        id: String(row.jobId),
        attempts: Number(row.attempts) + 1,
        message: {
          id: String(row.id),
          submissionId: String(row.submissionKey),
          payloadHash: String(row.payloadHash),
          name: String(row.name),
          email: String(row.email),
          subject: String(row.subject),
          message: String(row.message),
          website: '',
        },
      };
    } catch (error) {
      this.db.exec('ROLLBACK');
      throw error;
    }
  }
  async finish(job: Job, status: 'sent' | 'preview' | 'failed', providerId?: string) {
    this.db
      .prepare('UPDATE outbox SET status=?,providerId=?,errorCode=NULL WHERE id=?')
      .run(status, providerId ?? null, job.id);
  }
  async retry(job: Job, code: string) {
    this.db
      .prepare('UPDATE outbox SET status=?,errorCode=?,nextAttemptAt=? WHERE id=?')
      .run(
        job.attempts >= 5 ? 'failed' : 'pending',
        code,
        Date.now() + Math.min(3600000, 30000 * 2 ** (job.attempts - 1)),
        job.id,
      );
  }
  async health() {
    this.db.prepare('SELECT 1').get();
  }
  async close() {
    this.db.close();
  }
}

export async function createStore(): Promise<Store> {
  if (process.env.STORAGE_DRIVER === 'postgres') {
    const { PostgreSQLStore } = await import('./store-postgres');
    return new PostgreSQLStore();
  }
  if (process.env.NODE_ENV === 'production')
    throw new Error('Production requires STORAGE_DRIVER=postgres and DATABASE_URL.');
  return new SQLiteStore(process.env.SQLITE_PATH || '.data/portfolio.db');
}
