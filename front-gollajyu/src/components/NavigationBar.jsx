import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import DefaultProfileImage from "/assets/images/default_profile_img.png";
import useAuthStore from "../stores/userState";
import useModalStore from "../stores/modalState";

// ----------- 커스텀 훅 -----------
const useHoverState = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const handleClick = () => setHovered(!hovered);

  return [hovered, handleMouseEnter, handleMouseLeave, handleClick];
};

// ----------- 메뉴 아이템 함수형 컴포넌트 -----------
const MenuItem = ({ to, style, activeStyle, onClick, hoverState, children }) => (
  <NavLink
    to={to}
    end
    style={({ isActive }) => (isActive ? activeStyle : style)}
    onClick={onClick}
    onMouseOver={hoverState.handleMouseEnter}
    onMouseOut={hoverState.handleMouseLeave}
  >
    {children}
  </NavLink>
);

// ----------- 버튼 아이템 함수형 컴포넌트 -----------
const ButtonItem = ({ label, style, hoverState, onClick }) => (
  <button
    style={{
      ...style,
      ...(hoverState.hovered ? hoverState.hoverStyle : undefined),
    }}
    onMouseOver={hoverState.handleMouseEnter}
    onMouseOut={hoverState.handleMouseLeave}
    onClick={onClick}
  >
    {label}
  </button>
);

