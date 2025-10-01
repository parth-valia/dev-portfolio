'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Mail, Phone, MapPin, Heart, Linkedin } from 'lucide-react';
import { IconXLogo } from '@/components/ui/icons';
import { siteConfig } from '@/site.config';

export function Footer() {
  return (
    <footer className="bg-background border-t border-matrix-green/20 matrix-grid relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-matrix-green/5 via-transparent to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground font-mono">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-matrix-green animate-pulse" />
              <span className='uppercase'>Copyright © 2025 {siteConfig.brandName}</span>
            </div>
          </div>
          <motion.p 
            className="text-sm text-muted-foreground flex items-center space-x-1 mt-2 sm:mt-0 font-mono"
            whileHover={{ scale: 1.02 }}
          >
            <span>Crafted with</span>
            <Heart className="h-4 w-4 text-matrix-green fill-matrix-green animate-pulse" />
            <span>by</span>
            <Link href={siteConfig.github} className='hover:text-matrix-green transition-colors font-mono' target="_blank" rel="noopener noreferrer">{siteConfig.name}</Link>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}