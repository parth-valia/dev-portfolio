'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/motion/reveal';
import { FEATURES, IDEA, SCOPE } from '@/content/zero';
import { cn, fill } from '@/lib/utils';
import { useIdea } from './idea-context';
import { EASE, GUTTER, INSTANT, SECTION, TYPE } from './primitives';
import { Lanes } from './scope-board/lanes';
import { LaunchPlan } from './scope-board/launch-plan';
import { Meter } from './scope-board/meter';
import { laneOf, pileFor, type Lane, type Pile } from './scope-board/pile';
import { PileStack } from './scope-board/pile-stack';
import type { LaneMap } from './scope-board/top-note';
import { useScopeGame, type ScopeGame } from './scope-board/use-scope-game';

const SWAP = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 } };
const SWAP_TIME = { duration: 0.25, ease: EASE };

/** What the board says now: the core warning beats the size verdict. */
const lineFor = (game: ScopeGame, pile: Pile) => (game.coreAside ? fill(SCOPE.coreMissing, { core: FEATURES[pile.core].label }) : game.verdict.line);

/** The honest feedback under the meter; screen readers also hear where the last note went. */
function Feedback({ game, line }: { game: ScopeGame; line: string }) {
  const reduce = useReducedMotion() ?? false;
  const last = game.undone ? null : game.moves[game.moves.length - 1];
  return (
    <p aria-live="polite" className={cn('mt-5 min-h-[3.1em] font-semibold', TYPE.lead)}>
      {last && <span className="sr-only">{fill(SCOPE.moved, { label: FEATURES[last.id].label, lane: laneOf(last.lane).label })} </span>}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={line} className="block" {...SWAP} transition={reduce ? INSTANT : SWAP_TIME}>{line}</motion.span>
      </AnimatePresence>
    </p>
  );
}

/** One round for one pile; remounted when the idea changes kind, so a new idea starts a fresh pile. */
function Board({ pile, name, intro }: { pile: Pile; name: string; intro: React.ReactNode }) {
  const game = useScopeGame(pile);
  const lanes: LaneMap = useRef({});
  const [hover, setHover] = useState<Lane | null>(null);
  const [replayed, setReplayed] = useState(false);
  const replay = () => {
    setReplayed(true);
    game.replay();
  };
  const line = lineFor(game, pile);
  return (
    <>
      <div className="max-lg:order-1 lg:col-start-1 lg:row-span-2 lg:row-start-1">
        <div className="lg:sticky lg:top-28">
          {intro}
          <div className="mt-10 lg:mt-14">
            <Meter weeks={game.weeks} verdict={game.verdict} />
            <Feedback game={game} line={game.done ? '' : line} />
          </div>
        </div>
      </div>
      {game.done ? (
        <div className="max-lg:order-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <LaunchPlan name={name} moves={game.moves} weeks={game.weeks} line={line} onReplay={replay} />
        </div>
      ) : (
        <>
          <div className="max-lg:order-2 lg:col-start-2 lg:row-start-1"><PileStack game={game} pile={pile} lanes={lanes} onHover={setHover} focusFirst={replayed} /></div>
          <div className="max-lg:order-3 lg:col-start-2 lg:row-start-2 lg:self-start"><Lanes moves={game.moves} hover={hover} lanes={lanes} /></div>
        </>
      )}
    </>
  );
}

/**
 * What goes in v1: the visitor's idea arrives as a pile of feature notes to sort into cut, later or v1,
 * while a meter adds up the rough weeks to launch; the sorted pile becomes their launch plan.
 */
export function Scope() {
  const { idea, name } = useIdea();
  const pile = pileFor(idea || IDEA.placeholder);
  return (
    <section id="scope" aria-labelledby="zero-scope" className={cn(GUTTER, SECTION, 'overflow-x-clip')}>
      <div className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-x-16 lg:gap-y-12">
        <Board key={pile.kind} pile={pile} name={name} intro={
          <>
            <Reveal><h2 id="zero-scope" className={TYPE.head}>{SCOPE.title}</h2></Reveal>
            <Reveal delay={0.08}><p className={cn('mt-6 max-w-[40ch]', TYPE.lead)}>{fill(SCOPE.sub, { name })}</p></Reveal>
          </>
        } />
      </div>
    </section>
  );
}
