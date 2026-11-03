'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useThemeChange } from '@/hooks/use-theme-change';
import { useIdea } from './idea-context';
import type { SceneSpec } from './popup/layout';
import { readBeat } from './popup/read-beat';
import { createPopupStage } from './popup/stage';
import { DESKTOP_QUERY, HAND } from './primitives';

const MARKER = '[data-beat]';
const TOUCH_QUERY = '(hover: none)';
const CENTRE: [number, number] = [0, 0];

type Stage = ReturnType<typeof createPopupStage>;

/** Shown only if WebGL is unavailable: the idea on a flat sticky note. */
function FlatPad({ name }: { name: string }) {
  return (
    <div className="grid h-full place-items-center">
      <p className={`aspect-square w-[min(60%,40vh)] -rotate-3 bg-[color:var(--z-accent)] p-6 text-[color:var(--z-on-accent)] ${HAND} text-[clamp(28px,3vw,44px)] leading-none`}>{name}</p>
    </div>
  );
}

/** Hosts a pop-up scene: feeds it the visitor's idea and the scroll beat read from `root`'s [data-beat] blocks. `phoneShift` nudges the opening frame inside a phone band. */
export function PopupCanvas({ root, scene, phoneShift = CENTRE }: { root: React.RefObject<HTMLElement>; scene: SceneSpec; phoneShift?: [number, number] }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const stage = useRef<Stage | null>(null);
  const { name, slug } = useIdea();
  const idea = useRef({ name, slug });
  const reduce = useReducedMotion() ?? false;
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!canvas.current || !root.current) return;
    const markers = Array.from(root.current.querySelectorAll<HTMLElement>(MARKER));
    const desktop = window.matchMedia(DESKTOP_QUERY);
    try {
      stage.current = createPopupStage({
        canvas: canvas.current, scene, reduceMotion: reduce, touch: window.matchMedia(TOUCH_QUERY).matches,
        readBeat: () => readBeat(markers), readShift: () => (desktop.matches ? CENTRE : phoneShift),
      });
      stage.current.setIdea(idea.current);
    } catch {
      setFailed(true);
    }
    return () => { stage.current?.dispose(); stage.current = null; };
  }, [reduce, root, scene, phoneShift]);

  useEffect(() => {
    idea.current = { name, slug };
    stage.current?.setIdea(idea.current);
  }, [name, slug]);

  useThemeChange(() => stage.current?.repaint());

  return failed ? <FlatPad name={name} /> : <canvas ref={canvas} aria-hidden className="block h-full w-full" />;
}
