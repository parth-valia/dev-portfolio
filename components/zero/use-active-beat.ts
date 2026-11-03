'use client';

import { useEffect, useState } from 'react';
import { readBeat } from './popup/read-beat';

const MARKER = '[data-beat]';

/** The index of the copy block nearest the reading line inside `root`, updated as the page scrolls. */
export function useActiveBeat(root: React.RefObject<HTMLElement>) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const markers = Array.from(root.current?.querySelectorAll<HTMLElement>(MARKER) ?? []);
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActive(Math.round(readBeat(markers))));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
    };
  }, [root]);
  return active;
}
