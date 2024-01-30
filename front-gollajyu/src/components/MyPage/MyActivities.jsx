import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import MyActivitiesCreated from "./MyActivitiesCreated";
import MyActivitiesParticipated from "./MyActivitiesParticipated";
import MyActivitiesLikded from "./MyActivitiesLikded";
import MyActivitiesCommented from "./MyActivitiesCommented";
import PointImage from "../../assets/images/point_img.png";

// ----------- Hover 커스텀 훅 -----------
const useHoverState = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return [hovered, handleMouseEnter, handleMouseLeave];
};

// ----------- 메뉴 아이템 함수형 컴포넌트 -----------
const MenuItem = ({ to, style, activeStyle, hoverState, children }) => (
  <NavLink
    to={to}
    end
    style={({ isActive }) =>
      isActive ? activeStyle : style
    }
    onMouseOver={hoverState.handleMouseEnter}
    onMouseOut={hoverState.handleMouseLeave}
  >
    {children}
  </NavLink>  
);

const MyActivities = () => {
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

  // ----------- 링크 메뉴 hover -----------
  const [
    CreatedHovered,
    CreatedMouseEnter,
    CreatedMouseLeave
  ] = useHoverState();

  const [
    ParticipatedPageHovered,
    ParticipatedPageMouseEnter,
    ParticipatedPageMouseLeave
  ] = useHoverState();

  const [
    LikdedPageHovered,
    LikdedPageMouseEnter,
    LikdedPageMouseLeave
  ] = useHoverState();

  const [
    CommentedPageHovered,
    CommentedPageMouseEnter,
    CommentedPageMouseLeave
  ] = useHoverState();


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom: "50px",
  };

  // ----------- 제목 컨테이너 스타일 -----------
  const titleContainerStyle = {
    // 디자인
    marginBottom: "20px",
    height: "60px",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- 제목 스타일 -----------
  const titleTextStyle = {
    // 디자인
    marginTop: "5px",
  
    // 글자
    fontSize: "32px",
  };

  // ----------- 중간 글자 스타일 -----------
  const mediumTextStyle = {
    // 글자
    fontSize: "20px",
    color: "#4A4A4A", // 글자 색: 회색
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const contentsContainerStyle = {
    // 디자인
    padding: "40px",
    minHeight: "1000px", // 최소 높이
    borderRadius: "50px",
    background: "#FFFFFF",
  };

  // ----------- 내 정보 컨테이너 스타일 -----------
  const infoContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- 프로필 이미지 스타일 -----------
  const pointImageStyle = {
    // 디자인
    marginRight: "20px",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
  };

  // ----------- 포인트 글자 스타일 -----------
  const pointTextStyle = {
    // 디자인
    marginTop: "8px",

    // 글자
    fontSize: "24px",
  };

  // ----------- 포인트 숫자 스타일 -----------
  const pointNumberStyle = {
    // 상속
    ...mediumTextStyle,

    // 디자인
    margin: "9px 0 0 10px",

    // 글자
    fontSize: "28px",
    color: "#FFD257",
  };

  // ----------- 구분선 스타일 -----------
  const barStyle = {
    // 디자인
    margin: "30px 0",
    height: "3px",
    width: "100%",
    backgroundColor: "#F0F0F0",
  };

  // ----------- 내 정보 아이템 스타일 -----------
  const infoItemStyle = {
    // 디자인
    padding: "10px 20px",
    width: isSmall? "100%" : "50%",
    height: "60px",
    backgroundColor: "#F0F0F0",

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "space-between", // 항목 균일 간격으로 정렬
    alignItems: "center",
  };

  // ----------- 아이템 서브 컨테이너 스타일 -----------
  const itemSubContainerStyle = {
    // 디자인
    width: "100%",
    margin: !isSmall ? "10px 0" : "0",

    // 컨텐츠 정렬
    display: "flex",
    flexDirection: !isSmall ? "row" : "column",
  }

  // ----------- 왼쪽 아이템 스타일 -----------
  const itemLeftStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    margin: isSmall ? "10px 0" : "0 20px 0 0",
  };

  // ----------- 오른쪽 아이템 스타일 -----------
  const itemRightStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    margin: isSmall ? "10px 0" : "0 0 0 20px",
  };

  // ----------- 아이템 텍스트 스타일 -----------
  const itemTextStyle = {
    // 글자
    fontSize: !isLarge ? "22px" : "24px"
  };

  // ----------- 링크 메뉴 버튼 스타일 -----------
  const linkContainerStyle = {
    // 디자인
    height: "65px",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "flex-end",
  };

  // ----------- 링크 메뉴 버튼 스타일 -----------
  const linkItemStyle = {
    // 디자인
    marginRight: "10px",
    paddingTop: "8px",
    width: "20%",
    height: "60px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    background: "#D9D9D9",

    // 글자
    color: "#4A4A4A",
    fontSize: !isLarge ? "20px" : "22px",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // ----------- 링크 버튼 hover 스타일 -----------
  const linkItemHoverStyle = {
    // 상속
    ...linkItemStyle,

    // 디자인
    height: "70px",
  };

  // ----------- 링크 버튼 active 스타일 -----------
  const linkItemActiveStyle = {
    // 상속
    ...linkItemStyle,

    // 디자인
    background: "#FFFFFF",

    // 글자
    height: "70px",
    width: isSmall ? "40%" : "20%",
    color: "#000000",
  };

  // ----------- 활동기록 컨테이너 스타일 -----------
  const hitoryContainerStyle = {
    // 상속
    ...contentsContainerStyle,

    // 디자인
    borderTopLeftRadius: "0",
    borderTopRightRadius: isSmall ? "0" : "50px",
  };


  // --------------------------------- css 끝 ---------------------------------


  // ----------- 링크 아이템 목록 -----------
  const infoItems = [
    { title: '투표작성', count: '[12]개' },
    { title: '누적 투표 좋아요', count: '[12]' },
    { title: '투표 참여', count: '[12]회' },
    { title: '지금 골라쥬 방송', count: '[12]회' },
    { title: '댓글 작성', count: '[12]개' },
    { title: '누적 댓글 좋아요', count: '[12]' },
  ];

  // ----------- 링크 아이템 목록 -----------
  const linkItems = [
    { 
      to: "/Mypage/MyActivities", 
      label: "작성한 투표", 
      smallLabel: "작성투표",
      hovered: CreatedHovered, 
      mouseEnter: CreatedMouseEnter, 
      mouseLeave: CreatedMouseLeave 
    },
    { 
      to: "/Mypage/MyActivities/MyActivitiesParticipated", 
      label: "참여한 투표",
      smallLabel: "참여투표",
      hovered: ParticipatedPageHovered, 
      mouseEnter: ParticipatedPageMouseEnter,
      mouseLeave: ParticipatedPageMouseLeave 
    },
    { 
      to: "/Mypage/MyActivities/MyActivitiesLikded", 
      label: "좋아요 한 투표",
      smallLabel: "좋아요",
      hovered: LikdedPageHovered, 
      mouseEnter: LikdedPageMouseEnter, 
      mouseLeave: LikdedPageMouseLeave 
    },
    { 
      to: "/Mypage/MyActivities/MyActivitiesCommented", 
      label: "댓글 보관함", 
      smallLabel: "댓글",
      hovered: CommentedPageHovered, 
      mouseEnter: CommentedPageMouseEnter, 
      mouseLeave: CommentedPageMouseLeave 
    },
  ];

  // ----------- 활동정보 렌더링 함수 -----------
  const renderInfoItems = infoItems.map((item, index) => {
    if (index % 2 === 0) {
      return (
        <div style={itemSubContainerStyle} key={index}>
          <div style={itemLeftStyle}>
            <div style={itemTextStyle}>{item.title}</div>
            <div style={mediumTextStyle}>{item.count}</div>
          </div>
          {infoItems[index + 1] && (
            <div style={itemRightStyle}>
              <div style={itemTextStyle}>{infoItems[index + 1].title}</div>
              <div style={mediumTextStyle}>{infoItems[index + 1].count}</div>
            </div>
          )}
        </div>
      );
    }
    return null; // 홀수 index는 처리하지 않음
  });

  return (
    <>
      {/* ------------- 활동정보 ------------- */}
      <div style={containerStyle}>
        <div style={titleContainerStyle}>
          <span style={titleTextStyle}>활동정보</span>
        </div>
        <div style={contentsContainerStyle}>
          <div style={infoContainerStyle}>
            <img
              src={PointImage}
              alt="포인트 이미지"
              style={pointImageStyle}
            />
            <div style={pointTextStyle}>내 포인트</div>
            <div style={pointNumberStyle}>[512]</div>
          </div>
          <div style={barStyle}></div>
          <div style={{
            ...infoContainerStyle,
            flexDirection: "column"
          }}>
            {renderInfoItems}
          </div>
        </div>
      </div>

      {/* ------------- 활동기록 ------------- */}
      <div style={containerStyle}>
        <div style={titleContainerStyle}>
          <span style={titleTextStyle}>활동기록</span>
        </div>
        <div style={linkContainerStyle}>
          {linkItems.map((item, index) => (
            <MenuItem
              key={index}
              to={item.to}
              style={{
                ...(item.hovered ? linkItemHoverStyle : linkItemStyle),
                ...(index === 3 ? { marginRight:"0" } : undefined), // 마지막 요소는 오른쪽 여백 삭제
              }}
              activeStyle={{
                ...linkItemActiveStyle,
                ...(index === 3 ? { marginRight:"0" } : undefined), // 마지막 요소는 오른쪽 여백 삭제
              }}
              hoverState={{
                hovered: item.hovered,
                handleMouseEnter: item.mouseEnter,
                handleMouseLeave: item.mouseLeave
              }}
            >
              {isSmall ? (
                <div>{item.smallLabel}</div> // 작은 화면에서 축약된 텍스트로 표시
              ) : (
                <div>{item.label}</div>
              )}
            </MenuItem>
          ))}
        </div>
        <div style={hitoryContainerStyle}>
          <Routes>
            <Route path="/" element={<MyActivitiesCreated />} />
            <Route path="/MyActivitiesParticipated" element={<MyActivitiesParticipated />} />
            <Route path="/MyActivitiesLikded" element={<MyActivitiesLikded />} />
            <Route path="/MyActivitiesCommented" element={<MyActivitiesCommented />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default MyActivities;
