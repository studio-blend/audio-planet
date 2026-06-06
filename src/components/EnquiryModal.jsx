'use client';
import { useState, useEffect } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';

export default function EnquiryModal({ isOpen, onClose, product }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    enquiryType: 'General Consultation',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData((prev) => ({
        ...prev,
        enquiryType: product.category ? `Product Enquiry: ${product.name}` : product.name,
        message: product.id ? `Hello, I would like to get a consultation and quote for the ${product.brand} ${product.name}.` : '',
      }));
    }
  }, [product, isOpen]);

  useEffect(() => {
    // Prevent background scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset state on close
      setIsSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        enquiryType: 'General Consultation',
        message: '',
      });
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  if (!isOpen) return null;

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container exhibition-frame" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close" 
          onClick={onClose}
          onMouseEnter={addHover}
          onMouseLeave={removeHover}
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="modal-form">
            <span className="font-mono-tag">Consulting Desk</span>
            <h3 className="modal-title font-headline-serif">Initiate Consultation</h3>
            <p className="modal-subtitle">
              Audio Planet coordinates bespoke sound systems. Share your workspace or room plan to start.
            </p>

            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your full name"
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
              <label className="form-label">Type of Enquiry</label>
              <select
                name="enquiryType"
                value={formData.enquiryType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="General Consultation">General Hi-Fi Consultation</option>
                <option value="Acoustic Room Design">Acoustic Design & Planning</option>
                <option value="Home Cinema System">Bespoke Home Cinema</option>
                <option value="System Calibration">Existing System Calibration</option>
                {product && (
                  <option value={formData.enquiryType}>{formData.enquiryType}</option>
                )}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Requirements / Room Dimensions</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="form-textarea"
                placeholder="Describe your space, favorite music genres, or specific products..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary modal-submit"
              onMouseEnter={addHover}
              onMouseLeave={removeHover}
            >
              {isSubmitting ? (
                <span>Scheduling...</span>
              ) : (
                <>
                  <Send size={14} style={{ marginRight: '8px' }} />
                  Submit Request
                </>
              )}
            </button>
            <p className="modal-footer-note">Response response expected within 24 hours.</p>
          </form>
        ) : (
          <div className="success-state">
            <CheckCircle size={48} className="success-icon" />
            <h3 className="success-title font-headline-serif">Enquiry Registered</h3>
            <p className="success-message">
              Thank you. An Audio Planet acoustic consultant will review your room specs and connect via phone or email within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="btn-primary success-btn"
              onMouseEnter={addHover}
              onMouseLeave={removeHover}
            >
              Close Console
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.3s ease;
        }

        .modal-container {
          position: relative;
          background-color: #0b0b0b;
          width: 100%;
          max-width: 580px;
          padding: 2.5rem;
          border-color: var(--border-color);
          box-shadow: 0 20px 50px rgba(0,0,0,0.8);
          animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .modal-close:hover {
          color: var(--accent-gold);
        }

        .modal-title {
          font-size: 2rem;
          margin: 0.5rem 0;
        }

        .modal-subtitle {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .form-double {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .modal-submit {
          width: 100%;
          margin-top: 1rem;
        }

        .modal-footer-note {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-secondary);
          text-align: center;
          margin-top: 1rem;
          letter-spacing: 0.05em;
        }

        /* Success State */
        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem 0;
        }

        .success-icon {
          color: var(--accent-gold);
          margin-bottom: 1.5rem;
        }

        .success-title {
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }

        .success-message {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 420px;
        }

        .success-btn {
          padding-left: 3rem;
          padding-right: 3rem;
        }

        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 600px) {
          .modal-container {
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
