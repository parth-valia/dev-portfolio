'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function TerminalWindow({ children, title = 'terminal', className = '' }: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`bg-matrix-black border border-matrix-green-dark rounded-lg overflow-hidden shadow-terminal ${className}`}
    >
      {/* Terminal Header */}
      <div className="bg-matrix-gray-dark border-b border-matrix-green-dark px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center sm:text-wrap">
            <span className="flex text-wrap text-matrix-green text-sm font-mono ml-4 mr-2">{title}</span>
          </div>
        </div>
        <div className="text-matrix-green-dark text-xs font-mono">
          user@portfolio:~$
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-4 font-mono text-matrix-green bg-matrix-black">
        {children}
      </div>
    </motion.div>
  );
}
