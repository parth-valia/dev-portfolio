'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { IDEA, TITLES } from '@/content/zero';
import { siteConfig } from '@/site.config';
import { cn } from '@/lib/utils';
import { useIdea } from './idea-context';
import { buttonClass, FOCUS, GUTTER, TYPE } from './primitives';

const FIRST_BUILD = 'beat-mobile';
const MAX_IDEA = 60;
/** An example idea types itself into the prompt, one character at a time. */
const TYPE_MS = 28;
/** The empty prompt types an example, holds it, erases it and moves to the next. */
const CYCLE = { typeMs: 55, eraseMs: 25, holdMs: 1800, gapMs: 350 };

/** The examples in a fresh, evenly random order on every visit (Fisher–Yates). */
function shuffled<T>(list: readonly T[]) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
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

/** While the prompt is empty and not in use, its placeholder types the examples one by one. */
function useCyclingPlaceholder(examples: readonly string[], paused: boolean) {
  const reduce = useReducedMotion() ?? false;
  const [shown, setShown] = useState({ text: '', example: '' });
  useEffect(() => {
    if (paused || reduce || !examples.length) return undefined;
    let index = 0;
    let length = 0;
    let erasing = false;
    let timer = 0;
    const step = () => {
      const target = examples[index % examples.length];
      if (!erasing && length < target.length) length += 1;
      else if (!erasing) erasing = true;
      else if (length > 0) length -= 1;
      else { erasing = false; index += 1; }
      const example = examples[index % examples.length];
      setShown({ text: example.slice(0, length), example });
      const atFull = !erasing && length === target.length;
      timer = window.setTimeout(step, atFull ? CYCLE.holdMs : erasing ? CYCLE.eraseMs : length === 0 ? CYCLE.gapMs : CYCLE.typeMs);
    };
    timer = window.setTimeout(step, CYCLE.gapMs);
    return () => window.clearTimeout(timer);
  }, [examples, paused, reduce]);
  if (reduce || !shown.example) return { text: IDEA.placeholder, example: IDEA.placeholder };
  return shown;
}

function Examples({ examples }: { examples: readonly string[] }) {
  const typeIn = useTypeIn();
  return (
    <p className={cn('mt-3 flex flex-wrap items-center gap-x-4 text-[color:var(--z-soft)]', TYPE.small)}>
      <span>Try</span>
      {examples.map((example) => (
        <button key={example} type="button" onClick={() => typeIn(example)} className={cn('min-h-11 underline decoration-[color:var(--z-soft)] underline-offset-4 transition-colors hover:text-[color:var(--z-ink)] hover:decoration-[color:var(--z-accent-ink)]', FOCUS)}>
          {example}
        </button>
      ))}
    </p>
  );
}

/** The live thing: whatever is typed here is handwritten onto the pad, and the build below is built for it. */
export function IdeaPrompt({ className = '' }: { className?: string }) {
  const { idea, setIdea } = useIdea();
  const reduce = useReducedMotion() ?? false;
  const [examples, setExamples] = useState<readonly string[]>(IDEA.examples);
  const [focused, setFocused] = useState(false);
  // Shuffled after mount, so the server and first client render match.
  useEffect(() => setExamples(shuffled(IDEA.examples)), []);
  const placeholder = useCyclingPlaceholder(examples, focused || idea.length > 0);
  const build = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) setIdea(placeholder.example);
    document.getElementById(FIRST_BUILD)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  };
  return (
    <div data-beat className={cn(GUTTER, 'relative flex flex-col pb-3 pt-4 md:pb-4 md:pt-6 lg:z-20 lg:w-[40vw] lg:pb-[18vh] lg:pt-14', className)}>
      <p className={cn('order-2 mt-4 max-w-[40ch] md:mt-10 lg:order-none lg:mt-0', TYPE.lead, 'max-md:text-[15px] max-md:leading-[1.45]')}>{TITLES.lede}</p>
      <form onSubmit={build} className="max-w-[560px] lg:mt-8">
        <label htmlFor="zero-idea" className={cn('block', TYPE.small)}>{IDEA.prompt}</label>
        <div className="mt-3 flex bg-[color:var(--z-field)] focus-within:bg-[color:var(--z-field-strong)] focus-within:ring-2 focus-within:ring-[color:var(--z-accent-ink)]">
          <input id="zero-idea" value={idea} onChange={(e) => setIdea(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder={placeholder.text} maxLength={MAX_IDEA} autoComplete="off"
            className={cn('h-14 min-w-0 flex-1 bg-transparent px-4 outline-none placeholder:text-[color:var(--z-soft)]', TYPE.body)} />
          <button type="submit" className={cn(buttonClass('primary'), 'h-14')}>{IDEA.submit}</button>
        </div>
        <Examples examples={examples} />
      </form>
      <a href={siteConfig.calendarUrl} target="_blank" rel="noopener noreferrer" className={cn('order-3 mt-3 md:mt-8 inline-flex items-center gap-1 self-start underline underline-offset-4 hover:text-[color:var(--z-accent-ink)]', TYPE.small, FOCUS)}>
        Or book a free 30-minute call <ArrowUpRight className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}
