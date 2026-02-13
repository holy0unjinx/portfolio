import "./App.css";
import Header from "./components/Header";
import Ecoing from "./components/Ecoing";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    const preload = document.getElementById("preload-screen");
    if (preload) {
      preload.style.opacity = "0";
      preload.style.transition = "opacity 0.8s ease";
      setTimeout(() => preload.remove(), 800);
    }
  }, []);

  return (
    <>
      <div id="width-warning">
        이 페이지는 가로 900px 이상에서 최적화되어 있습니다.
      </div>
      <Header />
      <Ecoing />
      <div id="philosophy">
        <img src="images/philosophy.webp" alt="" />
      </div>
    </>
  );
}

export default App;
