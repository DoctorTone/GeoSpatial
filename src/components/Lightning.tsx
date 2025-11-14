import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Vector3,
  BufferGeometry,
  ShaderMaterial,
  AdditiveBlending,
  BufferAttribute,
} from "three";
import { latlonToVec3 } from "../Utils/utils";
import { EARTH } from "../state/Config";

interface LightningProps {
  data: {
    lat: number;
    lon: number;
    value: number;
  }[];
}
const baseSize = 12;
const lifespan = 0.6;
const spawnMultiplier = 0.8;

const Lightning = ({ data }: LightningProps) => {
  const { positions, weights, weightSum } = useMemo(() => {
    const pos: Vector3[] = [];
    const wts: number[] = [];
    data.forEach((point) => {
      pos.push(latlonToVec3(point.lat, point.lon, EARTH.RADIUS, EARTH.HEIGHT));
      wts.push(point.value);
    });

    const sum = wts.reduce((a, b) => a + b, 0) || 1;
    return { positions: pos, weights: wts, weightSum: sum };
  }, [data]);

  const maxFlashes = 1200;

  // Geometry attributes (dynamic)
  const geoRef = useRef<BufferGeometry>(null);
  const startRef = useRef<Float32Array>(null);
  const lifeRef = useRef<Float32Array>(null);

  // Build a static “blank” pool at origin; we’ll overwrite slots when spawning.
  const material = useMemo(() => {
    const vsh = `
      attribute float aStart;
      attribute float aLife;
      uniform float uTime;
      varying float vAlpha;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float t = clamp((uTime - aStart) / max(aLife, 0.0001), 0.0, 1.0);
        // Quick flash curve: bright at start, fade out
        float fade = 1.0 - smoothstep(0.0, 1.0, t);
        vAlpha = fade;
        // Distance-based point size
        gl_PointSize = (50.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `;
    const fsh = `
      precision mediump float;
      varying float vAlpha;
      // soft round sprite
      void main() {
        vec2 uv = gl_PointCoord * 2.0 - 1.0;
        float d = dot(uv, uv);                 // 0 center .. 2 corners
        float mask = smoothstep(1.0, 0.7, d);  // soft edge
        // warm lightning color (white core → warm edge)
        vec3 col = mix(vec3(1.0,0.96,0.85), vec3(1.0,0.78,0.30), 0.25);
        gl_FragColor = vec4(col, vAlpha * mask);
      }
    `;
    const mat = new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      vertexShader: vsh,
      fragmentShader: fsh,
      uniforms: { uTime: { value: 0 } },
    });
    return mat;
  }, []);

  // Initialize pool geometry + attributes
  const { geom } = useMemo(() => {
    const g = new BufferGeometry();
    // start with everything at origin
    const pos = new Float32Array(maxFlashes * 3);
    const aStart = new Float32Array(maxFlashes).fill(-9999); // “dead”
    const aLife = new Float32Array(maxFlashes).fill(0);

    g.setAttribute("position", new BufferAttribute(pos, 3));
    g.setAttribute("aStart", new BufferAttribute(aStart, 1));
    g.setAttribute("aLife", new BufferAttribute(aLife, 1));
    return { geom: g };
  }, [maxFlashes, baseSize]);

  // Save attribute refs for mutation
  if (geoRef.current == null && geom) geoRef.current = geom;

  useMemo(() => {
    startRef.current = (
      geoRef.current!.getAttribute("aStart") as BufferAttribute
    ).array as Float32Array;
    lifeRef.current = (geoRef.current!.getAttribute("aLife") as BufferAttribute)
      .array as Float32Array;
  }, [geom]);

  // Helper: sample an index weighted by intensity (simple roulette)
  const sampleIndex = () => {
    if (!weights.length) return -1;
    let r = Math.random() * weightSum;
    for (let i = 0; i < weights.length; i++) {
      r -= weights[i];
      if (r <= 0) return i;
    }
    return weights.length - 1;
  };

  // Spawn logic & per-frame updates
  let writePtr = 0;
  useFrame(({ clock }) => {
    if (!geoRef.current) return;
    const time = clock.getElapsedTime();
    (material.uniforms.uTime as any).value = time;

    const posAttr = geoRef.current.getAttribute("position") as BufferAttribute;
    const aStart = startRef.current!;
    const aLife = lifeRef.current!;

    // Global low-frequency modulation (storms come in waves)
    const global = 0.6 + 0.4 * Math.sin(time * 0.15);

    // Decide how many to try to spawn this frame (scaled by dataset total)
    const targetSpawns = Math.min(
      24,
      Math.ceil((weights.length / 600) * spawnMultiplier * global)
    );

    for (let s = 0; s < targetSpawns; s++) {
      const idx = sampleIndex();
      if (idx < 0) break;

      // Write into the next slot in the pool
      const slot = writePtr;
      writePtr = (writePtr + 1) % maxFlashes;

      const p = positions[idx];
      posAttr.setXYZ(slot, p.x, p.y, p.z);

      aStart[slot] = time;
      aLife[slot] = lifespan * (0.75 + Math.random() * 0.5); // slight variation
    }

    // Flag changes
    posAttr.needsUpdate = true;
    (geoRef.current.getAttribute("aStart") as BufferAttribute).needsUpdate =
      true;
    (geoRef.current.getAttribute("aLife") as BufferAttribute).needsUpdate =
      true;
  });

  return (
    <>
      <points geometry={geom} material={material} />;
    </>
  );
};

export default Lightning;
