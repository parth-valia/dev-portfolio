import * as THREE from 'three';
import { PAD as PAD_COPY } from '@/content/zero';
import { createFace, drawText, wrapText, type Face } from './canvas';
import type { Idea } from './faces/types';
import { PAD, type SceneSpec } from './layout';
import type { Palette } from './palette';
import { createPen, line } from './sketch';

/** Canvas pixels per world unit on the pad's face. */
const RES = 440;
const FIBRES = 2600;
const HAND_SIZES = [0.42, 0.36, 0.3, 0.25, 0.21];
const DESK_SHADOW = { size: 9, opacity: 0.55 };
/** Without shadow maps: a flat slab under the pad, offset away from the key light like paper lifted off the desk. */
const FLAT_SHADOW = { x: 0.16, z: 0.12, grow: 0.04, opacity: 0.3 };
const CUT_DASH = [0.05, 0.04];

const px = (v: number) => v * RES;
const toCanvas = (x: number, z: number): [number, number] => [px(x + PAD.width / 2), px(z + PAD.depth / 2)];

/** Faint marks so the paper reads as paper under the light. */
function drawFibres({ ctx, w, h }: Face, p: Palette) {
  ctx.fillStyle = p.paper;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = p.paperEdge;
  ctx.globalAlpha = 0.12;
  for (let i = 0; i < FIBRES; i++) ctx.fillRect((Math.sin(i * 12.9898) * 0.5 + 0.5) * w, (Math.sin(i * 78.233) * 0.5 + 0.5) * h, 2 + (i % 5), 1);
  ctx.globalAlpha = 1;
}

/** The die-cut line round each piece, and the paper below it, seen once the piece has stood up. */
function drawCuts({ ctx }: Face, p: Palette, scene: SceneSpec) {
  scene.pieces.forEach((piece) => {
    const [x, y] = toCanvas(piece.x - piece.w / 2, piece.z - piece.h);
    ctx.fillStyle = p.paperCut;
    ctx.fillRect(x, y, px(piece.w), px(piece.h));
    ctx.setLineDash(CUT_DASH.map(px));
    ctx.strokeStyle = p.ink;
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, px(piece.w), px(piece.h));
  });
  ctx.setLineDash([]);
}

/** The wire, planned in pen before it is laid. */
function drawPlan({ ctx }: Face, p: Palette, { wire }: SceneSpec) {
  const pen = createPen(ctx, p.ink, 4, 61);
  wire.points.slice(1).forEach(([x, z], i) => line(pen, ...toCanvas(...wire.points[i]), ...toCanvas(x, z)));
}

/** The largest hand size at which `name` fits the box in two lines. */
function handSize(ctx: CanvasRenderingContext2D, p: Palette, name: string, width: number) {
  const fits = (size: number) => {
    ctx.font = `600 ${px(size)}px ${p.hand}`;
    return ctx.measureText(name).width <= px(width) * 2;
  };
  return HAND_SIZES.find(fits) ?? HAND_SIZES[HAND_SIZES.length - 1];
}

function drawHandwriting({ ctx }: Face, p: Palette, idea: Idea, box: NonNullable<SceneSpec['handwriting']>) {
  const [x, y] = toCanvas(box.x, box.z);
  const size = handSize(ctx, p, idea.name, box.w);
  const lines = wrapText(ctx, idea.name, x, y + px(size), { size: px(size), font: p.hand, color: p.ink, weight: 600, max: px(box.w), lineHeight: px(size * 0.92), lines: 2 });
  const under = y + px(size) + px(size * 0.92) * (lines - 1) + px(0.08);
  line(createPen(ctx, p.ink, 6, 71), x, under, x + px(box.w * 0.6), under + px(0.02));
  drawText(ctx, PAD_COPY.note, ...toCanvas(-0.4, 0.62), { size: px(0.2), font: p.hand, color: p.ink, weight: 600 });
}

/** The desk under the pad: a wide shadow catcher, or the flat offset slab when shadows are off. */
function deskGeometry(shadows: boolean) {
  if (shadows) return new THREE.PlaneGeometry(DESK_SHADOW.size, DESK_SHADOW.size).rotateX(-Math.PI / 2);
  const { x, z, grow } = FLAT_SHADOW;
  return new THREE.PlaneGeometry(PAD.width + grow, PAD.depth + grow).rotateX(-Math.PI / 2).translate(x, -0.001, z);
}

export function createPad(palette: Palette, scene: SceneSpec, shadows: boolean) {
  const face = createFace(Math.round(px(PAD.width)), Math.round(px(PAD.depth)));
  const edge = new THREE.MeshStandardMaterial({ color: palette.paperEdge, roughness: 0.95 });
  const topMaterial = new THREE.MeshStandardMaterial({ map: face.texture, roughness: 0.92 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(PAD.width, PAD.thickness, PAD.depth).translate(0, PAD.thickness / 2, 0), edge);
  const top = new THREE.Mesh(new THREE.PlaneGeometry(PAD.width, PAD.depth).rotateX(-Math.PI / 2).translate(0, PAD.thickness + 0.001, 0), topMaterial);
  const shadowMaterial = shadows
    ? new THREE.ShadowMaterial({ opacity: DESK_SHADOW.opacity })
    : new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: FLAT_SHADOW.opacity, depthWrite: false });
  const desk = new THREE.Mesh(deskGeometry(shadows), shadowMaterial);
  body.castShadow = true;
  top.receiveShadow = true;
  desk.receiveShadow = true;
  const group = new THREE.Group().add(desk, body, top);

  const draw = (p: Palette, idea: Idea) => {
    edge.color.set(p.paperEdge);
    drawFibres(face, p);
    drawCuts(face, p, scene);
    drawPlan(face, p, scene);
    if (scene.handwriting) drawHandwriting(face, p, idea, scene.handwriting);
    face.commit();
  };
  const dispose = () => [body.geometry, top.geometry, desk.geometry, edge, topMaterial, shadowMaterial, face.texture].forEach((item) => item.dispose());
  return { group, top: PAD.thickness + 0.001, draw, dispose };
}
