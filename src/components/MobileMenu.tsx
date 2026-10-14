import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { site } from '../data/content';
import { useRoute, type Route } from '../lib/route';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  /** Optional override for link-click dismissal. Defaults to onClose. */
  onNavigate?: () => void;
}

interface MenuEntry {
  label: string;
  href: string;
  route: Route;
}

const MENU_ENTRIES: MenuEntry[] = [
  { label: 'Home', href: '#/', route: 'home' },
  { label: 'Work', href: '#/work', route: 'work' },
  { label: 'Team', href: '#/team', route: 'team' },
  { label: 'Contact', href: '#/contact', route: 'contact' },
];

export default function MobileMenu({ open, onClose, onNavigate }: MobileMenuProps) {
  const route = useRoute();
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);
  const closeTimer = useRef<number | null>(null);

  // Keep mounted for a 200ms ease-out on close (skipped under
  // prefers-reduced-motion), then unmount so scroll lock releases.
  const [rendered, setRendered] = useState(open);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (open) {
      setRendered(true);
      setLeaving(false);
      return;
    }
    if (!rendered) return;
    const reduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setRendered(false);
      setLeaving(false);
      return;
    }
    setLeaving(true);
    closeTimer.current = window.setTimeout(() => {
      setRendered(false);
      setLeaving(false);
      closeTimer.current = null;
    }, 200);
    return () => {
      if (closeTimer.current !== null) {
        window.clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
    };
  }, [open, rendered]);

  // Body scroll lock while mounted; previous overflow always restored.
  useEffect(() => {
    if (!rendered) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [rendered]);

  useEffect(() => {
    if (open && !wasOpen.current) firstRef.current?.focus();
    wasOpen.current = open;
  }, [open ]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ).filter((el) => el.tabIndex !== -1);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open ]);

  if (!rendered) return null;

  const dismiss = () => (onNavigate ?? onClose)();

  return (
    <div className="pill-panel-wrap">
      <nav aria-label="Mobile">
        <div
          ref={panelRef}
          className="pill-panel"
          id="mobile-menu"
          role="dialog"
          aria-label="Site menu"
          style={
            leaving
              ? { opacity: 0, transform: 'translateY(-8px)', transition: 'opacity 200ms ease, transform 200ms ease' }
              : undefined
          }
        >
          {MENU_ENTRIES.map((link, i) => {
            const activeState = route === link.route;
            return (
              <a
                key={link.href}
                ref={i === 0 ? firstRef : undefined}
                className={activeState ? 'pill-panel__link is-active' : 'pill-panel__link'}
                href={link.href}
                onClick={dismiss}
                aria-current={activeState ? 'page' : undefined}
              >
                {link.label} <span className="idx">{String(i + 1).padStart(2, '0')}</span>
              </a>
            );
          })}
          <a href="#/contact" className="pill-panel__cta" onClick={dismiss}>
            Start a project <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href={`mailto:${site.email}`} onClick={dismiss} className="pill-panel__mail">
            {site.email}
          </a>
        </div>
      </nav>
    </div>
  );
}
