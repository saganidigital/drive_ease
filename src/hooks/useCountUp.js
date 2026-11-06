import { useState, useEffect } from 'react';

/**
 * Hook to smoothly count numbers up from 0 to target when trigger is true
 */
export function useCountUp(targetNumber, shouldStart, duration = 2000, decimals = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    const finalValue = Number(targetNumber);
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(finalValue.toFixed(decimals));
      return;
    }

    let startTimestamp = null;
    const startValue = 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (finalValue - startValue) * easeProgress;
      setCount(decimals > 0 ? current.toFixed(decimals) : Math.floor(current));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(decimals > 0 ? finalValue.toFixed(decimals) : finalValue);
      }
    };

    const animationId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationId);
  }, [targetNumber, shouldStart, duration, decimals]);

  return count;
}
