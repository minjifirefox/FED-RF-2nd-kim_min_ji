import React, { useContext, useEffect, useRef } from "react";
import { addComma } from "../../js/func/common_fn";

import $ from "jquery";
import { pCon } from "./pCon";

function ItemDetail({ cat, ginfo, dt, setGinfo }) {
  // cat - 카테고리
  // ginfo - 상품 정보
  // dt - 상품데이터
  // setGinfo - ginfo값 변경메서드
  console.log(cat, ginfo);

  // 전역 카트 사용 여부 값 업데이트 사용 위해 전역 컨텍스트 사용
  const myCon = useContext(pCon);

  // 제이쿼리 이벤트 함수에 전달할 ginfo값 참조 변수
  const getGinfo = useRef(ginfo);
  // getGinfo참조변수는 새로 들어온 ginfo 전달 값이 달라진 경우
  // 업데이트 한다!
  if(getGinfo.current != ginfo) getGinfo.current = ginfo;

  // [배열 생성 테스트]
  // 1. 배열 변수 = [] -> 배열리터럴
  // -> 생성된 배열을 for문을 돌려서 값을 할당함
  // 2. 배열 객체로 만들기
  // -> new Array(개수) -> 개수만큼 배열 생성
  // -> new 생략하여 인스턴스 생성 가능!(정적객체)
  // -> Array(개수) -> 그.러.나... 빈 배열은 map() 못 돌림! ㅜ.ㅜ
  // 3. 배열에 값을 넣어주는 메서드
  // ->>> 배열.fill(값, 시작번호, 끝번호)
  // fill(값) : 모든 배열 다 같은 값 채우기
  // fill(값,시작번호) : 0부터 시작하는 번호 중 특정 배열부터 끝까지 채움
  // fill(값,시작번호,끝번호) : 시작번호부터 끝번호까지 채움
  // console.log(Array(10));
  // console.log(Array(10).fill(8));
  // console.log(Array(10).fill(7, 2));
  // console.log(Array(10).fill(7, 2, 5));

  // 화면 렌더링 구역 : 한 번만 //////////////////////////////////////////////////////////////
  useEffect(() => {
    // [수량 증감 버튼 클릭시 증감기능구현]

    // 1. 대상 요소
    // (1) 숫자 출력 input
    const sum = $("#sum");

    // (2) 수량 증가 이미지 버튼
    const numBtn = $(".chg_num img");

    // (3) 총 합계 요소
    const total = $("#total");
    // console.log(sum,numBtn);

    // 2. 수량 증감 이벤트 함수 ///////////////
    numBtn.on("click", (e) => {
      // (1) 이미지 순번(구분하려고)
      let seq = $(e.target).index();

      // console.log("버튼 순번:", seq);
      // 0은 증가 / 1은 감소

      // (2) 기존 숫자 값 읽기
      let num = Number(sum.val());

      // console.log("현재 숫자:", num);

      // (3) 증감 반영하기(0은 false, 1은 true 처리)
      sum.val(!seq ? ++num : num == 1 ? 1 : --num);
      // seq가 0이냐? 그럼 증가 : 아니면 num이 1이냐 그럼 1 아니면 감소
      // 증감 기호가 변수 앞에 있어야 먼저 증감하고 할당함!
      console.log("ginfo 전달변수 확인:",ginfo);
      console.log("getGinfo 참조변수 확인:",getGinfo.current);
      // [문제!!! ginfo값으로 읽으면 최초에 세팅된 값이
      // 그대로 유지된다! 왜? 본 함수는 최초 한 번만 세팅되기 때문!]
      // [해결책 : 새로 들어오는 ginfo값을 참조변수에 넣어서
      // 본 함수에서 그 값을 읽으면 된다!]

      // (4) 총 합계 반영하기
      // 원가격은 컴포넌트 전달 변수 ginfo[3] -> 갱신 안됨!
      // 원가격은 참조 변수 getGinfo 사용 -> 매번 업데이트 됨!
      total.text(addComma(getGinfo.current[3]*num)+"원");

    }); //////////////// click //////////////

    // 참고) 제거용 -> numBtn.off("click");
  }, []); // 현재 컴포넌트 처음 생성시 한 번만 실행구역 

  // [ 화면 랜더링 구역 : 매번 ]
  useEffect(()=>{
    // 매번 리랜더링 될때마다 수량 초기화!
    $("#sum").val(1);
    // 총합계 초기화
    $("#total").text(addComma(ginfo[3])+"원");
  });

  // 코드 리턴 구역 //////////////////////////////////////////////////////////////
  return (
    <>
      <a
        href="#"
        className="cbtn"
        onClick={(e) => {
          // 기본 이동 막기
          e.preventDefault();
          // 창 닫기
          $(".bgbx").hide();
        }}
      >
        <span className="ir">닫기버튼</span>
      </a>
      <div id="imbx">
        <div className="inx">
          <section className="gim/g">
            {/* 선택한 상품 큰 이미지 */}
            <img
              src={
                process.env.PUBLIC_URL + `/images/goods/${cat}/${ginfo[0]}.png`
              }
              alt="큰 이미지"
            />
            {/* 작은 상품 이미지
            - 본 상품을 제외한 5개의 상품이 나열되고
            클릭시 본 화면에 상품을 변경해준다!
            단, 같은 카테고리 상품 상위 5개임
            -> 배열을 임의로 만들고 값도 임의로 넣고
            map을 사용하여 코드를 만들어보자!!! */}
            <div className="small">
              {Array(5)
                .fill("")
                .map((v, i) => {
                  // 한 줄 리스트와 같은 번호면 6번 오게 함!
                  // 1~5까지니까!
                  let num = ginfo[0].substr(1) == i + 1 ? 6 : i + 1;
                  // 현재 상품 번호가 1~5 중 같은게 있으면 6번
                  // substr(시작순법,개수) -> 개수 없으면 순번부터 전부 다 가져옴
                  console.log("검사번호:", ginfo[0].substr(1));
                  console.log("변경번호:", num);

                  return (
                    <a
                      href="#"
                      key={i}
                      onClick={(e) => {
                        // 기본 이동 막기
                        e.preventDefault();
                        // 선택 데이터 찾기
                        // -> cat 항목 값 + ginfo[0] 항목
                        let res = dt.find((v) => {
                          if (v.cat == cat && v.ginfo[0] == "m" + num)
                            return true;
                        }); /////// find ///////
                        console.log(res);

                        // 상품 상세 모듈 전달 상태 변수 변경
                        // find에서 받은 값은 객체 값
                        // 그 중 ginfo 속성 값만 필요함!
                        setGinfo(res.ginfo);
                        // 카테고리 값은 바꿀 필요없음!
                      }}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          `/images/goods/${cat}/m${num}.png`
                        }
                        alt="썸네일 이미지"
                      />
                    </a>
                  );
                })}
            </div>
          </section>
          <section className="gdesc scbar">
            <h1>HOME &gt; {cat.toUpperCase()}</h1>
            <div>
              <ol>
                <li>
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/dx_ico_new-28143800.gif"
                    }
                    alt="new버튼"
                  />
                </li>
                <li id="gtit">상품명: {ginfo[1]}</li>
                <li>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/icon_type02_social01.gif"
                    }
                    alt="페이스북"
                  />
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/icon_type02_social02.gif"
                    }
                    alt="트위터"
                  />
                  <img
                    src={process.env.PUBLIC_URL + "/images/icon_mail02.gif"}
                    alt="이메일"
                  />
                  <img
                    src={process.env.PUBLIC_URL + "/images/btn_source_copy.gif"}
                    alt="URL복사"
                  />
                </li>
                <li>
                  <span>판매가</span>
                  <span id="gprice">99,000원</span>
                </li>
                <li>
                  <span>적립금</span>
                  <span>
                    <img
                      src={process.env.PUBLIC_URL + "/images/icon_my_m02.gif"}
                      alt="적립금"
                    />
                    4,950(5%적립)
                  </span>
                </li>
                <li>
                  <span>무이자할부</span>
                  <span>
                    부분 무이자 할부 혜택
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/images/view_btn_nointerest_card.gif"
                      }
                      alt="무이자카드보기"
                    />
                  </span>
                </li>
                <li>
                  <span>상품코드</span> <span id="gcode">DMTS7K731-MG</span>
                </li>
                <li>
                  <span>사이즈</span> <span>95 100 105 110</span>
                </li>
                <li>
                  <span>구매수량</span>
                  <span>
                    <input type="text" id="sum" defaultValue="1" />
                    <b className="chg_num">
                      <img
                        src={process.env.PUBLIC_URL + "/images/cnt_up.png"}
                        alt="증가"
                      />
                      <img
                        src={process.env.PUBLIC_URL + "/images/cnt_down.png"}
                        alt="감소"
                      />
                    </b>
                  </span>
                </li>
                <li>
                  <span>컬러</span> <span></span>
                </li>
                <li>
                  <span>권장계절</span> <span>여름</span>
                </li>
                <li className="tot">
                  <span>총합계</span>
                  <span id="total">99,000원</span>
                </li>
              </ol>
            </div>
            <div>
              <button className="btn btn1">BUY NOW</button>
              <button className="btn"
              onClick={()=>myCon.setCartSts(true)}>
                SHOPPING CART
              </button>
              <button className="btn">WISH LIST</button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default ItemDetail;
