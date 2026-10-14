import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import Lenis from 'lenis';
import { initViewportFix } from './ref/lib/viewportFix';
import Topbar from './ref/components/Topbar';
import MenuOverlay from './ref/components/MenuOverlay';
import Hero from './ref/components/Hero';
import About from './ref/components/About';
import Timeline from './ref/components/Timeline';
// import Skills from './ref/components/Skills'; // Stack section hidden for now — restore to bring it back.
import Projects from './ref/components/Projects';
import TeamSection from './ref/components/TeamSection';
import Contact from './ref/components/Contact';
import Footer from './ref/components/Footer';

function waitForFontsAndImages(): Promise<void> {
  const fontsReady =
    document.fonts && document.fonts.ready
      ? document.fonts.ready.then(() => undefined)
      : Promise.resolve();
  const imgs = Array.from(document.images ?? []);
  const imagePromises = imgs.map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise<void>((res) => {
      img.addEventListener('load', () => res(), { once: true });
      img.addEventListener('error', () => res(), { once: true });
    });
  });
  return Promise.all([fontsReady, Promise.all(imagePromises)]).then(
    () => undefined,
  );
}

export default function App() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Flip);

    // Stable --vh + viewport listeners (resize / orientationchange / load).
    const viewport = initViewportFix();

    // Smooth scroll, wired into GSAP's ticker like the reference.
    const lenis = new Lenis();
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });
    const onTicker = (time: number): void => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTicker);
    gsap.ticker.lagSmoothing(0);

    let cancelled = false;
    let loaderTimer: number | null = null;
    let refreshTimer: number | null = null;

    // Wait for fonts + images so ScrollTrigger measurements are correct,
    // then refresh twice across a frame before revealing the page.
    void waitForFontsAndImages().then(() => {
      if (cancelled) return;
      ScrollTrigger.refresh();
      requestAnimationFrame(() => {
        if (cancelled) return;
        ScrollTrigger.refresh();
        // Double rAF so the browser has painted after layout work.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (cancelled) return;
            const loader = document.getElementById('page-loader');
            if (loader) {
              loader.classList.add('hidden');
              // Remove from DOM after the transition so it never blocks input.
              loaderTimer = window.setTimeout(() => {
                loader.remove();
              }, 900);
            }
          });
        });
      });
    });

    // Clear any deep link on full load so the page always starts at top,
    // matching the reference behaviour.
    const onLoad = (): void => {
      if (window.location.hash) {
        window.setTimeout(() => {
          try {
            window.scrollTo({ top: 0, behavior: 'auto' });
            history.replaceState(
              null,
              '',
              window.location.pathname + window.location.search,
            );
          } catch {
            // ignore
          }
        }, 20);
      }
    };
    window.addEventListener('load', onLoad);

    // Debounced refresh for manual resizes / rotations.
    const debouncedRefresh = (): void => {
      if (refreshTimer !== null) {
        window.clearTimeout(refreshTimer);
      }
      refreshTimer = window.setTimeout(() => {
        try {
          ScrollTrigger.refresh();
        } catch {
          // ignore
        }
      }, 120);
    };
    window.addEventListener('resize', debouncedRefresh, { passive: true });
    window.addEventListener('orientationchange', debouncedRefresh, {
      passive: true,
    });

    return () => {
      cancelled = true;
      if (loaderTimer !== null) {
        window.clearTimeout(loaderTimer);
      }
      if (refreshTimer !== null) {
        window.clearTimeout(refreshTimer);
      }
      window.removeEventListener('load', onLoad);
      window.removeEventListener('resize', debouncedRefresh);
      window.removeEventListener('orientationchange', debouncedRefresh);
      gsap.ticker.remove(onTicker);
      lenis.destroy();
      viewport.destroy();
    };
  }, []);

  return (
    <>
      <div id="page-loader" className="page-loader">
        <div className="loader-content">
          <div className="loader-spinner">
            <div className="spinner-ring" />
            <div className="spinner-ring" />
            <div className="spinner-ring" />
          </div>
        </div>
      </div>
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <Topbar />
      <div className="text-title-animation">
        <Hero />
        <About />
        <TeamSection />
        <Timeline />
        {/* <Skills /> — stack section hidden for now */}
        <Projects />
        <Contact />
      </div>
      <Footer />
      <MenuOverlay />
    </>
  );
}
