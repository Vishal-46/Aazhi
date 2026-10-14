import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VanillaTilt, { type TiltOptions } from 'vanilla-tilt';
import { SplitText } from '../lib/splitText';
import { projects } from '../content';

gsap.registerPlugin(ScrollTrigger);

const NO_MOTION_PREFERENCE_QUERY = '(prefers-reduced-motion: no-preference)';

export default function Projects() {
  const headingRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const didInit = useRef(false);

  useLayoutEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    const headingEl = headingRef.current;
    const section = sectionRef.current;
    if (!section) {
      didInit.current = false;
      return;
    }
    const sectionEl: HTMLElement = section;

    const splitHeadings: Array<{ el: HTMLElement; original: string }> = [];
    let initTimer: ReturnType<typeof setTimeout> | null = null;
    let disposeInner: (() => void) | null = null;

    const ctx = gsap.context(() => {
      // Portfolio heading char-split scrub (mirrors initPortfolioHeadingAnimations, scoped).
      if (headingEl) {
        const heading = headingEl.querySelector<HTMLElement>('h2');
        if (heading && !heading.classList.contains('contact-main-title') && !heading.dataset.portfolioAnimated) {
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
      }

      const titleBlock = sectionEl.querySelector<HTMLElement>('.inner-container.title-block');
      const projectWrapper = sectionEl.querySelector<HTMLElement>('.project-wrapper');
      const dotsContainer = sectionEl.querySelector<HTMLElement>('#projectsDots');
      const projectLinks = Array.from(sectionEl.querySelectorAll<HTMLElement>('.project-link'));

      if (!projectWrapper || projectLinks.length === 0) return;
      const wrapperEl: HTMLElement = projectWrapper;

      let projectsTimeline: gsap.core.Timeline | null = null;
      let projectsScrollTrigger: ScrollTrigger | null = null;
      let projectsRevealTimeline: gsap.core.Timeline | null = null;
      let projectsRevealScrollTrigger: ScrollTrigger | null = null;

      function cleanupProjects(): void {
        if (projectsScrollTrigger) {
          projectsScrollTrigger.kill();
          projectsScrollTrigger = null;
        }
        if (projectsTimeline) {
          projectsTimeline.kill();
          projectsTimeline = null;
        }
        if (projectsRevealScrollTrigger) {
          projectsRevealScrollTrigger.kill();
          projectsRevealScrollTrigger = null;
        }
        if (projectsRevealTimeline) {
          projectsRevealTimeline.progress(1);
          projectsRevealTimeline = null;
        }

        sectionEl.style.removeProperty('width');
        sectionEl.style.removeProperty('transform');
        sectionEl.classList.remove('will-change-transform');
        if (titleBlock) titleBlock.classList.remove('will-change-transform');

        wrapperEl.style.removeProperty('width');
        wrapperEl.style.removeProperty('padding');
        wrapperEl.style.removeProperty('transform');
        wrapperEl.classList.remove('overflow-x-auto');
      }

      function setWillChange(active: boolean): void {
        sectionEl.classList.toggle('will-change-transform', active);
        if (titleBlock) titleBlock.classList.toggle('will-change-transform', active);
      }

      function initReveal(): void {
        if (projectsRevealScrollTrigger) {
          projectsRevealScrollTrigger.kill();
          projectsRevealScrollTrigger = null;
        }
        if (projectsRevealTimeline) projectsRevealTimeline.progress(1);

        projectsRevealTimeline = gsap.timeline({ defaults: { ease: 'none' } });
        projectsRevealTimeline.from(Array.from(sectionEl.querySelectorAll('.seq')), {
          opacity: 0,
          duration: 0.5,
          stagger: 0.2,
        });

        projectsRevealScrollTrigger = ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 0,
          animation: projectsRevealTimeline,
        });
      }

      function initDesktopPin(): void {
        if (projectsScrollTrigger) {
          projectsScrollTrigger.kill();
          projectsScrollTrigger = null;
        }
        if (projectsTimeline) {
          projectsTimeline.kill();
          projectsTimeline = null;
        }

        const innerContainer = sectionEl.querySelector<HTMLElement>('.inner-container');
        if (!innerContainer) return;

        const sidePadding = document.body.clientWidth - innerContainer.clientWidth;
        const projectsWidth = wrapperEl.scrollWidth;
        const viewportWidth = window.innerWidth;
        const containerPadding = sidePadding / 2;
        const totalScrollDistance = projectsWidth - viewportWidth + containerPadding;
        const elementWidth = sidePadding + projectsWidth;

        sectionEl.style.width = `${elementWidth}px`;
        const xDistance = -Math.max(0, totalScrollDistance);
        const duration = `${Math.max((totalScrollDistance / viewportWidth) * 100, 100)}%`;

        projectsTimeline = gsap.timeline({ defaults: { ease: 'none' } });
        projectsTimeline.to(sectionEl, { x: xDistance });
        if (titleBlock) projectsTimeline.to(titleBlock, { x: -xDistance }, '<');

        projectsScrollTrigger = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: duration,
          scrub: 1.1,
          anticipatePin: 1,
          fastScrollEnd: false,
          pin: true,
          animation: projectsTimeline,
          pinSpacing: 'margin',
          invalidateOnRefresh: true,
          onToggle: (self) => {
            setWillChange(self.isActive);
            try {
              if (self.isActive) {
                gsap.set(section, { force3D: true });
                sectionEl.style.willChange = 'transform, top, left';
              } else {
                sectionEl.style.willChange = '';
              }
            } catch {
              // ignore
            }
          },
        });

        ScrollTrigger.refresh();
      }

      function initMobileFallback(): void {
        const parentPadding = window.getComputedStyle(sectionEl).paddingLeft;
        sectionEl.style.setProperty('width', '100%');
        wrapperEl.classList.add('overflow-x-auto');
        wrapperEl.style.setProperty('width', 'calc(100vw)');
        wrapperEl.style.setProperty('padding', `0 ${parentPadding}`);
        wrapperEl.style.setProperty('transform', `translateX(-${parentPadding})`);
      }

      function initVanillaTilt(): void {
        try {
          const globalTilt = (window as unknown as { VanillaTilt?: typeof VanillaTilt }).VanillaTilt;
          const Tilt = globalTilt ?? VanillaTilt;
          if (!Tilt || typeof Tilt.init !== 'function') return;
          const tiles = Array.from(sectionEl.querySelectorAll<HTMLElement>('.project-tile'));
          tiles.forEach((tile) => {
            try {
              Tilt.init(tile, {
                max: 5,
                speed: 400,
                glare: true,
                'max-glare': 0.2,
                gyroscope: false,
              } as TiltOptions);
            } catch {
              // ignore
            }
          });
        } catch {
          // ignore
        }
      }

      function destroyTilt(): void {
        const tiles = Array.from(sectionEl.querySelectorAll<HTMLElement>('.project-tile'));
        tiles.forEach((tile) => {
          try {
            const t = tile as unknown as { vanillaTilt?: { destroy?: () => void } };
            if (t.vanillaTilt && typeof t.vanillaTilt.destroy === 'function') t.vanillaTilt.destroy();
          } catch {
            // ignore
          }
        });
      }

      function setProjectGradients(): void {
        const tiles = Array.from(sectionEl.querySelectorAll<HTMLElement>('.project-tile'));
        tiles.forEach((tile) => {
          try {
            tile.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))';
            tile.style.border = '2px solid rgba(255,255,255,0.95)';
            tile.style.backdropFilter = 'blur(8px)';
            (tile.style as CSSStyleDeclaration & { webkitBackdropFilter?: string }).webkitBackdropFilter =
              'blur(8px)';
            tile.style.boxShadow = '0 6px 18px rgba(0,0,0,0.18)';
          } catch {
            // ignore
          }
        });
      }

      function equalizeProjectCardHeights(): void {
        try {
          projectLinks.forEach((link) => {
            link.style.height = 'auto';
            link.style.minHeight = '';
          });
          const tiles = Array.from(sectionEl.querySelectorAll<HTMLElement>('.project-tile'));
          tiles.forEach((tile) => {
            tile.style.height = '';
          });

          let maxHeight = 0;
          projectLinks.forEach((link) => {
            const tile = link.querySelector<HTMLElement>('.project-tile');
            if (!tile) return;
            const height = tile.offsetHeight;
            if (height > maxHeight) maxHeight = height;
          });

          if (maxHeight > 0) {
            projectLinks.forEach((link) => {
              link.style.height = `${maxHeight}px`;
            });
          }
        } catch {
          console.warn('equalizeProjectCardHeights failed');
        }
      }

      function buildDots(): void {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        dotsContainer.setAttribute('aria-hidden', 'false');

        projectLinks.forEach((item, index) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'projects-dot';
          button.setAttribute('aria-label', `Go to project ${index + 1}`);
          button.addEventListener('click', (event) => {
            event.preventDefault();
            const desiredLeft = Math.round(item.offsetLeft - (wrapperEl.clientWidth - item.clientWidth) / 2);
            const maxLeft = Math.max(0, wrapperEl.scrollWidth - wrapperEl.clientWidth);
            const clampedLeft = Math.max(0, Math.min(desiredLeft, maxLeft));
            wrapperEl.scrollTo({ left: clampedLeft, behavior: 'smooth' });
          });
          dotsContainer.appendChild(button);
        });
      }

      function activateDot(index: number): void {
        if (!dotsContainer) return;
        Array.from(dotsContainer.querySelectorAll('button')).forEach((button, i) => {
          button.classList.toggle('active', i === index);
        });
      }

      function syncDotsWithScroll(): void {
        if (!dotsContainer) return;
        const containerRect = wrapperEl.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        let nearestIndex = 0;
        let minDistance = Infinity;

        projectLinks.forEach((item, index) => {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.left + rect.width / 2;
          const distance = Math.abs(centerX - itemCenter);
          if (distance < minDistance) {
            minDistance = distance;
            nearestIndex = index;
          }
        });

        activateDot(nearestIndex);
      }

      function onProjectScroll(): void {
        requestAnimationFrame(syncDotsWithScroll);
      }

      function enableMobileDots(): void {
        if (!dotsContainer) return;
        buildDots();
        wrapperEl.addEventListener('scroll', onProjectScroll, { passive: true });
      }

      function disableMobileDots(): void {
        wrapperEl.removeEventListener('scroll', onProjectScroll);
        if (dotsContainer) dotsContainer.innerHTML = '';
      }

      function initResponsiveMode(): void {
        cleanupProjects();
        initReveal();

        const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
        const motionAllowed = window.matchMedia(NO_MOTION_PREFERENCE_QUERY).matches;

        if (isDesktop && motionAllowed) {
          initDesktopPin();
          disableMobileDots();
        } else {
          initMobileFallback();
          enableMobileDots();
        }

        setProjectGradients();
        initVanillaTilt();
        equalizeProjectCardHeights();
        if (dotsContainer && !isDesktop) {
          syncDotsWithScroll();
        }
        ScrollTrigger.refresh();
      }

      let debounceTimeout: ReturnType<typeof setTimeout> | null = null;
      function handleResize(): void {
        if (debounceTimeout) clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          initResponsiveMode();
        }, 160);
      }

      function handleBeforeUnload(): void {
        cleanupProjects();
      }

      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleResize);
      window.addEventListener('beforeunload', handleBeforeUnload);

      initTimer = setTimeout(() => {
        initResponsiveMode();
      }, 100);

      disposeInner = () => {
        if (debounceTimeout) {
          clearTimeout(debounceTimeout);
          debounceTimeout = null;
        }
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
        window.removeEventListener('beforeunload', handleBeforeUnload);
        disableMobileDots();
        destroyTilt();
        cleanupProjects();
      };
    }, section);

    return () => {
      if (disposeInner) {
        try {
          disposeInner();
        } catch {
          // ignore
        }
        disposeInner = null;
      }
      if (initTimer) {
        clearTimeout(initTimer);
        initTimer = null;
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
      didInit.current = false;
    };
  }, []);

  return (
    <>
      <div id="projects" className="portfolio-heading" ref={headingRef}>
        <h2>{projects.heading}</h2>
      </div>
      <section className="section-container projects-section" id="works" ref={sectionRef}>
        <div className="inner-container title-block">
          <p className="section-title-sm seq">{projects.eyebrow}</p>
          <h3 className="section-sub seq">{projects.sub}</h3>
        </div>
        <div className="project-wrapper seq">
          {projects.items.map((item) => {
            const isInternal = item.href.startsWith('#');
            return (
              <a
                key={item.name}
                className="project-link link overflow-hidden snap-start"
                href={item.href}
                {...(isInternal ? {} : { target: '_blank', rel: 'noreferrer' })}
              >
                <div className="project-tile">
                  <img
                    src="/ref/assets/project-bg.svg"
                    alt="Project"
                    className="absolute w-full h-full top-0 left-0 opacity-20"
                  />
                  <img className="project-image" src={item.img} alt={item.alt} />
                  <div className="project-info">
                    <h3 className="project-name">{item.name}</h3>
                    <p className="project-description">{item.description}</p>
                    <div className="project-cta">{item.cta}</div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
        <div
          id="projectsDots"
          className="projects-dots"
          role="tablist"
          aria-label="Project cards navigation"
          aria-hidden="true"
        ></div>
      </section>
    </>
  );
}
