import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TITLES } from '@/content/zero';
import type { BlogPost } from '@/lib/types';
import { cn } from '@/lib/utils';
import { FOCUS, TYPE } from './primitives';

const DATE: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' };

/** A post as a card: its cover, then the date, title and summary; `lead` sets the newest one large across the page. */
export function PostCard({ post, lead = false }: { post: BlogPost; lead?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className={cn('group grid gap-5', lead && 'md:grid-cols-[3fr_2fr] md:gap-10', FOCUS)}>
      <span className="relative block aspect-[3/2] overflow-hidden rounded-[20px] bg-[color:var(--z-accent)]">
        <Image src={post.coverImage} alt="" fill sizes={lead ? '(min-width: 768px) 60vw, 100vw' : '(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw'}
          className="object-contain transition-transform duration-700 group-hover:scale-[1.04]" />
      </span>
      <span className={cn('block', lead && 'md:flex md:flex-col md:justify-end md:pb-2')}>
        <span className={cn('flex flex-wrap gap-x-3 tabular-nums text-[color:var(--z-soft)]', TYPE.small)}>
          <span className="text-[color:var(--z-accent-ink)]">{post.category}</span>
          {new Date(post.date).toLocaleDateString('en-US', DATE)} · {post.readTime}
        </span>
        <span className="block">
          <span className={cn('mt-3 block transition-colors group-hover:text-[color:var(--z-accent-ink)]', lead ? 'max-w-[20ch] text-[clamp(28px,3vw,44px)] font-extrabold leading-[1.02] tracking-[-0.035em] [text-wrap:balance]' : cn('font-semibold', TYPE.lead))}>{post.title}</span>
          <span className={cn('mt-3 block text-[color:var(--z-soft)]', TYPE.body, !lead && 'line-clamp-3')}>{post.excerpt}</span>
          {lead && (
            <span className={cn('mt-6 inline-flex items-center gap-2 font-semibold underline decoration-[color:var(--z-soft)] underline-offset-4 group-hover:decoration-[color:var(--z-accent-ink)]', TYPE.body)}>
              {TITLES.notes.read}<ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          )}
        </span>
      </span>
    </Link>
  );
}
