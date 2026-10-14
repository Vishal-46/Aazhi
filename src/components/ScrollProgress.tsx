import { useEffect, useRef, useState } from 'react';

/** Thin fixed progress bar. Renders nothing under reduced-motion. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = ref.current;
      if (!el) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? doc.scrollTop / max : 0;
      el.style.transform = `scaleX(${progress})`;
    };
    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      cancelAnimationFrame(raf);
    };
  }, [active]);

  if (!active) return null;
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
