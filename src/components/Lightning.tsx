import { latlonToVec3 } from "../Utils/utils";
import points from "../lightning/month_01.json";

const Lightning = () => {
  const pos = latlonToVec3(52.9548, -1.1581, 10.0, 0.01); // radius=1, 0.01 above surface
  return (
    <mesh position={pos}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color="#ff6b00" />
    </mesh>
  );
};

export default Lightning;
