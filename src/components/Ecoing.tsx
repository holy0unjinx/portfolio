import "./Ecoing.css";
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
              <img src="images/readme.webp" alt="readme" />
              <p>README</p>
            </li>
            <li>
              <img src="images/mit.webp" alt="mit" />
              <p>MIT license</p>
            </li>
          </ul>
        </div>

        <div className="logo-wrapper">
          <h1>PROJECT 1</h1>
          <img src="/images/ecoing.webp" alt="ecoing-logo" className="logo" />
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
              height: "500px",
              border: "1px solid #535658",
              borderRadius: "1rem",
              marginBottom: "1rem",
            }}
          >
            <ambientLight intensity={1} />
            <directionalLight position={[3, 5, 3]} intensity={1} />

            <Environment files="/model/background.hdr" />
            <Suspense fallback={null}>
              <Model />
            </Suspense>
            <OrbitControls
              enableDamping
              dampingFactor={0.08}
              enablePan={false}
              minDistance={3}
              maxDistance={8}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
          <div className="question-wrapper">
            <p className="question">이 프로젝트 내용 간결하게 요약 해줘</p>
          </div>

          <div className="answer">
            <p>ㅋㅋ 알겠어 알겠어 😅 이정도는 쉽지</p>
            <p>내가 딱 필요한 것만 알기 쉽게 요약해줄게. 😏</p>
            <hr />
            <h1>교내 환경 문제 해결 프로젝트</h1>
            <p>
              시에서 주최한 <b>교내 환경 문제 해결 프로젝트</b>의 일환으로,
            </p>
            <p>자판기 캔이 제대로 분리수거되지 않는 문제를 해결하고자</p>
            <p>
              공병 보증금 제도에서 아이디어를 얻은{" "}
              <b>에코 포인트 연동 캔 수거함</b>을 기획·제작했다.{" "}
            </p>
            <br />
            <p>
              나는 이 프로젝트에서 <b>소프트웨어 개발</b>을 맡아,
            </p>
            <p>캔 수거함에 장착된 센서와 연동해 캔을 버릴 때마다</p>
            <p>자동으로 포인트가 적립되는 시스템과</p>
            <p>학생들이 이를 직관적으로 확인할 수 있는 웹사이트를 개발했다.</p>
            <p>이 과정에서 회원가입·로그인, 바코드 스캔,</p>
            <p>
              라즈베리파이와 아두이노 연동 등 다양한 기술을 스스로 학습하며
              적용했다.
            </p>
            <br />
            <p>또한 팀원들과 역할을 분담해 협력하며 프로젝트를 진행했고,</p>
            <p>
              그 결과 교내 캔 수거율이 <b>30% 이상 증가</b>했으며
            </p>
            <p>
              전교생의 <b>약 20%가 자발적으로 참여</b>하는 성과를 거두었다.
            </p>
            <p>
              (사용 화면 등 자세한 내용은{" "}
              <a href="https://github.com/holy0unjinx/eco-ing" target="_blank">
                Github Repo
              </a>{" "}
              참고)
            </p>
            <hr />
            <p>이 정도면 짧고 간결함, 그래도 내용은 살아 있음 👌</p>
            <p>자연스럽게 Github 리포도 어필 가능 👍</p>
            <p>이거 혹시 어디에 쓸거야? 원하면</p>

            <ul>
              <li>더 짧은 버전</li>
              <li>포트폴리오용</li>
              <li>생활기록부 / 자소서용 톤</li>
            </ul>
            <p>중에서 딱 맞게 또 다듬어줄게👍</p>
          </div>
        </div>
      </section>
    </div>
  );
}
