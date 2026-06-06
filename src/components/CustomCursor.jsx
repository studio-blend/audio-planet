'use client';
import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // Check if device is touch-based or screen is too small
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    setHidden(false);

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Immediate dot placement
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }

      // Smooth trailing ring placement using standard CSS transit/transform
      if (ringRef.current) {
        ringRef.current.animate(
          {
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
          },
          { duration: 150, fill: 'forwards' }
        );
      }
    };

    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <div ref={ringRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}
