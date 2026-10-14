import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { projectTypes, site } from '../data/content';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

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

export default function Contact() {
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
    setStatusMessage(`Email app opened — press send there. Nothing was sent automatically.`);
  }

  const errorCount = Object.keys(errors).length;

  return (
    <section id="contact" className="section-min rule-top azh-contact" aria-labelledby="contact-title">
      <div className="wrap-wide">
        <SectionHeading
          index="07"
          eyebrow="Contact"
          title="Tell us what's slowing you down."
          headingId="contact-title"
        />
        <Reveal>
          <div className="contact-min-head azh-contact-head">
            <a className="email-giant azh-contact-email" href={`mailto:${site.email}`} style={{ color: '#0C1B2E', textDecorationColor: '#0C1B2E' }}>
              {site.email}
            </a>
            <p className="lede-min" style={{ fontSize: '1rem', marginTop: '8px' }}>
              A short note is enough — tell us what you&rsquo;re working on and what a good outcome looks like.
            </p>
            <p className="azh-contact-loc" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.85rem', letterSpacing: '0.04em', color: 'rgba(12,27,46,0.68)' }}>{site.location}</p>
            <p className="hint-min" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.85rem', color: 'rgba(12,27,46,0.68)' }}>We reply to genuine enquiries within a few working days.</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <form className="form-min azh-contact-form" onSubmit={onSubmit} noValidate aria-labelledby="enquiry-heading">
            <h3 id="enquiry-heading" style={{ fontFamily: "'Inter Tight', Inter, system-ui, sans-serif", fontSize: '1.15rem', color: '#0C1B2E' }}>
              Quick enquiry
            </h3>
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
            <div className="form-min__grid form-min__grid--2">
              <div className="field-min">
                <label htmlFor="contact-name">Name <i aria-hidden="true">*</i></label>
                <input
                  id="contact-name" name="name" type="text" autoComplete="name" className="input-min"
                  value={form.name} onChange={onChange}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  disabled={isSending}
                />
                {errors.name && <p id="contact-name-error" role="alert" className="error-min">{errors.name}</p>}
              </div>
              <div className="field-min">
                <label htmlFor="contact-email">Email <i aria-hidden="true">*</i></label>
                <input
                  id="contact-email" name="email" type="email" autoComplete="email" className="input-min"
                  value={form.email} onChange={onChange}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  disabled={isSending}
                />
                {errors.email && <p id="contact-email-error" role="alert" className="error-min">{errors.email}</p>}
              </div>
            </div>
            <div className="form-min__grid form-min__grid--2">
              <div className="field-min">
                <label htmlFor="contact-organisation">Organisation (optional)</label>
                <input
                  id="contact-organisation" name="organisation" type="text" autoComplete="organization" className="input-min"
                  value={form.organisation} onChange={onChange} disabled={isSending}
                />
              </div>
              <div className="field-min">
                <label htmlFor="contact-type">Type of project</label>
                <select id="contact-type" name="type" className="input-min" value={form.type} onChange={onChange} disabled={isSending}>
                  {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="field-min">
              <label htmlFor="contact-message">What&rsquo;s slowing you down? <i aria-hidden="true">*</i></label>
              <textarea
                id="contact-message" name="message" rows={5} className="input-min"
                value={form.message} onChange={onChange}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? 'contact-message-error' : 'contact-privacy-note'}
                disabled={isSending}
              />
              {errors.message
                ? <p id="contact-message-error" role="alert" className="error-min">{errors.message}</p>
                : <p id="contact-privacy-note" className="hint-min">Please don&rsquo;t include patient or sensitive personal info.</p>}
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
          <style>{`@keyframes aazhi-spin { to { transform: rotate(360deg); } }
          .azh-contact .btn-ink { background: #0C1B2E; color: #FBFAF7; }
          .azh-contact .btn-ink:hover { background: #16294a; }
          .azh-contact .input-min:focus { border-color: #0C1B2E; background: #FFFFFF; box-shadow: 0 0 0 3px rgba(191, 217, 242, 0.7); }
          .azh-contact .azh-contact-email { color: #0C1B2E; text-decoration-color: #0C1B2E; }
          `}</style>
        </Reveal>
      </div>
    </section>
  );
}
