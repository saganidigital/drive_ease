import { useState, useEffect } from 'react';

/**
 * Hook to smoothly count numbers up from 0 to target when trigger is true
 */
export function useCountUp(targetNumber, shouldStart, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTimestamp = null;
    const startValue = 0;
    const finalValue = Number(targetNumber);

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(startValue + (finalValue - startValue) * easeProgress));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(finalValue);
      }
    };

    const animationId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationId);
  }, [targetNumber, shouldStart, duration]);

  return count;
}
