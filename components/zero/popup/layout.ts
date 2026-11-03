import type { FaceArt } from './faces/types';

/** The idea pad, in world units: x runs left to right, z from the back edge (-) to the front edge (+). */
export const PAD = { width: 4.6, depth: 4.2, thickness: 0.12, turn: -0.16 };

export interface PieceSpec {
  id: string;
  art: FaceArt;
  /** Centre of the hinge (the piece's bottom edge) on the pad. */
  x: number;
  z: number;
  w: number;
  h: number;
  /** Canvas pixels per world unit. */
  res: number;
  /** Scroll beat where it starts lifting; it stands POP.span later. */
  lift: number;
  /** Slight backward lean once standing, like a pop-up held open. */
  lean: number;
}

/** A drawn wire across the pad, as pad points, with the beats over which it draws and when packets start to run along it. */
export interface WireSpec {
  points: [number, number][];
  from: number;
  to: number;
  flowAt: number;
}

/** A camera stop: [position, look-at], in world units. */
export type Stop = [number, number, number][];

/** Everything one pop-up scene needs: what stands up, what gets wired, where the camera goes at each beat. */
export interface SceneSpec {
  pieces: PieceSpec[];
  wire: WireSpec;
  stops: Stop[];
  /** The box on the pad the visitor's idea is handwritten into, or null for none. */
  handwriting: { x: number; z: number; w: number } | null;
}

/** How much of a beat a pop takes, and where in the pop the sketch inks into real UI. */
export const POP = { span: 0.7, inkFrom: 0.55, inkTo: 0.9 };

