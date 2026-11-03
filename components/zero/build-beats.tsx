'use client';

import Link from 'next/link';
import { Reveal } from '@/components/motion/reveal';
import { caseStudies } from '@/content/case-studies';
import { SURFACES } from '@/content/narrative';
import { SHIPPED, TITLES } from '@/content/zero';
import { cn } from '@/lib/utils';
import { fillIdea, useIdea } from './idea-context';
import { Button, FOCUS, GUTTER, TYPE } from './primitives';

const STAGGER = 0.08;
/** Copy sits in a column left of the pad on desktop; on phones it scrolls under the pinned pad band. */
const COLUMN = cn(GUTTER, 'relative lg:z-20 lg:w-[40vw]');
const titleOf = (slug: string) => caseStudies.find((c) => c.slug === slug)?.title ?? slug;

export function BuildIntro() {
  return (
    <div className={cn(COLUMN, 'py-16 lg:py-[22vh]')}>
      <Reveal><h2 id="zero-build" className={TYPE.head}>{TITLES.build.title}</h2></Reveal>
      <Reveal delay={STAGGER}><p className={cn('mt-6 max-w-[36ch]', TYPE.lead)}>{TITLES.build.sub}</p></Reveal>
    </div>
  );
}

function Proof({ slugs }: { slugs: string[] }) {
  return (
    <p className={cn('mt-8 text-[color:var(--z-soft)]', TYPE.small)}>
      Shipped:{' '}
      {slugs.map((slug, i) => (
        <span key={slug}>
          {i > 0 && ', '}
          <Link href={`/work/${slug}`} className={cn('text-[color:var(--z-ink)] underline decoration-[color:var(--z-soft)] underline-offset-4 hover:decoration-[color:var(--z-accent-ink)]', FOCUS)}>{titleOf(slug)}</Link>
        </span>
      ))}
    </p>
  );
}

/** One surface, read while its sketch stands up on the pad. */
export function SurfaceBeat({ surface }: { surface: (typeof SURFACES)[number] }) {
  return (
    <article id={`beat-${surface.id}`} data-beat className={cn(COLUMN, 'flex min-h-[56svh] flex-col justify-center py-12 lg:min-h-[100svh] lg:py-0')}>
      <Reveal><h3 className={TYPE.head}>{surface.name}</h3></Reveal>
      <Reveal delay={STAGGER}><p className={cn('mt-6 max-w-[40ch]', TYPE.lead)}>{surface.body}</p></Reveal>
      <Reveal delay={STAGGER * 2}>
        <Proof slugs={surface.proof} />
        <p className={cn('mt-2 text-[color:var(--z-soft)]', TYPE.small)}>{surface.stack.join(' · ')}</p>
      </Reveal>
    </article>
  );
}

/** The peak's caption: everything the pad sketched is standing, wired and live. */
export function ShippedBeat() {
  const { name, slug } = useIdea();
  return (
    <div data-beat className={cn(COLUMN, 'flex min-h-[70svh] flex-col justify-center pb-16 pt-[24svh] lg:min-h-[150vh] lg:pt-[40vh]')}>
      <Reveal><p className={cn(TYPE.mega, 'lg:text-[8.6vw]')} aria-hidden>{SHIPPED.title}</p></Reveal>
      <Reveal delay={STAGGER}><p className={cn('mt-8 max-w-[38ch]', TYPE.lead)}>{fillIdea(SHIPPED.sub, { name, slug })}</p></Reveal>
      <Reveal delay={STAGGER * 2} className="mt-10"><Button href="#work">See what I’ve shipped</Button></Reveal>
    </div>
  );
}
