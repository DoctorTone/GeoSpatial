import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import Earth from "./Earth";
import Starfield from "./Starfield";
import Lightning from "./Lightning";
import Glow from "./Glow";
import useStore from "../state/store";
import { Group } from "three";
import { monthlyLightning } from "../data/LightningData";
import { MONTHS } from "../state/Config";

const Scene = () => {
  const [month, setMonth] = useState(0);
  const data = monthlyLightning[month];
  const rotate = useStore((state) => state.autoRotate);
  const earthRef = useRef<Group>(null);
  const setCurrentMonth = useStore((state) => state.setCurrentMonth);

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

  useEffect(() => {
    setCurrentMonth(MONTHS[month]);
  }, [month]);

  return (
    <>
      <group
        dispose={null}
        ref={earthRef}
        rotation={[Math.PI / 8, -Math.PI / 4, 0]}
      >
        <Earth />
        {/* <Glow /> */}
        <Lightning data={data} />;
      </group>
      <Starfield />;
    </>
  );
};

export default Scene;
