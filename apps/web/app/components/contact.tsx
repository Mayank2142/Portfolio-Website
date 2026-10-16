import { useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Check, Copy, LoaderCircle } from 'lucide-react';
import { contactSchema, profile } from '@portfolio/core';
export function Contact() {
  const [copied, setCopied] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');
  const [failed, setFailed] = useState(false);
  const submission = useRef<string | null>(null);
  const form = useRef<HTMLFormElement>(null);
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setStatus('Copy was unavailable. You can select the email address or open your email app.');
    }
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setErrors({});
    setStatus('');
    setFailed(false);
    submission.current ||= crypto.randomUUID();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = contactSchema.safeParse({ ...data, submissionId: submission.current });
    if (!parsed.success) {
      const fields: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        fields[String(issue.path[0])] = issue.message;
      });
      setErrors(fields);
      const field = Object.keys(fields)[0];
      form.current?.querySelector<HTMLInputElement>(`[name="${field}"]`)?.focus();
      return;
    }
    setPending(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok) {
        if (response.status === 409) submission.current = null;
        throw new Error(
          result.error ||
            'The message could not be received. Please try again or email me directly.',
        );
      }
      setStatus(
        result.mode === 'preview'
          ? 'Saved locally for preview. Email delivery is not enabled in this environment. Please email me directly for real enquiries.'
          : 'Message received for delivery. Thanks for reaching out.',
      );
      form.current?.reset();
      submission.current = null;
    } catch (error) {
      setFailed(true);
      setStatus(
        error instanceof Error && error.name === 'TimeoutError'
          ? 'The request timed out. Retry safely, or email me directly.'
          : error instanceof Error
            ? error.message
            : 'Connection unavailable. Please email me directly.',
      );
    } finally {
      setPending(false);
    }
  }
  return (
    <section className="contact-section section shell" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">
          <span>08</span> / LET’S CONNECT
        </p>
        <h2>
          Have something
          <br />
          <em>in mind</em><span className="cyan">?</span>
        </h2>
        <p>
          A thoughtful product. A difficult engineering problem. Or simply a conversation about what
          comes next.
        </p>
        <div className="email-line">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <button
            onClick={copy}
            className="icon-button"
            aria-label={copied ? 'Email copied' : 'Copy email address'}
          >
            {copied ? <Check size={17} /> : <Copy size={17} />}
          </button>
        </div>
        <span className="copy-feedback mono" role="status">
          {copied ? 'EMAIL COPIED' : ''}
        </span>
        <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">
          Find me on LinkedIn <ArrowUpRight size={15} />
        </a>
      </div>
      <form ref={form} className="contact-form" onSubmit={submit} noValidate>
        <div className="form-row">
          <Field name="name" label="Your name" placeholder={profile.name} error={errors.name} />
          <Field
            name="email"
            label="Email address"
            type="email"
            placeholder={profile.email}
            error={errors.email}
          />
        </div>
        <Field
          name="subject"
          label="What’s on your mind?"
          placeholder="An opportunity, an idea, a hello…"
          error={errors.subject}
        />
        <div className="field">
          <label htmlFor="message">A little more detail</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell me about it…"
            rows={4}
            maxLength={5000}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <span className="field-error" id="message-error">
              {errors.message}
            </span>
          )}
        </div>
        <div className="honeypot" aria-hidden="true">
          <label>
            Leave this empty
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div className="form-bottom">
          <button className="button primary" type="submit" disabled={pending}>
            {pending ? (
              <>
                <LoaderCircle size={17} className="spin" /> Receiving…
              </>
            ) : (
              <>
                Send message <ArrowRight size={17} />
              </>
            )}
          </button>
        </div>
        <p
          className={`form-status ${failed ? 'form-error' : ''}`}
          role={failed ? 'alert' : 'status'}
        >
          {status}
        </p>
      </form>
    </section>
  );
}
function Field({
  name,
  label,
  placeholder,
  type = 'text',
  error,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  error?: string;
}) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        maxLength={name === 'email' ? 254 : name === 'name' ? 100 : 160}
        autoComplete={name === 'name' ? 'name' : name === 'email' ? 'email' : 'off'}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <span id={`${name}-error`} className="field-error">
          {error}
        </span>
      )}
    </div>
  );
}
