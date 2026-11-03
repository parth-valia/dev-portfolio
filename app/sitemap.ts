import type { MetadataRoute } from 'next';
import { blogPosts } from '@/content/blog';
import { caseStudies } from '@/content/case-studies';
import { siteConfig } from '@/site.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteConfig.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteConfig.url}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ...caseStudies.map((study) => ({ url: `${siteConfig.url}/work/${study.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...blogPosts.map((post) => ({ url: `${siteConfig.url}/blog/${post.slug}`, lastModified: new Date(post.date), changeFrequency: 'yearly' as const, priority: 0.7 })),
  ];
}
