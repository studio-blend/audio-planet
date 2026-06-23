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
    { name: 'IBM Bangalore', type: 'Corporate Integration' },
    { name: 'Amarjyothi Nursing Home', type: 'Institutional' },
    { name: 'Gayathri and Namith Associates', type: 'Architecture Partners' }
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

        /* Full Testimonials */
        .section-main-title {
          font-size: 2.5rem;
          margin-bottom: 3rem;
        }
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
        }

        @media (max-width: 600px) {
          .logos-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
