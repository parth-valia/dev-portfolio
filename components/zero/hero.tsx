'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { IDEA, TITLES } from '@/content/zero';
import { siteConfig } from '@/site.config';
import { cn } from '@/lib/utils';
import { useIdea } from './idea-context';
import { buttonClass, EASE, FOCUS, GUTTER, HAND, TYPE } from './primitives';

const FIRST_BUILD = 'beat-mobile';
const PAD = '[data-pad] canvas';
/** The pad drawing sits a little below the middle of its canvas. */
const PAD_CENTRE = 0.66;
/** Keep the landing spot this far inside the viewport. */
const EDGE = 96;
const MAX_IDEA = 60;
/** An example idea types itself into the prompt, one character at a time. */
const TYPE_MS = 28;
/** On "Build it" the idea lifts off the prompt as a note and lands on the pad, then the page glides down to the build. */
const FLIGHT = { seconds: 1, scrollAfterMs: 780, resetMs: 1900, arc: 90, turn: 12, land: 0.5 };
const LINES = TITLES.hero;
/** Each line's start in the CSS rise, so the headline animates from the first paint instead of waiting for hydration. */
const RISE_DELAYS = ['[animation-delay:100ms]', '[animation-delay:190ms]'];

/** The two-line promise rising line by line out of a mask. */
export function HeroHeadline({ className = '' }: { className?: string }) {
  return (
    <h1 className={cn(GUTTER, TYPE.mega, 'relative pb-4 pt-[88px] md:pb-6 md:pt-28 lg:z-20 lg:pb-0 lg:pt-32', className)}>
      <span className={cn('mb-3 block tracking-normal md:mb-5 text-[color:var(--z-accent-ink)]', TYPE.small)}>{TITLES.kicker}<span className="sr-only">: </span></span>
      <span className="sr-only">{LINES.join(' ')}</span>
      {LINES.map((row, i) => (
        <span key={row} aria-hidden className="block overflow-hidden pb-[0.08em]">
          <span className={cn('zero-rise block', RISE_DELAYS[i])}>{row}</span>
        </span>
      ))}
    </h1>
  );
}

/** Types `text` into the prompt letter by letter; a new pick cancels the one still typing. */
function useTypeIn() {
  const { setIdea } = useIdea();
  const reduce = useReducedMotion() ?? false;
  const timer = useRef<number>();
  useEffect(() => () => window.clearInterval(timer.current), []);
  return (text: string) => {
    window.clearInterval(timer.current);
    if (reduce) return setIdea(text);
    let typed = 0;
    timer.current = window.setInterval(() => {
      typed += 1;
      setIdea(text.slice(0, typed));
      if (typed >= text.length) window.clearInterval(timer.current);
    }, TYPE_MS);
  };
}

function Examples() {
  const typeIn = useTypeIn();
  return (
    <p className={cn('mt-3 flex flex-wrap items-center gap-x-4 text-[color:var(--z-soft)]', TYPE.small)}>
      <span>Try</span>
      {IDEA.examples.map((example) => (
        <button key={example} type="button" onClick={() => typeIn(example)} className={cn('min-h-11 underline decoration-[color:var(--z-soft)] underline-offset-4 transition-colors hover:text-[color:var(--z-ink)] hover:decoration-[color:var(--z-accent-ink)]', FOCUS)}>
          {example}
        </button>
      ))}
    </p>
  );
}

type Flight = { left: number; top: number; dx: number; dy: number; text: string };

/** The idea as a lime note that arcs from the prompt onto the pad, turning and shrinking as it lands. */
function FlyingNote({ flight }: { flight: Flight }) {
  return (
    <motion.div aria-hidden style={{ left: flight.left, top: flight.top }}
      initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
      animate={{ opacity: [0, 1, 1, 1, 0], scale: [0.85, 1, 0.8, FLIGHT.land, FLIGHT.land], rotate: [-4, 0, FLIGHT.turn / 2, FLIGHT.turn, FLIGHT.turn], x: [0, 0, flight.dx * 0.55, flight.dx, flight.dx], y: [0, -12, flight.dy * 0.4 - FLIGHT.arc, flight.dy, flight.dy] }}
      transition={{ duration: FLIGHT.seconds, ease: EASE, times: [0, 0.15, 0.55, 0.85, 1] }}
      className="zero-paper pointer-events-none fixed z-50 max-w-[300px] px-5 py-4 shadow-[0_24px_40px_-20px_var(--z-shadow)]">
      <span className={cn('block text-[30px] leading-[1.05]', HAND)}>{flight.text}</span>
    </motion.div>
  );
}

