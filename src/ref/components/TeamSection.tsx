import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '../lib/splitText';
import { team } from '../content';

gsap.registerPlugin(ScrollTrigger);

export default function TeamSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
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

      // Team card clip-path right-edge wipe, one trigger per card.
      const items = Array.from(root.querySelectorAll<HTMLElement>('.team-card'));
      items.forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top bottom',
          end: 'top 10%',
          scrub: 2.6,
          invalidateOnRefresh: true,
          refreshPriority: 0,
          animation: gsap.fromTo(
            item,
            {
              clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
            },
            {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              ease: 'power1.inOut',
            },
          ),
        });
      });

      ScrollTrigger.refresh();
    }, root);

    return () => {
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
    <div className="certificate-page" ref={rootRef}>
      <div id="team" className="portfolio-heading">
        <h2>{team.heading}</h2>
      </div>
      <div className="team-grid">
        {team.members.map((m, i) => (
          <article className="team-card" key={m.name}>
            <div className="team-card__mark" aria-hidden="true">
              <span className="team-card__mark-num">0{i + 1}</span>
              <span className="team-card__mark-label">AAZHI Foundry</span>
            </div>
            <div className="team-card__body">
              <h3 className="team-card__name">{m.name}</h3>
              <p className="team-card__role">{m.role}</p>
              <p className="team-card__bio">{m.bio}</p>
              <ul className="team-card__skills">
                {m.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
