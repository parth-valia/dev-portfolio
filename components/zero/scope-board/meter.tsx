'use client';

import { useEffect } from 'react';
import { motion, useAnimationControls, useReducedMotion, useSpring } from 'framer-motion';
import { SCOPE } from '@/content/zero';
import { cn } from '@/lib/utils';
import { SplitFlap } from '../split-flap';
import { TYPE } from '../primitives';
import { roundWeeks, type Verdict } from './pile';

const FLAPS = SCOPE.verdicts.map((verdict) => verdict.flap);
const FILL_SPRING = { stiffness: 170, damping: 14 };
/** The meter shudders when v1 crosses into heavy or too big. */
const SHUDDER = { x: [0, -7, 6, -4, 2, 0], transition: { duration: 0.45 } };
const WARNINGS = ['heavy', 'overload'];

/** The bar fills on a spring, so it overshoots a little each time a note lands in v1. */
function useFill(weeks: number) {
  const reduce = useReducedMotion() ?? false;
  const fill = useSpring(0, FILL_SPRING);
  useEffect(() => {
    const target = Math.min(weeks / SCOPE.maxWeeks, 1);
    if (reduce) fill.jump(target);
    else fill.set(target);
  }, [weeks, reduce, fill]);
  return fill;
}

/** Rough weeks to launch, the verdict on the split-flap board and a bar that springs as v1 grows. */
export function Meter({ weeks, verdict }: { weeks: number; verdict: Verdict }) {
  const reduce = useReducedMotion() ?? false;
  const fill = useFill(weeks);
  const shake = useAnimationControls();
  useEffect(() => {
    if (!reduce && WARNINGS.includes(verdict.id)) shake.start(SHUDDER);
  }, [verdict.id, reduce, shake]);
  return (
    <motion.div animate={shake}>
      <p className={cn('text-[color:var(--z-soft)]', TYPE.small)}>{SCOPE.meter}</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <p className={cn(TYPE.head, 'tabular-nums')}>{roundWeeks(weeks)}<span className={cn('ml-2 tracking-normal', TYPE.lead)}>{SCOPE.unit}</span></p>
        <SplitFlap words={FLAPS} index={SCOPE.verdicts.indexOf(verdict)} className="mb-1 text-[clamp(14px,1.3vw,18px)]" />
      </div>
      <div className="mt-4 h-3 bg-[color:var(--z-field-strong)]">
        <motion.div style={{ scaleX: fill }} className="h-full origin-left bg-[color:var(--z-accent-ink)]" />
      </div>
    </motion.div>
  );
}
