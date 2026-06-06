'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Menu, X, MapPin, Phone } from 'lucide-react';

export default function Header({ onOpenModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Consulting', path: '/consulting' },
    { name: 'Audio Systems', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Clients', path: '/clients' },
    { name: 'Expert Speaks', path: '/blog' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact', path: '/contact' },
  ];

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

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`sticky-header ${isScrolled || isMobileMenuOpen ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link 
          href="/" 
          className="logo-wordmark"
          onClick={handleLinkClick}
          onMouseEnter={addHover}
          onMouseLeave={removeHover}
        >
          AUDIO PLANET
        </Link>

        {/* Desktop Menu */}
        <nav className="nav-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`nav-link ${pathname === link.path ? 'active' : ''}`}
              onMouseEnter={addHover}
              onMouseLeave={removeHover}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button
          onClick={onOpenModal}
          className="btn-consultation"
          onMouseEnter={addHover}
          onMouseLeave={removeHover}
        >
          <Calendar size={14} style={{ marginRight: '6px' }} />
          Book Consultation
        </button>

        {/* Mobile Hamburger Trigger */}
        <button
          className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onMouseEnter={addHover}
          onMouseLeave={removeHover}
          aria-label="Toggle Navigation Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Full-Screen Navigation Drawer */}
      <div className={`mobile-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-menu">
          {navLinks.map((link, idx) => (
            <Link
              key={link.path}
              href={link.path}
              className={`mobile-nav-link font-display-italic ${pathname === link.path ? 'active' : ''}`}
              onClick={handleLinkClick}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {link.name}
            </Link>
          ))}
          {/* Mobile Admin Link Removed */}

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenModal();
            }}
            className="btn-primary mobile-cta-btn"
          >
            <Calendar size={14} style={{ marginRight: '8px' }} />
            Book Consultation
          </button>
        </nav>

        <div className="mobile-menu-footer">
          <div className="footer-item">
            <MapPin size={14} className="footer-icon" />
            <span>Koramangala, Bangalore</span>
          </div>
          <div className="footer-item">
            <Phone size={14} className="footer-icon" />
            <a href="tel:+919845019192">+91 98450 19192</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sticky-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.8rem 4rem;
          transition: var(--transition-smooth);
          border-bottom: 1px solid transparent;
        }

        .sticky-header.scrolled {
          padding: 0.8rem 4rem;
          background-color: rgba(6, 6, 6, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.8);
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1001;
        }

        .logo-wordmark {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 400;
          letter-spacing: 0.2em;
          color: var(--text-primary);
          line-height: 1;
          text-transform: uppercase;
          transition: var(--transition-smooth);
        }

        .logo-wordmark:hover {
          color: var(--accent-gold);
          text-shadow: 0 0 10px rgba(201, 168, 76, 0.25);
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 2.25rem;
        }

        .nav-link {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-secondary);
          position: relative;
          padding: 0.5rem 0;
          transition: var(--transition-smooth);
        }

        .nav-link:hover, .nav-link.active {
          color: var(--text-primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 1px;
          background-color: var(--accent-gold);
          transition: var(--transition-smooth);
          transform: translateX(-50%);
        }

        .nav-link:hover::after, .nav-link.active::after {
          width: 80%;
        }

        .admin-nav-link::after {
          display: none;
        }

        .btn-consultation {
          display: inline-flex;
          align-items: center;
          background-color: transparent;
          color: var(--accent-gold);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid var(--accent-gold);
          padding: 0.7rem 1.5rem;
          font-weight: 600;
          transition: var(--transition-smooth);
          box-shadow: inset 0 0 0 0 var(--accent-gold);
        }

        .btn-consultation:hover {
          background-color: var(--accent-gold);
          color: #000;
          box-shadow: 0 0 15px rgba(201, 168, 76, 0.4), inset 0 0 0 1px var(--accent-gold);
        }

        /* Mobile Hamburger Icon Toggler */
        .hamburger-btn {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 20px;
          height: 14px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .hamburger-btn span {
          width: 100%;
          height: 1px;
          background-color: var(--text-primary);
          transition: all 0.3s ease;
        }

        .hamburger-btn.open span:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
          background-color: var(--accent-gold);
        }

        .hamburger-btn.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger-btn.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
          background-color: var(--accent-gold);
        }

        /* Mobile Menu Drawer */
        .mobile-menu-drawer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #080808;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 8rem 2rem 3rem 2rem;
          transform: translateX(100%);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-menu-drawer.open {
          transform: translateX(0);
        }

        .mobile-nav-menu {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mobile-nav-link {
          font-family: var(--font-display);
          font-size: 2.2rem;
          color: var(--text-secondary);
          opacity: 0;
          transform: translateY(15px);
          transition: var(--transition-smooth);
        }

        .mobile-menu-drawer.open .mobile-nav-link {
          opacity: 1;
          transform: translateY(0);
          transition-delay: calc(var(--delay, 0s) + 0.1s);
        }

        .mobile-nav-link:hover, .mobile-nav-link.active {
          color: var(--accent-gold);
          padding-left: 8px;
        }

        .mobile-admin-link {
          font-size: 1.4rem;
          color: var(--accent-gold);
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
          margin-top: 0.5rem;
        }

        .mobile-cta-btn {
          width: 100%;
          margin-top: 1rem;
        }

        .mobile-menu-footer {
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-secondary);
        }

        .footer-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-icon {
          color: var(--accent-gold);
        }

        .mobile-menu-footer a {
          color: var(--text-primary);
        }

        @media (max-width: 1024px) {
          .sticky-header {
            padding: 1rem 1.5rem !important;
          }
          .nav-menu {
            display: none;
          }
          .btn-consultation {
            display: none;
          }
          .hamburger-btn {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}
