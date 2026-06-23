'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import WaveformDivider from '@/components/WaveformDivider';
import { 
  Volume2, 
  Settings, 
  Compass, 
  ArrowRight, 
  Quote, 
  Layers, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Award,
  Clock
} from 'lucide-react';

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [dbData, setDbData] = useState(null);

  useEffect(() => {
    // Fetch initial CMS content
    fetch('/api/cms')
      .then((res) => res.json())
      .then((data) => setDbData(data))
      .catch((err) => console.error('Error loading homepage CMS data:', err));
  }, []);

  const testimonials = dbData?.testimonials || [
    {
      quote: "High end audio/video and the concept of a budget is a myth. Mr. Palani and his team do a wonderful job of doing a balancing act between these parameters and are able to give a practical value for money.",
      author: "Ajoy",
      designation: "COO",
      company: "PES Institutions, Bangalore"
    },
    {
      quote: "The finer points which make a huge impact on a home theatre system or a stereo music setup brought out very lucidly by Mr. Palani of Audio Planet convinced me of his really true 'audiophile' intention.",
      author: "K. N. Arun Kumar",
      designation: "Acoustic Engineer",
      company: "Bangalore"
    }
  ];

  const partners = [
    { name: 'Bryston', logo: 'BRYSTON' },
    { name: 'Cambridge Audio', logo: 'CAMBRIDGE AUDIO' },
    { name: 'Musical Fidelity', logo: 'MUSICAL FIDELITY' },
    { name: 'Cary Audio', logo: 'CARY AUDIO' },
    { name: 'MK Sound', logo: 'MK SOUND' },
    { name: 'Monitor Audio', logo: 'MONITOR AUDIO' },
    { name: 'ATC', logo: 'ATC' },
    { name: 'Triangle', logo: 'TRIANGLE' }
  ];

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Cursor hover enhancements
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

  const openGlobalModal = (subject) => {
    if (typeof window !== 'undefined' && window.openEnquiryModal) {
      window.openEnquiryModal(subject);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg zoom-bg" style={{ backgroundImage: `url('/images/hero_listening_room.jpg')` }} />
        <div className="hero-overlay" />
        <div className="hero-glow-orb" />
        
        <div className="container hero-container">
          <span className="font-mono-tag fade-up-1">Bangalore's Premier Consultancy</span>
          <h1 className="hero-title font-display-italic fade-up-2">
            Where rooms <br />become instruments.
          </h1>
          <p className="hero-subtitle fade-up-3">
            Premium Hi-Fi audio design, acoustics, and cinema rooms. Engineering museum-grade listening experiences since 1999.
          </p>
          <div className="hero-actions fade-up-4">
            <button 
              onClick={() => openGlobalModal('General Consultation')}
              className="btn-primary"
              onMouseEnter={addHover}
              onMouseLeave={removeHover}
            >
              Book a Consultation
            </button>
            <Link 
              href="/products" 
              className="btn-secondary"
              onMouseEnter={addHover}
              onMouseLeave={removeHover}
            >
              Explore Audio Systems
            </Link>
          </div>
        </div>

        {/* Marquee Scroller */}
        <div className="marquee-container">
          <div className="marquee-content font-mono-tag">
            <span>• BESPOKE HOME CINEMAS</span>
            <span>• ROOM ACOUSTIC PLANNING</span>
            <span>• HIGH-FIDELITY CALIBRATION</span>
            <span>• AUTHORIZED ELITE DEALER</span>
            <span>• BESPOKE HOME CINEMAS</span>
            <span>• ROOM ACOUSTIC PLANNING</span>
            <span>• HIGH-FIDELITY CALIBRATION</span>
            <span>• AUTHORIZED ELITE DEALER</span>
          </div>
        </div>
      </section>

      {/* Positioning Statement */}
      <section className="positioning-section">
        <div className="container">
          <div className="gold-hairline" />
          <div className="positioning-content">
            <h2 className="statement-text font-display-italic">
              "Most buyers want the best, but few are introduced to the physics of sound replication. We demystify the acoustic environment, balancing budget with true high-end value to engineer the perfect listening sanctuary."
            </h2>
            
            <div className="stats-grid font-mono-tag">
              <div className="stat-item">
                <Award className="stat-icon" size={24} />
                <span className="stat-num">25+</span>
                <span className="stat-lbl">Years of Craft</span>
              </div>
              <div className="stat-item">
                <Layers className="stat-icon" size={24} />
                <span className="stat-num">500+</span>
                <span className="stat-lbl">Sound Installations</span>
              </div>
              <div className="stat-item">
                <ShieldCheck className="stat-icon" size={24} />
                <span className="stat-num">100%</span>
                <span className="stat-lbl">Bespoke Curation</span>
              </div>
            </div>
          </div>
          <div className="gold-hairline" />
        </div>
      </section>

      <WaveformDivider />

      {/* Awards & Recognition */}
      <section className="awards-section">
        <div className="container">
          <div className="award-banner exhibition-frame">
            <div className="award-content">
              <span className="font-mono-tag">Excellence Recognized</span>
              <h2 className="font-headline-serif section-title">Times Retail Icons 2017</h2>
              <p className="award-desc">
                Audio Planet was honored with the Certificate of Recognition for <strong>Best Audio Visual Systems</strong> in Bangalore, awarded by Optimal Media Solutions (A Times Group Company). This stands as a testament to our unwavering commitment to acoustic perfection.
              </p>
            </div>
            <div className="award-image" style={{ backgroundImage: `url('/images/hero_listening_room.jpg')` }} />
          </div>
        </div>
      </section>

      <WaveformDivider />

      {/* What We Do */}
      <section className="services-overview">
        <div className="container">
          <div className="section-header">
            <span className="font-mono-tag">Our Domains</span>
            <h2 className="section-title font-headline-serif">Acoustic & Audio Consulting</h2>
          </div>

          <div className="cards-grid">
            <div className="service-card exhibition-frame">
              <Volume2 className="card-icon" size={32} />
              <h3 className="card-title font-headline-serif">Audio Consulting</h3>
              <p className="card-desc">
                Need analysis, component matching, room reflection layout, and precision hardware tuning to suit your musical palate.
              </p>
              <Link href="/consulting" className="card-link" onMouseEnter={addHover} onMouseLeave={removeHover}>
                The Hi-Fi Experience <ArrowRight size={16} />
              </Link>
            </div>

            <div className="service-card exhibition-frame">
              <Compass className="card-icon" size={32} />
              <h3 className="card-title font-headline-serif">Acoustic Design</h3>
              <p className="card-desc">
                Room boundary isolation, absorber/diffuser mapping, and acoustic fabric paneling. Collaborating with your architect.
              </p>
              <Link href="/services" className="card-link" onMouseEnter={addHover} onMouseLeave={removeHover}>
                Acoustic Architectures <ArrowRight size={16} />
              </Link>
            </div>

            <div className="service-card exhibition-frame">
              <Settings className="card-icon" size={32} />
              <h3 className="card-title font-headline-serif">Premium Systems</h3>
              <p className="card-desc">
                Elite reference amplifiers, handcrafted Italian loudspeakers, the acclaimed Aktimate Micro, audiophile turntables, and curated source equipment.
              </p>
              <Link href="/products" className="card-link" onMouseEnter={addHover} onMouseLeave={removeHover}>
                Explore Curation <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WaveformDivider />

      {/* Experience The Difference */}
      <section className="difference-section">
        <div className="difference-grid">
          <div className="difference-image" style={{ backgroundImage: `url('/images/speaker.jpg')` }} />
          <div className="difference-content">
            <div className="content-padding">
              <span className="font-mono-tag">The Showroom</span>
              <h2 className="font-headline-serif section-title">Experience Centre & Expertise</h2>
              <p className="difference-para">
                Led by our founder Mr. Palani, we don't just showcase equipment—we educate. Located in Indiranagar, Bangalore, our private showroom features three acoustically isolated reference chambers where you can hear the difference between analogue warmth and pristine digital conversion in real time.
              </p>
              <p className="difference-para">
                We host private, single-client sessions by appointment, ensuring you understand the physics of your listening room before making an investment.
              </p>
              <Link href="/about" className="btn-secondary" onMouseEnter={addHover} onMouseLeave={removeHover}>
                Meet Mr. Palani & Our Team →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WaveformDivider />

      {/* Process (Timeline) */}
      <section className="process-section">
        <div className="container">
          <div className="section-header centered">
            <span className="font-mono-tag">Methodology</span>
            <h2 className="section-title font-headline-serif">How We Operate</h2>
          </div>

          <div className="timeline-container">
            <div className="timeline-line" />
            <div className="timeline-grid">
              <div className="timeline-step">
                <span className="step-num font-mono-tag">01</span>
                <h4 className="step-title font-headline-serif">Initial Consultation</h4>
                <p className="step-desc">We talk about your favorite music, listening habits, and layout boundaries.</p>
              </div>
              <div className="timeline-step">
                <span className="step-num font-mono-tag">02</span>
                <h4 className="step-title font-headline-serif">Need Analysis</h4>
                <p className="step-desc">Measuring room nodes, ambient noise floor, and mapping speaker dimensions.</p>
              </div>
              <div className="timeline-step">
                <span className="step-num font-mono-tag">03</span>
                <h4 className="step-title font-headline-serif">Acoustic Design</h4>
                <p className="step-desc">Creating 3D room treatments and specifying layout placements.</p>
              </div>
              <div className="timeline-step">
                <span className="step-num font-mono-tag">04</span>
                <h4 className="step-title font-headline-serif">System Integration</h4>
                <p className="step-desc">Delivery, premium cabling, final positioning calibration, and testing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveformDivider />

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonial-slider exhibition-frame">
            <Quote className="quote-icon" size={48} />
            <div className="testimonial-content">
              <p className="testimonial-text font-display-italic">
                "{testimonials[activeTestimonial].quote}"
              </p>
              <div className="testimonial-author">
                <span className="author-name">{testimonials[activeTestimonial].author}</span>
                <span className="author-meta font-mono-tag">
                  {testimonials[activeTestimonial].designation}, {testimonials[activeTestimonial].company}
                </span>
              </div>
            </div>

            <div className="slider-controls">
              <button 
                onClick={handlePrevTestimonial}
                className="control-btn"
                onMouseEnter={addHover}
                onMouseLeave={removeHover}
              >
                <ChevronLeft size={20} />
              </button>
              <span className="slider-index font-mono-tag">
                {activeTestimonial + 1} / {testimonials.length}
              </span>
              <button 
                onClick={handleNextTestimonial}
                className="control-btn"
                onMouseEnter={addHover}
                onMouseLeave={removeHover}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Partners */}
      <section className="partners-section">
        <div className="container">
          <span className="font-mono-tag partner-title-tag">Authorized Partners</span>
          <div className="partners-grid">
            {partners.map((partner, i) => (
              <div 
                key={i} 
                className="partner-logo"
                onMouseEnter={addHover}
                onMouseLeave={removeHover}
              >
                {partner.logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-overlay" />
        <div className="container cta-container">
          <h2 className="cta-title font-headline-serif">Ready to transform your listening space?</h2>
          <p className="cta-desc">
            Coordinate with our acoustic architects to build a custom room profile.
          </p>
          <button 
            onClick={() => openGlobalModal('General Consultation')}
            className="btn-primary"
            onMouseEnter={addHover}
            onMouseLeave={removeHover}
          >
            Book a Free Consultation
          </button>
        </div>
      </section>

      <style jsx>{`
        .home-page {
          background-color: var(--bg-primary);
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 100px;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0.5;
          filter: grayscale(40%) contrast(105%);
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.65) 50%, rgba(10,10,10,0.98) 100%);
        }

        .hero-container {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 800px;
        }

        .hero-title {
          font-size: 4.5rem;
          line-height: 1.1;
          margin: 1.5rem 0;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          max-width: 580px;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
        }

        /* Marquee */
        .marquee-container {
          position: absolute;
          bottom: 2rem;
          left: 0;
          width: 100%;
          overflow: hidden;
          background: rgba(10, 10, 10, 0.4);
          padding: 0.5rem 0;
        }

        .marquee-content {
          display: flex;
          white-space: nowrap;
          animation: marquee 30s linear infinite;
          gap: 3rem;
          color: rgba(201, 168, 76, 0.4);
          font-size: 0.7rem;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Positioning Section */
        .positioning-section {
          padding: 4rem 0;
          text-align: center;
        }

        .statement-text {
          font-size: 2.2rem;
          line-height: 1.4;
          max-width: 900px;
          margin: 0 auto 3rem auto;
          color: var(--text-primary);
        }

        .stats-grid {
          display: flex;
          justify-content: center;
          gap: 6rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-icon {
          color: var(--accent-gold);
          margin-bottom: 0.5rem;
        }

        .stat-num {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0.25rem 0;
        }

        .stat-lbl {
          font-size: 0.65rem;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
        }

        /* Awards Section */
        .awards-section {
          padding: 4rem 0;
        }

        .award-banner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 400px;
          background-color: var(--bg-surface);
        }

        .award-content {
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .award-desc {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 1.05rem;
          margin-top: 1.5rem;
        }

        .award-image {
          background-size: cover;
          background-position: center;
          filter: grayscale(80%) sepia(20%);
        }

        /* Services Overview */
        .services-overview {
          padding: var(--section-padding);
        }

        .section-header {
          margin-bottom: 3.5rem;
        }

        .section-header.centered {
          text-align: center;
        }

        .section-title {
          font-size: 2.5rem;
          margin-top: 0.5rem;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .service-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-height: 320px;
        }

        .card-icon {
          color: var(--accent-gold);
          margin-bottom: 1.5rem;
        }

        .card-title {
          font-size: 1.6rem;
          margin-bottom: 1rem;
        }

        .card-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          flex-grow: 1;
        }

        .card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--accent-gold);
          font-weight: 600;
        }

        .card-link:hover {
          color: var(--accent-glow);
        }

        /* Difference Section */
        .difference-section {
          background-color: #080808;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .difference-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 600px;
        }

        .difference-image {
          background-size: cover;
          background-position: center;
          filter: grayscale(100%) contrast(105%);
        }

        .difference-content {
          display: flex;
          align-items: center;
          padding: 4rem;
        }

        .content-padding {
          max-width: 500px;
        }

        .difference-para {
          color: var(--text-secondary);
          margin: 1.5rem 0;
          font-size: 1rem;
          line-height: 1.7;
        }

        /* Process Section */
        .process-section {
          padding: var(--section-padding);
        }

        .timeline-container {
          position: relative;
          margin-top: 4rem;
        }

        .timeline-line {
          position: absolute;
          top: 1.5rem;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--border-color);
          z-index: 1;
        }

        .timeline-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          position: relative;
          z-index: 2;
        }

        .timeline-step {
          background-color: var(--bg-primary);
          padding-top: 0.5rem;
        }

        .step-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.2rem;
          height: 2.2rem;
          border: 1px solid var(--accent-gold);
          border-radius: 50%;
          background-color: #0b0b0b;
          color: var(--accent-gold);
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .step-title {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .step-desc {
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.5;
        }

        /* Testimonials */
        .testimonials-section {
          padding: var(--section-padding);
        }

        .testimonial-slider {
          padding: 4rem;
          position: relative;
          background: radial-gradient(circle at 10% 20%, rgba(201, 168, 76, 0.03) 0%, transparent 80%);
        }

        .quote-icon {
          color: var(--border-color);
          margin-bottom: 2rem;
        }

        .testimonial-text {
          font-size: 1.8rem;
          line-height: 1.5;
          margin-bottom: 2.5rem;
          color: var(--text-primary);
        }

        .testimonial-author {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-family: var(--font-headline);
          font-size: 1.1rem;
          color: var(--text-primary);
        }

        .author-meta {
          font-size: 0.65rem;
          margin-top: 0.25rem;
        }

        .slider-controls {
          position: absolute;
          bottom: 4rem;
          right: 4rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .control-btn {
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: var(--transition-fast);
        }

        .control-btn:hover {
          color: var(--accent-gold);
          border-color: var(--accent-gold);
          background-color: rgba(201, 168, 76, 0.05);
        }

        .slider-index {
          font-size: 0.7rem;
        }

        /* Partners */
        .partners-section {
          padding: 4rem 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          background-color: #060606;
          text-align: center;
        }

        .partner-title-tag {
          display: block;
          margin-bottom: 2.5rem;
          color: #555;
        }

        .partners-grid {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 2.5rem;
          padding: 0 1.5rem;
        }

        .partner-logo {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: #2a2a2a;
          letter-spacing: 0.15em;
          transition: var(--transition-smooth);
        }

        .partner-logo:hover {
          color: var(--accent-gold);
          text-shadow: 0 0 10px rgba(201, 168, 76, 0.2);
        }

        /* CTA Banner */
        .cta-banner {
          position: relative;
          padding: 8rem 2rem;
          text-align: center;
          overflow: hidden;
          background: radial-gradient(circle at center, #1b1610 0%, #0a0a0a 100%);
          border-bottom: 1px solid var(--border-color);
        }

        .cta-container {
          position: relative;
          z-index: 10;
        }

        .cta-title {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .cta-desc {
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          font-size: 1.1rem;
        }

        @media (max-width: 1024px) {
          .hero-title {
            font-size: 3.5rem;
          }
          .cards-grid {
            grid-template-columns: 1fr;
          }
          .difference-grid {
            grid-template-columns: 1fr;
          }
          .difference-image {
            height: 350px;
          }
          .timeline-grid {
            grid-template-columns: 1fr 1fr;
          }
          .timeline-line {
            display: none;
          }
          .stats-grid {
            gap: 2rem;
            flex-direction: column;
          }
          .partners-grid {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.8rem;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-actions button, .hero-actions :global(a) {
            width: 100%;
          }
          .statement-text {
            font-size: 1.6rem;
          }
          .testimonial-slider {
            padding: 2rem;
          }
          .testimonial-text {
            font-size: 1.3rem;
          }
          .slider-controls {
            position: relative;
            bottom: unset;
            right: unset;
            margin-top: 2rem;
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
}
