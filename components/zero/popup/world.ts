import * as THREE from 'three';
import type { Idea } from './faces/types';
import { PAD, type SceneSpec } from './layout';
import { createPad } from './pad';
import type { Palette } from './palette';
import { createPiece } from './piece';
import { createWires } from './wires';

/** The pad with a scene's pop-up pieces and wire on it, turned a little on the desk. */
export function createWorld(palette: Palette, scene: SceneSpec, shadows: boolean) {
  const pad = createPad(palette, scene, shadows);
  const pieces = scene.pieces.map((spec) => createPiece(spec, pad.top, palette));
  const wires = createWires(pad.top, palette, scene.wire);
  const group = new THREE.Group().add(pad.group, wires.group, ...pieces.map((piece) => piece.hinge));
  group.rotation.y = PAD.turn;

  const draw = (p: Palette, idea: Idea) => {
    pad.draw(p, idea);
    wires.paint(p);
    pieces.forEach((piece) => piece.draw(p, idea));
  };

  /** Poses everything for a beat; returns true while something animates on its own (the packets). */
  const pose = (beat: number, seconds: number) => {
    pieces.forEach((piece) => piece.pose(beat));
    return wires.pose(beat, seconds);
  };

  const dispose = () => {
    pad.dispose();
    wires.dispose();
    pieces.forEach((piece) => piece.dispose());
  };

  return { group, draw, pose, dispose };
}
