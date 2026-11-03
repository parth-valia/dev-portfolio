import type { Face } from '../canvas';
import type { Palette } from '../palette';

/** The visitor's idea as the mocks print it. */
export interface Idea {
  name: string;
  slug: string;
}

/** How one pop-up piece looks: lying flat it is a pen sketch, standing up it is the real UI. */
export interface FaceArt {
  sketch: (face: Face, palette: Palette, idea: Idea) => void;
  ink: (face: Face, palette: Palette, idea: Idea) => void;
}
