'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll } from 'framer-motion';
import { Download } from 'lucide-react';
import { education, experience } from '@/content/experience';
import { TITLES } from '@/content/zero';
import { cn } from '@/lib/utils';
import { EASE, FOCUS, GUTTER, SECTION, TYPE } from './primitives';
import { peelEnd, Redacted } from './redacted';
import { SplitFlap } from './split-flap';
import { useActiveBeat } from './use-active-beat';

const IN_VIEW = { once: true, margin: '0px 0px -15% 0px' } as const;
const CURRENT = 'NOW';
const RESUME = '/resume.pdf';
const RESUME_NAME = 'Parth-Valia-Resume.pdf';

/** A role's years for the board: "2022-2024", or "2025-NOW" while it is still running. */
const yearsOf = (period: string) => {
  const [start, end] = period.match(/\d{4}/g) ?? [];
  return `${start}-${end ?? CURRENT}`;
};
const BOARD = experience.map((job) => yearsOf(job.period));

/** One role at one type size: the company's redaction bars pull away as the row enters, then its outcomes arrive; the row being read is lit. */
function Role({ job, lit }: { job: (typeof experience)[number]; lit: boolean }) {
  const row = useRef<HTMLLIElement>(null);
  const revealed = useInView(row, IN_VIEW);
  const reduce = useReducedMotion() ?? false;
  return (
    <li ref={row} data-beat className={cn('py-8 transition-opacity duration-500 md:py-10 lg:flex lg:min-h-[60svh] lg:flex-col lg:justify-center', lit ? 'opacity-100' : 'opacity-60 motion-reduce:opacity-100')}>
      <div className={cn('grid gap-x-6 gap-y-1 md:grid-cols-2', TYPE.lead)}>
        <h3 className="font-semibold"><Redacted text={job.company} bar="ink" revealed={revealed} /></h3>
        <p>{job.role}</p>
        <p className={cn('mt-1 tabular-nums text-[color:var(--z-soft)] md:col-span-2', TYPE.small)}>{job.period} · {job.location}</p>
      </div>
      <motion.ul className="mt-5 grid gap-x-6 gap-y-3 md:grid-cols-2" initial={{ opacity: 0, y: 12 }} animate={revealed || reduce ? { opacity: 1, y: 0 } : undefined}
        transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE, delay: peelEnd(job.company) }}>
        {job.highlights.map((h) => <li key={h} className={cn('max-w-[60ch] text-[color:var(--z-soft)]', TYPE.body)}>{h}</li>)}
      </motion.ul>
    </li>
  );
}

/** The roles on a rail that fills in the accent as you read down it. */
function Timeline({ active }: { active: number }) {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ['start center', 'end center'] });
  return (
    <ol ref={list} className="relative mt-4 pl-6 md:pl-10 lg:mt-0">
      <span aria-hidden className="absolute inset-y-0 left-0 w-[2px] bg-[color:var(--z-field-strong)]" />
      <motion.span aria-hidden style={{ scaleY: scrollYProgress }} className="absolute inset-y-0 left-0 w-[2px] origin-top bg-[color:var(--z-accent-ink)] motion-reduce:hidden" />
      {experience.map((job, i) => <Role key={`${job.company}-${job.period}`} job={job} lit={i === active} />)}
    </ol>
  );
}

/** Where the degree came from, and the full résumé to take away. */
function Education() {
  return (
    <div className="mt-10 lg:mt-12">
      <p className={cn('text-[color:var(--z-soft)]', TYPE.small)}>{TITLES.experience.education}</p>
      <p className={cn('mt-2 font-semibold', TYPE.lead)}>{education.school}</p>
      <p className={cn('mt-1 text-[color:var(--z-soft)]', TYPE.body)}>{education.degree}</p>
      <p className={cn('mt-1 tabular-nums text-[color:var(--z-soft)]', TYPE.small)}>{education.period} · {education.grade}</p>
      <a href={RESUME} download={RESUME_NAME} className={cn('mt-6 inline-flex min-h-11 items-center gap-2 underline decoration-[color:var(--z-soft)] underline-offset-4 hover:decoration-[color:var(--z-accent-ink)]', TYPE.small, FOCUS)}>
        <Download aria-hidden className="h-4 w-4" />{TITLES.experience.resume}
      </a>
    </div>
  );
}

/**
 * The record: a departure board flips to the years of the role being read while the rail fills beside the list.
 * Desktop pins the heading and board on the left; phones pin just the board over the list.
 */
export function Experience() {
  const root = useRef<HTMLElement>(null);
  const active = Math.min(useActiveBeat(root), experience.length - 1);
  return (
    <section ref={root} id="experience" aria-labelledby="zero-experience" className={cn(GUTTER, SECTION, 'lg:grid lg:grid-cols-[5fr_7fr] lg:gap-16')}>
      <div className="max-lg:contents lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center">
        <h2 id="zero-experience" className={TYPE.head}>{TITLES.experience.title}</h2>
        <p className={cn('mt-6 max-w-[40ch]', TYPE.lead)}>{TITLES.experience.sub}</p>
        <div aria-hidden className="sticky top-0 z-10 -mx-4 mt-10 bg-[color:var(--z-bg)] px-4 py-4 text-[clamp(20px,2.3vw,34px)] md:-mx-8 md:px-8 lg:static lg:mx-0 lg:mt-12 lg:p-0">
          <SplitFlap words={BOARD} index={active} />
        </div>
        <Education />
      </div>
      <Timeline active={active} />
    </section>
  );
}
