'use client';

import { useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { testimonialsConfig, type Testimonial } from '@/content/testimonials';
import { INBOX, TITLES } from '@/content/zero';
import { cn } from '@/lib/utils';
import { EASE, GUTTER, SWAP_GAP_S, TYPE } from './primitives';
import { useActiveBeat } from './use-active-beat';

const QUOTES = testimonialsConfig.testimonials;
/** The phone turns toward you as the messages arrive. */
const TURN = { from: -26, to: -6 };
const TIP_DEG = 8;
const PERSPECTIVE = 1600;
/** Like iOS: the messages wait as a lock-screen stack; each scroll step lifts the top card up into the list and the next comes off the stack. */
const SETTLE = { type: 'spring', stiffness: 260, damping: 32, mass: 0.9 } as const;
const MAKE_ROOM_S = 0.18;
const ARRIVE = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  shown: { opacity: 1, y: 0, scale: 1, transition: { ...SETTLE, delay: MAKE_ROOM_S } },
  gone: { opacity: 0, transition: { duration: 0.12 } },
};
const CARD = 'rounded-[18px] bg-[color:var(--z-field-strong)]';
/** The two layers under the top card, each narrower and tucked up beneath the one above, as on the iOS lock screen. */
const UNDER = ['z-[1] mx-[4%] -mt-[22px] opacity-90', 'z-0 mx-[9%] -mt-[22px] opacity-70'];

const firstName = (quote: Testimonial) => quote.name.split(' ')[0];

function Avatar({ quote, small = false }: { quote: Testimonial; small?: boolean }) {
  return <span className={cn('grid shrink-0 place-items-center rounded-[6px] bg-[color:var(--z-accent)] font-black text-[color:var(--z-on-accent)]', small ? 'h-5 w-5 text-[8px]' : 'h-7 w-7 text-[11px]')}>{quote.initials}</span>;
}

/** One founder's message as a lock-screen notification, sent under their own name. */
function Message({ quote }: { quote: Testimonial }) {
  return (
    <figure className={cn(CARD, 'p-3.5 text-[clamp(11.5px,1.65svh,14px)] leading-[1.45] lg:p-4 lg:text-[15px]')}>
      <p className="flex items-center gap-2 text-[color:var(--z-soft)]">
        <Avatar quote={quote} />
        <span className="truncate font-semibold text-[color:var(--z-ink)]">{quote.name}</span>
        <span className="ml-auto shrink-0">{INBOX.now}</span>
      </p>
      <blockquote className="mt-2.5">“{quote.quote}”</blockquote>
    </figure>
  );
}

/** A layer of the stack under the top card: the next message on one line, then a count of the rest. */
function Under({ place, children }: { place: string; children: React.ReactNode }) {
  return <div className={cn(CARD, 'relative flex items-center gap-2 px-3 pb-2.5 pt-[30px] text-[12px] text-[color:var(--z-soft)]', place)}>{children}</div>;
}

/** What is still waiting under the top card: the next message as a sliver, the ones after it summed up. */
function StackUnder({ active }: { active: number }) {
  const next = QUOTES[active + 1];
  const rest = QUOTES.slice(active + 2);
  return (
    <>
      {next && (
        <Under place={UNDER[0]}>
          <Avatar quote={next} small />
          <span className="truncate"><span className="font-semibold text-[color:var(--z-ink)]">{firstName(next)}:</span> {next.quote}</span>
        </Under>
      )}
      {rest.length > 0 && (
        <Under place={UNDER[1]}>
          <span className="w-full truncate text-center font-semibold">+{rest.length} from {rest.map(firstName).join(', ')}</span>
        </Under>
      )}
    </>
  );
}

