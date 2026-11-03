import { FEATURES, PILES, SCOPE, type FeatureId } from '@/content/zero';

export type Lane = (typeof SCOPE.lanes)[number]['id'];
export type Pile = (typeof PILES)[number];
export type Verdict = (typeof SCOPE.verdicts)[number];
export type Move = { id: FeatureId; lane: Lane };

const SHORT_KEYWORD = 3;
/** The plan's range: real projects run over a rough estimate, rarely under. */
const OVERRUN = 1.4;

const matches = (words: string[], keyword: string) => words.some((word) => word === keyword || (keyword.length > SHORT_KEYWORD && word.startsWith(keyword)));

/** The feature pile for an idea, picked by the first matching keyword set. */
export function pileFor(idea: string) {
  const words = idea.toLowerCase().split(/[^a-z0-9]+/);
  return PILES.find((pile) => pile.keywords.some((keyword) => matches(words, keyword))) ?? PILES[PILES.length - 1];
}

export const laneOf = (id: Lane) => SCOPE.lanes.find((lane) => lane.id === id) ?? SCOPE.lanes[0];

export const idsIn = (moves: Move[], lane: Lane) => moves.filter((move) => move.lane === lane).map((move) => move.id);

/** Rough weeks to launch v1: its notes plus setup and launch, or nothing when v1 is empty. */
export function weeksFor(v1: FeatureId[]) {
  if (v1.length === 0) return 0;
  return SCOPE.baseWeeks + v1.reduce((sum, id) => sum + FEATURES[id].weeks, 0);
}

export const verdictFor = (weeks: number) => SCOPE.verdicts.find((verdict) => weeks <= verdict.upTo) ?? SCOPE.verdicts[SCOPE.verdicts.length - 1];

export const rangeFor = (weeks: number) => `${Math.round(weeks)}–${Math.ceil(weeks * OVERRUN)}`;

export const roundWeeks = (weeks: number) => Math.ceil(weeks);
