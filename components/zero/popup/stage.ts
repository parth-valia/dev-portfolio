import * as THREE from 'three';
import { placeCamera } from './camera-path';
import type { Idea } from './faces/types';
import { clamp01 } from './ease';
import type { SceneSpec } from './layout';
import { loadFaces, readPalette } from './palette';
import { createWorld } from './world';

/** Phones get a tighter lens so the pad fills the small frame instead of sitting in desktop margins. */
const FOV = { desktop: 30, touch: 24 };
/** Below this width:height the lens widens so the pad keeps the same sideways view on narrow phone frames. */
const MIN_ASPECT = 1.05;
const DPR = { desktop: 2, touch: 2.5 };
const SHADOW_MAP = { desktop: 2048, touch: 1024 };
/** Share of the gap to the scroll target the build closes each frame; the hand leads, the paper follows. */
const FOLLOW = 0.085;
const LEAN = { reach: 0.35, follow: 0.05 };
const SETTLED = 0.0005;

export interface PopupStageOptions {
  canvas: HTMLCanvasElement;
  scene: SceneSpec;
  reduceMotion: boolean;
  touch: boolean;
  /** The scroll position as a beat between 0 and the last beat. */
  readBeat: () => number;
  /** How far to slide the picture at beat 0, as a share of the canvas: [right, down]; it eases back to centre by beat 1. */
  readShift: () => [number, number];
}

function createLights(scene: THREE.Scene, mapSize: number) {
  scene.add(new THREE.HemisphereLight(0xffffff, 0x141414, 1.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(-2.6, 6.5, 3.6);
  key.castShadow = true;
  key.shadow.mapSize.set(mapSize, mapSize);
  Object.assign(key.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 16 });
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  const fill = new THREE.DirectionalLight(0xffffff, 0.5);
  fill.position.set(4, 2, 2);
  scene.add(key, fill);
}

function createRenderer(canvas: HTMLCanvasElement, touch: boolean) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, touch ? DPR.touch : DPR.desktop));
  // iOS GPUs paint the whole shadow-catcher grey with three's shadow maps, so touch screens use the pad's flat shadow instead.
  renderer.shadowMap.enabled = !touch;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.setClearColor(0x000000, 0);
  return renderer;
}

/** The pop-up idea pad: owns the renderer, follows the scroll beat, leans toward the pointer and sleeps offscreen or when nothing moves. */
export function createPopupStage({ canvas, scene: spec, reduceMotion, touch, readBeat, readShift }: PopupStageOptions) {
  const renderer = createRenderer(canvas, touch);
  const scene = new THREE.Scene();
  const lens = touch ? FOV.touch : FOV.desktop;
  const camera = new THREE.PerspectiveCamera(lens, 1, 0.1, 60);
  createLights(scene, touch ? SHADOW_MAP.touch : SHADOW_MAP.desktop);
  let palette = readPalette();
  const world = createWorld(palette, spec, !touch);
  scene.add(world.group);
  const pointer = new THREE.Vector2();
  const lean = new THREE.Vector2();
  const state = { frame: 0, visible: true, dirty: true, flowing: false, beat: readBeat(), seconds: 0, last: performance.now(), idea: { name: '', slug: '' } as Idea };

  const frame = () => {
    const [right, down] = readShift();
    const fade = 1 - clamp01(state.beat);
    const { clientWidth: w, clientHeight: h } = canvas;
    camera.setViewOffset(w, h, -right * fade * w, -down * fade * h, w, h);
  };

  const render = () => {
    const flowing = world.pose(state.beat, reduceMotion ? 0 : state.seconds);
    frame();
    placeCamera(camera, spec.stops, state.beat, lean);
    renderer.render(scene, camera);
    return flowing;
  };

  const step = (now: number) => {
    // rAF timestamps can predate performance.now() on the first frame, so never step backwards.
    const dt = Math.min(Math.max((now - state.last) / 1000, 0), 0.05);
    state.last = now;
    state.seconds += dt;
    const target = readBeat();
    const gap = (reduceMotion ? Math.round(target) : target) - state.beat;
    state.beat += reduceMotion ? gap : gap * FOLLOW;
    const leanGap = lean.clone().sub(pointer).length();
    lean.lerp(pointer, LEAN.follow);
    return Math.abs(gap) > SETTLED || leanGap > SETTLED;
  };

  const tick = (now: number) => {
    state.frame = requestAnimationFrame(tick);
    if (!state.visible) return;
    const moving = step(now);
    if (!moving && !state.dirty && !state.flowing) return;
    state.dirty = false;
    state.flowing = render();
  };

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect >= MIN_ASPECT ? lens : THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(lens / 2)) * (MIN_ASPECT / camera.aspect)));
    camera.updateProjectionMatrix();
    state.dirty = true;
  };

  const setIdea = (idea: Idea) => {
    state.idea = idea;
    world.draw(palette, idea);
    state.dirty = true;
  };

  const repaint = () => {
    palette = readPalette();
    setIdea(state.idea);
  };

  const onPointer = (e: PointerEvent) => pointer.set(((e.clientX / window.innerWidth) * 2 - 1) * LEAN.reach, (-(e.clientY / window.innerHeight) * 2 + 1) * LEAN.reach);
  const observer = new IntersectionObserver(([entry]) => { state.visible = entry.isIntersecting; state.dirty = true; });
  const resizer = new ResizeObserver(resize);
  resizer.observe(canvas);
  observer.observe(canvas);
  resize();
  if (!touch && !reduceMotion) window.addEventListener('pointermove', onPointer, { passive: true });
  loadFaces(palette).then(() => setIdea(state.idea)).catch(() => undefined);
  state.frame = requestAnimationFrame(tick);

  const dispose = () => {
    cancelAnimationFrame(state.frame);
    window.removeEventListener('pointermove', onPointer);
    observer.disconnect();
    resizer.disconnect();
    world.dispose();
    renderer.dispose();
  };

  return { setIdea, repaint, dispose };
}
