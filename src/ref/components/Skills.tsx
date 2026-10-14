import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '../lib/splitText';
import { skills } from '../content';

gsap.registerPlugin(ScrollTrigger);

type MobileLoopState = {
  rafId: number | null;
  pauseTimeout: ReturnType<typeof setTimeout> | null;
  io: IntersectionObserver | null;
  handlers?: { pauseShortly: () => void };
  cloneCount?: number;
  prevDisplay?: string;
  prevFlexWrap?: string;
  prevWhiteSpace?: string;
  prevWidth?: string;
  prevMinWidth?: string;
  singleWidth?: number;
};

type SkillsTrackElement = HTMLDivElement & { __mobileLoopState?: MobileLoopState };

type SkillsSectionElement = HTMLElement & {
  __mobileMql?: { remove: () => void };
  __stopMobileSkills?: () => void;
};

export default function Skills() {
  const rootRef = useRef<HTMLElement | null>(null);

  const leftTokens = [...skills.rowLeft, ...skills.rowLeft];
  const rightTokens = [...skills.rowRight, ...skills.rowRight];
  const leftStartIndex = skills.rowLeft.length + Math.floor(skills.rowLeft.length / 2);
  const rightStartIndex = skills.rowRight.length + Math.floor(skills.rowRight.length / 2);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const section = root as SkillsSectionElement;
    const splitHeadings: Array<{ el: HTMLElement; original: string }> = [];

    const ctx = gsap.context(() => {
      // Portfolio heading char-split scrub (mirrors initPortfolioHeadingAnimations, scoped).
      const heading = root.querySelector<HTMLElement>('.portfolio-heading h2');
      if (
        heading &&
        !heading.classList.contains('contact-main-title') &&
        !heading.dataset.portfolioAnimated
      ) {
        heading.dataset.portfolioAnimated = 'true';
        splitHeadings.push({ el: heading, original: heading.textContent ?? '' });
        try {
          const titleSplit = SplitText.create(heading, { type: 'chars', charsClass: 'char' });
          titleSplit.chars.forEach((char, i) => {
            const charInitialY = i % 2 === 0 ? -100 : 100;
            gsap.set(char, { y: charInitialY, opacity: 0 });
          });
          ScrollTrigger.create({
            trigger: heading,
            start: 'top 85%',
            end: 'top 20%',
            scrub: 1,
            onUpdate: (self) => {
              titleSplit.chars.forEach((char, i) => {
                const charProgress = Math.min(1, Math.max(0, (self.progress - i * 0.02) * 2));
                const charInitialY = i % 2 === 0 ? -100 : 100;
                gsap.set(char, {
                  y: charInitialY - charProgress * charInitialY,
                  opacity: charProgress,
                });
              });
            },
          });
        } catch {
          gsap.fromTo(
            heading,
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: heading,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        }
      }

      // Center reveal (kept for parity with initSkillsSection; our markup has no .skill-item).
      const revealHost = root.querySelector<HTMLElement>('.skills-reveal');
      const revealItems = Array.from(root.querySelectorAll<HTMLElement>('.skills-reveal .skill-item'));
      if (revealItems.length > 0 && revealHost) {
        gsap.fromTo(
          revealItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: revealHost,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }

      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      const leftRow = root.querySelector<HTMLElement>('.skills-left');
      const rightRow = root.querySelector<HTMLElement>('.skills-right');
      const leftTrack = (
        leftRow ? leftRow.querySelector<HTMLDivElement>('.skills-track') : null
      ) as SkillsTrackElement | null;
      const rightTrack = (
        rightRow ? rightRow.querySelector<HTMLDivElement>('.skills-track') : null
      ) as SkillsTrackElement | null;

      // Desktop: single pinned timeline moving left track left and right track right.
      if (isDesktop && leftRow && rightRow && leftTrack && rightTrack) {
        leftTrack.style.transform = '';
        rightTrack.style.transform = '';

        const leftVisible = leftRow.clientWidth;
        const leftWidth = leftTrack.scrollWidth;
        const leftOverflow = Math.max(0, leftWidth - leftVisible + 20);

        const rightVisible = rightRow.clientWidth;
        const rightWidth = rightTrack.scrollWidth;
        const rightOverflow = Math.max(0, rightWidth - rightVisible + 20);

        if (leftOverflow <= 2 && rightOverflow <= 2) {
          // nothing to animate
        } else {
          const totalDistance = Math.max(leftVisible + leftOverflow, rightVisible + rightOverflow);

          const skillPinViewportFactor = 0.6;
          const maxPin = Math.max(Math.round(window.innerHeight * skillPinViewportFactor), 120);
          const endDistance = Math.min(totalDistance, maxPin);

          const movementScale = 0.30;

          const tl = gsap.timeline();

          if (leftOverflow > 2) {
            const startCardLeft = leftTrack.querySelector<HTMLElement>('.skill-card.start-here-left');
            let initialOffsetLeft = 0;
            if (startCardLeft) {
              const cardLeft = startCardLeft.offsetLeft;
              const cardWidth = startCardLeft.offsetWidth;
              const centerTargetLeft = Math.max(0, leftVisible / 2 - cardWidth / 2);
              initialOffsetLeft = Math.max(0, cardLeft - centerTargetLeft);
            }

            if (initialOffsetLeft > 0) {
              const scaledLeftTarget = -initialOffsetLeft - leftOverflow * movementScale;
              tl.fromTo(leftTrack, { x: -initialOffsetLeft }, { x: scaledLeftTarget, ease: 'none' }, 0);
            } else {
              tl.to(leftTrack, { x: () => -leftOverflow * movementScale, ease: 'none' }, 0);
            }
          }

          if (rightOverflow > 2) {
            const startCard = rightTrack.querySelector<HTMLElement>('.skill-card.start-here');
            let initialOffset = 0;
            if (startCard) {
              const cardLeft = startCard.offsetLeft;
              const cardWidth = startCard.offsetWidth;
              const centerTarget = Math.max(0, rightVisible / 2 - cardWidth / 2);
              initialOffset = Math.max(0, cardLeft - centerTarget);
            }

            const scaledTarget = rightOverflow * movementScale - initialOffset;

            tl.fromTo(rightTrack, { x: -initialOffset }, { x: scaledTarget, ease: 'none' }, 0);
          }

          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () => `+=${endDistance}`,
            scrub: 2.4,
            pin: true,
            animation: tl,
            invalidateOnRefresh: true,
            onToggle: (self) => {
              try {
                if (self.isActive) {
                  gsap.set(section, { force3D: true });
                  section.style.willChange = 'transform, top, left';
                } else {
                  section.style.willChange = '';
                }
              } catch {
                // ignore
              }
            },
          });
        }
      }

      // Mobile/tablet: lightweight infinite auto-scroll loops.
      if (!isDesktop) {
        try {
          function stopMobileLoop(track: SkillsTrackElement): void {
            if (!track) return;
            const state = track.__mobileLoopState;
            if (!state) return;
            if (state.rafId !== null) cancelAnimationFrame(state.rafId);
            if (state.pauseTimeout) clearTimeout(state.pauseTimeout);
            try {
              const clones = Array.from(track.querySelectorAll('[data-mobile-clone]'));
              clones.forEach((cl) => {
                cl.remove();
              });
            } catch {
              // ignore
            }
            track.style.transform = '';
            track.style.width = state.prevWidth ?? '';
            track.style.minWidth = state.prevMinWidth ?? '';
            track.style.display = state.prevDisplay ?? '';
            track.style.flexWrap = state.prevFlexWrap ?? '';
            track.style.whiteSpace = state.prevWhiteSpace ?? '';
            try {
              if (state.handlers) {
                track.removeEventListener('pointerenter', state.handlers.pauseShortly);
                track.removeEventListener('pointerdown', state.handlers.pauseShortly);
                track.removeEventListener('touchstart', state.handlers.pauseShortly);
              }
            } catch {
              // ignore
            }
            try {
              if (state.io && typeof state.io.disconnect === 'function') state.io.disconnect();
            } catch {
              // ignore
            }
            try {
              track.removeAttribute('data-mobile-duplicated');
            } catch {
              // ignore
            }
            delete track.__mobileLoopState;
          }

          function startMobileLoop(
            track: SkillsTrackElement,
            direction: 'left' | 'right' = 'left',
            speedPxPerSec = 30,
            initialOffset = 0,
          ): void {
            if (!track) return;
            stopMobileLoop(track);

            const st: MobileLoopState = { rafId: null, pauseTimeout: null, io: null };
            track.__mobileLoopState = st;

            let singleWidth = 0;

            if (track.getAttribute('data-mobile-duplicated') === 'true') {
              const curTotal = track.scrollWidth || 0;
              singleWidth = curTotal / 2 || 0;
              st.singleWidth = singleWidth;
            } else {
              const children = Array.from(track.children);
              st.cloneCount = children.length;
              st.prevDisplay = track.style.display || '';
              st.prevFlexWrap = track.style.flexWrap || '';
              st.prevWhiteSpace = track.style.whiteSpace || '';
              st.prevWidth = track.style.width || '';
              st.prevMinWidth = track.style.minWidth || '';

              children.forEach((c) => {
                const clone = c.cloneNode(true) as Element;
                clone.setAttribute('data-mobile-clone', 'true');
                track.appendChild(clone);
              });

              track.style.display = track.style.display || 'inline-flex';
              track.style.flexWrap = 'nowrap';
              track.style.whiteSpace = 'nowrap';
              track.style.willChange = 'transform';

              const totalWidth = track.scrollWidth || 0;
              singleWidth = totalWidth / 2 || 0;
              if (totalWidth > 0) {
                track.style.width = `${totalWidth}px`;
                track.style.minWidth = `${totalWidth}px`;
              }

              track.setAttribute('data-mobile-duplicated', 'true');
              st.singleWidth = singleWidth;
            }

            let pos = 0;
            let last = performance.now();
            let rafId: number | null = null;
            let paused = false;

            function step(now: number): void {
              if (rafId === null) return;
              const dt = Math.min(0.05, (now - last) / 1000);
              last = now;
              if (!paused && singleWidth > 0) {
                pos += (direction === 'left' ? -1 : 1) * (speedPxPerSec * dt);
                if (pos <= -singleWidth) pos += singleWidth;
                if (pos >= singleWidth) pos -= singleWidth;
                track.style.transform = `translateX(${pos}px)`;
              }
              rafId = requestAnimationFrame(step);
            }

            function pauseShortly(): void {
              paused = true;
              if (st.pauseTimeout) clearTimeout(st.pauseTimeout);
              st.pauseTimeout = setTimeout(() => {
                paused = false;
              }, 900);
            }

            let io: IntersectionObserver | null = null;
            try {
              io = new IntersectionObserver(
                (entries) => {
                  entries.forEach((en) => {
                    paused = !en.isIntersecting;
                  });
                },
                { threshold: 0 },
              );
              io.observe(track.parentElement ?? track);
            } catch {
              io = null;
            }

            track.addEventListener('pointerenter', pauseShortly, { passive: true });
            track.addEventListener('pointerdown', pauseShortly, { passive: true });
            track.addEventListener('touchstart', pauseShortly, { passive: true });

            if (singleWidth > 0 && initialOffset) {
              const clamped = initialOffset % singleWidth;
              pos = -clamped;
              track.style.transform = `translateX(${pos}px)`;
            }

            rafId = requestAnimationFrame(step);

            st.rafId = rafId;
            st.io = io;
            st.handlers = { pauseShortly };
          }

          if (leftTrack) stopMobileLoop(leftTrack);
          if (rightTrack) stopMobileLoop(rightTrack);

          if (leftTrack && leftRow) {
            const startCardLeft = leftTrack.querySelector<HTMLElement>('.skill-card.start-here-left');
            if (startCardLeft) {
              const cardLeft = startCardLeft.offsetLeft;
              const cardWidth = startCardLeft.offsetWidth;
              const centerTargetLeft = Math.max(0, leftRow.clientWidth / 2 - cardWidth / 2);
              const initialOffsetLeft = Math.max(0, cardLeft - centerTargetLeft);
              leftTrack.style.transform = `translateX(${-initialOffsetLeft}px)`;
            }
          }

          if (rightTrack && rightRow) {
            const startCard = rightTrack.querySelector<HTMLElement>('.skill-card.start-here');
            if (startCard) {
              const cardLeft = startCard.offsetLeft;
              const cardWidth = startCard.offsetWidth;
              const centerTarget = Math.max(0, rightRow.clientWidth / 2 - cardWidth / 2);
              const initialOffset = Math.max(0, cardLeft - centerTarget);
              rightTrack.style.transform = `translateX(${-initialOffset}px)`;
            }
          }

          let initialOffsetLeft = 0;
          let initialOffsetRight = 0;
          try {
            if (leftTrack && leftRow) {
              const startCardLeft = leftTrack.querySelector<HTMLElement>('.skill-card.start-here-left');
              if (startCardLeft) {
                const cardLeft = startCardLeft.offsetLeft;
                const cardWidth = startCardLeft.offsetWidth;
                const centerTargetLeft = Math.max(0, leftRow.clientWidth / 2 - cardWidth / 2);
                initialOffsetLeft = Math.max(0, cardLeft - centerTargetLeft);
              }
            }
          } catch {
            initialOffsetLeft = 0;
          }

          try {
            if (rightTrack && rightRow) {
              const startCard = rightTrack.querySelector<HTMLElement>('.skill-card.start-here');
              if (startCard) {
                const cardLeft = startCard.offsetLeft;
                const cardWidth = startCard.offsetWidth;
                const centerTarget = Math.max(0, rightRow.clientWidth / 2 - cardWidth / 2);
                initialOffsetRight = Math.max(0, cardLeft - centerTarget);
              }
            }
          } catch {
            initialOffsetRight = 0;
          }

          if (leftTrack) startMobileLoop(leftTrack, 'left', 32, initialOffsetLeft);
          if (rightTrack) startMobileLoop(rightTrack, 'left', 32, initialOffsetRight);

          const mql = window.matchMedia('(max-width: 1023px)');
          function mqHandler(e: MediaQueryListEvent): void {
            if (e.matches) {
              let iLeft = 0;
              let iRight = 0;
              try {
                const sc = leftTrack?.querySelector<HTMLElement>('.skill-card.start-here-left');
                if (sc && leftRow) {
                  iLeft = Math.max(0, sc.offsetLeft - Math.max(0, leftRow.clientWidth / 2 - sc.offsetWidth / 2));
                }
              } catch {
                iLeft = 0;
              }
              try {
                const sc2 = rightTrack?.querySelector<HTMLElement>('.skill-card.start-here');
                if (sc2 && rightRow) {
                  iRight = Math.max(0, sc2.offsetLeft - Math.max(0, rightRow.clientWidth / 2 - sc2.offsetWidth / 2));
                }
              } catch {
                iRight = 0;
              }
              if (leftTrack) startMobileLoop(leftTrack, 'left', 32, iLeft);
              if (rightTrack) startMobileLoop(rightTrack, 'left', 32, iRight);
            } else {
              if (leftTrack) stopMobileLoop(leftTrack);
              if (rightTrack) stopMobileLoop(rightTrack);
            }
          }

          if (section.__mobileMql) {
            try {
              section.__mobileMql.remove();
            } catch {
              // ignore
            }
            delete section.__mobileMql;
          }

          if (typeof mql.addEventListener === 'function') {
            mql.addEventListener('change', mqHandler);
            section.__mobileMql = { remove: () => mql.removeEventListener('change', mqHandler) };
          } else if (typeof mql.addListener === 'function') {
            mql.addListener(mqHandler);
            section.__mobileMql = { remove: () => mql.removeListener(mqHandler) };
          }

          section.__stopMobileSkills = () => {
            if (leftTrack) stopMobileLoop(leftTrack);
            if (rightTrack) stopMobileLoop(rightTrack);
            if (section.__mobileMql && typeof section.__mobileMql.remove === 'function') {
              section.__mobileMql.remove();
            }
            delete section.__mobileMql;
          };
        } catch {
          console.warn('mobile skills auto-scroll failed');
        }
      }

      ScrollTrigger.refresh();
    }, root);

    return () => {
      try {
        section.__stopMobileSkills?.();
      } catch {
        // ignore
      }
      try {
        delete section.__stopMobileSkills;
      } catch {
        // ignore
      }
      ctx.revert();
      splitHeadings.forEach(({ el, original }) => {
        try {
          el.textContent = original;
          delete el.dataset.portfolioAnimated;
        } catch {
          // ignore
        }
      });
    };
  }, []);

  return (
    <section className="skills-section section-container" id="skills" ref={rootRef}>
      <div className="skills-inner">
        <div className="portfolio-heading">
          <h2 className="skills-title">{skills.heading}</h2>
        </div>
        <div className="skills-row skills-left">
          <div className="skills-track">
            {leftTokens.map((token, i) => (
              <div key={i} className={i === leftStartIndex ? 'skill-card start-here-left' : 'skill-card'}>
                {token}
              </div>
            ))}
          </div>
        </div>
        <div className="skills-row skills-right">
          <div className="skills-track">
            {rightTokens.map((token, i) => (
              <div
                key={i}
                className={i === rightStartIndex ? 'skill-card card-right start-here' : 'skill-card card-right'}
              >
                {token}
              </div>
            ))}
          </div>
        </div>
        <div className="skills-row skills-reveal">
          <h2 className="skills-title skills-main">{skills.mainTitle}</h2>
          <div className="skills-grid skills-large-grid">
            {skills.cards.map((card) => (
              <article className="skill-large" key={card.number}>
                <figure className="skill-large-figure">
                  <img src={card.icon} alt={`${card.title} icon`} className="skill-large-icon" />
                  <figcaption className="skill-large-number">{card.number}</figcaption>
                </figure>
                <h3 className="skill-large-title">{card.title}</h3>
                <div className="skill-large-sub">{card.sub}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
