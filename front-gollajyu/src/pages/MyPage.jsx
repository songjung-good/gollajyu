import React from "react";
import { Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import MyProfile from "../components/MyProfile";
import MyActivities from "../components/MyActivities";
import MyStatistics from "../components/MyStatistics";

const MyPage = () => {
  // ----------- 반응형 웹페이지 구현 -----------
  const isLarge = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const isMedium = useMediaQuery({
    query : "(min-width:768px) and (max-width:1024px)"
  });
  const isSmall = useMediaQuery({
    query : "(max-width:768px)"
  });


  // --------------------------------- css 시작 ---------------------------------

  // ----------- body 스타일 -----------
  const body = {
    // 디자인
    margin: "0 auto",                                // 가로 중앙 정렬
    padding: "50px 0",                               // 상하단 여백: 50px
    width: isLarge ? "1000px" : isMedium ? "740px" : "480px",  // (반응형) 컨텐츠 가로 길이
  };

  // --------------------------------- css 끝 ---------------------------------


  return (
    <>
      <div style={body}>
        <Routes>
          <Route path="/" element={<MyProfile />} />
          <Route path="/MyActivities" element={<MyActivities />} />
          <Route path="/MyStatistics" element={<MyStatistics />} />
        </Routes>
      </div>
    </>
  );
};

export default MyPage;
