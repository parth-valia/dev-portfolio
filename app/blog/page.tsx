import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/reveal';
import { PostCard } from '@/components/zero/post-card';
import { GUTTER, TYPE } from '@/components/zero/primitives';
import { ZeroPageShell } from '@/components/zero/zero-page-shell';
import { blogPosts } from '@/content/blog';
import { TITLES } from '@/content/zero';
import { siteConfig } from '@/site.config';
import { cn } from '@/lib/utils';

const HOME = { href: '/#notes', label: 'Home' };
const [LATEST, ...OLDER] = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

export const metadata: Metadata = {
  title: `${TITLES.notes.title} | ${siteConfig.name}`,
  description: TITLES.notes.index,
  alternates: { canonical: '/blog' },
  openGraph: { url: '/blog', title: `${TITLES.notes.title} | ${siteConfig.name}`, description: TITLES.notes.index },
};

export default function BlogPage() {
  return (
    <ZeroPageShell back={HOME}>
      <div className={cn(GUTTER, 'pb-24 pt-10 md:pb-36 md:pt-20')}>
        <Reveal>
          <h1 className={TYPE.mega}>{TITLES.notes.title}</h1>
          <p className={cn('mt-6 max-w-[48ch] md:mt-8', TYPE.lead)}>{TITLES.notes.index}</p>
        </Reveal>
        <Reveal delay={0.08} className="mt-14 md:mt-20">
          <PostCard post={LATEST} lead />
        </Reveal>
        <ul className="mt-16 grid gap-x-8 gap-y-14 md:mt-24 md:grid-cols-2 lg:grid-cols-3">
          {OLDER.map((post, i) => (
            <li key={post.slug}><Reveal delay={(i % 3) * 0.06}><PostCard post={post} /></Reveal></li>
          ))}
        </ul>
      </div>
    </ZeroPageShell>
  );
}
