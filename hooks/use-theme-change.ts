'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

/** Calls `onChange` with the resolved theme a frame after it changes, once next-themes has put the new class on <html>. */
export function useThemeChange(onChange: (theme: string) => void) {
  const { resolvedTheme } = useTheme();
  const callback = useRef(onChange);
  callback.current = onChange;

  useEffect(() => {
    if (!resolvedTheme) return;
    const frame = requestAnimationFrame(() => callback.current(resolvedTheme));
    return () => cancelAnimationFrame(frame);
  }, [resolvedTheme]);
}
