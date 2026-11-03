import { blogPosts } from '@/content/blog';
import { caseStudies } from '@/content/case-studies';
import { experience } from '@/content/experience';
import { POSITIONING } from '@/content/narrative';
import { FAQ, SEO } from '@/content/zero';
import { siteConfig } from '@/site.config';

/** A plain summary for AI assistants (llms.txt), built from the site's own content so it never drifts. */
function summary() {
  const url = siteConfig.url;
  return [
    `# ${siteConfig.name}`,
    `> ${POSITIONING.short} ${POSITIONING.location}. ${POSITIONING.availability}.`,
    '',
    SEO.description,
    '',
    '## Services',
    ...SEO.services.map((s) => `- ${s}`),
    '',
    '## Who it is for',
    '- Startup founders with an idea and no technical co-founder',
    '- Founders whose build stalled or whose developer disappeared',
    '- Founders with an MVP that breaks under real users',
    '- Founders with a vibe-coded prototype (Lovable, Bolt, v0, Replit) that must go to production',
    '',
    '## Shipped work',
    ...caseStudies.map((c) => `- [${c.title}](${url}/work/${c.slug}): ${c.category}. ${c.outcomeMetric} ${c.outcomeLabel}.`),
    '',
    '## Experience',
    ...experience.map((e) => `- ${e.role}, ${e.company} (${e.period}, ${e.location})`),
    '',
    '## Questions founders ask',
    ...FAQ.flatMap((f) => [`### ${f.q}`, f.a, '']),
    '## Writing',
    ...blogPosts.map((p) => `- [${p.title}](${url}/blog/${p.slug}): ${p.excerpt}`),
    '',
    '## Contact',
    `- Book a free 30-minute call: ${siteConfig.calendarUrl}`,
    `- Email: ${siteConfig.email}`,
    ...Object.entries(siteConfig.social).map(([name, href]) => `- ${name}: ${href}`),
    '',
  ].join('\n');
}

export function GET() {
  return new Response(summary(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
