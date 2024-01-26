import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import DefaultProfileImage from "/@images/default_profile_img.png";

const NavigationBar = () => {
  // ----------- 메뉴 hover -----------
  const [votePageHovered, setVotePageHovered] = useState(false);
  const [broadcastPageHovered, setBroadcastPageHovered] = useState(false);
  const [statisticPageHovered, setStatisticPageHovered] = useState(false);
  const [testPageHovered, setTestPageHovered] = useState(false);

  // ----------- 버튼 hover -----------
  const [logoutButtonHovered, setLogoutButtonHovered] = useState(false);
  const [loginButtonHovered, setLoginButtonHovered] = useState(false);
  const [signupButtonHovered, setSignupButtonHovered] = useState(false);

  // ----------- 햄버거 메뉴 상태 관리 -----------
  const [isMenuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = true;  // 로그인 상태
  // const isLoggedIn = false;  // 비로그인 상태

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

  // ----------- 햄버거 버튼 호버/떠남 상태 업데이트 함수 -----------
  const menuHover = () => {
    setMenuOpen(true);
  };

  const menuLeave = () => {
    setMenuOpen(false);
  };


  // --------------------------------- css 시작 ---------------------------------
  
  // ----------- 내비게이션 컨테이너 스타일 -----------
  const navigationBarContainerStyle = {
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
    ...navigationBarContainerStyle,                 // 컨테이너 스타일 상속

    // 위치
    left: "50%",                                    // 화면 가로 중앙으로 이동
    transform: "translateX(-50%)",                  // 화면 가로 중앙으로 이동

    // 디자인
    width: isLarge ? "90%" : (isMedium ? "740px" : "400px"),  // (반응형) 내비게이션 바 넓이

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
    fontSize: "48px",                               // 글자 크기: 36px
    color: "#FFD257",                               // 글자 색: 노란색
  };

  // ----------- 메뉴 리스트 공통 스타일 -----------
  const listStyle = {
    // 글자
    fontSize: "14px",                               // 글자 크기: 18px

    // 컨텐츠 정렬
    display: "flex",                                // 리스트 수평 정렬
    alignItems: "center",                           // 리스트 수직 정렬
  };

  // ----------- 내비게이션 바 메뉴 리스트 스타일 -----------
  const menulistStyle = {
    // 상속
    ...listStyle,                                   // 메뉴 리스트 스타일 상속        
    
    // 디자인
    width: "50%",                                   // 가로 넓이: 50%
    
    // 컨텐츠 정렬
    display: "flex",                                // 리스트 수평 정렬
    justifyContent: "space-between",                // 항목 균일 간격으로 정렬
  }

  // ----------- 내비게이션 바 메뉴 공통 스타일 -----------
  const commonStyle = {
    // 디자인
    padding: !isLarge ? "0 15px" : "0px",           // (반응형) 항목 좌우 padding: 15px
    height: "100px",                                // 항목 높이: 100px

    // 글자
    fontSize: isLarge ? "18px" : "16px",            // (반응형) 글자 크기

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
    color: testPageHovered ? "#BEBEBE" : "#4A4A4A", // 마우스 호버 시 글자 색 변경
  };

  // ----------- 활성화 된 메뉴 스타일 -----------
  const activeItemStyle = {
    // 글자
    fontWeight: "Bold",                             // 활성화 시 굵게 변경
  };

  // ----------- 버튼 리스트 스타일 -----------
  const buttonListStyle = {
    // 상속
    ...listStyle,                                   // 메뉴 리스트 스타일 상속

    // 디자인
    width: !isLarge ? "360px" : "240px",            // (반응형) 버튼 리스트 넓이
    height: "100px",                                 // 높이: 100px

    // 컨텐츠 정렬
    justifyContent: "flex-end",                     // 내부 버튼 오른쪽 정렬
  }

  // ----------- 내 프로필 페이지 버튼 스타일 -----------
  const myPageStyle = {
    // 디자인
    margin: "0 5px",                               // 버튼 좌우 margin: 10px

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
    background: logoutButtonHovered ? "#D9D9D9" : "transparent",  // 마우스 호버 시 배경 색상 변경

    // 글자
    color: "#9C9C9C",                               // 글자 색: 회색
  };

  // ----------- 로그인 버튼 스타일 -----------
  const loginButtonStyle = {
    // 상속
    ...buttonStyle,                                 // 버튼 공통 스타일 상속

    // 디자인
    background: loginButtonHovered ? "#ACD145" : "#CEFA70",  // 마우스 호버 시 배경 색상 변경
  };

  // ----------- 회원가입 버튼 스타일 -----------
  const signupButtonStyle = {
    // 상속
    ...buttonStyle,                                 // 버튼 공통 스타일 상속

    // 디자인
    background: signupButtonHovered ? "#E6BE3D" : "#FFD257",  // 마우스 호버 시 배경 색상 변경
  };

  // ----------- 햄버거 버튼 스타일 -----------
  const hamburgerButtonStyle = {
    // 디자인
    marginTop: "5px",                               // 상단 margin: 5px
    width: "50px",                                  // 버튼 가로 길이: 50px
    height: "95px",                                 // 버튼 세로 길이: 95px

    // 글자
    fontSize: "28px",                               // 햄버거 버튼 사이즈
    color: "#4A4A4A",                               // 햄버거 버튼 색
  };

  // ----------- 햄버거 메뉴 스타일 -----------
  const menuStyle = {
    // 위치
    position: "absolute",                           // 메뉴 위치 기준
    top: "90px",                                   // 상단 여백: 100px
    right: "0px",                                   // 오른쪽 여백: 0px

    // 디자인
    padding: "10px",                                // 메뉴 내부 여백: 10px
    background: "#FFFFFF",                          // 메뉴 배경 색: 흰색
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)",    // 메뉴 그림자

    // 컨텐츠 정렬
    display: isMenuOpen ? "flex" : "none",          // 메뉴 오픈 여부
    flexDirection: "column",                        // 아이템 세로 방향으로 배치
    alignItems: "flex-end",                         // 아이템 오른쪽 정렬
  };

  // --------------------------------- css 끝 ---------------------------------

  
  return (
    <div style={navigationBarContainerStyle}>
      <nav style={navigationBarStyle}>
        {/* --------------------------------- 로고 --------------------------------- */}
        <div style={logoContainerStyle}>
          <NavLink to="/" style={logoStyle}>
            골라쥬
          </NavLink>
        </div>

        {/* --------------------------------- 내비게이션 메뉴 --------------------------------- */}
        {isLarge ? (  // (반응형) min-width:1024px 이상일 경우
          <>
            <ul style={menulistStyle}>
              <NavLink
                to="/VotePage" 
                style={({ isActive }) =>
                  isActive ? activeItemStyle : undefined
                }
              >
                <li
                  style={votePageStyle}
                  onMouseOver={() => setVotePageHovered(true)}
                  onMouseOut={() => setVotePageHovered(false)}
                >
                  투표모아쥬
                </li>
              </NavLink>
              <NavLink
                to="/BroadcastPage"
                style={ ({ isActive }) =>
                isActive ? activeItemStyle : undefined
                }
              >
                <li
                  style={broadcastPageStyle}
                  onMouseOver={() => setBroadcastPageHovered(true)}
                  onMouseOut={() => setBroadcastPageHovered(false)}
                >
                  지금골라쥬
                </li>
              </NavLink>
              <NavLink
                to="/StatisticPage"
                style={({ isActive }) =>
                isActive ? activeItemStyle : undefined
                }
              >
                <li
                  style={statisticPageStyle}
                  onMouseOver={() => setStatisticPageHovered(true)}
                  onMouseOut={() => setStatisticPageHovered(false)}
                >
                통계보여쥬
                </li>
              </NavLink>
              <NavLink
                to="/TestPage"
                style={({ isActive }) =>
                isActive ? activeItemStyle : undefined
                }
              >
                <li
                  style={testPageStyle}
                  onMouseOver={() => setTestPageHovered(true)}
                  onMouseOut={() => setTestPageHovered(false)}
                >
                소비성향알려쥬
                </li>
              </NavLink>
            </ul>
          </>
        ) : (  // (반응형) min-width:1024px 미만일 경우 아무것도 렌더링 하지 않음
          <>  
          </>
        )}

        {/* --------------------------------- 프로필, 회원관리 --------------------------------- */}
        <div style={buttonListStyle} onMouseLeave={menuLeave}>
          {isLoggedIn ? (  // ------------- 로그인 시 -------------
            <>
              <NavLink to="/MyPage">
                <div style={myPageStyle}>
                  <img src={DefaultProfileImage} alt="사진" style={profileImageStyle} />
                  <p>[닉네임]</p>
                  {/* <p>[150P]</p> */}
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
          ) : (  // ------------- 비 로그인 시 -------------
            <>
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

          {/* ------------- 내비게이션 메뉴 -------------  */}
          {!isLarge ? (  // (반응형) min-width:1024px 미만일 경우 메뉴를 햄버거 버튼으로 대체
            <>
              {!isLarge && (
                <button
                  style={hamburgerButtonStyle}
                  onMouseEnter={menuHover}
                >
                  &#9776;
                </button>
              )}
              {!isLarge && (
                <div
                  style={menuStyle}
                  onMouseLeave={menuLeave}
                  >
                  <NavLink
                    to="/VotePage" 
                    style={({ isActive }) =>
                      isActive ? activeItemStyle : undefined
                    }
                  >
                    <li
                      style={{ ...votePageStyle, height: "60px" }}
                      onMouseOver={() => setVotePageHovered(true)}
                      onMouseOut={() => setVotePageHovered(false)}
                    >
                      투표모아쥬
                    </li>
                  </NavLink>
                  <NavLink
                    to="/BroadcastPage"
                    style={ ({ isActive }) =>
                    isActive ? activeItemStyle : undefined
                    }
                  >
                    <li
                      style={{ ...broadcastPageStyle, height: "60px" }}
                      onMouseOver={() => setBroadcastPageHovered(true)}
                      onMouseOut={() => setBroadcastPageHovered(false)}
                    >
                      지금골라쥬
                    </li>
                  </NavLink>
                  <NavLink
                    to="/StatisticPage"
                    style={({ isActive }) =>
                    isActive ? activeItemStyle : undefined
                    }
                  >
                    <li
                      style={{ ...statisticPageStyle, height: "60px" }}
                      onMouseOver={() => setStatisticPageHovered(true)}
                      onMouseOut={() => setStatisticPageHovered(false)}
                    >
                    통계보여쥬
                    </li>
                  </NavLink>
                  <NavLink
                    to="/TestPage"
                    style={({ isActive }) =>
                    isActive ? activeItemStyle : undefined
                    }
                  >
                    <li
                      style={{ ...testPageStyle, height: "60px" }}
                      onMouseOver={() => setTestPageHovered(true)}
                      onMouseOut={() => setTestPageHovered(false)}
                    >
                    소비성향알려쥬
                    </li>
                  </NavLink>
                </div>
              )}
            </>
          ) : (  // (반응형) min-width:1024px 이상일 경우 아무것도 렌더링 하지 않음
            <>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
