'use client';

import { TITLES } from '@/content/zero';
import { useIdea } from './idea-context';
import { TYPE } from './primitives';

/** A shortened idea already ends in this, so it takes no full stop. */
const ELLIPSIS = '…';

/** The closing ask names the visitor's idea once they've typed one. */
export function ContactTitle() {
  const { name, typed } = useIdea();
  return <h2 id="zero-contact" className={`max-w-[16ch] ${TYPE.head}`}>{typed ? `Let’s ship ${name}${name.endsWith(ELLIPSIS) ? '' : '.'}` : TITLES.contact.title}</h2>;
}
