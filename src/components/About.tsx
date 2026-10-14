import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { capabilities, projects, team } from '../data/content';

/** Real founder names derived from content.ts so copy never drifts from data. */
function founderPhrase(): string {
  const names = team.filter((m) => !m.placeholder).map((m) => m.name);
  if (names.length <= 1) return names[0] ?? '';
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

export default function About() {
  return (
    <section id="about" className="section-min rule-top pro-about hm-about" aria-labelledby="about-title">
      <div className="wrap-wide">
        <SectionHeading
          index="01"
          eyebrow="About"
          title="A small studio with a practical point of view."
          headingId="about-title"
        />
        <div className="azh-about__narrow">
          <Reveal>
            <p className="azh-about__p">
              AAZHI was founded by {founderPhrase()} to build software that is genuinely
              useful rather than merely impressive.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="azh-about__p">
              We work in a simple loop: understand the problem, define the solution, build it,
              then test and refine until it holds up in real use.
            </p>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <dl className="azh-facts" aria-label="Studio facts">
            <div className="azh-fact">
              <dt>Co-founders</dt>
              <dd>{team.length}</dd>
            </div>
            <div className="azh-fact">
              <dt>Projects in development</dt>
              <dd>{projects.length}</dd>
            </div>
            <div className="azh-fact">
              <dt>Capability areas</dt>
              <dd>{capabilities.length}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
