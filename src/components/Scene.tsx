import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import Earth from "./Earth";
import Starfield from "./Starfield";
import Lightning from "./Lightning";
import useStore from "../state/store";
import { Group } from "three";
import { monthlyLightning } from "../data/LightningData";

const Scene = () => {
  const [month, setMonth] = useState(0);
  const data = monthlyLightning[month];
  const rotate = useStore((state) => state.autoRotate);
  const earthRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!rotate) return;

    if (earthRef.current) {
      earthRef.current.rotation.y += delta / 10;
    }
  });

  useEffect(() => {
    const intervalID = setInterval(() => {
      setMonth((month) => (month + 1) % 12);
    }, 5000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <>
      <group dispose={null} ref={earthRef} rotation={[Math.PI / 8, 0, 0]}>
        <Earth />
        <Lightning data={data} />;
      </group>
      <Starfield />;
    </>
  );
};

export default Scene;
