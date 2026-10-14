import { useLayoutEffect, useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '../lib/splitText';
import { brand, contact } from '../content';
import '../forms.css';

gsap.registerPlugin(ScrollTrigger);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = { name?: string; email?: string; message?: string };
type StatusState = { kind: 'idle' | 'info' | 'ok' | 'error'; text: string };
type BtnState = 'idle' | 'sending' | 'sent' | 'failed';

export default function Contact() {
  const rootRef = useRef<HTMLElement | null>(null);
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<StatusState>({ kind: 'idle', text: '' });
  const [btnState, setBtnState] = useState<BtnState>('idle');

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const splitHeadings: Array<{ el: HTMLElement; original: string }> = [];

    const ctx = gsap.context(() => {
      // Contact title char-split scrub (mirrors initContactAnimations).
      const contactTitle = root.querySelector<HTMLElement>('.contact-main-title');
      if (contactTitle) {
        splitHeadings.push({ el: contactTitle, original: contactTitle.textContent ?? '' });
        try {
          const titleSplit = SplitText.create(contactTitle, { type: 'chars', charsClass: 'char' });
          titleSplit.chars.forEach((char, i) => {
            const charInitialY = i % 2 === 0 ? -100 : 100;
            gsap.set(char, { y: charInitialY, opacity: 0 });
          });
          ScrollTrigger.create({
            trigger: contactTitle,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
            onUpdate: (self) => {
              titleSplit.chars.forEach((char, i) => {
                const charProgress = Math.min(1, Math.max(0, (self.progress - i * 0.02) * 2));
                const charInitialY = i % 2 === 0 ? -100 : 100;
                gsap.set(char, {
                  y: charInitialY - charProgress * charInitialY,
                  opacity: charProgress,
                });
              });
            },
          });
        } catch {
          // ignore: heading stays readable without the split effect
        }
      }

      const contactSubtitle = root.querySelector<HTMLElement>('.contact-subtitle');
      if (contactSubtitle) {
        gsap.fromTo(
          contactSubtitle,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contactSubtitle,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }

      const contactCards = Array.from(root.querySelectorAll<HTMLElement>('.contact-card'));
      contactCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      const formWrapper = root.querySelector<HTMLElement>('.contact-form-wrapper');
      if (formWrapper) {
        const tlForm = gsap.timeline({
          scrollTrigger: {
            trigger: formWrapper,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          },
        });
        tlForm.fromTo(
          formWrapper,
          { opacity: 0, y: 50, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
        );
      }

      const socialSection = root.querySelector<HTMLElement>('.contact-social');
      if (socialSection) {
        gsap.fromTo(
          socialSection,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: socialSection,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
          },
        );

        const socialLinks = Array.from(socialSection.querySelectorAll<HTMLElement>('.social-link'));
        socialLinks.forEach((link, index) => {
          gsap.fromTo(
            link,
            { opacity: 0, y: 20, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              delay: index * 0.1,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: socialSection,
                start: 'top 97%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        });
      }

      ScrollTrigger.refresh();
    }, root);

    return () => {
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
      ctx.revert();
      splitHeadings.forEach(({ el, original }) => {
        try {
          el.textContent = original;
        } catch {
          // ignore
        }
      });
    };
  }, []);

  function later(fn: () => void, ms: number): void {
    timers.current.push(setTimeout(fn, ms));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      subject: String(data.get('subject') ?? ''),
      message: String(data.get('message') ?? ''),
    };

    const nextErrors: FieldErrors = {};
    if (!values.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!values.email.trim()) nextErrors.email = 'Please enter your email address.';
    else if (!EMAIL_RE.test(values.email.trim())) nextErrors.email = 'Please enter a valid email address.';
    if (!values.message.trim()) nextErrors.message = 'Please enter a message.';
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.email || nextErrors.message) {
      setStatus({ kind: 'error', text: 'Please fix the highlighted fields and try again.' });
      return;
    }

    setBtnState('sending');
    const env = import.meta.env as unknown as Record<string, string | boolean | undefined>;
    const rawEndpoint = env.VITE_FORMSPREE_ENDPOINT;
    const endpoint = typeof rawEndpoint === 'string' && rawEndpoint.length > 0 ? rawEndpoint : null;

    if (!endpoint) {
      const subject = values.subject.trim()
        ? `${values.subject.trim()} \u2014 ${values.name.trim()}`
        : `Website enquiry from ${values.name.trim()}`;
      const body = `${values.message.trim()}\n\n\u2014 ${values.name.trim()} (${values.email.trim()})`;
      window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ kind: 'info', text: 'Opening your email app to send the message.' });
      later(() => {
        setBtnState('idle');
      }, 1200);
      return;
    }

    try {
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      });
      if (!resp.ok) throw new Error(`Request failed with status ${resp.status}`);

      try {
        if (submitRef.current) {
          gsap.to(submitRef.current, { scale: 0.98, duration: 0.08, yoyo: true, repeat: 1 });
        }
      } catch {
        // ignore
      }
      setBtnState('sent');
      setStatus({ kind: 'ok', text: 'Message sent. We reply to genuine enquiries within a few working days.' });
      later(() => {
        form.reset();
        setErrors({});
        setBtnState('idle');
        setStatus({ kind: 'idle', text: '' });
      }, 1200);
    } catch {
      setBtnState('failed');
      setStatus({ kind: 'error', text: `Send failed. Please email us directly at ${brand.email}.` });
      later(() => {
        setBtnState('idle');
      }, 3000);
    }
  }

  const btnLabel =
    btnState === 'sending'
      ? 'Sending...'
      : btnState === 'sent'
        ? 'Message Sent! \u2713'
        : btnState === 'failed'
          ? 'Send Failed'
          : 'Send Message';

  return (
    <section className="contact-section section-container" ref={rootRef}>
      <div className="contact-container">
        <div id="contact" className="portfolio-heading">
          <h2 className="contact-main-title" role="heading" aria-level={2}>
            {contact.heading}
          </h2>
        </div>
        <div className="contact-title-block">
          <p className="contact-subtitle seq">{contact.subtitle}</p>
          <div className="contact-content">
            <div className="contact-info-grid">
              {contact.cards.map((card) => (
                <div className="contact-card seq" data-tilt="" key={card.title}>
                  <div className="contact-card-icon">
                    <img src={card.icon} alt={`${card.title} Icon`} width="32" height="32" />
                  </div>
                  <h3 className="contact-card-title">{card.title}</h3>
                  <p className="contact-card-content">{card.content}</p>
                  <a href={card.link.href} className="contact-card-link">
                    {card.link.label}
                  </a>
                </div>
              ))}
            </div>
            <div className="contact-form-wrapper seq">
              <div className="contact-form-container">
                <h3 className="contact-form-title">{contact.formTitle}</h3>
                <form className="contact-form" id="contactForm" noValidate onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        required
                        className="input-min"
                        aria-invalid={errors.name ? true : undefined}
                        aria-describedby={errors.name ? 'contactForm-name-error' : undefined}
                      />
                      {errors.name ? (
                        <p className="error-min" id="contactForm-name-error">
                          {errors.name}
                        </p>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                        className="input-min"
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={errors.email ? 'contactForm-email-error' : undefined}
                      />
                      {errors.email ? (
                        <p className="error-min" id="contactForm-email-error">
                          {errors.email}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Subject (e.g., Collaboration)"
                      required
                      className="input-min"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Write your message here..."
                      required
                      className="input-min"
                      aria-invalid={errors.message ? true : undefined}
                      aria-describedby={errors.message ? 'contactForm-message-error' : undefined}
                    ></textarea>
                    {errors.message ? (
                      <p className="error-min" id="contactForm-message-error">
                        {errors.message}
                      </p>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="contact-submit-btn"
                    ref={submitRef}
                    disabled={btnState === 'sending'}
                    aria-busy={btnState === 'sending' ? true : undefined}
                    style={
                      btnState === 'sent'
                        ? { backgroundColor: '#2b8a3e' }
                        : btnState === 'failed'
                          ? { backgroundColor: '#a33' }
                          : undefined
                    }
                  >
                    <span>{btnLabel}</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor" />
                    </svg>
                  </button>
                  <p
                    className={status.kind === 'error' ? 'status-min status-min--err' : 'status-min'}
                    role="status"
                    aria-live="polite"
                  >
                    {status.text}
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div className="contact-social seq">
            <h4 className="contact-social-title">{contact.socialTitle}</h4>
            <div className="contact-social-links">
              <a href={`mailto:${brand.email}`} className="social-link" data-tilt="">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth={2} />
                  <path
                    d="m3 7 9 6 9-6"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Email
              </a>
              <a href="#works" className="social-link" data-tilt="">
                <img src={brand.logoIcon} alt="AAZHI" style={{ width: 24, height: 24 }} />
                Work
              </a>
              <a href="#home" className="social-link" data-tilt="">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12 19V5m0 0-7 7m7-7 7 7"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Top
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
