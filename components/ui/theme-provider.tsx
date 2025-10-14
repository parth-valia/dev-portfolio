'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = 'system' }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run client-side
    const stored = localStorage.getItem('theme') as Theme;
    const initialTheme = stored || defaultTheme;

    setTheme(initialTheme);

    const systemTheme =
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const appliedTheme =
      initialTheme === 'system' ? systemTheme : (initialTheme as 'light' | 'dark');

    setResolvedTheme(appliedTheme);
    setMounted(true);
  }, [defaultTheme]);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    const systemTheme =
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const appliedTheme =
      theme === 'system' ? systemTheme : (theme as 'light' | 'dark');

    root.classList.add(appliedTheme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // 🚫 Prevent hydration mismatch: render nothing until mounted
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
