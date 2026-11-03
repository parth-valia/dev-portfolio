import * as THREE from 'three';

/** A canvas that is also a texture: draw into `ctx`, then call `commit`. */
export interface Face {
  ctx: CanvasRenderingContext2D;
  texture: THREE.CanvasTexture;
  w: number;
  h: number;
  commit: () => void;
}

export interface TextStyle {
  size: number;
  font: string;
  color: string;
  weight?: number;
  align?: CanvasTextAlign;
  max?: number;
}

const ELLIPSIS = '…';
const MAX_ANISOTROPY = 8;

export function createFace(w: number, h: number): Face {
  const canvas = document.createElement('canvas');
  [canvas.width, canvas.height] = [w, h];
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = MAX_ANISOTROPY;
  return { ctx, texture, w, h, commit: () => { texture.needsUpdate = true; } };
}

export function fillRound(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, color: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
}

const setFont = (ctx: CanvasRenderingContext2D, s: TextStyle) => {
  ctx.font = `${s.weight ?? 400} ${s.size}px ${s.font}`;
  ctx.fillStyle = s.color;
  ctx.textAlign = s.align ?? 'left';
  ctx.textBaseline = 'alphabetic';
};

/** Trims `text` with an ellipsis until it fits `max` pixels. */
function fit(ctx: CanvasRenderingContext2D, text: string, max?: number) {
  if (!max || ctx.measureText(text).width <= max) return text;
  let cut = text;
  while (cut.length > 1 && ctx.measureText(cut + ELLIPSIS).width > max) cut = cut.slice(0, -1);
  return cut.trimEnd() + ELLIPSIS;
}

export function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, style: TextStyle) {
  setFont(ctx, style);
  ctx.fillText(fit(ctx, text, style.max), x, y);
}

/** Greedy word wrap into at most `lines` lines; the last one is trimmed with an ellipsis. */
export function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, style: TextStyle & { lineHeight: number; lines: number }) {
  setFont(ctx, style);
  const rows: string[] = [];
  text.split(' ').forEach((word) => {
    const last = rows[rows.length - 1];
    if (last !== undefined && ctx.measureText(`${last} ${word}`).width <= (style.max ?? Infinity)) rows[rows.length - 1] = `${last} ${word}`;
    else rows.push(word);
  });
  const shown = rows.slice(0, style.lines);
  if (rows.length > style.lines) shown[style.lines - 1] += ` ${rows.slice(style.lines).join(' ')}`;
  shown.forEach((row, i) => ctx.fillText(fit(ctx, row, style.max), x, y + i * style.lineHeight));
  return shown.length;
}
