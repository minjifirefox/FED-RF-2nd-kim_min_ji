// JS실험실 : 04.스크롤액션 JS

// DOM 함수 객체 //////////////
const myFn = {
  // 요소선택함수 ////////
  qs: (x) => document.querySelector(x),
  qsEl: (el, x) => el.querySelector(x),
  qsa: (x) => document.querySelectorAll(x),
  qsaEl: (el, x) => el.querySelectorAll(x),

  // 이벤트셋팅함수
  addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
  //바운딩함수
  getBCR: (ele) => ele.getBoundingClientRect().top,
  // 옵셋탑값 반환함수
  getOT: (ele) => ele.offsetTop,
}; /////// myFn 객체 /////////////

/**************************************************** 
    [ 스크롤 이벤트를 활용한 요소 등장액션 기능구현하기 ]

  1. 사용 이벤트 : scroll
  -> 스크롤 바가 있는 페이지에서 또는 부분박스에서
  스크롤 바가 이동할때 발생하는 이벤트
  -> 주의: wheel 이벤트와는 다르다! 무엇이?
  스크롤바가 이동하지 않아도 마우스 휠이 작동될때 발생한다!
  (휠이벤트는 모바일에서 사용불가!)

  2. 스크롤바 위치값 알아내기 : 세로방향(Y축)
    (1) window.scrollY (IE6~11지원안함)
    (2) document.scrollingElement.scrollTop
    (3) document.documentElement.scrollTop
    (4) document.querySelector('html').scrollTop
    -> 가로방향 스크롤바는 Y대신 X라는 문자를 사용함!

  3. 스크롤 등장 대상요소의 보이는 화면에서의 top값
    getBoundingClientRect().top
    -> 보이는 화면상단을 기준으로 이것보다 위로 갈경우
    마이너스값을 리턴한다!
    -> 기준: 보이는 화면크기를 기준하면 된다!
    -> 윈도우화면 전체: window.innerHeight
    예) 화면의 3/2는 window.innerHeight/3*2
    예) 화면의 4/3는 window.innerHeight/4*3

    ((메서드명 조어 분석))
    getBoundingClientRect()
    get 가져와라
    Bounding 경계선 ( -> 바운딩박스 - 겅계선을 가지는 직사각형 박스)
    Client 보이는 화면
    Rect 사각형
    ->>> BoundingClientRect -> 보이는 화면 사각형 경계선으로부터의 거리를 리턴해주는 메서드
    -> 상단으로부터의 거리는 top 속성
    -> 왼쪽으로부터의 거리는 left 속성
    공통적으로 경계선 아래쪽은 양수, 위쪽은 음수

****************************************************/

// 1. 대상선정 //////////////////////////////////
// 스크롤 등장대상 : .hide-el (별도의 클래스를 줌!)
const scAct = myFn.qsa(".hide-el");
// console.log('대상:',scAct);

// 2. 이벤트 설정 및 함수 호출하기
// 2-1. 글자 등장 함수 호출하기
showLetters();
// 2-2. 스크롤 등장 액션 이벤트 설정하기
myFn.addEvt(window, "scroll", showIt);

// 3. 함수 만들기 ///////////////////////////////
// 3-1. 스크롤 등장 액션 함수
function showIt() {
  // 클래스 on 넣기 함수 호출하기

  // for of 제어문 처리방법
  // for (let x of scAct) addOn(x);

  // forEach 메서드 처리방법
  scAct.forEach(ele=>addOn(ele));

  let pos = myFn.getBCR(scAct[0]);
  // 함수 호출 확인
  //console.log("첫번째 대상 위치 : ", pos);

  if (pos < 500) scAct[0].classList.add("on");
} ////////// showIt 함수 ///////////////////////

// 스크롤 등장 기준 설정 : 화면의 2/3
const CRITERIA = (window.innerHeight / 3) * 2;
// console.log("기준값:", CRITERIA);

// [클래스 on 넣기 함수]
function addOn(ele) {
  // ele- 대상요소
  // 바운딩값 구하기
  let bcrVal = myFn.getBCR(ele);

  // 기존값보다 작을 때 등장
  if (bcrVal < CRITERIA) ele.classList.add("on");
  // 기존값보다 크면 원상복귀(숨김-on빼기)
  else ele.classList.remove("on");
} /////// addOn ////////////////////////

