'use client';

import { motion, useInView, useAnimation, Variants, UseInViewOptions } from 'framer-motion';
import { useRef, useEffect, ReactNode, useState } from 'react';
import { useFirstVisit } from '@/components/ui/first-visit-provider';

interface EnhancedAnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  animationType?: 'fade' | 'slide' | 'scale' | 'blur' | 'matrix' | 'glitch' | 'reveal' | 'stagger';
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  delay?: number;
  distance?: number;
  staggerChildren?: number;
  viewport?: UseInViewOptions;
}

// Matrix-themed animation variants
const matrixVariants: Record<string, Variants> = {
  fade: {
    hidden: { 
      opacity: 0,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      filter: 'blur(5px)',
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  },
  slide: {
    hidden: (direction: string) => ({
      opacity: 0,
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      filter: 'blur(5px)'
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: (direction: string) => ({
      opacity: 0,
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? -50 : direction === 'down' ? 50 : 0,
      filter: 'blur(3px)',
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    })
  },
  scale: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      filter: 'blur(8px)'
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(4px)',
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  },
  blur: {
    hidden: {
      opacity: 0,
      filter: 'blur(20px)',
      scale: 1.05
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      filter: 'blur(10px)',
      scale: 0.98,
      transition: {
        duration: 0.6,
        ease: 'easeInOut'
      }
    }
  },
  matrix: {
    hidden: {
      opacity: 0,
      y: 50,
      filter: 'blur(5px) brightness(0.5)',
      textShadow: '0 0 0px #00ff41'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px) brightness(1)',
      textShadow: '0 0 10px rgba(0, 255, 65, 0.3)',
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      filter: 'blur(3px) brightness(0.7)',
      textShadow: '0 0 5px rgba(0, 255, 65, 0.1)',
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    }
  },
  glitch: {
    hidden: {
      opacity: 0,
      x: -10,
      filter: 'blur(5px) hue-rotate(0deg)'
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px) hue-rotate(0deg)',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      x: 5,
      filter: 'blur(2px) hue-rotate(90deg)',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  },
  reveal: {
    hidden: {
      opacity: 0,
      clipPath: 'inset(0 100% 0 0)'
    },
    visible: {
      opacity: 1,
      clipPath: 'inset(0 0% 0 0)',
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      clipPath: 'inset(0 0 0 100%)',
      transition: {
        duration: 0.8,
        ease: 'easeInOut'
      }
    }
  },
  stagger: {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  }
};

export function EnhancedAnimatedSection({
  children,
  className = '',
  id,
  animationType = 'fade',
  direction = 'up',
  duration = 0.8,
  delay = 0,
  distance = 50,
  staggerChildren = 0.1,
  viewport = { once: true, margin: '-100px 0px -100px 0px', amount: 0.2 }
}: EnhancedAnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewport);
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const { shouldAnimate } = useFirstVisit();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!shouldAnimate) {
      // Immediately set visible and do not update further
      controls.set('visible');
      return;
    }

    if (isInView) {
      controls.start('visible');
      if (viewport?.once) {
        setHasPlayed(true);
      }
    } else {
      // If set to animate once and already played, don't animate out/replay
      if (viewport?.once && hasPlayed) return;

      // Only animate out on desktop, not on mobile to prevent gaps
      // Exception: always animate header section
      if (!isMobile || id === 'home') {
        controls.start('exit');
      }
    }
  }, [isInView, controls, isMobile, id, shouldAnimate, viewport, hasPlayed]);

  const variants = matrixVariants[animationType];

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      custom={direction}
      initial={shouldAnimate ? 'hidden' : 'visible'}
      animate={controls}
      variants={variants}
      style={{
        willChange: 'transform, opacity, filter'
      }}
    >
      {animationType === 'stagger' ? (
        <motion.div
          variants={{
            visible: {
              transition: {
                staggerChildren,
                delayChildren: delay
              }
            }
          }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.section>
  );
}

// Staggered item component for use within stagger sections
export function StaggerItem({ 
  children, 
  className = '',
  delay = 0 
}: { 
  children: ReactNode; 
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { 
          opacity: 0, 
          y: 30,
          filter: 'blur(3px)'
        },
        visible: { 
          opacity: 1, 
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.6,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        },
        exit: {
          opacity: 0,
          y: -20,
          filter: 'blur(2px)',
          transition: {
            duration: 0.3,
            ease: 'easeInOut'
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}
