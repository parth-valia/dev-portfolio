'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useFirstVisit } from '@/components/ui/first-visit-provider';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50,
  duration = 0.6,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    amount: threshold,
    margin: '-100px 0px -100px 0px'
  });
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);
  const { shouldAnimate } = useFirstVisit();

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  const getExitPosition = () => {
    switch (direction) {
      case 'up':
        return { y: -distance, opacity: 0 };
      case 'down':
        return { y: distance, opacity: 0 };
      case 'left':
        return { x: -distance, opacity: 0 };
      case 'right':
        return { x: distance, opacity: 0 };
      default:
        return { y: -distance, opacity: 0 };
    }
  };

  useEffect(() => {
    if (!shouldAnimate) {
      // Immediately set visible once and bail out of further updates
      controls.set({ ...getAnimatePosition() });
      return;
    }

    if (isInView) {
      controls.start({
        ...getAnimatePosition(),
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        },
      });
      setHasAnimated(true);
    } else if (hasAnimated) {
      // Only animate out if it has been animated in before
      controls.start({
        ...getExitPosition(),
        transition: {
          duration: duration * 0.8,
          ease: [0.25, 0.1, 0.25, 1],
        },
      });
    }
  }, [isInView, controls, delay, duration, hasAnimated, direction, distance, shouldAnimate]);

  return (
    <motion.div
      ref={ref}
      initial={shouldAnimate ? getInitialPosition() : getAnimatePosition()}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}