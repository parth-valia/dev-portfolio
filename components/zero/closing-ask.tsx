import { ASK } from '@/content/zero';
import { siteConfig } from '@/site.config';
import { cn } from '@/lib/utils';
import { Button, TYPE } from './primitives';

/** The ask at the end of a post or a case study, where a reader is most convinced: one line and the call. */
export function ClosingAsk({ title, sub }: { title: string; sub: string }) {
  return (
    <aside className="flex flex-col gap-6 bg-[color:var(--z-field)] p-6 md:flex-row md:items-center md:justify-between md:p-12">
      <div>
        <p className={cn(TYPE.head, 'max-md:text-[28px]')}>{title}</p>
        <p className={cn('mt-3 max-w-[48ch] text-[color:var(--z-soft)]', TYPE.body)}>{sub}</p>
      </div>
      <Button href={siteConfig.calendarUrl} external>{ASK.cta}</Button>
    </aside>
  );
}
