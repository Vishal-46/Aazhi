import { ArrowDown, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import HeroVisual from './HeroVisual';

export default function Hero() {
  return (
    <section id="top" className="azh-hero pro-hero hm-hero" aria-labelledby="hero-heading">
      <div className="azh-hero__inner hm-hero__inner">
        <div className="azh-hero__copy hm-hero__copy">
          <Reveal>
            <p className="azh-eyebrow hm-kicker">AAZHI · TECHNOLOGY STUDIO</p>
          </Reveal>

          <Reveal delay={70}>
            <h1 id="hero-heading" className="azh-h1 hm-title">
              Technology with purpose<span className="hm-period">.</span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="azh-sub hm-sub">
              We build practical digital products and systems that solve real business problems.
              Our current focus is a clinic operations system, demonstrated with synthetic data.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="azh-cta hm-cta">
              <a className="azh-btn hm-cta-solid" href="#work">
                See our work <ArrowDown size={17} aria-hidden="true" />
              </a>
              <a className="azh-link hm-cta-quiet" href="#contact">
                Discuss a project <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <p className="azh-proof hm-proof">
              One system in development · Six workflows · Synthetic demo
            </p>
          </Reveal>
        </div>

        <Reveal delay={160} variant="fade">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
