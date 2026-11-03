'use client';

import { useRef } from 'react';
import { motion, useInView as useFramerInView, useReducedMotion } from 'framer-motion';

/**
 * Motion primitives shared across the site.
 * All respect prefers-reduced-motion and animate once when scrolled into view.
 */

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useFramerInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={reduce ? { duration: 0 } : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
