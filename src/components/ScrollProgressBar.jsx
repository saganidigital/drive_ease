import React from 'react';
import { useScroll } from '../hooks/useScroll';

export default function ScrollProgressBar() {
  const { scrollProgress } = useScroll();

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] bg-transparent pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div 
        className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-200 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(245,158,11,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
