import { ArrowDown, ArrowRight, Orbit, Sparkles } from 'lucide-react';
import HeroVisual from '../components/HeroVisual';

export default function HomeScene() {
  return (
    <section className="cine-scene" aria-label="Home">
      <div className="cine-inner">
        <div className="cine-home-grid">
          <div>
            <p className="cine-eyebrow cine-rise" style={{ ['--d' as string]: '0ms' }}>
              <span className="cine-eyebrow__num">01</span> Independent technology studio
            </p>
            <h1 className="cine-display">
              <span className="cine-line"><span style={{ ['--d' as string]: '60ms' }}>Useful ideas.</span></span>
              <span className="cine-line"><span style={{ ['--d' as string]: '140ms' }}>Made real.</span></span>
            </h1>
            <p className="cine-lede cine-rise" style={{ ['--d' as string]: '220ms' }}>
              <strong>AAZHI is a small technology studio for ambitious, practical work.</strong>
              We turn tangled workflows, early ideas, and operational data into clear digital
              products people can rely on.
            </p>
            <div className="cine-cta-row cine-rise" style={{ ['--d' as string]: '300ms' }}>
              <a className="cine-btn" href="#/work">
                Explore the studio <ArrowDown size={16} aria-hidden="true" />
              </a>
              <a className="cine-link" href="#/about">
                How we think <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="cine-chip-row cine-rise" style={{ ['--d' as string]: '360ms' }}>
              <span className="cine-chip">Product systems</span>
              <span className="cine-chip">Digital operations</span>
              <span className="cine-chip">Data & intelligence</span>
            </div>
            <p className="cine-proof cine-rise" style={{ ['--d' as string]: '420ms' }}>
              <span>Based in India</span><span aria-hidden="true">·</span>
              <span>Working worldwide</span><span aria-hidden="true">·</span>
              <span>Built with care</span>
            </p>
          </div>

          <div className="cine-clip" style={{ ['--d' as string]: '180ms' }}>
            <div className="cine-visual-frame">
              <div className="cine-visual-frame__media">
                <HeroVisual />
              </div>
              <div className="cine-visual-frame__cap">
                <b>AAZHI / FIELD SYSTEM</b>
                <span>Ideas into useful systems</span>
              </div>
            </div>
            <div className="cine-home-signal cine-rise" style={{ ['--d' as string]: '420ms' }}>
              <div className="cine-home-signal__head"><span><Orbit size={14} /> Studio signal</span><b>LIVE / 01</b></div>
              <div className="cine-home-signal__row"><Sparkles size={15} /><span>Designing calm into complexity</span><i>01</i></div>
              <div className="cine-home-signal__row"><ArrowRight size={15} /><span>Building for the work behind the work</span><i>02</i></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
