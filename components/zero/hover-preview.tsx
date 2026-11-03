'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE } from './primitives';

const FOLLOW = { stiffness: 220, damping: 30, mass: 0.6 };
const TILT = { stiffness: 140, damping: 22 };
const OFFSET = 28;
/** Degrees of lean per px/s of sideways speed, capped so fast flicks stay calm. */
const LEAN = 0.004;
const MAX_LEAN = 6;
const SHOW = { opacity: 1, scale: 1 };
const HIDE = { opacity: 0, scale: 0.92 };

/** Follows the pointer; the first frame after showing snaps to it so the card never flies in from the corner. */
function useFollow(shown: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, FOLLOW);
  const y = useSpring(rawY, FOLLOW);
  const wasShown = useRef(false);
  useEffect(() => {
    const move = (event: PointerEvent) => {
      rawX.set(event.clientX + OFFSET);
      rawY.set(event.clientY + OFFSET);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [rawX, rawY]);
  useEffect(() => {
    if (shown && !wasShown.current) {
      x.jump(rawX.get());
      y.jump(rawY.get());
    }
    wasShown.current = shown;
  }, [shown, rawX, rawY, x, y]);
  const lean = useTransform(useVelocity(x), (v) => Math.max(-MAX_LEAN, Math.min(MAX_LEAN, v * LEAN)));
  return { x, y, rotate: useSpring(lean, TILT) };
}

/** One card that stays mounted: it fades in at the pointer, glides between rows and crossfades the shots inside. Mouse only. */
export function HoverPreview({ images, active }: { images: string[]; active: string | null }) {
  const { x, y, rotate } = useFollow(active !== null);
  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden [@media(hover:hover)]:block" style={{ x, y, rotate }}>
      <motion.div initial={HIDE} animate={active ? SHOW : HIDE} transition={{ duration: 0.3, ease: EASE }}
        className="origin-top-left rounded-[18px] bg-[color:var(--z-field-strong)] p-2 shadow-[0_24px_60px_-20px_var(--z-shadow)]">
        <div className="relative aspect-[16/10] w-[min(30vw,420px)] overflow-hidden rounded-[12px] bg-[color:var(--z-screen)]">
          {images.map((src) => (
            <Image key={src} src={src} alt="" fill sizes="420px"
              className={cn('object-cover object-top transition-opacity duration-300 ease-out', src === active ? 'opacity-100' : 'opacity-0')} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
