import { ArrowDown, ArrowRight } from 'lucide-react';
import HeroVisual from '../components/HeroVisual';

export default function HomeScene() {
  return (
    <section className="cine-scene" aria-label="Home">
      <div className="cine-inner">
        <div className="cine-home-grid">
          <div>
            <p className="cine-eyebrow cine-rise" style={{ ['--d' as string]: '0ms' }}>
              <span className="cine-eyebrow__num">01</span> AAZHI · Technology studio
            </p>
            <h1 className="cine-display">
              <span className="cine-line"><span style={{ ['--d' as string]: '60ms' }}>Technology</span></span>
              <span className="cine-line"><span style={{ ['--d' as string]: '140ms' }}>with purpose.</span></span>
            </h1>
            <p className="cine-lede cine-rise" style={{ ['--d' as string]: '220ms' }}>
              <strong>AAZHI builds practical digital products</strong> — web tools, workflow
              automation, and data systems shaped around how work actually happens.
              One clinic operations system in development, shown with synthetic data only.
            </p>
            <div className="cine-cta-row cine-rise" style={{ ['--d' as string]: '300ms' }}>
              <a className="cine-btn" href="#/work">
                See our work <ArrowDown size={16} aria-hidden="true" />
              </a>
              <a className="cine-link" href="#/about">
                What we stand for <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="cine-chip-row cine-rise" style={{ ['--d' as string]: '360ms' }}>
              <span className="cine-chip">Web products</span>
              <span className="cine-chip">Automation</span>
              <span className="cine-chip">Data tools</span>
              <span className="cine-chip cine-chip--dash">IoT · exploratory</span>
            </div>
            <p className="cine-proof cine-rise" style={{ ['--d' as string]: '420ms' }}>
              <span>One system in development</span><span aria-hidden="true">·</span>
              <span>Six workflows</span><span aria-hidden="true">·</span>
              <span>Synthetic demo</span>
            </p>
          </div>

          <div className="cine-clip" style={{ ['--d' as string]: '180ms' }}>
            <div className="cine-visual-frame">
              <div className="cine-visual-frame__media">
                <HeroVisual />
              </div>
              <div className="cine-visual-frame__cap">
                <b>Studio figure — 01</b>
                <span>Contour rings · connected nodes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
