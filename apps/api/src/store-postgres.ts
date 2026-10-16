import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { randomUUID } from 'node:crypto';
import type { ContactInput } from '@portfolio/core';
import { SubmissionConflict, type Job, type Store } from './store';
export class PostgreSQLStore implements Store {
  private db = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });
  async accept(input: ContactInput, hash: string) {
    try {
      const record = await this.db.contactMessage.create({
        data: {
          id: randomUUID(),
          submissionKey: input.submissionId,
          payloadHash: hash,
          name: input.name,
          email: input.email,
          subject: input.subject,
          message: input.message,
          outbox: { create: { id: randomUUID() } },
        },
      });
      return { id: record.id, duplicate: false };
    } catch (error) {
      const record = await this.db.contactMessage.findUnique({
        where: { submissionKey: input.submissionId },
      });
      if (!record) throw error;
      if (record.payloadHash !== hash)
        throw new SubmissionConflict('This submission key belongs to another message.');
      return { id: record.id, duplicate: true };
    }
  }
  async claim(): Promise<Job | null> {
    return this.db.$transaction(async (tx) => {
      const rows = await tx.$queryRaw<
        Array<{ id: string }>
      >`SELECT id FROM "EmailOutbox" WHERE status IN ('pending','sending') AND "nextAttemptAt"<=NOW() ORDER BY "nextAttemptAt" FOR UPDATE SKIP LOCKED LIMIT 1`;
      if (!rows.length) return null;
      const job = await tx.emailOutbox.update({
        where: { id: rows[0].id },
        data: {
          status: 'sending',
          attempts: { increment: 1 },
          nextAttemptAt: new Date(Date.now() + 90000),
        },
        include: { message: true },
      });
      return {
        id: job.id,
        attempts: job.attempts,
        message: { ...job.message, submissionId: job.message.submissionKey, website: '' },
      };
    });
  }
  async finish(job: Job, status: 'sent' | 'preview' | 'failed', providerId?: string) {
    await this.db.emailOutbox.update({
      where: { id: job.id },
      data: { status, providerId, errorCode: null },
    });
  }
  async retry(job: Job, code: string) {
    await this.db.emailOutbox.update({
      where: { id: job.id },
      data: {
        status: job.attempts >= 5 ? 'failed' : 'pending',
        errorCode: code,
        nextAttemptAt: new Date(Date.now() + Math.min(3600000, 30000 * 2 ** (job.attempts - 1))),
      },
    });
  }
  async health() {
    await this.db.$queryRaw`SELECT 1`;
  }
  async close() {
    await this.db.$disconnect();
  }
}
