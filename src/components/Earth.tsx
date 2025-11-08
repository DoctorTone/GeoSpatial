import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  SRGBColorSpace,
  LinearMipmapLinearFilter,
  LinearFilter,
  ClampToEdgeWrapping,
  MeshPhongMaterial,
  Color,
  Group,
} from "three";

const Earth = () => {
  const earthRef = useRef<Group>(null);
  const [day, bump, spec, night] = useTexture([
    "./textures/2_no_clouds_8k.jpg",
    "./textures/2k_earth_normal_map.jpg",
    "./textures/2k_earth_specular_map.jpg",
    "./textures/2k_earth_nightmap.jpg",
  ]);

  // texture tuning
  [day, night, spec, bump].forEach((tex) => {
    if (!tex) return;

    tex.colorSpace = SRGBColorSpace;
    tex.minFilter = LinearMipmapLinearFilter;
    tex.magFilter = LinearFilter;
    tex.anisotropy = 8;
    tex.generateMipmaps = true;
    tex.wrapS = tex.wrapT = ClampToEdgeWrapping;
  });

  const earthMat = useMemo(
    () =>
      new MeshPhongMaterial({
        map: day,
        bumpMap: bump,
        bumpScale: 20,
        specularMap: spec,
        specular: new Color(0x444444),
        shininess: 18,
        // emissiveMap: night, // night lights
        // emissive: new Color(0xffffff),
        // emissiveIntensity: 0.35,
      }),
    [day, bump, spec, night]
  );

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta / 10;
    }
  });

  return (
    <group ref={earthRef} rotation-x={Math.PI / 8}>
      <mesh material={earthMat}>
        <sphereGeometry args={[10, 64, 64]} />
      </mesh>
    </group>
  );
};

export default Earth;
