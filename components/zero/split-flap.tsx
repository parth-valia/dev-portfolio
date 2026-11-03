'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const TICK_MS = 45;
/** Every tile shuffles this many times, plus one more per position, so the line lands left to right. */
const SHUFFLES = 3;
const FLIP = { duration: 0.09 };
const INSTANT = { duration: 0 };
const BLANK = ' ';

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

/** Shuffles each tile through random letters until the board reads `text`. */
function useFlap(text: string, width: number, reduce: boolean) {
  const target = text.padEnd(width);
  const [shown, setShown] = useState(target);
  useEffect(() => {
    if (reduce) {
      setShown(target);
      return;
    }
    let tick = 0;
    const timer = window.setInterval(() => {
      tick += 1;
      setShown(Array.from(target, (ch, i) => (ch === ' ' || tick > SHUFFLES + i ? ch : randomGlyph())).join(''));
      if (tick > SHUFFLES + width) window.clearInterval(timer);
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [target, width, reduce]);
  return shown;
}

/** A departure-board line with one tile per letter of the longest word, flipping to `words[index]`. Sized in em, so the parent's font size scales it. */
export function SplitFlap({ words, index, className = '' }: { words: string[]; index: number; className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const text = words[index];
  const shown = useFlap(text, Math.max(...words.map((word) => word.length)), reduce);
  return (
    <span className={cn('inline-flex gap-[0.15em] font-[family-name:var(--font-zero-mono)] uppercase leading-none', className)}>
      <span className="sr-only">{text}</span>
      {Array.from(shown, (ch, i) => (
        <span key={i} aria-hidden className="relative grid w-[1.3em] place-items-center overflow-hidden rounded-[0.2em] tracking-normal bg-[color:var(--z-fill)] py-[0.32em] [perspective:200px]">
          <motion.span key={ch} className="block" initial={{ rotateX: -90 }} animate={{ rotateX: 0 }} transition={reduce ? INSTANT : FLIP}>{ch === ' ' ? BLANK : ch}</motion.span>
          <span className="absolute inset-x-0 top-1/2 h-px bg-[rgb(var(--z-bg-rgb)/0.6)]" />
        </span>
      ))}
    </span>
  );
}
