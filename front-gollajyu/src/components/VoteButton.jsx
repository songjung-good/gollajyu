import React, { useState } from "react";
import NowGollajyuImage from "/@images/now_gollajyu_img.png";
import SimpleGollajyuImage from "/@images/simple_gollajyu_img.png";
import PurchaseGollajyuImage from "/@images/purchase_gollajyu_img.png";

const VoteButton = () => {
  // 버튼 hover
  const [buttonHovered, setButtonHovered] = useState(false);
  const [nowGollajyuHovered, setNowGollajyuHovered] = useState(false);
  const [simpleGollajyuHovered, setSimpleGollajyuHovered] = useState(false);
  const [purchaseGollajyuHovered, setPurchaseGollajyuHovered] = useState(false);

  // ----------- 투표 생성 버튼 호버/떠남 상태 업데이트 함수 -----------
  const buttonHover = () => {
    setButtonHovered(true);
  };

  const buttonCloseClick = () => {
    setButtonHovered(false);  // X 버튼 클릭 시 떠남 상태로 설정
  };
  
  // ----------- '지금골라쥬!' 버튼 호버/떠남 상태 업데이트 함수 -----------
  const nowGollajyuHover = () => {
    setNowGollajyuHovered(true);
  };

  const nowGollajyuLeave = () => {
    setNowGollajyuHovered(false);
  };

  // ----------- '간단골라쥬!' 버튼 호버/떠남 상태 업데이트 함수 -----------
  const simpleGollajyuHover = () => {
    setSimpleGollajyuHovered(true);
  };

  const simpleGollajyuLeave = () => {
    setSimpleGollajyuHovered(false);
  };

  // ----------- '구매골라쥬!' 버튼 호버/떠남 상태 업데이트 함수 -----------
  const purchaseGollajyHover = () => {
    setPurchaseGollajyuHovered(true);
  };

  const purchaseGollajyLeave = () => {
    setPurchaseGollajyuHovered(false);
  };
  

  // --------------------------------- css 시작 ---------------------------------
  
  // ----------- 버튼 컨테이너 스타일 -----------
  const voteButtonContainerStyle = {
    // 위치
    position: "fixed",                              // 버튼 하단에 고정
    bottom: "50px",                                 // 버튼 고정 위치
    right: "100px",                                 // 버튼 고정 위치
  };

  // ----------- 투표 생성 버튼 스타일 ----------- 
  const voteButtonStyle = {
    // 위치
    position: "relative",                           // 자신을 기준 위치로

    // 디자인
    width: "70px",                                  // 버튼 가로 길이: 70px
    height: "70px",                                 // 버튼 세로 길이: 70px
    borderRadius: "50%",                            // 버튼 둥근 테두리: 원
    backgroundColor: "#FF9999",                     // 버튼 색: 분홍
    cursor: "pointer",                              // 커서: 손가락
    
    // 글자
    fontFamily: "GmarketSansMedium",                // 중간 폰트로 설정
    color: "#FFFFFF",                               // 글자 색: 검정
  };

  // ----------- 투표 상세 설명 박스 스타일 ----------- 
  const boxStyle = {
    // 위치
    position: "absolute",                           // relative를 기준 위치로
    right: "5px",                                   // 오른쪽 여백: 5px
    bottom: "80px",                                 // 아래 여백: 80px

    // 디자인
    width: "300px",                                 // 박스 가로 길이: 300px
    height: "60px",                                 // 박스 세로 길이: 60px
    borderRadius: "50px",                           // 박스 둥근 테두리: 50px
    backgroundColor: "#F0F0F0",                     // 배경 색: 옅은 회색
    
    // 컨텐츠 정렬
    display: "flex",                                // 항목 수평 정렬
    justifyContent: "center",                       // 항목 수직 정렬
    flexDirection: "column",                        // 주축을 수직 방향으로 설정
  };
  
  // ----------- 텍스트 컨테이너 스타일 ----------- 
  const textContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",                                // Flex 컨테이너로 설정
    alignItems: "center",                           // 항목 수직 정렬
  };

  // ----------- 텍스트 스타일 ----------- 
  const textStyle = {
    // 디자인
    marginLeft: "30px",                             // 왼쪽 여백: 30px

    // 글자
    fontFamily: "GmarketSansMedium",                // 중간 폰트로 설정
    color: "#000000",                               // 글자 색: 검정
  };

  // ----------- 포인트 텍스트 스타일 ----------- 
  const textPointStyle = {
    // 상속
    ...textStyle,                                   // 기본 텍스트 스타일 상속

    // 디자인
    marginLeft: "10px",                             // 왼쪽 여백: 10px

    // 글자
    fontFamily: "GmarketSansLight",                 // 얇은 폰트로 설정
    fontWeight: "bold",                             // 굵게 표시
    fontSize: "14px",                               // 글자 크기: 14px
    color: "#FFA800",                               // 글자 색: 주황색
  };

  // ----------- 설명 텍스트 스타일 ----------- 
  const textExplanationStyle = {
    // 상속
    ...textStyle,                                   // 기본 텍스트 스타일 상속

    // 글자
    fontSize: "14px",                               // 글자 크기: 14px
    color: "#4A4A4A",                               // 글자 색: 회색
  };
  
  // ----------- 종류별 투표 버튼 스타일 -----------
  const circleStyle = {
    // 위치
    position: "absolute",                           // relative를 기준 위치로
    right: "50%",                                   // 화면의 중앙을 기준으로 오른쪽 50% 설정
    transform: `translateX(+50%) translateY(${buttonHovered ? 0 : 100}%)`,  // 마우스 호버 시 위치 이동

    // 디자인
    width: "60px",                                  // 원 가로 길이: 60px
    height: "60px",                                 // 원 세로 길이: 60px
    borderRadius: "50%",                            // 원형 모양으로 설정
    backgroundColor: "#FF9999",                     // 배경 색: 분홍
    opacity: buttonHovered ? 1 : 0,                 // 마우스 호버 시 투명도를 1로, 아닐 경우 0으로 설정
    transition: "opacity 0.5s ease, transform 0.5s ease",  // 투명도와 위치 변화에 대한 애니메이션 효과 설정
  };

  // ----------- 지금골라쥬 버튼 스타일 -----------
  const nowCircleStyle = {
    // 상속
    ...circleStyle,                                 // 원 스타일 상속

    // 위치
    bottom: buttonHovered ? "80px" : "-200px",      // 마우스 호버 시 원이 나타나게끔 설정
  };

  // ----------- 간단골라쥬 버튼 스타일 -----------
  const simpleCircleStyle = {
    // 상속
    ...circleStyle,                                 // 원 스타일 상속

    // 위치
    bottom: buttonHovered ? "150px" : "-200px",     // 마우스 호버 시 원이 나타나게끔 설정
  };

  // ----------- 구매골라쥬 버튼 스타일 -----------
  const purchaseCircleStyle = {
    // 상속
    ...circleStyle,                                 // 원 스타일 상속

    // 위치
    bottom: buttonHovered ? "220px" : "-200px",     // 마우스 호버 시 원이 나타나게끔 설정
  };

  // ----------- 이미지 스타일 -----------
  const imageStyle = {
    // 디자인
    width: "100%",                                  // 이미지 가로 길이 100%
    height: "100%",                                 // 이미지 세로 길이 100%
    borderRadius: "50%",                            // 둥근 테두리 설정
    objectFit: "cover",                             // 이미지가 부모 요소에 맞게 자동 조절되도록 설정
  };

  // ----------- 닫기 버튼 스타일 -----------
  const closeButtonStyle = {
    // 위치
    position: "absolute",                           // relative를 기준으로 고정
    bottom: buttonHovered ? "290px" : "-200px",     // 마우스 호버 시 버튼이 나타나게끔 설정
    transform: `translateX(+50%) translateY(${buttonHovered ? 0 : 100}%)`,  // 마우스 호버 시 위치 이동

    // 디자인
    right: "50%",                                   // 화면의 중앙을 기준으로 오른쪽 50% 설정
    width: "60px",                                  // 버튼 가로 길이: 60px
    opacity: buttonHovered ? 1 : 0,                 // 마우스 호버 시 투명도를 1로, 아닐 경우 0으로 설정
    transition: "opacity 0.5s ease, transform 0.5s ease",  // 투명도와 위치 변화에 대한 애니메이션 효과 설정

    // 글자
    fontFamily: "GmarketSansMedium",                // 중간 폰트로 설정
    color: "#4A4A4A",                               // 글자 색: 회색
  };

  // --------------------------------- css 끝 ---------------------------------


  return (
    <div
      style={voteButtonContainerStyle}
      onMouseEnter={buttonHover}
    >
      <button style={voteButtonStyle}>
        투표<br />
        생성

        {/* --------------------------------- '지금골라쥬!' 버튼 --------------------------------- */}
        <div onMouseLeave={nowGollajyuLeave}>

          {/* ------------- 설명란 ------------- */}
          {nowGollajyuHovered && (
            <div style={boxStyle}>
              <div style={textContainerStyle}>
                <div style={textStyle}>지금골라쥬!</div>
                <div style={textPointStyle}>(10P 차감됩니다)</div>
              </div>
              <div style={textContainerStyle}>
                <div style={textExplanationStyle}>라이브 방송으로 선택을 맡겨봐요</div>
              </div>
            </div>
          )}

          {/* ------------- 이미지 ------------- */}
          <div
            style={nowCircleStyle}
            onMouseEnter={nowGollajyuHover}
          >
            <img style={imageStyle} src={NowGollajyuImage} alt="지금골라쥬" />
          </div>
        </div>

        {/* --------------------------------- '간단골라쥬!' 버튼 --------------------------------- */}
        <div onMouseLeave={simpleGollajyuLeave}>

          {/* ------------- 설명란 ------------- */}
          {simpleGollajyuHovered && (
            <div style={{ ...boxStyle, bottom: "150px" }}>
              <div style={textContainerStyle}>
                <div style={textStyle}>간단골라쥬!</div>
                <div style={textPointStyle}>(10P 차감됩니다)</div>
              </div>
              <div style={textContainerStyle}>
                <div style={textExplanationStyle}>간단한 질문으로 선택을 맡겨봐요</div>
              </div>
            </div>
          )}

          {/* ------------- 이미지 ------------- */}
          <div
            style={simpleCircleStyle}
            onMouseEnter={simpleGollajyuHover}
          >
            <img style={imageStyle} src={SimpleGollajyuImage} alt="간단골라쥬" />
          </div>
        </div>

        {/* --------------------------------- '구매골라쥬!' 버튼 --------------------------------- */}
        <div onMouseLeave={purchaseGollajyLeave}>

          {/* ------------- 설명란 ------------- */}
          {purchaseGollajyuHovered && (
            <div style={{ ...boxStyle, bottom: "220px" }}>
              <div style={textContainerStyle}>
                <div style={textStyle}>구매골라쥬!</div>
                <div style={textPointStyle}>(10P 차감됩니다)</div>
              </div>
              <div style={textContainerStyle}>
                <div style={textExplanationStyle}>상세한 질문으로 선택을 맡겨봐요</div>
              </div>
            </div>
          )}

          {/* ------------- 이미지 ------------- */}
          <div
            style={purchaseCircleStyle}
            onMouseEnter={purchaseGollajyHover}
          >
            <img style={imageStyle} src={PurchaseGollajyuImage} alt="구매골라쥬" />
          </div>
        </div>

        {/* --------------------------------- 투표 생성 닫기 버튼 --------------------------------- */}
        <div style={closeButtonStyle} onClick={buttonCloseClick}>X</div>
      </button>
    </div>
  );
};

export default VoteButton;
