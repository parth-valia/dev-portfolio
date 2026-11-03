/** 16×16 pixel frames for the roaming cat. Each character is one pixel; `.` is transparent. */
export const SPRITE_SIZE = 16;

/** Each pixel letter names a site colour token, so the cat wears the current theme. */
export const PALETTE: Record<string, string> = {
  k: '--z-pet-line',
  w: '--z-pet-fur',
  p: '--z-pet-pink',
  e: '--z-pet-line',
  g: '--z-pet-collar',
  y: '--z-pet-bell',
  l: '--z-soft',
};

const SIT = [
  '................',
  '..kk.......kk...',
  '..kpk.....kpk...',
  '..kwwkkkkkwwk...',
  '..kwwwwwwwwwk...',
  '..kwwewwwewwk...',
  '..kwwwwpwwwwk...',
  '...kwwwwwwwk....',
  '....kggygggk....',
  '...kwwwwwwwwk...',
  '..kwwwwwwwwwk...',
  '..kwwwwwwwwwkk..',
  '..kwwkwwwkwwkwk.',
  '..kwwkwwwkwwkwk.',
  '..kkkk...kkkk.k.',
  '................',
];

const withRows = (base: string[], rows: Record<number, string>) => base.map((row, i) => rows[i] ?? row);

const BLINK = withRows(SIT, { 5: '..kwkkwwwkkwk...' });

const WALK_DOWN = [
  withRows(SIT, { 13: '..kwwk...kwwkwk.', 14: '..kkk.....kkk.k.' }),
  withRows(SIT, { 13: '..kwwkwwwkwwk.k.', 14: '...kkk..kkkk....' }),
];

/** From behind: the face rows become fur. */
const BACK = withRows(SIT, { 5: '..kwwwwwwwwwk...', 6: '..kwwwwwwwwwk...', 8: '....kgggggggk...' });
const WALK_UP = [
  withRows(BACK, { 13: '..kwwk...kwwkwk.', 14: '..kkk.....kkk.k.' }),
  withRows(BACK, { 13: '..kwwkwwwkwwk.k.', 14: '...kkk..kkkk....' }),
];

const SIDE_TOP = [
  '................',
  '................',
  '................',
  '..........k.k...',
  '.k........kwwk..',
  '.kk......kwwwek.',
  '..k......kwwwwpk',
  '..k..kkkkkwwwwk.',
  '..kkkwwwwwgggk..',
  '...kwwwwwwwwwk..',
  '...kwwwwwwwwwk..',
  '...kwwkkkkwwk...',
];
/** Walking right; the component mirrors these for left. */
const WALK_SIDE = [
  [...SIDE_TOP, '...kwk....kwk...', '...kk......kk...', '................', '................'],
  [...SIDE_TOP, '..kwk......kwk..', '..kk........kk..', '................', '................'],
].map((frame) => ['................', ...frame.slice(0, 15)]);

const SLEEP = [
  ...Array.from({ length: 9 }, () => '................'),
  '....kk....kk....',
  '...kpwk..kwpk...',
  '...kwwkkkkwwk...',
  '..kwkkwwwwkkwk..',
  '..kwwwwppwwwwkkk',
  '..kwwwwwwwwwwwwk',
  '...kkkkkkkkkkkk.',
];

/** The personal touch: when idle it opens a laptop and types, paws alternating on the lid. */
const LAPTOP = ['.kkkkkkkkkkkkkk.', '.kllllllllllllk.', '.klllllgglllllk.', '.kllllllllllllk.', '.kkkkkkkkkkkkkk.'];
const TYPE = [
  withRows(SIT, { 10: '.kkkwkkkkkkkkkk.', 11: LAPTOP[1], 12: LAPTOP[2], 13: LAPTOP[3], 14: LAPTOP[4] }),
  withRows(SIT, { 10: '.kkkkkkkkwkkkkk.', 11: LAPTOP[1], 12: LAPTOP[2], 13: LAPTOP[3], 14: LAPTOP[4] }),
];

export const FRAMES = {
  sit: [SIT],
  blink: [BLINK],
  down: WALK_DOWN,
  up: WALK_UP,
  side: WALK_SIDE,
  sleep: [SLEEP],
  type: TYPE,
};

export type Pose = keyof typeof FRAMES;
