'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TechPillProps {
  tech: string;
  className?: string;
  variant?: 'default' | 'outlined';
}

export function TechPill({ tech, className, variant = 'default' }: TechPillProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
        variant === 'default' 
          ? 'bg-primary/10 text-primary hover:bg-primary/20'
          : 'border border-primary/20 text-primary hover:bg-primary/10',
        className
      )}
    >
      {tech}
    </motion.span>
  );
}