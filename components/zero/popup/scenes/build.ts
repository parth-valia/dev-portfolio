import { MOCK } from '@/content/zero';
import { inkBrowser, sketchBrowser } from '../faces/browser';
import { inkChat, sketchChat } from '../faces/chat';
import { nodeArt } from '../faces/node';
import { NODE_ICONS } from '../faces/node-icons';
import { inkPhone, sketchPhone } from '../faces/phone';
import type { SceneSpec, Stop } from '../layout';

/** Every stop frames the whole pad and every standing piece, at any panel shape from a phone band to a 1920 screen; the angle does the focusing. */
const STOPS: Stop[] = [
  [[0.27, 14.76, 8.41], [-0.22, 1.01, -1.41]],
  [[-4.5, 6.55, 9.91], [0.03, 0.17, 0.53]],
  [[-1.16, 6.09, 10.56], [-0.11, 0.34, 0.08]],
  [[5.23, 6.83, 11.02], [0.03, 0.29, 0.24]],
  [[3.51, 5.32, 11.95], [-0.05, 0.51, 0.45]],
  [[-7.46, 9.56, 8.11], [-0.12, 0.11, 0.23]],
];

/** The hero build: phone, website, AI chat and the workflow cards, wired together, then the pull-back to "Shipped." Beats: idea, mobile, web, AI, workflow, shipped. */
export const BUILD_SCENE: SceneSpec = {
  pieces: [
    { id: 'phone', art: { sketch: sketchPhone, ink: inkPhone }, x: -1.42, z: 0.72, w: 0.9, h: 1.8, res: 711, lift: 0.3, lean: 0.06 },
    { id: 'web', art: { sketch: sketchBrowser, ink: inkBrowser }, x: 0.36, z: -0.18, w: 2.5, h: 1.6, res: 640, lift: 1.3, lean: 0.1 },
    { id: 'ai', art: { sketch: sketchChat, ink: inkChat }, x: 1.42, z: 0.74, w: 1.3, h: 0.9, res: 800, lift: 2.3, lean: 0.04 },
    { id: 'crm', art: nodeArt(MOCK.sketch.crm, MOCK.crm, 41, NODE_ICONS.crm), x: 0.98, z: 1.86, w: 0.7, h: 0.5, res: 800, lift: 3.2, lean: 0 },
    { id: 'alert', art: nodeArt(MOCK.sketch.alert, MOCK.alert, 53, NODE_ICONS.alert), x: 1.86, z: 1.86, w: 0.7, h: 0.5, res: 800, lift: 3.35, lean: 0 },
  ],
  wire: { points: [[-1.42, 0.86], [-0.5, 0.92], [0.6, 0.9], [1.42, 0.88], [1.2, 1.3], [0.98, 1.72], [1.42, 1.62], [1.86, 1.72]], from: 3.4, to: 4.5, flowAt: 4.2 },
  stops: STOPS,
  handwriting: { x: -2.1, z: 1.0, w: 2.7 },
};
