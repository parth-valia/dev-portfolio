'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { NOTE_MAIL } from '@/content/zero';
import { siteConfig } from '@/site.config';
import { cn } from '@/lib/utils';
import { fillIdea, useIdea } from './idea-context';
import { buttonClass, FOCUS, HAND, TYPE } from './primitives';

const MAX_NOTE = 600;
const COPIED_MS = 2000;

const mailto = (subject: string, body: string) => `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

/** The contact form is the sticky note itself: whatever is written on it opens as an email, the idea from the hero already on it. */
export function ContactNote() {
  const { idea, name, slug, typed } = useIdea();
  const [draft, setDraft] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const note = draft ?? idea;
  const subject = typed ? fillIdea(NOTE_MAIL.subject, { name, slug }) : NOTE_MAIL.subjectPlain;
  const copiedTimer = useRef<number>();
  useEffect(() => () => window.clearTimeout(copiedTimer.current), []);
  const copy = () => navigator.clipboard?.writeText(siteConfig.email).then(() => {
    setCopied(true);
    window.clearTimeout(copiedTimer.current);
    copiedTimer.current = window.setTimeout(() => setCopied(false), COPIED_MS);
  }).catch(() => setCopied(false));
  return (
    <div className="zero-paper w-full max-w-[520px] -rotate-2 p-6 transition-transform duration-300 focus-within:rotate-0 hover:rotate-0 md:p-8">
      <label htmlFor="zero-note" className="sr-only">{NOTE_MAIL.placeholder}</label>
      <textarea id="zero-note" value={note} onChange={(e) => setDraft(e.target.value)} placeholder={NOTE_MAIL.placeholder} maxLength={MAX_NOTE} rows={6} data-gramm="false" data-enable-grammarly="false"
        className={cn(HAND, 'block w-full resize-none bg-transparent text-[clamp(26px,2.2vw,34px)] leading-[1.15] caret-[color:var(--z-on-accent)] outline-none placeholder:text-[color:var(--z-soft)]')} />
      <a href={mailto(subject, note)} onClick={() => setSent(true)} className={cn(buttonClass('ink'), 'mt-6')}>{NOTE_MAIL.send}</a>
      <p aria-live="polite" className={cn('mt-4 min-h-[1.3em] text-[color:var(--z-soft)]', TYPE.small)}>
        {sent && (
          <>
            {NOTE_MAIL.opened}{' '}
            <button type="button" onClick={copy} className={cn('inline-flex min-h-11 items-center gap-1 font-semibold text-[color:var(--z-ink)] underline underline-offset-4', FOCUS)}>
              {copied ? <Check aria-hidden className="h-4 w-4" /> : <Copy aria-hidden className="h-4 w-4" />}{copied ? NOTE_MAIL.copied : NOTE_MAIL.copy}
            </button>
          </>
        )}
      </p>
    </div>
  );
}
