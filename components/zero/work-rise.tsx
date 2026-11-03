'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from 'framer-motion';
import type { CaseStudy } from '@/content/case-studies';
import { TITLES } from '@/content/zero';
import { cn } from '@/lib/utils';
import { FOCUS, GUTTER, TYPE } from './primitives';

/** The heading parts over the first part of the run; each product then takes RISE of it to pass through the gap; the halves close again over the last part. */
const PART_BY = 0.1;
const RISE = { start: 0.05, step: 0.2, length: 0.24 };
const CLOSE_FROM = 0.9;
/** Cards stand up on a bottom hinge like the pad's pop-ups: lying back on the way in, upright in the gap, tipping forward on the way out. */
const HINGE = { in: 72, out: -48 };
const TWIST = [-3, 2.5, -2, 3];
const TRAVEL_VH = 70;
const WIDE = '(min-width: 768px)';
/** On wide screens the halves keep a word space between them when closed. */
const CLOSED_SPACE_EM = 0.25;
const PERSPECTIVE = 1200;
/** Where the first product rests in the gap: links to #work land here instead of on the empty opening frame. */
const FIRST_CARD = 'top-[62vh]';

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
/** Quick at the edges, slow in the middle, so each product rests in the gap long enough to read. */
const dwell = (t: number) => 4 * (t - 0.5) ** 3 + 0.5;

function useRise(progress: MotionValue<number>, index: number) {
  const t = useTransform(progress, (p) => dwell(clamp01((p - RISE.start - index * RISE.step) / RISE.length)));
  return {
    y: useTransform(t, (v) => `${(0.5 - v) * 2 * TRAVEL_VH}svh`),
    rotateX: useTransform(t, (v) => (v < 0.5 ? HINGE.in * (1 - v * 2) : HINGE.out * (v - 0.5) * 2)),
    rotateZ: useTransform(t, (v) => TWIST[index % TWIST.length] * Math.abs(v - 0.5) * 2),
    filter: useTransform(t, (v) => `grayscale(${clamp01(Math.abs(v - 0.5) * 5)})`),
    opacity: useTransform(t, [0, 0.04, 0.96, 1], [0, 1, 1, 0]),
  };
}

/** A product shot on a dark mount with its name and headline result; `filter` drains and restores its colour. */
export function ProductCard({ study, filter }: { study: CaseStudy; filter?: MotionValue<string> }) {
  return (
    <Link href={`/work/${study.slug}`} className={cn('pointer-events-auto group relative block rounded-[20px] bg-[color:var(--z-field)] p-3 md:rounded-[24px] md:p-4', FOCUS)}>
      <motion.span style={{ filter }} className="relative block aspect-[16/9] overflow-hidden rounded-[12px] bg-[color:var(--z-screen)] md:rounded-[14px]">
        {study.coverImage && <Image src={study.coverImage} alt={`${study.title} product screens`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />}
      </motion.span>
      <span className="flex flex-col gap-1 px-1 pb-1 pt-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <span className={cn('font-semibold group-hover:text-[color:var(--z-accent-ink)]', TYPE.lead)}>{study.title}</span>
        <span className={cn('text-[color:var(--z-accent-ink)] sm:text-right', TYPE.small)}>{study.outcomeMetric}</span>
      </span>
    </Link>
  );
}

function RisingProduct({ study, index, progress }: { study: CaseStudy; index: number; progress: MotionValue<number> }) {
  const { y, rotateX, rotateZ, filter, opacity } = useRise(progress, index);
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 w-[calc(100%-32px)] max-w-[520px] -translate-x-1/2 -translate-y-1/2 md:w-[min(60vw,680px)] md:max-w-none lg:w-[min(40vw,680px)]">
      <motion.div style={{ y, rotateX, rotateZ, opacity, transformPerspective: PERSPECTIVE, transformOrigin: '50% 100%' }}>
        <ProductCard study={study} filter={filter} />
      </motion.div>
    </div>
  );
}

/** How far each half of the heading sits from its closed position: halves meet sideways on wide screens and vertically on phones. */
function useClosedShift(heading: React.RefObject<HTMLElement>, first: React.RefObject<HTMLElement>, second: React.RefObject<HTMLElement>) {
  const shift = useMotionValue(0);
  const wide = useMotionValue(1);
  useEffect(() => {
    const [el, a, b] = [heading.current, first.current, second.current];
    if (!el || !a || !b) return undefined;
    const measure = () => {
      const isWide = window.matchMedia(WIDE).matches;
      const style = getComputedStyle(el);
      const inner = el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const gap = isWide ? inner - a.offsetWidth - b.offsetWidth - parseFloat(style.fontSize) * CLOSED_SPACE_EM : el.clientHeight - a.offsetHeight - b.offsetHeight;
      shift.set(Math.max(gap, 0) / 2);
      wide.set(isWide ? 1 : 0);
    };
    const observer = new ResizeObserver(measure);
    [el, a, b].forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [heading, first, second, shift, wide]);
  return { shift, wide };
}

/** The heading starts as one line, then pulls apart sideways; the shipped products stand up through the gap one at a time, colour arriving as they pass the middle; then it closes back into one line. */
export function WorkRise({ studies }: { studies: CaseStudy[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const a = useRef<HTMLSpanElement>(null);
  const b = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start start', 'end end'] });
  const { shift, wide } = useClosedShift(heading, a, b);
  const closed = useTransform([scrollYProgress, shift], ([p, s]: number[]) => s * (1 - clamp01(p / PART_BY) * (1 - clamp01((p - CLOSE_FROM) / (1 - CLOSE_FROM)))));
  const ax = useTransform([closed, wide], ([c, w]: number[]) => c * w);
  const ay = useTransform([closed, wide], ([c, w]: number[]) => c * (1 - w));
  const bx = useTransform(ax, (v) => -v);
  const by = useTransform(ay, (v) => -v);
  return (
    <div ref={stage} className="relative h-[460vh]">
      <span id="work" aria-hidden className={cn('absolute inset-x-0', FIRST_CARD)} />
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <h2 ref={heading} id="zero-work" className={cn(GUTTER, TYPE.split, 'pointer-events-none absolute inset-x-0 inset-y-6 z-10 flex flex-col justify-between md:inset-y-0 md:flex-row md:items-center')}>
          <motion.span ref={a} style={{ x: ax, y: ay }} className="self-start bg-[color:var(--z-bg)] md:self-auto">{TITLES.work.first}</motion.span>
          <motion.span ref={b} style={{ x: bx, y: by }} className="self-end bg-[color:var(--z-bg)] text-right md:max-w-[4.6em] md:self-auto">{TITLES.work.second}</motion.span>
        </h2>
        {studies.map((study, i) => <RisingProduct key={study.slug} study={study} index={i} progress={scrollYProgress} />)}
      </div>
    </div>
  );
}
