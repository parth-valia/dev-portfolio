export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export const smoothstep = (from: number, to: number, v: number) => {
  const x = clamp01((v - from) / (to - from));
  return x * x * (3 - 2 * x);
};

const BACK = 1.4;

/** Overshoots a little and settles, like card stock springing upright. */
export const easeOutBack = (v: number) => {
  const x = clamp01(v) - 1;
  return 1 + (BACK + 1) * x * x * x + BACK * x * x;
};
