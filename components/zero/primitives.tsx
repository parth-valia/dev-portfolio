import { cn } from '@/lib/utils';

/** One pair of page margins, used by every section. */
export const GUTTER = 'px-4 md:px-8 lg:px-10';
export const SECTION = 'py-24 md:py-36';
export const FOCUS = 'outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--z-accent-ink)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--z-bg)]';
export const DESKTOP_QUERY = '(min-width: 1024px)';
export const EASE = [0.22, 1, 0.36, 1] as const;
export const INSTANT = { duration: 0 };
/** A caption or quote leaves within this before the next arrives, so the two never sit on top of each other. */
export const SWAP_GAP_S = 0.14;

/** The site's sizes; nothing else sets a font size. */
export const TYPE = {
  mega: 'text-[clamp(48px,9.4vw,160px)] font-black leading-[0.9] tracking-[-0.045em]',
  head: 'text-[clamp(36px,4.6vw,72px)] font-extrabold leading-[0.95] tracking-[-0.045em] [text-wrap:balance]',
  lead: 'text-[clamp(20px,1.6vw,25px)] leading-[1.35] tracking-[-0.012em] [text-wrap:pretty]',
  body: 'text-[17px] leading-[1.55] md:text-[18px] [text-wrap:pretty]',
  small: 'text-[14px] font-semibold leading-[1.3]',
  /** The work heading that tears apart. */
  split: 'text-[clamp(32px,5.6vw,104px)] font-semibold leading-[0.94] tracking-[-0.045em]',
};
/** The handwriting on the notes. */
export const HAND = 'font-[family-name:var(--font-zero-hand)] font-semibold';
/** The light/dark switch beside the header's action: a flat square the button's height. */
export const THEME_BUTTON = cn('h-12 w-12 bg-[color:var(--z-field-strong)] text-[color:var(--z-ink)] transition-colors hover:text-[color:var(--z-accent-ink)]', FOCUS);

const BUTTON = {
  base: 'inline-flex h-12 shrink-0 items-center justify-center gap-2 px-6 font-semibold max-[359px]:px-4 transition-[transform,background-color,color] duration-150 active:translate-y-px',
  /** On the bone ground in light theme the lime needs a hairline of ink to keep its edge. */
  primary: 'bg-[color:var(--z-accent)] text-[color:var(--z-on-accent)] hover:bg-[color:var(--z-ink)] hover:text-[color:var(--z-bg)] [.light_&]:shadow-[inset_0_0_0_1px_rgba(11,11,10,0.22)]',
  /** For the lime paper surfaces, where the ink is the dark ground colour. */
  ink: 'bg-[color:var(--z-ink)] text-[color:var(--z-accent)] hover:bg-transparent hover:text-[color:var(--z-ink)] hover:ring-2 hover:ring-inset hover:ring-[color:var(--z-ink)]',
};

/** The page's one button shape: square, flat, 48px tall. */
export const buttonClass = (tone: 'primary' | 'ink') => cn(BUTTON.base, BUTTON[tone], TYPE.small, FOCUS);

export function Button({ href, children, tone = 'primary', external = false }: { href: string; children: React.ReactNode; tone?: 'primary' | 'ink'; external?: boolean }) {
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={buttonClass(tone)}>
      {children}
    </a>
  );
}
