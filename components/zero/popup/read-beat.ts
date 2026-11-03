/** Where on screen a copy block counts as "being read", as a share of the viewport height. */
const READ_LINE = 0.5;

const centreOffset = (el: HTMLElement, line: number) => {
  const box = el.getBoundingClientRect();
  return box.top + box.height / 2 - line;
};

/** A continuous beat from the copy blocks: block i at the reading line is beat i, halfway between two blocks is i + 0.5. */
export function readBeat(markers: HTMLElement[]) {
  const offsets = markers.map((el) => centreOffset(el, window.innerHeight * READ_LINE));
  const passed = offsets.findLastIndex((offset) => offset <= 0);
  if (passed < 0) return 0;
  if (passed === offsets.length - 1) return passed;
  return passed - offsets[passed] / (offsets[passed + 1] - offsets[passed]);
}
