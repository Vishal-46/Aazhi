import { ArrowRight } from 'lucide-react';
import { capabilities, principles, projects, team } from '../data/content';

export default function AboutScene() {
  return (
    <section className="cine-scene" aria-label="About">
      <div className="cine-inner">
        <p className="cine-eyebrow cine-rise" style={{ ['--d' as string]: '0ms' }}>
          <span className="cine-eyebrow__num">02</span> About · What AAZHI stands for
        </p>
        <div className="cine-about-grid">
          <div>
            <h1 className="cine-display cine-display--sm">
              <span className="cine-line"><span style={{ ['--d' as string]: '60ms' }}>A small studio with</span></span>
              <span className="cine-line"><span style={{ ['--d' as string]: '140ms' }}>a practical point of view.</span></span>
            </h1>
            <p className="cine-statement cine-rise" style={{ ['--d' as string]: '220ms', marginTop: '20px', fontSize: '1.25rem', lineHeight: 1.5, fontFamily: 'var(--font-body)', fontWeight: 400 }}>
              AAZHI exists to replace <u>paper registers and scattered files</u> with
              software people can actually operate — starting with clinics, built to
              generalise.
            </p>
            <div className="cine-principles cine-rise" style={{ ['--d' as string]: '300ms' }}>
              {principles.map((p, i) => (
                <div className="cine-principle" key={p.title}>
                  <span className="cine-principle__n" aria-hidden="true">0{i + 1}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="cine-facts cine-rise" style={{ ['--d' as string]: '260ms' }}>
              <div className="cine-fact">
                <b>{team.length}</b>
                <span>Co-founders</span>
              </div>
              <div className="cine-fact">
                <b>{projects.length}</b>
                <span>In development</span>
              </div>
              <div className="cine-fact">
                <b>{capabilities.length}</b>
                <span>Capability areas</span>
              </div>
            </div>
            <div className="cine-rise" style={{ ['--d' as string]: '340ms', marginTop: '20px', background: '#fff', border: '1px solid var(--line)', borderRadius: '18px', padding: '20px' }}>
              <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--faint)', margin: 0 }}>
                Problems we aim to solve
              </p>
              <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: '9px', fontSize: '0.93rem', color: 'var(--ink)' }}>
                <li>— Front desks juggling paper books for registration, visits, and billing.</li>
                <li>— Operational records that exist but can&apos;t be read back as insight.</li>
                <li>— Small teams doing repetitive manual work that software should absorb.</li>
              </ul>
              <p style={{ marginTop: '18px' }}>
                <a className="cine-link" href="#/team/0">
                  Meet the founders <ArrowRight size={15} aria-hidden="true" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
