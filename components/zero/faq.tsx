import { Reveal } from '@/components/motion/reveal';
import { FAQ, TITLES } from '@/content/zero';
import { cn } from '@/lib/utils';
import { FOCUS, GUTTER, SECTION, TYPE } from './primitives';

/** The questions founders ask before hiring, as native disclosure rows so every answer is in the HTML for search. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="zero-faq" className={cn(GUTTER, SECTION, 'grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16')}>
      <div>
        <Reveal><h2 id="zero-faq" className={TYPE.head}>{TITLES.faq.title}</h2></Reveal>
        <Reveal delay={0.08}><p className={cn('mt-6 max-w-[36ch]', TYPE.lead)}>{TITLES.faq.sub}</p></Reveal>
      </div>
      <ul>
        {FAQ.map((item) => (
          <li key={item.q} className="border-b border-[color:var(--z-field-strong)]">
            <details className="group">
              <summary className={cn('flex cursor-pointer list-none items-start justify-between gap-6 py-6 font-semibold [&::-webkit-details-marker]:hidden', TYPE.lead, FOCUS)}>
                <h3>{item.q}</h3>
                <span aria-hidden className="mt-1 text-[color:var(--z-accent-ink)] transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className={cn('max-w-[62ch] pb-6 text-[color:var(--z-soft)]', TYPE.body)}>{item.a}</p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
