import { ArrowRight, Check, Lock } from 'lucide-react';
import { projects } from '../data/content';

const intentOutcomes = [
  { title: 'One shared record', body: 'registration, visits and billing read the same entry by design.' },
  { title: 'A calmer front desk', body: "the day's appointments sit in a single list instead of across registers." },
  { title: 'Prescriptions into invoices', body: 'billing follows the prescription entry, so nothing is re-typed.' },
];

export default function WorkScene() {
  const project = projects[0];
  if (!project) return null;

  return (
    <section className="cine-scene" aria-label="Work">
      <div className="cine-inner">
        <p className="cine-eyebrow cine-rise" style={{ ['--d' as string]: '0ms' }}>
          <span className="cine-eyebrow__num">04</span> Selected work · One system, honestly shown
        </p>
        <div className="cine-work-grid">
          <div className="cine-clip" style={{ ['--d' as string]: '140ms' }}>
            <div className="cine-mock" aria-hidden="true">
              <div className="cine-mock__side">
                <span className="cine-mock__logo" />
                <span className="cine-mock__nav cine-mock__nav--active" />
                <span className="cine-mock__nav" />
                <span className="cine-mock__nav" />
                <span className="cine-mock__nav" />
                <span className="cine-mock__nav" />
                <span className="cine-mock__nav" />
              </div>
              <div className="cine-mock__main">
                <div className="cine-mock__stats">
                  <div className="cine-mock__stat"><span /><strong /></div>
                  <div className="cine-mock__stat"><span /><strong /></div>
                  <div className="cine-mock__stat"><span /><strong /></div>
                </div>
                <div className="cine-mock__panel">
                  <span className="cine-mock__row" style={{ width: '84%' }} />
                  <span className="cine-mock__row cine-mock__row--accent" style={{ width: '62%' }} />
                  <span className="cine-mock__row" style={{ width: '72%' }} />
                </div>
                <div className="cine-mock__panel">
                  <span className="cine-mock__row" style={{ width: '56%' }} />
                  <span className="cine-mock__row" style={{ width: '68%' }} />
                </div>
              </div>
              <span className="cine-mock__badge">synthetic data</span>
            </div>
          </div>

          <div>
            <h1 className="cine-display cine-display--sm">
              <span className="cine-line"><span style={{ ['--d' as string]: '80ms' }}>Healthcare</span></span>
              <span className="cine-line"><span style={{ ['--d' as string]: '160ms' }}>Operations.</span></span>
            </h1>
            <p className="cine-lede cine-rise" style={{ ['--d' as string]: '240ms' }}>
              {project.description} Six modules — {project.modules.join(' · ')} — sharing one record.
            </p>
            <dl className="cine-meta-strip cine-rise" style={{ ['--d' as string]: '300ms' }}>
              <div><dt>Scope</dt><dd>Clinic system</dd></div>
              <div><dt>Industry</dt><dd>Healthcare</dd></div>
              <div><dt>Status</dt><dd>In development</dd></div>
            </dl>
            <ul className="cine-outcomes cine-rise" style={{ ['--d' as string]: '360ms' }}>
              {intentOutcomes.map((o) => (
                <li key={o.title}>
                  <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                  <span><strong>{o.title} — </strong>{o.body}</span>
                </li>
              ))}
            </ul>
            <div className="cine-cta-row cine-rise" style={{ ['--d' as string]: '420ms' }}>
              <a className="cine-btn" href={`#/work/${project.slug}`}>
                Open case study <ArrowRight size={16} aria-hidden="true" />
              </a>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--faint)' }}>
                <Lock size={14} aria-hidden="true" /> No real patient data
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