const NavigationBar = () => {
  // ----------- 메인 메뉴 hover -----------
  const [votePageHovered,
    votePageMouseEnter,
    votePageMouseLeave
  ] = useHoverState();

  const [
    broadcastPageHovered,
    broadcastPageMouseEnter,
    broadcastPageMouseLeave,
  ] = useHoverState();

  const [
    statisticPageHovered,
    statisticPageMouseEnter,
    statisticPageMouseLeave,
  ] = useHoverState();

  const [
    testResultPageHovered,
    testResultPageMouseEnter,
    testResultPageMouseLeave,
  ] = useHoverState();

  // ----------- 프로필 버튼 hover -----------
  const [profileHovered, profileMouseEnter, profileMouseLeave, profileClick] =
    useHoverState();

  // ----------- 프로필 아이템 hover -----------
  const [myProfileHovered, myProfileMouseEnter, myProfileMouseLeave] =
    useHoverState();

  const [myActivitiesHovered, myActivitiesMouseEnter, myActivitiesMouseLeave] =
    useHoverState();

  const [myStatisticsHovered, myStatisticsMouseEnter, myStatisticsMouseLeave] =
    useHoverState();

  // ----------- 로그아웃, 로그인, 회원가입 버튼 hover -----------
  const [logoutButtonHovered, logoutButtonMouseEnter, logoutButtonMouseLeave] =
    useHoverState();

  const [loginButtonHovered, loginButtonMouseEnter, loginButtonMouseLeave] =
    useHoverState();

  const [signupButtonHovered, signupButtonMouseEnter, signupButtonMouseLeave] =
    useHoverState();

  // ----------- 햄버거 버튼 hover -----------
  const [hamburgerHovered, hamburgerMouseEnter, hamburgerMouseLeave, hamburgerClick] =
    useHoverState();

  // ----------- 반응형 웹페이지 구현 -----------
  const isLarge = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const isMedium = useMediaQuery({
    query: "(min-width:768px) and (max-width:1024px)",
  });
  const isSmall = useMediaQuery({
    query: "(max-width:768px)",
  });

  // ----------- 로그인, 로그아웃, 회원가입 버튼 클릭 시의 동작에 관한 함수 -----------
  const setLoggedOut = useAuthStore((state) => state.setLoggedOut);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setLoginModalOpen = useModalStore((state) => state.setLoginModalOpen);
  const setSignupModalOpen = useModalStore((state) => state.setSignupModalOpen);

  const handleLogin = () => {
    // isLoginModalOpen을 true로
    setLoginModalOpen();
  };

  const handleSignup = () => {
    // isSignupModalOpen을 true로
    setSignupModalOpen();
  };

  const checkLoggedIn = (event) => {
    // TODO :: 비로그인 사용자의 네비게이션 바 이용 막아야함
    if (!isLoggedIn) {
      console.log(event.target);
      // console.log(isLoggedIn);
      setLoginModalOpen();
    }
  };


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 내비게이션 배경 스타일 -----------
  const navigationBarBackgroundStyle = {
    // 위치
    position: "fixed", // 내비게이션 바 상단에 고정
    top: "0px", // 내비게이션 바 고정 위치: 0px
    zIndex: 49, // 내비게이션 바를 가장 위의 레이어에 고정

    // 디자인
    width: "100%", // 내비게이션 바 배경 넓이
    height: "100px", // 내비게이션 바 높이
    background: "#FFFFFF", // 배경 색상: 흰색
  };

  // ----------- 내비게이션 바 스타일 -----------
  const navigationBarStyle = {
    // 상속
    ...navigationBarBackgroundStyle, // 배경 스타일 상속

    // 위치
    left: "50%", // 화면 가로 중앙으로 이동
    transform: "translateX(-50%)", // 화면 가로 중앙으로 이동

    // 디자인
    width: isLarge ? "95%" : (isMedium ? "740px" : "480px"), // (반응형) 내비게이션 바 넓이

    // 컨텐츠 정렬
    display: "flex", // 항목 수평 정렬
    justifyContent: "space-between", // 항목 균일 간격으로 정렬
    alignItems: "center", // 항목 수직 정렬
  };

  // ----------- 로고 컨테이너 스타일 -----------
  const logoContainerStyle = {
    // 디자인
    width: "200px"
  };

  // ----------- 로고 스타일 -----------
  const logoStyle = {
    // 글자
    fontFamily: "HSSantokkiRegular", // 로고 폰트로 변경
    fontSize: "48px", // 로고 글자 크기
    color: "#FFD257", // 로고 글자 색: 노란색
  };

  // ----------- 링크 컨테이너 스타일 -----------
  const linkContainerStyle = {
    // 디자인
    width: "50%", // 가로 넓이
    
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center", // 리스트 수직 정렬
    justifyContent: "space-between", // 항목 균일 간격으로 정렬
  };

  // ----------- 링크 아이템 스타일 -----------
  const linkItemStyle = {
    // 디자인
    padding: !isLarge ? "0 15px" : "0px", // (반응형) 항목 좌우 padding
    height: "100px", // 항목 높이

    // 글자
    fontSize: isLarge ? "20px" : "18px", // (반응형) 글자 크기
    color: "#4A4A4A",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center", // 링크 수직 정렬
  };

  // ----------- 링크 아이템 active 스타일 -----------
  const linkItemActiveStyle = {
    // 상속
    ...linkItemStyle, // 링크 아이템 스타일 상속

    // 글자
    fontWeight: "bold", // 활성화 시 글자 두껍게
    color: "#000000", // 활성화 시 글자 색: 검정
  };

  // ----------- 아이템 hover 스타일 -----------
  const itemHoverStyle = {
    // 디자인
    width: "100%", // 가로 길이
    height: "5px", // 세로 길이
    background: "#FFD257",
    transition: "background 0.2s ease", // 나타날 때 애니메이션
  };

  // ----------- 버튼 컨테이너 스타일 -----------
  const buttonContainerStyle = {
    // 디자인
    width: "280px", // 버튼 리스트 넓이
    height: "100px", // 높이

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center", // 링크 수직 정렬
    justifyContent: "flex-end", // 내부 버튼 오른쪽 정렬
  };

  // ----------- 프로필 컨테이너 스타일 -----------
  const profileContainerStyle = {
    // 위치
    position: "relative", // 기준 위치
  };

  // ----------- 프로필 버튼 스타일 -----------
  const myPageStyle = {
    // 디자인
    margin: "0 10px", // 버튼 좌우 margin
    height: "100px", // 버튼 높이

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center", // 버튼 수직 정렬
  };

  // ----------- 프로필 이미지 스타일 -----------
  const profileImageStyle = {
    // 디자인
    marginRight: isLarge ? "10px" : "0", // (반응형) 오른쪽 여백
    width: "35px", // 이미지 가로 길이
    height: "35px", // 이미지 세로 길이
    borderRadius: "50%", // 둥근 테두리: 50% (원)
  };

  // ----------- 프로필 닉네임 스타일 -----------
  const nickNameStyle = {
    // 디자인
    marginTop: "5px",

    // 글자
    fontSize: "20px", // 닉네임 글자 크기

    display: !isLarge ? "none" : undefined, // (반응형) 작은 화면에서 닉네임 렌더링 하지 않음
  }

  // ----------- 공통 메뉴 스타일 -----------
  const commonMenuStyle = {
    // 위치
    position: "absolute", // 메뉴 위치 기준
    top: "90px", // 상단 여백
    right: "0px", // 오른쪽 여백

    // 디자인
    padding: "10px", // 메뉴 내부 여백
    width: "180px", // 가로 길이
    background: "#FFFFFF", // 메뉴 배경 색: 흰색
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)", // 메뉴 그림자

    // 컨텐츠 정렬
    flexDirection: "column", // 아이템 세로 방향으로 배치
    alignItems: "flex-end", // 아이템 오른쪽 정렬
  };

  // ----------- 프로필 메뉴 스타일 -----------
  const profileMenuStyle = {
    // 상속
    ...commonMenuStyle, // 공통 메뉴 스타일 상속

    // 컨텐츠 정렬
    display: profileHovered ? "flex" : "none", // 메뉴 오픈 여부
  };

  // ----------- 메뉴 아이템 스타일 -----------
  const menuItemStyle = {
    // 디자인
    padding: "0 15px", // 항목 좌우 padding
    height: "60px", // 항목 높이

    // 글자
    fontSize: "18px", // 글자 크기
    color: "#4A4A4A", // 글자 색: 회색

    // 컨텐츠 정렬
    display: "flex", // 링크 수평 정렬
    alignItems: "center", // 링크 수직 정렬
  };

  // ----------- 메뉴 아이템 active 스타일 -----------
  const menuItemActiveStyle = {
    // 상속
    ...menuItemStyle, // 메뉴 아이템 스타일 상속

    // 글자
    fontWeight: "bold", // 글자 두껍게
    color: "#000000", // 글자 색: 검정
  };

  // ----------- 버튼 공통 스타일 -----------
  const buttonStyle = {
    // 디자인
    margin: "0 10px", // 버튼 좌우 margin
    width: "70px", // 버튼 넓이
    height: "35px", // 버튼 높이
    borderRadius: "5px", // 둥근 테두리
    transition: "background 0.5s ease", // 마우스 호버 시 색깔 천천히 변경

    // 글자
    color: "#4A4A4A", // 글자 색: 회색
  };

  // ----------- 로그아웃 버튼 스타일 -----------
  const logoutButtonStyle = {
    // 상속
    ...buttonStyle, // 버튼 공통 스타일 상속

    // 디자인
    border: "3px solid", // 테두리 스타일
    borderColor: "#BEBEBE", // 테두리 색: 연한 회색

    // 글자
    color: "#9C9C9C", // 글자 색: 회색
  };

  // ----------- 로그아웃 버튼 hover 스타일 -----------
  const logoutButtonHoverStyle = {
    // 디자인
    background: "#D9D9D9", // 마우스 호버 시 배경 색상 변경
  };

  // ----------- 로그인 버튼 스타일 -----------
  const loginButtonStyle = {
    // 상속
    ...buttonStyle, // 버튼 공통 스타일 상속

    // 디자인
    background: "#CEFA70", // 마우스 호버 시 배경 색상 변경
  };

  // ----------- 로그인 버튼 hover 스타일 -----------
  const loginButtonHoverStyle = {
    // 디자인
    background: "#ACD145", // 마우스 호버 시 배경 색상 변경
  };

  // ----------- 회원가입 버튼 스타일 -----------
  const signupButtonStyle = {
    // 상속
    ...buttonStyle, // 버튼 공통 스타일 상속

    // 디자인
    background: "#FFD257", // 마우스 호버 시 배경 색상 변경
  };

  // ----------- 회원가입 버튼 hover 스타일 -----------
  const signupButtonHoverStyle = {
    // 디자인
    background: "#E6BE3D", // 마우스 호버 시 배경 색상 변경
  };

  // ----------- 햄버거 컨테이너 스타일 -----------
  const hamburgerContainerStyle = {
    position: "relative", // 기준 위치
  };

  // ----------- 햄버거 버튼 스타일 -----------
  const hamburgerStyle = {
    // 디자인
    marginTop: "5px", // 상단 margin
    width: "50px", // 버튼 가로 길이
    height: "95px", // 버튼 세로 길이

    // 글자
    fontSize: "28px", // 햄버거 버튼 사이즈
    color: "#4A4A4A", // 햄버거 버튼 색
  };

  // ----------- 햄버거 메뉴 스타일 -----------
  const hamburgerMenuStyle = {
    // 상속
    ...commonMenuStyle, // 공통 메뉴 스타일 상속

    // 컨텐츠 정렬
    display: hamburgerHovered ? "flex" : "none", // 메뉴 오픈 여부
  };

  // --------------------------------- css 끝 ---------------------------------

  // ----------- 링크 아이템 목록 -----------
  const linkItems = [
    {
      to: "/VotePage",
      label: "투표모아쥬",
      hovered: votePageHovered,
      mouseEnter: votePageMouseEnter,
      mouseLeave: votePageMouseLeave,
    },
    {
      to: "/BroadcastPage",
      label: "지금골라쥬",
      hovered: broadcastPageHovered,
      mouseEnter: broadcastPageMouseEnter,
      mouseLeave: broadcastPageMouseLeave,
    },
    {
      to: "/StatisticPage",
      label: "통계보여쥬",
      hovered: statisticPageHovered,
      mouseEnter: statisticPageMouseEnter,
      mouseLeave: statisticPageMouseLeave,
    },
    {
      to: "/TestResultPage",
      label: "소비성향알려쥬",
      hovered: testResultPageHovered,
      mouseEnter: testResultPageMouseEnter,
      mouseLeave: testResultPageMouseLeave,
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
      hoverStyle: logoutButtonHoverStyle,
      onClick: setLoggedOut,
    },
    {
      label: "로그인",
      style: loginButtonStyle,
      hovered: loginButtonHovered,
      mouseEnter: loginButtonMouseEnter,
      mouseLeave: loginButtonMouseLeave,
      hoverStyle: loginButtonHoverStyle,
      onClick: handleLogin,
    },
    {
      label: "회원가입",
      style: signupButtonStyle,
      hovered: signupButtonHovered,
      mouseEnter: signupButtonMouseEnter,
      mouseLeave: signupButtonMouseLeave,
      hoverStyle: signupButtonHoverStyle,
      onClick: handleSignup,
    },
  ];

  // ----------- 프로필 아이템 목록 -----------
  const profileItems = [
    {
      to: "/Mypage",
      label: "내 프로필 요약",
      hovered: myProfileHovered,
      mouseEnter: myProfileMouseEnter,
      mouseLeave: myProfileMouseLeave,
    },
    {
      to: "/Mypage/MyActivities",
      label: "내 활동 요약",
      hovered: myActivitiesHovered,
      mouseEnter: myActivitiesMouseEnter,
      mouseLeave: myActivitiesMouseLeave,
    },
    {
      to: "/Mypage/MyStatistics",
      label: "내 통계 요약",
      hovered: myStatisticsHovered,
      mouseEnter: myStatisticsMouseEnter,
      mouseLeave: myStatisticsMouseLeave,
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
        {isLarge && ( // (반응형) min-width:1024px 이상일 경우
          <>
            <div style={linkContainerStyle}>
              {linkItems.map((item, index) => (
                <MenuItem
                  key={index}
                  to={item.to}
                  style={linkItemStyle}
                  activeStyle={linkItemActiveStyle}
                  hoverState={{
                    hovered: item.hovered,
                    handleMouseEnter: item.mouseEnter,
                    handleMouseLeave: item.mouseLeave,
                  }}
                >
                  <div>
                    <div>{item.label}</div>
                    <div style={{
                      ...itemHoverStyle,
                      visibility: item.hovered ? "visible" : "hidden",
                    }}></div>
                  </div>
                </MenuItem>
              ))}
            </div>
          </>
        )}

        {/* --------------------------------- 프로필, 회원관리 --------------------------------- */}
        <div style={buttonContainerStyle}>
          {isLoggedIn ? ( // ------------- 로그인 시 -------------
            <>
              <div
                style={profileContainerStyle}
                onMouseLeave={profileMouseLeave}
              >
                <button
                  style={myPageStyle}
                  onMouseEnter={profileMouseEnter}
                  onClick={profileClick}
                >
                  <img src={DefaultProfileImage} alt="사진" style={profileImageStyle} />
                  <p style={nickNameStyle}>[닉네임]</p>
                </button>
                <div style={profileMenuStyle}>
                  {profileItems.map((item, index) => (
                    <MenuItem
                      key={index}
                      to={item.to}
                      style={menuItemStyle}
                      activeStyle={menuItemActiveStyle}
                      onClick={profileClick}
                      hoverState={{
                        hovered: item.hovered,
                        handleMouseEnter: item.mouseEnter,
                        handleMouseLeave: item.mouseLeave,
                      }}
                    >
                      <div>
                        <div>{item.label}</div>
                        <div style={{
                          ...itemHoverStyle,
                          visibility: item.hovered ? "visible" : "hidden",
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
                  hoverStyle: buttonItems[0].hoverStyle,
                }}
                onClick={buttonItems[0].onClick}
              />
            </>
          ) : (
            // ------------- 비 로그인 시 -------------
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
                    hoverStyle: item.hoverStyle,
                  }}
                  handleClick={item.handleClick}
                  onClick={item.onClick}
                />
              ))}
            </>
          )}

          {/* ------------- 내비게이션 메뉴 -------------  */}
          {!isLarge && ( // (반응형) min-width:1024px 미만일 경우 링크를 햄버거 버튼으로 대체
            <>
              <div
                style={hamburgerContainerStyle}
                onMouseLeave={hamburgerMouseLeave}
              >
                <button
                  style={hamburgerStyle}
                  onMouseEnter={hamburgerMouseEnter}
                  onClick={hamburgerClick}
                >
                  &#9776;
                </button>
                <div style={hamburgerMenuStyle}>
                  {linkItems.map((item, index) => (
                    <MenuItem
                      key={index}
                      to={item.to}
                      style={menuItemStyle}
                      activeStyle={menuItemActiveStyle}
                      onClick={hamburgerClick}
                      hoverState={{
                        hovered: item.hovered,
                        handleMouseEnter: item.mouseEnter,
                        handleMouseLeave: item.mouseLeave,
                      }}
                    >
                      <div>
                        <div>{item.label}</div>
                        <div style={{
                          ...itemHoverStyle,
                          visibility: item.hovered ? "visible" : "hidden",
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