/** Read messages rise into the list above; the newest sits on top of the stack of those still waiting. */
function NotificationList({ active }: { active: number }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-1 pb-4 pt-6 [mask-image:linear-gradient(to_bottom,transparent,#000_32px)]">
      <ol className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {QUOTES.slice(0, active + 1).map((quote) => (
            <motion.li key={quote.name} layout="position" variants={ARRIVE} initial="initial" animate="shown" exit="gone" transition={SETTLE} className="relative z-[2] shrink-0">
              <Message quote={quote} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
      <motion.div layout="position" transition={SETTLE} className="flex flex-col">
        <StackUnder active={active} />
      </motion.div>
    </div>
  );
}

/** The message being read, set large beside the phone with who sent it; phones show just the sender, the phone carries the words. */
function ActiveQuote({ active }: { active: number }) {
  const quote = QUOTES[active];
  return (
    <div aria-hidden>
      <div className="mb-6 flex gap-1.5">
        {QUOTES.map((q, i) => <span key={q.name} className={cn('h-[3px] flex-1 transition-colors duration-500', i <= active ? 'bg-[color:var(--z-accent-ink)]' : 'bg-[color:var(--z-field-strong)]')} />)}
      </div>
      <div className="relative">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.figure key={quote.name} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE, delay: SWAP_GAP_S } }} exit={{ opacity: 0, y: -10, transition: { duration: SWAP_GAP_S } }}>
            <blockquote className={cn('max-w-[36ch] max-lg:hidden', TYPE.lead)}>“{quote.quote}”</blockquote>
            <figcaption className="lg:mt-6">
              <span className={cn('block font-semibold', TYPE.lead)}>{quote.name}</span>
              <span className={cn('mt-1 block text-[color:var(--z-soft)]', TYPE.small)}>{quote.role}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** A phone built in CSS 3D at iPhone proportions; each founder's message lands on the lock screen in turn. */
function Phone({ active, turn }: { active: number; turn: MotionValue<number> }) {
  return (
    <motion.div aria-hidden style={{ rotateY: turn, rotateX: TIP_DEG, transformPerspective: PERSPECTIVE }}
      className="mx-auto flex h-[min(66svh,560px)] w-[calc(min(66svh,560px)*9/19+10px)] shrink-0 flex-col overflow-hidden rounded-[44px] bg-[color:var(--z-screen)] p-3 ring-[10px] ring-inset ring-[color:var(--z-device)] lg:h-[min(78svh,700px)] lg:w-[calc(min(78svh,700px)*9/19+10px)]">
      <p className="mt-7 text-center text-[clamp(36px,5.6svh,48px)] font-black leading-none tracking-[-0.04em] lg:mt-10 lg:text-[52px]">{INBOX.time}</p>
      <p className={cn('mt-1 text-center text-[color:var(--z-soft)]', TYPE.small)}>{INBOX.date}</p>
      <NotificationList active={active} />
    </motion.div>
  );
}

/** Every message, in order, as a plain list: shown under reduced motion, and what screen readers read otherwise. */
function QuoteStack() {
  return (
    <ol className={cn(GUTTER, 'sr-only gap-4 pb-24 pt-12 motion-reduce:not-sr-only motion-reduce:grid md:grid-cols-2 md:pb-36')}>
      {QUOTES.map((quote) => (
        <li key={quote.name} className="bg-[color:var(--z-field-strong)] p-6">
          <blockquote className={TYPE.body}>“{quote.quote}”</blockquote>
          <p className={cn('mt-4', TYPE.small)}>{quote.name}<span className="block font-normal text-[color:var(--z-soft)]">{quote.role}</span></p>
        </li>
      ))}
    </ol>
  );
}

/**
 * Founders' messages: the screen pins and each message arrives on the phone in turn, held for one stretch of scroll,
 * while the scroll track behind it moves the beat; after the last one the page moves on.
 */
export function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const active = Math.min(useActiveBeat(root), QUOTES.length - 1);
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end end'] });
  const turn = useTransform(scrollYProgress, [0, 1], [TURN.from, TURN.to]);
  if (!testimonialsConfig.populated) return null;
  return (
    <section ref={root} aria-labelledby="zero-testimonials" className="relative">
      <div className={cn(GUTTER, 'pt-24 md:pt-36 lg:motion-safe:sr-only')}>
        <h2 id="zero-testimonials" className={TYPE.head}>{TITLES.testimonials.title}</h2>
        <p className={cn('mt-4 max-w-[40ch]', TYPE.lead)}>{TITLES.testimonials.sub}</p>
      </div>
      <QuoteStack />
      <div className={cn(GUTTER, 'sticky top-0 flex h-[100svh] flex-col justify-center gap-6 motion-reduce:hidden lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16')}>
        <div className="max-lg:order-2">
          <p aria-hidden className={cn(TYPE.head, 'max-lg:hidden')}>{TITLES.testimonials.title}</p>
          <p aria-hidden className={cn('mb-10 mt-6 max-w-[34ch] max-lg:hidden', TYPE.lead)}>{TITLES.testimonials.sub}</p>
          <ActiveQuote active={active} />
        </div>
        <Phone active={active} turn={turn} />
      </div>
      <div aria-hidden className="pointer-events-none -mt-[50svh] pb-[50svh] motion-reduce:hidden">
        {QUOTES.map((quote) => <div key={quote.name} data-beat className="h-[80svh]" />)}
      </div>
    </section>
  );
}
