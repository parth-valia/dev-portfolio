'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

type Theme = 'light' | 'dark';

/** Light/dark theme as a class on <html>; each site keeps its own saved choice under `storageKey`. */
export function ThemeProvider({ children, defaultTheme, storageKey }: { children: React.ReactNode; defaultTheme: Theme; storageKey: string }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme={defaultTheme} storageKey={storageKey} enableSystem={false} disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
