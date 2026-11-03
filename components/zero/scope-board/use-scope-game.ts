'use client';

import { useState } from 'react';
import { idsIn, weeksFor, verdictFor, type Lane, type Move, type Pile } from './pile';

/** One round of sorting a pile: what has been placed where, the note on top and the running estimate. */
export function useScopeGame(pile: Pile) {
  const [moves, setMoves] = useState<Move[]>([]);
  const [undone, setUndone] = useState(false);
  const current = pile.notes[moves.length];
  const weeks = weeksFor(idsIn(moves, 'v1'));
  const coreAside = moves.some((move) => move.id === pile.core && move.lane !== 'v1');

  const sort = (lane: Lane) => {
    setUndone(false);
    setMoves((placed) => (placed.length < pile.notes.length ? [...placed, { id: pile.notes[placed.length], lane }] : placed));
  };
  const undo = () => {
    setUndone(true);
    setMoves((placed) => placed.slice(0, -1));
  };
  const replay = () => setMoves([]);

  return { moves, current, done: !current, weeks, verdict: verdictFor(weeks), coreAside, undone, sort, undo, replay };
}

export type ScopeGame = ReturnType<typeof useScopeGame>;
