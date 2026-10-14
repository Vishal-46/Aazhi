import type { MouseEvent } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Team from '../components/Team';
import CoreTeam from '../components/CoreTeam';
import Reveal from '../components/Reveal';

/** From the team page, contact lives on home: go home first, then scroll. */
function goHomeContact(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  window.location.hash = '#/';
  window.setTimeout(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, 60);
}

export default function TeamPage() {
  return (
    <>
      <Team />
      <CoreTeam />
      <section className="section-min rule-top" aria-labelledby="team-next-title">
        <div className="wrap-wide">
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: '60ch', marginInline: 'auto' }}>
              <p className="mono-label" style={{ color: 'rgba(12,27,46,0.6)' }}>Next step</p>
              <h2
                id="team-next-title"
                style={{
                  fontFamily: "'Inter Tight', Inter, system-ui, sans-serif",
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  marginTop: '12px',
                  color: '#0C1B2E',
                }}
              >
                Want to work with us?
              </h2>
              <p style={{ marginTop: '12px', lineHeight: 1.65, color: 'rgba(12,27,46,0.72)' }}>
                A short note is enough — tell us what you&apos;re working on and what a good
                outcome looks like.
              </p>
              <p
                style={{
                  marginTop: '14px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.85rem',
                  letterSpacing: '0.04em',
                  color: 'rgba(12,27,46,0.6)',
                }}
              >
                Currently focused — no open roles published.
              </p>
              <p
                style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  marginTop: '24px',
                }}
              >
                <a
                  href="#/"
                  aria-label="Back to the home page"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 22px',
                    borderRadius: '999px',
                    border: '1px solid rgba(12,27,46,0.2)',
                    color: '#0C1B2E',
                    background: 'transparent',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                  }}
                >
                  <ArrowLeft size={16} aria-hidden="true" /> Back to home
                </a>
                <a
                  href="#contact"
                  onClick={goHomeContact}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 22px',
                    borderRadius: '999px',
                    background: '#0C1B2E',
                    color: '#FBFAF7',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                  }}
                >
                  Discuss a project <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
