import React from 'react';
import ReactDOM from 'react-dom/client';
// 사스(Sass)패키지를 설치했다면 바로 사스 사용가능
// 확장자는 여기서는 쓰고 사스 파일 import 생략 가능
import "./css/main.scss";

const root = ReactDOM.createRoot(
  document.getElementById('root'));
root.render(
  <>
    <h1><b>실리카겔</b><span>데져트이글</span></h1>
  </>
);
