'use client';

import { useRef } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { FEATURES, SCOPE } from '@/content/zero';
import { cn, fill } from '@/lib/utils';
import { buttonClass, FOCUS, HAND, INSTANT, TYPE } from '../primitives';
import { type Lane, type Pile } from './pile';
import { NoteWords, TopNote, type LaneMap, type NoteHandle } from './top-note';
import type { ScopeGame } from './use-scope-game';

/** The notes under the top one: tilted, tucked and a shade darker, like the rest of a pad; the next one's words show as the top is peeled away. */
const NEXT_NOTE = 'flex flex-col p-5 md:p-6 rotate-[4deg] translate-x-2 translate-y-2 bg-[color:var(--z-paper-cut)] text-[color:var(--z-on-accent)]';
const BACK_NOTE = '-rotate-[3deg] -translate-x-1.5 translate-y-3.5 bg-[color:var(--z-paper-edge)]';
const ICONS: Record<Lane, typeof ArrowLeft> = { cut: ArrowLeft, later: ArrowDown, v1: ArrowRight };
/** The pad drops onto the desk as the section arrives; each next note then rises off the pad into place. */
const DROP_IN = { initial: { opacity: 0, y: -70, rotate: -8 }, whileInView: { opacity: 1, y: 0, rotate: 0 }, viewport: { once: true, margin: '0px 0px -15% 0px' } } as const;
const DROP_SPRING = { type: 'spring', stiffness: 260, damping: 18 } as const;
const NEXT_UP = { initial: { scale: 0.94, rotate: 4 }, animate: { scale: 1, rotate: 0 } } as const;
const NEXT_SPRING = { type: 'spring', stiffness: 420, damping: 26 } as const;
const FADE = { step: 0.12, min: 0.3 };

/** The notes still to sort, beside the pad, fading as they go deeper. */
function UpNext({ ids }: { ids: Pile['notes'] }) {
  return (
    <div aria-hidden className="hidden min-w-0 lg:block">
      <p className={cn('text-[color:var(--z-soft)]', TYPE.small)}>{SCOPE.upNext}</p>
      <ul className="mt-3 grid gap-2">
        {ids.map((id, i) => (
          <li key={id} style={{ opacity: Math.max(FADE.min, 1 - i * FADE.step) }} className={cn('truncate text-[28px] leading-[1.15]', HAND)}>{FEATURES[id].label}</li>
        ))}
      </ul>
    </div>
  );
}

/** One button per lane, in the lanes' order, for taps and keyboards. */
function SortButtons({ label, onSort }: { label: string; onSort: (lane: Lane) => void }) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-2">
      {SCOPE.lanes.map((lane) => {
        const Icon = ICONS[lane.id];
        return (
          <button key={lane.id} type="button" onClick={() => onSort(lane.id)} aria-label={fill(SCOPE.put, { label, lane: lane.label })}
            className={cn(buttonClass('primary'), 'w-full px-2', lane.id !== 'v1' && 'bg-[color:var(--z-field-strong)] text-[color:var(--z-ink)]')}>
            {lane.id !== 'v1' && <Icon className="h-4 w-4" aria-hidden />}
            {lane.label}
            {lane.id === 'v1' && <Icon className="h-4 w-4" aria-hidden />}
          </button>
        );
      })}
    </div>
  );
}

/** The pile: the top note to sort, the pad beneath it, where you are in it and the three lane buttons. */
export function PileStack({ game, pile, lanes, onHover, focusFirst }: { game: ScopeGame; pile: Pile; lanes: LaneMap; onHover: (lane: Lane | null) => void; focusFirst: boolean }) {
  const reduce = useReducedMotion() ?? false;
  const note = useRef<NoteHandle>(null);
  const refocus = useRef(focusFirst);
  const undo = () => {
    refocus.current = false;
    game.undo();
  };
  const id = game.current;
  const label = FEATURES[id].label;
  const left = pile.notes.length - game.moves.length;
  const next = pile.notes[game.moves.length + 1];
  const progress = fill(SCOPE.progress, { n: game.moves.length + 1, total: pile.notes.length });
  return (
    <div>
      <p className={cn('flex justify-between text-[color:var(--z-soft)]', TYPE.small)}>
        <span>{progress}</span>
        {game.moves.length > 0 && <button type="button" onClick={undo} className={cn('-my-3 inline-flex min-h-[44px] items-center underline underline-offset-4 hover:text-[color:var(--z-ink)]', FOCUS)}>{SCOPE.undo}</button>}
      </p>
      <div className="mt-4 lg:grid lg:grid-cols-[340px_1fr] lg:gap-10">
        <motion.div {...DROP_IN} transition={reduce ? INSTANT : DROP_SPRING} className="relative mx-auto w-[min(76vw,320px)] lg:mx-0 lg:w-[340px]">
          {left > 2 && <span aria-hidden className={cn('absolute inset-0', BACK_NOTE)} />}
          {next && <span aria-hidden className={cn('absolute inset-0', NEXT_NOTE)}><NoteWords id={next} /></span>}
          <motion.div key={id} {...NEXT_UP} transition={reduce ? INSTANT : NEXT_SPRING}>
            <TopNote ref={note} id={id} core={id === pile.core} label={`${progress}: ${label}`} lanes={lanes} onHover={onHover} autoFocus={refocus.current}
              onSort={(lane, byKey) => { refocus.current = byKey; game.sort(lane); }} />
          </motion.div>
        </motion.div>
        <UpNext ids={pile.notes.slice(game.moves.length + 1)} />
      </div>
      <SortButtons label={label} onSort={(lane) => note.current?.fly(lane)} />
      <p id="zero-scope-how" className="sr-only">{SCOPE.howTo}</p>
      <p aria-hidden className={cn('mt-3 text-[color:var(--z-soft)]', TYPE.small)}>{SCOPE.hint}</p>
    </div>
  );
}
