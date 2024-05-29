import logo from "./logo.svg";
import "./App.css";
import $ from "jquery";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    $(".App-header span").hover(
      (e) => {
        // 오버시
        $(e.currentTarget).stop().animate(
          {
            scale: 1.4,
          },
          500
        );
      },
      (e) => {
        // 아웃시
        $(e.currentTarget).stop().animate(
          {
            scale: 1,
          },
          500
        );
      }
    );
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <span>
          <img
            src="https://storage.heypop.kr/assets/2024/03/13205701/main-sil-scaled.jpg"
            className="App-logo"
            alt="logo"
          />
        </span>
        <p>
          실리카겔 MD 빨리 온라인 판매해주세요!!!!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
