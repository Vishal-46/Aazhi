import { useEffect, useRef, useState } from 'react';
import CinematicNav from './components/CinematicNav';
import SceneDock from './components/SceneDock';
import HomeScene from './scenes/HomeScene';
import AboutScene from './scenes/AboutScene';
import FoundersScene from './scenes/FoundersScene';
import WorkScene from './scenes/WorkScene';
import WorkDetailScene from './scenes/WorkDetailScene';
import ContactScene from './scenes/ContactScene';
import { parseHash, type ParsedRoute } from './lib/route';
import { ENTER_MS, usePrefersReducedMotion } from './lib/motion';
import { projects } from './data/content';

function sceneTitle(route: ParsedRoute): string {
  switch (route.scene) {
    case 'about':
      return 'About — AAZHI';
    case 'team':
      if (route.param === 'all') return 'Core team — AAZHI';
      if (route.param === '1') return 'Anjai — AAZHI';
      if (route.param === '2') return 'Third co-founder — AAZHI';
      return 'Vishal — AAZHI';
    case 'work':
      return 'Work — AAZHI';
    case 'work-detail': {
      const p = projects.find((x) => x.slug === route.param);
      return p ? `${p.title} — AAZHI` : 'Work — AAZHI';
    }
    case 'contact':
      return 'Contact — AAZHI';
    default:
      return 'AAZHI — Technology with purpose';
  }
}

function SceneView({ route }: { route: ParsedRoute }) {
  switch (route.scene) {
    case 'about':
      return <AboutScene />;
    case 'team':
      return <FoundersScene stepParam={route.param} />;
    case 'work':
      return <WorkScene />;
    case 'work-detail':
      return <WorkDetailScene slug={route.param} />;
    case 'contact':
      return <ContactScene />;
    default:
      return <HomeScene />;
  }
}

/** Tiny hash subscription hook kept local so App stays dependency-free. */
function useHash(): string {
  const [hash, setHash] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.hash : '#/',
  );
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHash();
  const target = parseHash(hash);
  const reduced = usePrefersReducedMotion();

  const [displayed, setDisplayed] = useState<ParsedRoute>(() => parseHash());
  const [previous, setPrevious] = useState<ParsedRoute | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const timer = useRef<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Lock the shell to the viewport (page-based, no body scroll).
  useEffect(() => {
    document.documentElement.classList.add('cine');
    return () => document.documentElement.classList.remove('cine');
  }, []);

  // Canonicalise team/work hashes (e.g. '#/team' → '#/team/0') without
  // adding history entries, so dots and back/forward stay consistent.
  useEffect(() => {
    const raw = window.location.hash;
    const parsed = parseHash(raw);
    if (raw !== parsed.hash && (parsed.scene === 'team' || parsed.scene === 'work-detail' || parsed.scene === 'home')) {
      window.history.replaceState(null, '', parsed.hash);
    }
  }, []);

  // Orchestrate outgoing → incoming on every target change.
  // `displayed` is read as the outgoing snapshot; the effect only
  // re-runs when the target hash (or motion preference) changes, so a
  // setDisplayed inside never retriggers it mid-transition.
  useEffect(() => {
    if (target.hash === displayed.hash) {
      if (previous || transitioning) {
        setPrevious(null);
        setTransitioning(false);
      }
      return;
    }

    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }

    if (reduced) {
      setPrevious(null);
      setDisplayed(target);
      setTransitioning(false);
      return;
    }

    // Freeze the outgoing scene underneath, mount the incoming on top.
    setPrevious(displayed);
    setDisplayed(target);
    setTransitioning(true);

    timer.current = window.setTimeout(() => {
      setPrevious(null);
      setTransitioning(false);
      timer.current = null;
    }, ENTER_MS + 120);

    return () => {
      if (timer.current !== null) {
        window.clearTimeout(timer.current);
        timer.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.hash, reduced]);

  // Title + scroll reset on every committed scene.
  useEffect(() => {
    document.title = sceneTitle(displayed);
    const el = viewportRef.current?.querySelector('.cine-layer--incoming .cine-scene, .cine-layer--single .cine-scene');
    if (el) {
      el.scrollTop = 0;
      const heading = el.querySelector('h1');
      if (heading) {
        (heading as HTMLElement).setAttribute('tabindex', '-1');
      }
    }
  }, [displayed.hash]);

  return (
    <div className="cine-shell">
      <a className="skip-link" href="#cine-content">Skip to content</a>
      <CinematicNav top={displayed.top} />
      <main
        ref={viewportRef}
        className="cine-viewport"
        data-transitioning={transitioning}
        id="cine-content"
        tabIndex={-1}
        aria-live="off"
      >
        {previous && !reduced ? (
          <>
            <div className="cine-layer cine-layer--outgoing" key={`out-${previous.hash}`} aria-hidden="true">
              <SceneView route={previous} />
            </div>
            <div className="cine-layer cine-layer--incoming" key={`in-${displayed.hash}`}>
              <SceneView route={displayed} />
            </div>
            <div className="cine-wipe" aria-hidden="true" />
          </>
        ) : (
          <div className="cine-layer cine-layer--single" key={displayed.hash}>
            <SceneView route={displayed} />
          </div>
        )}
      </main>
      <SceneDock route={displayed} />
    </div>
  );
}
