import React from "react";
import Searching from "../modules/Searching";

// 라우터 전달 변수 값을 받기 위해 useLocation을 불러옴
import { useLocation } from "react-router-dom";

function SearchPage() {
  // 라우터 전달 값 받기 객체 생성
  const loc = useLocation();

  // 넘어온 키워드 받기 //////////////////////
  let keyword = loc.state.keyword;

  console.log("검색어:", keyword);

  // 코드 리턴 구역 //////////////////////////
  return (
    <>
      <h1 className="tit">Search Result</h1>
      <Searching kword={keyword} />
    </>
  );
}

export default SearchPage;
