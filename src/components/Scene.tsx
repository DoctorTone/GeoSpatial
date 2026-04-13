import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import Earth from "./Earth";
import Starfield from "./Starfield";
import Lightning from "./Lightning";
import useStore from "../state/store";
import { Group } from "three";
import { monthlyLightning } from "../data/LightningData";
import { EARTH, MONTHS } from "../state/Config";

const Scene = () => {
  const [month, setMonth] = useState(0);
  const data = monthlyLightning[month];
  const rotate = useStore((state) => state.autoRotate);
  const showEquator = useStore((state) => state.showEquator);
  const animate = useStore((state) => state.animatePoints);
  const earthRef = useRef<Group>(null);
  const setCurrentMonth = useStore((state) => state.setCurrentMonth);

  useFrame((_, delta) => {
    if (!rotate) return;

    if (earthRef.current) {
      earthRef.current.rotation.y += delta / 10;
    }
  });

  useEffect(() => {
    if (!animate) return;
    const intervalID = setInterval(() => {
      setMonth((month) => (month + 1) % 12);
    }, 5000);

    return () => clearInterval(intervalID);
  }, [animate]);

  useEffect(() => {
    setCurrentMonth(MONTHS[month]);
  }, [month]);

  return (
    <>
      <group
        dispose={null}
        ref={earthRef}
        rotation={[Math.PI / 14, -Math.PI / 4, 0]}
      >
        <Earth />
        {showEquator && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[EARTH.RADIUS * 1.02, 0.05, 16, 128]} />
            <meshBasicMaterial color="red" />
          </mesh>
        )}
        <Lightning data={data} />;
      </group>
      <Starfield />;
    </>
  );
};

export default Scene;
