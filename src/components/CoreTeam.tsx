import Reveal from './Reveal';
import { team } from '../data/content';

function initials(name: string): string {
  const clean = name.trim();
  if (!clean || clean.toLowerCase().startsWith('co-founder')) return 'Aa';
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function CoreTeam() {
  return (
    <section id="core-team" className="section-min rule-top azh-core" aria-labelledby="core-team-title">
      <div className="wrap-wide">
        <Reveal>
          <p className="mono-label" style={{ color: 'rgba(12,27,46,0.6)' }}>Core team</p>
          <h2
            id="core-team-title"
            style={{
              fontFamily: "'Inter Tight', Inter, system-ui, sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginTop: '12px',
              color: '#0C1B2E',
            }}
          >
            Small by design.
          </h2>
          <p style={{ marginTop: '12px', maxWidth: '58ch', lineHeight: 1.65, color: 'rgba(12,27,46,0.72)' }}>
            The same founders you meet above do the work — no hand-offs, no hired faces.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <ul
            style={{
              display: 'grid',
              gap: '12px',
              marginTop: '28px',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            }}
          >
            {team.map((m) => (
              <li
                key={`${m.name}-${m.role}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  border: '1px solid rgba(12,27,46,0.12)',
                  borderRadius: '16px',
                  background: '#FFFFFF',
                  padding: '14px 16px',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    width: '44px',
                    height: '44px',
                    borderRadius: '999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Inter Tight', Inter, system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: '#0C1B2E',
                    background: '#FBFAF7',
                    border: '1px solid #0C1B2E',
                    boxShadow: '0 0 0 4px rgba(191,217,242,0.5)',
                  }}
                >
                  {initials(m.name)}
                </span>
                <span style={{ minWidth: 0 }}>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: "'Inter Tight', Inter, system-ui, sans-serif",
                      fontWeight: 650,
                      color: '#0C1B2E',
                      lineHeight: 1.25,
                    }}
                  >
                    {m.name}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      marginTop: '2px',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '0.78rem',
                      letterSpacing: '0.04em',
                      color: 'rgba(12,27,46,0.6)',
                    }}
                  >
                    {m.role}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
