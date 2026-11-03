'use client';

import { SURFACES } from '@/content/narrative';
import { SHIPPED, TITLES } from '@/content/zero';
import { fillIdea, useIdea } from './idea-context';
import { StageCaption } from './stage-caption';

/** Phones: the build beat being read, under the pinned pad. Beat 0 is the prompt, shown here as the intro while the stage pins. */
export function BuildCaption({ active }: { active: number }) {
  const { name, slug } = useIdea();
  const captions = [
    { key: 'intro', title: TITLES.build.title, body: TITLES.build.sub },
    ...SURFACES.map((s) => ({ key: s.id, title: s.name, body: s.body, foot: s.stack.join(' · ') })),
    { key: 'shipped', title: SHIPPED.title, body: fillIdea(SHIPPED.sub, { name, slug }) },
  ];
  return <StageCaption captions={captions} active={active} />;
}
