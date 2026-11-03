'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Pen sketches of the fix for each situation, in SITUATION_NOTES order; drawn on a 120 by 80 box. */
const SKETCHES = [
  ['M20 23a12 12 0 1 1 0 24a12 12 0 1 1 0-24M15 51h10M16 56h8', 'M38 35h32M62 28l8 7l-8 7', 'M84 12h18a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4H84a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4M89 54h8'],
  ['M6 62l36-18', 'M44 28h18v16H44z', 'M64 34l50-24', 'M50 48l-4 10M58 48l4 10'],
  ['M10 10v60h104', 'M12 60c12-8 20-16 28-14s10 10 16 8s14-22 22-26s22-12 34-16', 'M100 10l12 2l-4 10'],
  ['M8 16h44v48H8z', 'M58 40h10M63 35l5 5l-5 5', 'M74 16h40v48H74z', 'M84 41l7 7l14-16'],
];
/** Strokes drawn dashed: the broken build and the prototype; they fade in, since a dash pattern can't also draw on. */
const DASHED = new Set(['M8 16h44v48H8z', 'M6 62l36-18']);
const DASH = '5 5';
const DRAW = { duration: 0.7, ease: 'easeInOut' } as const;
const STROKE_STAGGER = 0.22;

/** The fix for situation `index`, drawing itself stroke by stroke whenever the note changes. */
export function NoteSketch({ index, className = '' }: { index: number; className?: string }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <svg viewBox="0 0 120 80" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      {SKETCHES[index].map((d, i) => (
        <motion.path key={`${index}-${d}`} d={d} {...(DASHED.has(d) ? { strokeDasharray: DASH, initial: { opacity: 0 }, animate: { opacity: 1 } } : { initial: { pathLength: 0 }, animate: { pathLength: 1 } })}
          transition={reduce ? { duration: 0 } : { ...DRAW, delay: 0.2 + i * STROKE_STAGGER }} />
      ))}
    </svg>
  );
}
