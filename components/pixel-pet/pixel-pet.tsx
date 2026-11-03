'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SPRITE_SIZE } from './sprites';
import { usePet, type Bubble } from './use-pet';

/** What the cat says when poked: Parth's facts, in the cat's voice. */
const TIPS = [
  'psst… Parth has shipped 20+ products.',
  'I review every PR. Mostly by sitting on it.',
  'No technical co-founder? He’s the fix.',
  'Fintech, KYC, payments: he speaks all three.',
  'Book a call. I’ll keep the keyboard warm.',
];

/** Without a cursor to chase the cat would park on the copy, so like oneko it only lives on wide pointer screens. */
const FINE_POINTER = '(pointer: fine) and (min-width: 768px)';
/** The bubble opens toward the roomier side of the screen, so its text never runs off an edge. */
const BUBBLE_PLACE = 'left-0 group-data-[side=right]:left-auto group-data-[side=right]:right-0 bottom-full mb-2 group-data-[v=top]:bottom-auto group-data-[v=top]:top-full group-data-[v=top]:mb-0 group-data-[v=top]:mt-2';

function SpeechBubble({ bubble }: { bubble: NonNullable<Bubble> }) {
  if (bubble.kind === 'sleep') {
    return <span className={`absolute ${BUBBLE_PLACE} animate-pulse text-[13px] font-bold italic tracking-[0.2em] text-[color:var(--z-soft)]`} aria-hidden>z z</span>;
  }
  return (
    <p role="status" className={`absolute ${BUBBLE_PLACE} w-max max-w-[min(240px,calc(100vw-24px))] bg-[color:var(--z-accent)] px-3 py-2 text-[13px] font-semibold leading-snug text-[color:var(--z-on-accent)] shadow-[0_12px_24px_-12px_var(--z-shadow)] ${bubble.kind === 'alert' ? 'px-2 font-bold' : 'whitespace-normal text-left'}`}>
      {bubble.text}
    </p>
  );
}

function Cat() {
  const { wrap, canvas, bubble, poke, size } = usePet(TIPS);
  return (
    <div ref={wrap} className="group pointer-events-none fixed left-0 top-0 z-[70] will-change-transform" style={{ width: size, height: size }}>
      {bubble && <SpeechBubble bubble={bubble} />}
      <button type="button" onClick={poke} aria-label="Poke the pixel cat" className="pointer-events-auto block h-full w-full cursor-pointer rounded-md outline-none transition-transform active:scale-90 focus-visible:ring-2 focus-visible:ring-[color:var(--z-accent-ink)]">
        <canvas ref={canvas} width={SPRITE_SIZE} height={SPRITE_SIZE} className="block h-full w-full [image-rendering:pixelated]" />
      </button>
    </div>
  );
}

/** A roaming pixel cat in the site's colours: it chases the cursor, types when idle, naps, and talks when poked. */
export function PixelPet() {
  const [enabled, setEnabled] = useState(false);
  const pathname = usePathname();
  useEffect(() => setEnabled(window.matchMedia(FINE_POINTER).matches), [pathname]);
  return enabled ? <Cat /> : null;
}
