/** Pen strokes for the sketches: every line wobbles a little and is drawn twice, the way a quick hand drawing is. Seeded, so a redraw never shimmers. */
export interface Pen {
  ctx: CanvasRenderingContext2D;
  ink: string;
  width: number;
  wobble: number;
  next: () => number;
}

const PASSES = 2;

/** Mulberry32: a tiny repeatable random source. */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createPen(ctx: CanvasRenderingContext2D, ink: string, width: number, seed = 7): Pen {
  return { ctx, ink, width, wobble: width * 1.4, next: seeded(seed) };
}

const jitter = (pen: Pen) => (pen.next() - 0.5) * 2 * pen.wobble;

function beginStroke(pen: Pen) {
  pen.ctx.strokeStyle = pen.ink;
  pen.ctx.lineWidth = pen.width;
  pen.ctx.lineCap = 'round';
  pen.ctx.lineJoin = 'round';
  pen.ctx.beginPath();
}

export function line(pen: Pen, x1: number, y1: number, x2: number, y2: number) {
  for (let pass = 0; pass < PASSES; pass++) {
    beginStroke(pen);
    pen.ctx.moveTo(x1 + jitter(pen), y1 + jitter(pen));
    pen.ctx.quadraticCurveTo((x1 + x2) / 2 + jitter(pen), (y1 + y2) / 2 + jitter(pen), x2 + jitter(pen), y2 + jitter(pen));
    pen.ctx.stroke();
  }
}

export function box(pen: Pen, x: number, y: number, w: number, h: number) {
  line(pen, x, y, x + w, y);
  line(pen, x + w, y, x + w, y + h);
  line(pen, x + w, y + h, x, y + h);
  line(pen, x, y + h, x, y);
}

export function circle(pen: Pen, cx: number, cy: number, r: number) {
  for (let pass = 0; pass < PASSES; pass++) {
    beginStroke(pen);
    pen.ctx.ellipse(cx + jitter(pen), cy + jitter(pen), r, r * (0.92 + pen.next() * 0.12), pen.next(), 0, Math.PI * 2.05);
    pen.ctx.stroke();
  }
}

/** A wavy line standing in for a line of text. */
export function scribble(pen: Pen, x: number, y: number, w: number) {
  const step = pen.width * 6;
  beginStroke(pen);
  pen.ctx.moveTo(x, y);
  for (let px = x + step; px <= x + w; px += step) pen.ctx.quadraticCurveTo(px - step / 2, y + (pen.next() - 0.5) * step, px, y + jitter(pen) / 2);
  pen.ctx.stroke();
}

/** A box with a cross through it: the sketch convention for "a picture goes here". */
export function imageBox(pen: Pen, x: number, y: number, w: number, h: number) {
  box(pen, x, y, w, h);
  line(pen, x, y, x + w, y + h);
  line(pen, x + w, y, x, y + h);
}

/** A four-point sparkle, drawn or filled; the AI mark in both the sketch and the inked UI. */
export function sparkle(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(cx, cy - r);
  ctx.quadraticCurveTo(cx, cy, cx + r, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy + r);
  ctx.quadraticCurveTo(cx, cy, cx - r, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy - r);
  ctx.closePath();
}
