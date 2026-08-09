import { useState, useRef, useCallback } from 'react';
import beforeImg from '../assets/images/before.png';
import afterImg from '../assets/images/after.png';

export default function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    isDragging.current = true;
    updatePosition(e.clientX);

    const handleMouseMove = (e) => {
      if (isDragging.current) updatePosition(e.clientX);
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [updatePosition]);

  const handleTouchStart = useCallback((e) => {
    isDragging.current = true;
    updatePosition(e.touches[0].clientX);

    const handleTouchMove = (e) => {
      if (isDragging.current) updatePosition(e.touches[0].clientX);
    };
    const handleTouchEnd = () => {
      isDragging.current = false;
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
  }, [updatePosition]);

  return (
    <div
      className="before-after"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role="slider"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Before and after comparison slider"
      id="before-after-slider"
    >
      <div className="before-after__before">
        <img src={beforeImg} alt="Before redesign" />
        <span className="before-after__label before-after__label--before">Before</span>
      </div>

      <div
        className="before-after__after"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={afterImg} alt="After redesign" />
        <span className="before-after__label before-after__label--after">After</span>
      </div>

      <div className="before-after__slider" style={{ left: `${position}%` }}>
        <div className="before-after__handle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 6l-4 6 4 6" />
            <path d="M16 6l4 6-4 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
