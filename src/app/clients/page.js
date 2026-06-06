'use client';
import { Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Clients() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('/api/cms')
      .then(res => res.json())
      .then(data => {
        if (data && data.testimonials) {
          setTestimonials(data.testimonials);
        }
      })
      .catch(err => console.error('Error fetching testimonials:', err));
  }, []);

  const clients = [
    { name: 'PES Institutions', type: 'Educational / Auditorium' },
    { name: 'DecoForm Associates', type: 'Residential Architecture' },
    { name: 'Jayanagar Villas', type: 'Private Residential' },
    { name: 'Ozone Group penthouses', type: 'Smart Home Acoustics' },
    { name: 'Taj Hotels Bangalore', type: 'Boardroom Integrations' },
    { name: 'Salarpuria Sattva estates', type: 'Bespoke Home Cinemas' }
  ];

  const caseStudies = [
    {
      title: "PES Institutions Auditorium Calibration",
      category: "INSTITUTIONAL ACOUSTICS",
      summary: "Calibrating a 1,200-seat multi-purpose university auditorium. Standardized speech intelligibility indexes (STI) across all listening zones without structural modification.",
      challenge: "High ceiling boundaries and curved concrete back walls created severe flutter echo and speech muddying.",
      solution: "Engineered high-density corner bass trapping, custom fabric side absorption panels, and calibrated speaker array delay stages using acoustic impulse software.",
      testimonial: {
        quote: "Their work at our institutional auditorium was impeccable. The intelligibility of speech and depth of musical playback is standard-setting.",
        author: "Prof. K. Venkatesh, Infrastructure Director, PES Institutions"
      }
    },
    {
      title: "Indiranagar Penthouse Acoustic Treatment",
      category: "RESIDENTIAL CINEMA",
      summary: "A private high-fidelity reference listening room for a classical music patron, built in an open-concept 4,000 sq ft penthouse floor.",
      challenge: "Double-height glass windows and marble floors created extreme high-frequency resonance and a decay time of over 2.4 seconds.",
      solution: "Fitted custom micro-perforated wood ceiling panels, thick wool carpets with acoustic rubber underlays, and motor-driven double-layer acoustic draperies.",
      testimonial: {
        quote: "Audio Planet doesn't just install speakers; they design an atmosphere. Their understanding of room acoustics changed how we conceptualize luxury living spaces.",
        author: "Ravi Shankar, Principal Architect, DecoForm Associates"
      }
    }
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

  return (
    <div className="clients-page container anim-fade-in">
      <section className="clients-hero">
        <span className="font-mono-tag">Featured Audits</span>
        <h1 className="clients-title font-display-italic">Our Clients</h1>
        <p className="clients-lead">
          We collaborate with architects, developers, and premium homeowners to build museum-grade listening environments.
        </p>
      </section>

      {/* Client Logos Grid */}
      <section className="clients-logo-section">
        <span className="font-mono-tag section-tag">Authorized Alignments</span>
        <div className="logos-grid">
          {clients.map((client, i) => (
            <div 
              key={i} 
              className="logo-card exhibition-frame"
              onMouseEnter={addHover}
              onMouseLeave={removeHover}
            >
              <h3 className="client-logo-txt font-headline-serif">{client.name}</h3>
              <span className="client-logo-sub font-mono-tag">{client.type}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section className="case-studies-section">
        <h2 className="font-headline-serif section-main-title">Acoustic Case Studies</h2>
        
        <div className="case-studies-list">
          {caseStudies.map((cs, i) => (
            <div key={i} className="case-study-card exhibition-frame">
              <div className="cs-header">
                <span className="font-mono-tag cs-tag">{cs.category}</span>
                <h3 className="font-headline-serif cs-title">{cs.title}</h3>
              </div>
              
              <p className="cs-summary">{cs.summary}</p>
              
              <div className="cs-details-grid">
                <div className="cs-detail-block">
                  <h4 className="font-mono-tag block-title">Acoustic Challenge</h4>
                  <p>{cs.challenge}</p>
                </div>
                <div className="cs-detail-block">
                  <h4 className="font-mono-tag block-title">Acoustic Solution</h4>
                  <p>{cs.solution}</p>
                </div>
              </div>

              <div className="cs-quote-block">
                <Quote className="quote-icon" size={24} />
                <p className="quote-text font-display-italic">"{cs.testimonial.quote}"</p>
                <span className="quote-author font-mono-tag">— {cs.testimonial.author}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Testimonials Section */}
      <section className="full-testimonials-section">
        <h2 className="font-headline-serif section-main-title text-center">Client Testimonials</h2>
        {testimonials.length > 0 ? (
          <div className="testimonials-masonry">
            {testimonials.map((test, i) => (
              <div key={i} className="test-card exhibition-frame">
                <Quote className="quote-icon-small" size={16} />
                <p className="test-quote font-display-italic">"{test.quote}"</p>
                <div className="test-author-info">
                  <span className="test-name font-headline-serif">{test.author}</span>
                  <span className="test-meta font-mono-tag">{test.designation}, {test.company}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="font-mono-tag text-center" style={{ padding: '2rem' }}>Loading testimonials...</div>
        )}
      </section>

      <style jsx>{`
        .clients-page {
          padding-top: 140px;
          padding-bottom: 6rem;
        }

        .clients-hero {
          max-width: 800px;
          margin-bottom: 5rem;
        }

        .clients-title {
          font-size: 4rem;
          margin: 1rem 0;
          line-height: 1.1;
        }

        .clients-lead {
          font-size: 1.3rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Logos Grid */
        .clients-logo-section {
          margin-bottom: 6rem;
        }

        .section-tag {
          display: block;
          color: #555;
          margin-bottom: 2rem;
        }

        .logos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .logo-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          justify-content: center;
          min-height: 150px;
        }

        .client-logo-txt {
          font-size: 1.4rem;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .logo-card:hover .client-logo-txt {
          color: var(--accent-gold);
        }

        .client-logo-sub {
          font-size: 0.55rem;
          color: #555;
          margin-top: 0.5rem;
        }

        /* Case Studies */
        .case-studies-section {
          margin-bottom: 4rem;
        }

        .section-main-title {
          font-size: 2.5rem;
          margin-bottom: 3rem;
        }

        .case-studies-list {
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        .case-study-card {
          padding: 4rem;
          background-color: var(--bg-surface);
        }

        .cs-header {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.5rem;
          margin-bottom: 2rem;
        }

        .cs-tag {
          color: var(--accent-gold);
          font-size: 0.65rem;
        }

        .cs-title {
          font-size: 2rem;
          margin-top: 0.25rem;
        }

        .cs-summary {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-primary);
          margin-bottom: 2.5rem;
          max-width: 900px;
        }

        .cs-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .block-title {
          color: var(--text-primary);
          font-size: 0.7rem;
          margin-bottom: 0.75rem;
        }

        .cs-detail-block p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .cs-quote-block {
          border-top: 1px dashed var(--border-color);
          padding-top: 2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .quote-icon {
          color: var(--accent-gold);
          margin-bottom: 1rem;
          opacity: 0.6;
        }

        .quote-text {
          font-size: 1.25rem;
          color: var(--text-primary);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .quote-author {
          font-size: 0.65rem;
          color: var(--text-secondary);
        }

        /* Full Testimonials */
        .full-testimonials-section {
          margin-top: 6rem;
        }

        .testimonials-masonry {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .test-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .quote-icon-small {
          color: var(--accent-gold);
          opacity: 0.4;
          margin-bottom: 1rem;
        }

        .test-quote {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-primary);
          margin-bottom: 2rem;
          flex-grow: 1;
        }

        .test-author-info {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
        }

        .test-name {
          font-size: 1.1rem;
          color: var(--accent-gold);
          margin-bottom: 0.25rem;
        }

        .test-meta {
          font-size: 0.65rem;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .logos-grid {
            grid-template-columns: 1fr 1fr;
          }
          .case-study-card {
            padding: 2rem;
          }
          .cs-details-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 600px) {
          .logos-grid {
            grid-template-columns: 1fr;
          }
          .cs-title {
            font-size: 1.5rem;
          }
          .cs-summary {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}
