import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to detect when an element enters the viewport
 * @param {Object} options IntersectionObserver options
 */
export function useIntersectionObserver({
  threshold = 0.15,
  root = null,
  rootMargin = '0px 0px -50px 0px',
  freezeOnceVisible = true
} = {}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (freezeOnceVisible) {
          observer.unobserve(node);
        }
      } else if (!freezeOnceVisible) {
        setIsVisible(false);
      }
    }, { threshold, root, rootMargin });

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [threshold, root, rootMargin, freezeOnceVisible]);

  return [elementRef, isVisible];
}
