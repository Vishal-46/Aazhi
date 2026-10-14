import { Check, Lock } from 'lucide-react';
import type { Project } from '../data/content';

interface ProjectCardProps {
  project: Project;
  position?: number;
}

/** Design-intent outcomes — what the system is built to allow, not measured impact. */
const intentOutcomes = [
  {
    title: 'One shared record',
    body: 'registration, visits and billing read the same entry by design.',
  },
  {
    title: 'A calmer front desk',
    body: "the day's appointments sit in a single list instead of across registers.",
  },
  {
    title: 'Prescriptions into invoices',
    body: 'billing follows the prescription entry, so nothing is re-typed.',
  },
];

/**
 * Editorial case card (60/40): CSS clinic mock left, case copy right.
 * Mock is abstract bars/rows only — no figures presented as results.
 */
export default function ProjectCard({ project, position = 1 }: ProjectCardProps) {
  const href = (project.href ?? '').trim();
  return (
    <article className="wk-case" aria-labelledby={`${project.slug}-title`}>
      <div className="wk-case__mock" aria-hidden="true">
        <div className="wk-mock">
          <div className="wk-mock__side">
            <span className="wk-mock__logo" />
            <span className="wk-mock__nav wk-mock__nav--active" />
            <span className="wk-mock__nav" />
            <span className="wk-mock__nav" />
            <span className="wk-mock__nav" />
            <span className="wk-mock__nav" />
            <span className="wk-mock__nav" />
          </div>
          <div className="wk-mock__main">
            <div className="wk-mock__head">
              <span className="wk-mock__titlebar" />
              <span className="wk-mock__livedot" />
            </div>
            <div className="wk-mock__stats">
              <div className="wk-mock__stat">
                <span />
                <strong />
              </div>
              <div className="wk-mock__stat wk-mock__stat--accent">
                <span />
                <strong />
              </div>
              <div className="wk-mock__stat">
                <span />
                <strong />
              </div>
            </div>
            <div className="wk-mock__panel">
              <span className="wk-mock__panel-label" />
              <span className="wk-mock__appt" style={{ width: '84%' }} />
              <span className="wk-mock__appt wk-mock__appt--accent" style={{ width: '62%' }} />
              <span className="wk-mock__appt" style={{ width: '72%' }} />
            </div>
            <div className="wk-mock__panel">
              <span className="wk-mock__panel-label wk-mock__panel-label--short" />
              <span className="wk-mock__bill" />
              <span className="wk-mock__bill wk-mock__bill--short" />
              <span className="wk-mock__bill" />
            </div>
          </div>
        </div>
        <span className="wk-mock__badge">synthetic data</span>
      </div>

      <div className="wk-case__info">
        <p className="wk-case__kicker">
          <span className="wk-case__num">{String(position).padStart(2, '0')}</span>
          <span className="wk-case__cat">{project.category}</span>
        </p>
        <h3 className="wk-case__title" id={`${project.slug}-title`}>
          {project.title}
        </h3>
        <p className="wk-case__para">
          <strong>Challenge — </strong>
          many clinics still run on paper registers and scattered files: registration in one
          book, appointments in another, billing kept separately. Finding a patient&apos;s
          history means hunting across desks.
        </p>
        <p className="wk-case__para">
          <strong>Solution — </strong>
          {project.description} Each step reads and writes to the same place, so the record
          follows the patient.
        </p>
        {project.modules.length > 0 && (
          <ul className="wk-case__chips" aria-label={`${project.title} workflow modules`}>
            {project.modules.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        )}
        <p className="wk-case__aim">Why it helps (by design)</p>
        <ul className="wk-intent">
          {intentOutcomes.map((o) => (
            <li key={o.title}>
              <Check size={15} strokeWidth={2.5} aria-hidden="true" />
              <span>
                <strong>{o.title} — </strong>
                {o.body}
              </span>
            </li>
          ))}
        </ul>
        {project.note ? (
          <p className="wk-case__note">
            <Lock size={14} aria-hidden="true" />
            <span>{project.note}</span>
          </p>
        ) : null}
        <div className="wk-case__foot">
          {href !== '' ? (
            <a className="wk-case__link" href={href}>
              Full case study
            </a>
          ) : (
            <span className="wk-case__link wk-case__link--static">
              Full case study on request
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
