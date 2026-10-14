import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brand, footer } from '../content';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  useEffect(() => {
    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
      footerYear.textContent = String(new Date().getFullYear());
    }
  }, []);

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-left">
          <p className="footer-brand">{brand.name}</p>
          <p className="footer-copy">
            © <span id="footer-year">2025</span> {brand.name}. All rights reserved.
          </p>
        </div>
        <div className="footer-right">
          <nav className="footer-nav" aria-label="Footer navigation">
            {footer.links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
