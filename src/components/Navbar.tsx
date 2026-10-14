import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useRoute, type Route } from '../lib/route';
import MobileMenu from './MobileMenu';

interface NavEntry {
  label: string;
  href: string;
  route: Route;
}

const NAV_ENTRIES: NavEntry[] = [
  { label: 'Home', href: '#/', route: 'home' },
  { label: 'Work', href: '#/work', route: 'work' },
  { label: 'Team', href: '#/team', route: 'team' },
  { label: 'Contact', href: '#/contact', route: 'contact' },
];

function ContourMark() {
  return (
    <svg
      className="pill-brand__mark"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="16" cy="16" rx="14" ry="14" stroke="currentColor" strokeWidth="1.4" opacity="0.9" />
      <ellipse cx="16" cy="16" rx="10.2" ry="10.2" stroke="currentColor" strokeWidth="1.3" opacity="0.65" />
      <ellipse cx="16" cy="16" rx="6.6" ry="6.6" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
      <circle cx="16" cy="16" r="2.2" fill="currentColor" />
    </svg>
  );
}

export default function Navbar() {
  const route = useRoute();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    onScroll();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
  }, [open]);

  // Focus return on any close (link-click unmounts the focused menu link,
  // leaving focus on <body>). Escape already returns focus above.
  const wasMenuOpen = useRef(false);
  useEffect(() => {
    if (wasMenuOpen.current && !open) {
      const ae = document.activeElement;
      if (!ae || ae === document.body) toggleRef.current?.focus();
    }
    wasMenuOpen.current = open;
  }, [open]);

  /** Brand / Home link: plain '#/' hash change off home; scroll-top on home. */
  function goHome(e: MouseEvent<HTMLAnchorElement>) {
    if (route !== 'home') return;
    e.preventDefault();
    if (window.location.hash !== '#/') window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  return (
    <>
      <header className="pill-nav">
        <div className={scrolled ? 'pill-nav__bar is-scrolled' : 'pill-nav__bar'}>
          <a className="pill-brand" href="#/" onClick={goHome} aria-label="AAZHI — home">
            <ContourMark />
            <span className="pill-brand__text">
              <span className="pill-brand__word">AAZHI</span>
              <span className="pill-brand__sub">TECHNOLOGY WITH PURPOSE</span>
            </span>
          </a>

          <nav aria-label="Primary">
            <ul className="pill-links">
              {NAV_ENTRIES.map((entry) => {
                const activeState = route === entry.route;
                return (
                  <li key={entry.href}>
                    <a
                      href={entry.href}
                      onClick={entry.route === 'home' ? goHome : undefined}
                      className={activeState ? 'is-active' : undefined}
                      aria-current={activeState ? 'page' : undefined}
                    >
                      {entry.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <a className="pill-cta pill-cta--desktop" href="#/contact">
              Start a project <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="pill-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
