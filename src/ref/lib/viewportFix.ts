// Faithful TS port of the reference utils/viewportFix.js.
// Sets a stable --vh custom property and refreshes ScrollTrigger on
// viewport changes.

import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ViewportFixOptions {
  debounceMs?: number;
}

export interface ViewportFixHandle {
  setViewportHeight: () => void;
  destroy: () => void;
}

export function initViewportFix(
  { debounceMs = 120 }: ViewportFixOptions = {},
): ViewportFixHandle {
  function setViewportHeight(): void {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  // Debounce helper
  function debounce(fn: () => void, wait: number): () => void {
    let t: number | null = null;
    return () => {
      if (t !== null) {
        window.clearTimeout(t);
      }
      t = window.setTimeout(() => {
        fn();
      }, wait);
    };
  }

  // Run once now
  setViewportHeight();

  const onResize = debounce(() => {
    setViewportHeight();
    try {
      ScrollTrigger.refresh();
    } catch {
      /* ignore */
    }
  }, debounceMs);

  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', onResize, { passive: true });

  // Also refresh on load and schedule a delayed refresh per requirements
  const onLoad = (): void => {
    setViewportHeight();
    try {
      ScrollTrigger.refresh();
    } catch {
      /* ignore */
    }
    window.setTimeout(() => {
      try {
        ScrollTrigger.refresh();
      } catch {
        /* ignore */
      }
    }, 500);
  };
  window.addEventListener('load', onLoad, { once: true });

  // expose programmatic setter
  return {
    setViewportHeight,
    destroy: () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      window.removeEventListener('load', onLoad);
    },
  };
}
