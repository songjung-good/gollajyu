import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  // 항목 hover
  const [votePageHovered, setVotePageHovered] = useState(false);
  const [broadcastPageHovered, setBroadcastPageHovered] = useState(false);
  const [statisticPageHovered, setStatisticPageHovered] = useState(false);
  const [testPageHovered, setTestPageHovered] = useState(false);

  // 버튼 hover
  const [logoutButtonHovered, setLogoutButtonHovered] = useState(false);
  const [loginButtonHovered, setLoginButtonHovered] = useState(false);
  const [signupButtonHovered, setSignupButtonHovered] = useState(false);


  // --------------------------------- css 시작 ---------------------------------
  const navigationBarStyle = {
    // 네비게이션 바 관련
    position: "fixed",                              // 네비게이션 바 상단에 고정
    top: "0px",                                     // 네비게이션 바 고정 위치: 0px
    background: "#FFFFFF",                          // 배경 색상: 흰색
    height: "100px",                                // 네비게이션 바 높이: 100px
    width: "100%",                                  // 네비게이션 바 넓이: 100%
    padding: "0 100px",                             // 네비게이션 좌우 padding: 100px

    // 내부 항목 관련
    display: "flex",                                // 항목 수평 정렬
    justifyContent: "space-between",                // 항목 균일 간격으로 정렬
    alignItems: "center",                           // 항목 수직 정렬
  };

  const logoStyle = {
    // 로고 스타일
    width: "400px",                                 // 넓이: 400px
    fontSize: "48px",                               // 글씨 크기: 48px
    color: "#FFD257",                               // 글씨 색: 노란색
    fontFamily: "GmarketSansBold",                  // 굵은 폰트로 변경
  };

  const listStyle = {
    // 항목 리스트 스타일
    display: "flex",                                // 리스트 수평 정렬
    alignItems: "center",                           // 리스트 수직 정렬
    fontWeight: "bold",                             // 글씨 굵기: 두껍게
    fontSize: "18px",                               // 글씨 크기: 18px
  };

  const commonStyle = {
    // 항목 공통 스타일
    padding: "0 50px",                              // 항목 좌우 padding: 50px
    height: "100px",                                // 항목 높이: 100px
    display: "flex",                                // 링크 수평 정렬
    alignItems: "center",                           // 링크 수직 정렬
  };

  const votePageStyle = {
    // 투표모아쥬 항목 스타일
    ...commonStyle,                                 // commonStyle 가져오기

    // 마우스 오버 시 글자 색 변경
    color: votePageHovered ? "#BEBEBE" : "#4A4A4A",
  };
  
  const broadcastPageStyle = {
    // 지금골라쥬 항목 스타일
    ...commonStyle,                                 // commonStyle 가져오기

    // 마우스 오버 시 글자 색 변경
    color: broadcastPageHovered ? "#BEBEBE" : "#4A4A4A",
  };
  
  const statisticPageStyle = {
    // 통계보여쥬 항목 스타일
    ...commonStyle,                                 // commonStyle 가져오기

    // 마우스 오버 시 글자 색 변경
    color: statisticPageHovered ? "#BEBEBE" : "#4A4A4A",
  };
  
  const testPageStyle = {
    // 소비성향알려쥬 항목 스타일
    ...commonStyle,                                 // commonStyle 가져오기

    // 마우스 오버 시 글자 색 변경
    color: testPageHovered ? "#BEBEBE" : "#4A4A4A",
  };

  const activeItemSStyle = {
    // 활성화 된 아이템 스타일
    fontFamily: "GmarketSansMedium",                // 활성화 시 중간 폰트로 변경
    color: "#4A4A4A",                               // 활성화 시 글씨 색: 진한 회색
  };

  const buttonListStyle = {
    // 버튼 리스트 스타일
    ...listStyle,                                   // listStyle 가져오기
    width: "400px",                                 // 넓이: 400px
    justifyContent: "flex-end",                     // 내부 버튼 오른쪽 정렬
  }

  const myPageStyle = {
    // 내 프로필 페이지 버튼 스타일
    margin: "0 10px",                               // 버튼 좌우 margin: 10px
    display: "flex",                                // 버튼 수평 정렬
    alignItems: "center",                           // 버튼 수직 정렬
  }

  const buttonStyle = {
    // 버튼 공통 스타일
    margin: "0 10px",                               // 버튼 좌우 margin: 10px
    borderRadius: "5px",                            // 둥근 테두리: 5px
    width: "90px",                                  // 버튼 넓이: 90px
    height: "40px",                                 // 버튼 높이: 40px
    cursor: "pointer",                              // 커서: 손가락
    color: "#4A4A4A",
    fontFamily: "GmarketSansMedium",                // 중간 폰트로 변경
    fontWeight: "normal",                           // 글씨 굵기: 보통
    transition: "background 0.5s ease",             // 마우스 오버 시 색깔 천천히 변경
  };

  const logoutButtonStyle = {
    // 로그아웃 버튼 스타일
    ...buttonStyle,                                 // buttonStyle 가져오기
    color: "#9C9C9C",                               // 글씨 색: 회색
    border: "3px solid",                            // 테두리 스타일        
    borderColor: "#BEBEBE",                         // 테두리 색: 연한 회색

    // 마우스 오버 시 배경 색상 변경
    background: logoutButtonHovered ? "#D9D9D9" : "transparent",
  };

  const loginButtonStyle = {
    // 로그인 버튼 스타일
    ...buttonStyle,                                 // buttonStyle 가져오기

    // 마우스 오버 시 배경 색상 변경
    background: loginButtonHovered ? "#ACD145" : "#CEFA70", 
  };

  const signupButtonStyle = {
    // 회원가입 버튼 스타일
    ...buttonStyle,                                 // buttonStyle 가져오기

    // 마우스 오버 시 배경 색상 변경
    background: signupButtonHovered ? "#E6BE3D" : "#FFD257",
  };
  // --------------------------------- css 끝 ---------------------------------


  // const isLoggedIn = true;  // 로그인 상태
  const isLoggedIn = false;  // 비로그인 상태
  
  return (
    <nav style={navigationBarStyle}>
      {/* --------------------------------- 로고 --------------------------------- */}
      <NavLink to="/" style={logoStyle}>
        골라쥬
      </NavLink>

      {/* --------------------------------- 네비게이션 항목 --------------------------------- */}
      <ul style={listStyle}>

        <li
          style={votePageStyle}
          onMouseOver={() => setVotePageHovered(true)}
          onMouseOut={() => setVotePageHovered(false)}
        >
          <NavLink
            to="/VotePage" 
            style={({ isActive }) =>
              isActive ? activeItemSStyle : undefined
            }
          >
            투표모아쥬
          </NavLink>
        </li>
        <li
         style={broadcastPageStyle}
         onMouseOver={() => setBroadcastPageHovered(true)}
         onMouseOut={() => setBroadcastPageHovered(false)}
        >
          <NavLink
            to="/BroadcastPage"
            style={ ({ isActive }) =>
            isActive ? activeItemSStyle : undefined
            }
          >
            지금골라쥬
          </NavLink>
        </li>
        <li
         style={statisticPageStyle}
         onMouseOver={() => setStatisticPageHovered(true)}
         onMouseOut={() => setStatisticPageHovered(false)}
        >
          <NavLink
            to="/StatisticPage"
            style={({ isActive }) =>
            isActive ? activeItemSStyle : undefined
            }
          >
            통계보여쥬
          </NavLink>
        </li>
        <li
         style={testPageStyle}
         onMouseOver={() => setTestPageHovered(true)}
         onMouseOut={() => setTestPageHovered(false)}
        >
          <NavLink
            to="/TestPage"
            style={({ isActive }) =>
            isActive ? activeItemSStyle : undefined
            }
          >
            소비성향알려쥬
          </NavLink>
        </li>
      </ul>

      {/* --------------------------------- 프로필, 회원관리 --------------------------------- */}
      <div style={buttonListStyle}>
        {isLoggedIn ? (
          <>
            {/* ------------- 로그인 시 ------------- */}
            <NavLink to="/MyPage">
              <div style={myPageStyle}>
                <p>[사진]</p>
                <p>[닉네임]</p>
                <p>[150P]</p>
              </div>
            </NavLink>
            <button
              style={logoutButtonStyle}
              onMouseOver={() => setLogoutButtonHovered(true)}
              onMouseOut={() => setLogoutButtonHovered(false)}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            {/* ------------- 비로그인 시 ------------- */}
            <button
              style={loginButtonStyle}
              onMouseOver={() => setLoginButtonHovered(true)}
              onMouseOut={() => setLoginButtonHovered(false)}
            >
              로그인
            </button>
            <button
              style={signupButtonStyle}
              onMouseOver={() => setSignupButtonHovered(true)}
              onMouseOut={() => setSignupButtonHovered(false)}
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
