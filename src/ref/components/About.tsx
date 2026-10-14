import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '../lib/splitText';
import { about } from '../content';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const createdSplits: Array<{ revert: () => void }> = [];

    const ctx = gsap.context(() => {
      const lightColor =
        (getComputedStyle(document.documentElement).getPropertyValue('--light') || '').trim() ||
        '#f4f3ef';
      const darkColor =
        (getComputedStyle(document.documentElement).getPropertyValue('--dark') || '').trim() ||
        '#141414';

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        ScrollTrigger.create({
          trigger: '.about-horizontal-scroll',
          start: 'top top',
          end: () => `+=${window.innerHeight * 5}`,
          scrub: 0,
          pin: true,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            const scrollEl = document.querySelector<HTMLElement>('.about-horizontal-scroll');
            if (scrollEl && self.isActive) {
              try {
                gsap.set(scrollEl, { force3D: true });
              } catch {
                /* ignore */
              }
              scrollEl.style.willChange = 'transform, top, left';
            } else if (scrollEl) {
              scrollEl.style.willChange = '';
            }
          },
        });

        ScrollTrigger.create({
          trigger: '.about-horizontal-scroll',
          start: 'top 50%',
          end: () => `+=${window.innerHeight}`,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            gsap.set('.about-section', { backgroundColor: lightColor });
            gsap.set('.about-horizontal-scroll-wrapper', { x: '0%' });
          },
        });

        ScrollTrigger.create({
          trigger: '.about-horizontal-scroll',
          start: 'top 50%',
          end: () => `+=${window.innerHeight * 5.5}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress <= 0.05) {
              const bgColorProgress = Math.min(progress / 0.05, 1);
              const newBgColor = String(
                gsap.utils.interpolate(lightColor, darkColor, bgColorProgress),
              );
              gsap.set('.about-section', { backgroundColor: newBgColor });
            } else if (progress >= 0.95) {
              gsap.set('.about-section', { backgroundColor: darkColor });
            }
            if (progress > 0.2 && progress <= 0.95) {
              const horizontalProgress = (progress - 0.2) / 0.75;
              // Three founder slides: full travel is 2/3 of the 300%-wide track.
              const maxShift = (100 * (about.slides.length - 1)) / about.slides.length;
              const wrapperTranslateX = -maxShift * horizontalProgress;
              gsap.set('.about-horizontal-scroll-wrapper', { x: `${wrapperTranslateX}%` });
            }
          },
        });
      });

      mm.add('(max-width: 1023px)', () => {
        try {
          gsap.set('.about-horizontal-scroll-wrapper', { x: '0%' });
          gsap.set('.about-section', { backgroundColor: lightColor });
          const scrollEl = document.querySelector<HTMLElement>('.about-horizontal-scroll');
          if (scrollEl) scrollEl.style.willChange = '';

          const slides = Array.from(
            document.querySelectorAll<HTMLElement>('.about-horizontal-slide'),
          );
          slides.forEach((slide) => {
            if (slide.dataset.flipInit) return;

            slide.dataset.origInner = slide.innerHTML;

            const cols = Array.from(slide.querySelectorAll<HTMLElement>('.col'));
            if (cols.length < 2) return;

            const textCol = cols[0];
            const imgCol = cols[1];

            const flipInner = document.createElement('div');
            flipInner.className = 'flip-inner';

            const front = document.createElement('div');
            front.className = 'flip-front';

            const back = document.createElement('div');
            back.className = 'flip-back';

            front.appendChild(imgCol);
            back.appendChild(textCol);

            const overlayBtn = document.createElement('button');
            overlayBtn.type = 'button';
            overlayBtn.className = 'flip-overlay';
            overlayBtn.textContent = 'know more..';
            front.appendChild(overlayBtn);

            flipInner.appendChild(front);
            flipInner.appendChild(back);

            slide.innerHTML = '';
            slide.appendChild(flipInner);
            slide.classList.add('flip-card');

            const toggleFlip = () => {
              slide.classList.toggle('is-flipped');
            };

            overlayBtn.addEventListener('click', toggleFlip);
            front.addEventListener('click', (e) => {
              if (e.target === overlayBtn) return;
              toggleFlip();
            });

            back.addEventListener('click', (e) => {
              const raw = e.target as Element | null;
              const tag = raw && raw.tagName ? raw.tagName.toLowerCase() : '';
              if (tag === 'a' || tag === 'button' || tag === 'input') return;
              toggleFlip();
            });

            try {
              const heading = back.querySelector<HTMLElement>('.heading--medium, h1, h2, h3');
              if (heading) {
                heading.style.cursor = 'pointer';
                try {
                  heading.tabIndex = 0;
                } catch {
                  /* ignore */
                }
                heading.addEventListener('click', (e) => {
                  e.stopPropagation();
                  toggleFlip();
                });
                heading.addEventListener('keydown', (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFlip();
                  }
                });
              }
            } catch {
              /* ignore */
            }

            slide.dataset.flipInit = '1';
          });
        } catch {
          /* ignore */
        }

        return () => {
          try {
            const built = Array.from(
              document.querySelectorAll<HTMLElement>('.about-horizontal-slide[data-flip-init]'),
            );
            built.forEach((s) => {
              if (s.dataset.origInner) s.innerHTML = s.dataset.origInner;
              s.classList.remove('flip-card', 'is-flipped');
              s.removeAttribute('data-orig-inner');
              s.removeAttribute('data-flip-init');
            });

            gsap.set('.about-horizontal-scroll-wrapper', { x: '0%' });
            gsap.set('.about-section', { backgroundColor: lightColor });
            const scrollEl = document.querySelector<HTMLElement>('.about-horizontal-scroll');
            if (scrollEl) scrollEl.style.willChange = '';
          } catch {
            /* ignore */
          }
        };
      });

      try {
        const headings = root.querySelectorAll<HTMLElement>('.about-section .heading--large');
        headings.forEach((heading) => {
          try {
            const split = SplitText.create(heading, { type: 'words', wordsClass: 'word' });
            createdSplits.push(split);

            (split.words || []).forEach((w: Element) => gsap.set(w, { y: 22, opacity: 0 }));

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: heading,
                start: 'top 92%',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
                invalidateOnRefresh: true,
              },
            });

            tl.to(split.words, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.08,
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
        });

        ScrollTrigger.refresh();
      } catch {
        /* ignore */
      }

      try {
        const container = root.querySelector<HTMLElement>('.portfolio-heading');
        const heading =
          container?.querySelector<HTMLElement>('h1, h2, h3, [role="heading"]') ?? container;
        if (heading && !heading.dataset.portfolioAnimated) {
          heading.dataset.portfolioAnimated = 'true';
          try {
            const titleSplit = SplitText.create(heading, { type: 'chars', charsClass: 'char' });
            createdSplits.push(titleSplit);

            (titleSplit.chars || []).forEach((char: Element, i: number) => {
              const charInitialY = i % 2 === 0 ? -100 : 100;
              gsap.set(char, { y: charInitialY, opacity: 0 });
            });

            ScrollTrigger.create({
              trigger: heading,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 1,
              onUpdate: (self) => {
                (titleSplit.chars || []).forEach((char: Element, i: number) => {
                  const charProgress = Math.min(1, Math.max(0, (self.progress - i * 0.02) * 2));
                  const charInitialY = i % 2 === 0 ? -100 : 100;
                  const charY = charInitialY - charProgress * charInitialY;
                  gsap.set(char, { y: charY, opacity: charProgress });
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

          ScrollTrigger.refresh();
        }
      } catch {
        /* ignore */
      }
    }, rootRef);

    return () => {
      createdSplits.forEach((s) => {
        try {
          s.revert();
        } catch {
          /* ignore */
        }
      });
      root
        .querySelectorAll<HTMLElement>('[data-portfolio-animated]')
        .forEach((el) => el.removeAttribute('data-portfolio-animated'));
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="text-section text-animated-titles">
      <div id="about" className="portfolio-heading">
        <h2>{about.heading}</h2>
      </div>
      <div className="about-section">
        <section className="about-hero">
          <h1 className="heading--large">{about.heroText}</h1>
        </section>
        <section className="about-horizontal-scroll">
          <div className="about-horizontal-scroll-wrapper">
            {about.slides.map((slide, i) => (
              <div className="about-horizontal-slide" key={slide.name}>
                <div className="col">
                  <div className="about-founder">
                    <span className="about-founder__index" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <h3 className="heading--medium">{slide.name}</h3>
                    <p className="about-founder__role">{slide.role}</p>
                    <p className="about-founder__bio">{slide.bio}</p>
                    <ul className="about-founder__skills">
                      {slide.skills.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col">
                  <img src={slide.img} alt={slide.alt} />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="about-outro">
          <h1 className="heading--large">{about.outroText}</h1>
        </section>
      </div>
    </div>
  );
}
