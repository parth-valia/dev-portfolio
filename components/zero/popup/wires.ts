import * as THREE from 'three';
import { clamp01, smoothstep } from './ease';
import type { WireSpec } from './layout';
import type { Palette } from './palette';

const TUBE = { segments: 240, radius: 0.016, sides: 8, lift: 0.016 };
const PACKET = { count: 4, radius: 0.04, lapSeconds: 2.6 };

/** Where packet i sits along the drawn wire, always inside [0, drawn] as getPointAt requires. */
const packetAt = (seconds: number, i: number, drawn: number) => {
  const lap = (seconds / PACKET.lapSeconds + i / PACKET.count) % 1;
  return clamp01(Number.isFinite(lap) ? (lap + 1) % 1 : 0) * clamp01(drawn);
};

/** An ink wire that draws itself across the pad, then packets running along the drawn part of it. */
export function createWires(top: number, palette: Palette, wire: WireSpec) {
  const curve = new THREE.CatmullRomCurve3(wire.points.map(([x, z]) => new THREE.Vector3(x, top + TUBE.lift, z)));
  const tubeGeometry = new THREE.TubeGeometry(curve, TUBE.segments, TUBE.radius, TUBE.sides);
  const tubeMaterial = new THREE.MeshStandardMaterial({ color: palette.ink, roughness: 0.4 });
  const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
  tube.castShadow = true;
  const packetGeometry = new THREE.SphereGeometry(PACKET.radius, 16, 12);
  const packetMaterial = new THREE.MeshBasicMaterial({ color: palette.page });
  const packets = Array.from({ length: PACKET.count }, () => new THREE.Mesh(packetGeometry, packetMaterial));
  const group = new THREE.Group().add(tube, ...packets);
  const indices = tubeGeometry.index?.count ?? 0;

  const pose = (beat: number, seconds: number) => {
    const drawn = smoothstep(wire.from, wire.to, beat);
    tubeGeometry.setDrawRange(0, Math.floor((indices * drawn) / (TUBE.sides * 6)) * TUBE.sides * 6);
    const flowing = beat >= wire.flowAt;
    packets.forEach((packet, i) => {
      packet.visible = flowing;
      if (flowing) packet.position.copy(curve.getPointAt(packetAt(seconds, i, drawn)));
    });
    return flowing;
  };

  const paint = (p: Palette) => {
    tubeMaterial.color.set(p.ink);
    packetMaterial.color.set(p.page);
  };

  const dispose = () => [tubeGeometry, tubeMaterial, packetGeometry, packetMaterial].forEach((item) => item.dispose());
  return { group, pose, paint, dispose };
}
