import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FOCUS, TYPE } from './primitives';

/** The lime note at the foot of an inner page that leads on to the next one. */
export function NextCard({ href, label, title }: { href: string; label: string; title: string }) {
  return (
    <Link href={href} className={cn('zero-paper group flex items-center justify-between gap-6 p-6 md:p-12', FOCUS)}>
      <span><span className={cn('block', TYPE.small)}>{label}</span><span className={cn('mt-3 block', TYPE.head, 'max-md:text-[28px]')}>{title}</span></span>
      <ArrowRight className="h-8 w-8 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}
