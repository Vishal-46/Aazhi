import { AppWindow, BarChart3, Check, Cpu, Workflow } from 'lucide-react';
import Reveal from './Reveal';
import { capabilities } from '../data/content';

const ICONS = [AppWindow, Workflow, BarChart3, Cpu] as const;

export default function Capabilities() {
  return (
    <section id="capabilities" className="wk-cap" aria-labelledby="cap-title">
      <div className="wk-wrap">
        <Reveal>
          <div className="wk-head">
            <p className="wk-eyebrow">Capabilities</p>
            <h2 className="wk-title" id="cap-title">
              What we build, stated plainly.
            </h2>
            <p className="wk-lede">Practical builds first — experiments labelled honestly.</p>
          </div>
        </Reveal>
        <div className="wk-cap-grid">
          {capabilities.map((cap, i) => {
            const exploratory = cap.stage.toLowerCase().includes('explor');
            const Icon = ICONS[i % ICONS.length] ?? AppWindow;
            const featured = i === 0;
            return (
              <Reveal
                key={cap.index}
                delay={Math.min(i, 3) * 60}
                variant="up"
                className={`wk-cell${featured ? ' wk-cell--featured' : ''}${
                  exploratory ? ' wk-cell--wide' : ''
                }`}
              >
                <article
                  className={`wk-cap-card${featured ? ' wk-cap-card--featured' : ''}${
                    exploratory ? ' wk-cap-card--exploratory' : ''
                  }`}
                >
                  <div className="wk-cap-card__top">
                    <span
                      className={`wk-cap-icon${featured ? ' wk-cap-icon--featured' : ''}`}
                      aria-hidden="true"
                    >
                      <Icon size={19} strokeWidth={1.9} />
                    </span>
                    <span className="wk-cap-card__index" aria-hidden="true">
                      {cap.index}
                    </span>
                  </div>
                  <h3 className="wk-cap-card__title">{cap.title}</h3>
                  <p className="wk-cap-card__body">{cap.body}</p>
                  {featured ? (
                    <div className="wk-cap-visual" aria-hidden="true">
                      {cap.points.map((p) => (
                        <div className="wk-cap-visual__row" key={p}>
                          <span className="wk-cap-visual__tick">
                            <Check size={12} strokeWidth={3} />
                          </span>
                          <span className="wk-cap-visual__bar" />
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <ul className="wk-ticks">
                    {cap.points.map((p) => (
                      <li key={p}>
                        <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="wk-pill-row">
                    <span
                      className={`wk-pill${exploratory ? ' wk-pill--exploratory' : ' wk-pill--available'}`}
                    >
                      <span className="wk-pill__dot" aria-hidden="true" />
                      {exploratory ? 'Exploratory' : 'Available'}
                    </span>
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
