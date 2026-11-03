'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { FEATURES, SCOPE } from '@/content/zero';
import { cn } from '@/lib/utils';
import { HAND, TYPE } from '../primitives';
import { idsIn, type Lane, type Move } from './pile';
import type { LaneMap } from './top-note';

const TILTS = [-2, 1.5, -1, 2.5, -2.5, 1];
/** A note slaps onto the column: overshoots, then sticks at its tilt. */
const STICK = { initial: { opacity: 0, scale: 1.25, y: -18 }, transition: { type: 'spring', stiffness: 520, damping: 20 } } as const;
const SURFACE: Record<Lane, string> = {
  cut: 'bg-[color:var(--z-field)]',
  later: 'bg-[color:var(--z-field)]',
  v1: 'bg-[color:var(--z-field-strong)]',
};

/** One column the notes stick to; it lights while a dragged note is over it. */
function LaneColumn({ lane, ids, lit, lanes }: { lane: (typeof SCOPE.lanes)[number]; ids: Move['id'][]; lit: boolean; lanes: LaneMap }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <section ref={(el) => { lanes.current[lane.id] = el; }} aria-label={lane.label}
      className={cn('flex min-h-[180px] min-w-0 flex-col p-2.5 transition-shadow duration-150 md:p-4 lg:min-h-[220px]', SURFACE[lane.id], lit && 'ring-2 ring-inset ring-[color:var(--z-accent-ink)]')}>
      <p className={cn('font-extrabold', TYPE.lead)}>{lane.label}</p>
      <p className={cn('text-[color:var(--z-soft)]', TYPE.small)}>{lane.hint}</p>
      <ul className="mt-3 grid justify-items-start gap-1.5">
        {ids.map((id, i) => (
          <motion.li key={id} {...(reduce ? {} : STICK)} animate={{ opacity: 1, scale: 1, y: 0, rotate: TILTS[i % TILTS.length] }}
            className={cn('zero-paper max-w-full px-2 py-1.5 text-[19px] leading-[1.05] md:px-3 md:text-[23px]', HAND, lane.id === 'cut' && 'line-through decoration-2')}>
            {FEATURES[id].label}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

/** Cut, later and v1, left to right, so a flick left cuts and a flick right ships. */
export function Lanes({ moves, hover, lanes }: { moves: Move[]; hover: Lane | null; lanes: LaneMap }) {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3">
      {SCOPE.lanes.map((lane) => <LaneColumn key={lane.id} lane={lane} ids={idsIn(moves, lane.id)} lit={hover === lane.id} lanes={lanes} />)}
    </div>
  );
}
