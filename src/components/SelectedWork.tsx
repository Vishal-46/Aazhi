import { Lock } from 'lucide-react';
import Reveal from './Reveal';
import ProjectCard from './ProjectCard';
import { projects } from '../data/content';

const proofPoints = [
  'Built around real clinic work',
  'Six modules sharing one record',
  'Shown with synthetic data only',
];

export default function SelectedWork() {
  return (
    <section id="work" className="wk-work" aria-labelledby="work-title">
      <div className="wk-wrap">
        <Reveal>
          <div className="wk-head">
            <p className="wk-eyebrow">Selected work</p>
            <h2 className="wk-title" id="work-title">
              One system, built around real clinic work.
            </h2>
            <p className="wk-lede">
              A single in-development build, shown with synthetic data and nothing private.
            </p>
          </div>
        </Reveal>
        <Reveal delay={60}>
          <p className="wk-honest" role="note">
            <span className="wk-honest__dot" aria-hidden="true" />
            In development
          </p>
        </Reveal>

        <div className="wk-cases">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 60} variant="up">
              <ProjectCard project={project} position={i + 1} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="wk-proof" aria-label="What this project shows">
            <span className="wk-proof__label">What this shows</span>
            <ul className="wk-proof__list">
              {proofPoints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="wk-conf">
            <Lock size={14} aria-hidden="true" />
            <span>
              No client names, no real patient data — the interface mockup uses synthetic entries
              only.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
