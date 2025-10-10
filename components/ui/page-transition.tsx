'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useMemo, useEffect, useState } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  // Normalize pathname for consistent key (remove hash)
  const routeKey = useMemo(() => {
    return pathname.split('#')[0];
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // On first render (SSR + hydration), render without animation
  // to ensure tree structure matches between server and client
  if (!mounted) {
    return <div>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
