import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import DefaultProfileImage from "/@images/default_profile_img.png";


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

// ----------- 버튼 아이템 함수형 컴포넌트 -----------
const ButtonItem = ({ label, style, hoverState }) => (
  <button
    style={{
      ...style,
      ...(hoverState.hovered ? hoverState.hoverStyle : undefined),
    }}
    onMouseOver={hoverState.handleMouseEnter}
    onMouseOut={hoverState.handleMouseLeave}
  >
    {label}
  </button>
);

const NavigationBar = () => {
  // ----------- 메인 메뉴 hover -----------
  const [
    votePageHovered,
    votePageMouseEnter,
    votePageMouseLeave
  ] = useHoverState();

  const [
    broadcastPageHovered,
    broadcastPageMouseEnter,
    broadcastPageMouseLeave
  ] = useHoverState();

  const [
    statisticPageHovered,
    statisticPageMouseEnter,
    statisticPageMouseLeave
  ] = useHoverState();

  const [
    testPageHovered,
    testPageMouseEnter,
    testPageMouseLeave
  ] = useHoverState();

  // ----------- 로그아웃, 로그인, 회원가입 버튼 hover -----------
  const [
    logoutButtonHovered,
    logoutButtonMouseEnter,
    logoutButtonMouseLeave
  ] = useHoverState();

  const [
    loginButtonHovered,
    loginButtonMouseEnter,
    loginButtonMouseLeave
  ] = useHoverState();

  const [
    signupButtonHovered,
    signupButtonMouseEnter,
    signupButtonMouseLeave
  ] = useHoverState();


  // ----------- 프로필 버튼 hover -----------
  const [
    profileHovered,
    profileMouseEnter,
    profileMouseLeave
  ] = useHoverState();

  // ----------- 프로필 아이템 hover -----------
  const [
    myProfileHovered,
    myProfileMouseEnter,
    myProfileMouseLeave
  ] = useHoverState();

  const [
    myActivitiesHovered,
    myActivitiesMouseEnter,
    myActivitiesMouseLeave
  ] = useHoverState();

  const [
    myStatisticsHovered,
    myStatisticsMouseEnter,
    myStatisticsMouseLeave
  ] = useHoverState();

  // ----------- 햄버거 버튼 hover -----------
  const [
    hamburgerHovered,
    hamburgerMouseEnter,
    hamburgerMouseLeave
  ] = useHoverState();



  // ----------- 반응형 웹페이지 구현 -----------
  const isLarge = useMediaQuery({
    query : "(min-width:1024px)"
  });
  const isMedium = useMediaQuery({
    query : "(min-width:768px) and (max-width:1024px)"
  });
  const isSmall = useMediaQuery({
    query : "(max-width:768px)"
  });


  const isLoggedIn = true;  // 로그인 상태
  // const isLoggedIn = false;  // 비로그인 상태


  // --------------------------------- css 시작 ---------------------------------
  
  // ----------- 내비게이션 배경 스타일 -----------
  const navigationBarBackgroundStyle = {
    // 위치
    position: "fixed",                              // 내비게이션 바 상단에 고정
    top: "0px",                                     // 내비게이션 바 고정 위치: 0px

    // 디자인
    width: "100%",                                  // 내비게이션 바 넓이
    height: "100px",                                // 내비게이션 바 높이: 100px
    background: "#FFFFFF",                          // 배경 색상: 흰색
  }

  // ----------- 내비게이션 바 스타일 -----------
  const navigationBarStyle = {
    // 상속
    ...navigationBarBackgroundStyle,                // 배경 스타일 상속

    // 위치
    left: "50%",                                    // 화면 가로 중앙으로 이동
    transform: "translateX(-50%)",                  // 화면 가로 중앙으로 이동

    // 디자인
    width: isLarge ? "90%" : (isMedium ? "740px" : "480px"),  // (반응형) 내비게이션 바 넓이

    // 컨텐츠 정렬
    display: "flex",                                // 항목 수평 정렬
    justifyContent: "space-between",                // 항목 균일 간격으로 정렬
    alignItems: "center",                           // 항목 수직 정렬
  };

  // ----------- 로고 컨테이너 스타일 -----------
  const logoContainerStyle = {
    // 디자인
    width: isSmall ? "200px" : "240px",             // (반응형) 로고 넓이
  };

  // ----------- 로고 스타일 -----------
  const logoStyle = {
    // 글자
    fontFamily: "HSSantokkiRegular",                // 로고 폰트로 변경
    fontSize: "48px",                               // 글자 크기: 48px
    color: "#FFD257",                               // 글자 색: 노란색
  };

  // ----------- 메뉴 컨테이너 스타일 -----------
  const menuContainerStyle = {
    // 디자인
    width: "50%",                                   // 가로 넓이: 50%
    
    // 컨텐츠 정렬
    display: "flex",                                // 리스트 수평 정렬
    alignItems: "center",                           // 리스트 수직 정렬
    justifyContent: "space-between",                // 항목 균일 간격으로 정렬
  }

  // ----------- 메뉴 아이템 스타일 -----------
  const menuStyle = {
    // 디자인
    padding: !isLarge ? "0 15px" : "0px",           // (반응형) 항목 좌우 padding: 15px
    height: "100px",                                // 항목 높이: 100px

    // 글자
    fontSize: isLarge ? "18px" : "16px",            // (반응형) 글자 크기
    color: "#4A4A4A",

    // 컨텐츠 정렬
    display: "flex",                                // 링크 수평 정렬
    alignItems: "center",                           // 링크 수직 정렬
  };

  // ----------- 메뉴 active 스타일 -----------
  const menuActiveStyle = {
    ...menuStyle,

    // 글자
    fontWeight: "bold",
    color: "#000000",
  }

  // ----------- 메뉴 hover 스타일 -----------
  const menuHoverStyle = {
    width: "100%",
    height: "5px",
    transition: "background 0.2s ease",
  }

  // ----------- 버튼 컨테이너 스타일 -----------
  const buttonContainerStyle = {
    // 디자인
    width: !isLarge ? "360px" : "240px",            // (반응형) 버튼 리스트 넓이
    height: "100px",                                // 높이: 100px

    // 컨텐츠 정렬
    display: "flex",                                // 링크 수평 정렬
    alignItems: "center",                           // 링크 수직 정렬
    justifyContent: "flex-end",                     // 내부 버튼 오른쪽 정렬
  }

  // ----------- 프로필 버튼 스타일 -----------
  const myPageStyle = {
    // 디자인
    margin: "0 5px",                                // 버튼 좌우 margin: 5px
    height: "100px",

    // 컨텐츠 정렬
    display: "flex",                                // 버튼 수평 정렬
    alignItems: "center",                           // 버튼 수직 정렬
  }

  // ----------- 프로필 이미지 스타일 -----------
  const profileImageStyle = {
    // 디자인
    marginRight: "10px",                            // 오른쪽 여백: 10px
    width: "35px",                                  // 이미지 가로 길이: 35px
    height: "35px",                                 // 이미지 세로 길이: 35px
    borderRadius: "50%",                            // 둥근 테두리: 50% (원)
  };

  // ----------- 프로필 컨테이너 스타일 -----------
  const profileContainerStyle = {
    // 위치
    position: "absolute",                           // 메뉴 위치 기준
    top: "90px",                                    // 상단 여백: 100px
    right: "0px",                                   // 오른쪽 여백: 0px

    // 디자인
    padding: "10px",                                // 메뉴 내부 여백: 10px
    background: "#FFFFFF",                          // 메뉴 배경 색: 흰색
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)",    // 메뉴 그림자

    // 컨텐츠 정렬
    display: profileHovered ? "flex" : "none",      // 메뉴 오픈 여부
    flexDirection: "column",                        // 아이템 세로 방향으로 배치
    alignItems: "flex-end",                         // 아이템 오른쪽 정렬
  };

  // ----------- 버튼 공통 스타일 -----------
  const buttonStyle = {
    // 디자인
    margin: "0 5px",                                // 버튼 좌우 margin: 10px
    width: "70px",                                  // 버튼 넓이: 90px
    height: "35px",                                 // 버튼 높이: 40px
    borderRadius: "5px",                            // 둥근 테두리: 5px
    transition: "background 0.5s ease",             // 마우스 호버 시 색깔 천천히 변경

    // 글자
    color: "#4A4A4A",                               // 글자 색: 회색
  };

  // ----------- 로그아웃 버튼 스타일 -----------
  const logoutButtonStyle = {
    // 상속
    ...buttonStyle,                                 // 버튼 공통 스타일 상속

    // 디자인
    border: "3px solid",                            // 테두리 스타일        
    borderColor: "#BEBEBE",                         // 테두리 색: 연한 회색

    // 글자
    color: "#9C9C9C",                               // 글자 색: 회색
  };

  // ----------- 로그아웃 버튼 hover 스타일 -----------
  const logoutButtonHoverStyle = {
    // 디자인
    background: "#D9D9D9",  // 마우스 호버 시 배경 색상 변경
  }

  // ----------- 로그인 버튼 스타일 -----------
  const loginButtonStyle = {
    // 상속
    ...buttonStyle,                                 // 버튼 공통 스타일 상속

    // 디자인
    background: "#CEFA70",  // 마우스 호버 시 배경 색상 변경
  };

  // ----------- 로그인 버튼 hover 스타일 -----------
  const loginButtonHoverStyle = {
    // 디자인
    background: "#ACD145",  // 마우스 호버 시 배경 색상 변경
  }
  
  // ----------- 회원가입 버튼 스타일 -----------
  const signupButtonStyle = {
    // 상속
    ...buttonStyle,                                 // 버튼 공통 스타일 상속

    // 디자인
    background: "#FFD257",                          // 마우스 호버 시 배경 색상 변경
  };

  // ----------- 회원가입 버튼 hover 스타일 -----------
  const signupButtonHoverStyle = {
    // 디자인
    background: "#E6BE3D",                          // 마우스 호버 시 배경 색상 변경
  }

  // ----------- 햄버거 버튼 스타일 -----------
  const hamburgerStyle = {
    // 디자인
    marginTop: "5px",                               // 상단 margin: 5px
    width: "50px",                                  // 버튼 가로 길이: 50px
    height: "95px",                                 // 버튼 세로 길이: 95px

    // 글자
    fontSize: "28px",                               // 햄버거 버튼 사이즈
    color: "#4A4A4A",                               // 햄버거 버튼 색
  };

  // ----------- 햄버거 컨테이너 스타일 -----------
  const hamburgerContainerStyle = {
    // 위치
    position: "absolute",                           // 메뉴 위치 기준
    top: "90px",                                    // 상단 여백: 100px
    right: "0px",                                   // 오른쪽 여백: 0px

    // 디자인
    padding: "10px",                                // 메뉴 내부 여백: 10px
    background: "#FFFFFF",                          // 메뉴 배경 색: 흰색
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)",    // 메뉴 그림자

    // 컨텐츠 정렬
    display: hamburgerHovered ? "flex" : "none",    // 메뉴 오픈 여부
    flexDirection: "column",                        // 아이템 세로 방향으로 배치
    alignItems: "flex-end",                         // 아이템 오른쪽 정렬
  };


  // --------------------------------- css 끝 ---------------------------------

  // ----------- 메뉴 아이템 목록 -----------
  const menuItems = [
    { 
      to: "/VotePage", 
      label: "투표모아쥬", 
      hovered: votePageHovered, 
      mouseEnter: votePageMouseEnter, 
      mouseLeave: votePageMouseLeave 
    },
    { 
      to: "/BroadcastPage", 
      label: "지금골라쥬", 
      hovered: broadcastPageHovered, 
      mouseEnter: broadcastPageMouseEnter, 
      mouseLeave: broadcastPageMouseLeave 
    },
    { 
      to: "/StatisticPage", 
      label: "통계보여쥬", 
      hovered: statisticPageHovered, 
      mouseEnter: statisticPageMouseEnter, 
      mouseLeave: statisticPageMouseLeave 
    },
    { 
      to: "/TestPage", 
      label: "소비성향알려쥬", 
      hovered: testPageHovered, 
      mouseEnter: testPageMouseEnter, 
      mouseLeave: testPageMouseLeave 
    },
  ];

  // ----------- 버튼 아이템 목록 -----------
  const buttonItems = [
    { 
      label: "로그아웃",
      style: logoutButtonStyle,
      hovered: logoutButtonHovered, 
      mouseEnter: logoutButtonMouseEnter, 
      mouseLeave: logoutButtonMouseLeave,
      hoverStyle: logoutButtonHoverStyle
    },
    { 
      label: "로그인",
      style: loginButtonStyle,
      hovered: loginButtonHovered, 
      mouseEnter: loginButtonMouseEnter, 
      mouseLeave: loginButtonMouseLeave,
      hoverStyle: loginButtonHoverStyle
    },
    { 
      label: "회원가입",
      style: signupButtonStyle,
      hovered: signupButtonHovered, 
      mouseEnter: signupButtonMouseEnter, 
      mouseLeave: signupButtonMouseLeave,
      hoverStyle: signupButtonHoverStyle
    },
  ];

  // ----------- 프로필 아이템 목록 -----------
  const profileItems = [
    { 
      to: "/Mypage", 
      label: "내 프로필 요약", 
      hovered: myProfileHovered, 
      mouseEnter: myProfileMouseEnter, 
      mouseLeave: myProfileMouseLeave 
    },
    { 
      to: "/Mypage/MyActivities", 
      label: "내 활동 요약", 
      hovered: myActivitiesHovered, 
      mouseEnter: myActivitiesMouseEnter, 
      mouseLeave: myActivitiesMouseLeave 
    },
    { 
      to: "/Mypage/MyStatistics", 
      label: "내 통계 요약", 
      hovered: myStatisticsHovered, 
      mouseEnter: myStatisticsMouseEnter, 
      mouseLeave: myStatisticsMouseLeave 
    },
  ];

  return (
    <>
      <div style={navigationBarBackgroundStyle}></div>
      <nav style={navigationBarStyle}>
        {/* --------------------------------- 로고 --------------------------------- */}
        <div style={logoContainerStyle}>
          <NavLink to="/" style={logoStyle}>
            골라쥬
          </NavLink>
        </div>

        {/* --------------------------------- 내비게이션 메뉴 --------------------------------- */}
        {isLarge && (  // (반응형) min-width:1024px 이상일 경우
          <>
            <div style={menuContainerStyle}>
              {menuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  to={item.to}
                  style={menuStyle}
                  activeStyle={menuActiveStyle}
                  hoverState={{
                    hovered: item.hovered,
                    handleMouseEnter: item.mouseEnter,
                    handleMouseLeave: item.mouseLeave
                  }}
                >
                  <div>
                    <div>{item.label}</div>
                    <div style={{
                      ...menuHoverStyle,
                      background: item.hovered ? "#FFD257" : "#FFFFFF"
                    }}></div>
                  </div>
                </MenuItem>
              ))}
            </div>
          </>
        )}

        {/* --------------------------------- 프로필, 회원관리 --------------------------------- */}
        <div style={buttonContainerStyle}>
          {isLoggedIn ? (  // ------------- 로그인 시 -------------
            <>
              <div onMouseLeave={profileMouseLeave}>
                <button
                  style={myPageStyle}
                  onMouseEnter={profileMouseEnter}
                >
                  <img src={DefaultProfileImage} alt="사진" style={profileImageStyle} />
                  <p>[닉네임]</p>
                </button>
                <div style={profileContainerStyle}>
                  {profileItems.map((item, index) => (
                    <MenuItem
                      key={index}
                      to={item.to}
                      style={{ ...menuStyle, height: "60px" }}
                      activeStyle={{ ...menuActiveStyle, height: "60px" }}
                      hoverState={{
                        hovered: item.hovered,
                        handleMouseEnter: item.mouseEnter,
                        handleMouseLeave: item.mouseLeave
                      }}
                    >
                      <div>
                        <div>{item.label}</div>
                        <div style={{
                          ...menuHoverStyle,
                          background: item.hovered ? "#FFD257" : "#FFFFFF"
                        }}></div>
                      </div>
                    </MenuItem>
                  ))}
                </div>
              </div>
              <ButtonItem
                style={buttonItems[0].style}
                label={buttonItems[0].label}
                hoverState={{
                  hovered: buttonItems[0].hovered,
                  handleMouseEnter: buttonItems[0].mouseEnter,
                  handleMouseLeave: buttonItems[0].mouseLeave,
                  hoverStyle: buttonItems[0].hoverStyle
                }}
              />
            </>
          ) : (  // ------------- 비 로그인 시 -------------
            <>
              {buttonItems.slice(1).map((item, index) => (
                <ButtonItem
                  key={index}
                  style={item.style}
                  label={item.label}
                  hoverState={{
                    hovered: item.hovered,
                    handleMouseEnter: item.mouseEnter,
                    handleMouseLeave: item.mouseLeave,
                    hoverStyle: item.hoverStyle
                  }}
                />
              ))}
            </>
          )}

          {/* ------------- 내비게이션 메뉴 -------------  */}
          {!isLarge && (  // (반응형) min-width:1024px 미만일 경우 메뉴를 햄버거 버튼으로 대체
            <>
              <div onMouseLeave={hamburgerMouseLeave}>
                <button
                  style={hamburgerStyle}
                  onMouseEnter={hamburgerMouseEnter}
                >
                  &#9776;
                </button>
                <div style={hamburgerContainerStyle}>
                  {menuItems.map((item, index) => (
                    <MenuItem
                      key={index}
                      to={item.to}
                      style={{ ...menuStyle, height: "60px", padding: "0 15px" }}
                      activeStyle={{ ...menuActiveStyle, height: "60px" }}
                      hoverState={{
                        hovered: item.hovered,
                        handleMouseEnter: item.mouseEnter,
                        handleMouseLeave: item.mouseLeave
                      }}
                    >
                      <div>
                        <div>{item.label}</div>
                        <div style={{
                          ...menuHoverStyle,
                          background: item.hovered ? "#FFD257" : "#FFFFFF"
                        }}></div>
                      </div>
                    </MenuItem>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
