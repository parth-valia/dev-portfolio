'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { IDEA } from '@/content/zero';

const LEADING_ARTICLE = /^(a|an|the|my|our)\s+/i;
const MAX_NAME = 28;
const MAX_SLUG = 16;

/** Shortens to whole words, marking the cut, so a long idea never ends mid-word. */
function clip(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max + 1).replace(/\s+\S*$/, '');
  return `${cut.length > max ? text.slice(0, max - 1) : cut}…`;
}
const toName = (idea: string) => clip(idea.trim().replace(LEADING_ARTICLE, '').replace(/\b\w/g, (c) => c.toUpperCase()), MAX_NAME);
const toSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, MAX_SLUG);

type IdeaState = { idea: string; setIdea: (idea: string) => void; name: string; slug: string; typed: boolean };

const IdeaContext = createContext<IdeaState | null>(null);

/** The visitor's idea, shared by the prompt, the build board and the closing ask. */
export function IdeaProvider({ children }: { children: React.ReactNode }) {
  const [idea, setIdea] = useState('');
  const value = useMemo(() => {
    const name = toName(idea) || toName(IDEA.placeholder);
    return { idea, setIdea, name, slug: toSlug(name), typed: idea.trim().length > 0 };
  }, [idea]);
  return <IdeaContext.Provider value={value}>{children}</IdeaContext.Provider>;
}

export function useIdea() {
  const value = useContext(IdeaContext);
  if (!value) throw new Error('useIdea must be used inside IdeaProvider');
  return value;
}

/** Fills {name} and {slug} in a template line. */
export const fillIdea = (line: string, { name, slug }: Pick<IdeaState, 'name' | 'slug'>) => line.replace('{name}', name).replace('{slug}', slug);
