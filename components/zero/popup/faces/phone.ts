import { MOCK } from '@/content/zero';
import { drawText, fillRound, wrapText, type Face } from '../canvas';
import type { Palette } from '../palette';
import { box, circle, createPen, imageBox, scribble } from '../sketch';
import type { Idea } from './types';

const COPY = MOCK.phone;

export function sketchPhone({ ctx, w, h }: Face, p: Palette) {
  const u = w / 100;
  ctx.fillStyle = p.paper;
  ctx.fillRect(0, 0, w, h);
  const pen = createPen(ctx, p.ink, u * 0.9, 11);
  box(pen, u * 6, u * 5, u * 88, h - u * 10);
  scribble(pen, u * 16, u * 26, u * 40);
  box(pen, u * 16, u * 36, u * 68, u * 10);
  imageBox(pen, u * 16, u * 52, u * 68, u * 38);
  [100, 122, 144].forEach((y, i) => {
    circle(pen, u * 24, u * y, u * 6);
    scribble(pen, u * 36, u * (y - 2), u * (40 - i * 8));
    scribble(pen, u * 36, u * (y + 4), u * 22);
  });
  [24, 42, 60, 78].forEach((x) => circle(pen, u * x, h - u * 16, u * 3));
  drawText(ctx, MOCK.sketch.phone, u * 50, h - u * 30, { size: u * 14, font: p.hand, color: p.ink, weight: 600, align: 'center' });
}

function phoneHeader(ctx: CanvasRenderingContext2D, u: number, p: Palette, idea: Idea) {
  drawText(ctx, COPY.time, u * 12, u * 13, { size: u * 4.4, font: p.sans, color: p.screenText, weight: 600 });
  drawText(ctx, COPY.greeting, u * 10, u * 26, { size: u * 4.6, font: p.sans, color: p.screenSoft });
  wrapText(ctx, idea.name, u * 10, u * 36, { size: u * 8.4, font: p.sans, color: p.screenText, weight: 800, max: u * 80, lineHeight: u * 9, lines: 2 });
  fillRound(ctx, u * 10, u * 52, u * 80, u * 11, u * 5.5, p.screenRaised);
  drawText(ctx, COPY.search, u * 17, u * 59.4, { size: u * 4.4, font: p.sans, color: p.screenSoft });
}

function phoneCard(ctx: CanvasRenderingContext2D, u: number, p: Palette) {
  const [title, line, action] = COPY.card;
  fillRound(ctx, u * 10, u * 68, u * 80, u * 34, u * 5, p.paper);
  drawText(ctx, title, u * 16, u * 81, { size: u * 6.4, font: p.sans, color: p.ink, weight: 800 });
  drawText(ctx, line, u * 16, u * 89, { size: u * 4.4, font: p.sans, color: p.ink });
  fillRound(ctx, u * 16, u * 92.5, u * 26, u * 6, u * 3, p.ink);
  drawText(ctx, action, u * 29, u * 96.8, { size: u * 3.4, font: p.sans, color: p.paper, weight: 600, align: 'center' });
}

function phoneRows(ctx: CanvasRenderingContext2D, u: number, p: Palette) {
  drawText(ctx, COPY.section, u * 10, u * 114, { size: u * 4.6, font: p.sans, color: p.screenText, weight: 600 });
  COPY.rows.forEach(([label, when], i) => {
    const y = u * (120 + i * 17);
    fillRound(ctx, u * 10, y, u * 80, u * 14, u * 4, p.screenRaised);
    fillRound(ctx, u * 13, y + u * 3, u * 8, u * 8, u * 4, i === 0 ? p.paper : p.screenSoft);
    drawText(ctx, label, u * 25, y + u * 8.8, { size: u * 4.4, font: p.sans, color: p.screenText, weight: 600, max: u * 46 });
    drawText(ctx, when, u * 86, y + u * 8.8, { size: u * 3.8, font: p.sans, color: p.screenSoft, align: 'right' });
  });
}

function phoneTabs(ctx: CanvasRenderingContext2D, u: number, h: number, p: Palette) {
  fillRound(ctx, u * 8, h - u * 22, u * 84, u * 14, u * 7, p.screenRaised);
  COPY.tabs.forEach((tab, i) => {
    drawText(ctx, tab, u * (19 + i * 20.7), h - u * 13.4, { size: u * 3.8, font: p.sans, color: i === 0 ? p.paper : p.screenSoft, weight: 600, align: 'center' });
  });
}

export function inkPhone({ ctx, w, h }: Face, p: Palette, idea: Idea) {
  const u = w / 100;
  ctx.fillStyle = p.screen;
  ctx.fillRect(0, 0, w, h);
  fillRound(ctx, u * 38, u * 7, u * 24, u * 6, u * 3, p.ink);
  phoneHeader(ctx, u, p, idea);
  phoneCard(ctx, u, p);
  phoneRows(ctx, u, p);
  phoneTabs(ctx, u, h, p);
}
