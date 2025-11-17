import { useMemo } from "react";
import { AdditiveBlending, BackSide, ShaderMaterial } from "three";
import { EARTH } from "../state/Config";

const Glow = () => {
  const vertShader = `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const fragShader = `
	varying vec3 vNormal;
    void main() {
      float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
      gl_FragColor = vec4(0.4, 0.75, 1.0, 1.0) * intensity;
    }
	`;

  return (
    <mesh>
      <sphereGeometry
        args={[EARTH.RADIUS * 1.03, EARTH.SEGMENTS, EARTH.SEGMENTS]}
      />
      <shaderMaterial
        fragmentShader={fragShader}
        vertexShader={vertShader}
        side={BackSide}
      />
    </mesh>
  );
};

export default Glow;
