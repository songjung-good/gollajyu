// 리액트 및 훅/라이브러리
import React from "react";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";


const Footer = () => {

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();


  // --------------------------------- css 시작 ---------------------------------
  
  // ----------- body 스타일 -----------
  const body = {
    // 디자인
    padding: "52px 30px 44px",
    width: "100%",
    height: "240px",
    borderTop: "1px solid #BBBBBB",
    backgroundColor: "#FBFBFB",

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "center",
  }

  // ----------- footer 컨테이너 스타일 -----------
  const footerContainerStyle = {
    // 디자인
    width: isXLarge ? "1000px" : isLarge ? "740px" : isMedium ? "460px" : "375px",

    // 글자
    color: "#4A4A4A",
  
    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column", // 아이템 세로 방향으로 배치
    justifyContent: "space-between",
  }

  // ----------- 내용 스타일 -----------
  const contentStyle = {
    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "space-between",
  }

  // ----------- 로고 스타일 -----------
  const logoStyle = {
    // 글자
    fontFamily: "HSSantokkiRegular", // 로고 폰트로 변경
    fontSize: "36px",
    color: "#FFD257", // 로고 글자 색: 노란색
  }

  // ----------- 정보 컨테이너 스타일 -----------
  const infoContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
  }

  // ----------- 팀 컨테이너 스타일 -----------
  const teamContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: isMedium || isSmall ? "column" : "row",
  }

  // ----------- 팀명 스타일 -----------
  const teamStyle = {
    // 디자인
    marginTop: "14px",

    // 글자
    fontSize: "20px",
  }

  // ----------- 이름 스타일 -----------
  const nameStyle = {
    // 디자인
    marginLeft: "5px",

    // 글자
    fontSize: "14px",
    whiteSpace: "nowrap",
  }

  // --------------------------------- css 끝 ---------------------------------


  return (
    <>
      <footer style={body}>
        <div style={footerContainerStyle}>
          <div style={contentStyle}>
            <p style={logoStyle}>골라쥬</p>
            <p style={teamStyle}>E107 재첩국 팀</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={infoContainerStyle}>
              <p style={{ fontSize: "16px", whiteSpace: "nowrap"}}>
                SSAFY 10기 공통프로젝트
              </p>
              <p style={{ fontSize: "14px", whiteSpace: "nowrap"}}>
                2024.01.08 - 2024.02.16
              </p>
            </div>
            <div style={teamContainerStyle}>
              <div style={{ display: "flex" }}>
                <p style={nameStyle}>김하영</p>
                <p style={nameStyle}>배영환</p>
                <p style={nameStyle}>송승준</p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={nameStyle}>이상훈</p>
                <p style={nameStyle}>이시은</p>
                <p style={nameStyle}>황호철</p>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
