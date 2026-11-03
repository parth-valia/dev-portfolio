'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

const WORD_STAGGER_S = 0.07;
const PEEL = { duration: 0.35, ease: [0.65, 0, 0.35, 1] } as const;
const BARS = { ink: 'bg-[color:var(--z-ink)]', accent: 'bg-[color:var(--z-accent)]' };

const wordsOf = (text: string) => text.split(' ');

/** When the last word of `text` starts to peel, if its first started at `delay`. */
export const peelEnd = (text: string, delay = 0) => delay + wordsOf(text).length * WORD_STAGGER_S;

/** A line covered by flat redaction bars that pull away word by word once `revealed`; the text itself is always in the DOM. */
export function Redacted({ text, bar, revealed, delay = 0 }: { text: string; bar: keyof typeof BARS; revealed: boolean; delay?: number }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <>
      {wordsOf(text).map((word, i) => (
        <span key={`${word}-${i}`}>
          {i > 0 && ' '}
          <span className="relative inline-block">
            {word}
            <motion.span aria-hidden className={cn('absolute inset-x-[-0.06em] inset-y-[0.12em] origin-right', BARS[bar])}
              initial={{ scaleX: 1 }} animate={revealed || reduce ? { scaleX: 0 } : { scaleX: 1 }} transition={reduce ? { duration: 0 } : { ...PEEL, delay: delay + i * WORD_STAGGER_S }} />
          </span>
        </span>
      ))}
    </>
  );
}
