'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { TITLES } from '@/content/zero';
import { siteConfig } from '@/site.config';
import { cn } from '@/lib/utils';
import { FOCUS, GUTTER, SECTION, TYPE } from './primitives';

type Day = { date: string; count: number; level: number };
type Stats = { total: number; activeDays: number; best: number; currentStreak: number };
type Payload = { contributions: Day[]; stats: Stats };

const ENDPOINT = '/api/github-calendar';
const COPY = TITLES.activity;
const DAYS_IN_WEEK = 7;
const WEEKS_SHOWN = 53;
const HEAT = ['bg-[color:var(--z-field-strong)]', 'bg-[color:var(--z-heat-1)]', 'bg-[color:var(--z-heat-2)]', 'bg-[color:var(--z-heat-3)]', 'bg-[color:var(--z-heat-4)]'];
/** Each week's squares light a beat after the one before, left to right. */
const WEEK_DELAY_MS = 14;
const STAT_KEYS = ['activeDays', 'best', 'currentStreak'] as const;
const GRID = 'grid min-w-[760px] gap-[3px] md:gap-1';
const CELL = 'aspect-square rounded-[2px]';
const LABEL = 'whitespace-nowrap text-[11px] font-semibold leading-none text-[color:var(--z-soft)] md:text-[12px]';
/** Like GitHub, a month too close to the right edge to fit its name goes unlabelled. */
const MONTH_MIN_WEEKS = 3;
const MONTH: Intl.DateTimeFormatOptions = { month: 'short', timeZone: 'UTC' };
/** A weekday label column, then one column per week; a month row above seven weekday rows. */
const gridFor = (weeks: number) => ({ gridTemplateColumns: `auto repeat(${weeks}, minmax(0, 1fr))`, gridTemplateRows: 'auto repeat(7, auto)' });
const at = (week: number, day: number) => ({ gridColumn: week + 2, gridRow: day + 2 });

function useContributions() {
  const [data, setData] = useState<Payload | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let alive = true;
    fetch(ENDPOINT)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((json: Payload) => alive && setData(json))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);
  return { data, failed };
}

/** The year as GitHub draws it: one column per week, Sunday on top, each day on its own weekday row. */
function weeksOf(days: Day[]) {
  const padded: (Day | null)[] = [...Array(new Date(days[0].date).getUTCDay()).fill(null), ...days];
  return Array.from({ length: Math.ceil(padded.length / DAYS_IN_WEEK) }, (_, w) => padded.slice(w * DAYS_IN_WEEK, (w + 1) * DAYS_IN_WEEK));
}

/** A month's short name over the first week that starts in it. */
function monthLabels(weeks: (Day | null)[][]) {
  return weeks.flatMap((week, w) => {
    const first = week.find(Boolean);
    const prev = weeks[w - 1]?.find(Boolean);
    if (!first || w > weeks.length - MONTH_MIN_WEEKS) return [];
    const month = new Date(first.date).toLocaleDateString('en-US', MONTH);
    return prev && new Date(prev.date).toLocaleDateString('en-US', MONTH) === month ? [] : [{ w, month }];
  });
}

function Weekdays() {
  return COPY.weekdays.map(([day, label]) => <span key={label} style={{ gridColumn: 1, gridRow: day + 2 }} className={cn(LABEL, 'self-center pr-1')}>{label}</span>);
}

/** The grid while the calendar loads: the same squares, breathing. */
function GridSkeleton() {
  return (
    <div aria-hidden className={GRID} style={gridFor(WEEKS_SHOWN)}>
      <Weekdays />
      {Array.from({ length: WEEKS_SHOWN * DAYS_IN_WEEK }, (_, i) => (
        <span key={i} style={at(Math.floor(i / DAYS_IN_WEEK), i % DAYS_IN_WEEK)} className={cn(CELL, HEAT[0], 'motion-safe:animate-pulse')} />
      ))}
    </div>
  );
}

function Calendar({ days }: { days: Day[] }) {
  const grid = useRef<HTMLDivElement>(null);
  const shown = useInView(grid, { once: true, margin: '0px 0px -10% 0px' });
  const weeks = weeksOf(days);
  return (
    <div ref={grid} role="img" aria-label={`${days.reduce((sum, d) => sum + d.count, 0)} ${COPY.total}`} className={GRID} style={gridFor(weeks.length)}>
      {monthLabels(weeks).map(({ w, month }) => <span key={`${w}-${month}`} style={{ gridColumn: w + 2, gridRow: 1 }} className={cn(LABEL, 'pb-1')}>{month}</span>)}
      <Weekdays />
      {weeks.flatMap((week, w) => week.map((day, d) => day && (
        <span key={day.date} title={`${day.count} on ${day.date}`} style={{ ...at(w, d), transitionDelay: `${w * WEEK_DELAY_MS}ms` }}
          className={cn(CELL, HEAT[day.level], 'transition-[opacity,transform] duration-500', shown ? 'scale-100 opacity-100' : 'scale-50 opacity-0')} />
      )))}
    </div>
  );
}

function Legend() {
  return (
    <p aria-hidden className={cn('flex items-center gap-1.5 text-[color:var(--z-soft)]', TYPE.small)}>
      {COPY.less}
      {HEAT.map((heat) => <span key={heat} className={cn('h-3 w-3 rounded-[2px]', heat)} />)}
      {COPY.more}
    </p>
  );
}

/** Proof of the habit: a year of commits as a lime heat map, with the year's total set large beside the heading. */
export function Activity() {
  const { data, failed } = useContributions();
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scroller.current) scroller.current.scrollLeft = scroller.current.scrollWidth;
  }, [data]);
  return (
    <section id="activity" aria-labelledby="zero-activity" className={cn(GUTTER, SECTION)}>
      <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <Reveal><h2 id="zero-activity" className={TYPE.head}>{COPY.title}</h2></Reveal>
          <Reveal delay={0.08}><p className={cn('mt-6 max-w-[40ch]', TYPE.lead)}>{COPY.sub}</p></Reveal>
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className={cn('mt-6 inline-flex min-h-11 items-center gap-1 underline decoration-[color:var(--z-soft)] underline-offset-4 hover:decoration-[color:var(--z-accent-ink)]', TYPE.small, FOCUS)}>
            {COPY.profile}<ArrowUpRight aria-hidden className="h-4 w-4" />
          </a>
        </div>
        <Reveal delay={0.12} className="lg:self-end">
          <p className={cn(TYPE.mega, 'tabular-nums text-[color:var(--z-accent-ink)]')}>{data ? data.stats.total.toLocaleString('en-US') : '–'}</p>
          <p className={cn('mt-3', TYPE.lead)}>{COPY.total}</p>
          <dl className="mt-8 grid grid-cols-3 gap-4">
            {STAT_KEYS.map((key) => (
              <div key={key} className="flex flex-col-reverse justify-end gap-2">
                <dt className={cn('text-[color:var(--z-soft)]', TYPE.small)}>{COPY.stats[key]}</dt>
                <dd className={cn(TYPE.head, 'tabular-nums')}>{data ? data.stats[key] : '–'}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
      <div ref={scroller} data-lenis-prevent tabIndex={0} role="region" aria-label={COPY.calendar} className={cn('mt-14 overflow-x-auto pb-2 md:mt-20', FOCUS)}>
        {data ? <Calendar days={data.contributions} /> : <GridSkeleton />}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className={cn('text-[color:var(--z-soft)]', TYPE.small)}>{failed ? COPY.failed : null}</p>
        <Legend />
      </div>
    </section>
  );
}
