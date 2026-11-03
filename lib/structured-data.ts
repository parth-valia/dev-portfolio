import { siteConfig } from '@/site.config';

const PERSON_ID = `${siteConfig.url}/#person`;

/** The trail a search result shows above the title: Home, the section, the page. */
export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: `${siteConfig.url}${item.path}` })),
  };
}

/** A page written or built by Parth, tied to the one Person entity on the home page. */
export const byParth = { author: { '@id': PERSON_ID }, publisher: { '@id': PERSON_ID } };

export const jsonLd = (graph: object[]) => JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
