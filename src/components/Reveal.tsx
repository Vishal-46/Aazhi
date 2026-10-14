import { createElement, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

interface RevealProps {
  as?: 'div' | 'section' | 'li';
  className?: string;
  children: ReactNode;
  delay?: number;
  variant?: 'up' | 'fade';
}

/**
 * Scroll-reveal wrapper. Visible by default (no-JS / reduced-motion safe):
 * `data-hidden` is only applied inside an effect when the user has no
 * reduced-motion preference and IntersectionObserver is available.
 */
export default function Reveal({ as = 'div', className = '', children, delay = 0, variant = 'up' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed] = useState<boolean>(
    () =>
      typeof window !== 'undefined' &&
      typeof IntersectionObserver !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [revealed, setRevealed] = useState<boolean>(false);

  useEffect(() => {
    if (!armed) return;
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [armed]);

  const hidden = armed && !revealed;
  const cls = ['reveal', 'aazhi-reveal', className, hidden ? '' : 'is-visible'].filter(Boolean).join(' ');
  // Stagger via transitionDelay only while hidden; cleared after reveal so
  // later opacity/transform transitions are never artificially delayed.
  const style: CSSProperties | undefined =
    hidden && delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return createElement(
    as,
    {
      ref: (node: HTMLElement | null) => {
        ref.current = node;
      },
      className: cls,
      'data-hidden': hidden ? true : undefined,
      'data-variant': variant,
      style,
    },
    children,
  );
}
