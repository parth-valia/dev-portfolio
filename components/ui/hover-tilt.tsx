'use client';

import React, { useRef } from 'react';

type HoverTiltProps = {
  children: React.ReactNode;
  maxTiltDeg?: number;
  scale?: number;
  className?: string;
};

export function HoverTilt({ children, maxTiltDeg = 6, scale = 1.01, className }: HoverTiltProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateY = ((x - midX) / midX) * maxTiltDeg; // left/right
    const rotateX = -((y - midY) / midY) * maxTiltDeg; // up/down
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onMouseEnter={handleMove}
      className={`${className ?? ''} transition-transform [transition-duration:180ms] [transform-style:preserve-3d]`}
    >
      {children}
    </div>
  );
}


