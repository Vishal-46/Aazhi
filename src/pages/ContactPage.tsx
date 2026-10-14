import { ArrowLeft } from 'lucide-react';
import Contact from '../components/Contact';
import Reveal from '../components/Reveal';

/**
 * Contact route shell (#/contact). The enquiry content itself lives in
 * Contact (contact-section owners); this file only provides page framing:
 * breadcrumb head + the shared contact section.
 */
export default function ContactPage() {
  return (
    <>
      <section className="section-min page-head" aria-labelledby="contact-page-title">
        <div className="wrap-wide">
          <Reveal>
            <p className="mono-label">
              <a href="#/" aria-label="Back to the home page">Home</a>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">Contact</span>
            </p>
            <h1
              id="contact-page-title"
              className="h-section"
              style={{ marginTop: '12px' }}
            >
              Contact.
            </h1>
            <p className="lede-min" style={{ marginTop: '12px' }}>
              One inbox, no forms-to-nowhere — write to us and a founder replies
              within a few working days.
            </p>
            <p style={{ marginTop: '20px' }}>
              <a
                href="#/"
                aria-label="Back to the home page"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 22px',
                  borderRadius: '999px',
                  border: '1px solid var(--line)',
                  color: 'var(--ink)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }}
              >
                <ArrowLeft size={16} aria-hidden="true" /> Back to home
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <Contact />
    </>
  );
}
