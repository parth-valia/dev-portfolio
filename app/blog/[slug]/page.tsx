import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Reveal } from '@/components/motion/reveal';
import { Markdown } from '@/components/ui/markdown';
import { ClosingAsk } from '@/components/zero/closing-ask';
import { NextCard } from '@/components/zero/next-card';
import { GUTTER, TYPE } from '@/components/zero/primitives';
import { ZeroPageShell } from '@/components/zero/zero-page-shell';
import { blogPosts } from '@/content/blog';
import { ASK } from '@/content/zero';
import { siteConfig } from '@/site.config';
import { breadcrumbs, byParth, jsonLd } from '@/lib/structured-data';
import { cn } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

const DATE: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' };
const ALL_POSTS = { href: '/blog', label: 'All posts' };
/** The cover runs full width as a low band; its lime ground fills the band around the art. */
const COVER_BAND = 'aspect-[3/2] md:aspect-[21/9]';

const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

function nextPost(slug: string) {
  const i = blogPosts.findIndex((p) => p.slug === slug);
  return blogPosts[(i + 1) % blogPosts.length];
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: 'Post' };
  const path = `/blog/${post.slug}`;
  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: path },
    openGraph: { type: 'article', url: path, title: post.title, description: post.excerpt, publishedTime: post.date, authors: [siteConfig.name], tags: post.tags, images: [post.coverImage] },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt, images: [post.coverImage] },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const next = nextPost(post.slug);
  return (
    <ZeroPageShell back={ALL_POSTS}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([
        { '@type': 'BlogPosting', headline: post.title, description: post.excerpt, datePublished: post.date, image: `${siteConfig.url}${post.coverImage}`, keywords: post.tags.join(', '), url: `${siteConfig.url}/blog/${post.slug}`, ...byParth },
        breadcrumbs([{ name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }]),
      ]) }} />
      <article className={cn(GUTTER, 'pb-16 pt-6 md:pb-24 md:pt-20')}>
        <Reveal>
          <p className={cn('text-[color:var(--z-accent-ink)]', TYPE.small)}>{post.category}</p>
          <h1 className={cn('mt-3 max-w-[30ch] md:mt-4', TYPE.head)}>{post.title}</h1>
          <p className={cn('mt-5 max-w-[72ch] text-[color:var(--z-soft)] md:mt-8', TYPE.lead)}>{post.excerpt}</p>
        </Reveal>
        <div className={cn('relative mt-10 overflow-hidden rounded-[20px] bg-[color:var(--z-accent)] md:mt-14 md:rounded-[24px]', COVER_BAND)}>
          <Image src={post.coverImage} alt="" fill priority sizes="100vw" className="object-contain" />
        </div>
        <div className="mt-8 border-t border-[color:var(--z-field-strong)] pt-6 md:mt-16 md:grid md:grid-cols-[1fr_2fr] md:gap-10 md:pt-10">
          <aside className={cn('tabular-nums text-[color:var(--z-soft)] md:sticky md:top-28 md:self-start', TYPE.small)}>
            <p>{new Date(post.date).toLocaleDateString('en-US', DATE)} · {post.readTime}</p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Topics">
              {post.tags.map((tag) => <li key={tag} className="bg-[color:var(--z-field)] px-2.5 py-1">{tag}</li>)}
            </ul>
          </aside>
          <Markdown content={post.content} className="zero-note mt-10 md:mt-0" />
        </div>
        <div className="mt-12 grid gap-4 md:mt-24">
          <ClosingAsk title={ASK.post.title} sub={ASK.post.sub} />
          <NextCard href={`/blog/${next.slug}`} label="Next post" title={next.title} />
        </div>
      </article>
    </ZeroPageShell>
  );
}
