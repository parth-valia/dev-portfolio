'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { Reveal } from '@/components/motion/reveal';
import { blogPosts } from '@/content/blog';
import { NOTES } from '@/content/narrative';
import { TITLES } from '@/content/zero';
import { cn, fill } from '@/lib/utils';
import { FOCUS, GUTTER, SECTION, TYPE } from './primitives';

const POSTS = NOTES.flatMap((slug) => blogPosts.filter((p) => p.slug === slug));
const DATE: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
const NOTE_TILTS = [-2.5, 1.5, -1];
/** How far a note swings in before it sticks to the board, scrubbed by scroll. */
const SWING = { y: 140, turn: 10 };
const LEAN_DEG = 9;
const PERSPECTIVE = 900;
const SPRING = { stiffness: 180, damping: 16 };
const STILL = 'motion-reduce:![transform:none]';

/** Swings the note down from above its resting tilt and sticks it flat on the board by the time it reaches mid-screen. */
function useStick(note: React.RefObject<HTMLElement>, tilt: number) {
  const { scrollYProgress } = useScroll({ target: note, offset: ['start end', 'start 0.55'] });
  const y = useTransform(scrollYProgress, [0, 1], [SWING.y, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [tilt + Math.sign(tilt) * SWING.turn, tilt]);
  return { y, rotate };
}

/** Mouse only: the note leans toward the cursor like paper pressed at that spot, then springs back flat. */
function useLean() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-LEAN_DEG, LEAN_DEG]), SPRING);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [LEAN_DEG, -LEAN_DEG]), SPRING);
  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - box.left) / box.width - 0.5);
    y.set((event.clientY - box.top) / box.height - 0.5);
  };
  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };
  return { style: { rotateX, rotateY, transformPerspective: PERSPECTIVE }, handlers: { onPointerMove, onPointerLeave } };
}

/** One post as a soft green note stuck to the board. */
function Note({ post, tilt }: { post: (typeof POSTS)[number]; tilt: number }) {
  const item = useRef<HTMLLIElement>(null);
  const stick = useStick(item, tilt);
  const lean = useLean();
  return (
    <motion.li ref={item} style={stick} className={STILL}>
      <Link href={`/blog/${post.slug}`} {...lean.handlers} className={cn('group block h-full', FOCUS)}>
        <motion.span style={lean.style}
          className={cn('zero-card flex h-full flex-col p-4 transition-shadow duration-300 group-hover:shadow-[0_30px_50px_-24px_var(--z-shadow)] md:p-5', STILL)}>
          <span className="relative mb-5 block aspect-[3/2] overflow-hidden rounded-[12px] bg-[color:var(--z-accent)]">
            <Image src={post.coverImage} alt="" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-contain transition-transform duration-500 group-hover:scale-[1.03]" />
          </span>
          <span className="flex flex-1 flex-col px-2 pb-3">
            <span className={cn('tabular-nums text-[color:var(--z-soft)]', TYPE.small)}>{new Date(post.date).toLocaleDateString('en-US', DATE)} · {post.readTime}</span>
            <span className={cn('mt-4 flex items-start justify-between gap-3 font-semibold', TYPE.lead)}>
              {post.title}<ArrowUpRight className="mt-1 h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </span>
            <span className={cn('mt-6 block text-[color:var(--z-soft)]', TYPE.body)}>{post.excerpt}</span>
          </span>
        </motion.span>
      </Link>
    </motion.li>
  );
}

/** What shipping taught me: three notes that swing onto the board as you reach them and lean under the cursor. */
export function Notes() {
  return (
    <section id="notes" aria-labelledby="zero-notes" className={cn(GUTTER, SECTION, 'overflow-clip bg-[color:var(--z-field)]')}>
      <Reveal><h2 id="zero-notes" className={TYPE.head}>{TITLES.notes.title}</h2></Reveal>
      <Reveal delay={0.08}><p className={cn('mt-6 max-w-[40ch]', TYPE.lead)}>{TITLES.notes.sub}</p></Reveal>
      <ul className="mt-12 grid gap-10 max-sm:px-3 md:mt-16 lg:grid-cols-3 lg:gap-8">
        {POSTS.map((post, i) => <Note key={post.slug} post={post} tilt={NOTE_TILTS[i % NOTE_TILTS.length]} />)}
      </ul>
      <Link href="/blog" className={cn('mt-12 inline-flex min-h-11 items-center gap-2 underline decoration-[color:var(--z-soft)] underline-offset-4 hover:decoration-[color:var(--z-accent-ink)] md:mt-16', TYPE.lead, FOCUS)}>
        {fill(TITLES.notes.all, { count: blogPosts.length })}<ArrowRight aria-hidden className="h-5 w-5" />
      </Link>
    </section>
  );
}
