'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSectionVisibility } from '@/hooks/use-section-visibility';

interface AnimatedSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  animationType?: 'fade' | 'slide' | 'scale' | 'blur';
  delay?: number;
  duration?: number;
  staggerChildren?: boolean;
}

const animationVariants = {
  fade: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0.3, y: 10 }
  },
  slide: {
    hidden: { opacity: 0, x: -50, y: 20 },
    visible: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0.4, x: -20, y: 10 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0.5, scale: 0.98, y: 5 }
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(10px)', y: 30 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
    exit: { opacity: 0.4, filter: 'blur(3px)', y: 10 }
  }
};

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  id,
  className = '',
  animationType = 'fade',
  delay = 0,
  duration = 0.8,
  staggerChildren = false
}) => {
  const { elementRef, isVisible, hasBeenVisible } = useSectionVisibility({
    threshold: 0.2,
    rootMargin: '-5% 0px -5% 0px'
  });

  const variants = animationVariants[animationType];

  const containerVariants = staggerChildren ? {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay
      }
    },
    exit: {
      opacity: 0.5,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  } : variants;

  const itemVariants = staggerChildren ? variants : {};

  return (
    <motion.section
      ref={elementRef}
      id={id}
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : hasBeenVisible ? "exit" : "hidden"}
      variants={staggerChildren ? containerVariants : variants}
      transition={{
        duration,
        delay: staggerChildren ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "tween"
      }}
    >
      {staggerChildren ? (
        React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            transition={{
              duration: duration * 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        children
      )}
    </motion.section>
  );
};
