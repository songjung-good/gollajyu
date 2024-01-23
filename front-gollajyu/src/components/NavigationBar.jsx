import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  // 메뉴 hover
  const [votePageHovered, setVotePageHovered] = useState(false);
  const [broadcastPageHovered, setBroadcastPageHovered] = useState(false);
  const [statisticPageHovered, setStatisticPageHovered] = useState(false);
  const [testPageHovered, setTestPageHovered] = useState(false);

  // 버튼 hover
  const [logoutButtonHovered, setLogoutButtonHovered] = useState(false);
  const [loginButtonHovered, setLoginButtonHovered] = useState(false);
  const [signupButtonHovered, setSignupButtonHovered] = useState(false);

  // const isLoggedIn = true;  // 로그인 상태
  const isLoggedIn = false;  // 비로그인 상태


  // --------------------------------- css 시작 ---------------------------------
  
  // ----------- 내비게이션 바 스타일 -----------
  const navigationBarStyle = {
    // 위치
    position: "fixed",                              // 내비게이션 바 상단에 고정
    top: "0px",                                     // 내비게이션 바 고정 위치: 0px

    // 디자인
    width: "100%",                                  // 내비게이션 바 넓이: 100%
    height: "100px",                                // 내비게이션 바 높이: 100px
    padding: "0 100px",                             // 내비게이션 좌우 padding: 100px
    background: "#FFFFFF",                          // 배경 색상: 흰색

    // 컨텐츠 정렬
    display: "flex",                                // 항목 수평 정렬
    justifyContent: "space-between",                // 항목 균일 간격으로 정렬
    alignItems: "center",                           // 항목 수직 정렬
  };

  // ----------- 로고 컨테이너 스타일 -----------
  const logoContainerStyle = {
    // 디자인
    width: "400px",                                 // 넓이: 400px
  };

  // ----------- 로고 스타일 -----------
  const logoStyle = {
    // 글자
    fontFamily: "GmarketSansBold",                  // 굵은 폰트로 변경
    fontSize: "48px",                               // 글자 크기: 48px
    color: "#FFD257",                               // 글자 색: 노란색
  }

  // ----------- 내비게이션 바 메뉴 리스트 스타일 -----------
  const listStyle = {
    // 글자
    fontWeight: "bold",                             // 글자 굵기: 두껍게
    fontSize: "18px",                               // 글자 크기: 18px

    // 컨텐츠 정렬
    display: "flex",                                // 리스트 수평 정렬
    alignItems: "center",                           // 리스트 수직 정렬
  };

  // ----------- 내비게이션 바 메뉴 공통 스타일 -----------
  const commonStyle = {
    // 디자인
    padding: "0 50px",                              // 항목 좌우 padding: 50px
    height: "100px",                                // 항목 높이: 100px

    // 컨텐츠 정렬
    display: "flex",                                // 링크 수평 정렬
    alignItems: "center",                           // 링크 수직 정렬
  };

  // ----------- 투표모아쥬 메뉴 스타일 -----------
  const votePageStyle = {
    // 상속
    ...commonStyle,                                 // 메뉴 공통 스타일 상속

    // 글자
    color: votePageHovered ? "#BEBEBE" : "#4A4A4A",  // 마우스 호버 시 글자 색 변경
  };
  
  // ----------- 지금골라쥬 메뉴 스타일 -----------
  const broadcastPageStyle = {
    // 상속
    ...commonStyle,                                 // 메뉴 공통 스타일 상속

    // 글자
    color: broadcastPageHovered ? "#BEBEBE" : "#4A4A4A",  // 마우스 호버 시 글자 색 변경
  };
  
  // ----------- 통계보여쥬 메뉴 스타일 -----------
  const statisticPageStyle = {
    // 상속
    ...commonStyle,                                 // 메뉴 공통 스타일 상속

    // 글자
    color: statisticPageHovered ? "#BEBEBE" : "#4A4A4A",  // 마우스 호버 시 글자 색 변경
  };
  
  // ----------- 소비성향알려쥬 메뉴 스타일 -----------
  const testPageStyle = {
    // 상속
    ...commonStyle,                                 // 메뉴 공통 스타일 상속

    // 글자
    color: testPageHovered ? "#BEBEBE" : "#4A4A4A",  // 마우스 호버 시 글자 색 변경
  };

  // ----------- 활성화 된 메뉴 스타일 -----------
  const activeItemSStyle = {
    // 글자
    fontFamily: "GmarketSansMedium",                // 활성화 시 중간 폰트로 변경
    color: "#4A4A4A",                               // 활성화 시 글자 색: 진한 회색
  };

  // ----------- 버튼 리스트 스타일 -----------
  const buttonListStyle = {
    // 상속
    ...listStyle,                                   // 메뉴 리스트 스타일 상속

    // 디자인
    width: "400px",                                 // 넓이: 400px

    // 컨텐츠 정렬
    justifyContent: "flex-end",                     // 내부 버튼 오른쪽 정렬
  }

  // -----------  내 프로필 페이지 버튼 스타일 -----------
  const myPageStyle = {
    // 디자인
    margin: "0 10px",                               // 버튼 좌우 margin: 10px

    // 컨텐츠 정렬
    display: "flex",                                // 버튼 수평 정렬
    alignItems: "center",                           // 버튼 수직 정렬
  }

  // -----------  버튼 공통 스타일 -----------
  const buttonStyle = {
    // 디자인
    margin: "0 10px",                               // 버튼 좌우 margin: 10px
    width: "90px",                                  // 버튼 넓이: 90px
    height: "40px",                                 // 버튼 높이: 40px
    borderRadius: "5px",                            // 둥근 테두리: 5px
    cursor: "pointer",                              // 커서: 손가락
    transition: "background 0.5s ease",             // 마우스 호버 시 색깔 천천히 변경

    // 글자
    fontFamily: "GmarketSansMedium",                // 중간 폰트로 변경
    fontWeight: "normal",                           // 글자 굵기: 보통
    color: "#4A4A4A",                               // 글자 색: 회색
  };

  // -----------  로그아웃 버튼 스타일 -----------
  const logoutButtonStyle = {
    // 상속
    ...buttonStyle,                                 // 버튼 공통 스타일 상속

    // 디자인
    border: "3px solid",                            // 테두리 스타일        
    borderColor: "#BEBEBE",                         // 테두리 색: 연한 회색
    background: logoutButtonHovered ? "#D9D9D9" : "transparent",  // 마우스 호버 시 배경 색상 변경

    // 글자
    color: "#9C9C9C",                               // 글자 색: 회색
  };

  // -----------  로그인 버튼 스타일 -----------
  const loginButtonStyle = {
    // 상속
    ...buttonStyle,                                 // 버튼 공통 스타일 상속

    // 디자인
    background: loginButtonHovered ? "#ACD145" : "#CEFA70",  // 마우스 호버 시 배경 색상 변경
  };

  // -----------  회원가입 버튼 스타일 -----------
  const signupButtonStyle = {
    // 상속
    ...buttonStyle,                                 // 버튼 공통 스타일 상속

    // 디자인
    background: signupButtonHovered ? "#E6BE3D" : "#FFD257",  // 마우스 호버 시 배경 색상 변경
  };

  // --------------------------------- css 끝 ---------------------------------

  
  return (
    <nav style={navigationBarStyle}>
      {/* --------------------------------- 로고 --------------------------------- */}
      <div style={logoContainerStyle}>
        <NavLink to="/" style={logoStyle}>
          골라쥬
        </NavLink>
      </div>

      {/* --------------------------------- 내비게이션 메뉴 --------------------------------- */}
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
