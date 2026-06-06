export default function WaveformDivider() {
  const bars = Array.from({ length: 29 });

  return (
    <div className="waveform-divider-container">
      <div className="waveform-line left-line"></div>
      <div className="waveform-bars">
        {bars.map((_, i) => {
          // Staggered animation duration and delay
          const duration = (0.8 + Math.sin(i) * 0.4).toFixed(4);
          const delay = (i * 0.05).toFixed(2);
          return (
            <div 
              key={i} 
              className="waveform-bar" 
              style={{
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`
              }}
            />
          );
        })}
      </div>
      <div className="waveform-line right-line"></div>

      <style jsx>{`
        .waveform-divider-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 4rem 0;
          opacity: 0.3;
          pointer-events: none;
        }

        .waveform-line {
          height: 1px;
          flex-grow: 1;
          background-color: var(--border-color);
        }

        .left-line {
          background: linear-gradient(90deg, transparent, var(--border-color));
        }

        .right-line {
          background: linear-gradient(90deg, var(--border-color), transparent);
        }

        .waveform-bars {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 0 2rem;
          height: 40px;
        }

        .waveform-bar {
          width: 2px;
          height: 20px;
          background-color: var(--accent-gold);
          transform-origin: center;
          animation: pulseWaveform 1.2s ease-in-out infinite alternate;
        }

        @keyframes pulseWaveform {
          0% {
            transform: scaleY(0.2);
            opacity: 0.3;
          }
          100% {
            transform: scaleY(1.3);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}
