'use client';

import { useRef } from 'react';
import { SURFACES } from '@/content/narrative';
import { BuildCaption } from './build-caption';
import { BuildIntro, ShippedBeat, SurfaceBeat } from './build-beats';
import { HeroHeadline, IdeaPrompt } from './hero';
import { PopupCanvas } from './popup-canvas';
import { BUILD_SCENE } from './popup/scenes/build';
import { useActiveBeat } from './use-active-beat';

/** Phones have no headline over the pad, so the opening frame lifts the pad up its band. */
const PHONE_SHIFT: [number, number] = [0, -0.28];

/**
 * Hero and "what I build" share one pinned pad. Desktop: the pad holds a right-hand panel beside the copy column.
 * Phones: headline and prompt first, then one full-screen stage pins (pad above, the beat's caption below) while the
 * copy blocks scroll past unseen as the timeline.
 */
export function Build() {
  const root = useRef<HTMLElement>(null);
  const active = useActiveBeat(root);
  return (
    <section ref={root} id="top" aria-labelledby="zero-build" className="relative flex flex-col">
      <HeroHeadline className="order-1 lg:order-none" />
      <IdeaPrompt className="order-2 max-lg:z-40 lg:order-none" />
      <div className="sticky top-0 z-30 order-3 flex h-[100svh] flex-col max-lg:-mt-[14svh] max-lg:[@media(max-height:600px)]:mt-0 max-lg:[@media(max-width:374px)]:mt-0 max-lg:[@media(min-height:800px)]:-mt-[11svh] bg-[color:var(--z-bg)] lg:absolute lg:inset-y-0 lg:left-[42vw] lg:right-0 lg:z-0 lg:block lg:h-auto lg:bg-transparent">
        <div data-pad className="h-[50svh] shrink-0 pt-16 lg:sticky lg:top-0 lg:h-[100svh] lg:pt-0">
          <PopupCanvas root={root} scene={BUILD_SCENE} phoneShift={PHONE_SHIFT} />
        </div>
        <div className="flex min-h-0 flex-1 lg:hidden"><BuildCaption active={active} /></div>
      </div>
      <div className="order-4 max-lg:pointer-events-none max-lg:-mt-[70svh] max-lg:pb-[45svh] max-lg:opacity-0 lg:order-none">
        <BuildIntro />
        {SURFACES.map((surface) => <SurfaceBeat key={surface.id} surface={surface} />)}
        <ShippedBeat />
      </div>
    </section>
  );
}
