import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hero, thriving } from '../content';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl) return;

    const ctx = gsap.context(() => {
      try {
        const introHeading = document.querySelector('.lp-intro .lp-heading');
        const ctas = document.querySelectorAll('.lp-hero-cta a');
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from(introHeading, { y: 28, opacity: 0, duration: 0.9 }).from(
          ctas,
          { y: 3, opacity: 0, stagger: 0.12, duration: 0.6 },
          '-=0.35',
        );
      } catch {
        /* ignore */
      }

      const cardContainer = document.querySelector<HTMLElement>('.lp-card-container');
      const stickyHeader = document.querySelector<HTMLElement>('.lp-sticky-header .lp-heading');
      let isGapDone = false;
      let isFlipDone = false;

      const mm = gsap.matchMedia();

      mm.add('(max-width: 999px)', () => {
        document
          .querySelectorAll<HTMLElement>('.lp-card, .lp-card-container, .lp-sticky-header .lp-heading')
          .forEach((el) => {
            el.removeAttribute('style');
          });
      });

      mm.add('(min-width: 1000px)', () => {
        ScrollTrigger.create({
          trigger: '.lp-sticky',
          start: 'top top',
          end: () => `+=${window.innerHeight * 4}px`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            try {
              const el = document.querySelector<HTMLElement>('.lp-sticky');
              if (el && self.isActive) {
                gsap.set(el, { force3D: true });
                el.style.willChange = 'transform, top, left';
              } else if (el) {
                el.style.willChange = '';
              }
            } catch {
              /* ignore */
            }
          },
          onUpdate: (self) => {
            const progress = self.progress;

            if (stickyHeader) {
              if (progress >= 0.1 && progress <= 0.25) {
                const headerProgress = gsap.utils.mapRange(0.1, 0.25, 0, 1, progress);
                const yValue = gsap.utils.mapRange(0, 1, 40, 0, headerProgress);
                const opacityValue = gsap.utils.mapRange(0, 1, 0, 1, headerProgress);
                gsap.set(stickyHeader, { y: yValue, opacity: opacityValue });
              } else if (progress < 0.1) {
                gsap.set(stickyHeader, { y: 40, opacity: 0 });
              } else if (progress > 0.25) {
                gsap.set(stickyHeader, { y: 0, opacity: 1 });
              }
            }

            if (cardContainer) {
              if (progress <= 0.25) {
                const widthPercentage = gsap.utils.mapRange(0, 0.25, 75, 60, progress);
                gsap.set(cardContainer, { width: `${widthPercentage}%` });
              } else {
                gsap.set(cardContainer, { width: '60%' });
              }
            }

            if (progress >= 0.35 && !isGapDone) {
              if (cardContainer)
                gsap.to(cardContainer, { gap: '20px', duration: 0.5, ease: 'power3.out' });
              gsap.to(['#card-1', '#card-2', '#card-3'], {
                borderRadius: '20px',
                duration: 0.5,
                ease: 'power3.out',
              });
              isGapDone = true;
            } else if (progress < 0.35 && isGapDone) {
              if (cardContainer)
                gsap.to(cardContainer, { gap: '0px', duration: 0.5, ease: 'power3.out' });
              gsap.to('#card-1', {
                borderRadius: '20px 0 0 20px',
                duration: 0.5,
                ease: 'power3.out',
              });
              gsap.to('#card-2', { borderRadius: '0', duration: 0.5, ease: 'power3.out' });
              gsap.to('#card-3', {
                borderRadius: '0 20px 20px 0',
                duration: 0.5,
                ease: 'power3.out',
              });
              isGapDone = false;
            }

            if (progress >= 0.7 && !isFlipDone) {
              gsap.to('.lp-card', {
                rotationY: 180,
                duration: 0.75,
                ease: 'power3.out',
                stagger: 0.1,
              });
              gsap.to(['#card-1', '#card-3'], {
                y: 30,
                rotationZ: (i: number) => [-15, 15][i],
                duration: 0.75,
                ease: 'power3.inOut',
              });
              isFlipDone = true;
            } else if (progress < 0.7 && isFlipDone) {
              gsap.to('.lp-card', {
                rotationY: 0,
                duration: 0.75,
                ease: 'power3.inOut',
                stagger: -0.1,
              });
              gsap.to(['#card-1', '#card-3'], {
                y: 0,
                rotationZ: 0,
                duration: 0.75,
                ease: 'power3.inOut',
              });
              isFlipDone = false;
            }
          },
        });
      });
    }, rootRef);

    let rafId: number | null = null;
    let resizeTimer: number | null = null;
    let observer: IntersectionObserver | null = null;
    let handleDotsResize: (() => void) | null = null;

    const section = rootEl.querySelector<HTMLElement>('.lp-intro');
    if (section) {
      let canvas = section.querySelector<HTMLCanvasElement>('.intro-bg-dots');
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.className = 'intro-bg-dots';
        section.insertBefore(canvas, section.firstChild);
      }
      const canvasEl: HTMLCanvasElement = canvas;
      const g = canvasEl.getContext('2d');
      if (g) {
        const g2d: CanvasRenderingContext2D = g;
        let dpr = window.devicePixelRatio || 1;
        let width = 0;
        let height = 0;
        type Dot = {
          x: number;
          y: number;
          size: number;
          vy: number;
          drift: number;
          phase: number;
          color: string;
        };
        let particles: Dot[] = [];
        let lastTime = performance.now();

        const rand = (min: number, max: number) => Math.random() * (max - min) + min;

        const createParticle = (initial: boolean): Dot => {
          const size = Math.max(1, Math.round(rand(2, 6)));
          return {
            x: rand(0, width),
            y: initial ? rand(-height, height) : rand(-20 * dpr, -1 * dpr),
            size: size * dpr,
            vy: rand(0.2, 1.0) * dpr,
            drift: rand(-0.2, 0.2) * dpr,
            phase: rand(0, Math.PI * 2),
            color: `rgba(${rand(60, 120)},${rand(60, 120)},${rand(60, 120)},${rand(0.35, 0.85)})`,
          };
        };

        const resize = () => {
          dpr = window.devicePixelRatio || 1;
          width = Math.max(1, Math.floor(section.clientWidth * dpr));
          height = Math.max(1, Math.floor(section.clientHeight * dpr));
          canvasEl.width = width;
          canvasEl.height = height;
          canvasEl.style.width = `${section.clientWidth}px`;
          canvasEl.style.height = `${section.clientHeight}px`;
          const area = (width / dpr) * (height / dpr);
          const targetCount = Math.max(24, Math.min(140, Math.round(area / 6000)));
          particles = [];
          for (let i = 0; i < targetCount; i += 1) particles.push(createParticle(true));
        };

        const drawDot = (p: Dot) => {
          g2d.fillStyle = p.color;
          const centerX = p.x + p.size * 0.5;
          const centerY = p.y + p.size * 0.35;
          const radius = Math.max(1, p.size * 0.45);
          g2d.beginPath();
          g2d.arc(centerX, centerY, radius, 0, Math.PI * 2);
          g2d.fill();
        };

        const step = (now: number) => {
          const dt = Math.min(50, now - lastTime) / 16.67;
          lastTime = now;
          g2d.clearRect(0, 0, width, height);
          for (let i = 0; i < particles.length; i += 1) {
            const p = particles[i];
            p.phase += 0.01 * dt;
            p.x += Math.sin(p.phase) * p.drift * dt;
            p.y += p.vy * (0.9 + 0.2 * Math.sin(p.phase)) * dt;
            drawDot(p);
            if (p.y > height + p.size) {
              particles[i] = createParticle(false);
              particles[i].x = rand(0, width);
              particles[i].y = -rand(2, 40) * dpr;
            }
          }
          rafId = requestAnimationFrame(step);
        };

        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                if (rafId === null) {
                  lastTime = performance.now();
                  rafId = requestAnimationFrame(step);
                }
              } else if (rafId !== null) {
                cancelAnimationFrame(rafId);
                rafId = null;
              }
            });
          },
          { threshold: 0 },
        );

        resize();
        observer.observe(section);

        handleDotsResize = () => {
          if (resizeTimer !== null) window.clearTimeout(resizeTimer);
          resizeTimer = window.setTimeout(resize, 120);
        };
        window.addEventListener('resize', handleDotsResize);
      }
    }

    return () => {
      if (handleDotsResize) window.removeEventListener('resize', handleDotsResize);
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (observer) observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} id="home" className="text-section">
      <section className="lp-intro">
        <h1 className="lp-heading">
          {hero.solid}
          <span className="lp-name">
            <br />
            {hero.outline}
          </span>
        </h1>
        <p className="lp-sub">{hero.sub}</p>
        <div className="lp-hero-cta">
          <a className="lp-cta" href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </a>
          <a className="lp-resume" href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
          </a>
        </div>
        <p className="lp-proof">{hero.proof}</p>
      </section>
      <section className="lp-sticky">
        <div className="lp-sticky-header">
          <h1 className="lp-heading">{thriving.heading}</h1>
        </div>
        <div className="lp-card-container">
          {thriving.cards.map((card, i) => (
            <div className="lp-card" id={`card-${i + 1}`} key={card.index}>
              <div className="lp-card-front">
                <img src={card.img} alt={card.alt} />
              </div>
              <div className="lp-card-back">
                <span>{card.index}</span>
                <p className="lp-text">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
