import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect } from "react";
import Scene from "./Scene";
import { useThree } from "@react-three/fiber";

function App() {
  const state = useThree();

  useEffect(() => {
    state.gl.toneMappingExposure = 5;
  }, [state.gl]);

  return (
    <>
      {/* 배경 옵션 */}
      <Environment
        background={"only"}
        files={"/assets/textures/envmap_blur.hdr"}
        ground={{ height: 100, radius: 300 }}
      />
      <Environment background={false} files={"/assets/textures/envmap.hdr"} />

      {/* 카메라 */}
      <PerspectiveCamera
        makeDefault
        fov={33}
        position={[-0.09, 16.01, -27.9]}
      />
      {/* 컨트롤러 */}
      <OrbitControls
        target={[0.304, 0.806, 0.427]}
        maxPolarAngle={Math.PI * 0.45}
      />

      {/* 메인 모델 호출 */}
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </>
  );
}

export default App;
