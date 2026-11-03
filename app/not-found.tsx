import Link from 'next/link';
import { GUTTER, TYPE, buttonClass } from '@/components/zero/primitives';
import { ZeroPageShell } from '@/components/zero/zero-page-shell';
import { LOST } from '@/content/zero';
import { cn } from '@/lib/utils';

const HOME = { href: '/', label: 'Home' };

export default function NotFound() {
  return (
    <ZeroPageShell back={HOME}>
      <div className={cn(GUTTER, 'flex min-h-[70svh] flex-col justify-center py-24')}>
        <h1 className={TYPE.mega}>{LOST.title}</h1>
        <p className={cn('mt-6 max-w-[40ch]', TYPE.lead)}>{LOST.sub}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          {LOST.links.map((link, i) => (
            <Link key={link.href} href={link.href} className={cn(buttonClass('primary'), i > 0 && 'bg-[color:var(--z-field-strong)] text-[color:var(--z-ink)]')}>{link.label}</Link>
          ))}
        </div>
      </div>
    </ZeroPageShell>
  );
}
