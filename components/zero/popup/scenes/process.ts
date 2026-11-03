import { PROCESS_STEPS } from '@/content/offer';
import { STATIONS } from '@/content/zero';
import { nodeArt } from '../faces/node';
import { NODE_ICONS } from '../faces/node-icons';

/** One icon per station, in STATIONS order: call, plan, build, support. */
const STATION_ICONS = [NODE_ICONS.call, NODE_ICONS.plan, NODE_ICONS.build, NODE_ICONS.support];
import type { PieceSpec, SceneSpec, Stop } from '../layout';

/** Station hinges step diagonally from the front-left corner to the back-right one. */
const STATION_SPOTS: [number, number][] = [[-1.5, 1.45], [-0.5, 0.45], [0.5, -0.55], [1.5, -1.45]];
const STATION = { w: 0.95, h: 0.68, res: 600, leadIn: 0.35 };

/** Fitted so the whole pad and every lit station stay in frame at any panel shape. Beats: overview, then one per station. */
const STOPS: Stop[] = [
  [[5.19, 11.16, 7.56], [0.12, -0.15, 0.16]],
  [[-3.15, 6.68, 9.5], [0.21, -0.02, 0.3]],
  [[-1.58, 6.34, 10.33], [-0.04, 0.04, 0.16]],
  [[1.4, 6.58, 10.92], [-0.21, -0.04, 0.24]],
  [[4.35, 7.91, 10.55], [0.01, -0.05, 0.27]],
];

const stations: PieceSpec[] = STATIONS.map((name, i) => ({
  id: name, art: nodeArt(name, [name, PROCESS_STEPS[i].duration], 80 + i, STATION_ICONS[i]),
  x: STATION_SPOTS[i][0], z: STATION_SPOTS[i][1], w: STATION.w, h: STATION.h, res: STATION.res, lift: i + STATION.leadIn, lean: 0.05,
}));

/** How we work: the wire is drawn stop by stop, and each station stands up and lights as the wire reaches it. */
export const PROCESS_SCENE: SceneSpec = {
  pieces: stations,
  wire: { points: [[-2.15, 1.72], [-1.5, 1.62], [-0.9, 1.25], [-0.5, 0.62], [-0.05, 0.25], [0.5, -0.38], [0.95, -0.75], [1.5, -1.28], [2.1, -1.5]], from: 0.3, to: 4, flowAt: 1 },
  stops: STOPS,
  handwriting: null,
};
