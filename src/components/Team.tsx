import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Github, Linkedin } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { team } from '../data/content';

const AUTOPLAY_MS = 6000;

function initials(name: string): string {
  const clean = name.trim();
  if (!clean || clean.toLowerCase().startsWith('co-founder')) return 'Aa';
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Team() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [imgOk, setImgOk] = useState<Record<number, boolean>>({});
  const activeRef = useRef(0);
  activeRef.current = active;
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const goTo = useCallback(
    (i: number, direction?: 1 | -1) => {
      const total = team.length;
      const next = ((i % total) + total) % total;
      const cur = activeRef.current;
      if (direction !== undefined) {
        setDir(direction);
      } else if (next !== cur) {
        // shortest-path direction for dots
        const fwd = (next - cur + total) % total;
        const back = (cur - next + total) % total;
        setDir(fwd <= back ? 1 : -1);
      }
      setActive(next);
    },
    [],
  );

  const next = useCallback(() => goTo(activeRef.current + 1, 1), [goTo]);
  const prev = useCallback(() => goTo(activeRef.current - 1, -1), [goTo]);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = window.setInterval(() => goTo(activeRef.current + 1, 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, goTo]);

  return (
    <section id="team" className="section-min rule-top azh-team" aria-labelledby="team-title">
      <div className="wrap-wide">
        <SectionHeading
          index="06"
          eyebrow="Founding team"
          title="Meet the founders."
          lede="One founder in focus at a time — swipe through. Every project gets a founder's attention from first sketch to launch."
          headingId="team-title"
        />
        <Reveal variant="up">
          <div
            className="spot-shell azh-spot"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div className="spot-top">
              <p className="mono-label azh-team-counter" aria-live="polite" style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {String(active + 1).padStart(2, '0')} / {String(team.length).padStart(2, '0')}
                <span aria-hidden="true"> · </span>
                <span style={{ color: '#0C1B2E' }}>{team[active]?.name}</span>
              </p>
              <div className="team-pro-nav">
                <button type="button" className="team-pro-btn" onClick={prev} aria-label="Previous founder">
                  <ArrowLeft size={17} aria-hidden="true" />
                </button>
                <button type="button" className="team-pro-btn" onClick={next} aria-label="Next founder">
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              className="spot-stage"
              role="region"
              aria-roledescription="carousel"
              aria-label="Founding team spotlight"
              tabIndex={0}
              data-dir={dir}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') prev();
                if (e.key === 'ArrowRight') next();
              }}
              onTouchStart={(e) => {
                touchX.current = e.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) < 40) return;
                if (dx < 0) next();
                else prev();
              }}
            >
              <div
                className="spot-track"
                style={{ transform: `translateX(-${active * 100}%)` }}
                aria-live={reducedMotion ? undefined : 'polite'}
              >
                {team.map((m, i) => {
                  const showImg = Boolean(m.photo) && imgOk[i] !== false;
                  const isActive = i === active;
                  return (
                    <article
                      key={`${m.name}-${m.role}-${i}`}
                      className="spot-slide"
                      aria-roledescription="slide"
                      aria-label={`${i + 1} of ${team.length}: ${m.name}`}
                      aria-hidden={!isActive}
                    >
                      <div className="spot-card">
                        <div className="spot-photo azh-spot-photo">
                          <span className="spot-ring" aria-hidden="true" />
                          <span className="spot-ring spot-ring--slow" aria-hidden="true" />
                          <div className="spot-img azh-spot-img">
                            {showImg ? (
                              <img
                                src={m.photo}
                                alt={m.photoAlt ?? `${m.name} — ${m.role}`}
                                loading={i === 0 ? 'eager' : 'lazy'}
                                tabIndex={-1}
                                onError={() => setImgOk((p) => ({ ...p, [i]: false }))}
                              />
                            ) : (
                              <span className="spot-mono" aria-hidden="true">
                                {initials(m.name)}
                              </span>
                            )}
                          </div>
                          <span className="spot-badge" aria-hidden="true">
                            0{i + 1}
                          </span>
                          <span className="spot-orbit" aria-hidden="true">
                            <i />
                          </span>
                        </div>

                        <div className="spot-info">
                          <p className="spot-kicker azh-spot-role">
                            Founder 0{i + 1} — {m.role}
                          </p>
                          <h3 className="spot-name azh-spot-name" style={{ lineHeight: 1.12 }}>
                            {m.name}
                          </h3>
                          <p className="spot-bio azh-spot-bio">{m.bio}</p>
                          <ul className="spot-skills" aria-label={`${m.name} focus areas`}>
                            {m.skills.map((s) => (
                              <li key={s} className="tag-min">
                                {s}
                              </li>
                            ))}
                          </ul>
                          {(m.linkedin || m.github) && (
                            <div className="team-pro-links">
                              {m.linkedin ? (
                                <a href={m.linkedin} target="_blank" rel="noreferrer" aria-label={`${m.name} on LinkedIn`} tabIndex={isActive ? undefined : -1} style={{ width: 40, height: 40 }}>
                                  <Linkedin size={17} aria-hidden="true" />
                                </a>
                              ) : null}
                              {m.github ? (
                                <a href={m.github} target="_blank" rel="noreferrer" aria-label={`${m.name} on GitHub`} tabIndex={isActive ? undefined : -1} style={{ width: 40, height: 40 }}>
                                  <Github size={17} aria-hidden="true" />
                                </a>
                              ) : null}
                            </div>
                          )}
                          {!m.linkedin && !m.github && (
                            <p className="hint-min">Profiles coming soon.</p>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="spot-dots" role="tablist" aria-label="Choose founder">
              {team.map((m, i) => (
                <button
                  key={`${m.name}-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Show ${m.name}`}
                  className="spot-dot azh-team-dot"
                  data-active={i === active}
                  style={{ minHeight: 40 }}
                  onClick={() => goTo(i)}
                >
                  <span className="spot-dot__bar" aria-hidden="true" />
                  <span className="spot-dot__label">{m.name}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <style>{`
          .azh-team .spot-stage { border-color: rgba(12, 27, 46, 0.16); }
          .azh-team .spot-photo { background: radial-gradient(circle at 50% 42%, rgba(191, 217, 242, 0.55), transparent 62%), #FBFAF7; }
          .azh-team .spot-img, .azh-team .azh-spot-img { border: 1px solid #0C1B2E; box-shadow: 0 0 0 6px rgba(191, 217, 242, 0.5), 0 16px 44px rgba(12, 27, 46, 0.14); background: #FFFFFF; }
          .azh-team .spot-ring { border-color: #0C1B2E; opacity: 0.45; }
          .azh-team .spot-ring--slow { border-color: #BFD9F2; opacity: 1; }
          .azh-team .spot-orbit i { background: #0C1B2E; box-shadow: 0 0 0 6px rgba(191, 217, 242, 0.6); }
          .azh-team .spot-badge { background: #FFFFFF; color: #0C1B2E; border: 1px solid #0C1B2E; font-family: Inter, system-ui, sans-serif; }
          .azh-team .spot-mono { font-family: 'Inter Tight', Inter, system-ui, sans-serif; color: #0C1B2E; }
          .azh-team .spot-kicker, .azh-team .azh-spot-role { font-family: Inter, system-ui, sans-serif; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(12, 27, 46, 0.68); }
          .azh-team .spot-name, .azh-team .azh-spot-name { font-family: 'Inter Tight', Inter, system-ui, sans-serif; color: #0C1B2E; }
          .azh-team .spot-bio, .azh-team .azh-spot-bio { color: rgba(12, 27, 46, 0.72); }
          .azh-team .team-pro-btn { border-color: rgba(12, 27, 46, 0.2); color: #0C1B2E; background: #FFFFFF; }
          .azh-team .team-pro-btn:hover { border-color: #0C1B2E; }
          .azh-team .spot-dot[data-active="true"] { border-color: #0C1B2E; color: #0C1B2E; }
          .azh-team .azh-team-dot[data-active="true"] .spot-dot__bar { background: #0C1B2E; }
          .azh-team .azh-team-counter { font-family: Inter, system-ui, sans-serif; color: rgba(12, 27, 46, 0.6); }
        `}</style>
      </div>
    </section>
  );
}
