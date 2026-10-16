import type { Job, Store } from './store';
export type Delivery = (job: Job) => Promise<{ status: 'sent' | 'preview'; providerId?: string }>;
export const deliver: Delivery = async (job) => {
  if (process.env.EMAIL_MODE !== 'resend') return { status: 'preview' };
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM || !process.env.EMAIL_TO)
    throw new Error('EMAIL_NOT_CONFIGURED');
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `portfolio-${job.id}`,
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: [process.env.EMAIL_TO],
      reply_to: job.message.email,
      subject: `Portfolio enquiry: ${job.message.subject}`,
      text: `From: ${job.message.name}\nReply: ${job.message.email}\n\n${job.message.message}`,
    }),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`EMAIL_PROVIDER_${response.status}`);
  const result = (await response.json()) as { id: string };
  return { status: 'sent', providerId: result.id };
};
export async function processOne(store: Store, delivery: Delivery = deliver) {
  const job = await store.claim();
  if (!job) return false;
  try {
    const result = await delivery(job);
    await store.finish(job, result.status, result.providerId);
  } catch (error) {
    const code =
      error instanceof Error && /^EMAIL_/.test(error.message)
        ? error.message
        : 'DELIVERY_UNAVAILABLE';
    await store.retry(job, code);
  }
  return true;
}
export function startWorker(store: Store) {
  let busy = false;
  const tick = async () => {
    if (busy) return;
    busy = true;
    try {
      for (let i = 0; i < 10; i++) {
        if (!(await processOne(store))) break;
      }
    } catch {
      console.error(JSON.stringify({ event: 'worker_failed' }));
    } finally {
      busy = false;
    }
  };
  const timer = setInterval(tick, 5000);
  timer.unref();
  void tick();
  return () => clearInterval(timer);
}
