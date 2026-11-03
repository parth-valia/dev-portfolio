'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useThemeChange } from '@/hooks/use-theme-change';
import { FRAMES, PALETTE, SPRITE_SIZE, type Pose } from './sprites';

const SPEED_PX_S = 260;
/** The cat stops this far from the spot it is chasing, so it never sits under the pointer. */
const FOLLOW_GAP = 10;
/** It trails just below and left of the cursor. */
const CURSOR_OFFSET = { x: -44, y: 22 };
const SIZE_PX = 48;
const EDGE_PX = 8;
const WALK_FRAME_MS = 130;
const TYPE_FRAME_MS = 190;
const TYPE_AFTER_MS = 4000;
const SLEEP_AFTER_MS = 15000;
const BLINK_EVERY_MS = 3400;
const BLINK_MS = 140;
const ALERT_MS = 700;
/** Closer to the top than this, the bubble opens below the cat instead of above. */
const BUBBLE_ROOM_PX = 120;
const TIP_MS = 3400;

export type Bubble = { kind: 'tip' | 'alert' | 'sleep'; text: string } | null;

type Colors = Record<string, string>;

/** The palette's tokens read off the page, as they are in the current theme. */
function themeColors(): Colors {
  const style = getComputedStyle(document.body);
  return Object.fromEntries(Object.entries(PALETTE).map(([ch, token]) => [ch, style.getPropertyValue(token).trim()]));
}

function drawFrame(ctx: CanvasRenderingContext2D, rows: string[], mirror: boolean, colors: Colors) {
  ctx.clearRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
  rows.forEach((row, y) => {
    Array.from(row).forEach((ch, x) => {
      const color = colors[ch];
      if (!color) return;
      ctx.fillStyle = color;
      ctx.fillRect(mirror ? SPRITE_SIZE - 1 - x : x, y, 1, 1);
    });
  });
}

/** Which way to face and which frame set to play while walking toward (dx, dy). */
function walkPose(dx: number, dy: number): { pose: Pose; mirror: boolean } {
  if (Math.abs(dx) > Math.abs(dy) * 0.8) return { pose: 'side', mirror: dx < 0 };
  return { pose: dy < 0 ? 'up' : 'down', mirror: false };
}

function idlePose(idleMs: number, now: number): Pose {
  if (idleMs > SLEEP_AFTER_MS) return 'sleep';
  if (idleMs > TYPE_AFTER_MS) return 'type';
  return now % BLINK_EVERY_MS < BLINK_MS ? 'blink' : 'sit';
}

/** The roaming cat's state machine: chase the cursor, sit, type, nap; everything below React's render cycle. */
export function usePet(tips: string[]) {
  const reduce = useReducedMotion() ?? false;
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [bubble, setBubble] = useState<Bubble>(null);
  const tipIndex = useRef(0);
  const colors = useRef<Colors>({});
  const drawn = useRef('');
  useThemeChange(() => {
    colors.current = themeColors();
    drawn.current = '';
  });

  useEffect(() => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx || !wrap.current) return;
    const pos = { x: window.innerWidth - SIZE_PX - EDGE_PX * 3, y: window.innerHeight - SIZE_PX - EDGE_PX * 3 };
    const target = { ...pos };
    let idleSince = performance.now();
    let last = performance.now();
    let asleep = false;
    let frame = 0;

    const onPointer = (e: PointerEvent) => {
      if (reduce) return;
      target.x = Math.min(Math.max(e.clientX + CURSOR_OFFSET.x, EDGE_PX), window.innerWidth - SIZE_PX - EDGE_PX);
      target.y = Math.min(Math.max(e.clientY + CURSOR_OFFSET.y, EDGE_PX), window.innerHeight - SIZE_PX - EDGE_PX);
      if (asleep) {
        asleep = false;
        setBubble({ kind: 'alert', text: '!' });
        setTimeout(() => setBubble((b) => (b?.kind === 'alert' ? null : b)), ALERT_MS);
      }
    };

    const walkFrame = (dx: number, dy: number, dist: number, dt: number, now: number) => {
      const step = Math.min(SPEED_PX_S * dt, dist);
      pos.x += (dx / dist) * step;
      pos.y += (dy / dist) * step;
      idleSince = now;
      const { pose, mirror } = walkPose(dx, dy);
      const i = Math.floor(now / WALK_FRAME_MS) % FRAMES[pose].length;
      return { rows: FRAMES[pose][i], key: `${pose}${i}${mirror}`, mirror };
    };

    const idleFrame = (now: number) => {
      const pose = idlePose(now - idleSince, now);
      if (pose === 'sleep' && !asleep) {
        asleep = true;
        setBubble({ kind: 'sleep', text: 'z z' });
      }
      if (pose !== 'sleep') setBubble((b) => (b?.kind === 'sleep' ? null : b));
      const i = Math.floor(now / TYPE_FRAME_MS) % FRAMES[pose].length;
      return { rows: FRAMES[pose][i], key: `${pose}${i}`, mirror: false };
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      const dist = Math.hypot(dx, dy);
      const next = dist > FOLLOW_GAP ? walkFrame(dx, dy, dist, dt, now) : idleFrame(now);
      if (next.key !== drawn.current) {
        drawFrame(ctx, next.rows, next.mirror, colors.current);
        drawn.current = next.key;
      }
      if (wrap.current) {
        wrap.current.style.transform = `translate3d(${Math.round(pos.x)}px, ${Math.round(pos.y)}px, 0)`;
        wrap.current.dataset.side = pos.x > window.innerWidth / 2 ? 'right' : 'left';
        wrap.current.dataset.v = pos.y < BUBBLE_ROOM_PX ? 'top' : 'bottom';
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerdown', onPointer, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, [reduce]);

  const poke = useCallback(() => {
    const text = tips[tipIndex.current % tips.length];
    tipIndex.current += 1;
    setBubble({ kind: 'tip', text });
    setTimeout(() => setBubble((b) => (b?.text === text ? null : b)), TIP_MS);
  }, [tips]);

  return { wrap, canvas, bubble, poke, size: SIZE_PX };
}
