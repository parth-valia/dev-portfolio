'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function SmoothScroll() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!mounted) return;

    const handleClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.offsetTop;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [mounted]);
  
  useEffect(() => {
    if (!mounted) return;
    
    const hash = window.location.hash;
    if (hash && pathname === '/') {
      const id = hash.slice(1);
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.offsetTop;
          const offsetPosition = elementPosition - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, mounted]);

  return null;
}
