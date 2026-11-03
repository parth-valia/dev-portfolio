'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE, SWAP_GAP_S, TYPE } from './primitives';

export type Caption = { key: string; title: string; body: string; foot?: string };

/** The beat being read, set beside a pinned stage with a progress row, swapped as you scroll. */
export function StageCaption({ captions, active, className = '' }: { captions: Caption[]; active: number; className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const index = Math.min(Math.max(active, 0), captions.length - 1);
  const caption = captions[index];
  return (
    <div aria-hidden className={cn('flex min-h-0 flex-1 flex-col px-5 pb-8 md:px-10', className)}>
      <div className="mb-5 flex gap-1.5">
        {captions.map((c, i) => (
          <span key={c.key} className={cn('h-[3px] flex-1 transition-colors duration-500', i <= index ? 'bg-[color:var(--z-accent-ink)]' : 'bg-[color:var(--z-field-strong)]')} />
        ))}
      </div>
      <div className="relative">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={caption.key} initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE, delay: SWAP_GAP_S } }} exit={reduce ? undefined : { opacity: 0, y: -10, transition: { duration: SWAP_GAP_S } }}>
            <p className={cn(TYPE.head, 'text-[clamp(30px,8vw,44px)]')}>{caption.title}</p>
            {caption.foot && <p className={cn('mt-2 text-[color:var(--z-accent-ink)]', TYPE.small)}>{caption.foot}</p>}
            <p className={cn('mt-3 max-w-[40ch]', TYPE.body)}>{caption.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
