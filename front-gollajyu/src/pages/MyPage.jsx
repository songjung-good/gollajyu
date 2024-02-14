// 리액트 및 훅/라이브러리
import React, { useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 컴포넌트 불러오기
import MyProfile from "../components/MyPage/MyProfile";
import MyActivities from "../components/MyPage/MyActivities";
import MyStatistics from "../components/MyPage/MyStatistics";


const MyPage = () => {

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // ----------- 링크 목록 -----------
  const mypageLinkItems = [
    { to: "/Mypage", text: "내 프로필 요약" },
    { to: "/Mypage/MyActivities", text: "내 활동 요약" },
    { to: "/Mypage/MyStatistics", text: "내 통계 요약" },
  ];


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 해더 스타일 -----------
  const headerStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    width: "100%",
    height: isXLarge || isLarge ? "260px" : "160px",
    whiteSpace: "nowrap", // 줄바꿈 방지
    
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  }

  // ----------- 해더 컨테이너 스타일 -----------
  const headerContainerStyle = {
    // 디자인
    width: isXLarge ? "1000px" : isLarge ? "740px" : isMedium ? "460px" : "375px",
    hegith: "260px",
    
    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
    alignItems: isXLarge || isLarge ? "flex-start" : "center",
    justifyContent: "center",
  }

  // ----------- 해더 제목 스타일 -----------
  const headerTitleStyle = {
    // 디자인
    marginBottom: "20px",

    // 글자
    fontSize: isXLarge || isLarge ? "32px" : "24px",
    color: "#FFFFFF",
  }

  // ----------- 해더 링크 컨테이너 스타일 -----------
  const headerLinkContainerStyle = {
    // 디자인
    height: "28.5px",
  }

  // ----------- 해더 링크 스타일 -----------
  const headerLinkStyle = {
    // 디자인
    marginRight: isXLarge || isLarge ? "30px" : "15px",

    // 글자
    color: "#4A4A4A",
    fontSize: isXLarge || isLarge ? "19px" : "16px",
    whiteSpace: "nowrap",
  }

  // ----------- 활성화 된 해더 링크 스타일 -----------
  const activeheaderLinkStyle = {
    // 상속
    ...headerLinkStyle,

    // 글자
    color: "#FFFFFF",
  }

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    padding: "50px 0", // 상하단 여백: 50px
    width: isXLarge ? "1000px" : isLarge ? "740px" : isMedium ? "460px" : "375px",
    whiteSpace: "nowrap", // 줄바꿈 방지
  };

  // --------------------------------- css 끝 ---------------------------------


  useEffect(() => {
    window.scrollTo({ top: 0 }); // 페이지 로드되면 최상단으로 가기
  }, []);

  return (
    <>
      {/* ------------- Header ------------- */}
      <div style={headerStyle} className="bg-gradient-to-tl from-blue-400 to-red-400">
        <div style={headerContainerStyle}>
          <p style={headerTitleStyle}>마이 페이지</p>
          <div style={headerLinkContainerStyle}>
            {mypageLinkItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                end
                style={
                  ({ isActive }) => (
                    isActive || (index == 1 && (
                      window.location.pathname.startsWith('/Mypage/MyActivities/0') ||
                      window.location.pathname.startsWith('/Mypage/MyActivities/1') ||
                      window.location.pathname.startsWith('/Mypage/MyActivities/2')
                    ))
                  ) ? activeheaderLinkStyle : headerLinkStyle
                }
              >
                {item.text}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* ------------- Body ------------- */}
      <div style={bodyStyle}>
        <Routes>
          <Route path="/" element={<MyProfile />} />
          <Route path="/MyActivities/*" element={<MyActivities />} />
          <Route path="/MyStatistics" element={<MyStatistics />} />
        </Routes>
      </div>
    </>
  );
};

export default MyPage;
