import { ArrowLeft, Check, Lock } from 'lucide-react';
import { projects } from '../data/content';

const intentOutcomes = [
  { title: 'One shared record', body: 'registration, visits and billing read the same entry by design.' },
  { title: 'A calmer front desk', body: "the day's appointments sit in a single list instead of across registers." },
  { title: 'Prescriptions into invoices', body: 'billing follows the prescription entry, so nothing is re-typed.' },
];

export default function WorkDetailScene({ slug }: { slug?: string }) {
  const project = projects.find((p) => p.slug === slug) ?? projects[0];
  if (!project) {
    return (
      <section className="cine-scene" aria-label="Project not found">
        <div className="cine-inner">
          <p className="cine-eyebrow">04 · Work · Not found</p>
          <h1 className="cine-display cine-display--sm">Project not found.</h1>
          <p className="cine-lede">That case study doesn&apos;t exist. The healthcare build is the only published work.</p>
          <div className="cine-cta-row">
            <a className="cine-btn" href="#/work"><ArrowLeft size={16} aria-hidden="true" /> Back to work</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cine-scene" aria-label={`${project.title} case study`}>
      <div className="cine-inner">
        <p className="cine-eyebrow cine-rise" style={{ ['--d' as string]: '0ms' }}>
          <span className="cine-eyebrow__num">04</span> Work · {project.category}
        </p>
        <div className="cine-detail-grid">
          <div>
            <h1 className="cine-display cine-display--sm">
              <span className="cine-line"><span style={{ ['--d' as string]: '70ms' }}>{project.title.split(' ')[0]}</span></span>
              <span className="cine-line"><span style={{ ['--d' as string]: '150ms' }}>{project.title.split(' ').slice(1).join(' ')}</span></span>
            </h1>
            <p className="cine-lede cine-rise" style={{ ['--d' as string]: '230ms' }}>
              <strong>Challenge — </strong>
              many clinics still run on paper registers and scattered files: registration in one
              book, appointments in another, billing kept separately.
            </p>
            <p className="cine-lede cine-rise" style={{ ['--d' as string]: '290ms' }}>
              <strong>Solution — </strong>
              {project.description} Each step reads and writes to the same place, so the record
              follows the patient.
            </p>
            <ul className="cine-module-chips cine-rise" style={{ ['--d' as string]: '340ms' }} aria-label="Workflow modules">
              {project.modules.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <p className="cine-rise" style={{ ['--d' as string]: '380ms', marginTop: '16px', display: 'flex', gap: '9px', alignItems: 'flex-start', fontSize: '0.85rem', color: 'var(--faint)' }}>
              <Lock size={14} aria-hidden="true" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>{project.note}</span>
            </p>
            <div className="cine-cta-row cine-rise" style={{ ['--d' as string]: '430ms' }}>
              <a className="cine-btn cine-btn--ghost" href="#/work">
                <ArrowLeft size={16} aria-hidden="true" /> Back to work
              </a>
              <a className="cine-btn" href="#/contact">Discuss a project</a>
            </div>
          </div>
          <div className="cine-clip" style={{ ['--d' as string]: '160ms' }}>
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '18px', padding: '22px', display: 'grid', gap: '12px' }}>
              <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--faint)', margin: 0 }}>
                Why it helps (by design)
              </p>
              <ul className="cine-outcomes" style={{ margin: 0 }}>
                {intentOutcomes.map((o) => (
                  <li key={o.title}>
                    <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                    <span><strong>{o.title} — </strong>{o.body}</span>
                  </li>
                ))}
              </ul>
              <div style={{ borderTop: '1px dashed var(--line)', paddingTop: '14px', fontSize: '0.88rem', color: 'var(--muted)' }}>
                Interface mockup with synthetic data. Full case study available on request —
                no client identity or patient information shown.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
