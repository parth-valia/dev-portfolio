'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect, ReactNode } from 'react';

interface MatrixTextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  glowEffect?: boolean;
}

export function MatrixTextReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  staggerDelay = 0.05,
  glowEffect = true
}: MatrixTextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Convert text to individual characters for staggered animation
  const text = typeof children === 'string' ? children : '';
  const characters = text.split('');

  if (typeof children !== 'string') {
    // If children is not a string, render as normal animated element
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {
            opacity: 0,
            y: 20,
            filter: 'blur(5px)',
            textShadow: glowEffect ? '0 0 0px #00ff41' : 'none'
          },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            textShadow: glowEffect ? '0 0 20px rgba(0, 255, 65, 0.4)' : 'none',
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay
          }
        }
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
              filter: 'blur(3px)',
              textShadow: glowEffect ? '0 0 0px #00ff41' : 'none',
              color: '#666'
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              textShadow: glowEffect ? '0 0 15px rgba(0, 255, 65, 0.3)' : 'none',
              color: '#ffffff',
              transition: {
                duration: duration * 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            }
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Matrix-themed heading component
export function MatrixHeading({
  children,
  className = '',
  level = 2,
  delay = 0,
  glowEffect = true
}: {
  children: ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  delay?: number;
  glowEffect?: boolean;
}) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <HeadingTag className={className}>
      <MatrixTextReveal delay={delay} glowEffect={glowEffect}>
        {children}
      </MatrixTextReveal>
    </HeadingTag>
  );
}

// Terminal-style typing animation
export function TerminalText({
  text,
  className = '',
  delay = 0,
  speed = 50
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={`font-mono ${className} items-center justify-center`}
      initial="hidden"
      animate={controls}

      variants={{
        hidden: {
          opacity: 0
        },
        visible: {
          opacity: 1,
          transition: {
            delay,
            duration: 0.3
          }
        }
      }}
    >
      <motion.span
        variants={{
          hidden: { width: 0 },
          visible: {
            width: 'auto',
            transition: {
              duration: text.length * (speed / 1000),
              ease: 'linear',
              delay: delay + 0.3
            }
          }
        }}
        style={{ 
          display: 'inline-block',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </motion.span>
      <motion.span
        animate={{
          opacity: [1, 0, 1]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="text-matrix-green ml-1"
      >
        _
      </motion.span>
    </motion.div>
  );
}