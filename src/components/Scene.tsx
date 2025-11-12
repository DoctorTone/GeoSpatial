import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Earth from "./Earth";
import Starfield from "./Starfield";
import Lightning from "./Lightning";
import useStore from "../state/store";
import { Group } from "three";

const Scene = () => {
  const rotate = useStore((state) => state.autoRotate);
  const earthRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!rotate) return;

    if (earthRef.current) {
      earthRef.current.rotation.y += delta / 10;
    }
  });

  return (
    <>
      <group dispose={null} ref={earthRef} rotation={[Math.PI / 8, 0, 0]}>
        <Earth />
        <Lightning />;
      </group>
      <Starfield />;
    </>
  );
};

export default Scene;
