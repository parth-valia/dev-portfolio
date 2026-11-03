import * as THREE from 'three';
import { createFace } from './canvas';
import { easeOutBack, smoothstep } from './ease';
import type { Idea } from './faces/types';
import { POP, type PieceSpec } from './layout';
import type { Palette } from './palette';

/** Card stock thickness, in world units. */
const CARD = 0.022;
const LIFT_GAP = 0.0015;
const FLAT = -Math.PI / 2;
/** Corner radius as a share of the card's short side, capped so wide cards keep a device-like corner. */
const CORNER = { share: 0.1, max: 0.09 };

export interface Piece {
  hinge: THREE.Group;
  pose: (beat: number) => void;
  draw: (palette: Palette, idea: Idea) => void;
  dispose: () => void;
}

/** The card's outline: a rounded rectangle standing on its bottom edge, centred left to right. */
function cardShape(w: number, h: number) {
  const r = Math.min(Math.min(w, h) * CORNER.share, CORNER.max);
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2 + r, 0);
  shape.lineTo(w / 2 - r, 0);
  shape.quadraticCurveTo(w / 2, 0, w / 2, r);
  shape.lineTo(w / 2, h - r);
  shape.quadraticCurveTo(w / 2, h, w / 2 - r, h);
  shape.lineTo(-w / 2 + r, h);
  shape.quadraticCurveTo(-w / 2, h, -w / 2, h - r);
  shape.lineTo(-w / 2, r);
  shape.quadraticCurveTo(-w / 2, 0, -w / 2 + r, 0);
  return shape;
}

/** Maps a flat face's UVs to the card's bounds, so its canvas covers the rounded outline edge to edge. */
function fitUVs(geometry: THREE.BufferGeometry, w: number, h: number) {
  const { position, uv } = geometry.attributes;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, position.getX(i) / w + 0.5, position.getY(i) / h);
  uv.needsUpdate = true;
  return geometry;
}

function createMeshes(spec: PieceSpec, front: THREE.Texture, sketch: THREE.Texture, screen: string) {
  const shape = cardShape(spec.w, spec.h);
  const edge = new THREE.MeshStandardMaterial({ color: screen, roughness: 0.55 });
  const face = new THREE.MeshStandardMaterial({ map: front, roughness: 0.55 });
  const body = new THREE.Mesh(fitUVs(new THREE.ExtrudeGeometry(shape, { depth: CARD, bevelEnabled: false }), spec.w, spec.h), [face, edge]);
  body.castShadow = true;
  const overlayMaterial = new THREE.MeshStandardMaterial({ map: sketch, roughness: 0.9, transparent: true });
  const overlay = new THREE.Mesh(fitUVs(new THREE.ShapeGeometry(shape), spec.w, spec.h).translate(0, 0, CARD + LIFT_GAP), overlayMaterial);
  return { body, overlay, edge, overlayMaterial, materials: [edge, face, overlayMaterial] };
}

/** One sketch on the pad that stands up on its hinge as the build reaches its beat, inking from pen lines into the real UI on the way. */
export function createPiece(spec: PieceSpec, top: number, palette: Palette): Piece {
  const ink = createFace(Math.round(spec.w * spec.res), Math.round(spec.h * spec.res));
  const sketch = createFace(ink.w, ink.h);
  const { body, overlay, edge, overlayMaterial, materials } = createMeshes(spec, ink.texture, sketch.texture, palette.screen);
  const hinge = new THREE.Group();
  hinge.position.set(spec.x, top, spec.z);
  hinge.add(body, overlay);

  const pose = (beat: number) => {
    const local = (beat - spec.lift) / POP.span;
    const up = easeOutBack(local);
    hinge.rotation.x = FLAT + (-spec.lean - FLAT) * up;
    overlayMaterial.opacity = 1 - smoothstep(POP.inkFrom, POP.inkTo, local);
    overlay.visible = overlayMaterial.opacity > 0;
  };

  const draw = (p: Palette, idea: Idea) => {
    edge.color.set(p.screen);
    spec.art.ink(ink, p, idea);
    spec.art.sketch(sketch, p, idea);
    ink.commit();
    sketch.commit();
  };

  const dispose = () => {
    [body.geometry, overlay.geometry, ...materials, ink.texture, sketch.texture].forEach((item) => item.dispose());
  };

  return { hinge, pose, draw, dispose };
}
