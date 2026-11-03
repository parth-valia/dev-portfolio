import type { MetadataRoute } from 'next';
import { siteConfig } from '@/site.config';

/** Every crawler is welcome, AI answer engines included, so founders asking an assistant can find Parth. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
