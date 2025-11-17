import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { INTERACTIONS, TARGET_POSITION } from "./state/Config";
import Lights from "./components/Lights";
import ResponsiveCamera from "./components/ResponsiveCamera";
import Scene from "./components/Scene";
import UI from "./UI/UI";
import { Suspense } from "react";
import Loading from "./UI/Loading";

function App() {
  return (
    <>
      <Canvas>
        <ResponsiveCamera />
        <Lights />
        <Suspense fallback={<Loading />}>
          <Scene />
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={INTERACTIONS.PAN}
          enableRotate={INTERACTIONS.ROTATE}
          enableDamping={true}
          target={[TARGET_POSITION.X, TARGET_POSITION.Y, TARGET_POSITION.Z]}
        />
      </Canvas>
      <UI />
    </>
  );
}

export default App;
