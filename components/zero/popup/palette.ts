/** Colours and faces the pop-up draws with, read from the page's tokens so the 3D scene and the HTML stay one palette. */
export interface Palette {
  paper: string;
  paperEdge: string;
  paperCut: string;
  ink: string;
  screen: string;
  screenRaised: string;
  screenText: string;
  screenSoft: string;
  page: string;
  pageText: string;
  sans: string;
  hand: string;
}

const ROOT = '.zero-root';
const FALLBACK_SANS = 'system-ui, sans-serif';
const FALLBACK_HAND = 'cursive';

const token = (style: CSSStyleDeclaration, name: string) => style.getPropertyValue(name).trim();

export function readPalette(): Palette {
  const style = getComputedStyle(document.querySelector(ROOT) ?? document.documentElement);
  return {
    paper: token(style, '--z-accent'),
    paperEdge: token(style, '--z-paper-edge'),
    paperCut: token(style, '--z-paper-cut'),
    ink: token(style, '--z-on-accent'),
    screen: token(style, '--z-screen'),
    screenRaised: token(style, '--z-field-strong'),
    screenText: token(style, '--z-ink'),
    screenSoft: token(style, '--z-soft'),
    page: token(style, '--z-page'),
    pageText: token(style, '--z-on-accent'),
    sans: token(style, '--font-zero-sans') || FALLBACK_SANS,
    hand: token(style, '--font-zero-hand') || FALLBACK_HAND,
  };
}

/** Resolves once both faces can be drawn into a canvas; canvases drawn before that fall back to system fonts. */
export async function loadFaces(palette: Palette) {
  await Promise.all([document.fonts.load(`600 64px ${palette.hand}`), document.fonts.load(`800 64px ${palette.sans}`), document.fonts.load(`400 64px ${palette.sans}`)]);
}
