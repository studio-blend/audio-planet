'use client';
import { useState } from 'react';
import { Layers, ShieldAlert, Wrench, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Services() {
  const [selectedElement, setSelectedElement] = useState('speakers');

  const roomElements = {
    speakers: {
      title: "Reference Speaker Alignment",
      desc: "Placing speakers at the optimal dispersion distance from room boundaries. Angled to focus high-frequencies at the primary listening position while minimizing boundary cancellations."
    },
    reflection: {
      title: "First Reflection Points",
      desc: "The points on the side walls where sound waves bounce first before reaching your ears. We apply medium-density absorption panels here to prevent comb-filtering and improve stereo imaging."
    },
    basstraps: {
      title: "Corner Bass Traps",
      desc: "Low-frequency energy accumulates in corners. By installing deep velocity-based or membrane absorbers in room corners, we eliminate muddy bass resonances and acoustic boominess."
    },
    diffusion: {
      title: "Rear Wall Diffusion",
      desc: "Instead of absorbing sound and making the room feel dead, we deploy mathematical QRD diffusers on the back wall. This scatters reflections in time and space, creating a wide, natural soundstage."
    }
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
    <div className="services-page container anim-fade-in">
      <section className="services-hero">
        <span className="font-mono-tag">Acoustic Architectures</span>
        <h1 className="services-title font-display-italic">Our Services</h1>
        <p className="services-lead">
          From structural boundary planning to microscopic phase alignment, we provide specialized engineering to match your room coordinates.
        </p>
      </section>

      {/* Services Details */}
      <section className="services-list">
        <div className="service-detail-row exhibition-frame">
          <div className="detail-meta">
            <span className="font-mono-tag detail-num">01</span>
            <Layers className="detail-icon" size={24} />
          </div>
          <div className="detail-body">
            <h2 className="font-headline-serif detail-title">Acoustic Design & Engineering</h2>
            <p className="detail-desc">
              We translate physical boundaries into clean acoustics. We compute room modes, design custom absorption panels, specify ceiling heights, and draft isolation boundaries. 
            </p>
            <div className="architect-alert">
              <CheckCircle2 size={16} className="alert-icon" />
              <span>We collaborate directly with your architects and interior designers, providing CAD layouts to integrate acoustic treatments invisibly into structural walls.</span>
            </div>
          </div>
        </div>

        <div className="service-detail-row exhibition-frame">
          <div className="detail-meta">
            <span className="font-mono-tag detail-num">02</span>
            <Wrench className="detail-icon" size={24} />
          </div>
          <div className="detail-body">
            <h2 className="font-headline-serif detail-title">System Integration & Calibration</h2>
            <p className="detail-desc">
              Correct hardware matching is only half the battle. Our engineers manage system implementation on-site: installing low-loss oxygen-free cables, isolation racks, linear power supplies, and calibrating subwoofer cross-over phases.
            </p>
          </div>
        </div>

        <div className="service-detail-row exhibition-frame">
          <div className="detail-meta">
            <span className="font-mono-tag detail-num">03</span>
            <ShieldCheck className="detail-icon" size={24} />
          </div>
          <div className="detail-body">
            <h2 className="font-headline-serif detail-title">System Audits & Maintenance</h2>
            <p className="detail-desc">
              Acoustic materials decay and hardware connections oxidize. We offer yearly system audits to check driver health, retune digital room calibration profiles, verify power grounding, and optimize component performance.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Room Schematic */}
      <section className="room-schematic-section">
        <h2 className="font-headline-serif schematic-main-title">Interactive Acoustic Room Calibration</h2>
        <p className="schematic-subtitle">
          Select highlighted sections of the layout blueprint below to explore how we calibrate home listening spaces.
        </p>

        <div className="schematic-container exhibition-frame">
          {/* SVG Schematic */}
          <div className="schematic-graphics">
            <svg viewBox="0 0 800 500" className="room-blueprint">
              {/* Outer Room Walls */}
              <rect x="50" y="50" width="700" height="400" fill="none" stroke="#2A2520" strokeWidth="4" />
              <rect x="45" y="45" width="710" height="410" fill="none" stroke="#C9A84C" strokeWidth="1" strokeDasharray="5,5" opacity="0.3" />

              {/* Grid Lines */}
              <line x1="400" y1="50" x2="400" y2="450" stroke="#2A2520" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="50" y1="250" x2="750" y2="250" stroke="#2A2520" strokeWidth="1" strokeDasharray="4,4" />

              {/* Listening Position (Chair) */}
              <circle cx="400" cy="320" r="15" fill="#181818" stroke="#8A8680" strokeWidth="2" />
              <path d="M 385 325 Q 400 340 415 325" fill="none" stroke="#8A8680" strokeWidth="2" />
              <text x="400" y="360" fill="#8A8680" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">PRIMARY LISTENER</text>

              {/* Speakers (Clickable) */}
              <g 
                onClick={() => setSelectedElement('speakers')}
                onMouseEnter={addHover}
                onMouseLeave={removeHover}
                style={{ cursor: 'pointer' }}
              >
                {/* Left Speaker */}
                <rect x="180" y="80" width="40" height="60" fill={selectedElement === 'speakers' ? 'rgba(201, 168, 76, 0.2)' : '#111'} stroke={selectedElement === 'speakers' ? '#C9A84C' : '#8A8680'} strokeWidth="2" />
                <line x1="180" y1="80" x2="220" y2="140" stroke="#C9A84C" opacity="0.5" />
                {/* Right Speaker */}
                <rect x="580" y="80" width="40" height="60" fill={selectedElement === 'speakers' ? 'rgba(201, 168, 76, 0.2)' : '#111'} stroke={selectedElement === 'speakers' ? '#C9A84C' : '#8A8680'} strokeWidth="2" />
                <line x1="620" y1="80" x2="580" y2="140" stroke="#C9A84C" opacity="0.5" />
                {/* Dispersion Cones */}
                <path d="M 200 140 L 380 320" stroke="#C9A84C" strokeWidth="1" strokeDasharray="3,3" opacity={selectedElement === 'speakers' ? '0.8' : '0.3'} />
                <path d="M 600 140 L 420 320" stroke="#C9A84C" strokeWidth="1" strokeDasharray="3,3" opacity={selectedElement === 'speakers' ? '0.8' : '0.3'} />
                <text x="400" y="115" fill={selectedElement === 'speakers' ? '#C9A84C' : '#8A8680'} fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">SPEAKERS [01]</text>
              </g>

              {/* First Reflection Points (Clickable) */}
              <g
                onClick={() => setSelectedElement('reflection')}
                onMouseEnter={addHover}
                onMouseLeave={removeHover}
                style={{ cursor: 'pointer' }}
              >
                {/* Left Wall Panel */}
                <rect x="42" y="180" width="15" height="100" fill={selectedElement === 'reflection' ? '#C9A84C' : '#111'} stroke="#C9A84C" strokeWidth="1.5" />
                {/* Right Wall Panel */}
                <rect x="743" y="180" width="15" height="100" fill={selectedElement === 'reflection' ? '#C9A84C' : '#111'} stroke="#C9A84C" strokeWidth="1.5" />
                {/* Reflection bounce lines */}
                <path d="M 200 140 L 50 230 L 400 320" stroke="#8A8680" strokeWidth="1" strokeDasharray="2,2" opacity={selectedElement === 'reflection' ? '0.8' : '0.2'} />
                <path d="M 600 140 L 750 230 L 400 320" stroke="#8A8680" strokeWidth="1" strokeDasharray="2,2" opacity={selectedElement === 'reflection' ? '0.8' : '0.2'} />
                <text x="100" y="235" fill={selectedElement === 'reflection' ? '#C9A84C' : '#8A8680'} fontSize="10" fontFamily="var(--font-mono)">FIRST REFLECTION [02]</text>
                <text x="700" y="235" fill={selectedElement === 'reflection' ? '#C9A84C' : '#8A8680'} fontSize="10" fontFamily="var(--font-mono)" textAnchor="end">[02]</text>
              </g>

              {/* Bass Traps (Clickable) */}
              <g
                onClick={() => setSelectedElement('basstraps')}
                onMouseEnter={addHover}
                onMouseLeave={removeHover}
                style={{ cursor: 'pointer' }}
              >
                {/* Top Left Corner */}
                <polygon points="52,52 90,52 52,90" fill={selectedElement === 'basstraps' ? '#C9A84C' : '#111'} stroke="#C9A84C" strokeWidth="1.5" />
                {/* Top Right Corner */}
                <polygon points="748,52 710,52 748,90" fill={selectedElement === 'basstraps' ? '#C9A84C' : '#111'} stroke="#C9A84C" strokeWidth="1.5" />
                <text x="110" y="75" fill={selectedElement === 'basstraps' ? '#C9A84C' : '#8A8680'} fontSize="10" fontFamily="var(--font-mono)">BASS TRAPS [03]</text>
                <text x="690" y="75" fill={selectedElement === 'basstraps' ? '#C9A84C' : '#8A8680'} fontSize="10" fontFamily="var(--font-mono)" textAnchor="end">[03]</text>
              </g>

              {/* Rear Wall Diffusion (Clickable) */}
              <g
                onClick={() => setSelectedElement('diffusion')}
                onMouseEnter={addHover}
                onMouseLeave={removeHover}
                style={{ cursor: 'pointer' }}
              >
                {/* Rear Wall Panel */}
                <rect x="300" y="440" width="200" height="18" fill={selectedElement === 'diffusion' ? 'rgba(201, 168, 76, 0.4)' : '#111'} stroke="#C9A84C" strokeWidth="1.5" />
                {/* Diffusion lines (zigzag details) */}
                <path d="M 310 445 L 320 450 L 330 445 L 340 450 L 350 445 L 360 450 L 370 445 L 380 450 L 390 445 L 400 450 L 410 445 L 420 450 L 430 445 L 440 450 L 450 445 L 460 450 L 470 445 L 480 450 L 490 445" fill="none" stroke="#C9A84C" strokeWidth="1" />
                <text x="400" y="420" fill={selectedElement === 'diffusion' ? '#C9A84C' : '#8A8680'} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">QRD REAR DIFFUSION [04]</text>
              </g>
            </svg>
          </div>

          {/* Explanation console */}
          <div className="schematic-console">
            <span className="font-mono-tag console-label">Acoustic Element Status</span>
            <h3 className="console-title font-headline-serif">{roomElements[selectedElement].title}</h3>
            <p className="console-desc">{roomElements[selectedElement].desc}</p>
          </div>
        </div>
      </section>

      <section className="services-cta-footer">
        <h3 className="font-headline-serif">Submit Blueprints for Review</h3>
        <p>Our lead acoustician Palani Kumar will coordinate with your architectural draft files.</p>
        <button 
          onClick={() => openGlobalModal('Acoustic Blueprint Review')}
          className="btn-primary"
          onMouseEnter={addHover}
          onMouseLeave={removeHover}
        >
          Book Blueprint Audit
        </button>
      </section>

      <style jsx>{`
        .services-page {
          padding-top: 140px;
          padding-bottom: 6rem;
        }

        .services-hero {
          max-width: 800px;
          margin-bottom: 5rem;
        }

        .services-title {
          font-size: 4rem;
          margin: 1rem 0;
          line-height: 1.1;
        }

        .services-lead {
          font-size: 1.3rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Services List */
        .services-list {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          margin-bottom: 6rem;
        }

        .service-detail-row {
          display: flex;
          padding: 3rem;
          gap: 3rem;
        }

        .detail-meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }

        .detail-num {
          font-size: 1.2rem;
          color: var(--accent-gold);
          font-weight: 700;
        }

        .detail-icon {
          color: var(--text-secondary);
        }

        .detail-body {
          flex-grow: 1;
        }

        .detail-title {
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }

        .detail-desc {
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .architect-alert {
          background-color: #0b0b0b;
          border: 1px dashed var(--border-color);
          padding: 1rem;
          display: flex;
          gap: 0.75rem;
          align-items: center;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .alert-icon {
          color: var(--accent-gold);
          flex-shrink: 0;
        }

        /* Room Schematic */
        .room-schematic-section {
          margin-bottom: 6rem;
        }

        .schematic-main-title {
          font-size: 2.2rem;
          margin-bottom: 0.5rem;
        }

        .schematic-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
          margin-bottom: 3rem;
        }

        .schematic-container {
          padding: 2.5rem;
          background-color: #070707;
        }

        .schematic-graphics {
          background-color: #030303;
          border: 1px solid var(--border-color);
          padding: 1rem;
          margin-bottom: 2rem;
        }

        .room-blueprint {
          width: 100%;
          height: auto;
          display: block;
        }

        .schematic-console {
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
          min-height: 140px;
        }

        .console-label {
          color: var(--accent-gold);
          font-size: 0.65rem;
        }

        .console-title {
          font-size: 1.5rem;
          margin: 0.25rem 0 0.75rem 0;
        }

        .console-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 800px;
        }

        /* Services CTA footer */
        .services-cta-footer {
          text-align: center;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 4rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .services-cta-footer h3 {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }

        .services-cta-footer p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        @media (max-width: 900px) {
          .service-detail-row {
            flex-direction: column;
            padding: 2rem;
            gap: 1.5rem;
          }
          .detail-meta {
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 1rem;
          }
        }

        @media (max-width: 768px) {
          .services-title {
            font-size: 3rem;
          }
          .schematic-container {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
