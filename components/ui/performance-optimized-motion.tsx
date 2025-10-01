'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface OptimizedMotionProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

// Performance-optimized motion component with reduced-motion support
export function OptimizedMotion({ children, className, ...props }: OptimizedMotionProps) {
  return (
    <motion.div
      className={className}
      {...props}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
        ...props.transition,
      }}
      // Respect user's motion preferences
      style={{
        ...props.style,
      }}
    >
      {children}
    </motion.div>
  );
}

// Fade in animation with optimized settings
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
};

// Stagger children animation
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Scale animation for interactive elements
export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 },
};
