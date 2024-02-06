import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import MyActivitiesCreated from "./MyActivitiesCreated";
import MyActivitiesParticipated from "./MyActivitiesParticipated";
import MyActivitiesLikded from "./MyActivitiesLikded";
import MyActivitiesCommented from "./MyActivitiesCommented";
import PointImage from "/assets/images/point_img.png";

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
  const isXLarge = useMediaQuery({
    query : "(min-width:1024px)",
  });
  const isLarge = useMediaQuery({
    query : "(min-width:768px) and (max-width:1023.98px)"
  });
  const isMedium = useMediaQuery({
    query : "(min-width:480px) and (max-width:767.98px)"
  });
  const isSmall = useMediaQuery({
    query : "(max-width:479.98px)"
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

  // ----------- 정보 아이템 목록 (임시) -----------
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
      to: "/Mypage/MyActivities/0", 
      label: "참여한 투표",
      smallLabel: "참여투표",
      hovered: ParticipatedPageHovered, 
      mouseEnter: ParticipatedPageMouseEnter,
      mouseLeave: ParticipatedPageMouseLeave 
    },
    { 
      to: "/Mypage/MyActivities/1", 
      label: "좋아요 한 투표",
      smallLabel: "좋아요",
      hovered: LikdedPageHovered, 
      mouseEnter: LikdedPageMouseEnter, 
      mouseLeave: LikdedPageMouseLeave 
    },
    { 
      to: "/Mypage/MyActivities/2", 
      label: "댓글 보관함", 
      smallLabel: "댓글",
      hovered: CommentedPageHovered, 
      mouseEnter: CommentedPageMouseEnter, 
      mouseLeave: CommentedPageMouseLeave 
    },
  ];


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom:
      isXLarge ? "50px" :
      isLarge ? "45px" :
      isMedium ? "40px" : "35px",
  };

  // ----------- flex 컨테이너 스타일 -----------
  const flexContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- 제목 컨테이너 스타일 -----------
  const titleContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    marginBottom: isXLarge || isLarge ? "20px" : "15px",
    height:
      isXLarge ? "60px" :
      isLarge ? "50px" :
      isMedium ? "45px" : "40px",
  };

  // ----------- 제목 스타일 -----------
  const titleTextStyle = {
    // 디자인
    marginTop:
      isXLarge ? "5px" :
      isLarge ? "3px" :
      isMedium ? "5px" : "4px",
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const contentsContainerStyle = {
    // 디자인
    padding:
      isXLarge ? "40px" :
      isLarge ? "35px" :
      isMedium ? "30px" : "25px",
    borderRadius:
      isXLarge ? "50px" :
      isLarge ? "40px" :
      isMedium ? "30px" : "20px",
    background: "#FFFFFF",
  };

  // ----------- 포인트 이미지 스타일 -----------
  const pointImageStyle = {
    // 디자인
    marginRight:
      isXLarge ? "20px" :
      isLarge ? "17px" :
      isMedium ? "14px" : "11px",
    width:
      isXLarge ? "45px" :
      isLarge ? "39px" :
      isMedium ? "33px" : "27px",
    height:
      isXLarge ? "45px" :
      isLarge ? "39px" :
      isMedium ? "33px" : "27px",
    borderRadius: "50%",
  };

  // ----------- 포인트 글자 스타일 -----------
  const pointTextStyle = {
    // 디자인
    marginTop:
      isXLarge ? "8px" :
      isLarge ? "7px" :
      isMedium ? "6px" : "5px",
  };

  // ----------- 포인트 숫자 스타일 -----------
  const pointNumberStyle = {
    // 디자인
    marginTop:
      isXLarge ? "10px" :
      isLarge ? "8px" :
      isMedium ? "8px" : "6px",
    marginLeft: "10px",

    // 글자
    color: "#FFA500",
  };

  // ----------- 구분선 스타일 -----------
  const barStyle = {
    // 디자인
    margin: 
      isXLarge ? "30px 0" :
      isLarge ? "25px 0" :
      isMedium ? "20px 0" : "15px 0",
    width: "100%",
    height: "3px",
    backgroundColor: "#F0F0F0",
  };

  // ----------- 정보 컨테이너 스타일 -----------
  const infoContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    width: "100%",

    // 컨텐츠 정렬
    flexDirection: isXLarge || isLarge ? "row" : "column",
  }

  // ----------- 정보 아이템 스타일 -----------
  const infoItemStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    margin: isXLarge || isLarge ? "10px 0" : "5px 0",
    padding:
      isXLarge ? "10px 20px" :
      isLarge ? "8px 18px" :
      isMedium ? "6px 16px" : "4px 14px",
    width: isXLarge || isLarge ? "50%" : "100%", // (반응형) 큰 화면에서 아이템이 한 줄에 두 개씩 나타나게 함
    height:
      isXLarge ? "60px" :
      isLarge ? "52px" :
      isMedium ? "44px" : "36px",
    backgroundColor: "#F0F0F0",

    // 컨텐츠 정렬
    justifyContent: "space-between",
  };

  // ----------- 왼쪽 아이템 스타일 -----------
  const itemLeftStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    marginRight: 
      isXLarge ? "16px" :
      isLarge ? "12px" : "0px",
  };

  // ----------- 오른쪽 아이템 스타일 -----------
  const itemRightStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    marginLeft:
      isXLarge ? "16px" :
      isLarge ? "12px" : "0px",
  };

  // ----------- 정보 데이터 스타일 -----------
  const infoDataStyle = {
    // 디자인
    marginTop: "3px",

    // 글자
    color: "#4A4A4A",
  };

  // ----------- 링크 컨테이너 스타일 -----------
  const linkContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "flex-end",
  };

  // ----------- 링크 아이템 스타일 -----------
  const linkItemStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    marginRight:
      isXLarge ? "10px" :
      isLarge ? "8px" :
      isMedium ? "6px" : "4px",
    paddingTop:
      isXLarge ? "8px" :
      isLarge ? "7px" :
      isMedium ? "6px" : "5px",
    width: !isSmall ? "20%" : "25%",
    height:
      isXLarge ? "60px" :
      isLarge ? "50px" : "40px",
    borderTopLeftRadius: !isSmall ? "20px" : "10px",
    borderTopRightRadius: !isSmall ? "20px" : "10px",
    background: "#D9D9D9",

    // 글자
    color: "#4A4A4A",

    // 컨텐츠 정렬
    justifyContent: "center",
  };

  // ----------- 링크 버튼 hover 스타일 -----------
  const linkItemHoverStyle = {
    // 상속
    ...linkItemStyle,

    // 디자인
    height:
      isXLarge ? "70px" :
      isLarge ? "60px" : "50px",
  };

  // ----------- 링크 버튼 active 스타일 -----------
  const linkItemActiveStyle = {
    // 상속
    ...linkItemStyle,

    // 디자인
    background: "#FFFFFF",

    // 글자
    height:
      isXLarge ? "70px" :
      isLarge ? "60px" : "50px",
    color: "#000000",
  };

  // ----------- 활동기록 컨테이너 스타일 -----------
  const historyContainerStyle = {
    // 디자인
    padding:
      isXLarge ? "40px" :
      isLarge ? "35px" :
      isMedium ? "30px" : "25px",
    minHeight: // 최소 높이
      isXLarge ? "1000px" :
      isLarge ? "740px" :
      isMedium ? "560px" : "375px",
    borderBottomRadius:
      isXLarge ? "50px" :
      isLarge ? "40px" :
      isMedium ? "30px" : "20px",
    borderTopLeftRadius: "0",
    borderTopRightRadius: !isSmall ? "50px" : "0",
    background: "#FFFFFF",
  };

  // --------------------------------- css 끝 ---------------------------------


  // ----------- 활동정보 렌더링 함수 -----------
  const renderInfoItems = infoItems.map((item, index) => {
    if (index % 2 === 0) {
      return (
        <>
          <div style={infoContainerStyle} key={index}>
            <div style={itemLeftStyle}>
              <div className="fontsize-md">{item.title}</div>
              <div style={infoDataStyle} className="fontsize-sm">{item.count}</div>
            </div>
            {infoItems[index + 1] && (
              <div style={itemRightStyle}>
                <div className="fontsize-md">{infoItems[index + 1].title}</div>
                <div style={infoDataStyle} className="fontsize-sm">{infoItems[index + 1].count}</div>
              </div>
            )}
          </div>
        </>
      );
    }
    return null; // 홀수 index는 처리하지 않음
  });

  return (
    <>
      {/* ------------- 활동정보 ------------- */}
      <div style={containerStyle}>
        <div style={titleContainerStyle}>
          <span style={titleTextStyle} className="fontsize-xl">활동정보</span>
        </div>
        <div style={contentsContainerStyle}>
          <div style={flexContainerStyle}>
            <img
              src={PointImage}
              alt="포인트 이미지"
              style={pointImageStyle}
            />
            <div style={pointTextStyle} className="fontsize-lg">내 포인트</div>
            <div style={pointNumberStyle} className="fontsize-xl">[512]</div>
          </div>
          <div style={barStyle}></div>
          {renderInfoItems}
        </div>
      </div>

      {/* ------------- 활동기록 ------------- */}
      <div style={containerStyle}>
        <div style={titleContainerStyle}>
          <span style={titleTextStyle} className="fontsize-xl">활동기록</span>
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
                <div className="fontsize-sm">{item.smallLabel}</div> // 작은 화면에서 축약된 텍스트로 표시
              ) : (
                <div className="fontsize-sm">{item.label}</div>
              )}
            </MenuItem>
          ))}
        </div>
        <div style={historyContainerStyle}>
          <Routes>
            <Route path="/" element={<MyActivitiesCreated />} />
            <Route path="/0" element={<MyActivitiesParticipated />} />
            <Route path="/1" element={<MyActivitiesLikded />} />
            <Route path="/2" element={<MyActivitiesCommented />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default MyActivities;
