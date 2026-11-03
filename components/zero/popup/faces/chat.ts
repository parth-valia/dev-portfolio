import { MOCK } from '@/content/zero';
import { fillIdea } from '../../idea-context';
import { drawText, fillRound, wrapText, type Face } from '../canvas';
import type { Palette } from '../palette';
import { createPen, line, scribble, sparkle } from '../sketch';
import type { Idea } from './types';

const COPY = MOCK.ai;

export function sketchChat({ ctx, w, h }: Face, p: Palette) {
  const u = w / 100;
  ctx.fillStyle = p.paper;
  ctx.fillRect(0, 0, w, h);
  const pen = createPen(ctx, p.ink, u * 0.5, 31);
  const [x, y, bw, bh] = [u * 6, u * 6, u * 88, u * 46];
  line(pen, x, y, x + bw, y);
  line(pen, x + bw, y, x + bw, y + bh);
  line(pen, x + bw, y + bh, x + u * 26, y + bh);
  line(pen, x + u * 26, y + bh, x + u * 10, y + bh + u * 12);
  line(pen, x + u * 14, y + bh, x, y + bh);
  line(pen, x, y + bh, x, y);
  [18, 28, 38].forEach((sy, i) => scribble(pen, u * 16, u * sy, u * (58 - i * 14)));
  ctx.strokeStyle = p.ink;
  ctx.lineWidth = u * 0.6;
  sparkle(ctx, u * 82, u * 20, u * 6);
  ctx.stroke();
  drawText(ctx, MOCK.sketch.ai, u * 74, h - u * 6, { size: u * 9, font: p.hand, color: p.ink, weight: 600, align: 'center' });
}

function chatThread(ctx: CanvasRenderingContext2D, u: number, p: Palette) {
  ctx.font = `400 ${u * 3.6}px ${p.sans}`;
  const askWidth = Math.min(ctx.measureText(COPY.ask).width + u * 6, u * 70);
  fillRound(ctx, u * 94 - askWidth, u * 15, askWidth, u * 9, u * 4.5, p.screenRaised);
  drawText(ctx, COPY.ask, u * 91, u * 20.8, { size: u * 3.6, font: p.sans, color: p.screenText, align: 'right', max: u * 64 });
  wrapText(ctx, COPY.reply, u * 6, u * 33, { size: u * 4.2, font: p.sans, color: p.screenText, max: u * 80, lineHeight: u * 5.4, lines: 2 });
  let x = u * 6;
  COPY.chips.forEach((chip, i) => {
    ctx.font = `600 ${u * 3.2}px ${p.sans}`;
    const cw = ctx.measureText(chip).width + u * 5;
    fillRound(ctx, x, u * 43, cw, u * 7.4, u * 3.7, i === 0 ? p.paper : p.screenRaised);
    drawText(ctx, chip, x + cw / 2, u * 47.8, { size: u * 3.2, font: p.sans, color: i === 0 ? p.ink : p.screenText, weight: 600, align: 'center' });
    x += cw + u * 2;
  });
}

export function inkChat({ ctx, w, h }: Face, p: Palette, idea: Idea) {
  const u = w / 100;
  ctx.fillStyle = p.screen;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = p.paper;
  sparkle(ctx, u * 8.5, u * 8, u * 3);
  ctx.fill();
  drawText(ctx, fillIdea(COPY.title, idea), u * 14, u * 9.6, { size: u * 4, font: p.sans, color: p.screenText, weight: 800, max: u * 78 });
  chatThread(ctx, u, p);
  fillRound(ctx, u * 6, h - u * 13, u * 88, u * 8, u * 4, p.screenRaised);
  drawText(ctx, COPY.input, u * 10, h - u * 7.6, { size: u * 3.4, font: p.sans, color: p.screenSoft });
  fillRound(ctx, u * 88, h - u * 11.4, u * 4.8, u * 4.8, u * 2.4, p.paper);
}
