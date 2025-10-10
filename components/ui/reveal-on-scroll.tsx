'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function RevealOnScroll({ children, className, delay = 0 }: RevealOnScrollProps) {
  const [mounted, setMounted] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render without motion during SSR to avoid hydration mismatch
  if (!mounted) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1, y: 0 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeOut',
      }}
      className={`will-change-transform ${className ?? ''}`}
    >
      {children}
    </motion.div>
  );
}