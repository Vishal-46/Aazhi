import { ArrowRight, Lock } from 'lucide-react';
import { projects } from '../data/content';

const workSignals = [
  { label: '01', title: 'Healthcare operations', body: 'One calm workspace for registration, appointments, records, prescriptions, billing, and admin.', tone: 'coral' },
  { label: '02', title: 'Workflow intelligence', body: 'Automation that absorbs repetitive work without hiding the decisions people still need to make.', tone: 'blue' },
  { label: '03', title: 'Data that answers back', body: 'Reports and operational views that turn scattered records into a next useful action.', tone: 'sand' },
  { label: '04', title: 'Connected environments', body: 'Early IoT explorations for clinics, workshops, and small facilities — sensing with restraint.', tone: 'mint' },
];

export default function WorkScene() {
  const project = projects[0];
  if (!project) return null;

  return (
    <section className="cine-scene" aria-label="Work">
      <div className="cine-inner cine-work-inner">
        <p className="cine-eyebrow cine-rise" style={{ ['--d' as string]: '0ms' }}>
          <span className="cine-eyebrow__num">04</span> Work · A constellation of useful things
        </p>
        <div className="cine-work-intro">
          <div>
            <h1 className="cine-display cine-display--sm">
              <span className="cine-line"><span style={{ ['--d' as string]: '70ms' }}>Not one</span></span>
              <span className="cine-line"><span style={{ ['--d' as string]: '150ms' }}>kind of work.</span></span>
            </h1>
            <p className="cine-lede cine-rise" style={{ ['--d' as string]: '230ms' }}>
              We follow the problem. Sometimes that becomes a product, sometimes a quieter
              workflow, sometimes a new way to read what is already happening.
            </p>
          </div>
          <div className="cine-work-orbit cine-rise" style={{ ['--d' as string]: '180ms' }} aria-hidden="true">
            <span /><span /><span /><i>AAZHI<br />FIELD<br />04</i>
          </div>
        </div>

        <div className="cine-work-bubbles" aria-label="Areas of work">
          {workSignals.map((signal, i) => (
            <article className={`cine-work-bubble cine-work-bubble--${signal.tone}`} key={signal.label}>
              <span className="cine-work-bubble__index">{signal.label}</span>
              <div>
                <h2>{signal.title}</h2>
                <p>{signal.body}</p>
              </div>
              {i === 0 && (
                <a href={`#/work/${project.slug}`} aria-label="Open healthcare operations case study">
                  Explore <ArrowRight size={15} aria-hidden="true" />
                </a>
              )}
            </article>
          ))}
        </div>

        <div className="cine-work-note cine-rise" style={{ ['--d' as string]: '420ms' }}>
          <span><Lock size={14} aria-hidden="true" /> Published work is shown with synthetic data.</span>
          <a className="cine-link" href="#/contact">Start a conversation <ArrowRight size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
