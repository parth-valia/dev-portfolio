'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GitHubCalendar from 'react-github-calendar';
import { Github, Terminal, Activity, Code } from 'lucide-react';
import { TerminalWindow } from '@/components/ui/terminal-window';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ContributionsSection({ username = 'parth-valia' }: { username?: string }) {
  const currentYear = new Date().getFullYear();
  
  return (
    <section className="py-8 sm:py-12 lg:py-20 relative overflow-hidden">      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Activity className="h-6 w-6 text-matrix-green" />
            <span className="text-matrix-green font-mono text-sm uppercase tracking-wider">
              ACTIVITY_LOG.SYS
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-display">
            Code{' '}
            <span className="text-cyber-blue font-mono">Frequency</span>
          </h2>
          
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto font-mono">
            {'>'} Tracking daily commits and contributions across the development ecosystem
          </p>
        </motion.div>

        {/* Terminal-style GitHub Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <TerminalWindow title="github_activity.log">
            <div className="space-y-6">
              {/* Terminal Header */}
              <div className="flex items-center justify-between text-sm font-mono">
                <span className="text-matrix-green">
                  $ git log --oneline --graph --all --since="1 year ago"
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-matrix-green animate-pulse"></div>
                  <span className="text-gray-400">LIVE</span>
                </div>
              </div>

              {/* GitHub Calendar */}
              <div className="relative flex items-center justify-center">
                <GitHubCalendar
                  username={username}
                  colorScheme="dark"
                  theme={{
                    light: ['#0d1117', '#0e4429', '#006d32', '#26a641', '#39d353'],
                    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                  }}
                  style={{
                    color: '#c9d1d9',
                    fontSize: '12px',
                  }}
                />
              </div>

              {/* Stats Display */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-matrix-gray-dark">
                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center space-x-2">
                    <Github className="h-4 w-4 text-matrix-green" />
                    <span className="text-matrix-green font-mono text-sm">COMMITS</span>
                  </div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white font-mono">1000+</div>
                  <div className="text-xs text-gray-400 font-mono">this year</div>
                </div>

                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center space-x-2">
                    <Terminal className="h-4 w-4 text-cyber-blue" />
                    <span className="text-cyber-blue font-mono text-sm">STREAK</span>
                  </div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white font-mono">365+</div>
                  <div className="text-xs text-gray-400 font-mono">days active</div>
                </div>

                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center space-x-2">
                    <Code className="h-4 w-4 text-cyber-purple" />
                    <span className="text-cyber-purple font-mono text-sm">REPOS</span>
                  </div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white font-mono">50+</div>
                  <div className="text-xs text-gray-400 font-mono">projects</div>
                </div>
              </div>

              {/* Terminal Footer */}
              <div className="flex items-center justify-between text-xs font-mono text-gray-500 pt-2 border-t border-matrix-gray-dark">
                <span>Last updated: 2024-09-09</span>
                <span>Status: Active Developer</span>
              </div>
            </div>
          </TerminalWindow>
        </motion.div>

        {/* GitHub Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Button 
            asChild 
            size="lg" 
            className="bg-transparent border-2 border-matrix-green text-matrix-green hover:bg-matrix-green hover:text-black font-mono group shadow-neon-green"
          >
            <Link href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              VIEW_GITHUB_PROFILE
              <motion.div
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {'>>'}
              </motion.div>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}


