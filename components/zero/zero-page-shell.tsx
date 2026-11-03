import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BarActions, StickyBar } from './nav';
import { FOCUS, TYPE } from './primitives';
import { SiteFooter } from './site-footer';

const ALL_WORK = { href: '/#work', label: 'All work' };

/** The frame for the inner pages: the bar with a back link, the page, then the footer. */
export function ZeroPageShell({ children, back = ALL_WORK }: { children: React.ReactNode; back?: { href: string; label: string } }) {
  return (
    <>
      <StickyBar>
        <Link href={back.href} className={cn('inline-flex min-h-11 items-center gap-2 hover:text-[color:var(--z-accent-ink)]', TYPE.small, FOCUS)}><ArrowLeft className="h-4 w-4" aria-hidden /> {back.label}</Link>
        <BarActions />
      </StickyBar>
      <main id="main" className="pt-20">{children}</main>
      <footer className="bg-[color:var(--z-field-strong)] pt-8"><SiteFooter /></footer>
    </>
  );
}
