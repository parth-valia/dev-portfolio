'use client';

import { useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FOUNDER_SITUATIONS } from '@/content/offer';
import { SITUATION_NOTES, TITLES } from '@/content/zero';
import { cn } from '@/lib/utils';
import { NoteSketch } from './note-sketch';
import { EASE, FOCUS, GUTTER, HAND, TYPE } from './primitives';
import { useActiveBeat } from './use-active-beat';

const NOTE_TILTS = [-3, 2, -1.5, 3];
const PEEL = { initial: { opacity: 0, y: 24, rotate: 0 }, exit: { opacity: 0, y: -24 }, transition: { duration: 0.35, ease: EASE } };

const NOTE_HAND = cn(HAND, 'leading-[1.05]');

/** What the note says: the founder's problem, a pen sketch of the fix, my three steps and what they leave with. */
function NoteBody({ index }: { index: number }) {
  const note = SITUATION_NOTES[index];
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <p className={cn(NOTE_HAND, 'max-w-[11ch] text-[clamp(30px,3vw,46px)]')}>{note.problem}</p>
        <NoteSketch index={index} className="w-[34%] shrink-0" />
      </div>
      <ul className={cn(NOTE_HAND, 'mt-3 grid gap-1 text-[clamp(20px,1.7vw,27px)] lg:mt-6')}>
        {note.steps.map((step) => <li key={step} className="flex items-center gap-2"><svg aria-hidden viewBox="0 0 12 12" className="h-[0.7em] w-[0.7em] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M2 6.5l3 3l5-7" /></svg>{step}</li>)}
      </ul>
      <p className={cn(NOTE_HAND, 'mt-3 text-[clamp(20px,1.7vw,27px)] underline decoration-2 underline-offset-4 lg:mt-auto')}>→ {note.fix}</p>
    </>
  );
}

/** The note for the situation being read, peeled off and replaced whenever the active row changes. */
function Note({ index }: { index: number }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className="relative w-full max-w-[480px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={index} {...(reduce ? {} : PEEL)} animate={{ opacity: 1, y: 0, rotate: NOTE_TILTS[index] }}
          className="flex flex-col bg-[color:var(--z-accent)] p-5 text-[color:var(--z-on-accent)] md:p-8 lg:aspect-square">
          <NoteBody index={index} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** The four situations: the one being read is lit and open, the rest wait dimmed; tapping one scrolls to its step. */
function SituationList({ active, onPick }: { active: number; onPick: (i: number) => void }) {
  return (
    <ol className="mt-6 grid gap-4 lg:mt-12 lg:gap-6">
      {FOUNDER_SITUATIONS.map((situation, i) => (
        <li key={situation.title}>
          <button type="button" onClick={() => onPick(i)} aria-current={active === i ? 'step' : undefined}
            className={cn('w-full text-left font-semibold transition-colors duration-300', TYPE.lead, active === i ? 'text-[color:var(--z-ink)]' : 'text-[color:var(--z-soft)] hover:text-[color:var(--z-ink)]', FOCUS)}>
            {situation.title}
          </button>
          <div className={cn('grid transition-[grid-template-rows] duration-500', active === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
            <p className={cn('max-w-[52ch] overflow-hidden', TYPE.body)}><span className="block pt-3">{situation.body}</span></p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * Who I help: one pinned screen (the note, the heading and all four situations); the scroll track behind it moves the
 * highlight one situation per step, so each is held long enough to read.
 */
export function Situations() {
  const root = useRef<HTMLElement>(null);
  const active = Math.min(useActiveBeat(root), FOUNDER_SITUATIONS.length - 1);
  const steps = useRef<(HTMLDivElement | null)[]>([]);
  const pick = (i: number) => steps.current[i]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  return (
    <section ref={root} aria-labelledby="zero-gap" className="relative">
      <h2 id="zero-gap" className={cn(GUTTER, TYPE.head, 'pt-20 lg:hidden')}>{TITLES.gap.title}</h2>
      <div className={cn(GUTTER, 'sticky top-0 z-10 grid h-[100svh] content-center gap-6 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-16')}>
        <div className="mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:mx-0 lg:max-w-none"><Note index={active} /></div>
        <div>
          <p aria-hidden className={cn(TYPE.head, 'max-lg:hidden')}>{TITLES.gap.title}</p>
          <p className={cn('mt-6 max-w-[40ch] max-lg:hidden', TYPE.lead)}>{TITLES.gap.sub}</p>
          <SituationList active={active} onPick={pick} />
        </div>
      </div>
      <div aria-hidden className="pointer-events-none -mt-[60svh]">
        {FOUNDER_SITUATIONS.map((situation, i) => <div key={situation.title} ref={(el) => { steps.current[i] = el; }} data-beat className="h-[75svh]" />)}
      </div>
    </section>
  );
}
