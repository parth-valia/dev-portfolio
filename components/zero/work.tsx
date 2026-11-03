'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { caseStudies } from '@/content/case-studies';
import { FEATURED } from '@/content/narrative';
import { TITLES } from '@/content/zero';
import { cn } from '@/lib/utils';
import { FOCUS, GUTTER, SECTION, TYPE } from './primitives';
import { HoverPreview } from './hover-preview';
import { ProductCard, WorkRise } from './work-rise';

const FEATURED_STUDIES = FEATURED.flatMap((slug) => caseStudies.filter((c) => c.slug === slug));
const REST = caseStudies.filter((c) => !FEATURED.includes(c.slug));
const REST_COVERS = REST.flatMap((study) => (study.coverImage ? [study.coverImage] : []));
/** Phones: the list rides up into the pinned frame while the heading closes, instead of after an empty screen. */
const RISE_OVERLAP = 'max-md:-mt-[38svh] max-md:pt-0';

/** The still layout swaps in after hydration, so the server and first client render always match. */
function useStill() {
  const reduce = useReducedMotion();
  const [still, setStill] = useState(false);
  useEffect(() => setStill(Boolean(reduce)), [reduce]);
  return still;
}

/** Without motion: the whole heading, then the products in two columns. */
function StillWork() {
  return (
    <div className={cn(GUTTER, 'pt-24')}>
      <h2 id="zero-work" className={TYPE.split}>{TITLES.work.first} {TITLES.work.second}</h2>
      <ul className="mt-12 grid gap-6 md:grid-cols-2">{FEATURED_STUDIES.map((study) => <li key={study.slug}><ProductCard study={study} /></li>)}</ul>
    </div>
  );
}

/** The rest of the shipped work at one size, a line each; hovering a row brings its product shot to the pointer. */
function MoreWork({ className }: { className?: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  return (
    <div className={cn(GUTTER, SECTION, 'relative', className)}>
      <Reveal><p className={cn('max-w-[36ch]', TYPE.lead)}>{TITLES.work.sub}</p></Reveal>
      <ul className="mt-10" onPointerLeave={() => setPreview(null)}>
        {REST.map((study) => (
          <li key={study.slug}>
            <Link href={`/work/${study.slug}`} onPointerEnter={() => setPreview(study.coverImage ?? null)} className={cn('group grid grid-cols-[1fr_auto] items-baseline gap-x-6 py-4 md:grid-cols-[2fr_2fr_1fr]', FOCUS)}>
              <span className={cn('flex items-center gap-2 transition-colors group-hover:text-[color:var(--z-accent-ink)]', TYPE.lead)}>{study.title}<ArrowUpRight className="h-5 w-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden /></span>
              <span className={cn('hidden text-[color:var(--z-soft)] md:block', TYPE.body)}>{study.category}</span>
              <span className={cn('text-right', TYPE.small)}>{study.outcomeMetric}</span>
            </Link>
          </li>
        ))}
      </ul>
      <HoverPreview images={REST_COVERS} active={preview} />
    </div>
  );
}

/** The proof: the heading tears open and four shipped products stand up through it, then the rest as a list. */
export function Work() {
  const still = useStill();
  return (
    <section id={still ? 'work' : undefined} aria-labelledby="zero-work">
      {still ? <StillWork /> : <WorkRise studies={FEATURED_STUDIES} />}
      <MoreWork className={still ? undefined : RISE_OVERLAP} />
    </section>
  );
}
