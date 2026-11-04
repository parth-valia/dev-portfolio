import type { Metadata } from 'next';
import { unstable_getImgProps as getImgProps } from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { ClosingAsk } from '@/components/zero/closing-ask';
import { NextCard } from '@/components/zero/next-card';
import { ASK } from '@/content/zero';
import { FOCUS, GUTTER, SECTION, TYPE } from '@/components/zero/primitives';
import { ZeroPageShell } from '@/components/zero/zero-page-shell';
import { siteConfig } from '@/site.config';
import { breadcrumbs, byParth, jsonLd } from '@/lib/structured-data';
import { cn } from '@/lib/utils';
import { adjacentCaseStudies, caseStudySlugs, getCaseStudy } from '@/lib/case-study';

interface Props {
  params: { slug: string };
}

/** The same frame as a blog cover: 3:2 on phones with the original cover, 21:9 on desktop with its extended version. */
const COVER_BAND = 'aspect-[3/2] md:aspect-[21/9]';
/** Tailwind's md breakpoint, where the wide cover takes over. */
const DESKTOP = '(min-width: 768px)';

/** One art-directed picture, so each viewport downloads only its own cover. */
function Cover({ alt, phone, desktop }: { alt: string; phone: string; desktop: string }) {
  const common = { alt, fill: true, priority: true, sizes: '100vw' };
  const { props: wide } = getImgProps({ ...common, src: desktop });
  const { props } = getImgProps({ ...common, src: phone });
  return (
    <picture>
      <source media={DESKTOP} srcSet={wide.srcSet ?? wide.src} />
      <img {...props} alt={alt} className="object-cover" />
    </picture>
  );
}

export const generateStaticParams = caseStudySlugs;

export function generateMetadata({ params }: Props): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return { title: 'Case study' };
  const path = `/work/${study.slug}`;
  const title = `${study.title}: ${study.category} built by ${siteConfig.name}`;
  const description = `${study.outcomeMetric} ${study.outcomeLabel}. ${study.built}`;
  return {
    title,
    description,
    keywords: [...study.stack, study.category],
    alternates: { canonical: path },
    openGraph: { type: 'article', url: path, title, description, images: study.coverImage ? [study.coverImage] : undefined },
    twitter: { card: 'summary_large_image', title, description, images: study.coverImage ? [study.coverImage] : undefined },
  };
}

function Part({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-3 py-6 md:grid-cols-[1fr_2fr] md:gap-10 md:py-10">
      <h2 className={cn('font-semibold', TYPE.lead)}>{title}</h2>
      <div className={TYPE.body}>{children}</div>
    </Reveal>
  );
}

/** The detail under the summary: a tighter, marked list so it reads as the parts, not a second telling. */
function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-3 border-t border-[color:var(--z-field-strong)] pt-5">
      {items.map((h) => (
        <li key={h} className="flex gap-3 leading-[1.4] text-[color:var(--z-soft)]">
          <span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 bg-[color:var(--z-accent-ink)]" aria-hidden />{h}
        </li>
      ))}
    </ul>
  );
}

export default function ZeroCaseStudyPage({ params }: Props) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();
  const { next } = adjacentCaseStudies(study.slug);
  return (
    <ZeroPageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([
        { '@type': 'CreativeWork', name: study.title, about: study.category, description: study.built, abstract: study.outcome, audience: { '@type': 'Audience', audienceType: study.audience }, keywords: study.stack.join(', '), image: study.coverImage && `${siteConfig.url}${study.coverImage}`, url: `${siteConfig.url}/work/${study.slug}`, ...byParth },
        breadcrumbs([{ name: 'Work', path: '/#work' }, { name: study.title, path: `/work/${study.slug}` }]),
      ]) }} />
      <article className={cn(GUTTER, 'pb-16 pt-6 md:pb-24 md:pt-20')}>
        <Reveal>
          <p className={cn('text-[color:var(--z-soft)]', TYPE.small)}>{study.category}</p>
          <h1 className={cn('mt-3 md:mt-4', TYPE.mega)}>{study.title}</h1>
          <p className={cn('mt-5 max-w-[44ch] md:mt-8', TYPE.lead)}><span className="font-semibold text-[color:var(--z-accent-ink)]">{study.outcomeMetric}</span> {study.outcomeLabel}</p>
        </Reveal>
        {study.coverImage && (
          <Reveal className={cn('relative mt-10 overflow-hidden rounded-[20px] md:mt-14 md:rounded-[24px]', COVER_BAND)}>
            <Cover alt={`${study.title} product screens`} phone={study.coverImage} desktop={study.coverWide ?? study.coverImage} />
          </Reveal>
        )}
        <div className={cn('max-w-[1200px]', SECTION, 'py-8')}>
          <Part title="The problem">{study.problem}</Part>
          <Part title="What I built">
            <p>{study.built}</p>
            {study.highlights && <Highlights items={study.highlights} />}
          </Part>
          <Part title="The outcome">{study.outcome}</Part>
          <Part title="Stack">
            <p>{study.stack.join('\u00a0· ')}</p>
            {study.storeLinks.length > 0 && (
              <p className="mt-5 flex flex-wrap gap-x-6 gap-y-3 md:mt-6">
                {study.storeLinks.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={cn('inline-flex items-center gap-1 underline underline-offset-4', TYPE.small, FOCUS)}>{l.label} <ArrowUpRight className="h-4 w-4" aria-hidden /></a>)}
              </p>
            )}
          </Part>
        </div>
        <div className="grid gap-4">
          <ClosingAsk title={ASK.work.title} sub={ASK.work.sub} />
          <NextCard href={`/work/${next.slug}`} label="Next build" title={next.title} />
        </div>
      </article>
    </ZeroPageShell>
  );
}
