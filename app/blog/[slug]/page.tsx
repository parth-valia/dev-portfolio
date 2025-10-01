import { notFound } from 'next/navigation';
import { blogPosts } from '@/content/blog';
import BlogDetailClient from './blog-detail-client';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default function BlogDetailPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return <BlogDetailClient post={post} />;
}


