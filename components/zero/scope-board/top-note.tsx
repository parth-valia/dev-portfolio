'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform, type PanInfo } from 'framer-motion';
import { FEATURES, SCOPE, type FeatureId } from '@/content/zero';
import { cn, fill } from '@/lib/utils';
import { FOCUS, HAND, TYPE } from '../primitives';
import { type Lane } from './pile';

export type LaneMap = React.MutableRefObject<Partial<Record<Lane, HTMLElement | null>>>;
export type NoteHandle = { fly: (lane: Lane) => void };

/** The note tips toward the side it is dragged, like paper held at one corner. */
const TIP = { reach: 240, deg: 14 };
const SWIPE = { distance: 110, velocity: 600 };
const LIFT = 1.05;
const LANDED = 0.42;
const FLY = { duration: 0.34, ease: [0.4, 0, 0.2, 1] } as const;
const BACK = { type: 'spring', stiffness: 520, damping: 30 } as const;
const KEYS: Record<string, Lane> = { ArrowLeft: 'cut', ArrowDown: 'later', ArrowRight: 'v1' };

/** The lane under the pointer, if any. */
function laneAt(lanes: LaneMap, point: { x: number; y: number }) {
  const hit = Object.entries(lanes.current).find(([, el]) => {
    const box = el?.getBoundingClientRect();
    return box && point.x >= box.left && point.x <= box.right && point.y >= box.top && point.y <= box.bottom;
  });
  return hit ? (hit[0] as Lane) : null;
}

const flicked = (offset: number, velocity: number) => Math.abs(offset) >= SWIPE.distance || Math.abs(velocity) >= SWIPE.velocity;

/** A flick sorts without reaching a column: right is v1, left is cut, down is later. */
function swipeLane({ offset, velocity }: PanInfo): Lane | null {
  if (Math.abs(offset.x) >= Math.abs(offset.y)) return flicked(offset.x, velocity.x) ? (offset.x > 0 ? 'v1' : 'cut') : null;
  return offset.y > 0 && flicked(offset.y, velocity.y) ? 'later' : null;
}

const clientPoint = (info: PanInfo) => ({ x: info.point.x - window.scrollX, y: info.point.y - window.scrollY });

/** How far the note must travel from where it rests to land on top of a lane. */
function travelTo(note: HTMLElement, lane: HTMLElement, moved: { x: number; y: number }) {
  const from = note.getBoundingClientRect();
  const to = lane.getBoundingClientRect();
  return { x: to.left + to.width / 2 - (from.left + from.width / 2 - moved.x), y: to.top + to.height / 3 - (from.top + from.height / 2 - moved.y) };
}

/** What a feature note says: its rough effort, whether it is the core, and the feature in handwriting. */
export function NoteWords({ id, core = false }: { id: FeatureId; core?: boolean }) {
  return (
    <>
      <span className={cn('flex justify-between gap-3 opacity-80', TYPE.small)}>
        <span>{fill(SCOPE.weeks, { weeks: FEATURES[id].weeks })}</span>
        {core && <span>{SCOPE.coreTag}</span>}
      </span>
      <span className={cn('mt-3 max-w-[24ch] opacity-80', TYPE.body)}>{FEATURES[id].about}</span>
      <span className={cn(HAND, 'mt-auto text-[clamp(34px,9vw,46px)] leading-[1.02] lg:text-[52px]')}>{FEATURES[id].label}</span>
    </>
  );
}

type Props = { id: FeatureId; core: boolean; label: string; lanes: LaneMap; onHover: (lane: Lane | null) => void; onSort: (lane: Lane, byKey: boolean) => void; autoFocus: boolean };

/** The note on top of the pile: drag it onto a lane, flick it, or send it with a key; it flies into the column it was given. */
export const TopNote = forwardRef<NoteHandle, Props>(function TopNote({ id, core, label, lanes, onHover, onSort, autoFocus }, ref) {
  const reduce = useReducedMotion() ?? false;
  const box = useRef<HTMLDivElement>(null);
  const flying = useRef(false);
  const [lifted, setLifted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(1);
  const rotate = useTransform(x, [-TIP.reach, TIP.reach], [-TIP.deg, TIP.deg]);

  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  // A keyboard sort hands focus to the next note, so arrow keys can run through the pile.
  useEffect(() => {
    if (autoFocus) box.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  const fly = (lane: Lane, byKey = false) => {
    const target = lanes.current[lane];
    if (flying.current) return;
    flying.current = true;
    if (reduce || !box.current || !target) return onSort(lane, byKey);
    const path = travelTo(box.current, target, { x: x.get(), y: y.get() });
    animate(x, path.x, FLY);
    animate(y, path.y, FLY);
    animate(scale, LANDED, FLY);
    animate(opacity, 0, FLY).then(() => mounted.current && onSort(lane, byKey));
  };
  useImperativeHandle(ref, () => ({ fly }));

  const settle = () => {
    animate(x, 0, BACK);
    animate(y, 0, BACK);
    animate(scale, 1, BACK);
  };
  const onDragStart = () => {
    setLifted(true);
    animate(scale, LIFT, BACK);
  };
  const onDrag = (_: unknown, info: PanInfo) => onHover(laneAt(lanes, clientPoint(info)));
  const onDragEnd = (_: unknown, info: PanInfo) => {
    const lane = laneAt(lanes, clientPoint(info)) ?? swipeLane(info);
    setLifted(false);
    onHover(null);
    if (lane) fly(lane);
    else settle();
  };
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!KEYS[event.key]) return;
    event.preventDefault();
    fly(KEYS[event.key], true);
  };

  return (
    <motion.div ref={box} role="group" tabIndex={0} aria-label={label} aria-describedby="zero-scope-how" onKeyDown={onKeyDown}
      drag dragMomentum={false} dragElastic={1} onDragStart={onDragStart} onDrag={onDrag} onDragEnd={onDragEnd}
      style={{ x, y, rotate, scale, opacity }}
      className={cn('zero-paper relative z-10 flex aspect-[3/2] w-full sm:aspect-[6/5] cursor-grab touch-none select-none flex-col p-5 will-change-transform active:cursor-grabbing md:p-6', lifted && 'shadow-[0_30px_50px_-24px_var(--z-shadow)]', FOCUS)}>
      <NoteWords id={id} core={core} />
    </motion.div>
  );
});
