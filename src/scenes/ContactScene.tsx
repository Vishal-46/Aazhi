import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { projectTypes, site } from '../data/content';

type FormState = { name: string; email: string; organisation: string; type: string; message: string };
type FormErrors = Partial<Record<'name' | 'email' | 'message', string>>;
type StatusKind = 'idle' | 'sending' | 'sent' | 'mailto-info' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();
  if (name === '') errors.name = 'Please enter your name.';
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.';
  if (email === '') errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  if (message === '') errors.message = 'Please describe your problem or project.';
  else if (message.length < 10) errors.message = 'Message must be at least 10 characters.';
  return errors;
}

export default function ContactScene() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', organisation: '', type: projectTypes[0] ?? '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<StatusKind>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const isSending = status === 'sending';

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (attempted) setErrors(validate({ ...form, [key]: value }));
  }
  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    update(e.target.name as keyof FormState, e.target.value);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAttempted(true);
    const next = validate(form);
    setErrors(next);
    setStatusMessage('');
    if (Object.keys(next).length > 0) {
      setStatus('idle');
      return;
    }
    const endpoint = ((import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined) ?? '').trim();
    if (endpoint !== '') {
      setStatus('sending');
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: form.name.trim(), email: form.email.trim(),
            organisation: form.organisation.trim(), type: form.type, message: form.message.trim(),
          }),
        });
        if (res.ok) {
          setStatus('sent');
          setStatusMessage('Thank you — sent. We reply to genuine enquiries within a few working days.');
          setForm({ name: '', email: '', organisation: '', type: projectTypes[0] ?? '', message: '' });
          setErrors({});
          setAttempted(false);
        } else {
          setStatus('error');
          setStatusMessage(`Could not send just now — please email us directly at ${site.email}.`);
        }
      } catch {
        setStatus('error');
        setStatusMessage(`Could not send just now — please email us directly at ${site.email}.`);
      }
      return;
    }
    const subject = `Project enquiry from ${form.name.trim()}${form.type ? ` — ${form.type}` : ''}`;
    const lines = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      form.organisation.trim() !== '' ? `Organisation: ${form.organisation.trim()}` : null,
      form.type !== '' ? `Project type: ${form.type}` : null,
      '',
      form.message.trim(),
    ].filter((l): l is string => l !== null);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    setStatus('mailto-info');
    setStatusMessage('Email app opened — press send there. Nothing was sent automatically.');
  }

  const errorCount = Object.keys(errors).length;

  return (
    <section className="cine-scene" aria-label="Contact">
      <div className="cine-inner">
        <p className="cine-eyebrow cine-rise" style={{ ['--d' as string]: '0ms' }}>
          <span className="cine-eyebrow__num">05</span> Contact · One inbox, founder replies
        </p>
        <div className="cine-contact-grid">
          <div>
            <h1 className="cine-display cine-display--sm">
              <span className="cine-line"><span style={{ ['--d' as string]: '70ms' }}>Tell us what&apos;s</span></span>
              <span className="cine-line"><span style={{ ['--d' as string]: '150ms' }}>slowing you down.</span></span>
            </h1>
            <p className="cine-rise" style={{ ['--d' as string]: '230ms', marginTop: '22px' }}>
              <a className="cine-email" href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p className="cine-lede cine-rise" style={{ ['--d' as string]: '290ms' }}>
              A short note is enough — tell us what you&apos;re working on and what a good
              outcome looks like. {site.location}. We reply within a few working days.
            </p>
            <p className="cine-rise" style={{ ['--d' as string]: '340ms', marginTop: '14px', fontSize: '0.82rem', color: 'var(--faint)' }}>
              Please don&apos;t include patient or sensitive personal info. This site collects nothing by default.
            </p>
          </div>

          <form className="cine-form cine-rise" style={{ ['--d' as string]: '260ms' }} onSubmit={onSubmit} noValidate aria-labelledby="enquiry-heading">
            <h3 id="enquiry-heading">Quick enquiry</h3>
            {attempted && errorCount > 0 && (
              <div role="alert" className="status-min status-min--err">
                Please fix {errorCount} {errorCount === 1 ? 'field' : 'fields'} below.
              </div>
            )}
            {statusMessage !== '' && (
              <div
                role={status === 'error' ? 'alert' : 'status'}
                aria-live="polite"
                className={`status-min${status === 'sent' ? ' status-min--ok' : status === 'error' ? ' status-min--err' : ''}`}
              >
                {statusMessage}
              </div>
            )}
            <div className="cine-form__grid cine-form__grid--2">
              <div className="field-min">
                <label htmlFor="cine-name">Name <i aria-hidden="true">*</i></label>
                <input
                  id="cine-name" name="name" type="text" autoComplete="name" className="input-min"
                  value={form.name} onChange={onChange}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? 'cine-name-error' : undefined}
                  disabled={isSending}
                />
                {errors.name && <p id="cine-name-error" role="alert" className="error-min">{errors.name}</p>}
              </div>
              <div className="field-min">
                <label htmlFor="cine-email">Email <i aria-hidden="true">*</i></label>
                <input
                  id="cine-email" name="email" type="email" autoComplete="email" className="input-min"
                  value={form.email} onChange={onChange}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'cine-email-error' : undefined}
                  disabled={isSending}
                />
                {errors.email && <p id="cine-email-error" role="alert" className="error-min">{errors.email}</p>}
              </div>
            </div>
            <div className="cine-form__grid cine-form__grid--2">
              <div className="field-min">
                <label htmlFor="cine-org">Organisation (optional)</label>
                <input
                  id="cine-org" name="organisation" type="text" autoComplete="organization" className="input-min"
                  value={form.organisation} onChange={onChange} disabled={isSending}
                />
              </div>
              <div className="field-min">
                <label htmlFor="cine-type">Type of project</label>
                <select id="cine-type" name="type" className="input-min" value={form.type} onChange={onChange} disabled={isSending}>
                  {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="field-min">
              <label htmlFor="cine-message">What&apos;s slowing you down? <i aria-hidden="true">*</i></label>
              <textarea
                id="cine-message" name="message" rows={4} className="input-min"
                value={form.message} onChange={onChange}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? 'cine-message-error' : undefined}
                disabled={isSending}
              />
              {errors.message && <p id="cine-message-error" role="alert" className="error-min">{errors.message}</p>}
            </div>
            <div>
              <button type="submit" className="btn-ink" disabled={isSending} aria-busy={isSending}>
                {isSending ? (
                  <><Loader2 size={16} aria-hidden="true" style={{ animation: 'aazhi-spin 1s linear infinite' }} /> Sending…</>
                ) : (
                  <>Send enquiry <ArrowUpRight size={16} aria-hidden="true" /></>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
