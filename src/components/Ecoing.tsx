import "./Ecoing.css";
import { IoBookOutline } from "react-icons/io5";
import { RiScales3Line } from "react-icons/ri";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense } from "react";

function Model() {
  const { scene } = useGLTF("/model/bin.glb");
  return <primitive object={scene} />;
}

export default function Ecoing() {
  return (
    <div className="ecoing-wrapper">
      <section id="ecoing">
        <div className="tab">
          <ul>
            <li>
              <IoBookOutline />
              <p>README</p>
            </li>
            <li>
              <RiScales3Line />
              <p>MIT license</p>
            </li>
          </ul>
        </div>

        <div className="logo-wrapper">
          <h1>PROJECT 1</h1>
          <img src="/images/ecoing.png" alt="ecoing-logo" className="logo" />
          <div className="badge-wrapper">
            <a href="https://www.arduino.cc/" target="_blank">
              {" "}
              <img
                src="https://img.shields.io/badge/Arduino-00878F?logo=arduino&logoColor=fff&style=for-the-badge"
                alt=""
              />
            </a>

            <a href="https://www.raspberrypi.com/" target="_blank">
              <img
                src="https://img.shields.io/badge/Raspberry%20Pi-A22846?logo=raspberrypi&logoColor=fff&style=for-the-badge"
                alt=""
              />
            </a>

            <a href="https://svelte.dev/" target="_blank">
              <img
                src="https://img.shields.io/badge/Svelte-FF3E00?logo=svelte&logoColor=fff&style=for-the-badge"
                alt=""
              />
            </a>

            <a href="https://github.com/holy0unjinx/eco-ing" target="_blank">
              <img
                src="https://img.shields.io/badge/GitHub Link-181717?logo=github&logoColor=fff&style=for-the-badge"
                alt=""
              />
            </a>
          </div>
        </div>

        <div className="contents">
          <Canvas
            camera={{ position: [0, 2.3, 4] }}
            style={{
              maxWidth: "500px",
              margin: "0 auto",
              borderRadius: "0.5rem",
              height: "500px",
            }}
          >
            <ambientLight intensity={1} />
            <directionalLight position={[3, 5, 3]} intensity={1} />

            <Environment preset="city" />
            <Suspense fallback={null}>
              <Model />
            </Suspense>
            <OrbitControls
              enableDamping
              dampingFactor={0.08}
              enablePan={false} // 패닝 막기
              minDistance={3}
              maxDistance={8}
              maxPolarAngle={Math.PI / 2} // 위에서 못 내려다보게
            />
          </Canvas>
          <p>안녕하세요 반갑습니다</p>
        </div>
      </section>
    </div>
  );
}
