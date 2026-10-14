import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { menuLinks } from '../content';

gsap.registerPlugin(ScrollTrigger);

export default function MenuOverlay() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const overlay = rootRef.current;
    if (!overlay) return;
    const overlayEl: HTMLDivElement = overlay;

    let navTimer: number | null = null;
    let menuTL: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      const links = Array.from(overlayEl.querySelectorAll<HTMLAnchorElement>('.menu-nav a'));
      menuTL = gsap
        .timeline({ paused: true })
        .set(overlayEl, { autoAlpha: 0, y: '-100%' })
        .to(overlayEl, { autoAlpha: 1, y: '0%', duration: 0.62, ease: 'power3.out' })
        .fromTo(
          links,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.36 },
          '<0.08',
        );
    }, rootRef);

    const getToggle = () => document.querySelector<HTMLButtonElement>('.menu-toggle');
    const isOpen = () => getToggle()?.getAttribute('aria-expanded') === 'true';

    function openMenu() {
      menuTL?.play();
      const toggle = getToggle();
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.textContent = 'Close';
      }
      overlayEl.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
      const firstLink = overlayEl.querySelector<HTMLAnchorElement>('.menu-nav a');
      if (firstLink) firstLink.focus();
    }

    function closeMenu() {
      menuTL?.reverse();
      const toggle = getToggle();
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
        toggle.focus();
      }
      overlayEl.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
    }

    const onDocumentClick = (e: MouseEvent) => {
      const raw = e.target as unknown;
      if (!raw || typeof (raw as Element).closest !== 'function') return;
      const target = raw as Element;

      if (target.closest('.menu-toggle')) {
        if (isOpen()) closeMenu();
        else openMenu();
        return;
      }

      const logoLink = target.closest<HTMLAnchorElement>('.site-logo-link[href^="#"]');
      if (logoLink) {
        e.preventDefault();
        const href = logoLink.getAttribute('href');
        if (href === '#home') {
          window.scrollTo({ top: 0, behavior: 'auto' });
          try {
            history.replaceState(null, '', href);
          } catch {
            /* ignore */
          }
          window.setTimeout(() => {
            try {
              ScrollTrigger.refresh();
            } catch {
              /* ignore */
            }
          }, 100);
        }
        return;
      }

      const footerLink = target.closest<HTMLAnchorElement>('.footer-nav a[href^="#"]');
      if (footerLink) {
        e.preventDefault();
        const href = footerLink.getAttribute('href');
        if (href) {
          try {
            window.location.href = href;
          } catch {
            window.location.hash = href;
          }
        }
      }
    };
    document.addEventListener('click', onDocumentClick);

    const onOverlayClick = (e: MouseEvent) => {
      if (e.target === overlayEl) closeMenu();
    };
    overlayEl.addEventListener('click', onOverlayClick);

    const menuAnchors = Array.from(overlayEl.querySelectorAll<HTMLAnchorElement>('.menu-nav a'));
    const onMenuLinkClick = (ev: MouseEvent) => {
      ev.preventDefault();
      const anchor = ev.currentTarget as HTMLAnchorElement | null;
      const href = anchor?.getAttribute('href');
      closeMenu();
      if (navTimer !== null) window.clearTimeout(navTimer);
      navTimer = window.setTimeout(() => {
        if (href && href.startsWith('#')) {
          try {
            window.location.href = href;
          } catch {
            window.location.hash = href;
          }
        } else if (href) {
          window.location.href = href;
        }
      }, 260);
    };
    menuAnchors.forEach((a) => a.addEventListener('click', onMenuLinkClick));

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen()) closeMenu();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onKeyDown);
      overlayEl.removeEventListener('click', onOverlayClick);
      menuAnchors.forEach((a) => a.removeEventListener('click', onMenuLinkClick));
      if (navTimer !== null) window.clearTimeout(navTimer);
      document.body.classList.remove('menu-open');
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      id="site-menu"
      className="menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-hidden="true"
    >
      <div className="menu-inner">
        <nav className="menu-nav" aria-label="Main navigation">
          <ul>
            {menuLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
