'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { siteConfig } from '@/site.config';
import { MENU, ZERO_NAV } from '@/content/zero';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button, EASE, FOCUS, GUTTER, THEME_BUTTON, TYPE } from './primitives';

/** Within this many pixels of the top the bar always shows and stays clear. */
const TOP_ZONE = 80;
const SLIDE = { duration: 0.35, ease: EASE };

/** A bar pinned to the top that slides away while scrolling down and returns on the first scroll up. */
export function StickyBar({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion() ?? false;
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  useMotionValueEvent(scrollY, 'change', (y) => {
    setAtTop(y < TOP_ZONE);
    setHidden(y >= TOP_ZONE && y > (scrollY.getPrevious() ?? 0));
  });
  return (
    <motion.header onFocusCapture={() => setHidden(false)} animate={{ y: hidden ? '-100%' : '0%' }} transition={reduce ? { duration: 0 } : SLIDE}
      className={cn(GUTTER, 'fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between gap-2 transition-colors duration-300 sm:gap-3 md:gap-6', !atTop && 'bg-[color:var(--z-bg)]')}>
      {children}
    </motion.header>
  );
}

/** The light/dark switch and the one action, at the right of every bar. */
export function BarActions() {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <ThemeToggle className={THEME_BUTTON} />
      <Button href={siteConfig.calendarUrl} external>Book a call</Button>
    </div>
  );
}

/** Phones: the section links open as a sheet under the bar, and close on the first pick. */
function PhoneMenu() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return undefined;
    const root = document.documentElement;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggle.current?.focus();
    };
    root.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);
  return (
    <div className="md:hidden">
      <button ref={toggle} type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="zero-phone-menu" aria-label={open ? MENU.close : MENU.open} className={cn(THEME_BUTTON, 'inline-grid place-items-center')}>
        {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
      </button>
      {open && (
        <nav id="zero-phone-menu" data-lenis-prevent aria-label="Sections" className={cn(GUTTER, 'absolute inset-x-0 top-full flex h-[calc(100svh-5rem)] flex-col gap-1 bg-[color:var(--z-bg)] pt-4')}>
          {ZERO_NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className={cn('flex min-h-14 items-center', TYPE.head, 'text-[32px]', FOCUS)}>{item.label}</a>
          ))}
        </nav>
      )}
    </div>
  );
}

/** The home page bar: name, the section links and the actions. */
export function Nav() {
  return (
    <StickyBar>
      <a href="#top" className={cn('inline-flex min-h-11 items-center whitespace-nowrap', TYPE.small, FOCUS)}>{siteConfig.name}</a>
      <nav aria-label="Sections" className="hidden items-center gap-8 md:flex">
        {ZERO_NAV.map((item) => (
          <a key={item.href} href={item.href} className={cn('text-[color:var(--z-soft)] transition-colors hover:text-[color:var(--z-ink)]', TYPE.small, FOCUS)}>{item.label}</a>
        ))}
      </nav>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <PhoneMenu />
        <BarActions />
      </div>
    </StickyBar>
  );
}
