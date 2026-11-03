'use client';

import { useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { FEATURES, SCOPE, type FeatureId } from '@/content/zero';
import { siteConfig } from '@/site.config';
import { cn, fill } from '@/lib/utils';
import { Button, EASE, FOCUS, HAND, TYPE } from '../primitives';
import { idsIn, rangeFor, type Move } from './pile';

const PEEL_IN = { initial: { opacity: 0, y: 40, rotate: 3 }, animate: { opacity: 1, y: 0, rotate: -1 }, transition: { duration: 0.5, ease: EASE } };

/** One column of the plan: a printed heading over the handwritten notes. */
function PlanColumn({ title, ids, foot, struck = false }: { title: string; ids: FeatureId[]; foot?: string; struck?: boolean }) {
  return (
    <div>
      <h4 className={cn('text-[color:var(--z-soft)]', TYPE.small)}>{title}</h4>
      <ul className={cn(HAND, 'mt-2 grid gap-0.5 text-[clamp(22px,2vw,28px)] leading-[1.1]')}>
        {ids.map((id) => <li key={id} className={cn(struck && 'line-through decoration-2')}>{FEATURES[id].label}</li>)}
        {ids.length === 0 && <li className="text-[color:var(--z-soft)]">{SCOPE.plan.none}</li>}
      </ul>
      {foot && ids.length > 0 && <p className={cn('mt-2 text-[color:var(--z-soft)]', TYPE.small)}>{foot}</p>}
    </div>
  );
}

/** The sorted pile as a launch plan for the visitor's idea, ending in the call that scopes it for real. */
export function LaunchPlan({ name, moves, weeks, line, onReplay }: { name: string; moves: Move[]; weeks: number; line: string; onReplay: () => void }) {
  const reduce = useReducedMotion() ?? false;
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => heading.current?.focus({ preventScroll: true }), []);
  return (
    <motion.div {...(reduce ? {} : PEEL_IN)} className="zero-paper p-6 md:p-10">
      <h3 ref={heading} tabIndex={-1} className={cn(HAND, 'text-[clamp(36px,4vw,60px)] leading-[0.95] outline-none [text-wrap:balance]')}>{fill(SCOPE.plan.title, { name })}</h3>
      <p className={cn('mt-4 max-w-[40ch]', TYPE.body)}>{line}</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <PlanColumn title={weeks ? fill(SCOPE.plan.v1, { range: rangeFor(weeks) }) : SCOPE.plan.v1Empty} ids={idsIn(moves, 'v1')} foot={SCOPE.plan.base} />
        <PlanColumn title={SCOPE.plan.later} ids={idsIn(moves, 'later')} />
        <PlanColumn title={SCOPE.plan.cut} ids={idsIn(moves, 'cut')} struck />
      </div>
      <p className={cn('mt-8 max-w-[52ch] text-[color:var(--z-soft)]', TYPE.small)}>{SCOPE.plan.note}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button href={siteConfig.calendarUrl} tone="ink" external>{SCOPE.plan.cta}</Button>
        <button type="button" onClick={onReplay} className={cn('inline-flex min-h-[44px] items-center gap-2 underline underline-offset-4', TYPE.small, FOCUS)}>
          <RotateCcw className="h-4 w-4" aria-hidden />{SCOPE.replay}
        </button>
      </div>
    </motion.div>
  );
}