/** Where the note should land: the middle of the pad, kept on screen so the flight is always seen. */
function flightFor(input: HTMLElement, text: string): Flight {
  const from = input.getBoundingClientRect();
  const pad = document.querySelector(PAD)?.getBoundingClientRect();
  const clampY = (y: number) => Math.min(Math.max(y, EDGE), window.innerHeight - EDGE);
  const to = pad ? { x: pad.left + pad.width / 2, y: clampY(pad.top + pad.height * PAD_CENTRE) } : { x: from.left, y: from.top };
  return { left: from.left + 8, top: from.top, dx: to.x - from.left, dy: to.y - from.top, text };
}

/** The live thing: whatever is typed here is handwritten onto the pad, and the build below is built for it. */
export function IdeaPrompt({ className = '' }: { className?: string }) {
  const { idea, setIdea, name } = useIdea();
  const reduce = useReducedMotion() ?? false;
  const input = useRef<HTMLInputElement>(null);
  const [flight, setFlight] = useState<Flight | null>(null);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);
  const toBuild = () => document.getElementById(FIRST_BUILD)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  const build = (e: React.FormEvent) => {
    e.preventDefault();
    if (reduce || !input.current) return toBuild();
    setFlight(flightFor(input.current, name));
    timers.current = [window.setTimeout(toBuild, FLIGHT.scrollAfterMs), window.setTimeout(() => setFlight(null), FLIGHT.resetMs)];
  };
  return (
    <div data-beat className={cn(GUTTER, 'relative flex flex-col pb-3 pt-4 md:pb-4 md:pt-6 lg:z-20 lg:w-[40vw] lg:pb-[18vh] lg:pt-14', className)}>
      <p className={cn('order-2 mt-4 max-w-[40ch] md:mt-10 lg:order-none lg:mt-0', TYPE.lead, 'max-md:text-[15px] max-md:leading-[1.45]')}>{TITLES.lede}</p>
      <form onSubmit={build} className="max-w-[560px] lg:mt-8">
        <label htmlFor="zero-idea" className={cn('block', TYPE.small)}>{IDEA.prompt}</label>
        <div className="mt-3 flex bg-[color:var(--z-field)] focus-within:bg-[color:var(--z-field-strong)] focus-within:ring-2 focus-within:ring-[color:var(--z-accent-ink)]">
          <input ref={input} id="zero-idea" value={idea} onChange={(e) => setIdea(e.target.value)} placeholder={IDEA.placeholder} maxLength={MAX_IDEA} autoComplete="off"
            className={cn('h-14 min-w-0 flex-1 bg-transparent px-4 outline-none placeholder:text-[color:var(--z-soft)]', TYPE.body)} />
          <button type="submit" disabled={Boolean(flight)} className={cn(buttonClass('primary'), 'h-14 overflow-hidden disabled:cursor-default disabled:bg-[color:var(--z-accent)] disabled:text-[color:var(--z-on-accent)]')}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={flight ? 'sent' : 'idle'} initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }} transition={{ duration: 0.25, ease: EASE }} className="inline-flex items-center gap-1.5">
                {flight ? <><Check aria-hidden className="h-4 w-4" />{IDEA.building}</> : IDEA.submit}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
        <Examples />
      </form>
      {flight && <FlyingNote flight={flight} />}
      <a href={siteConfig.calendarUrl} target="_blank" rel="noopener noreferrer" className={cn('order-3 mt-3 md:mt-8 inline-flex items-center gap-1 self-start underline underline-offset-4 hover:text-[color:var(--z-accent-ink)]', TYPE.small, FOCUS)}>
        Or book a free 30-minute call <ArrowUpRight className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}
