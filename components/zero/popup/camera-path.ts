import * as THREE from 'three';
import { smoothstep } from './ease';
import type { Stop } from './layout';

const from = new THREE.Vector3();
const to = new THREE.Vector3();
const look = new THREE.Vector3();

/** Places the camera between the two stops either side of `beat`, settling on each one. */
export function placeCamera(camera: THREE.PerspectiveCamera, stops: Stop[], beat: number, lean: THREE.Vector2) {
  const a = Math.min(Math.max(Math.floor(beat), 0), stops.length - 1);
  const b = Math.min(a + 1, stops.length - 1);
  const mix = smoothstep(0, 1, beat - a);
  look.lerpVectors(from.set(...stops[a][1]), to.set(...stops[b][1]), mix);
  camera.position.lerpVectors(from.set(...stops[a][0]), to.set(...stops[b][0]), mix);
  camera.position.x += lean.x;
  camera.position.y += lean.y;
  camera.lookAt(look);
}
