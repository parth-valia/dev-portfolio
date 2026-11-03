'use client';

import { useRef } from 'react';
import { Reveal } from '@/components/motion/reveal';
import { PROCESS_STEPS } from '@/content/offer';
import { STATIONS, TITLES } from '@/content/zero';
import { cn } from '@/lib/utils';
import { PopupCanvas } from './popup-canvas';
import { PROCESS_SCENE } from './popup/scenes/process';
import { GUTTER, TYPE } from './primitives';
import { StageCaption } from './stage-caption';
import { useActiveBeat } from './use-active-beat';

/** Copy runs down the right of the screen here, the mirror of the build, so the pad sits on the left. */
const COLUMN = cn(GUTTER, 'relative lg:z-20 lg:ml-[58vw] lg:w-[42vw]');

const CAPTIONS = [
  { key: 'intro', title: TITLES.process.title, body: TITLES.process.sub },
  ...PROCESS_STEPS.map((step, i) => ({ key: step.step, title: step.title, body: step.body, foot: `${STATIONS[i]} station · ${step.duration}` })),
];

/**
 * How we work: four stations on the pad's wire; each stands up and lights as its step is read.
 * Phones: one full-screen stage pins (pad above, the step's caption below) while the copy blocks scroll past unseen.
 */
export function Process() {
  const root = useRef<HTMLElement>(null);
  const active = useActiveBeat(root);
  return (
    <section ref={root} id="process" aria-labelledby="zero-process" className="relative">
      <div className="sticky top-0 z-30 flex h-[100svh] flex-col bg-[color:var(--z-bg)] lg:absolute lg:inset-y-0 lg:left-0 lg:right-[42vw] lg:z-0 lg:block lg:h-auto lg:bg-transparent">
        <div className="h-[56svh] shrink-0 pt-10 lg:sticky lg:top-0 lg:h-[100svh] lg:pt-0">
          <PopupCanvas root={root} scene={PROCESS_SCENE} />
        </div>
        <div className="flex min-h-0 flex-1 lg:hidden"><StageCaption captions={CAPTIONS} active={active} /></div>
      </div>
      <div className="max-lg:pointer-events-none max-lg:-mt-[70svh] max-lg:pb-[45svh] max-lg:opacity-0">
        <div data-beat className={cn(COLUMN, 'py-16 lg:py-[30vh]')}>
          <Reveal><h2 id="zero-process" className={TYPE.head}>{TITLES.process.title}</h2></Reveal>
          <Reveal delay={0.08}><p className={cn('mt-6 max-w-[36ch]', TYPE.lead)}>{TITLES.process.sub}</p></Reveal>
        </div>
        <ol>
          {PROCESS_STEPS.map((step, i) => (
            <li key={step.step} data-beat className={cn(COLUMN, 'flex min-h-[54svh] flex-col justify-center py-10 lg:min-h-[90svh]')}>
              <Reveal>
                <h3 className={TYPE.head}>{step.title}</h3>
                <p className={cn('mt-3 text-[color:var(--z-accent-ink)]', TYPE.small)}>{STATIONS[i]} station · {step.duration}</p>
              </Reveal>
              <Reveal delay={0.08}><p className={cn('mt-6 max-w-[42ch]', TYPE.lead)}>{step.body}</p></Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
