import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DefaultProfileImage from "/@images/default_profile_img.png";

const SideBarContainer = () => {
  // 메뉴 hover
  const [myProfileHovered, setMyProfileHovered] = useState(false);
  const [myActivitiesHovered, setMyActivitiesHovered] = useState(false);
  const [myActivitiesSummaryHovered, setMyActivitiesSummaryHovered] = useState(false);
  const [myStatisticsSummaryHovered, setMyStatisticsSummaryHovered] = useState(false);
  


  const sidebarStyle = {
    position: "fixed",
    top: "100px",
    left: 0,
    width: "300px",
    height: "100%",
    backgroundColor: "#FFFFFF",
    color: "#000000",
    boxShadow: "5px 30px 30px rgba(0, 0, 0, 0.1)",
  };

  const topBarStyle = {
    marginLeft: "80px",
    height: "5px",
    width: "180px",
    backgroundColor: "#B4B4B4",
  };

  const profileStyle = {
    margin: "100px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // 가운데 정렬을 위해 추가
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
    backgroundColor: "black",
    borderRadius: "50px",                            // 둥근 테두리: 5px
  }

  const nicknameStyle = {
    marginTop: "30px",
    // 글자
    fontFamily: "GmarketSansMedium",                // 중간 폰트로 변경
    fontSize: "24px",                               // 글자 크기: 48px
  }

  const typeStyle = {
    marginTop: "10px",
    // 글자
    fontFamily: "GmarketSansMedium",                // 중간 폰트로 변경
    fontSize: "20px",
    color: "#4A4A4A",                               // 글자 색: 회색
  }

  const menuContainerStyle = {
  };

  const menuStyle = {
    marginTop: "20px",
    padding: "20px 0",
    paddingLeft: "40px",
    fontSize: "24px",                               // 글자 크기: 48px
  };

  const activeMenuStyle = {
    // 글자
    fontFamily: "GmarketSansMedium",                // 활성화 시 중간 폰트로 변경
    textDecoration: "underline",
  }

  const myProfileStyle = {
    ...menuStyle,
    background: myProfileHovered ? "#F7F6F3" : "transparent",  // 마우스 호버 시 배경 색상 변경
  }

  const myActivitiesStyle = {
    ...menuStyle,
    background: myActivitiesHovered ? "#F7F6F3" : "transparent",  // 마우스 호버 시 배경 색상 변경
  }

  const subMenuStyle ={
    marginLeft: "40px",
    padding: "10px 0",
    paddingLeft: "20px",
    fontSize: "20px",                               // 글자 크기: 48px
  }
  
  const myActivitiesSummaryStyle = {
    ...subMenuStyle,
    background: myActivitiesSummaryHovered ? "#F7F6F3" : "transparent",  // 마우스 호버 시 배경 색상 변경
  }

  const myStatisticsSummaryStyle = {
    ...subMenuStyle,
    background: myStatisticsSummaryHovered ? "#F7F6F3" : "transparent",  // 마우스 호버 시 배경 색상 변경
  }


  return (
    <div style={sidebarStyle}>
      <div style={topBarStyle}></div>
      <div style={profileStyle}>
        <img style={imageStyle} src={DefaultProfileImage} alt="프로필 사진" />
        <p style={nicknameStyle}>[닉네임]</p>
        <p style={typeStyle}>[소비성향]</p>
      </div>
      <div style={menuContainerStyle}>
        <div
          style={myProfileStyle}
          onMouseOver={() => setMyProfileHovered(true)}
          onMouseOut={() => setMyProfileHovered(false)}
        >
          <NavLink
            to="/MyPage"
            end  // 경로의 끝 부분이 정확하게 일치할 때만 활성화
            style={({ isActive }) =>
              isActive ? activeMenuStyle : undefined
            }
          >
            내 프로필
          </NavLink>
        </div>
        <div
          style={myActivitiesStyle}
          onMouseOver={() => setMyActivitiesHovered(true)}
          onMouseOut={() => setMyActivitiesHovered(false)}
        >
          <NavLink
            to="/MyPage/MyActivities" 
            style={({ isActive }) =>
              isActive ? activeMenuStyle : undefined
            }
          >
            내 활동
          </NavLink>
        </div>
        <div
          style={myActivitiesSummaryStyle}
          onMouseOver={() => setMyActivitiesSummaryHovered(true)}
          onMouseOut={() => setMyActivitiesSummaryHovered(false)}
        >
          내 활동 요약
        </div>
        <div
          style={myStatisticsSummaryStyle}
          onMouseOver={() => setMyStatisticsSummaryHovered(true)}
          onMouseOut={() => setMyStatisticsSummaryHovered(false)}
        >
          내 통계 요약
        </div>
      </div>
    </div>
  );
};

export default SideBarContainer;
