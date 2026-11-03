import { Reveal } from '@/components/motion/reveal';
import { NOTE_MAIL, TITLES } from '@/content/zero';
import { siteConfig } from '@/site.config';
import { cn } from '@/lib/utils';
import { ContactNote } from './contact-note';
import { ContactTitle } from './contact-title';
import { Button, FOCUS, GUTTER, SECTION, TYPE } from './primitives';
import { SiteFooter } from './site-footer';

/** The close: write the idea on the note and send it, or book a call; the address sits on one line beneath. */
export function Contact() {
  return (
    <footer id="contact" aria-labelledby="zero-contact" className="bg-[color:var(--z-field-strong)]">
      <div className={cn(GUTTER, SECTION, 'grid items-center gap-14 lg:grid-cols-[1fr_1fr]')}>
        <div>
          <Reveal><ContactTitle /></Reveal>
          <Reveal delay={0.08}><p className={cn('mt-6 max-w-[38ch]', TYPE.lead)}>{TITLES.contact.sub}</p></Reveal>
          <Reveal delay={0.16} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button href={siteConfig.calendarUrl} external>Book a call</Button>
            <p className={TYPE.body}>{NOTE_MAIL.alt} <a href={`mailto:${siteConfig.email}`} className={cn('whitespace-nowrap underline underline-offset-4 hover:text-[color:var(--z-accent-ink)]', FOCUS)}>{siteConfig.email}</a></p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="flex justify-center lg:justify-end"><ContactNote /></Reveal>
      </div>
      <SiteFooter />
    </footer>
  );
}
