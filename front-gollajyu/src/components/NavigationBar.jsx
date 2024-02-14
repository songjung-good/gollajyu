// 리액트 및 훅/라이브러리
import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 커스텀 스토어를 이용한 상태 관리
import useModalStore from "/src/stores/modalState";
import useAuthStore from "/src/stores/userState";


// ----------- 커스텀 훅 -----------
const useHoverState = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const handleClick = () => setHovered(!hovered);

  return [hovered, handleMouseEnter, handleMouseLeave, handleClick];
};

// ----------- 메뉴 아이템 함수형 컴포넌트 -----------
const MenuItem = ({
  to,
  style,
  activeStyle,
  hoverState,
  onClick,
  children,
}) => (
  <NavLink
    to={to}
    end
    style={({ isActive }) => (isActive ? activeStyle : style)}
    onMouseOver={hoverState.handleMouseEnter}
    onMouseOut={hoverState.handleMouseLeave}
    onClick={onClick}
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

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // ----------- 메인 메뉴 hover -----------
  const [
    votePageHovered,
    votePageMouseEnter,
    votePageMouseLeave
  ] = useHoverState();

  const [broadcastPageHovered,
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

  // ----------- 로그아웃, 로그인, 회원가입 버튼 hover -----------
  const [logoutButtonHovered, logoutButtonMouseEnter, logoutButtonMouseLeave] =
    useHoverState();

  const [loginButtonHovered, loginButtonMouseEnter, loginButtonMouseLeave] =
    useHoverState();

  const [signupButtonHovered, signupButtonMouseEnter, signupButtonMouseLeave] =
    useHoverState();

  // ----------- 사이드 메뉴 버튼 open 여부 -----------
  const [isSideMenuOpend, setIsSideMenuOpend] = useState(false);

  // ----------- 로그인, 로그아웃, 회원가입 버튼 클릭 시의 동작에 관한 함수 -----------
  const setLogout = useAuthStore((state) => state.setLogout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setLoginModalOpen = useModalStore((state) => state.setLoginModalOpen);
  const setLoginModalClose = useModalStore((state) => state.setLoginModalClose);
  const setSignupModalOpen = useModalStore((state) => state.setSignupModalOpen);
  const user = useAuthStore((state) => state.user);

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
      // console.log(event.target);
      // console.log(isLoggedIn);
      setLoginModalOpen();
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .get(API_URL + "/members/logout")
      .then((res) => {
        console.log(res.data.body); // 로그아웃 성공
        setLogout();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ----------- 사이드 메뉴 버튼 ref -----------
  const sideButtonRef = useRef();
  const sideMenuRef = useRef();
  
  // ----------- 사이드 메뉴 밖 클릭 시 메뉴 닫음 -----------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (sideButtonRef.current && !sideButtonRef.current.contains(event.target)) &&
        (sideMenuRef.current && !sideMenuRef.current.contains(event.target))
      ) {
        // 클릭이 메뉴 외부에 있으면 메뉴를 닫습니다.
        setIsSideMenuOpend(false);
      }
    };

    // 페이지에 클릭 이벤트를 추가합니다.
    document.addEventListener('mousedown', handleClickOutside);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsSideMenuOpend]);


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 내비게이션 배경 스타일 -----------
  const navigationBarBackgroundStyle = {
    // 위치
    position: "fixed", // 내비게이션 바 상단에 고정
    top: "0px", // 내비게이션 바 고정 위치: 0px
    zIndex: 49, // 내비게이션 바를 가장 위의 레이어에 고정

    // 디자인
    width: "100%", // 내비게이션 바 배경 넓이
    height: isXLarge || isLarge ? "110px" : "70px", // 내비게이션 바 높이
    background: "#FFFFFF",
  };

  // ----------- 내비게이션 바 스타일 -----------
  const navigationBarStyle = {
    // 상속
    ...navigationBarBackgroundStyle,

    // 위치
    left: "50%", // 화면 가로 중앙으로 이동
    transform: "translateX(-50%)", // 화면 가로 중앙으로 이동

    // 디자인
    padding: "0 20px",
    maxWidth: "1200px",
    minWidth: "240px",
    width: "100%",
  };

  // ----------- flex 컨테이너 스타일 -----------
  const flexContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- 버튼 컨테이너 스타일 -----------
  const buttonContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    height: "40px",

    // 컨텐츠 정렬
    justifyContent: "flex-end",
  };

  // ----------- 프로필 버튼 스타일 -----------
  const myPageStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    marginRight: "10px",
    height: "40px",
  };

  // ----------- 프로필 이미지 스타일 -----------
  const profileImageStyle = {
    // 디자인
    width: "35px", // 이미지 가로 길이
    height: "35px", // 이미지 세로 길이
    borderRadius: "50%", // 둥근 테두리: 50% (원)
  };

  // ----------- 프로필 닉네임 스타일 -----------
  const nickNameStyle = {
    // 디자인
    marginTop: "5px",
    width: "110px",

    // 글자
    fontSize: "14px",
    display: !isSmall? "flex" : "none", 
    alignItems: "center",
    justifyContent: "center",
  };

  // ----------- 포인트 스타일 -----------
  const pointStyle = {
    // 디자인
    marginTop: "5px",

    // 글자
    fontSize: "14px",
    color: "#FFA500", // 글자 색: 주황
    whiteSpace: "nowrap",
  };

  // ----------- 버튼 공통 스타일 -----------
  const buttonStyle = {
    // 디자인
    marginTop: "5px",
    width: "70px", // 버튼 넓이
    height: "35px", // 버튼 높이
    transition: "background 0.5s ease", // 마우스 호버 시 색깔 천천히 변경

    // 글자
    fontSize: "14px", // 버튼 안 글자 크기 고정
    color: "#4A4A4A", // 글자 색: 회색
    whiteSpace: "nowrap",
  };

  // ----------- 로그아웃 버튼 스타일 -----------
  const logoutButtonStyle = {
    // 상속
    ...buttonStyle, // 버튼 공통 스타일 상속

    // 글자
    color: "#9C9C9C",
  };

  // ----------- 로그아웃 버튼 hover 스타일 -----------
  const logoutButtonHoverStyle = {
    // 글자
    color: "#4A4A4A",
  };

  // ----------- 로그인 버튼 hover 스타일 -----------
  const loginButtonHoverStyle = {
    // 글자
    color: "#FF595E",
  };

  // ----------- 회원가입 버튼 hover 스타일 -----------
  const signupButtonHoverStyle = {
    // 글자
    color: "#FFA500",
  };

  // ----------- 메인 링크 컨테이너 스타일 -----------
  const mainLinkContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 컨텐츠 정렬
    justifyContent: "space-between",
  }

  // ----------- 로고 컨테이너 스타일 -----------
  const logoContainerStyle = {
    // 디자인
    width: "120px",
  };

  // ----------- 로고 스타일 -----------
  const logoStyle = {
    // 글자
    fontFamily: "HSSantokkiRegular", // 로고 폰트로 변경
    fontSize: "46px",
    color: "#FFD257", // 로고 글자 색: 노란색
    whiteSpace: "nowrap",
  };

  // ----------- 링크 컨테이너 스타일 -----------
  const linkContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    width: "60%",

    // 컨텐츠 정렬
    justifyContent: "space-between",
  };

  // ----------- 링크 아이템 스타일 -----------
  const linkItemStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    paddingTop: "8px",
    height: "70px",

    // 글자
    color: "#222222",
  };

  // ----------- 링크 아이템 active 스타일 -----------
  const linkItemActiveStyle = {
    // 상속
    ...linkItemStyle,

    // 글자
    fontWeight: "bold", // 활성화 시 글자 두껍게
    color: "#000000", // 활성화 시 글자 색: 검정
  };

  // ----------- 아이템 hover 스타일 -----------
  const itemHoverStyle = {
    // 디자인
    width: "100%",
    height: "4px",
    background: "#FFD257",
  };

  // ----------- 사이드 메뉴 컨테이너 스타일 -----------
  const sideMenuContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    width: isXLarge || isLarge ?  "120px" : isMedium ? "330px" : "210px",
    
    // 컨텐츠 정렬
    justifyContent: "flex-end",
  };

  // ----------- 햄버거 버튼 스타일 -----------
  const hamburgerStyle = {
    // 디자인
    marginLeft: "15px",
    paddingTop: "5px",
    width: "30px", // 버튼 가로 길이
    height: "70px", // 버튼 세로 길이
    visibility: isXLarge ? "hidden" : "visible",

    // 글자
    fontSize: "28px", // 햄버거 버튼 사이즈
    color: "#4A4A4A", // 햄버거 버튼 색
  };

  // ----------- 사이드 메뉴 스타일 -----------
  const sideMenuStyle = {
    // 위치
    position: "absolute", // 메뉴 위치 기준
    top: isXLarge || isLarge ? "110px" : "70px",
    right: "0px", // 오른쪽 여백

    // 디자인
    width: "240px",
    height: "340px",
    background: "#FFFFFF", // 메뉴 배경 색: 흰색
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)", // 메뉴 그림자

    // 컨텐츠 정렬
    display: isSideMenuOpend ? "flex" : "none", // 메뉴 오픈 여부
    flexDirection: "column", // 아이템 세로 방향으로 배치
  };

  // ----------- 프로필 컨테이너 스타일 -----------
  const profileContainerStyle = {
    // 디자인
    padding: "20px",
  };

  // ----------- 메뉴 서브 컨테이너 스타일 -----------
  const menuSubTitleStyle = {
    // 디자인
    height: "60px",
    paddingLeft: "5px",

    // 글자
    fontSize: "22px",
  }

  // ----------- 메뉴 아이템 스타일 -----------
  const menuItemStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    paddingLeft: "30px",
    width: "100%",
    height: "60px",

    // 글자
    color: "#4A4A4A", // 글자 색: 회색
  };

  // ----------- 메뉴 아이템 active 스타일 -----------
  const menuItemActiveStyle = {
    // 상속
    ...menuItemStyle, // 메뉴 아이템 스타일 상속

    // 글자
    fontWeight: "bold", // 글자 두껍게
    color: "#000000", // 글자 색: 검정
  };

  // --------------------------------- css 끝 ---------------------------------

  
  // ----------- 링크 아이템 목록 -----------
  const linkItems = [
    {
      to: "/VotePage",
      label: "투표모아쥬",
      description: "투표를 최신순이나 인기순으로 정렬하거나, 원하는 투표를 검색할 수 있어요!",
      hovered: votePageHovered,
      mouseEnter: votePageMouseEnter,
      mouseLeave: votePageMouseLeave,
    },
    {
      to: "/BroadcastPage",
      label: "지금골라쥬",
      description: "라이브 방송을 시청하며 실시간 투표를 하고 의견을 공유할 수 있어요!",
      hovered: broadcastPageHovered,
      mouseEnter: broadcastPageMouseEnter,
      mouseLeave: broadcastPageMouseLeave,
    },
    {
      to: "/StatisticPage",
      label: "통계보여쥬",
      description: "다른 사람들이 물건을 구매 할 때 고려하는 요소들을 비교할 수 있어요!",
      hovered: statisticPageHovered,
      mouseEnter: statisticPageMouseEnter,
      mouseLeave: statisticPageMouseLeave,
    },
    {
      to: "/TestResultPage",
      label: "소비성향알려쥬",
      description: "나의 소비성향 및 다른 소비성향들에 대해 알아볼 수 있어요!",
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
      onClick: handleLogout,
    },
    {
      label: "로그인",
      style: buttonStyle,
      hovered: loginButtonHovered,
      mouseEnter: loginButtonMouseEnter,
      mouseLeave: loginButtonMouseLeave,
      hoverStyle: loginButtonHoverStyle,
      onClick: handleLogin,
    },
    {
      label: "회원가입",
      style: buttonStyle,
      hovered: signupButtonHovered,
      mouseEnter: signupButtonMouseEnter,
      mouseLeave: signupButtonMouseLeave,
      hoverStyle: signupButtonHoverStyle,
      onClick: handleSignup,
    },
  ];


  // --------------------------------- 프로필, 버튼 렌더링 함수 ---------------------------------
  const renderButton = () => {
    return (
      <>
        <div style={buttonContainerStyle}>
          {isLoggedIn ? ( // ------------- 로그인 시 -------------
            <>
              <Link to="/Mypage" style={myPageStyle}>
                <img
                  src={
                    // user.profileImgUrl이 숫자면 -> 소비성향테스트 결과 번호 -> 해당 번호의 png 파일을 src로 지정
                    !isNaN(user.profileImgUrl)
                      ? `/assets/images/sobiTest/${user.profileImgUrl}.png`
                      : user.profileImgUrl
                  }
                  alt="사진"
                  style={profileImageStyle}
                />
                <p style={nickNameStyle}>
                  {user.nickname.length <= 6
                    ? user.nickname
                    : user.nickname.slice(0, 6) + "..."}
                  님
                </p>
                <p style={pointStyle}>
                  {user.point} P
                </p>
              </Link>
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
        </div>
      </>
    );
  };

  return (
    <>
      <div style={navigationBarBackgroundStyle}></div>
      <nav style={navigationBarStyle}>
        {(isXLarge || isLarge) && renderButton()}

        <div style={mainLinkContainerStyle}>

          {/* --------------------------------- 로고 --------------------------------- */}
          <div style={logoContainerStyle}>
            <NavLink to="/" style={logoStyle}>
              골라쥬
            </NavLink>
          </div>

          {/* --------------------------------- 내비게이션 메뉴 --------------------------------- */}
          {isXLarge && ( // (반응형) isXLarge 크기 이상일 경우
            <>
              <div style={linkContainerStyle} className="relative">
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
                      <p
                        style={{ visibility: item.hovered  ? "visible" : "hidden" }}
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 py-1 px-3 border-2 border-amber-300 rounded-full bg-white font-normal text-black shadow-lg whitespace-nowrap"
                      >
                        {item.description}
                      </p>
                      <div style={{fontSize: "20px"}}>{item.label}</div>
                      <div
                        style={{
                          ...itemHoverStyle,
                          visibility: item.hovered || window.location.pathname.startsWith(item.to) ? "visible" : "hidden",
                        }}
                      ></div>
                    </div>
                  </MenuItem>
                ))}
              </div>
            </>
          )}

          {/* ------------- 사이드 메뉴 -------------  */}
          <div style={sideMenuContainerStyle}>
            {(isMedium || isSmall) && renderButton()}
            {isSideMenuOpend ? (
              <button
                style={hamburgerStyle}
                onClick={() => setIsSideMenuOpend(!isSideMenuOpend)}
                ref={sideButtonRef}
              >
                &#10006;
              </button>
            ) : (
              <button
                style={hamburgerStyle}
                onClick={() => setIsSideMenuOpend(!isSideMenuOpend)}
                ref={sideButtonRef}
              >
                &#9776;
              </button>
            )}
            
            <div style={sideMenuStyle} ref={sideMenuRef}>
              <div style={profileContainerStyle}>
                <div style={menuSubTitleStyle}>메인 메뉴</div>
                {linkItems.map((item, index) => (
                  <MenuItem
                    key={index}
                    to={item.to}
                    style={menuItemStyle}
                    activeStyle={menuItemActiveStyle}
                    onClick={() => setIsSideMenuOpend(!isSideMenuOpend)}
                    hoverState={{
                      hovered: item.hovered,
                      handleMouseEnter: item.mouseEnter,
                      handleMouseLeave: item.mouseLeave,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "16px" }}>{item.label}</div>
                      <div
                        style={{
                          ...itemHoverStyle,
                          visibility: item.hovered || window.location.pathname.startsWith(item.to) ? "visible" : "hidden",
                        }}
                      ></div>
                    </div>
                  </MenuItem>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
