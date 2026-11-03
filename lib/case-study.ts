import { caseStudies, type CaseStudy } from '@/content/case-studies';
import { projects } from '@/content/projects';
import type { Project } from '@/lib/types';

export type CaseStudyDetail = CaseStudy & Partial<Pick<Project, 'subtitle' | 'role' | 'timeframe' | 'highlights' | 'features'>> & {
  storeLinks: { label: string; href: string }[];
};

const LINK_LABELS: Record<string, string> = { web: 'Website', appStore: 'App Store', playStore: 'Play Store' };

/** Verified outcome copy from case-studies, enriched with role, timeframe and highlights from projects. */
export function getCaseStudy(slug: string): CaseStudyDetail | undefined {
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return undefined;
  const project = projects.find((p) => p.slug === slug);
  const links = { ...project?.links, ...study.links };
  return {
    ...study,
    subtitle: project?.subtitle,
    role: project?.role,
    timeframe: project?.timeframe,
    highlights: project?.highlights,
    features: project?.features,
    storeLinks: Object.entries(links)
      .filter(([key, href]) => LINK_LABELS[key] && href)
      .map(([key, href]) => ({ label: LINK_LABELS[key], href: href as string })),
  };
}

export const caseStudySlugs = () => caseStudies.map((c) => ({ slug: c.slug }));

export function adjacentCaseStudies(slug: string) {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  return { next: caseStudies[(i + 1) % caseStudies.length], previous: caseStudies[(i - 1 + caseStudies.length) % caseStudies.length] };
}
