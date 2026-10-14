import { Cpu, Database, Sparkles, Waves } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { explorations } from '../data/content';

const ICONS: Record<string, typeof Cpu> = {
  cpu: Cpu,
  waves: Waves,
  sparkles: Sparkles,
  database: Database,
};

export default function Exploration() {
  return (
    <section id="future" className="azh-future pro-future hm-future" aria-labelledby="future-title">
      <div className="wrap-wide">
        <SectionHeading
          index="05"
          eyebrow="Future direction"
          title="Quietly exploring what's next."
          headingId="future-title"
        />
        <Reveal delay={60} variant="up">
          <ul className="azh-future__strip hm-future__strip">
            {explorations.map((item) => {
              const Icon = ICONS[item.icon] ?? Sparkles;
              return (
                <li key={item.title} className="azh-future__item">
                  <span className="azh-future__icon pro-chip hm-future__icon" aria-hidden="true">
                    <Icon size={17} strokeWidth={1.9} />
                  </span>
                  <span className="azh-future__text">
                    <strong>{item.title}</strong>
                    <span>{item.body}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
        <Reveal delay={100}>
          <p className="azh-future__note hm-future__note">Explorations, not products.</p>
        </Reveal>
      </div>
    </section>
  );
}
