import { drawText, fillRound, type Face } from '../canvas';
import type { Palette } from '../palette';
import { box, createPen } from '../sketch';
import type { NodeIcon } from './node-icons';
import type { FaceArt } from './types';

const ICON_UNITS = 24;

/** Draws `icon` in ink, centred in the lime badge at (x, y) of side `size`. */
function drawIcon(ctx: CanvasRenderingContext2D, icon: NodeIcon, x: number, y: number, size: number, ink: string) {
  const inset = size * 0.18;
  const scale = (size - inset * 2) / ICON_UNITS;
  ctx.save();
  ctx.translate(x + inset, y + inset);
  ctx.scale(scale, scale);
  ctx.strokeStyle = ink;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  icon(ctx);
  ctx.restore();
}

/** A small standing card in the workflow: sketched as a labelled box, inked as a status tile whose badge carries `icon`. */
export function nodeArt(sketchLabel: string, [title, status]: string[], seed: number, icon: NodeIcon): FaceArt {
  return {
    sketch({ ctx, w, h }: Face, p: Palette) {
      const u = w / 100;
      ctx.fillStyle = p.paper;
      ctx.fillRect(0, 0, w, h);
      box(createPen(ctx, p.ink, u * 1, seed), u * 8, u * 8, u * 84, h - u * 16);
      drawText(ctx, sketchLabel, u * 50, h / 2 + u * 7, { size: u * 22, font: p.hand, color: p.ink, weight: 600, align: 'center' });
    },
    ink({ ctx, w, h }: Face, p: Palette) {
      const u = w / 100;
      ctx.fillStyle = p.screen;
      ctx.fillRect(0, 0, w, h);
      fillRound(ctx, u * 10, u * 12, u * 20, u * 20, u * 5, p.paper);
      drawIcon(ctx, icon, u * 10, u * 12, u * 20, p.ink);
      drawText(ctx, title, u * 10, u * 50, { size: u * 11, font: p.sans, color: p.screenText, weight: 800, max: u * 80 });
      drawText(ctx, status, u * 10, u * 64, { size: u * 8, font: p.sans, color: p.screenSoft, max: u * 80 });
    },
  };
}
