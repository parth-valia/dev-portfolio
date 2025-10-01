'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MetricProps {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

export function Metric({ label, value, change, changeType = 'neutral', className }: MetricProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn('text-center space-y-2', className)}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 100 }}
        className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        {value}
      </motion.div>
      <div className="text-sm text-muted-foreground">{label}</div>
      {change && (
        <div className={cn(
          'text-xs font-medium',
          changeType === 'positive' && 'text-green-600',
          changeType === 'negative' && 'text-red-600',
          changeType === 'neutral' && 'text-muted-foreground'
        )}>
          {change}
        </div>
      )}
    </motion.div>
  );
}