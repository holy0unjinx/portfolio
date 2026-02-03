import "./App.css";
import Header from "./components/Header";
import Ecoing from "./components/Ecoing";

function App() {
  return (
    <>
      <div id="width-warning">
        이 페이지는 가로 900px 이상에서 최적화되어 있습니다.
      </div>
      <Header />
      <Ecoing />
      <div id="philosophy">
        <img src="images/philosophy.png" alt="" />
      </div>
    </>
  );
}

export default App;
