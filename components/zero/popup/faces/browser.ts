import { MOCK } from '@/content/zero';
import { drawText, fillRound, wrapText, type Face } from '../canvas';
import type { Palette } from '../palette';
import { box, circle, createPen, imageBox, line, scribble } from '../sketch';
import type { Idea } from './types';

const COPY = MOCK.web;
/** Sign-ups per day for the sample chart, as a share of its height. */
const CHART = [0.22, 0.3, 0.27, 0.45, 0.52, 0.7, 0.86];

export function sketchBrowser({ ctx, w, h }: Face, p: Palette, idea: Idea) {
  const u = w / 100;
  ctx.fillStyle = p.paper;
  ctx.fillRect(0, 0, w, h);
  const pen = createPen(ctx, p.ink, u * 0.32, 23);
  box(pen, u * 3, u * 3, u * 94, h - u * 6);
  line(pen, u * 3, u * 9, u * 97, u * 9);
  [6, 9, 12].forEach((x) => circle(pen, u * x, u * 6, u * 0.9));
  drawText(ctx, `${idea.slug}.app`, u * 18, u * 7.6, { size: u * 3.4, font: p.hand, color: p.ink, weight: 600 });
  drawText(ctx, idea.name, u * 50, u * 22, { size: u * 6.4, font: p.hand, color: p.ink, weight: 600, align: 'center', max: u * 80 });
  scribble(pen, u * 32, u * 28, u * 36);
  box(pen, u * 42, u * 32, u * 16, u * 5);
  [10, 39, 68].forEach((x) => imageBox(pen, u * x, u * 42, u * 22, u * 14));
  drawText(ctx, MOCK.sketch.web, u * 86, u * 39, { size: u * 4.4, font: p.hand, color: p.ink, weight: 600, align: 'center' });
}

function browserChrome(ctx: CanvasRenderingContext2D, u: number, p: Palette, idea: Idea, w: number) {
  ctx.fillStyle = p.page;
  ctx.fillRect(0, 0, w, u * 64);
  ctx.fillStyle = p.screenRaised;
  ctx.fillRect(0, 0, w, u * 6);
  [3, 5.4, 7.8].forEach((x) => fillRound(ctx, u * (x - 0.7), u * 2.3, u * 1.4, u * 1.4, u * 0.7, p.screenSoft));
  fillRound(ctx, u * 30, u * 1.4, u * 40, u * 3.2, u * 1.6, p.screen);
  drawText(ctx, `${idea.slug}.app`, u * 50, u * 3.75, { size: u * 1.7, font: p.sans, color: p.screenText, align: 'center', max: u * 30 });
  fillRound(ctx, u * 88, u * 1.7, u * 1.2, u * 1.2, u * 0.6, p.paper);
  drawText(ctx, COPY.live, u * 90, u * 3.75, { size: u * 1.6, font: p.sans, color: p.screenText, weight: 600 });
}

function browserHero(ctx: CanvasRenderingContext2D, u: number, p: Palette, idea: Idea) {
  drawText(ctx, idea.name, u * 6, u * 12.4, { size: u * 2, font: p.sans, color: p.pageText, weight: 800, max: u * 30 });
  COPY.links.forEach((link, i) => drawText(ctx, link, u * (58 + i * 8), u * 12.4, { size: u * 1.7, font: p.sans, color: p.pageText }));
  fillRound(ctx, u * 82, u * 9.6, u * 12, u * 4, u * 2, p.pageText);
  drawText(ctx, COPY.cta, u * 88, u * 12.3, { size: u * 1.6, font: p.sans, color: p.paper, weight: 600, align: 'center' });
  const lines = wrapText(ctx, idea.name, u * 6, u * 25, { size: u * 6.6, font: p.sans, color: p.pageText, weight: 800, max: u * 52, lineHeight: u * 6.4, lines: 2 });
  const y = u * (25 + lines * 6.4);
  drawText(ctx, COPY.sub, u * 6, y, { size: u * 2, font: p.sans, color: p.pageText });
  fillRound(ctx, u * 6, y + u * 3, u * 15, u * 5, u * 2.5, p.pageText);
  drawText(ctx, COPY.cta, u * 13.5, y + u * 6.3, { size: u * 1.8, font: p.sans, color: p.paper, weight: 600, align: 'center' });
}

function browserChart(ctx: CanvasRenderingContext2D, u: number, p: Palette) {
  const [x, y, cw, ch] = [u * 62, u * 20, u * 32, u * 38];
  fillRound(ctx, x, y, cw, ch, u * 1.6, p.screen);
  drawText(ctx, COPY.chart, x + u * 2.4, y + u * 4.4, { size: u * 1.7, font: p.sans, color: p.screenText, weight: 600 });
  const [bx, by, bw, bh] = [x + u * 2.4, y + ch - u * 5, (cw - u * 4.8) / CHART.length, ch - u * 13];
  CHART.forEach((v, i) => {
    fillRound(ctx, bx + i * bw + u * 0.5, by - v * bh, bw - u * 1, v * bh, u * 0.6, i === CHART.length - 1 ? p.paper : p.screenRaised);
    drawText(ctx, COPY.days[i], bx + i * bw + bw / 2, by + u * 3, { size: u * 1.4, font: p.sans, color: p.screenSoft, align: 'center' });
  });
}

export function inkBrowser({ ctx, w }: Face, p: Palette, idea: Idea) {
  const u = w / 100;
  browserChrome(ctx, u, p, idea, w);
  browserHero(ctx, u, p, idea);
  browserChart(ctx, u, p);
}
