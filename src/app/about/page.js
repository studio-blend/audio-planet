'use client';
import Link from 'next/link';

export default function About() {
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
    <div className="about-page container anim-fade-in">
      <section className="about-hero">
        <span className="font-mono-tag">Established 1999</span>
        <h1 className="about-headline font-display-italic">Our Story & Philosophy</h1>
        <p className="about-lead">
          Audio Planet was founded on a simple truth: high-performance audio hardware is only as good as the room it breathes in. We are acoustic architects and curators of sound.
        </p>
      </section>

      <section className="about-content grid-two">
        <div className="about-text">
          <h2 className="font-headline-serif sub-heading">A Quarter Century of Sound Curation</h2>
          <p className="about-p">
            Based in Bangalore, India's tech capital, Audio Planet has spent over 25 years advising audiophiles, architects, and estate owners on how to design rooms for acoustic perfection. We don't believe in off-the-shelf bundles or mass market retail. 
          </p>
          <p className="about-p">
            Every system we install is treated like a bespoke timepiece. We begin with the room's blueprints, calculating reflection times, identifying bass build-ups, and studying the listener's preferences. Only then do we suggest matching components.
          </p>
          <blockquote className="editorial-quote font-display-italic">
            "A room is an instrument. Left uncalibrated, it distorts. Properly tuned, it disappears."
          </blockquote>
        </div>
        <div className="about-image-panel exhibition-frame">
          <div className="inner-img" style={{ backgroundImage: `url('/images/hero_listening_room.jpg')` }} />
        </div>
      </section>

      <section className="experience-centre">
        <h2 className="font-headline-serif section-title">The Bangalore Experience Centre</h2>
        <p className="about-p center-text-max">
          Our specialized Indiranagar listening studio is a dedicated laboratory for acousticians and audiophiles. It houses three reference rooms designed with varying acoustic signatures:
        </p>

        <div className="rooms-grid">
          <div className="room-card exhibition-frame">
            <h3 className="font-headline-serif">Room Alpha: Analogue Warmth</h3>
            <p className="room-desc">
              Optimized for high-fidelity stereo playback. Soft wall treatments and diffusion panels that complement the organic response of vinyl turntables and tube preamplifiers.
            </p>
          </div>
          <div className="room-card exhibition-frame">
            <h3 className="font-headline-serif">Room Beta: Immersive Cinema</h3>
            <p className="room-desc">
              An isolated Dolby Atmos 11.2.4 room. Featuring hidden acoustic absorbing fabric, zero-reflection ceilings, and sub-bass traps calculated to absorb low frequencies.
            </p>
          </div>
          <div className="room-card exhibition-frame">
            <h3 className="font-headline-serif">Room Gamma: Reference Studio</h3>
            <p className="room-desc">
              A mathematically neutral environment with an anechoic coefficient close to zero. Used for comparing component responses under absolute reference conditions.
            </p>
          </div>
        </div>
      </section>

      <section className="about-team">
        <h2 className="font-headline-serif section-title text-center">Consultancy Board</h2>
        <div className="team-grid">
          <div className="team-member exhibition-frame">
            <h3 className="member-name font-headline-serif">Palani Kumar</h3>
            <span className="member-title font-mono-tag">Founder & Lead Acoustician</span>
            <p className="member-bio">
              With over 25 years dedicated to acoustic engineering, Mr. Palani has personally overseen the acoustic layout of hundreds of private cinema rooms and institutional auditoriums. Known for his hands-on approach and dedication, he works directly with clients from blueprint analysis to final calibration.
            </p>
          </div>
          <div className="team-member exhibition-frame">
            <h3 className="member-name font-headline-serif">Muralidharan S.</h3>
            <span className="member-title font-mono-tag">Principal Audio Consultant</span>
            <p className="member-bio">
              An expert in matching solid-state and valve amplifiers with loudspeaker impedance loads. Muralidharan assists clients in tailoring component chains to their listening tastes.
            </p>
          </div>
        </div>
      </section>

      <section className="about-cta-footer">
        <h3 className="font-headline-serif">Audition the Experience Centre</h3>
        <p>Private sessions are arranged exclusively by appointment. Schedule a session with our board.</p>
        <button 
          onClick={() => openGlobalModal('Showroom Visit')}
          className="btn-primary"
          onMouseEnter={addHover}
          onMouseLeave={removeHover}
        >
          Book Showroom Appointment
        </button>
      </section>

      <style jsx>{`
        .about-page {
          padding-top: 140px;
          padding-bottom: 6rem;
        }

        .about-hero {
          max-width: 800px;
          margin-bottom: 5rem;
        }

        .about-headline {
          font-size: 4rem;
          margin: 1rem 0;
          line-height: 1.1;
        }

        .about-lead {
          font-size: 1.3rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .grid-two {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          margin-bottom: 6rem;
          align-items: center;
        }

        .about-p {
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .center-text-max {
          max-width: 700px;
          margin-bottom: 3rem;
        }

        .sub-heading {
          font-size: 2.2rem;
          margin-bottom: 1.5rem;
        }

        .editorial-quote {
          font-family: var(--font-display);
          font-size: 1.8rem;
          color: var(--accent-gold);
          border-left: 2px solid var(--accent-gold);
          padding-left: 1.5rem;
          margin: 2.5rem 0;
          line-height: 1.4;
        }

        .about-image-panel {
          height: 480px;
          padding: 1.5rem;
        }

        .inner-img {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          filter: grayscale(100%);
        }

        /* Experience Centre */
        .experience-centre {
          margin-bottom: 6rem;
        }

        .section-title {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .room-card {
          padding: 2.5rem;
        }

        .room-card h3 {
          font-size: 1.4rem;
          margin-bottom: 1rem;
        }

        .room-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        /* Team Section */
        .about-team {
          margin-bottom: 6rem;
        }

        .team-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        .team-member {
          padding: 3rem;
        }

        .member-name {
          font-size: 1.8rem;
          margin-bottom: 0.25rem;
        }

        .member-title {
          margin-bottom: 1.5rem;
          display: block;
        }

        .member-bio {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        /* CTA footer */
        .about-cta-footer {
          text-align: center;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 4rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .about-cta-footer h3 {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }

        .about-cta-footer p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        @media (max-width: 1024px) {
          .grid-two {
            grid-template-columns: 1fr;
          }
          .about-image-panel {
            height: 350px;
          }
          .rooms-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .about-headline {
            font-size: 3rem;
          }
          .sub-heading {
            font-size: 1.8rem;
          }
          .editorial-quote {
            font-size: 1.4rem;
          }
          .team-grid {
            grid-template-columns: 1fr;
          }
          .team-member {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
