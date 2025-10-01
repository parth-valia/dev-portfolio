'use client';

import React, { useRef } from 'react';

type MagneticProps = {
  children: React.ReactNode;
  strength?: number; // pixels to move toward cursor
  className?: string;
};

export function Magnetic({ children, strength = 12, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const nx = (x / (rect.width / 2)) * strength;
    const ny = (y / (rect.height / 2)) * strength;
    el.style.transform = `translate3d(${nx}px, ${ny}px, 0)`;
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
  };

  return (
    <div
      className={`inline-block will-change-transform transition-transform [transition-duration:180ms] ${className ?? ''}`}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onMouseEnter={handleMove}
    >
      {children}
    </div>
  );
}


