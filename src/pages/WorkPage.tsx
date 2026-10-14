import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import SelectedWork from '../components/SelectedWork';
import Reveal from '../components/Reveal';

/**
 * Work route shell (#/work). The case content itself lives in
 * SelectedWork / ProjectCard (work-section owners); this file only
 * provides page framing: breadcrumb head + closing next step.
 */
export default function WorkPage() {
  return (
    <>
      <section className="section-min page-head" aria-labelledby="work-page-title">
        <div className="wrap-wide">
          <Reveal>
            <p className="mono-label">
              <a href="#/" aria-label="Back to the home page">Home</a>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">Work</span>
            </p>
            <h1
              id="work-page-title"
              className="h-section"
              style={{ marginTop: '12px' }}
            >
              Work.
            </h1>
            <p className="lede-min" style={{ marginTop: '12px' }}>
              One healthcare operations build, in development and shown with
              synthetic data — organised around the way clinic work actually happens.
            </p>
          </Reveal>
        </div>
      </section>

      <SelectedWork />

      <section className="section-min rule-top" aria-labelledby="work-next-title">
        <div className="wrap-wide">
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: '60ch', marginInline: 'auto' }}>
              <p className="mono-label">Next step</p>
              <h2
                id="work-next-title"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  marginTop: '12px',
                }}
              >
                Have work shaped like this?
              </h2>
              <p style={{ marginTop: '12px', lineHeight: 1.65, color: 'var(--muted)' }}>
                A short note is enough — tell us what you&apos;re working on and
                what a good outcome looks like.
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
                    border: '1px solid var(--line)',
                    color: 'var(--ink)',
                    background: 'transparent',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                  }}
                >
                  <ArrowLeft size={16} aria-hidden="true" /> Back to home
                </a>
                <a
                  href="#/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 22px',
                    borderRadius: '999px',
                    background: 'var(--ink)',
                    color: 'var(--paper)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                  }}
                >
                  Start a project <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
