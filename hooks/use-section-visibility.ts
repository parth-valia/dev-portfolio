import { useEffect, useState, useRef } from 'react';

interface UseSectionVisibilityOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useSectionVisibility = (options: UseSectionVisibilityOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const { threshold = 0.3, rootMargin = '-10% 0px -10% 0px' } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);
        
        if (isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, hasBeenVisible]);

  return { elementRef, isVisible, hasBeenVisible };
};
