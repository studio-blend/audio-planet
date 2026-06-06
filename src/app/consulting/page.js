'use client';
import { useState } from 'react';
import { Calendar, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export default function Consulting() {
  const [openIndex, setOpenIndex] = useState(0);

  const services = [
    {
      title: "Hi-Fi Experience Audits",
      subtitle: "AUDITION REFERENCE STANDARDS",
      desc: "Our consulting starts by recalibrating your ears. At our Bangalore experience centre, you'll audition various reference level digital and analogue sources, solid-state vs valve amplification, and dispersion layouts.",
      deliverables: [
        "Audition reference systems without sales pressure",
        "Understand differences in amplification topologies (Class A, AB, D, Hybrid)",
        "Isolate personal acoustic preferences (neutral, warm, clinical, analytical)"
      ]
    },
    {
      title: "Comprehensive Need Analysis",
      subtitle: "UNDERSTAND LAYOUT LIMITATIONS",
      desc: "We analyze your lifestyle patterns, room layout files, and media configurations. Sound consulting is as much about understanding family logistics and decor aesthetics as it is about decibel levels.",
      deliverables: [
        "Review blueprints and construction mockups",
        "Audit existing system constraints and components",
        "Map primary listening positions and dispersion angles"
      ]
    },
    {
      title: "Independent Product Evaluation",
      subtitle: "UNBIASED SPECIFICATION Auditing",
      desc: "Because we operate as consultants, we evaluate audio products based on real bench measurements, impedance plots, and off-axis speaker behavior rather than manufacturer marketing materials.",
      deliverables: [
        "Calculate electrical matching (amplifier wattage vs speaker impedance loads)",
        "Select cabinet sizes that correspond to room air volume",
        "Provide direct brand comparisons across performance segments"
      ]
    },
    {
      title: "Listening Room Enhancement",
      subtitle: "BOUNDARY CALIBRATION & ISOLATION",
      desc: "Sound waves are shaped by boundaries. We consult on modifying structural surfaces to manage reflections. This includes specifies wall materials, floor finishes, ceiling heights, and furniture placements.",
      deliverables: [
        "Compute room modes and resonance hot-spots",
        "Design custom absorption panels and diffuser templates",
        "Architect door and window isolation seals"
      ]
    },
    {
      title: "Final Performance Optimization",
      subtitle: "IN-SITU TUNING & TIMING CORRECTION",
      desc: "A system isn't complete until it's calibrated in place. We use reference microphones and timing analyzers to adjust speaker toe-in, micro-angles, sub crossover points, and electrical phases.",
      deliverables: [
        "Calibrate crossover frequencies and phase settings",
        "Measure room impulse responses",
        "Perform sub-woofer alignment and cabinet dampening checks"
      ]
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

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
    <div className="consulting-page container anim-fade-in">
      <section className="consulting-hero">
        <span className="font-mono-tag">Engineering Acoustics</span>
        <h1 className="consulting-title font-display-italic">The Hi-Fi Experience</h1>
        <p className="consulting-lead">
          We guide you through the physics of sound. No retail pressure, just expert audio consulting to align your room architecture with your acoustic soul.
        </p>
      </section>

      <div className="consulting-body">
        {/* Accordions (Left Column) */}
        <div className="accordions-container">
          {services.map((service, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`accordion-item ${isOpen ? 'active' : ''}`}
                style={{ borderBottom: '1px solid var(--border-color)', padding: '1.5rem 0' }}
              >
                <button 
                  className="accordion-header"
                  onClick={() => toggleAccordion(index)}
                  onMouseEnter={addHover}
                  onMouseLeave={removeHover}
                >
                  <div className="header-text">
                    <span className="font-mono-tag header-sub">{service.subtitle}</span>
                    <h3 className="font-headline-serif header-title">{service.title}</h3>
                  </div>
                  <div className="header-icon">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="accordion-content anim-fade-in">
                    <p className="content-desc">{service.desc}</p>
                    <div className="content-deliverables">
                      <h4 className="font-mono-tag deliv-title">Core Deliverables</h4>
                      <ul>
                        {service.deliverables.map((item, dIndex) => (
                          <li key={dIndex}>
                            <CheckCircle2 size={16} className="deliv-icon" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar CTA (Right Column) */}
        <div className="consulting-sidebar">
          <div className="sidebar-card exhibition-frame">
            <span className="font-mono-tag">Consulting</span>
            <h3 className="font-headline-serif sidebar-title">Speak to an Expert</h3>
            <p className="sidebar-desc">
              Schedule a 1-on-1 analysis of your room blueprints with Palani Kumar. We assist you in coordinating architectural planning.
            </p>
            <button
              onClick={() => openGlobalModal('Speak to an Expert')}
              className="btn-primary sidebar-btn"
              onMouseEnter={addHover}
              onMouseLeave={removeHover}
            >
              <Calendar size={14} style={{ marginRight: '8px' }} />
              Request Audit
            </button>
            <span className="sidebar-note font-mono-tag">No consultation fee for initial blueprint audits.</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .consulting-page {
          padding-top: 140px;
          padding-bottom: 6rem;
        }

        .consulting-hero {
          max-width: 800px;
          margin-bottom: 5rem;
        }

        .consulting-title {
          font-size: 4rem;
          margin: 1rem 0;
          line-height: 1.1;
        }

        .consulting-lead {
          font-size: 1.3rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .consulting-body {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .accordion-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
        }

        .header-sub {
          color: var(--accent-gold);
          font-size: 0.65rem;
        }

        .header-title {
          font-size: 1.8rem;
          margin-top: 0.25rem;
          transition: var(--transition-fast);
        }

        .accordion-header:hover .header-title {
          color: var(--accent-gold);
        }

        .header-icon {
          color: var(--text-secondary);
        }

        .accordion-content {
          padding: 1.5rem 0 0.5rem 0;
        }

        .content-desc {
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .deliv-title {
          color: var(--text-primary);
          font-size: 0.7rem;
          margin-bottom: 0.75rem;
        }

        .content-deliverables ul {
          list-style: none;
        }

        .content-deliverables li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
        }

        .deliv-icon {
          color: var(--accent-gold);
          flex-shrink: 0;
        }

        /* Sidebar card */
        .consulting-sidebar {
          position: sticky;
          top: 120px;
        }

        .sidebar-card {
          padding: 2.5rem;
          background-color: var(--bg-surface);
        }

        .sidebar-title {
          font-size: 1.8rem;
          margin: 0.5rem 0 1rem 0;
        }

        .sidebar-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .sidebar-btn {
          width: 100%;
        }

        .sidebar-note {
          display: block;
          font-size: 0.6rem;
          text-align: center;
          color: #555;
          margin-top: 1rem;
        }

        @media (max-width: 900px) {
          .consulting-body {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .consulting-sidebar {
            position: relative;
            top: unset;
          }
        }

        @media (max-width: 768px) {
          .consulting-title {
            font-size: 3rem;
          }
          .header-title {
            font-size: 1.4rem;
          }
          .content-desc {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}
