import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import About from '../components/About';
import Capabilities from '../components/Capabilities';
import SelectedWork from '../components/SelectedWork';
import Process from '../components/Process';
import Exploration from '../components/Exploration';
import Contact from '../components/Contact';
import Reveal from '../components/Reveal';
import { team } from '../data/content';

/** Real founder names only, derived from content.ts. No photos, no fake claims. */
function founderNames(): string {
  return team
    .filter((m) => !m.placeholder)
    .map((m) => m.name)
    .join(' · ');
}

/** Compact team teaser linking onward to the team page. Inline, no new file. */
function TeamTeaser() {
  return (
    <section className="section-min rule-top hm-teaser" aria-labelledby="meet-team-title">
      <div className="wrap-wide">
        <Reveal>
          <a href="#/team" className="hm-teaser__card" aria-label="Meet the team — go to the team page">
            <span className="hm-teaser__copy">
              <span className="hm-teaser__label">Team</span>
              <span id="meet-team-title" className="hm-teaser__title">
                Meet the team.
              </span>
              <span className="hm-teaser__names">{founderNames()}</span>
            </span>
            <span className="hm-teaser__arrow" aria-hidden="true">
              <ArrowRight size={20} />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Capabilities />
      <SelectedWork />
      <Process />
      <TeamTeaser />
      <Exploration />
      <Contact />
    </>
  );
}
