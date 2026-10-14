import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brand } from '../content';

gsap.registerPlugin(ScrollTrigger);

export default function Topbar() {
  return (
    <div className="topbar">
      <a href="#home" className="site-logo-link" aria-label="Home">
        <img src={brand.logo} alt="Site Logo" className="site-logo" />
      </a>
      <button className="menu-toggle" aria-controls="site-menu" aria-expanded="false">
        Menu
      </button>
    </div>
  );
}
