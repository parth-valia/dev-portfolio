'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode, useState, useEffect } from 'react';
import { useFirstVisit } from '@/components/ui/first-visit-provider';

interface SectionAnimatorProps {
  children: ReactNode;
  className?: string;
  id?: string;
  animationType?: 'fade' | 'slide' | 'scale' | 'matrix';
  delay?: number;
  duration?: number;
}

export function SectionAnimator({ 
  children, 
  className = '', 
  id,
  animationType = 'matrix',
  delay = 0,
  duration = 0.8
}: SectionAnimatorProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    amount: 0.2,
    margin: "-10% 0px -10% 0px"
  });
  const { shouldAnimate } = useFirstVisit();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getAnimationVariants = (): Variants => {
    switch (animationType) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration, delay } },
          exit: { opacity: 0.3, transition: { duration: 0.3 } }
        };
      case 'slide':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration, delay } },
          exit: { opacity: 0.4, y: 20, transition: { duration: 0.4 } }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration, delay } },
          exit: { opacity: 0.5, scale: 0.98, transition: { duration: 0.3 } }
        };
      case 'matrix':
      default:
        return {
          hidden: { opacity: 0, y: 30, scale: 0.98 },
          visible: { opacity: 1, y: 0, scale: 1, transition: { duration, delay } },
          exit: { opacity: 0.6, y: 10, scale: 0.99, transition: { duration: 0.4 } }
        };
    }
  };

  // Render with consistent state during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <section ref={ref} id={id} className={`relative ${className}`}>
        {animationType === 'matrix' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundColor: 'transparent' }} />
          </div>
        )}
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative ${className}`}
      variants={getAnimationVariants()}
      initial="visible"
      animate={shouldAnimate ? (isInView ? "visible" : "exit") : "visible"}
    >
      {animationType === 'matrix' && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Cross-fade: base transparent layer */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: isInView ? 0 : 1 }}
            transition={{ duration: 0.6 }}
            style={{ backgroundColor: 'transparent' }}
          />
          {/* Cross-fade: gradient overlay */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundImage:
                'radial-gradient(circle at center, rgba(34,197,94,0.05) 0%, rgba(255,255,255,0.01) 70%)'
            }}
          />
        </div>
      )}

      {/* Subtle glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: shouldAnimate ? (isInView ? 1 : 0) : 0,
        }}
        transition={{ duration: 0.8 }}
        style={{
          boxShadow: isInView 
            ? 'inset 0 0 100px rgba(34,197,94,0.02)'
            : 'none'
        }}
      />

      {children}
    </motion.section>
  );
}
