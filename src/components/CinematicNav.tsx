import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { SCENES, type Route } from '../lib/route';

function ContourMark() {
  return (
    <svg className="cine-brand__mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <ellipse cx="16" cy="16" rx="14" ry="14" stroke="currentColor" strokeWidth="1.4" opacity="0.9" />
      <ellipse cx="16" cy="16" rx="10.2" ry="10.2" stroke="currentColor" strokeWidth="1.3" opacity="0.65" />
      <ellipse cx="16" cy="16" rx="6.6" ry="6.6" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
      <circle cx="16" cy="16" r="2.2" fill="currentColor" />
    </svg>
  );
}

const TEAM_HREF = '#/team/0';

export default function CinematicNav({ top }: { top: Route }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open ]);

  // Close the menu on any scene change.
  useEffect(() => {
    setOpen(false);
  }, [top]);

  return (
    <>
      <div className="cine-top">
        <div className="cine-top__bar">
          <a className="cine-brand" href="#/" aria-label="AAZHI — home">
            <ContourMark />
            <span className="cine-brand__text">
              <span className="cine-brand__word">AAZHI</span>
              <span className="cine-brand__sub">TECHNOLOGY WITH PURPOSE</span>
            </span>
          </a>

          <nav aria-label="Primary">
            <ul className="cine-links">
              {SCENES.map((s) => {
                const href = s.top === 'team' ? TEAM_HREF : s.hash;
                const active = top === s.top;
                return (
                  <li key={s.top}>
                    <a href={href} className={active ? 'is-active' : undefined} aria-current={active ? 'page' : undefined}>
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="cine-top__actions">
            <a className="pill-cta pill-cta--desktop" href="#/contact">
              Start a project <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="cine-toggle"
              aria-expanded={open}
              aria-controls="cine-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="cine-menu">
          <nav aria-label="Mobile">
            <div className="cine-menu__panel" id="cine-menu" role="dialog" aria-label="Site menu">
              {SCENES.map((s, i) => {
                const href = s.top === 'team' ? TEAM_HREF : s.hash;
                return (
                  <a
                    key={s.top}
                    className="link"
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={top === s.top ? 'page' : undefined}
                  >
                    {s.label} <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                  </a>
                );
              })}
              <a href="#/contact" className="pill-panel__cta" onClick={() => setOpen(false)}>
                Start a project <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
