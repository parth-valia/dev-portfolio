'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';
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

  const getAnimationVariants = (): Variants => {
    switch (animationType) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { duration, delay }
          },
          exit: { 
            opacity: 0.3,
            transition: { duration: 0.3 }
          }
        };
      
      case 'slide':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration, delay }
          },
          exit: { 
            opacity: 0.4, 
            y: 20,
            transition: { duration: 0.4 }
          }
        };
      
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration, delay }
          },
          exit: { 
            opacity: 0.5, 
            scale: 0.98,
            transition: { duration: 0.3 }
          }
        };
      
      case 'matrix':
      default:
        return {
          hidden: { 
            opacity: 0, 
            y: 30,
            scale: 0.98
          },
          visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: { 
              duration, 
              delay
            }
          },
          exit: { 
            opacity: 0.6, 
            y: 10,
            scale: 0.99,
            transition: { 
              duration: 0.4
            }
          }
        };
    }
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative ${className}`}
      variants={getAnimationVariants()}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate={shouldAnimate ? (isInView ? "visible" : "exit") : "visible"}
    >
      {/* Matrix-style focus indicator */}
      {animationType === 'matrix' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: shouldAnimate ? (isInView ? 0.1 : 0) : 0,
            background: isInView 
              ? 'radial-gradient(circle at center, rgba(34,197,94,0.05) 0%, transparent 70%)'
              : 'transparent'
          }}
          transition={{ duration: 0.6 }}
        />
      )}
      
      {/* Subtle glow effect when in focus */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: shouldAnimate ? (isInView ? 1 : 0) : 0,
          boxShadow: isInView 
            ? 'inset 0 0 100px rgba(34,197,94,0.02)'
            : 'none'
        }}
        transition={{ duration: 0.8 }}
      />
      
      {children}
    </motion.section>
  );
}

// Enhanced version with staggered children animation
interface StaggeredSectionProps extends SectionAnimatorProps {
  staggerChildren?: number;
  childrenDelay?: number;
}

export function StaggeredSection({ 
  children, 
  className = '', 
  id,
  animationType = 'matrix',
  delay = 0,
  duration = 0.8,
  staggerChildren = 0.1,
  childrenDelay = 0.2
}: StaggeredSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    amount: 0.15,
    margin: "-5% 0px -5% 0px"
  });
  const { shouldAnimate } = useFirstVisit();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration,
        delay,
        staggerChildren,
        delayChildren: childrenDelay
      }
    },
    exit: {
      opacity: 0.5,
      transition: {
        duration: 0.4,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6
      }
    },
    exit: { 
      opacity: 0.4, 
      y: 10,
      transition: { 
        duration: 0.3
      }
    }
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative ${className}`}
      variants={containerVariants}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate={shouldAnimate ? (isInView ? "visible" : "exit") : "visible"}
    >
      {/* Matrix focus effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isInView ? 0.08 : 0,
          background: isInView 
            ? 'linear-gradient(45deg, rgba(34,197,94,0.03) 0%, transparent 50%, rgba(6,182,212,0.03) 100%)'
            : 'transparent'
        }}
        transition={{ duration: 1 }}
      />
      
      <motion.div variants={itemVariants}>
        {children}
      </motion.div>
    </motion.section>
  );
}
