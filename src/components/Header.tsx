import "./Header.css";
import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";
import FlowText from "./FlowText";

interface ModelProps {
  url: string;
}

const Model = ({ url }: ModelProps) => {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);
  const { mouse, camera } = useThree();

  useFrame(() => {
    if (!ref.current) return;

    const x = mouse.x;
    const y = mouse.y;

    ref.current.lookAt(
      camera.position.x + x,
      camera.position.y + y,
      camera.position.z,
    );
  });

  return (
    <group ref={ref} rotation={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
};

const MouseLight = () => {
  const lightRef = useRef<THREE.SpotLight>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (!lightRef.current) return;
    lightRef.current.position.set(mouse.x * 5.5, mouse.y * 3, 0.5);
  });

  return (
    <spotLight
      ref={lightRef}
      intensity={3}
      distance={30}
      angle={1.2}
      penumbra={1}
      color="#f4d0ff"
    />
  );
};

export default function Header() {
  return (
    <div id="header-wrapper">
      <Canvas
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        className="three-canvas"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={40} />

        <ambientLight intensity={0.5} />
        <MouseLight />
        <Suspense fallback={null}>
          <Model url="/model/myname.glb" />
          <Environment files="/model/background.hdr" />
        </Suspense>
      </Canvas>
      <img
        src="/images/warning-line.png"
        alt="warning-line"
        className="warning-line"
      />

      <FlowText />
      <img src="/images/sticker1.png" alt="sticker1" className="sticker1" />
      <img src="/images/seal1.png" alt="seal1" className="seal1" />
      <img src="/images/cat.png" alt="cat" className="cat" />
      <img src="/images/seal2.png" alt="seal2" className="seal2" />
      <img src="/images/github.png" alt="github" className="github" />
      <img
        src="/images/scroll_down.png"
        alt="scroll_down"
        className="scroll_down"
      />
    </div>
  );
}
