'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    enquiryType: 'General Consultation',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
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

  return (
    <div className="contact-page container anim-fade-in">
      <section className="contact-hero">
        <span className="font-mono-tag">Liaison Desk</span>
        <h1 className="contact-title font-display-italic">Connect with Us</h1>
        <p className="contact-lead">
          Share your room dimensions, blueprints, or component questions with our consultants in Bangalore.
        </p>
      </section>

      <div className="contact-body">
        {/* Form Column */}
        <div className="form-column exhibition-frame">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <span className="font-mono-tag form-sec-lbl">Consulting Request Form</span>
              <h2 className="font-headline-serif form-title">Submit Specifications</h2>

              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your full name"
                />
              </div>

              <div className="form-double">
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Mobile number"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Enquiry Domain</label>
                <select
                  name="enquiryType"
                  value={formData.enquiryType}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="General Consultation">General Hi-Fi Consultation</option>
                  <option value="Acoustic Room Design">Acoustic Room Treatment</option>
                  <option value="Home Theater Installation">Dedicated Home Cinema</option>
                  <option value="Calibration Audit">Existing System Calibrating</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Describe Your Space / Requirements</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="form-textarea"
                  placeholder="Mention room dimensions, wall finishes, and music preferences..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary submit-btn"
                onMouseEnter={addHover}
                onMouseLeave={removeHover}
              >
                {isSubmitting ? (
                  <span>Saving details...</span>
                ) : (
                  <>
                    <Send size={14} style={{ marginRight: '8px' }} />
                    Submit Enquiry
                  </>
                )}
              </button>
              <p className="form-note">Expected reply coordinate within 24 hours.</p>
            </form>
          ) : (
            <div className="success-state">
              <CheckCircle size={40} className="success-icon" style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem' }} />
              <h2 className="font-headline-serif success-title">Enquiry Registered</h2>
              <p className="success-desc">
                Thank you. Our audio engineers have saved your details. An acoustician will connect via your coordinates within 24 hours.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="btn-secondary"
                onMouseEnter={addHover}
                onMouseLeave={removeHover}
              >
                Submit another request
              </button>
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="info-column">
          <div className="info-block exhibition-frame" style={{ marginBottom: '2rem' }}>
            <h3 className="font-headline-serif block-title">Experience Centre</h3>
            <ul className="contact-details-list">
              <li>
                <MapPin className="icon" size={16} />
                <span>Audio Planet, 703/A, 3rd Block, Behind BDA Complex, Koramangala, Bangalore, Karnataka 560034</span>
              </li>
              <li>
                <Phone className="icon" size={16} />
                <span>
                  <a href="tel:+919845019192" onMouseEnter={addHover} onMouseLeave={removeHover}>+91 98450 19192</a><br />
                  <a href="tel:+919845694986" onMouseEnter={addHover} onMouseLeave={removeHover}>+91 98456 94986</a><br />
                  <a href="tel:08025521266" onMouseEnter={addHover} onMouseLeave={removeHover}>080 2552 1266 (Landline)</a>
                </span>
              </li>
              <li>
                <Mail className="icon" size={16} />
                <a href="mailto:info@audioplanet.co.in" onMouseEnter={addHover} onMouseLeave={removeHover}>info@audioplanet.co.in</a>
              </li>
            </ul>
            <div style={{ marginTop: '2rem', padding: '1rem', borderLeft: '2px solid var(--accent-gold)', backgroundColor: 'rgba(201, 168, 76, 0.05)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                <strong style={{ color: 'var(--accent-gold)' }}>IMPORTANT:</strong> Product demonstrations are strictly on an appointment basis. Please call us to fix your time slot.
              </p>
            </div>
          </div>

          {/* Map mockup */}
          <div className="map-mockup-frame exhibition-frame">
            <div className="map-blueprint">
              <div className="map-radar" />
              <div className="map-pin-indicator" />
              <span className="font-mono-tag map-tag">12.9716° N, 77.5946° E</span>
              <span className="map-label">AUDIO PLANET LABS</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-page {
          padding-top: 140px;
          padding-bottom: 6rem;
        }

        .contact-hero {
          max-width: 800px;
          margin-bottom: 4rem;
        }

        .contact-title {
          font-size: 4rem;
          margin: 1rem 0;
          line-height: 1.1;
        }

        .contact-lead {
          font-size: 1.3rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .contact-body {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        /* Form column */
        .form-column {
          padding: 3rem;
          background-color: var(--bg-surface);
        }

        .form-sec-lbl {
          color: var(--accent-gold);
          font-size: 0.65rem;
        }

        .form-title {
          font-size: 2rem;
          margin: 0.25rem 0 1.5rem 0;
        }

        .form-double {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .submit-btn {
          width: 100%;
        }

        .form-note {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-secondary);
          text-align: center;
          margin-top: 1rem;
        }

        /* Success state */
        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 3rem 0;
        }

        .success-title {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .success-desc {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 400px;
        }

        /* Info column */
        .info-block {
          padding: 2.5rem;
          background-color: var(--bg-surface);
        }

        .block-title {
          font-size: 1.6rem;
          margin-bottom: 1.5rem;
        }

        .contact-details-list {
          list-style: none;
        }

        .contact-details-list li {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.25rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .contact-details-list .icon {
          color: var(--accent-gold);
          flex-shrink: 0;
          margin-top: 3px;
        }

        .contact-details-list a {
          color: var(--text-secondary);
        }

        .contact-details-list a:hover {
          color: var(--accent-gold);
        }

        /* Map Mockup */
        .map-mockup-frame {
          padding: 1rem;
        }

        .map-blueprint {
          height: 250px;
          background-color: #030303;
          border: 1px solid var(--border-color);
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        /* Radar scan effect */
        .map-radar {
          position: absolute;
          width: 200px;
          height: 200px;
          border: 1px solid rgba(201, 168, 76, 0.15);
          border-radius: 50%;
          animation: radar 3s linear infinite;
        }

        .map-pin-indicator {
          width: 8px;
          height: 8px;
          background-color: var(--accent-gold);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-gold);
          margin-bottom: 0.75rem;
          z-index: 2;
        }

        .map-tag {
          font-size: 0.65rem;
          color: #555;
          z-index: 2;
        }

        .map-label {
          font-family: var(--font-headline);
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          color: var(--text-primary);
          margin-top: 0.25rem;
          z-index: 2;
        }

        @keyframes radar {
          from {
            transform: scale(0.2);
            opacity: 1;
          }
          to {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @media (max-width: 900px) {
          .contact-body {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        @media (max-width: 768px) {
          .contact-title {
            font-size: 3rem;
          }
          .form-column {
            padding: 1.5rem;
          }
          .form-double {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>
    </div>
  );
}