// [글자 등장 세팅하기] /////////////////////////
// 글자 등장 함수 /////
function showLetters() {
  // 1. 대상선정 : .stage
  const stage = myFn.qs(".stage");
  // console.log("대상:", stage);

  // 2. 글자 데이터 변수 할당
  const myText = "신카이 마코토";

  // 3. 데이터 글자 한 글자씩 태그로 싸기
  // for of 사용!

  // html 태그 변수
  let hcode = "";
  // 지연시간 계산을 위한 순번변수
  let seqNum = 0;

  for (let x of myText) {
    // console.log(x);
    if (x === " ") {
      // 스페이스 공백처리
      hcode += "&nbsp;&nbsp;";
    } /// if ///
    else {
      // 글자인 경우 span 태그 랩핑 처리
      hcode += `
        <span
        style="transition-delay: ${seqNum * 0.1}s"
        >
        ${x}</span>`;
    } /// else ///

    // 중요!!! 지연시간 곱해질 순번 증가 하기
    seqNum++;
  } /////// for of /////////

  // 4. 스테이지에 코드 출력하기
  stage.innerHTML = hcode;

  // 5. 일정시간 뒤 등장 클래스 .on 넣기
  setTimeout(() => {
    stage.classList.add("on");
  }, 2000);

  ////////////////////// 글자 스크롤 이벤트 세팅하기 /////////////////////////////
  // 이벤트 대상 : window
  myFn.addEvt(window, "scroll", moveTit);

  // 기준이 되는 포스터 박스 위치 구하기
  const posTop = [];

  scAct.forEach((ele, idx) => {
    posTop[idx] = myFn.getOT(ele);
  }); //// forEach ///////////

  // -> 특정요소의 offsetTop값은 최상위 라인으로부터 떨어진 위치를 의미함!
  // 이것은 스크롤바 이동위치가 해당 요소가 화면 맨 위에 걸린 상태와 같음!
  // ->>> 그러므로 화면 중간에 위치할 때의 값은 화면 높이 값의 절반을 빼주면 된다!
  // posTop[순번] - window.innerHeight/2

  // 화면절반크기 변수(포스터 위치에서 뺄 값!)
  const gap = window.innerHeight/2;

  // console.log('포스터위치:',posTop,gap);

  ////////// 글자 이동함수
  function moveTit() {
    // 스크롤 위치값 구하기
    let scTop = window.scrollY;
    // 호출확인
    // console.log("타이틀 이동!", scTop);

    // 1. 맨 위 원위치하기 : 첫번째 기준보다 작을 때
    if (scTop < posTop[0] - gap) {
      stage.style.top = "0%";
      stage.style.left = "50%";
      stage.style.transition = "1s";
    }
    // 2. 첫번째 포스터 옆으로 이동
    if (scTop > posTop[0] - gap && scTop < posTop[0]) {
      stage.style.top = "50%";
      stage.style.left = "25%";
      stage.style.transition = "2s";
    }
    // 3. 두번째 포스터 옆으로 이동
    if (scTop > posTop[1] - gap && scTop < posTop[1]) {
      stage.style.top = "70%";
      stage.style.left = "65%";
      stage.style.transition = "1s";
    }
    // 4. 세번째 포스터 옆으로 이동
    if (scTop > posTop[2] - gap && scTop < posTop[2]) {
      stage.style.top = "50%";
      stage.style.left = "25%";
      stage.style.transition = ".5s";
    }
  } //////////// moveTit 함수 ////////////////
} ///// showLetters ///////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////떨어지는 여자 구현하기 ///////////////////////////////////////////////////////////////
// 기본원리 : 스크롤 이동에 따른 화면높이값 범위 안에서 떨어지는 여자 이미지가 아래쪽으로 이동 애니함!
// 비례식을 세운다!
// 스크롤 한계 값 : 윈도우 높이 = 스크롤 이동 값 : 이미지 이동 값
// 이미지 이동 값 = 윈도우 높이 * 스크롤 이동 값 / 스크롤 한계 값
// 이미지 이동 값 = winH * scTop / scLimit

// 0. 변수 값 세팅하기
// (1) 스크롤 한계 값 : 전체 document 높이 - 화면 높이
// 문서 전체 document 높이
let docH = document.body.clientHeight;
// 화면 높이
let winH = window.innerHeight;
// 스크롤 한계 값
let scLimit = docH - winH;
console.log('문서높이:',docH,'\n화면높이:',winH,'\n한계값:',scLimit);

// 1. 대상선정 : 떨어지는 여자 요소
const woman = myFn.qs('#woman');

// 2. 스크롤 이벤트 설정하기 : window가 이벤트 대상임!
myFn.addEvt(window,'scroll',moveWoman);

// 3. 함수 만들기
function moveWoman(){
  // 1. 스크롤 위치 값
  let scTop = window.scrollY;
  // console.log('스크롤 위치 값:',scTop);

  // 2. 떨녀 top 값
  let wTop = winH * scTop / scLimit;
  console.log('스위:',scTop,'\n여자:',wTop);
  // 이미지 이동 값 = 윈도우 높이(winH) * 스크롤 이동 값(scTop) / 스크롤 한계 값(scLimit)

  // 3. 떨녀에게 적용하기
  woman.style.top = wTop + 'px';

  // 4. 맨위일때 윗쪽으로 숨기기
  if(scTop === 0) woman.style.top = '-20%';

} /////// moveWoman 함수 /////////////////////////////////////