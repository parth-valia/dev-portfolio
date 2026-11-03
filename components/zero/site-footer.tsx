import { POSITIONING } from '@/content/narrative';
import { siteConfig } from '@/site.config';
import { cn } from '@/lib/utils';
import { FOCUS, GUTTER, TYPE } from './primitives';

const SOCIALS = [
  { label: 'GitHub', href: siteConfig.social.github },
  { label: 'LinkedIn', href: siteConfig.social.linkedin },
  { label: 'X', href: siteConfig.social.twitter },
];

/** The last line of every page: the name and place, then where else to find Parth. */
export function SiteFooter() {
  return (
    <div className={cn(GUTTER, 'flex flex-col gap-4 pb-8 md:flex-row md:items-end md:justify-between', TYPE.small)}>
      <p>© {new Date().getFullYear()} {siteConfig.name} · {POSITIONING.location}</p>
      <ul className="flex gap-6">
        {SOCIALS.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className={cn('inline-flex min-h-11 items-center underline underline-offset-4', FOCUS)}>{s.label}</a></li>)}
      </ul>
    </div>
  );
}
