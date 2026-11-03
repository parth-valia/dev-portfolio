import type { Metadata } from 'next';
import { ZeroPage } from '@/components/zero/zero-page';
import { POSITIONING } from '@/content/narrative';
import { FAQ, SEO } from '@/content/zero';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  keywords: SEO.keywords,
  alternates: { canonical: '/' },
  openGraph: { title: SEO.title, description: SEO.description, url: '/', type: 'website' },
  twitter: { card: 'summary_large_image', title: SEO.title, description: SEO.description },
};

const PERSON = {
  '@type': 'Person',
  '@id': `${siteConfig.url}/#person`,
  name: siteConfig.name,
  jobTitle: POSITIONING.role,
  email: siteConfig.email,
  url: siteConfig.url,
  sameAs: Object.values(siteConfig.social),
  knowsAbout: [...SEO.services, 'React Native', 'Next.js', 'Node.js', 'AWS Lambda', 'Fintech', 'KYC/KYB integrations', 'Offline-first apps'],
  address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
};

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    PERSON,
    {
      '@type': 'ProfessionalService',
      name: `${siteConfig.name}, ${POSITIONING.role}`,
      description: SEO.description,
      url: siteConfig.url,
      founder: { '@id': PERSON['@id'] },
      areaServed: 'Worldwide',
      serviceType: SEO.services,
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
    },
  ],
};

export default function ZeroRoute() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} />
      <ZeroPage />
    </>
  );
}
