import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const Instagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Twitter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const Facebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Hover state cursor enhancer helper
  const addHover = () => {
    if (typeof document !== 'undefined') {
      document.querySelector('.custom-cursor')?.classList.add('hovered');
    }
  };
  const removeHover = () => {
    if (typeof document !== 'undefined') {
      document.querySelector('.custom-cursor')?.classList.remove('hovered');
    }
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="logo-wordmark" onMouseEnter={addHover} onMouseLeave={removeHover}>
            AUDIO PLANET
          </Link>
          <p className="brand-tagline">
            Turning rooms into instruments. Bangalore's premier premium Hi-Fi audio consultancy, home cinema integration, and acoustic planners since 1999.
          </p>
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon" onMouseEnter={addHover} onMouseLeave={removeHover}><Instagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon" onMouseEnter={addHover} onMouseLeave={removeHover}><Twitter /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon" onMouseEnter={addHover} onMouseLeave={removeHover}><Facebook /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4 className="footer-title">Consulting</h4>
          <ul>
            <li><Link href="/consulting" onMouseEnter={addHover} onMouseLeave={removeHover}>Hi-Fi Experience</Link></li>
            <li><Link href="/consulting" onMouseEnter={addHover} onMouseLeave={removeHover}>Need Analysis</Link></li>
            <li><Link href="/consulting" onMouseEnter={addHover} onMouseLeave={removeHover}>Acoustic Planning</Link></li>
            <li><Link href="/services" onMouseEnter={addHover} onMouseLeave={removeHover}>Calibration & Tuning</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4 className="footer-title">Company</h4>
          <ul>
            <li><Link href="/about" onMouseEnter={addHover} onMouseLeave={removeHover}>Our Story</Link></li>
            <li><Link href="/clients" onMouseEnter={addHover} onMouseLeave={removeHover}>Featured Clients</Link></li>
            <li><Link href="/blog" onMouseEnter={addHover} onMouseLeave={removeHover}>Expert Speaks</Link></li>
            <li><Link href="/faqs" onMouseEnter={addHover} onMouseLeave={removeHover}>FAQs</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4 className="footer-title">Experience Centre</h4>
          <ul className="contact-list">
            <li>
              <MapPin size={16} className="contact-icon" />
              <span>Audio Planet, 703/A, 3rd Block, Behind BDA Complex, Koramangala, Bangalore, Karnataka 560034</span>
            </li>
            <li>
              <Phone size={16} className="contact-icon" />
              <span>
                <a href="tel:+919845019192" onMouseEnter={addHover} onMouseLeave={removeHover}>+91 98450 19192</a><br />
                <a href="tel:+919845694986" onMouseEnter={addHover} onMouseLeave={removeHover}>+91 98456 94986</a>
              </span>
            </li>
            <li>
              <Mail size={16} className="contact-icon" />
              <a href="mailto:info@audioplanet.co.in" onMouseEnter={addHover} onMouseLeave={removeHover}>info@audioplanet.co.in</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-container">
          <span className="copyright">© {currentYear} AUDIO PLANET. ALL RIGHTS RESERVED.</span>
          <div className="legal-links">
            <Link href="/faqs" onMouseEnter={addHover} onMouseLeave={removeHover}>Disclaimer</Link>
            <Link href="/contact" onMouseEnter={addHover} onMouseLeave={removeHover}>Enquire</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: #060606;
          border-top: 1px solid var(--border-color);
          padding: 5rem 0 2rem 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 2fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .logo-wordmark {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 400;
          letter-spacing: 0.2em;
          color: var(--text-primary);
          text-transform: uppercase;
          line-height: 1;
          margin-bottom: 1.5rem;
          transition: var(--transition-smooth);
        }

        .logo-wordmark:hover {
          color: var(--accent-gold);
          text-shadow: 0 0 10px rgba(201, 168, 76, 0.25);
        }

        .brand-tagline {
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          max-width: 320px;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid var(--border-color);
          border-radius: 50%;
          color: var(--text-secondary);
          transition: var(--transition-smooth);
        }

        .social-icon:hover {
          color: var(--accent-gold);
          border-color: var(--accent-gold);
          background-color: rgba(201, 168, 76, 0.05);
        }

        .footer-title {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1.5rem;
        }

        .footer-links ul {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: 0.75rem;
        }

        .footer-links a {
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .footer-links a:hover {
          color: var(--accent-gold);
          padding-left: 4px;
        }

        .contact-list {
          list-style: none;
        }

        .contact-list li {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .contact-icon {
          color: var(--accent-gold);
          flex-shrink: 0;
          margin-top: 3px;
        }

        .contact-list a {
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .contact-list a:hover {
          color: var(--accent-gold);
        }

        .footer-bottom {
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
        }

        .bottom-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.05em;
        }

        .copyright {
          color: #555;
        }

        .legal-links {
          display: flex;
          gap: 1.5rem;
        }

        .legal-links a {
          color: #555;
          transition: var(--transition-fast);
        }

        .legal-links a:hover {
          color: var(--accent-gold);
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .bottom-container {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
