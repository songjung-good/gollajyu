import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Routes, Route } from "react-router-dom";
import MyProfile from "../components/MyPage/MyProfile";
import MyActivities from "../components/MyPage/MyActivities";
import MyStatistics from "../components/MyPage/MyStatistics";
import { Helmet } from "react-helmet-async";

const MyPage = () => {
  // ----------- 반응형 웹페이지 구현 -----------
  const isXLarge = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const isLarge = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023.98px)",
  });
  const isMedium = useMediaQuery({
    query: "(min-width:480px) and (max-width:767.98px)",
  });
  const isSmall = useMediaQuery({
    query: "(max-width:479.98px)",
  });

  // --------------------------------- css 시작 ---------------------------------

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    padding: "50px 0", // 상하단 여백: 50px
    // (반응형) 컨텐츠 가로 길이
    width: isXLarge
      ? "1000px"
      : isLarge
      ? "740px"
      : isMedium
      ? "560px"
      : "375px",
  };

  // --------------------------------- css 끝 ---------------------------------

  useEffect(() => {
    window.scrollTo({ top: 0 }); // 페이지 로드되면 최상단으로 가기
  }, []);

  return (
    <>
      <Helmet>
        <title>마이페이지</title>
      </Helmet>
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
