import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SCENES, hashForTop, sceneIndexFor, type ParsedRoute, type Route } from '../lib/route';
import { site } from '../data/content';

const ORDER: Route[] = ['home', 'about', 'team', 'work', 'contact'];

export default function SceneDock({ route }: { route: ParsedRoute }) {
  const top = route.top;
  const pos = ORDER.indexOf(top);
  const prev: Route | null = pos > 0 ? ORDER[pos - 1] : null;
  const next: Route | null = pos < ORDER.length - 1 ? ORDER[pos + 1] : null;

  const prevHref = route.scene === 'work-detail' ? '#/work' : prev ? (prev === 'team' ? '#/team/0' : hashForTop(prev)) : null;
  const nextHref = next ? (next === 'team' ? '#/team/0' : hashForTop(next)) : null;

  const prevLabel = route.scene === 'work-detail' ? 'Work' : prev ? SCENES.find((s) => s.top === prev)?.label : null;
  const nextLabel = next ? SCENES.find((s) => s.top === next)?.label : null;

  const year = new Date().getFullYear();

  return (
    <footer className="cine-dock" aria-label="Scene navigation">
      <div className="cine-dock__inner">
        <p className="cine-dock__counter" aria-live="polite">
          <b>{String(sceneIndexFor(top) + 1).padStart(2, '0')} / 05</b>
          {' — '}
          {SCENES.find((s) => s.top === top)?.label}
          {route.scene === 'work-detail' ? ' · Case study' : ''}
          {route.scene === 'team' && route.param && route.param !== '0' ? ` · ${route.param === 'all' ? 'All' : `0${Number(route.param) + 1}`} ` : ''}
        </p>

        <div className="cine-dock__dots" aria-label="Scenes">
          {SCENES.map((s) => {
            const href = s.top === 'team' ? '#/team/0' : s.hash;
            const active = top === s.top;
            return (
              <a
                key={s.top}
                href={href}
                aria-current={active ? 'page' : undefined}
                aria-label={`Go to ${s.label}`}
                className="cine-dock__dot"
                data-active={active}
              >
                <i aria-hidden="true" />
                {s.label}
              </a>
            );
          })}
        </div>

        <div className="cine-dock__nav">
          <span className="cine-dock__legal">© {year} {site.name} · {site.location}</span>
          {prevHref ? (
            <a className="cine-dock__btn" href={prevHref} aria-label={`Previous scene: ${prevLabel}`}>
              <ArrowLeft size={15} aria-hidden="true" /> {prevLabel}
            </a>
          ) : null}
          {nextHref ? (
            <a className="cine-dock__btn cine-dock__btn--primary" href={nextHref} aria-label={`Next scene: ${nextLabel}`}>
              {nextLabel} <ArrowRight size={15} aria-hidden="true" />
            </a>
          ) : (
            <a className="cine-dock__btn cine-dock__btn--primary" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
