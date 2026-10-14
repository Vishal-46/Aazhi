import type { MouseEvent } from 'react';
import { ArrowUp } from 'lucide-react';
import { site, socials } from '../data/content';
import { useRoute } from '../lib/route';

const liveSocials = socials.filter((s) => s.href.trim() !== '');

interface FootLink {
  label: string;
  href: string;
  /** Home-page section id. Absent for route links. */
  sectionId?: string;
}

/** Route pages. */
const exploreLinks: FootLink[] = [
  { label: 'Home', href: '#/' },
  { label: 'Work', href: '#/work' },
  { label: 'Team', href: '#/team' },
  { label: 'Contact', href: '#/contact' },
];

/** Home-page section anchors. */
const studioLinks: FootLink[] = [
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Process', href: '#process', sectionId: 'process' },
  { label: 'Future', href: '#future', sectionId: 'future' },
];

const linkStyle = { display: 'inline-flex', alignItems: 'center', minHeight: 40 } as const;

export default function Footer() {
  const route = useRoute();
  const isHome = route === 'home';
  const year = new Date().getFullYear();

  /**
   * Home-section links across routes. On home, plain `#id` anchors just
   * work. Off home, route via '#/' first and scroll once home has rendered.
   */
  function goSection(e: MouseEvent<HTMLAnchorElement>, id: string) {
    if (isHome) return;
    e.preventDefault();
    window.location.hash = '#/';
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 60);
  }

  /** Back-to-top works on every route. */
  function goTop(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="wrap">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <span className="site-footer__word">AAZHI</span>
            <span className="site-footer__tag">{site.tagline}</span>
            <p className="site-footer__desc">
              AAZHI is a technology studio building practical web products, automation, and data tools.
            </p>
            <a className="site-footer__email" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <span className="site-footer__loc">{site.location}</span>
          </div>

          <div className="site-footer__cols">
            <nav aria-label="Explore">
              <h2 className="site-footer__h">Explore</h2>
              <ul>
                {exploreLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} style={linkStyle}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Studio">
              <h2 className="site-footer__h">Studio</h2>
              <ul>
                {studioLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      style={linkStyle}
                      onClick={l.sectionId ? (e) => goSection(e, l.sectionId as string) : undefined}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h2 className="site-footer__h">Notes</h2>
              <p className="site-footer__note">
                Privacy: this site collects nothing by default. Visuals use synthetic data.
              </p>
              {liveSocials.length > 0 ? (
                <ul className="site-footer__socials" aria-label="Social profiles">
                  {liveSocials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noreferrer" style={linkStyle}>{s.label}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="site-footer__soon" style={{ marginTop: '14px' }}>
                  Social profiles coming soon
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="site-footer__bar">
          <span>
            © {year} <strong>{site.name}</strong> · Built with purpose in India
          </span>
          <a
            href="#top"
            onClick={goTop}
            aria-label="Back to top"
            className="site-footer__top-link"
            style={{ minHeight: 40, display: 'inline-flex', alignItems: 'center' }}
          >
            <ArrowUp size={15} aria-hidden="true" /> Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
