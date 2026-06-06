'use client';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQs() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cms')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.faqs) {
          setFaqs(data.faqs);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching FAQs:', err);
        setLoading(false);
      });
  }, []);

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

  return (
    <div className="faqs-page container anim-fade-in">
      <section className="faqs-hero">
        <span className="font-mono-tag">Support Console</span>
        <h1 className="faqs-title font-display-italic">Frequently Asked Questions</h1>
        <p className="faqs-lead">
          Understanding acoustic architecture, component matching, and what to expect during our consultation audits.
        </p>
      </section>

      {loading ? (
        <div className="loading-state font-mono-tag">Accessing Support files...</div>
      ) : (
        <div className="faqs-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`faq-item exhibition-frame ${isOpen ? 'active' : ''}`}
                style={{ marginBottom: '1.5rem', padding: '1.5rem' }}
              >
                <button 
                  className="faq-header"
                  onClick={() => toggleAccordion(index)}
                  onMouseEnter={addHover}
                  onMouseLeave={removeHover}
                >
                  <div className="faq-question-block">
                    <HelpCircle size={16} className="faq-icon" />
                    <h3 className="font-headline-serif faq-question">{faq.question}</h3>
                  </div>
                  <div className="faq-toggle-icon">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-answer-block anim-fade-in">
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <style jsx>{`
        .faqs-page {
          padding-top: 140px;
          padding-bottom: 6rem;
          max-width: 900px;
        }

        .faqs-hero {
          margin-bottom: 4rem;
        }

        .faqs-title {
          font-size: 4rem;
          margin: 1rem 0;
          line-height: 1.1;
        }

        .faqs-lead {
          font-size: 1.3rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* FAQ List */
        .faqs-list {
          display: flex;
          flex-direction: column;
        }

        .faq-item {
          background-color: var(--bg-surface);
        }

        .faq-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
        }

        .faq-question-block {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .faq-icon {
          color: var(--accent-gold);
          flex-shrink: 0;
        }

        .faq-question {
          font-size: 1.3rem;
          transition: var(--transition-fast);
          color: var(--text-primary);
        }

        .faq-header:hover .faq-question {
          color: var(--accent-gold);
        }

        .faq-toggle-icon {
          color: var(--text-secondary);
        }

        .faq-answer-block {
          border-top: 1px dashed var(--border-color);
          margin-top: 1rem;
          padding-top: 1.25rem;
        }

        .faq-answer {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .loading-state {
          text-align: center;
          padding: 5rem 0;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .faqs-title {
            font-size: 3rem;
          }
          .faq-question {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}
