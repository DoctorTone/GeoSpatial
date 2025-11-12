import { useMemo, useRef, type JSX } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import {
  SRGBColorSpace,
  LinearMipmapLinearFilter,
  LinearFilter,
  ClampToEdgeWrapping,
  MeshPhongMaterial,
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
} from "three";
import useStore from "../state/store";
import { type GLTF } from "three-stdlib";
type GLTFResult = GLTF & {
  nodes: {
    Sphere: Mesh;
  };
  materials: {
    ["Earth.001"]: MeshStandardMaterial;
  };
};

const Earth = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes } = useGLTF("./models/OpenEarth.glb") as unknown as GLTFResult;
  const earthRef = useRef<Group>(null);
  const [day, bump, spec, night] = useTexture([
    "./textures/2_no_clouds_8k.jpg",
    "./textures/2k_earth_normal_map.jpg",
    "./textures/2k_earth_specular_map.jpg",
    "./textures/2k_earth_nightmap.jpg",
  ]);
  const rotate = useStore((state) => state.autoRotate);

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
    if (!rotate) return;

    if (earthRef.current) {
      earthRef.current.rotation.y += delta / 10;
    }
  });

  return (
    <group {...props} dispose={null} ref={earthRef} rotation={[0, 0, 0]}>
      <mesh material={earthMat}>
        <sphereGeometry args={[10, 64, 64]} />
      </mesh>
    </group>
  );
};

export default Earth;

useGLTF.preload("./models/OpenEarth.glb");
