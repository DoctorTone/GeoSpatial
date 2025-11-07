import { Sphere } from "@react-three/drei";

const Earth = () => {
  return (
    <Sphere args={[10, 128, 128]}>
      <meshStandardMaterial color={"blue"} />
    </Sphere>
  );
};

export default Earth;
