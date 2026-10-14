import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { coreRoles, team } from '../data/content';
import { go } from '../lib/route';

type TeamStep = '0' | '1' | '2' | 'all';

function normalise(param?: string): TeamStep {
  if (param === '1' || param === '2' || param === 'all') return param;
  return '0';
}

function initials(name: string): string {
  const clean = name.trim();
  if (!clean) return 'Aa';
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const ORDER: TeamStep[] = ['0', '1', '2', 'all'];

export default function FoundersScene({ stepParam }: { stepParam?: string }) {
  const step = normalise(stepParam);
  const isOverview = step === 'all';
  const index = isOverview ? -1 : Number(step);
  const member = !isOverview ? team[index] : undefined;
  const [imgOk, setImgOk] = useState(true);
  const [autoPaused, setAutoPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  // Reset image fallback whenever the focused founder changes.
  useEffect(() => {
    setImgOk(true);
  }, [step]);

  useEffect(() => {
    if (isOverview || autoPaused) return;
    const timer = window.setInterval(() => {
      go(`#/team/${(index + 1) % team.length}`);
    }, 5600);
    return () => window.clearInterval(timer);
  }, [autoPaused, index, isOverview]);

  const goStep = useCallback((s: TeamStep) => {
    go(`#/team/${s}`);
  }, []);

  const stepPos = ORDER.indexOf(step);
  const prevStep: TeamStep | null = stepPos > 0 ? ORDER[stepPos - 1] : null;
  const nextStep: TeamStep | null = stepPos < ORDER.length - 1 ? ORDER[stepPos + 1] : null;

  const goPrev = useCallback(() => {
    if (prevStep) goStep(prevStep);
  }, [prevStep, goStep]);

  const goNext = useCallback(() => {
    if (nextStep) goStep(nextStep);
  }, [nextStep, goStep]);

  // Keyboard: arrows move through the sequence. Ignored inside form fields.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT')) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 42) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  const counterLabel = isOverview ? '04 / 04' : `${String(index + 1).padStart(2, '0')} / 04`;
  const progress = isOverview ? 1 : (index + 1) / 4;

  return (
    <section
      className="cine-scene"
      aria-label={isOverview ? 'Team overview' : `Team member ${index + 1} of 3`}
      onMouseEnter={() => setAutoPaused(true)}
      onMouseLeave={() => setAutoPaused(false)}
      onFocus={() => setAutoPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setAutoPaused(false);
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="cine-inner">
        <p className="cine-eyebrow cine-rise" style={{ ['--d' as string]: '0ms' }}>
          <span className="cine-eyebrow__num">03</span>
          {isOverview ? 'Team · The core team' : `Team · ${counterLabel} — ${member?.name}`}
        </p>

        {!isOverview && member ? (
          <>
          <div className="cine-founder-grid">
            <div className="cine-clip" style={{ ['--d' as string]: '120ms' }} key={`portrait-${step}`}>
              {member.photo && !member.placeholder && imgOk ? (
                <div className="cine-portrait">
                  <img
                    src={member.photo}
                    alt={member.photoAlt ?? `${member.name} — ${member.role}`}
                    loading="eager"
                    onError={() => setImgOk(false)}
                  />
                  <span className="cine-portrait__badge" aria-hidden="true">
                    Team member 0{index + 1}
                  </span>
                </div>
              ) : (
                <div className="cine-portrait cine-portrait--forthcoming" role="img" aria-label={member.photoAlt ?? 'Portrait forthcoming'}>
                  <span className="cine-portrait__ring" aria-hidden="true" />
                  <span className="cine-portrait__mono" aria-hidden="true">{initials(member.name)}</span>
                  <span className="cine-portrait__forth">Portrait forthcoming</span>
                </div>
              )}
            </div>

            <div className="cine-founder-details" key={`copy-${step}`}>
              <p className="cine-founder-counter cine-rise" aria-live="polite" style={{ ['--d' as string]: '80ms' }}>
                <b>{counterLabel}</b>
                <span className="cine-founder-counter__bar" aria-hidden="true">
                  <i style={{ transform: `scaleX(${progress})` }} />
                </span>
                <span>{member.placeholder ? 'Forthcoming' : member.name}</span>
              </p>
              <h1 className="cine-founder-name">
                <span className="cine-line"><span style={{ ['--d' as string]: '140ms' }}>{member.name}</span></span>
              </h1>
              <p className="cine-founder-role cine-rise" style={{ ['--d' as string]: '220ms' }}>{member.role}</p>
              <p className="cine-founder-bio cine-rise" style={{ ['--d' as string]: '280ms' }}>{member.bio}</p>
              <ul className="cine-founder-skills cine-rise" style={{ ['--d' as string]: '340ms' }} aria-label={`${member.name} focus areas`}>
                {member.skills.map((s) => (
                  <li key={s} className="cine-chip">{s}</li>
                ))}
              </ul>
              <div className="cine-founder-nav cine-rise" style={{ ['--d' as string]: '400ms' }}>
                <button type="button" className="cine-arrow-btn" onClick={goPrev} disabled={!prevStep} aria-label="Previous team member">
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>
                <button type="button" className="cine-arrow-btn" onClick={goNext} disabled={!nextStep} aria-label={index === 2 ? 'See the full team' : 'Next team member'}>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
                <div className="cine-founder-dots" role="group" aria-label="Choose team member">
                  {team.map((m, i) => (
                    <button
                      key={`${m.name}-${i}`}
                      type="button"
                      aria-current={String(i) === step ? 'true' : undefined}
                      aria-label={`Show ${m.name}`}
                      className="cine-founder-dot"
                      data-active={String(i) === step}
                      onClick={() => goStep(String(i) as TeamStep)}
                    >
                      <span className="cine-founder-dot__bar" aria-hidden="true" />
                      {m.name}
                    </button>
                  ))}
                  <button
                    type="button"
                    aria-label="Show full team"
                    className="cine-founder-dot"
                    data-active={false}
                    onClick={() => goStep('all')}
                  >
                    <span className="cine-founder-dot__bar" aria-hidden="true" />
                    All
                  </button>
                </div>
              </div>
            </div>
          </div>
          <section className="cine-core-roles cine-rise" style={{ ['--d' as string]: '470ms' }} aria-labelledby="core-roles-title">
            <div className="cine-core-roles__heading">
              <p className="cine-mono-label">The wider signal</p>
              <h2 id="core-roles-title">People behind the possibilities.</h2>
              <p>A growing group of specialists bringing product, technology, design, and momentum into the same room.</p>
            </div>
            <div className="cine-core-roles__grid">
              {coreRoles.map((role, i) => (
                <article key={role.title} className="cine-core-role">
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{role.title}</h3>
                    <p>{role.body}</p>
                  </div>
                  <b aria-hidden="true">↗</b>
                </article>
              ))}
            </div>
          </section>
          </>
        ) : (
          <div key="overview">
            <h1 className="cine-display cine-display--sm">
              <span className="cine-line"><span style={{ ['--d' as string]: '80ms' }}>Small by design.</span></span>
            </h1>
            <p className="cine-lede cine-rise" style={{ ['--d' as string]: '200ms' }}>
              The same people you meet above do the work — no hand-offs. Select anyone
              to revisit their profile, or continue to the work.
            </p>
            <div className="cine-team-grid cine-rise" style={{ ['--d' as string]: '280ms' }}>
              {team.map((m, i) => (
                <button
                  key={`${m.name}-${m.role}-${i}`}
                  type="button"
                  className="cine-team-card"
                  data-active="false"
                  onClick={() => goStep(String(i) as TeamStep)}
                  aria-label={`Revisit ${m.name}`}
                >
                  <span className="cine-team-card__media">
                    {m.photo && !m.placeholder ? (
                      <img src={m.photo} alt="" loading="lazy" aria-hidden="true" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    ) : (
                      <span className="cine-team-card__mono" aria-hidden="true">{initials(m.name)}</span>
                    )}
                  </span>
                  <span className="cine-team-card__body">
                    <b>{m.name}{m.placeholder ? ' · profile forthcoming' : ''}</b>
                    <span className="role">{m.role}</span>
                    <span className="bio">{m.bio}</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="cine-founder-nav cine-rise" style={{ ['--d' as string]: '360ms' }}>
              <button type="button" className="cine-arrow-btn" onClick={goPrev} aria-label="Previous team member">
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <div className="cine-founder-dots" role="group" aria-label="Choose team member">
                {team.map((m, i) => (
                  <button
                    key={`ov-${m.name}-${i}`}
                    type="button"
                    aria-label={`Show ${m.name}`}
                    className="cine-founder-dot"
                    data-active={false}
                    onClick={() => goStep(String(i) as TeamStep)}
                  >
                    <span className="cine-founder-dot__bar" aria-hidden="true" />
                    {m.name}
                  </button>
                ))}
                <span className="cine-founder-dot" data-active="true" aria-current="true">
                  <span className="cine-founder-dot__bar" aria-hidden="true" />
                  All
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
