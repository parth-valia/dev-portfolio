'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

/** Flips between the site's light and dark theme. Renders an empty slot until mounted, since the saved theme is unknown on the server. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const next = resolvedTheme === 'dark' ? 'light' : 'dark';
  const Icon = resolvedTheme === 'dark' ? Sun : Moon;
  return (
    <button type="button" onClick={() => setTheme(next)} aria-label={mounted ? `Switch to ${next} theme` : 'Switch theme'} className={cn('inline-grid h-10 w-10 place-items-center', className)}>
      {mounted && <Icon aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.75} />}
    </button>
  );
}
