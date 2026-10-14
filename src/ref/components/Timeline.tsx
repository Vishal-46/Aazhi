import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { journey } from '../content';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const timelineSection = rootRef.current;
    if (!timelineSection) return;

    const ctx = gsap.context(() => {
      const sectionEl = timelineSection;
      const timelineItems = Array.from(sectionEl.querySelectorAll<HTMLElement>('.timeline-item'));
      const timelineRailFill = sectionEl.querySelector<HTMLElement>('.timeline-rail-fill');
      const timelineSubtitle = sectionEl.querySelector<HTMLElement>('.timeline-subtitle');
      const timelineHeadingBlock = sectionEl.querySelector<HTMLElement>('.portfolio-heading');
      const isDesktopTimeline = window.matchMedia('(min-width: 1024px)').matches;

      function applyTimelineTheme(isDark: boolean) {
        gsap.to(sectionEl, {
          '--timeline-bg': isDark ? '#000000' : '#f4f3ef',
          '--timeline-fg': isDark ? '#ffffff' : '#141414',
          '--timeline-muted': isDark ? 'rgba(255, 255, 255, 0.78)' : 'rgba(20, 20, 20, 0.78)',
          '--timeline-border': isDark ? '#ffffff' : '#000000',
          '--timeline-rail-fill': isDark ? '#ffffff' : '#141414',
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        if (timelineSubtitle) {
          gsap.to(timelineSubtitle, {
            color: isDark ? 'rgba(255, 255, 255, 0.78)' : 'rgba(20, 20, 20, 0.78)',
            duration: 0.6,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }

        if (timelineHeadingBlock) {
          gsap.to(timelineHeadingBlock, {
            borderTopColor: isDark ? '#ffffff' : '#000000',
            borderBottomColor: isDark ? '#ffffff' : '#000000',
            duration: 0.6,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      }

      applyTimelineTheme(false);

      if (timelineRailFill) {
        gsap.set(timelineRailFill, { scaleY: 0, transformOrigin: 'top center' });

        ScrollTrigger.create({
          trigger: sectionEl,
          start: 'top 80%',
          end: 'bottom 25%',
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(timelineRailFill, { scaleY: self.progress });
          },
        });
      }

      timelineItems.forEach((item, index) => {
        const card = item.querySelector<HTMLElement>('.timeline-card');
        const year = item.querySelector<HTMLElement>('.timeline-year');
        const marker = item.querySelector<HTMLElement>('.timeline-marker');
        const slideFromX = isDesktopTimeline ? (index % 2 === 0 ? -70 : 70) : 0;

        if (marker) {
          gsap.fromTo(
            marker,
            { opacity: 0, scale: 0.5 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.45,
              ease: 'back.out(1.8)',
              scrollTrigger: {
                trigger: item,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
                invalidateOnRefresh: true,
              },
            },
          );
        }

        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 36, x: slideFromX },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
                invalidateOnRefresh: true,
              },
            },
          );
        }

        if (year) {
          gsap.fromTo(
            year,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 84%',
                toggleActions: 'play none none reverse',
                invalidateOnRefresh: true,
              },
            },
          );
        }

        ScrollTrigger.create({
          trigger: item,
          start: 'top 60%',
          end: 'bottom 40%',
          invalidateOnRefresh: true,
          onEnter: () => applyTimelineTheme(index % 2 === 1),
          onEnterBack: () => applyTimelineTheme(index % 2 === 1),
        });
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="timeline-section section-container" id="journey">
      <div className="timeline-shell">
        <p className="timeline-subtitle seq">{journey.subtitle}</p>
        <div className="timeline-track" aria-label="My learning journey">
          <span className="timeline-rail" aria-hidden="true">
            <span className="timeline-rail-fill" />
          </span>
          {journey.items.map((item) => (
            <article key={item.year} className="timeline-item" data-year={item.year}>
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-card">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-text">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
