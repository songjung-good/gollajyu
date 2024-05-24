# 프로젝트 구조
src
 ┣ components
 ┃ ┣ MainPage
 ┃ ┃ ┣ MainVoteList.jsx
 ┃ ┃ ┣ MainWord.jsx
 ┃ ┃ ┗ SwipeVote.jsx
 ┃ ┣ MyPage
 ┃ ┃ ┣ MyActivities.jsx
 ┃ ┃ ┣ MyActivitiesCommented.jsx
 ┃ ┃ ┣ MyActivitiesCommentItem.jsx
 ┃ ┃ ┣ MyActivitiesCreated.jsx
 ┃ ┃ ┣ MyActivitiesLiked.jsx
 ┃ ┃ ┣ MyActivitiesParticipated.jsx
 ┃ ┃ ┣ MyActivitiesVoteItem.jsx
 ┃ ┃ ┣ MyProfile.jsx
 ┃ ┃ ┣ MyStatistics.jsx
 ┃ ┃ ┗ MyStatisticsChart.jsx
 ┃ ┣ openvidu
 ┃ ┃ ┣ Chat
 ┃ ┃ ┃ ┣ ChatComponent.css
 ┃ ┃ ┃ ┣ ChatComponent.js
 ┃ ┃ ┃ ┣ ChattingForm.jsx
 ┃ ┃ ┃ ┗ ChattingList.jsx
 ┃ ┃ ┣ AddVoteItemModal.jsx
 ┃ ┃ ┣ CreateVideoRoom.jsx
 ┃ ┃ ┣ index.js
 ┃ ┃ ┣ OvVideo.jsx
 ┃ ┃ ┣ registerServiceWorker.js
 ┃ ┃ ┣ UserVideoComponent.jsx
 ┃ ┃ ┣ VideoComponent.jsx
 ┃ ┃ ┗ Vote.jsx
 ┃ ┣ StatisticPage
 ┃ ┃ ┣ StatisticPageChart.jsx
 ┃ ┃ ┗ StatisticPageGroupItem.jsx
 ┃ ┣ VoteDetailPage
 ┃ ┃ ┣ ChatForm.jsx
 ┃ ┃ ┣ ChatList.jsx
 ┃ ┃ ┣ VoteDetail.jsx
 ┃ ┃ ┣ VoteDetailChat.jsx
 ┃ ┃ ┣ VoteDetailHeader.jsx
 ┃ ┃ ┗ VoteDetailResult.jsx
 ┃ ┣ VotePage
 ┃ ┃ ┣ VoteCard.jsx
 ┃ ┃ ┣ VoteCardItem.jsx
 ┃ ┃ ┣ VotePageHeader.jsx
 ┃ ┃ ┣ VotePageList.jsx
 ┃ ┃ ┣ VoteProduct.jsx
 ┃ ┃ ┗ VoteSimple.jsx
 ┃ ┣ .gitkeep
 ┃ ┣ BroadcastItem.jsx
 ┃ ┣ Footer.jsx
 ┃ ┣ LoginForm.jsx
 ┃ ┣ NavigationBar.jsx
 ┃ ┣ Screenshot.jsx
 ┃ ┣ SignupForm.jsx
 ┃ ┣ TestItem.jsx
 ┃ ┣ TestResultHeader.jsx
 ┃ ┗ VoteButton.jsx
 ┣ pages
 ┃ ┣ .gitkeep
 ┃ ┣ BroadcastPage.jsx
 ┃ ┣ MainPage.jsx
 ┃ ┣ MyPage.jsx
 ┃ ┣ StatisticPage.jsx
 ┃ ┣ TestPage.jsx
 ┃ ┣ TestResultPage.jsx
 ┃ ┗ VotePage.jsx
 ┣ stores
 ┃ ┣ apiURL.js
 ┃ ┣ categoryData.js
 ┃ ┣ modalState.js
 ┃ ┣ responsiveUtils.js
 ┃ ┣ tagColorData.js
 ┃ ┣ testResultData.js
 ┃ ┗ userState.js
 ┣ App.css
 ┣ App.jsx
 ┣ main.css
 ┣ main.jsx
 ┗ PrivateRoute.jsx



# src
```src\App.css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* 요소의 크기를 padding과 border를 포함한 크기로 계산 */
  font-family: "GmarketSansMedium"; /* 기본 폰트 설정 */
}

.body {
  background-color: #f7f6f3;
}

@font-face {
  /* 얇은 글씨체 */
  font-family: "GmarketSansLight";
  src: local("GmarketSansLight"),
    url("/assets/fonts/GmarketSansLight.otf") format("truetype");
}

@font-face {
  /* 기본 글씨체 */
  font-family: "GmarketSansMedium";
  src: local("GmarketSansMedium"),
    url("/assets/fonts/GmarketSansMedium.otf") format("truetype");
}

@font-face {
  /* 굵은 글씨체 */
  font-family: "GmarketSansBold";
  src: local("GmarketSansBold"),
    url("/assets/fonts/GmarketSansBold.otf") format("truetype");
}

@font-face {
  /* 로고 글씨체 */
  font-family: "HSSantokkiRegular";
  src: local("HSSantokkiRegular"),
    url("/assets/fonts/HSSantokkiRegular.ttf") format("truetype");
}

/* -------------------- 화면크기별 기본 폰트 사이즈 설정 ---------------------- */

/* 가장 작은 화면 : 480px보다 작은 화면*/
@media (max-width: 479.98px) {
  * {
    font-size: 10px;
  }
}

/* md : 480 ~ 767px */
@media (min-width: 480px) {
  * {
    font-size: 12px;
  }
}

/* 768 ~ 1023px */
@media (min-width: 768px) {
  * {
    font-size: 14px;
  }
}

/* 1024px보다 큰 화면 */
@media (min-width: 1024px) {
  * {
    font-size: 16px;
  }
}

/* -------------------- 화면크기별 높이 설정 ---------------------- */

@media (max-width: 767.98px) {
  .body {
    margin-top: 70px;
  }
}

@media (min-width: 768px) {
  .body {
    margin-top: 110px;
  }
}

/* ----------- 전체 폰트사이즈 기준 클래스 별 폰트 사이즈 설정 -------- */
.fontsize-xl {
  font-size: 2.125rem;
}

.fontsize-lg {
  font-size: 1.8125rem;
}

.fontsize-md {
  font-size: 1.5rem;
}

.fontsize-sm {
  font-size: 1.1875rem;
}

.fontsize-xs {
  font-size: 0.875rem;
}
```



```src\App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
// import VoteButton from "./components/VoteButton";
import MainPage from "./pages/MainPage";
import VotePage from "./pages/VotePage";
import BroadcastPage from "./pages/BroadcastPage";
import StatisticPage from "./pages/StatisticPage";
import TestPage from "./pages/TestPage";
import TestResultPage from "./pages/TestResultPage";
import MyPage from "./pages/MyPage";
import VideoComponent from "./components/openvidu/VideoComponent";
import CreateVideoRoom from "./components/openvidu/CreateVideoRoom";
import "./App.css";

// 추후 적용
// NavigationBar가 나타나지 않아야하는 곳: EnterVideoRoom, CreateVideoRoom => 적용 완료
// VoteButton이 나타나야하는 곳: VotePage, BroadcastPage, MainPage => 추후에 컴포넌트 내부로 넣기

const Navbar = () => {
  return (
    <>
      <NavigationBar />
      {/* body 배경색 있음 */}
      <div className="body min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/EnterVideoRoom" element={<VideoComponent />} />
          <Route path="/CreateVideoRoom" element={<CreateVideoRoom />} />
        </Route>
        <Route element={<Navbar />}>
          <Route path="/" element={<MainPage />} />
          {/* 로그인 사용자만 접근할 수 있는 라우터 -> PrivateRoute 내부에 있음 */}
          <Route element={<PrivateRoute />}>
            <Route path="/VotePage" element={<VotePage />} />
            <Route path="/BroadcastPage" element={<BroadcastPage />} />
            <Route path="/StatisticPage" element={<StatisticPage />} />
            <Route path="/TestResultPage" element={<TestResultPage />} />
            <Route path="/MyPage/*" element={<MyPage />} />
          </Route>
          <Route path="/TestPage" element={<TestPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
```



```src\main.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```



```src\main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import axios from "axios";
import { HelmetProvider } from "react-helmet-async";

// 쿠키에 담긴 JSSESIONID를 axios 요청 헤더에 담아서 보내기 위함
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <HelmetProvider>
    <App />
  </HelmetProvider>
  // </React.StrictMode>
);
```



```src\PrivateRoute.jsx
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "./stores/userState";
import useModalStore from "./stores/modalState";

// 로그인 유저만 접근 가능
// 비로그인 유저 접근 불가
const PrivateRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setLoginModalOpen = useModalStore((state) => state.setLoginModalOpen);

  if (!isLoggedIn) {
    setLoginModalOpen();
    return <Navigate to="/" />; // 경로 이동으로 인해 새로고침 현상 있음
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
```



## componnents
```src\components\BroadcastItem.jsx
import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import firstMedal from "/assets/images/medals/first.png";
import secondMedal from "/assets/images/medals/second.png";
import thirdMedal from "/assets/images/medals/third.png";
import viewerIcon from "/assets/images/viewer_icon.png";

const medalImg = {
  position: "absolute",
  padding: "5px",
};

const BroadcastItem = ({ index, item }) => {
  const navigate = useNavigate();
  const enterRoom = () => {
    navigate("/EnterVideoRoom", {
      state: {
        isHost: false,
        sessionId: item.sessionId,
        liveId: item.id,
      },
    });
  };

  return (
    <div onClick={enterRoom}>
      <div id="thumbnail">
        {index === 0 ? (
          <img
            style={medalImg}
            className="w-[50px] h-[50px] sm:w-[30px] sm:h-[30px] md:w-[40px] md:h-[40px]"
            src={firstMedal}
          ></img>
        ) : null}
        {index === 1 ? (
          <img
            style={medalImg}
            className="w-[50px] h-[50px] sm:w-[30px] sm:h-[30px] md:w-[40px] md:h-[40px]"
            src={secondMedal}
          ></img>
        ) : null}
        {index === 2 ? (
          <img
            style={medalImg}
            className="w-[50px] h-[50px] sm:w-[30px] sm:h-[30px] md:w-[40px] md:h-[40px]"
            src={thirdMedal}
          ></img>
        ) : null}
        <img
          className="rounded-3xl mb-2"
          style={{ width: "13rem", height: "13rem" }}
          src={item.imgUrl}
          alt="지금골라쥬 썸네일"
        />
      </div>

      <div className="flex justify-between mx-2">
        <div className="flex">
          <img
            style={{ width: "20px", height: "20px" }}
            src={viewerIcon}
            alt=""
          />
          <p>{item.count}</p>
        </div>
        <p className="font-bold">{item.nickName}</p>
      </div>
      <p className="mx-2">{item.title}</p>
    </div>
  );
};

export default BroadcastItem;
```



```src\components\Footer.jsx
// 리액트 및 훅/라이브러리
import React from "react";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";


const Footer = () => {

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();


  // --------------------------------- css 시작 ---------------------------------
  
  // ----------- body 스타일 -----------
  const body = {
    // 디자인
    padding: "52px 30px 44px",
    width: "100%",
    height: "240px",
    borderTop: "1px solid #BBBBBB",
    backgroundColor: "#FBFBFB",

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "center",
  }

  // ----------- footer 컨테이너 스타일 -----------
  const footerContainerStyle = {
    // 디자인
    width: isXLarge ? "1000px" : isLarge ? "740px" : isMedium ? "460px" : "375px",

    // 글자
    color: "#4A4A4A",
  
    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column", // 아이템 세로 방향으로 배치
    justifyContent: "space-between",
  }

  // ----------- 내용 스타일 -----------
  const contentStyle = {
    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "space-between",
  }

  // ----------- 로고 스타일 -----------
  const logoStyle = {
    // 글자
    fontFamily: "HSSantokkiRegular", // 로고 폰트로 변경
    fontSize: "36px",
    color: "#FFD257", // 로고 글자 색: 노란색
  }

  // ----------- 정보 컨테이너 스타일 -----------
  const infoContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
  }

  // ----------- 팀 컨테이너 스타일 -----------
  const teamContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: isMedium || isSmall ? "column" : "row",
  }

  // ----------- 팀명 스타일 -----------
  const teamStyle = {
    // 디자인
    marginTop: "14px",

    // 글자
    fontSize: "20px",
  }

  // ----------- 이름 스타일 -----------
  const nameStyle = {
    // 디자인
    marginLeft: "5px",

    // 글자
    fontSize: "14px",
    whiteSpace: "nowrap",
  }

  // --------------------------------- css 끝 ---------------------------------


  return (
    <>
      <footer style={body}>
        <div style={footerContainerStyle}>
          <div style={contentStyle}>
            <p style={logoStyle}>골라쥬</p>
            <p style={teamStyle}>E107 재첩국 팀</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={infoContainerStyle}>
              <p style={{ fontSize: "16px", whiteSpace: "nowrap"}}>
                SSAFY 10기 공통프로젝트
              </p>
              <p style={{ fontSize: "14px", whiteSpace: "nowrap"}}>
                2024.01.08 - 2024.02.16
              </p>
            </div>
            <div style={teamContainerStyle}>
              <div style={{ display: "flex" }}>
                <p style={nameStyle}>김하영</p>
                <p style={nameStyle}>배영환</p>
                <p style={nameStyle}>송승준</p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={nameStyle}>이상훈</p>
                <p style={nameStyle}>이시은</p>
                <p style={nameStyle}>황호철</p>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
```



```src\components\LoginForm.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuthStore from "/src/stores/userState";
import useModalStore from "/src/stores/modalState";
import API_URL from "/src/stores/apiURL";
import axios from "axios";

const LoginModal = () => {
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);

  const setLoginModalClose = useModalStore((state) => state.setLoginModalClose);
  const setSignupModalOpen = useModalStore((state) => state.setSignupModalOpen);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSignupHovered, setIsSignupHovered] = useState(false);

  // handleSubmit의 인자가 되는 Submit 함수
  const submitForm = async (data) => {
    // console.log(data);
    // 전역 상태로 관리되는 isLoggedIn을 true로 변경해줌 + 유저 정보를 담음

    const response = await axios.post(API_URL + "/members/login", data, {
      withCredentials: true,
    });
    if (!response.data.header.result) {
      // console.log(response.data.header.message);
      window.alert("이메일 또는 비밀번호가 틀렸습니다");
    } else {
      // console.log("로그인 완료");
      // console.log(response);
      setLoggedIn(response.data.body);
      setLoginModalClose();
      window.location.reload(); // 로그인 후, 메인페이지 새로고침
    }
    reset();
  };

  // 소셜로그인 핸들링 함수
  // const handleKakaoLogin = () => {
  //   // console.log("카카오로그인 -> 사실 안됨");
  // };
  // const handleNaverLogin = () => {
  //   // console.log("네이버로그인 시도 -> 사실 안됨");
  // };

  const handleGoogleLogin = () => {
    // console.log("구글로그인 시도");
  };

  const handleSignup = () => {
    // console.log("회원가입으로 갑니다");
    setLoginModalClose();
    setSignupModalOpen();
  };

  return (
    <div
      id="outer-layer"
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target.id == "outer-layer") {
          setLoginModalClose();
        }
      }}
    >
      <div
        id="inner"
        className="container mx-auto bg-white xl:w-[420px] xl:h-[620px] lg:w-[380px] lg:h-[560px] md:w-[330px] md:h-[500px] sm:w-[250px] sm:h-[400px] min-w-[300px] flex flex-col items-center rounded-3xl shadow-md"
      >
        <h1 className="fontsize-lg font-bold text-gray-700 mt-12 mb-16">
          로그인해쥬
        </h1>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col w-3/5"
        >
          <div className="h-20">
            {/* 이메일 => 형식: (대소문자 구분 없이 알파벳 + 숫자) + @ + (대소문자 구분 없이 알파벳 + 숫자) + . + (알파벳) */}
            <input
              type="text"
              id="email"
              className="rounded-full bg-stone-100 w-full p-3 border border-white mb-1"
              placeholder="이메일을 입력하세요"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Za-z_\-\.0-9]+@[A-Za-z0-9]+.[A-Za-z]+$/i,
                  message: "올바른 형식의 이메일을 입력하세요",
                },
              })}
            />
            {errors.email ? (
              <p className="px-3 text-red-500 fontsize-xs sm:w-[150px]">
                {errors.email.message}
              </p>
            ) : (
              <p className="invisible fontsize-xs">nothing</p>
            )}
          </div>
          <div className="h-24">
            <input
              type="password"
              className="rounded-full bg-stone-100 w-full p-3 border border-white mb-1"
              id="password"
              placeholder="비밀번호를 입력하세요"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: `비밀번호는 8자 이상 15자 미만 입니다`,
                },
                maxLength: {
                  value: 15,
                  message: "비밀번호는 15자 미만 입니다",
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
                  message: "영문, 숫자, 특수문자를 1가지 이상 포함",
                },
              })}
            />
            {errors.password ? (
              <p className="px-3 text-red-500 fontsize-xs break-keep xl:w-[300px] lg:w-[250px] md:w-[210px] sm:w-[170px]">
                {errors.password.message}
              </p>
            ) : (
              <p className="invisible fontsize-xs">nothing</p>
            )}
          </div>
          <button
            type="submit"
            className="rounded-full bg-amber-300 hover:bg-amber-400 p-3"
          >
            로그인
          </button>
        </form>
        <div id="social-login" className="w-full my-10">
          <div className="hr-sect w-1/2 mx-auto">
            <div className="flex items-center text-gray-400 my-2">
              <span className="flex-grow bg-gray-400 h-px m-1"></span>
              <span className="fontsize-xm">소셜 로그인</span>
              <span className="flex-grow bg-gray-400 h-px m-1"></span>
            </div>
          </div>
          <div
            id="social-icons"
            className="flex justify-around w-1/2 mx-auto my-3"
          >
            {/* <div id="kakao" onClick={handleKakaoLogin}>
              <img
                src="/assets/images/social-login/kakao.png"
                alt=""
                className="w-10 h-10 rounded-full hover:outline hover:outline-2 outline-gray-300"
              />
            </div>
            <div id="naver" onClick={handleNaverLogin}>
              <img
                src="/assets/images/social-login/naver.png"
                alt=""
                className="w-10 h-10 rounded-full hover:outline hover:outline-2 outline-gray-300"
              />
            </div> */}
            <Link
              to={`${API_URL.slice(0, -3)}oauth2/authorization/google`}
              onClick={handleGoogleLogin}
            >
              <div
                id="google"
                onClick={handleGoogleLogin}
                className="flex items-center justify-between rounded-full px-5 w-60 h-10 bg-white hover:bg-blue-300 border border-2"
              >
                <img
                  src="/assets/images/social-login/google.png"
                  alt=""
                  className="w-6 h-6"
                />
                <p className="text-gray-600 mx-5">Google 로그인</p>
              </div>
            </Link>
          </div>
        </div>
        <p
          className={`box-content w-1/2 text-center transition ${
            isSignupHovered ? "text-amber-500" : ""
          }`}
          style={{ cursor: "pointer" }}
          onMouseEnter={() => setIsSignupHovered(true)}
          onMouseLeave={() => setIsSignupHovered(false)}
          onClick={handleSignup}
        >
          {isSignupHovered ? "회원가입하러 가기" : "아직 회원이 아니신가요?"}
        </p>
      </div>
    </div>
  );
};
export default LoginModal;
```



```src\components\NavigationBar.jsx
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
  const [votePageHovered, votePageMouseEnter, votePageMouseLeave] =
    useHoverState();

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

  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .get(API_URL + "/members/logout")
      .then((res) => {
        // console.log(res.data.body); // 로그아웃 성공
        setLogout();
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  // ----------- 사이드 메뉴 버튼 ref -----------
  const sideButtonRef = useRef();
  const sideMenuRef = useRef();

  // ----------- 사이드 메뉴 밖 클릭 시 메뉴 닫음 -----------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sideButtonRef.current &&
        !sideButtonRef.current.contains(event.target) &&
        sideMenuRef.current &&
        !sideMenuRef.current.contains(event.target)
      ) {
        // 클릭이 메뉴 외부에 있으면 메뉴를 닫습니다.
        setIsSideMenuOpend(false);
      }
    };

    // 페이지에 클릭 이벤트를 추가합니다.
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
    display: !isSmall ? "flex" : "none",
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
  };

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
    width: isXLarge || isLarge ? "120px" : isMedium ? "330px" : "210px",

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
  };

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
      description:
        "투표를 최신순이나 인기순으로 정렬하거나, 원하는 투표를 검색할 수 있어요!",
      hovered: votePageHovered,
      mouseEnter: votePageMouseEnter,
      mouseLeave: votePageMouseLeave,
    },
    {
      to: "/BroadcastPage",
      label: "지금골라쥬",
      description:
        "라이브 방송을 시청하며 실시간 투표를 하고 의견을 공유할 수 있어요!",
      hovered: broadcastPageHovered,
      mouseEnter: broadcastPageMouseEnter,
      mouseLeave: broadcastPageMouseLeave,
    },
    {
      to: "/StatisticPage",
      label: "통계보여쥬",
      description:
        "다른 사람들이 물건을 구매 할 때 고려하는 요소들을 비교할 수 있어요!",
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
                <p style={pointStyle}>{user.point} P</p>
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
                        style={{
                          visibility: item.hovered ? "visible" : "hidden",
                        }}
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 py-1 px-3 border-2 border-amber-300 rounded-full bg-white font-normal text-black shadow-lg whitespace-nowrap"
                      >
                        {item.description}
                      </p>
                      <div style={{ fontSize: "20px" }}>{item.label}</div>
                      <div
                        style={{
                          ...itemHoverStyle,
                          visibility:
                            item.hovered ||
                            window.location.pathname.startsWith(item.to)
                              ? "visible"
                              : "hidden",
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
                          visibility:
                            item.hovered ||
                            window.location.pathname.startsWith(item.to)
                              ? "visible"
                              : "hidden",
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
```



```src\components\Screenshot.jsx
import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';

function Screenshot() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const handleMouseDown = (e) => {
    setIsCapturing(true);
    setCoords({ ...coords, x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (e) => {
    if (isCapturing) {
      setCoords({ ...coords, width: e.clientX - coords.x, height: e.clientY - coords.y });

      // html2canvas로 해당 영역을 캡쳐
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      html2canvas(document.querySelector('div'), {
        canvas: canvas,
        x: coords.x,
        y: coords.y,
        width: coords.width,
        height: coords.height,
      }).then(() => {
        // 캡처된 이미지를 출력
        const img = document.createElement('img');
        img.src = canvas.toDataURL();
        document.body.appendChild(img);
      });
      // 캡처 중지
      setIsCapturing(false);
    }
  };

  const handleMouseMove = (e) => {
    if (isCapturing) {
      setCoords({ ...coords, width: e.clientX - coords.x, height: e.clientY - coords.y });
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isCapturing, coords]);


  return (
    <div>
      <button onClick={() => setIsCapturing(true)}>캡처 시작</button>
      {isCapturing && (
        <div
          style={{
            position: 'absolute',
            border: '2px solid red',
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            width: `${coords.width}px`,
            height: `${coords.height}px`,
          }}
        ></div>
      )}
    </div>
  );
}

export default Screenshot;
```


```src\components\SignupForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import dayjs from "dayjs";
import API_URL from "/src/stores/apiURL";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useAuthStore from "/src/stores/userState";
import useModalStore from "/src/stores/modalState";

const SignupModal = () => {
  const setSignupModalClose = useModalStore(
    (state) => state.setSignupModalClose
  );

  const navigate = useNavigate();

  const [prevEmail, setPrevEmail] = useState("");
  const [prevPW, setPrevPW] = useState("");

  const isSocialLogin = document.cookie
    .split(";")
    .some((cookie) => cookie.trim().startsWith("gollajyu-cookie="));

  useEffect(() => {
    // gollajyu-cookie가 쿠키에 담겨 있으면, 소셜로그인을 한 사용자 -> 로직 처리 후, gollajyu-cookie 제거하기

    if (isSocialLogin) {
      axios.get(API_URL + "/members/addInfo").then((res) => {
        // console.log(res.data.body);
        setPrevEmail(res.data.body.email);
        setPrevPW("소셜 구글 로그인");
      });
    }
  }, []);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedGender, setSelectedGender] = useState("");
  const [birthday, setBirthday] = useState(dayjs(new Date()));

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  // handleSubmit의 인자가 되는 Submit 함수
  const submitForm = (data) => {
    if (!selectedGender) {
      window.alert("성별 입력은 필수입니다");
    } else {
      if (isSocialLogin) {
        data.email = prevEmail;
        data.password = prevPW;
      }
      const date = new Date(birthday);
      data.gender = selectedGender;
      data.year = date.getFullYear();
      data.month = date.getMonth();
      data.day = date.getDate();
      // console.log(data);
      // 소비성향테스트로 이동
      reset();
      window.alert("소비성향테스트까지 완료해야 회원가입이 됩니다^_^");
      setSignupModalClose();
      navigate("/TestPage", { state: { memberInfo: data } });
    }
  };

  return (
    <div
      id="outer-layer"
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target.id == "outer-layer") {
          if (isSocialLogin) {
            // 소셜 로그인 신규가입자가 회원가입 안하고 창 닫으면 쿠키 삭제
            document.cookie =
              "gollajyu-cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }
          setSignupModalClose();
        }
      }}
    >
      <div
        id="inner"
        className="container mx-auto bg-white xl:w-[500px] xl:h-[800px] lg:w-[430px] lg:h-[700px] md:w-[370px] md:h-[600px] sm:w-[300px] sm:h-[500px] min-w-[300px] flex flex-col items-center rounded-3xl shadow-md"
      >
        <h1 className="fontsize-lg font-bold text-gray-700 mt-12 mb-16">
          회원가입해쥬
        </h1>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col w-2/3"
        >
          <div className="h-20">
            {/* 이메일 => 형식: (대소문자 구분 없이 알파벳 + 숫자) + @ + (대소문자 구분 없이 알파벳 + 숫자) + . + (알파벳) */}
            <input
              type="text"
              id="email"
              className="rounded-full bg-stone-100 w-full p-3 border border-white mb-1"
              placeholder="이메일"
              value={prevEmail ? prevEmail : undefined}
              {...register("email", {
                ...(isSocialLogin
                  ? {}
                  : {
                      required: "필수 입력사항입니다",
                      pattern: {
                        value:
                          /^[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*@[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*\.[A-Za-z]+$/i,
                        message: "올바른 형식의 이메일을 입력하세요",
                      },
                    }),
              })}
            />
            {!isSocialLogin && errors.email ? (
              <p className="px-3 text-red-500 text-sm">
                {errors.email.message}
              </p>
            ) : (
              <p className="invisible text-sm">nothing</p>
            )}
          </div>
          <div className="h-20">
            <input
              type="password"
              className="rounded-full bg-stone-100 w-full p-3 border border-white mb-1"
              id="password"
              placeholder="비밀번호"
              value={prevPW ? prevPW : undefined}
              {...register("password", {
                ...(isSocialLogin
                  ? {}
                  : {
                      required: "필수 입력사항입니다",
                      minLength: {
                        value: 8,
                        message: "비밀번호는 8자 이상 15자 미만 이어야 합니다",
                      },
                      maxLength: {
                        value: 15,
                        message: "비밀번호는 15자 미만 이어야 합니다",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
                        message:
                          "영문, 숫자, 특수문자를 1가지 이상 포함해야 합니다",
                      },
                    }),
              })}
            />
            {!isSocialLogin && errors.password ? (
              <p className="px-3 text-red-500 text-sm">
                {errors.password.message}
              </p>
            ) : (
              <p className="invisible text-sm">nothing</p>
            )}
          </div>
          <div className="h-20">
            <input
              id="verifyPassword"
              type="password"
              className="rounded-full bg-stone-100 w-full p-3 border border-white mb-1"
              placeholder="비밀번호 확인"
              value={prevPW ? prevPW : undefined}
              {...register("verifyPassword", {
                ...(isSocialLogin
                  ? {}
                  : {
                      required: "필수 입력사항입니다",
                      validate: {
                        check: (val) => {
                          if (getValues("password") !== val) {
                            return "비밀번호가 일치하지 않습니다.";
                          }
                        },
                      },
                    }),
              })}
            />
            {!isSocialLogin && errors.verifyPassword ? (
              <p className="px-3 text-red-500 text-sm">
                {errors.verifyPassword.message}
              </p>
            ) : (
              <p className="invisible text-sm">nothing</p>
            )}
          </div>
          <div className="h-24">
            <input
              id="nickname"
              type="nickname"
              className="rounded-full bg-stone-100 w-full p-3 border border-white mb-1"
              placeholder="닉네임"
              {...register("nickname", {
                required: "필수 입력사항입니다",
                minLength: {
                  value: 2,
                  message: "닉네임은 2자 이상 이어야 합니다",
                },
                maxLength: {
                  value: 6,
                  message: "닉네임은 6자 미만 이어야 합니다",
                },
              })}
            />
            {errors.nickname ? (
              <p className="px-3 text-red-500 text-sm">
                {errors.nickname.message}
              </p>
            ) : (
              <p className="invisible text-sm">nothing</p>
            )}
          </div>

          <div className="flex justify-between items-center mt-1 mb-4 mx-2">
            <p className="sm:w-[30px]">
              생년
              <br />
              월일
            </p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="YYYY/MM/DD"
                value={birthday}
                onChange={(newValue) => setBirthday(newValue)}
              />
            </LocalizationProvider>
          </div>
          <div className="flex justify-between mb-10 mx-2">
            <label>성별</label>
            <div className="flex space-x-2">
              <label>
                <input
                  type="radio"
                  value="M"
                  className="mx-1"
                  checked={selectedGender === "M"}
                  onChange={handleGenderChange}
                />
                남성
              </label>
              <label>
                <input
                  type="radio"
                  value="F"
                  className="mx-1"
                  checked={selectedGender === "F"}
                  onChange={handleGenderChange}
                />
                여성
              </label>
            </div>
          </div>
          <label htmlFor="contract">
            <input id="contract" type="checkbox" required className="mx-1" />
            개인정보수집 및 이용약관에 동의합니다
          </label>
          <button
            type="submit"
            className="rounded-full bg-amber-300 hover:bg-amber-400 p-3 my-1 mt-8"
          >
            골라쥬 동료 되기
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignupModal;
```




```src\components\TestItem.jsx
// 리액트
import React from "react";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";


const TestItem = (props) => {

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  const { handleResponse, data } = props;
  const { question, answer } = data;


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    height: isXLarge ? "670px" : isLarge ? "605px" : isMedium ? "540px" : "475px",
    
    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  }

  // --------------------------------- css 끝 ---------------------------------


  return (
    <>
      <div className="container mx-auto flex flex-col justify-between items-center sm:h-[415px] md:h-[480px] lg:h-[545px] xl:h-[610px]">
        <h1 className="flex items-center fontsize-sm text-center break-keep h-3/4">
          {question}
        </h1>
        <div className="flex flex-col justify-end space-y-3 items-center h-1/4">
          <button
            className="border border-amber-300 border-2 text-base rounded-full px-10 py-1 hover:bg-amber-300 w-full h-1/2 break-keep"
            onClick={() => handleResponse(0)}
          >
            {answer[0]}
          </button>
          <button
            className="border border-amber-300 border-2 text-base rounded-full px-10 py-1 hover:bg-amber-300 w-full h-1/2 break-keep"
            onClick={() => handleResponse(1)}
          >
            {answer[1]}
          </button>
        </div>
      </div>
    </>
  );
};

export default TestItem;
```



```src\components\TestResultHeader.jsx
import React from "react";

const TestResultHeader = ({ data, result }) => {
  return (
    <>
      <p className="fontsize-md">{data.subTitle}</p>
      <p className="fontsize-xl font-bold mb-2">{data.title}</p>
      <img src={`/assets/images/sobiTest/${result}.png`} alt="" />
      <div className="flex justify-around">
        {data.tag?.map((item, index) => (
          <p
            className="bg-amber-100 px-3 py-1 m-1 text-center rounded-lg fontsize-sm"
            key={index}
          >
            {item}
          </p>
        ))}
      </div>
      <p className="my-10 fontsize-md text-center break-keep">
        {data.characteristic}
      </p>
    </>
  );
};

export default TestResultHeader;
```



```src\components\VoteButton.jsx
// 리액트 및 훅/라이브러리
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 커스텀 스토어를 이용한 상태 관리
import useAuthStore from "/src/stores/userState";
import useModalStore from "/src/stores/modalState";

// 이미지 불러오기
import NowGollajyuImage from "/assets/images/vote-button/now_gollajyu_img.png";
import SimpleGollajyuImage from "/assets/images/vote-button/simple_gollajyu_img.png";
import PurchaseGollajyuImage from "/assets/images/vote-button/purchase_gollajyu_img.png";

const VoteButton = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn); // 로그인 여부

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // ----------- 버튼 hover -----------
  const [buttonHovered, setButtonHovered] = useState(false);
  const [nowGollajyuHovered, setNowGollajyuHovered] = useState(false);
  const [simpleGollajyuHovered, setSimpleGollajyuHovered] = useState(false);
  const [purchaseGollajyuHovered, setPurchaseGollajyuHovered] = useState(false);

  // ----------- 투표 생성 버튼 호버/떠남 상태 업데이트 함수 -----------
  const buttonHover = () => {
    setButtonHovered(true);
  };

  const buttonClick = () => {
    setButtonHovered(!buttonHovered); // 클릭 시 버튼 열고 닫음
  };

  // ----------- '지금골라쥬!' 버튼 호버/떠남 상태 업데이트 함수 -----------
  const nowGollajyuHover = () => {
    setNowGollajyuHovered(true);
  };

  const nowGollajyuLeave = () => {
    setNowGollajyuHovered(false);
  };

  // ----------- '간단골라쥬!' 버튼 호버/떠남 상태 업데이트 함수 -----------
  const simpleGollajyuHover = () => {
    setSimpleGollajyuHovered(true);
  };

  const simpleGollajyuLeave = () => {
    setSimpleGollajyuHovered(false);
  };

  // ----------- '구매골라쥬!' 버튼 호버/떠남 상태 업데이트 함수 -----------
  const purchaseGollajyHover = () => {
    setPurchaseGollajyuHovered(true);
  };

  const purchaseGollajyLeave = () => {
    setPurchaseGollajyuHovered(false);
  };

  // ----------- vote 버튼 밖 클릭 시 메뉴 닫음 -----------
  const buttonRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      // 클릭된 요소가 버튼 영역 안에 있는지 확인
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        // 버튼 외부를 클릭한 경우 세부 버튼을 닫음
        setButtonHovered(false);
      }
    };

    // 페이지에 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // --------------------------------- css 시작 ---------------------------------

  // ----------- 버튼 컨테이너 스타일 -----------
  const voteButtonContainerStyle = {
    // 위치
    position: "fixed", // 버튼 하단에 고정
    zIndex: 49, // 모달 바로 아래 레이어에 위치 (모달은 50)
    bottom: isXLarge ? "50px" : isLarge ? "40px" : isMedium ? "30px" : "20px",
    right: isXLarge ? "50px" : isLarge ? "40px" : isMedium ? "30px" : "20px",
  };

  // ----------- 투표 생성 버튼 스타일 -----------
  const voteButtonStyle = {
    // 위치
    position: "relative", // 자신을 기준 위치로

    // 디자인
    width: isXLarge ? "75px" : isLarge ? "67px" : isMedium ? "59px" : "51px",
    height: isXLarge ? "75px" : isLarge ? "67px" : isMedium ? "59px" : "51px",
    borderRadius: "50%", // 버튼 둥근 테두리: 원
    backgroundColor: "#FF9999",

    // 글자
    color: "#FFFFFF",
  };

  // ----------- 투표 상세 설명 박스 스타일 -----------
  const xButtonStyle = {
    // 디자인
    paddingTop: "2px",
  };

  // ----------- 투표 상세 설명 박스 스타일 -----------
  const boxStyle = {
    // 위치
    position: "absolute", // relative를 기준 위치로
    right: isXLarge ? "15px" : isLarge ? "13px" : isMedium ? "11px" : "9px",

    // 디자인
    width: isXLarge
      ? "300px"
      : isLarge
      ? "270px"
      : isMedium
      ? "240px"
      : "210px",
    height: isXLarge ? "60px" : isLarge ? "54px" : isMedium ? "48px" : "42px",
    borderRadius: "50px",
    backgroundColor: "#F0F0F0",
    boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)", // 그림자 추가

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  // ----------- 텍스트 컨테이너 스타일 -----------
  const textContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "baseline",
  };

  // ----------- 텍스트 스타일 -----------
  const textStyle = {
    // 디자인
    marginLeft: isXLarge
      ? "30px"
      : isLarge
      ? "27px"
      : isMedium
      ? "24px"
      : "21px",

    // 글자
    color: "#000000", // 글자 색: 검정
  };

  // ----------- 포인트 텍스트 스타일 -----------
  const textPointStyle = {
    // 디자인
    marginLeft: isXLarge ? "10px" : isLarge ? "9px" : isMedium ? "8px" : "7px",

    // 글자
    color: "#FFA800", // 글자 색: 주황색
  };

  // ----------- 설명 텍스트 스타일 -----------
  const textDescriptionStyle = {
    // 상속
    ...textStyle, // 기본 텍스트 스타일 상속

    // 글자
    color: "#4A4A4A", // 글자 색: 회색
  };

  // ----------- 투표 세부 버튼 스타일 -----------
  const circleStyle = {
    // 위치
    position: "absolute", // relative를 기준 위치로
    right: "50%", // 화면의 중앙을 기준으로 오른쪽 50% 설정
    transform: `translateX(+50%) translateY(${buttonHovered ? 0 : 100}%)`, // 마우스 호버 시 위치 이동

    // 디자인
    width: isXLarge ? "60px" : isLarge ? "54px" : isMedium ? "48px" : "42px",
    height: isXLarge ? "60px" : isLarge ? "54px" : isMedium ? "48px" : "42px",
    borderRadius: "50%", // 원형 모양으로 설정
    backgroundColor: "#FF9999",
    opacity: buttonHovered ? 1 : 0, // 마우스 호버 시 투명도를 1로, 아닐 경우 0으로 설정
    transition: "opacity 0.5s ease, transform 0.5s ease", // 투명도와 위치 변화에 대한 애니메이션 효과 설정
  };

  // ----------- 이미지 스타일 -----------
  const imageStyle = {
    // 디자인
    width: "100%", // 이미지 가로 길이 100%
    height: "100%", // 이미지 세로 길이 100%
    borderRadius: "50%", // 둥근 테두리 설정
    objectFit: "cover", // 이미지가 부모 요소에 맞게 자동 조절되도록 설정
  };

  // --------------------------------- css 끝 ---------------------------------

  // 모달 상태 변경 함수
  const setLoginModalOpen = useModalStore((state) => state.setLoginModalOpen);
  const setVoteSimpleCreateModalOpen = useModalStore(
    (state) => state.setVoteSimpleCreateModalOpen
  );
  const setVoteProductCreateModalOpen = useModalStore(
    (state) => state.setVoteProductCreateModalOpen
  );

  // ----------- 버튼 아이템 목록 -----------
  const buttonItems = [
    {
      label: "지금",
      color: "#FF595E",
      image: NowGollajyuImage,
      boxBottom: isXLarge ? 85 : isLarge ? 76 : isMedium ? 67 : 58,
      circleBottom: buttonHovered
        ? isXLarge
          ? 85
          : isLarge
          ? 76
          : isMedium
          ? 67
          : 58
        : -200,
      description: "라이브 방송으로 선택을 맡겨봐요",
      hovered: nowGollajyuHovered,
      mouseEnter: nowGollajyuHover,
      mouseLeave: nowGollajyuLeave,
      handleClick: () => {
        if (isLoggedIn) {
          // 로그인 사용자 -> 지금골라쥬 생성 페이지로 이동
          navigate("/CreateVideoRoom");
        } else {
          // 비로그인 사용자 -> 로그인창 띄움
          setLoginModalOpen();
        }
      },
    },
    {
      label: "간단",
      color: "#8AC926",
      image: SimpleGollajyuImage,
      boxBottom: isXLarge ? 155 : isLarge ? 138 : isMedium ? 121 : 104,
      circleBottom: buttonHovered
        ? isXLarge
          ? 155
          : isLarge
          ? 138
          : isMedium
          ? 121
          : 104
        : -200,
      description: "간단한 질문으로 선택을 맡겨봐요",
      hovered: simpleGollajyuHovered,
      mouseEnter: simpleGollajyuHover,
      mouseLeave: simpleGollajyuLeave,
      handleClick: () => {
        // console.log("간단골라쥬 클릭");
        if (isLoggedIn) {
          // 로그인 사용자 -> 생성 모달 띄움
          setVoteSimpleCreateModalOpen();
        } else {
          // 비로그인 사용자 -> 로그인창 띄움
          setLoginModalOpen();
        }
      },
    },
    {
      label: "구매",
      color: "#1982C4",
      image: PurchaseGollajyuImage,
      boxBottom: isXLarge ? 225 : isLarge ? 200 : isMedium ? 175 : 150,
      circleBottom: buttonHovered
        ? isXLarge
          ? 225
          : isLarge
          ? 200
          : isMedium
          ? 175
          : 150
        : -200,
      description: "상세한 질문으로 선택을 맡겨봐요",
      hovered: purchaseGollajyuHovered,
      mouseEnter: purchaseGollajyHover,
      mouseLeave: purchaseGollajyLeave,
      handleClick: () => {
        // console.log("구매골라쥬 클릭");
        if (isLoggedIn) {
          // 로그인 사용자 -> 생성 모달 띄움
          setVoteProductCreateModalOpen();
        } else {
          // 비로그인 사용자 -> 로그인창 띄움
          setLoginModalOpen();
        }
      },
    },
  ];

  // ----------- 버튼 렌더링 함수 -----------
  const renderButtons = () => {
    return buttonItems.map((button, index) => (
      <div // ----------- 설명란 -----------
        key={index}
        onMouseLeave={() => button.mouseLeave()}
      >
        {button.hovered && buttonHovered && (
          <div
            style={{
              ...boxStyle,
              bottom: `${button.boxBottom}px`,
            }}
          >
            <div style={textContainerStyle}>
              <div style={{ ...textStyle, color: button.color }} className="fontsize-sm">{button.label}</div>
              <div className="fontsize-sm text-black">골라쥬!</div>
              <div style={textPointStyle} className="fontsize-xs">(10P 차감됩니다)</div>
            </div>
            <div style={textContainerStyle}>
              <div style={textDescriptionStyle} className="fontsize-xs">
                {button.description}
              </div>
            </div>
          </div>
        )}
        <div // ------------- 이미지 -------------
          style={{ ...circleStyle, bottom: `${button.circleBottom}px` }}
          onMouseEnter={() => button.mouseEnter()}
          onClick={() => button.handleClick()}
        >
          <img style={imageStyle} src={button.image} alt={button.label} />
        </div>
      </div>
    ));
  };

  return (
    <>
      <div
        style={voteButtonContainerStyle}
        onMouseEnter={buttonHover}
        onClick={buttonClick} // 클릭 시 세부 버튼 닫기
        ref={buttonRef}
      >
        {/* ------------- 투표 버튼 ------------- */}
        <button style={voteButtonStyle}>
          {buttonHovered ? (
            <p style={xButtonStyle} className="fontsize-md">
              &#10006;
            </p>
          ) : (
            <p className="fontsize-sm">
              투표
              <br />
              생성
            </p>
          )}

          {/* ------------- 버튼 렌더링 함수 호출 ------------- */}
          {renderButtons()}
        </button>
      </div>
    </>
  );
};

export default VoteButton;
```



### MainPage
```src\components\MainPage\MainVoteList.jsx
// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from "react";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 모달창 상태
import useModalStore from "/src/stores/modalState";

// 이미지 가져오기
import questionMarkImg from "/assets/images/question_mark_img.png";

const MainVoteList = () => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();
  const [listsData, setListsData] = useState([]);

  //  ----------- 상세 설명 토글하기 위한 상태 -----------
  const [showLikeDescription, setShowLikeDescription] = useState(false);
  const [showParticipateDescription, setParticipateShowDescription] = useState(false);
  const [showRecentDescription, setRecentShowDescription] = useState(false);
  const [showCompeteDescription, setCompeteShowDescription] = useState(false);

  // ----------- 상태 토글 함수 -----------
  const toggleLikeDescription = () => {
    setShowLikeDescription(!showLikeDescription);
  };
  const toggleParticipateDescription = () => {
    setParticipateShowDescription(!showParticipateDescription);
  };
  const toggleRecentDescription = () => {
    setRecentShowDescription(!showRecentDescription);
  };
  const toggleCompeteDescription = () => {
    setCompeteShowDescription(!showCompeteDescription);
  };
  
  const voteList = [
    [showLikeDescription, setShowLikeDescription, toggleLikeDescription, "좋아요 많은 투표"],
    [showParticipateDescription, setParticipateShowDescription, toggleParticipateDescription, "참여자 많은 투표"],
    [showRecentDescription, setRecentShowDescription, toggleRecentDescription, "최근 올라온 투표"],
    [showCompeteDescription, setCompeteShowDescription, toggleCompeteDescription, "선택 비율이 비슷한 투표"],
  ]

  // 상세페이지
  const setVoteDetailModalOpen = useModalStore(
    (state) => state.setVoteDetailModalOpen
  );

  const openVoteDetailModal = (voteId) => {
    setVoteDetailModalOpen(voteId);
  };

  useEffect(() => {
    // API를 통해 투표 정보를 가져옵니다.
    axios.get(`${API_URL}/votes/ranks`).then((response) => {
      const sortedVotes = response.data.body;
      const lists = [
        {
          key: 0,
          subject: "👍 좋아요순",
          items: sortedVotes.sortByLikes.slice(0, 5).map((item) => ({
            ...item,
            title: item.title,
            likesCnt: item.likesCnt,
            totalChoiceCnt: item.totalChoiceCnt,
            voteId: item.voteId,
            memberId: item.memberId,
          })),
        },
        {
          key: 1,
          subject: "📝 참여자순",
          items: sortedVotes.sortByVoter.slice(0, 5).map((item) => ({
            ...item,
            title: item.title,
            likesCnt: item.likesCnt,
            totalChoiceCnt: item.totalChoiceCnt,
            voteId: item.voteId,
            memberId: item.memberId,
          })),
        },
        {
          key: 2,
          subject: "✨ 최신순",
          items: sortedVotes.sortByNew.slice(0, 5).map((item) => ({
            ...item,
            title: item.title,
            likesCnt: item.likesCnt,
            totalChoiceCnt: item.totalChoiceCnt,
            voteId: item.voteId,
            memberId: item.memberId,
          })),
        },
        {
          key: 3,
          subject: "🔥 박빙 투표",
          items: sortedVotes.sortByClose.slice(0, 5).map((item) => ({
            ...item,
            title: item.title,
            totalChoiceCnt: item.totalChoiceCnt,
            voteId: item.voteId,
            memberId: item.memberId,
            percentage: [
              item.voteItemList[0].percent,
              item.voteItemList[1].percent,
            ],
          })),
        },
      ];
      setListsData(lists);
    });
  }, []);

  // --------------------------------- css 시작 ---------------------------------

  // ----------- 문구 컨테이너 스타일 -----------
  const textContainerStyle = {
    // 디자인
    marginBottom: isXLarge || isLarge ? "50px" : "20px",
    padding: "0 20px",
    width: "100%",

    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  // ----------- 보조 제목 스타일 -----------
  const subTitleStyle = {
    // 디자인
    marginBottom: "20px",
    padding: "8px 20px 4px",
    width: isXLarge || isLarge ? "500px" : "350px",
    backgroundColor: "#FFA8A8",

    // 글자
    fontSize: isXLarge || isLarge ? "32px" : "24px",
    fontWeight: "bold",
  };

  // ----------- 설명 스타일 -----------
  const descriptionStyle = {
    // 글자
    fontSize: isXLarge || isLarge ? "22px" : "14px",
    color: "#4A4A4A",
  };

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    width: isXLarge
      ? "1000px"
      : isLarge
      ? "740px"
      : isMedium
      ? "460px"
      : "375px",
  };

  // ----------- 투표 리스트 컨테이너 스타일 -----------
  const voteListContainerStyle = {
    // 디자인
    marginTop: isXLarge
      ? "50px"
      : isLarge
      ? "40px"
      : isMedium
      ? "30px"
      : "20px",
    padding: "10px",
    width: isXLarge ? "45%" : isLarge ? "48%" : "90%",
  };

  // ----------- 버튼 스타일 -----------
  const buttonStyle = {
    // 디자인
    width: "100%",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  // ----------- 좋아요 스타일 -----------
  const likeStyle = {
    // 디자인
    marginRight: isXLarge ? "10px" : isLarge ? "8px" : isMedium ? "6px" : "4px",

    // 글자
    color: "#FF595E",
  };

  // ----------- 물음표 스타일 -----------
  const questionMarkStyle = {
    // 디자인
    margin: "0 5px 3px 5px",
    width: "16px",
    height: "16px",
  };

  // ----------- 물음표 설명 스타일 -----------
  const questionDescriptionStyle = {
    // 디자인
    padding: "2px 5px 0",
    marginBottom: "2px",
    borderRadius: "3px",
    backgroundColor: "#6B6B6B",

    // 글자
    fontSize: "13px",
    color: "#FFFFFF",
  };

  // --------------------------------- css 끝 ---------------------------------


  return (
    <>
      <div style={textContainerStyle}>
        <p style={subTitleStyle}># 핫한 투표 리스트</p>
        <p style={descriptionStyle}>어떤 투표들이 인기있는지 확인해보아요</p>
      </div>
      <div style={bodyStyle} className="flex flex-wrap justify-center gap-4">
        {listsData.map((data, index) => (
          <div
            key={data.key}
            style={voteListContainerStyle}
            className="border-t-2 border-amber-400"
          >
            <div className="flex items-center justify-between border-b border-gray-300 pb-2">
              <div className="flex items-center">
                <p className="font-bold fontsize-md">{data.subject}</p>
                <img
                  src={questionMarkImg}
                  style={questionMarkStyle}
                  alt="물음표"
                  className="cursor-pointer rounded-full"
                  onClick={voteList[index][2]}
                  onMouseOver={() => voteList[index][1](true)}
                  onMouseOut={() => voteList[index][1](false)}
                />
                <p
                  style={{
                    ...questionDescriptionStyle,
                    visibility: voteList[index][0] ? "visible" : "hidden",
                  }}
                >
                  {voteList[index][3]}
                </p>
              </div>
              <div className="flex items-center justify-center w-10">
                {data.key !== 3 ? (
                  <img
                    src="/assets/images/person.png"
                    alt="참여자 아이콘"
                    className="w-5 h-5"
                  />
                ) : (
                  <img
                    src="/assets/images/boxing.png"
                    alt="박빙 투표 아이콘"
                    className="w-8 h-8"
                  />
                )}
              </div>
            </div>
            {data.key !== 3 ? (
              <ul className="flex flex-col">
                {data.items.map((item) => (
                  <li key={item.voteId} className="border-b border-gray-300">
                    <button
                      style={buttonStyle}
                      onClick={() => openVoteDetailModal(item.voteId)}
                      className="hover:bg-gray-200 py-2"
                    >
                      <div className="flex items-center">
                        <p style={likeStyle} className="fontsize-xs">
                          ❤ {item.likesCnt}
                        </p>
                        <p className="fontsize-sm">
                          {item.title.length > 17
                            ? item.title.slice(0, 17) + "..."
                            : item.title}
                        </p>
                      </div>
                      <div className="flex items-center justify-center w-10">
                        <p className="fontsize-xs text-gray-500">
                          {item.totalChoiceCnt}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="flex flex-col">
                {data.items.map((item) => (
                  <li key={item.voteId} className="border-b border-gray-300">
                    <button
                      style={buttonStyle}
                      onClick={() => openVoteDetailModal(item.voteId)}
                      className="hover:bg-gray-200 py-2"
                    >
                      <div className="flex items-center">
                        <p className="fontsize-sm">
                          {item.title.length > 17
                            ? item.title.slice(0, 17) + "..."
                            : item.title}
                        </p>
                      </div>
                      <div className="flex items-center justify-center w-30">
                        <p className="fontsize-xs text-gray-500">
                          {item.percentage[0].toFixed(0)}% |{" "}
                          {item.percentage[1].toFixed(0)}%
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default MainVoteList;
```


```src\components\MainPage\MainWord.jsx
// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 태그 색상 데이터 불러오기
import tagColorData from '/src/stores/tagColorData';


// 카테고리, 태그 및 유저 정보 데이터
const categories = ['의류', '가구', '신발', '전자제품']
const tagTypes1 = ['가성비', '브랜드', '소재', '색감', '모양']
const tagTypes2 = ['가성비', '브랜드', '디자인', '기능성', '내구성']
const ageTypes = ['10대','20대', '30대', '40대', '50대 이상']
const genderTypes = ['남성', '여성']
const testTypes = [
  '프렌치 마카롱', '티라미수', '포춘쿠키', 
  '지하철 만쥬', '곤약젤리', '오곡라떼', 
  '콜라', '고구마 말랭이', '붕어빵', 
  '나초', '에너지바', '슈크림', '식빵', 
  '민트초코', '초코파이', '초코잼'
]

// 랜덤 인덱스 반환 함수
const getRandomItem = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

// 랜덤 카테고리 인덱스 생성
const firstCategoryIndex = Math.floor(Math.random() * 4);
let secondCategoryIndex;

// 두 카테고리 인덱스가 서로 다르도록 2번째 카테고리를 설정
do {
  secondCategoryIndex = Math.floor(Math.random() * 4);
} while (secondCategoryIndex === firstCategoryIndex);

// 랜덤 태그 인덱스 생성
const firstTagIndex = Math.floor(Math.random() * 5);
const secondTagIndex = Math.floor(Math.random() * 5);


// ------------------ 문장 생성 함수 ------------------
const generateSentence = () => {

  // 카테고리 종류에 따라 태그 종류 변경
  const firstTagTypes = firstCategoryIndex < 2 ? tagTypes1 : tagTypes2;
  const secondTagTypes = secondCategoryIndex < 2 ? tagTypes1 : tagTypes2;

  // 랜덤 유저 정보 생성
  const userInfo = [ageTypes, genderTypes, testTypes].map(getRandomItem);

  // 문장 생성 및 반환
  const word1 = `[${categories[firstCategoryIndex]}] 에서 ${firstTagTypes[firstTagIndex]} ${['가성비', '브랜드', '소재'].includes(firstTagTypes[firstTagIndex]) ? '를' : '을'} 선호하는`
  const word2 = `“ ${userInfo[0]} • ${userInfo[1]} • ${userInfo[2]} ” ${['프렌치 마카롱', '붕어빵', '슈크림', '식빵', '초코잼'].includes(userInfo[2]) ? '은' : '는'}`
  const word3 = `[${categories[secondCategoryIndex]}] 에서 ${secondTagTypes[secondTagIndex]} ${['가성비', '브랜드', '소재'].includes(secondTagTypes[secondTagIndex]) ? '를' : '을'} 선호해요`;
  const words = [word1, word2, word3]
  return words;
};


const MainWord = () => {

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // phrase 상태 변수 선언 및 초기값 빈 문자열로 설정
  const [phrase, setPhrase] = useState([]);

  // 컴포넌트가 마운트될 때마다 문구가 바뀌도록 설정
  useEffect(() => {
    setPhrase(generateSentence());
  }, []);

  // --------------------------------- css 시작 ---------------------------------

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    margin: "0 auto",
    padding: "0 20px",
    maxWidth: "1160px",
    minWidth: "240px",
    width: "100%",

    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  // ----------- 보조 제목 스타일 -----------
  const subTitleStyle = {
    // 디자인
    margin: "100px 0",
    padding: "8px 20px 4px",
    width: isXLarge || isLarge ? "500px" : "350px",
    backgroundColor: "#CCCEFF",

    // 글자
    fontSize: isXLarge || isLarge ? "32px" : "24px",
    fontWeight: "bold",
  };

  // ----------- 문구 컨테이너 스타일 -----------
  const wordContainerStyle = {
    // 디자인
    width: isXLarge ? "100%" : "90%",

    // 컨텐츠 정렬
    justifyContent: "center",
  }

  // --------------------------------- css 끝 ---------------------------------


  return (
    <>
      <div style={bodyStyle}>
        <div style={subTitleStyle}>
          # 다른 사람들의 구매 스타일
        </div>
        <div style={wordContainerStyle}>
          <div className="flex flex-col items-center tracking-wider">
            {phrase.map((sentence, sentenceIndex) => (
              <div key={sentenceIndex}>
                {sentence.split(' ').map((word, index) => {
                  const tagColor = tagColorData.find(tag => tag.name === word)?.color;
                  return (
                    <span
                      key={index}
                      style={{
                        color: tagColor || "#000000",
                        fontSize: isXLarge ? "30px" : isLarge ? "25px" : isMedium ? "20px" : "15px",
                      }}
                    >
                      {word + ' '}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <Link
          to="/StatisticPage"
          style={{
            margin: "100px 0 ",
            width: isXLarge ? "400px" : isLarge ? "300px" : isMedium ? "200px" : "150px",
            height: isXLarge ? "60px" : isLarge ? "50px" : isMedium ? "40px" : "35px",
          }}
          className="p-4 rounded-full bg-amber-300 hover:bg-amber-400 text-center fontsize-sm"
        >
          더 자세히 알아보기 →
        </Link>
      </div>
    </>
  );
};

export default MainWord;
```


```src\components\MainPage\SwipeVote.jsx
// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from "react";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// Swiper 라이브러리 및 스타일
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, HashNavigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

// 투표 컴포넌트
import VoteCard from "../VotePage/VoteCard";

const SwipeVote = (props) => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // 부모 컴포넌트로부터 투표 목록 전달 받음
  const { voteList, isLastPage, increasePageNo } = props;
  // console.log("마지막 페이지니?", isLastPage);

  // 슬라이드 관련 상태 -> 안씀
  const [activeSlide, setActiveSlide] = useState(0);

  // ------------------ Swiper 업데이트 함수 ------------------
  useEffect(() => {
    const swiperInstance = document.querySelector(".mySwiper").swiper;
    swiperInstance.on("slideChange", () => {
      setActiveSlide(swiperInstance.activeIndex);
      // console.log("지금:", swiperInstance.activeIndex, "/", voteList.length);
      if (swiperInstance.activeIndex > voteList.length - 3 && !isLastPage) {
        // console.log("얼마 안남음");
        increasePageNo();
      } else if (
        isLastPage &&
        swiperInstance.activeIndex === voteList.length - 1
      ) {
        window.alert("더 이상 불러올 투표가 없어요");
      }
    });
    return () => {
      swiperInstance.off("slideChange");
    };
  }, [voteList]);

  // --------------------------------- css 시작 ---------------------------------

  // ----------- Swiper 스타일 -----------
  const swiperStyle = {
    // 디자인
    paddingTop: "4rem",
    paddingBottom: "4rem",
  };

  // ----------- Swiper Slide 스타일 -----------
  const getDynamicMaxWidth = () => {
    if (isXLarge) {
      return "70rem";
    } else if (isLarge) {
      return "60rem";
    } else if (isMedium) {
      return "50rem";
    } else {
      return "40rem";
    }
  };

  const getDynamicHeight = () => {
    if (isXLarge) {
      return "500px";
    } else if (isLarge) {
      return "400px";
    } else if (isMedium) {
      return "290px";
    } else {
      return "290px";
    }
  };

  const swiperSlideStyle = {
    // 디자인
    padding: "0 20px",
    maxWidth: getDynamicMaxWidth(),
    minWidth: "5rem",
    height: getDynamicHeight(),

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "center",
  };

  // ----------- vote Card  스타일 -----------
  const voteCardStyle = {
    width: "92.5%",
  };

  // --------------------------------- css 끝 ---------------------------------

  return (
    <>
      {/* ------------------ Swiper ------------------ */}
      <Swiper
        key="swiper-instance"
        effect={"coverflow"}
        grabCursor={true}
        spaceBetween={70} // 여기를 조절하여 좌우 여백을 변경
        centeredSlides={true}
        navigation={true} // 네비게이션(화살표 버튼)
        slidesPerView={"auto"}
        loop={false}
        speed={1000} // 슬라이드가 넘어가는데 필요한 최소 시간 설정(1초)
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Navigation, HashNavigation]}
        className="mySwiper"
        style={swiperStyle}
      >
        {voteList.map((vote, index) => (
          <SwiperSlide
            key={vote.voteId}
            data-hash={vote.voteId}
            style={swiperSlideStyle}
          >
            <div style={voteCardStyle}>
              {activeSlide !== index ? (
                <div
                  id="block"
                  className="absolute z-10 w-5/6 rounded-3xl"
                  style={swiperSlideStyle}
                >
                  {" "}
                </div>
              ) : null}
              <VoteCard
                key={`${vote.voteId}-card`}
                liked={vote.liked}
                likesCnt={vote.likesCnt}
                chosenItemId={vote.chosenItemId}
                voteItemList={vote.voteItemList}
                voteId={vote.voteId}
                voteTitle={vote.voteTitle}
                categoryName={vote.categoryName}
                categoryId={vote.categoryId}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwipeVote;
```


### MyPage
```src\components\MyPage\MyActivities.jsx
// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 커스텀 스토어를 이용한 상태 관리
import useAuthStore from "/src/stores/userState";

// 내 활동 컴포넌트
import MyActivitiesCreated from "./MyActivitiesCreated";
import MyActivitiesParticipated from "./MyActivitiesParticipated";
import MyActivitiesLiked from "./MyActivitiesLiked";
import MyActivitiesCommented from "./MyActivitiesCommented";

// 이미지 가져오기
import questionMarkImg from "/assets/images/question_mark_img.png";
import PointImage from "/assets/images/point_img.png";

// 모달창
import VoteDetail from "../../components/VoteDetailPage/VoteDetail";
import useModalStore from "/src/stores/modalState";

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
    style={({ isActive }) => (isActive ? activeStyle : style)}
    onMouseOver={hoverState.handleMouseEnter}
    onMouseOut={hoverState.handleMouseLeave}
  >
    {children}
  </NavLink>
);

const MyActivities = () => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  //  ----------- 상세 설명 토글하기 위한 상태 -----------
  const [showInfoDescription, setShowInfoDescription] = useState(false);
  const [showRecordDescription, setShowRecordDescription] = useState(false);
  const [showPointDescription, setShowPointDescription] = useState(false);

  // ----------- 상태 토글 함수 -----------
  const toggleInfoDescription = () => {
    setShowInfoDescription(!showInfoDescription);
  };
  const toggleRecordDescription = () => {
    setShowRecordDescription(!showRecordDescription);
  };
  const togglePointDescription = () => {
    setShowPointDescription(!showPointDescription);
  };

  // ----------- 링크 메뉴 hover -----------
  const [CreatedHovered, CreatedMouseEnter, CreatedMouseLeave] =
    useHoverState();

  const [
    ParticipatedPageHovered,
    ParticipatedPageMouseEnter,
    ParticipatedPageMouseLeave,
  ] = useHoverState();

  const [LikedPageHovered, LikedPageMouseEnter, LikedPageMouseLeave] =
    useHoverState();

  const [
    CommentedPageHovered,
    CommentedPageMouseEnter,
    CommentedPageMouseLeave,
  ] = useHoverState();

  // ----------- 페이지 마운트 시 정보를 받아오는 부분 ------------
  const user = useAuthStore((state) => state.user);
  const [createdVote, setCreatedVote] = useState([]);
  const [participatedVote, setParticipatedVote] = useState([]);
  const [likedVote, setLikedVote] = useState([]);
  const [createdComment, setCreatedComment] = useState([]);
  const [infoItems, setInfoItems] = useState([]);

  // 투표 모달 창 상태
  const isVoteDetailModalOpened = useModalStore(
    (state) => state.isVoteDetailModalOpened
  );
  // 상세페이지
  const setVoteDetailModalOpen = useModalStore(
    (state) => state.setVoteDetailModalOpen
  );

  useEffect(() => {
    window.scrollTo({ top: 0 }); // 페이지 로드되면 최상단으로 가기
    // 작성한 투표
    axios
      .get(API_URL + "/members/" + user.memberId + "/votes")
      .then((res) => {
        setCreatedVote(res.data);
        // console.log("작성한 투표:", res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
    // 좋아요한 투표
    axios
      .get(API_URL + "/members/" + user.memberId + "/votes/likes")
      .then((res) => {
        setLikedVote(res.data);
        // console.log("좋아요한 투표:", res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
    // 참여한 투표
    axios
      .get(API_URL + "/members/" + user.memberId + "/votes/participation")
      .then((res) => {
        setParticipatedVote(res.data);
        // console.log("참여한 투표:", res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
    // 작성한 댓글
    axios
      .get(API_URL + "/members/" + user.memberId + "/comments")
      .then((res) => {
        setCreatedComment(res.data);
        // console.log("작성한 댓글:", res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  useEffect(() => {
    setInfoItems([
      { title: "투표 작성", count: `${createdVote.length} 개` },
      { title: "투표 좋아요", count: `${likedVote.length} 회` },
      { title: "투표 참여", count: `${participatedVote.length} 회` },
      { title: "댓글 작성", count: `${createdComment.length} 개` },
    ]);
  }, [createdVote, participatedVote, likedVote, createdComment]);

  // ----------- 링크 아이템 목록 -----------
  const linkItems = [
    {
      to: "/Mypage/MyActivities",
      label: "작성한 투표",
      smallLabel: "작성투표",
      hovered: CreatedHovered,
      mouseEnter: CreatedMouseEnter,
      mouseLeave: CreatedMouseLeave,
    },
    {
      to: "/Mypage/MyActivities/0",
      label: "참여한 투표",
      smallLabel: "참여투표",
      hovered: ParticipatedPageHovered,
      mouseEnter: ParticipatedPageMouseEnter,
      mouseLeave: ParticipatedPageMouseLeave,
    },
    {
      to: "/Mypage/MyActivities/1",
      label: "좋아요 한 투표",
      smallLabel: "좋아요",
      hovered: LikedPageHovered,
      mouseEnter: LikedPageMouseEnter,
      mouseLeave: LikedPageMouseLeave,
    },
    {
      to: "/Mypage/MyActivities/2",
      label: "댓글 보관함",
      smallLabel: "댓글",
      hovered: CommentedPageHovered,
      mouseEnter: CommentedPageMouseEnter,
      mouseLeave: CommentedPageMouseLeave,
    },
  ];

  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom: isXLarge
      ? "50px"
      : isLarge
      ? "45px"
      : isMedium
      ? "40px"
      : "35px",
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
    height: isXLarge ? "45px" : isLarge ? "40px" : isMedium ? "35px" : "30px",
  };

  // ----------- 제목 스타일 -----------
  const titleTextStyle = {
    // 디자인
    marginTop: "5px",
    marginRight: "5px",
  };

  // ----------- 물음표 스타일 -----------
  const questionMarkStyle = {
    // 디자인
    margin: "0 5px",
    width: "16px",
    height: "16px",
  };

  // ----------- 설명 스타일 -----------
  const descriptionStyle = {
    // 디자인
    padding: "2px 5px 0",
    borderRadius: "3px",
    backgroundColor: "#6B6B6B",

    // 글자
    fontSize: "13px",
    color: "#FFFFFF",
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const contentsContainerStyle = {
    // 디자인
    padding: isXLarge ? "40px" : isLarge ? "35px" : isMedium ? "30px" : "25px",
    borderRadius: isXLarge
      ? "50px"
      : isLarge
      ? "40px"
      : isMedium
      ? "30px"
      : "20px",
    background: "#FFFFFF",
  };

  // ----------- 포인트 이미지 스타일 -----------
  const pointImageStyle = {
    // 디자인
    marginRight: isXLarge
      ? "20px"
      : isLarge
      ? "17px"
      : isMedium
      ? "14px"
      : "11px",
    width: isXLarge ? "45px" : isLarge ? "39px" : isMedium ? "33px" : "27px",
    height: isXLarge ? "45px" : isLarge ? "39px" : isMedium ? "33px" : "27px",
    borderRadius: "50%",
  };

  // ----------- 포인트 글자 스타일 -----------
  const pointTextStyle = {
    // 디자인
    marginTop: isXLarge ? "8px" : isLarge ? "7px" : isMedium ? "6px" : "5px",
  };

  // ----------- 포인트 숫자 스타일 -----------
  const pointNumberStyle = {
    // 디자인
    marginTop: isXLarge ? "10px" : isLarge ? "8px" : isMedium ? "8px" : "6px",
    marginLeft: "10px",

    // 글자
    color: "#FFA500",
  };

  // ----------- 구분선 스타일 -----------
  const barStyle = {
    // 디자인
    margin: isXLarge
      ? "30px 0"
      : isLarge
      ? "25px 0"
      : isMedium
      ? "20px 0"
      : "15px 0",
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
  };

  // ----------- 정보 아이템 스타일 -----------
  const infoItemStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    margin: isXLarge || isLarge ? "10px 0" : "5px 0",
    padding: isXLarge
      ? "10px 20px"
      : isLarge
      ? "8px 18px"
      : isMedium
      ? "6px 16px"
      : "4px 14px",
    width: isXLarge || isLarge ? "50%" : "100%", // (반응형) 큰 화면에서 아이템이 한 줄에 두 개씩 나타나게 함
    height: isXLarge ? "60px" : isLarge ? "52px" : isMedium ? "44px" : "36px",
    backgroundColor: "#F0F0F0",

    // 컨텐츠 정렬
    justifyContent: "space-between",
  };

  // ----------- 왼쪽 아이템 스타일 -----------
  const itemLeftStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    marginRight: isXLarge ? "16px" : isLarge ? "12px" : "0px",
  };

  // ----------- 오른쪽 아이템 스타일 -----------
  const itemRightStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    marginLeft: isXLarge ? "16px" : isLarge ? "12px" : "0px",
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
    marginRight: isXLarge ? "10px" : isLarge ? "8px" : isMedium ? "6px" : "4px",
    paddingTop: isXLarge ? "8px" : isLarge ? "7px" : isMedium ? "6px" : "5px",
    width: isXLarge || isLarge ? "20%" : isMedium ? "22%" : "25%",
    height: isXLarge ? "60px" : isLarge ? "50px" : "40px",
    borderTopLeftRadius:
      isXLarge || isLarge ? "20px" : isMedium ? "15px" : "10px",
    borderTopRightRadius:
      isXLarge || isLarge ? "20px" : isMedium ? "15px" : "10px",
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
    height: isXLarge ? "70px" : isLarge ? "60px" : "50px",
  };

  // ----------- 링크 버튼 active 스타일 -----------
  const linkItemActiveStyle = {
    // 상속
    ...linkItemStyle,

    // 디자인
    background: "#FFFFFF",

    // 글자
    height: isXLarge ? "70px" : isLarge ? "60px" : "50px",
    color: "#000000",
  };

  // ----------- 활동기록 컨테이너 스타일 -----------
  const historyContainerStyle = {
    // 디자인
    padding: isXLarge ? "40px" : isLarge ? "35px" : isMedium ? "30px" : "25px",
    minHeight: isXLarge
      ? "1000px"
      : isLarge
      ? "740px"
      : isMedium
      ? "460px"
      : "375px",
    borderBottomLeftRadius: isXLarge
      ? "50px"
      : isLarge
      ? "40px"
      : isMedium
      ? "30px"
      : "20px",
    borderBottomRightRadius: isXLarge
      ? "50px"
      : isLarge
      ? "40px"
      : isMedium
      ? "30px"
      : "20px",
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
              <div style={infoDataStyle} className="fontsize-sm">
                {item.count}
              </div>
            </div>
            {infoItems[index + 1] && (
              <div style={itemRightStyle}>
                <div className="fontsize-md">{infoItems[index + 1].title}</div>
                <div style={infoDataStyle} className="fontsize-sm">
                  {infoItems[index + 1].count}
                </div>
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
          <span style={titleTextStyle} className="fontsize-lg">
            # 활동정보
          </span>
          <img
            src={questionMarkImg}
            style={questionMarkStyle}
            alt="물음표"
            className="cursor-pointer rounded-full"
            onClick={toggleInfoDescription}
            onMouseOver={() => setShowInfoDescription(true)}
            onMouseOut={() => setShowInfoDescription(false)}
          />
          <p
            style={{
              ...descriptionStyle,
              visibility: showInfoDescription ? "visible" : "hidden",
            }}
          >
            내 포인트 및 누적 활동정보
          </p>
        </div>
        <div style={contentsContainerStyle}>
          <div style={flexContainerStyle}>
            <img src={PointImage} alt="포인트 이미지" style={pointImageStyle} />
            <div style={pointTextStyle} className="fontsize-lg">
              내 포인트
            </div>
            <div style={pointNumberStyle} className="fontsize-xl mx-2">
              {user.point}
            </div>
            <div className="relative">
              <img
                src={questionMarkImg}
                style={questionMarkStyle}
                alt="물음표"
                className="cursor-pointer rounded-full"
                onClick={togglePointDescription}
                onMouseOver={() => setShowPointDescription(true)}
                onMouseOut={() => setShowPointDescription(false)}
              />
              <p
                style={{
                  ...descriptionStyle,
                  visibility: showPointDescription ? "visible" : "hidden",
                  position: "absolute",
                  top: -2,
                  left: 30,
                }}
              >
                투표하기 (+2)
                <br />
                골라쥬 생성 (-10)
              </p>
            </div>
          </div>
          <div style={barStyle}></div>
          {renderInfoItems}
        </div>
      </div>

      {/* ------------- 활동기록 ------------- */}
      <div style={containerStyle}>
        <div style={titleContainerStyle}>
          <span style={titleTextStyle} className="fontsize-lg">
            # 활동기록
          </span>
          <img
            src={questionMarkImg}
            style={questionMarkStyle}
            alt="물음표"
            className="cursor-pointer rounded-full"
            onClick={toggleRecordDescription}
            onMouseOver={() => setShowRecordDescription(true)}
            onMouseOut={() => setShowRecordDescription(false)}
          />
          <p
            style={{
              ...descriptionStyle,
              visibility: showRecordDescription ? "visible" : "hidden",
            }}
          >
            참여 투표 목록 및 바로가기
          </p>
        </div>
        <div style={linkContainerStyle}>
          {linkItems.map((item, index) => (
            <MenuItem
              key={index}
              to={item.to}
              style={{
                ...(item.hovered ? linkItemHoverStyle : linkItemStyle),
                ...(index === 3 ? { marginRight: "0" } : undefined), // 마지막 요소는 오른쪽 여백 삭제
              }}
              activeStyle={{
                ...linkItemActiveStyle,
                ...(index === 3 ? { marginRight: "0" } : undefined), // 마지막 요소는 오른쪽 여백 삭제
              }}
              hoverState={{
                hovered: item.hovered,
                handleMouseEnter: item.mouseEnter,
                handleMouseLeave: item.mouseLeave,
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
            <Route
              path="/"
              element={<MyActivitiesCreated props={createdVote} />}
            />
            <Route
              path="/0"
              element={<MyActivitiesParticipated props={participatedVote} />}
            />
            <Route
              path="/1"
              element={<MyActivitiesLiked props={likedVote} />}
            />
            <Route
              path="/2"
              element={<MyActivitiesCommented props={createdComment} />}
            />
          </Routes>
        </div>
      </div>
      {isVoteDetailModalOpened && <VoteDetail />}
    </>
  );
};

export default MyActivities;
```




```src\components\MyPage\MyActivitiesCommented.jsx
// 리액트
import React from "react";

// 내 댓글 컴포넌트
import MyActivitiesCommentItem from "./MyActivitiesCommentItem";


const MyActivitiesCommented = ({ props }) => {
  // console.log("작성한 댓글:", props);
  return (
    <>
      {props.length >= 1 ? (
        props.map((item, index) => {
          return <MyActivitiesCommentItem key={index} commentItem={item} />;
        })
      ) : (
        <p className="fontsize-sm">작성한 댓글이 없습니다</p>
      )}
    </>
  );
};

export default MyActivitiesCommented;
```




```src\components\MyPage\MyActivitiesCommentItem.jsx
// 리액트 및 훅/라이브러리
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 모달창 상태
import useModalStore from "/src/stores/modalState";

// ----------- Hover 커스텀 훅 -----------
const useHoverState = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return [hovered, handleMouseEnter, handleMouseLeave];
};

const MyActivitiesCommentItem = ({ commentItem }) => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // ----------- 내 활동 아이템 hover -----------
  const [ItemHovered, ItemMouseEnter, ItemMouseLeave] = useHoverState();

  // ----------- voteOptions -----------
  const voteItem = commentItem.voteResDto;
  const voteOptions = [];
  const total = voteItem.voteItems.reduce((total, item) => {
    return total + item.resultSize;
  }, 0);

  voteItem.voteItems.map((item) => {
    const isMyChoice =
      item.voteItemId == voteItem.selectedItemId ? true : false;
    voteOptions.push({
      label: item.voteItemDesc,
      ratio: (item.resultSize / total) * 100,
      isMyChoice: isMyChoice,
    });
  });

  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom: "30px",
    padding: isXLarge
      ? "20px 30px"
      : isLarge
      ? "17px 26px"
      : isMedium
      ? "14px 22px"
      : "11px 18px",
    width: "100%",
    border: ItemHovered ? "3px solid #D0D0D0" : "3px solid #FFFFFF",
    borderRadius: "10px", // 둥근 테두리
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)", // 그림자 효과
  };

  // ----------- flex 컨테이너 스타일 -----------
  const flexContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- 정보 컨테이너 스타일 -----------
  const infoContainerStyle = {
    // 디자인
    width: "100%",

    // 글자
    color: "#4A4A4A",

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "space-between",
  };

  // ----------- 정보 서브 컨테이너 스타일 -----------
  const infoSubContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
  };

  // ----------- 제목 스타일 -----------
  const titleStyle = {
    // 디자인
    marginRight: "10px",
  };

  // ----------- 구분 선 스타일 -----------
  const barStyle = {
    // 디자인
    margin: "0 5px",
  };

  // ----------- 좋아요 수 스타일 -----------
  const likeNumberStyle = {
    // 글자
    color: "#FF6D6D",
  };

  // ----------- 투표 컨테이너 스타일 -----------
  const voteContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "center",
    flexWrap: isXLarge || isLarge ? "nowrap" : "wrap", // 화면 작을 때 줄 바꿈 허용
  };

  // ----------- 투표 아이템 스타일 -----------
  const voteItemStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    margin: isXLarge ? "10px" : isLarge ? "9px" : isMedium ? "8px" : "7px",
    marginTop: "0",
    padding: "5px",
    width: isXLarge ? "150px" : isLarge ? "130px" : isMedium ? "110px" : "90px",
    border: "5px solid",

    // 컨텐츠 정렬
    flexDirection: "column",
  };

  // --------------------------------- css 끝 ---------------------------------

  // ----------- VoteItem 컴포넌트 정의 -----------
  const VoteItem = ({ label, ratio, isMyChoice }) => {
    // 가장 높은 비율의 선택지 찾기
    const highestRatioOption = voteOptions.reduce(
      (maxOption, currentOption) => {
        return currentOption.ratio > maxOption.ratio
          ? currentOption
          : maxOption;
      },
      { ratio: -1 }
    ); // 초기 비율을 -1로 설정하여 모든 비율보다 작도록 함

    // ----------- myPick 스타일 -----------
    const myPickStyle = {
      marginLeft: "15px",
      color: "#FF6D6D",
      visibility: isMyChoice ? "visible" : "hidden",
    };

    // ----------- 투표 아이템 스타일 -----------
    const itemStyle = {
      ...voteItemStyle,

      // 가장 높은 비율의 선택지 배경 색 추가
      backgroundColor:
        ratio === highestRatioOption.ratio ? "#FFE69C" : "#F0F0F0",

      // isMyChoice가 ture거나 가장 높은 비율일 경우 글자 색 검은색으로 변경
      color: isMyChoice
        ? "#000000"
        : ratio === highestRatioOption.ratio
        ? "#000000"
        : "#4A4A4A",

      // isMyChoice가 true일 때 테두리 색 변경
      borderColor: isMyChoice
        ? "#FFA8A8"
        : ratio === highestRatioOption.ratio
        ? "#FFE69C"
        : "#F0F0F0",
    };

    return (
      <>
        <div>
          <div style={myPickStyle} className="fontsize-xs">
            My Pick
          </div>
          <div style={itemStyle}>
            <div className="fontsize-sm">{label}</div>
            <div className="fontsize-xs">{ratio.toFixed(2)} %</div>
          </div>
        </div>
      </>
    );
  };

  // ----------- comment가 일정 길이 이상이면 ...으로 대체하는 함수 -----------
  const truncateComment = (comment) => {
    const maxLabelLength = 20; // 최대 길이
    return comment.length > maxLabelLength
      ? `${comment.substring(0, maxLabelLength)}...`
      : comment;
  };

  // ----------- label이 일정 길이 이상이면 ...으로 대체하는 함수 -----------
  const truncateLabel = (label) => {
    const maxLabelLength = 6; // 최대 길이
    return label.length > maxLabelLength
      ? `${label.substring(0, maxLabelLength)}...`
      : label;
  };

  // ----------- Vote 컴포넌트 사용 함수 -----------
  const Vote = ({ voteOptions }) => {
    return (
      <>
        <div style={voteContainerStyle}>
          {voteOptions.map((option, index) => (
            <VoteItem
              key={index}
              label={truncateLabel(option.label)}
              ratio={option.ratio}
              isMyChoice={option.isMyChoice}
            />
          ))}
        </div>
      </>
    );
  };

  // 상세페이지
  const setVoteDetailModalOpen = useModalStore(
    (state) => state.setVoteDetailModalOpen
  );

  const openVoteDetailModal = (voteId) => {
    setVoteDetailModalOpen(voteId);
  };

  return (
    <>
      <NavLink onMouseOver={ItemMouseEnter} onMouseOut={ItemMouseLeave}>
        <div
          style={containerStyle}
          onClick={() => {
            openVoteDetailModal(voteItem.voteId);
          }}
        >
          <div style={flexContainerStyle}>
            <div style={titleStyle} className="fontsize-lg">
              {truncateComment(commentItem.commentDescription)}
            </div>
          </div>
          <div style={infoContainerStyle}>
            <div style={infoSubContainerStyle}>
              <div className="fontsize-sm">
                {voteItem.categoryDto.categoryName}
              </div>
              <div style={barStyle} className="fontsize-sm">
                |
              </div>
              <div style={likeNumberStyle} className="fontsize-sm">
                {voteItem.isLiked ? "❤" : "♡"} {voteItem.likesCount}
              </div>
            </div>
            <div className="fontsize-sm">
              작성일 :{" "}
              {voteItem.createAt.slice(0, 10) +
                " " +
                voteItem.createAt.slice(11, 16)}
            </div>
          </div>
          <Vote voteOptions={voteOptions} />
        </div>
      </NavLink>
    </>
  );
};

export default MyActivitiesCommentItem;
```


```src\components\MyPage\MyActivitiesCreated.jsx
// 리액트
import React from "react";

// 내 투표 컴포넌트
import MyActivitiesVoteItem from "./MyActivitiesVoteItem";

const MyActivitiesCreated = ({ props }) => {
  // console.log("작성한 투표:", props);

  return (
    <>
      {props.length >= 1 ? (
        props.map((item, index) => {
          return <MyActivitiesVoteItem key={index} voteItem={item} />;
        })
      ) : (
        <p className="fontsize-sm">작성한 투표가 없습니다</p>
      )}
    </>
  );
};

export default MyActivitiesCreated;
```




```src\components\MyPage\MyActivitiesLiked.jsx
// 리액트
import React from "react";

// 내 투표 컴포넌트
import MyActivitiesVoteItem from "./MyActivitiesVoteItem";

const MyActivitiesLiked = ({ props }) => {
  // console.log("좋아요한 투표:", props);

  return (
    <>
      {props.length >= 1 ? (
        props.map((item, index) => {
          return (
            <div key={index}>
              <MyActivitiesVoteItem voteItem={item} />
            </div>
          );
        })
      ) : (
        <p className="fontsize-sm">좋아요한 투표가 없습니다</p>
      )}
    </>
  );
};

export default MyActivitiesLiked;
```




```src\components\MyPage\MyActivitiesParticipated.jsx
// 리액트
import React from "react";

// 내 투표 컴포넌트
import MyActivitiesVoteItem from "./MyActivitiesVoteItem";


const MyActivitiesParticipated = ({ props }) => {
  // console.log("참여한 투표:", props);
  return (
    <>
      {props.length >= 1 ? (
        props.map((item, index) => {
          return <MyActivitiesVoteItem key={index} voteItem={item} />;
        })
      ) : (
        <p className="fontsize-sm">참여한 투표가 없습니다</p>
      )}
    </>
  );
};

export default MyActivitiesParticipated;
```



```src\components\MyPage\MyActivitiesVoteItem.jsx
// 리액트 및 훅/라이브러리
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 모달창 상태
import useModalStore from "/src/stores/modalState";

// ----------- Hover 커스텀 훅 -----------
const useHoverState = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return [hovered, handleMouseEnter, handleMouseLeave];
};

const MyActivitiesVoteItem = ({ voteItem }) => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // ----------- 내 활동 아이템 hover -----------
  const [ItemHovered, ItemMouseEnter, ItemMouseLeave] = useHoverState();

  // ----------- voteOptions -----------

  const voteOptions = [];
  const total = voteItem.voteItems.reduce((total, item) => {
    return total + item.resultSize;
  }, 0);

  voteItem.voteItems.map((item) => {
    const isMyChoice =
      item.voteItemId == voteItem.selectedItemId ? true : false;
    voteOptions.push({
      label: item.voteItemDesc,
      ratio: (item.resultSize / total) * 100,
      isMyChoice: isMyChoice,
    });
  });

  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom: "30px",
    padding: isXLarge
      ? "20px 30px"
      : isLarge
      ? "17px 26px"
      : isMedium
      ? "14px 22px"
      : "11px 18px",
    width: "100%",
    border: ItemHovered ? "3px solid #D0D0D0" : "3px solid #FFFFFF",
    borderRadius: "10px", // 둥근 테두리
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)", // 그림자 효과
  };

  // ----------- flex 컨테이너 스타일 -----------
  const flexContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- 정보 컨테이너 스타일 -----------
  const infoContainerStyle = {
    // 디자인
    width: "100%",

    // 글자
    color: "#4A4A4A",

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "space-between",
  };

  // ----------- 정보 서브 컨테이너 스타일 -----------
  const infoSubContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
  };

  // ----------- 제목 스타일 -----------
  const titleStyle = {
    // 디자인
    marginRight: "10px",
  };

  // ----------- 댓글 수 스타일 -----------
  const commentNumberStyle = {
    // 글자
    color: "#868FF4",
  };

  // ----------- 구분 선 스타일 -----------
  const barStyle = {
    // 디자인
    margin: "0 5px",
  };

  // ----------- 좋아요 수 스타일 -----------
  const likeNumberStyle = {
    // 글자
    color: "#FF6D6D",
  };

  // ----------- 투표 컨테이너 스타일 -----------
  const voteContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "center",
    flexWrap: isXLarge || isLarge ? "nowrap" : "wrap", // 화면 작을 때 줄 바꿈 허용
  };

  // ----------- 투표 아이템 스타일 -----------
  const voteItemStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    margin: isXLarge ? "10px" : isLarge ? "9px" : isMedium ? "8px" : "7px",
    marginTop: "0",
    padding: "5px",
    width: isXLarge ? "150px" : isLarge ? "130px" : isMedium ? "110px" : "90px",
    border: "5px solid",

    // 컨텐츠 정렬
    flexDirection: "column",
  };

  // --------------------------------- css 끝 ---------------------------------

  // ----------- VoteItem 컴포넌트 정의 -----------
  const VoteItem = ({ label, ratio, isMyChoice }) => {
    // 가장 높은 비율의 선택지 찾기
    const highestRatioOption = voteOptions.reduce(
      (maxOption, currentOption) => {
        return currentOption.ratio > maxOption.ratio
          ? currentOption
          : maxOption;
      },
      { ratio: -1 }
    ); // 초기 비율을 -1로 설정하여 모든 비율보다 작도록 함

    // ----------- myPick 스타일 -----------
    const myPickStyle = {
      marginLeft: "15px",
      color: "#FF6D6D",
      visibility: isMyChoice ? "visible" : "hidden",
    };

    // ----------- 투표 아이템 스타일 -----------
    const itemStyle = {
      ...voteItemStyle,

      // 가장 높은 비율의 선택지 배경 색 추가
      backgroundColor:
        ratio === highestRatioOption.ratio ? "#FFE69C" : "#F0F0F0",

      // isMyChoice가 ture거나 가장 높은 비율일 경우 글자 색 검은색으로 변경
      color: isMyChoice
        ? "#000000"
        : ratio === highestRatioOption.ratio
        ? "#000000"
        : "#4A4A4A",

      // isMyChoice가 true일 때 테두리 색 변경
      borderColor: isMyChoice
        ? "#FFA8A8"
        : ratio === highestRatioOption.ratio
        ? "#FFE69C"
        : "#F0F0F0",
    };

    return (
      <>
        <div>
          <div style={myPickStyle} className="fontsize-xs">
            My Pick
          </div>
          <div style={itemStyle}>
            <div className="fontsize-sm">{label}</div>
            <div className="fontsize-xs">{ratio.toFixed(2)} %</div>
          </div>
        </div>
      </>
    );
  };

  // ----------- title이 일정 길이 이상이면 ...으로 대체하는 함수 -----------
  const truncateTitle = (title) => {
    const maxLabelLength = 20; // 최대 길이
    return title.length > maxLabelLength
      ? `${title.substring(0, maxLabelLength)}...`
      : title;
  };

  // ----------- label이 일정 길이 이상이면 ...으로 대체하는 함수 -----------
  const truncateLabel = (label) => {
    const maxLabelLength = 6; // 최대 길이
    return label.length > maxLabelLength
      ? `${label.substring(0, maxLabelLength)}...`
      : label;
  };

  // ----------- Vote 컴포넌트 사용 함수 -----------
  const Vote = ({ voteOptions }) => {
    return (
      <>
        <div style={voteContainerStyle}>
          {voteOptions.map((option, index) => (
            <VoteItem
              key={index}
              label={truncateLabel(option.label)}
              ratio={option.ratio}
              isMyChoice={option.isMyChoice}
            />
          ))}
        </div>
      </>
    );
  };

  // 상세페이지
  const setVoteDetailModalOpen = useModalStore(
    (state) => state.setVoteDetailModalOpen
  );

  const openVoteDetailModal = (voteId) => {
    setVoteDetailModalOpen(voteId);
  };

  return (
    <>
      <NavLink onMouseOver={ItemMouseEnter} onMouseOut={ItemMouseLeave}>
        <div
          style={containerStyle}
          onClick={() => {
            openVoteDetailModal(voteItem.voteId);
          }}
        >
          <div style={flexContainerStyle}>
            <div style={titleStyle} className="fontsize-lg">
              {truncateTitle(voteItem.title)}
            </div>
            <div style={commentNumberStyle} className="fontsize-md"></div>
          </div>
          <div style={infoContainerStyle}>
            <div style={infoSubContainerStyle}>
              <div className="fontsize-sm">
                {voteItem.categoryDto.categoryName}
              </div>
              <div style={barStyle} className="fontsize-sm">
                |
              </div>
              <div style={likeNumberStyle} className="fontsize-sm">
                {voteItem.isLiked ? "❤" : "♡"} {voteItem.likesCount}
              </div>
            </div>
            <div className="fontsize-sm">
              작성일 :{" "}
              {voteItem.createAt.slice(0, 10) +
                " " +
                voteItem.createAt.slice(11, 16)}
            </div>
          </div>
          <Vote voteOptions={voteOptions} />
        </div>
      </NavLink>
    </>
  );
};

export default MyActivitiesVoteItem;
```



```src\components\MyPage\MyProfile.jsx
// 리액트 및 훅/라이브러리
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 커스텀 스토어를 이용한 상태 관리
import useAuthStore from "/src/stores/userState";

// 소비성향 데이터 불러오기
import sobiTIData from "/src/stores/testResultData.js";

// 소비성향 조사 결과 컴포넌트
import TestResultHeader from "../TestResultHeader";

// 이미지 가져오기
import questionMarkImg from "/assets/images/question_mark_img.png";

const MyProfile = () => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  //  ----------- 상세 설명 토글하기 위한 상태 -----------
  const [showInfoDescription, setShowInfoDescription] = useState(false);
  const [showTestDescription, setTestShowDescription] = useState(false);

  // ----------- 상태 토글 함수 -----------
  const toggleInfoDescription = () => {
    setShowInfoDescription(!showInfoDescription);
  };
  const toggleTestDescription = () => {
    setTestShowDescription(!showTestDescription);
  };

  // ----------- 버튼 hover -----------
  const [buttonHovered, setButtonHovered] = useState(false);
  const [testButtonHovered, setTestButtonHovered] = useState(false);

  // ----------- state 정의 -----------
  const [result, setResult] = useState(1);
  const [matchingData, setMatchingData] = useState({});

  // ----------- result가 변경될 때마다 실행되는 함수 -----------
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    window.scrollTo({ top: 0 }); // 페이지 로드되면 최상단으로 가기
    setResult(user.typeId);
    setMatchingData(sobiTIData.find((data) => data.id === user.typeId));
  }, []);

  const [isEditMode, setIsEditMode] = useState(false);
  const [changedNickname, setChangedNickname] = useState(user.nickname);
  const updateNickname = useAuthStore((state) => state.updateNickname);
  const handleEditToggle = () => {
    if (isEditMode) {
      const data = {
        ...user,
        nickname: changedNickname,
      };
      axios.put(API_URL + "/members", data).then((res) => {
        // console.log("닉네임 변경");
        updateNickname(changedNickname);
      });
    }
    setIsEditMode(!isEditMode);
  };

  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom: isXLarge
      ? "50px"
      : isLarge
      ? "45px"
      : isMedium
      ? "40px"
      : "35px",
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
    height: isXLarge ? "45px" : isLarge ? "40px" : isMedium ? "35px" : "30px",
  };

  // ----------- 제목 스타일 -----------
  const titleStyle = {
    // 디자인
    marginTop: "5px",
    marginRight: "5px",
  };

  // ----------- 물음표 스타일 -----------
  const questionMarkStyle = {
    // 디자인
    margin: "0 5px",
    width: "16px",
    height: "16px",
  };

  // ----------- 설명 스타일 -----------
  const descriptionStyle = {
    // 디자인
    padding: "2px 5px 0",
    borderRadius: "3px",
    backgroundColor: "#6B6B6B",

    // 글자
    fontSize: "13px",
    color: "#FFFFFF",
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const contentContainerStyle = {
    // 디자인
    padding: isXLarge ? "40px" : isLarge ? "35px" : isMedium ? "30px" : "25px",
    borderRadius: isXLarge
      ? "50px"
      : isLarge
      ? "40px"
      : isMedium
      ? "30px"
      : "20px",
    background: "#FFFFFF",
  };

  // ----------- 프로필 이미지 스타일 -----------
  const profileImageStyle = {
    // 디자인
    marginRight: "40px",
    width: isXLarge ? "100px" : isLarge ? "90px" : isMedium ? "80px" : "70px",
    height: isXLarge ? "100px" : isLarge ? "90px" : isMedium ? "80px" : "70px",
    borderRadius: "50%",
  };

  // ----------- 프로필 글자 스타일 -----------
  const profileTextStyle = {
    // 디자인
    marginTop: "10px",
  };

  // ----------- 구분선 스타일 -----------
  const barStyle = {
    // 디자인
    margin: isXLarge
      ? "30px 0"
      : isLarge
      ? "25px 0"
      : isMedium
      ? "20px 0"
      : "15px 0",
    width: "100%",
    height: "3px",
    backgroundColor: "#F0F0F0",
  };

  // ----------- 정보 컨테이너 스타일 -----------
  const infoContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 컨텐츠 정렬
    flexDirection: isXLarge || isLarge ? "row" : "column",
  };

  // ----------- 정보 아이템 스타일 -----------
  const infoItemStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    margin: isXLarge || isLarge ? "10px 0" : "5px 0",
    padding: isXLarge
      ? "10px 20px"
      : isLarge
      ? "8px 18px"
      : isMedium
      ? "6px 16px"
      : "4px 14px",
    width: isXLarge || isLarge ? "50%" : "100%", // (반응형) 큰 화면에서 아이템이 한 줄에 두 개씩 나타나게 함
    height: isXLarge ? "60px" : isLarge ? "52px" : isMedium ? "44px" : "36px",
    backgroundColor: "#F0F0F0",

    // 컨텐츠 정렬
    justifyContent: "space-between",
  };

  // ----------- 왼쪽 아이템 스타일 -----------
  const infoItemLeftStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    marginRight: isXLarge ? "16px" : isLarge ? "12px" : "0px",
  };

  // ----------- 오른쪽 아이템 스타일 -----------
  const infoItemRightStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    marginLeft: isXLarge ? "16px" : isLarge ? "12px" : "0px",
  };

  // ----------- 정보 데이터 스타일 -----------
  const infoDataStyle = {
    // 디자인
    marginTop: "3px",

    // 글자
    color: "#4A4A4A",
  };

  // ----------- 쇠비성향 컨텐츠 컨테이너 스타일 -----------
  const testContainerStyle = {
    // 상속
    ...contentContainerStyle,
    ...flexContainerStyle,

    // 컨텐츠 정렬
    flexDirection: "column",
  };

  // --------------------------------- css 끝 ---------------------------------

  return (
    <>
      {/* ------------- 기본정보 ------------- */}
      <div style={containerStyle}>
        <div style={titleContainerStyle}>
          <span style={titleStyle} className="fontsize-lg">
            # 기본정보
          </span>
          <img
            src={questionMarkImg}
            style={questionMarkStyle}
            alt="물음표"
            className="cursor-pointer rounded-full"
            onClick={toggleInfoDescription}
            onMouseOver={() => setShowInfoDescription(true)}
            onMouseOut={() => setShowInfoDescription(false)}
          />
          <p
            style={{
              ...descriptionStyle,
              visibility: showInfoDescription ? "visible" : "hidden",
            }}
          >
            회원가입 시 입력한 정보
          </p>
        </div>
        <div style={contentContainerStyle}>
          <div style={flexContainerStyle}>
            <img
              src={
                // user.profileImgUrl이 숫자면 -> 소비성향테스트 결과 번호 -> 해당 번호의 png 파일을 src로 지정
                !isNaN(user.profileImgUrl)
                  ? `/assets/images/sobiTest/${user.profileImgUrl}.png`
                  : user.profileImgUrl
              }
              alt="프로필 이미지"
              style={profileImageStyle}
            />
            <div>
              {/* {isEditMode ? (
                <div className="flex">
                  <input
                    type="text"
                    value={changedNickname}
                    onChange={(e) => {
                      if (e.target.value.length > 6) {
                        window.alert("닉네임은 6글자까지만 가능해요");
                        setChangedNickname(e.target.value.slice(0, 6));
                      } else {
                        setChangedNickname(e.target.value);
                      }
                    }}
                  />
                  <button
                    className="mx-4 px-3 py-1 border-4 border-zinc-300 rounded-md fontsize-sm text-zinc-500 bg-white hover:bg-zinc-200"
                    onClick={handleEditToggle}
                  >
                    수정완료
                  </button>
                </div>
              ) : (
                <div className="flex">
                  <div style={profileTextStyle} className="fontsize-lg">
                    {user.nickname}
                  </div>
                  <button
                    className="relative mx-4 mt-2 px-3 py-1 h-10 border-4 border-zinc-300 rounded-md fontsize-sm text-zinc-500 bg-white hover:bg-zinc-200"
                    onMouseOver={() => setButtonHovered(true)}
                    onMouseOut={() => setButtonHovered(false)}
                    onClick={handleEditToggle}
                  >
                    {buttonHovered && (
                      <p className="absolute left-1 -top-6 text-amber-400">
                        100p가 사용됩니다
                      </p>
                    )}
                    닉네임 수정하기
                  </button>
                </div>
              )} */}

              <div style={profileTextStyle} className="fontsize-md">
                {user.email}
              </div>
            </div>
          </div>
          <div style={barStyle}></div>
          <div style={infoContainerStyle}>
            <div style={infoItemLeftStyle}>
              <div className="fontsize-md">생년월일</div>
              <div style={infoDataStyle} className="fontsize-sm">
                {`${user.birthday.year}.${String(user.birthday.month).padStart(
                  2,
                  "0"
                )}.${String(user.birthday.day).padStart(2, "0")}`}
              </div>
            </div>
            <div style={infoItemRightStyle}>
              <div className="fontsize-md">성별</div>
              <div style={infoDataStyle} className="fontsize-sm">
                {user.gender === "MALE" ? "남성" : "여성"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------- 소비성향 ------------- */}
      <div style={containerStyle}>
        <div style={titleContainerStyle}>
          <span style={titleStyle} className="fontsize-lg">
            # 소비성향
          </span>
          <img
            src={questionMarkImg}
            style={questionMarkStyle}
            alt="물음표"
            className="cursor-pointer rounded-full"
            onClick={toggleTestDescription}
            onMouseOver={() => setTestShowDescription(true)}
            onMouseOut={() => setTestShowDescription(false)}
          />
          <p
            style={{
              ...descriptionStyle,
              visibility: showTestDescription ? "visible" : "hidden",
            }}
          >
            소비성향 테스트 결과
          </p>
        </div>
        <div style={testContainerStyle}>
          <TestResultHeader data={matchingData} result={result} />
          <NavLink
            to="/TestResultPage"
            end
            className="w-1/3 sm:w-2/5 md:w-2/5 p-5 rounded-full bg-amber-300 hover:bg-amber-400 text-center fontsize-sm"
            onMouseOver={() => setTestButtonHovered(true)}
            onMouseOut={() => setTestButtonHovered(false)}
          >
            자세히 알아보기
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
```




```src\components\MyPage\MyStatistics.jsx
// 리액트 및 훅/라이브러리
import React, { useState, useEffect, useRef } from "react";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 커스텀 스토어를 이용한 상태 관리
import useAuthStore from "/src/stores/userState";

// 카테고리 및 소비성향 데이터 불러오기
import categoryData from "/src/stores/categoryData";
import tagColorData from "/src/stores/tagColorData";

// 차트 컴포넌트
import MyStatisticsChart from "./MyStatisticsChart";

// 이미지 가져오기
import questionMarkImg from "/assets/images/question_mark_img.png";
import Favicon from "/assets/images/favicon.png";

// Material-UI의 CircularProgress 컴포넌트
import { CircularProgress } from "@mui/material";

const filteredCategoryData = categoryData.filter((category) => {
  return category.name !== "전체" && category.name !== "간단";
});

const RecommendModal = ({ topCategory, closeModal }) => {
  const user = useAuthStore((state) => state.user);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(API_URL + `/members/${user.memberId}/recommends`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setData("Error");
      });
  }, []);
  const handleClick = (linkUrl) => {
    window.open(linkUrl);
  };

  // ----------- text가 일정 길이 이상이면 ...으로 대체하는 함수 -----------
  const truncateText = (text) => {
    const maxLabelLength = 8; // 최대 길이
    return text.length > maxLabelLength
      ? `${text.substring(0, maxLabelLength)}...`
      : text;
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center text-center"
      onClick={() => closeModal()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          // 스크롤바
          overflowY: "auto", // 세로 스크롤을 가능하게 하기 위해 추가
          scrollbarWidth: "thin", // 스크롤바를 얇게 만듦
          scrollbarColor: "#FFD257 transparent", // 스크롤바 색상 (track, thumb 순서)
        }}
        className="bg-white rounded-[10px]
          xl:p-[40px] lg:p-[35px] md:p-[30px] sm:p-[25px]
          max-h-[800px] xl:w-[800px] xl:h-[620px] lg:w-[640px] lg:h-[550px] md:w-[450px] md:h-[460px] sm:w-[360px] sm:h-[530px] relative"
      >
        <div>
          <h1 className="fontsize-lg">{topCategory.key} 추천 쇼핑몰</h1>
          <p className="fontsize-xs mb-5">
            이미지 클릭 시, 쇼핑몰로 이동합니다
          </p>
        </div>
        {/* <button
          className="absolute right-4 top-4 bg-red-400 rounded-full w-[3.5rem] h-[2.2rem] px-auto py-auto"
          onClick={() => closeModal()}
        >
          닫기
        </button> */}
        {data.length == 0 && (
          <div className="flex flex-col h-1/2 items-center justify-center">
            <CircularProgress size={100} sx={{ color: "#FFD257" }} />
            <p className="my-5">열심히 찾고 있어요...!</p>
          </div>
        )}

        {data.length > 0 && data !== "Error" && (
          <div className="grid grid-cols-3 sm:grid-cols-2 gap-1">
            {data.slice(0, 6).map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(item.linkUrl)}
                className="rounded-3xl w-[12rem] h-[15rem] mx-auto px-3 pt-3 pb-10 cursor-pointer border-2 border-white hover:border-amber-300"
              >
                <img
                  src={item.imageUrl}
                  alt="사이트 이미지"
                  className="rounded-3xl w-full mb-2 min-h-[105px]"
                  onError={(e) => {
                    e.target.src = Favicon; // 대체 이미지 URL로 변경
                  }}
                />
                <p className="fontsize-sm break-keep">
                  {truncateText(item.text)}
                </p>
              </div>
            ))}
          </div>
        )}

        {data === "Error" && (
          <p className="fontsize-md my-10">
            투표 이력이 존재하지 않아 사이트 추천이 어렵습니다. <br />
            투표에 참여해쥬~
          </p>
        )}
      </div>
    </div>
  );
};

const MyStatistics = () => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  //  ----------- 상세 설명 토글하기 위한 상태 -----------
  const [showCategoryDescription, setShowCategoryDescription] = useState(false);
  const [showTagDescription, setShowTagDescription] = useState(false);

  // ----------- 상태 토글 함수 -----------
  const toggleCategoryDescription = () => {
    setShowCategoryDescription(!showCategoryDescription);
  };
  const toggleTagDescription = () => {
    setShowTagDescription(!showTagDescription);
  };

  // ----------- 카테고리 드롭다운 state 관리 -----------
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryData[1].id);

  // ----------- 카테고리가 변경될 때 호출되는 함수 -----------
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setIsOpen(false);
  };

  // ----------- 드롭다운 토글 함수 -----------
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // ----------- 드롭다운 버튼 ref -----------
  const dropdownButtonRef = useRef();
  const dropdownMenuRef = useRef();

  // ----------- 드롭다운 밖 클릭 시 메뉴 닫음 -----------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target) &&
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target)
      ) {
        // 클릭이 메뉴 버튼 및 메뉴 외부에 있으면 메뉴를 닫습니다.
        setIsOpen(false);
      }
    };

    // 페이지에 클릭 이벤트를 추가합니다.
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  // ----------- 서버에서 내가 참여한 투표를 받아오고 객체로 정리하는 작업 ------
  const user = useAuthStore((state) => state.user);
  const [categoryRatio, setCategoryRatio] = useState({});
  const [tagRatio, setTagRatio] = useState({});
  const [topCategory, setTopCategory] = useState("");
  const [othersTopTag, setOthersTopTag] = useState("");

  // 나이대 구하기
  const currentYear = new Date().getFullYear();
  // 0~9세: 0, 10~19세: 1, 20~29세: 2, ...
  const ageId = Math.floor((currentYear - user.birthday.year) / 10);

  // "전체"를 제외한 카테고리 이름 순서대로 담긴 배열
  const categoryNames = categoryData.map((item) => item.name).slice(1);

  // 함수를 통해 카테고리 별로 태그 비율을 계산하는 기능을 추출합니다.
  const calculateCategoryRatio = (data, totalCount) => {
    const categoryRatio = {};
    for (const category of categoryNames) {
      if (data.hasOwnProperty(category)) {
        const categoryObj = data[category];
        const categoryTotal = categoryObj.find(
          (item) => item.tagId === 0
        ).count;
        categoryRatio[category] = (categoryTotal / totalCount) * 100;
      }
    }
    return categoryRatio;
  };

  // 카테고리 별, 태그 별로 비율을 계산
  const calculateTagRatio = (data) => {
    const tagRatio = [];
    for (const category of categoryNames) {
      if (data.hasOwnProperty(category)) {
        const categoryObj = data[category];
        // console.log(category, categoryObj);
        const categoryTotal = categoryObj.find(
          (item) => item.tagId === 0
        ).count;
        const tmpObj = {};
        tmpObj["category"] = category;
        for (const obj of categoryObj) {
          if (obj.tagId !== 0) {
            tmpObj[obj.tag] = (obj.count / categoryTotal) * 100;
          }
        }
        tagRatio.push(tmpObj);
      }
    }
    return tagRatio;
  };

  const getUserStatistics = (topCategory) => {
    const categoryId = categoryData.find(
      (item) => item.name == topCategory.key
    ).id;
    // (현재 유저와 나이대, 성별이 같은 유저)의 (현재 유저가 가장 관심있는 카테고리)에 대한 투표 정보를 가져옴
    const axiosData = {
      memberId: 0,
      typeId: 0,
      age: ageId,
      gender: user.gender,
      categoryId: categoryId,
    };
    axios
      .post(API_URL + "/statistics", axiosData)
      .then((res) => {
        // console.log(res);
        const allValue = res.data.find((item) => item.tagId === 0).count;
        const othersTagRatio = {};
        res.data.forEach((item) => {
          if (item.tagId != 0) {
            othersTagRatio[item.tag] = (item.count / allValue) * 100;
          }
        });

        // console.log(othersTagRatio)
        setOthersTopTag(
          Object.entries(othersTagRatio).reduce(
            (prev, [key, value]) => {
              return value > prev.value ? { key, value } : prev;
            },
            { key: null, value: -Infinity }
          )
        );
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 }); // 페이지 로드되면 최상단으로 가기
    axios
      .get(API_URL + `/members/${user.memberId}/votes/statistics`)
      .then((res) => {
        // console.log(res);
        // 간단을 제외하고, 참여한 모든 투표 수를 더함
        let totalCount = 0;
        for (const category in res.data) {
          if (res.data.hasOwnProperty(category)) {
            const categoryData = res.data[category];
            const categoryTotal = categoryData.find(
              (item) => item.tagId === 0
            ).count;
            totalCount += categoryTotal;
          }
        }

        const tmpCategoryRatio = calculateCategoryRatio(res.data, totalCount);
        const tmpTagRatio = calculateTagRatio(res.data);
        const tmpTopCategory = Object.entries(tmpCategoryRatio).reduce(
          (prev, [key, value]) => {
            return value > prev.value ? { key, value } : prev;
          },
          { key: null, value: -Infinity }
        );
        setCategoryRatio(tmpCategoryRatio);
        setTagRatio(tmpTagRatio);
        setTopCategory(tmpTopCategory);
        // console.log(tmpCategoryRatio);
        // console.log(tmpTagRatio);
        getUserStatistics(tmpTopCategory);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  // --------------------- 쇼핑몰 크롤링 관련 코드 ---------------------
  const [showModal, setShowModal] = useState(false);

  const handleRecommend = () => {
    // 작은 모달 띄우고, 크롤링한 쇼핑몰을 모달에 랜더링
    setShowModal(true);
    axios.get(API_URL + `/members/${user.memberId}/recommends`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom: isXLarge
      ? "50px"
      : isLarge
      ? "45px"
      : isMedium
      ? "40px"
      : "35px",
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
    height: isXLarge ? "45px" : isLarge ? "40px" : isMedium ? "35px" : "30px",
  };

  // ----------- 제목 스타일 -----------
  const titleTextStyle = {
    // 디자인
    marginTop: "5px",
    marginRight: "5px",
  };

  // ----------- 물음표 스타일 -----------
  const questionMarkStyle = {
    // 디자인
    margin: "0 5px",
    width: "16px",
    height: "16px",
  };

  // ----------- 설명 스타일 -----------
  const descriptionStyle = {
    // 디자인
    padding: "2px 5px 0",
    borderRadius: "3px",
    backgroundColor: "#6B6B6B",

    // 글자
    fontSize: "13px",
    color: "#FFFFFF",
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const contentsContainerStyle = {
    // 디자인
    padding: isXLarge ? "40px" : isLarge ? "35px" : isMedium ? "30px" : "25px",
    borderRadius: isXLarge
      ? "50px"
      : isLarge
      ? "40px"
      : isMedium
      ? "30px"
      : "20px",
    background: "#FFFFFF",
  };

  // ----------- 서브 제목 컨테이너 스타일 -----------
  const subTitleContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    marginBottom: isXLarge || isLarge ? "20px" : "10px",
  };

  // ----------- 서브 제목 스타일 -----------
  const subTitleStyle = {
    // 디자인
    marginTop: "3px",
  };

  // ----------- 카테고리 글자 스타일 -----------
  const categoryTextStyle = {
    // 디자인
    marginLeft: "15px",

    // 글자
    color: "#FF595E",
  };

  // ----------- 설명 컨테이너 스타일 -----------
  const descriptionContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    flexDirection: isXLarge || isLarge ? "row" : "column",
  };

  // ----------- 반응형 설명 컨테이너 스타일 -----------
  const responsiveDescriptionContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    flexDirection: !isSmall ? "row" : "column",
  };

  // ----------- 반응형 설명 서브 컨테이너 스타일 -----------
  const responsiveDescriptionSubContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 글자
    color: "#4A4A4A",
  };

  // ----------- 설명 데이터 글자 스타일 -----------
  const descriptionDataStyle = {
    // 디자인
    margin: isXLarge
      ? "0 10px"
      : isLarge
      ? "0 8px"
      : isMedium
      ? "0 6px"
      : "0 4px",

    // 글자
    color: "#FF595E",
  };

  // ----------- 쉼표 스타일 -----------
  const restStyle = {
    // 디자인
    marginRight: "10px",
  };

  // ----------- 구분선 스타일 -----------
  const barStyle = {
    // 디자인
    margin: isXLarge
      ? "30px 0"
      : isLarge
      ? "25px 0"
      : isMedium
      ? "20px 0"
      : "15px 0",
    width: "100%",
    height: "3px",
    backgroundColor: "#F0F0F0",
  };

  // ----------- 무작위 멘트 컨테이너 스타일 -----------
  const randomContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "center", // 둘레 균일 간격으로 정렬
  };

  // ----------- 멘트 컨테이너 스타일 -----------
  const mentContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 컨텐츠 정렬
    flexDirection: "column",
    justifyContent: "center",
  };

  // ----------- 멘트 데이터 스타일 -----------
  const mentDataStyle = {
    // 디자인
    margin: isXLarge
      ? "0 10px"
      : isLarge
      ? "0 8px"
      : isMedium
      ? "0 6px"
      : "0 4px",

    // 글자
    color: "#FF595E",
  };

  // ----------- 따옴표 스타일 -----------
  const quotesStyle = {
    // 디자인
    margin: isXLarge ? "0 12px" : isLarge ? "0 8px" : isMedium ? "0 4px" : "0",
  };

  // ----------- 태그 선호도 컨테이너 스타일 -----------
  const tagContentsContainerStyle = {
    // 상속
    ...contentsContainerStyle,

    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
  };

  // ----------- 드롭다운 컨테이너 스타일 -----------
  const dropdownContainerStyle = {
    // 디자인
    width: "100%",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: isXLarge || isLarge ? "center" : "flex-start",
    flexDirection: isXLarge || isLarge ? "row" : "column",
  };

  // ----------- relative 컨테이너 스타일 -----------
  const relativeContainerStyle = {
    // 위치
    position: "relative",

    // 디자인
    margin: isXLarge
      ? "0 10px"
      : isLarge
      ? "0 8px"
      : isMedium
      ? "0 6px"
      : "0 4px",
  };

  // ----------- 드롭다운 버튼 스타일 -----------
  const dropdownButtonStyle = {
    // 디자인
    padding:
      isXLarge || isLarge
        ? "0px 10px 0px 14px"
        : isMedium
        ? "0px 10px 0px 12px"
        : "0 10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: isXLarge || isLarge ? "110px" : isMedium ? "105px" : "100px",
    height: isXLarge || isLarge ? "50px" : isMedium ? "40px" : "35px",
    cursor: "pointer",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- 드롭다운 스타일 -----------
  const dropdownStyle = {
    // 디자인
    width: "100%",

    // 글자
    fontSize: isXLarge || isLarge ? "16px" : isMedium ? "15px" : "14px",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  // ----------- 화살표 스타일 -----------
  const arrowStyle = {
    // 글자
    fontFamily: "GmarketSansBold",
    fontWeight: "bold",
  };

  // ----------- 드롭다운 메뉴 스타일 -----------
  const dropdownMenuStyle = {
    // 위치
    position: "absolute",
    left: 0,
    zIndex: 1,

    // 디자인
    marginTop: "4px",
    padding: isXLarge || isLarge ? "0 7px" : isMedium ? "0 6px" : "0 5px",
    width: isXLarge || isLarge ? "110px" : isMedium ? "105px" : "100px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#FFFFFF",
  };

  // ----------- 드롭다운 아이템 스타일 -----------
  const dropdownItemStyle = {
    // 디자인
    margin: isXLarge
      ? "8px 0"
      : isLarge
      ? "7px 0"
      : isMedium
      ? "6px 0"
      : "5px 0",
    padding: isXLarge ? "8px" : isLarge ? "7px" : isMedium ? "6px" : "5px",
    cursor: "pointer",

    // 글자
    fontSize: isXLarge || isLarge ? "16px" : isMedium ? "14px" : "12px",
  };

  // ----------- 차트 컨테이너 스타일 -----------
  const chartContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    marginTop: "20px",

    // 컨텐츠 정렬
    justifyContent: "center",
  };

  // ----------- 정보 컨테이너 스타일 -----------
  const infoContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    width: "100%",

    // 컨텐츠 정렬
    flexDirection: isXLarge || isLarge ? "row" : "column",
  };

  // ----------- 정보 아이템 스타일 -----------
  const infoItemStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    margin: isXLarge || isLarge ? "10px 0" : "5px 0",
    padding: isXLarge
      ? "10px 20px"
      : isLarge
      ? "8px 18px"
      : isMedium
      ? "6px 16px"
      : "4px 14px",
    width: isXLarge || isLarge ? "50%" : "100%", // (반응형) 큰 화면에서 아이템이 한 줄에 두 개씩 나타나게 함
    height: isXLarge ? "60px" : isLarge ? "52px" : isMedium ? "44px" : "36px",
    backgroundColor: "#F0F0F0",

    // 컨텐츠 정렬
    justifyContent: "space-between",
  };

  // ----------- 왼쪽 아이템 스타일 -----------
  const itemLeftStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    marginRight: isXLarge ? "16px" : isLarge ? "12px" : "0px",
  };

  // ----------- 오른쪽 아이템 스타일 -----------
  const itemRightStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    marginLeft: isXLarge ? "16px" : isLarge ? "12px" : "0px",
  };

  // ----------- 태그 아이템 스타일 -----------
  const tagItemStyle = {
    // 디자인
    marginLeft: isXLarge || isMedium ? "20px" : "5px",
    paddingTop: "5px",
    width: isXLarge || isMedium ? "80px" : isMedium ? "70px" : "60px",
    borderRadius: "20px",

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "center", // 태그 가운데 정렬
  };

  // --------------------------------- css 끝 ---------------------------------

  // ----------- 배열에서 가장 높은 세 Tag를 찾는 함수 -----------
  const findTop3Tags = (obj) => {
    const sortedTags = Object.entries(obj).sort((a, b) => b[1] - a[1]);
    const top3Tags = sortedTags.slice(1, 4);

    return top3Tags.map(([key, value]) => ({ key, value }));
  };

  // ----------- 각 객체에서 가장 높은 세 값을 찾아 렌더링 하는 함수 -----------
  const renderTop3Categories =
    tagRatio.length > 0 &&
    tagRatio.map((item, index) => {
      if (index % 2 === 0) {
        const top3Left = findTop3Tags(item);
        const top3Right = tagRatio[index + 1]
          ? findTop3Tags(tagRatio[index + 1])
          : null;
        return (
          <>
            <div style={infoContainerStyle} key={index}>
              <div style={itemLeftStyle}>
                <div className="fontsize-md">{item.category}</div>
                <div
                  style={{
                    ...flexContainerStyle,
                    width: isXLarge || isMedium ? "300px" : "195px",
                  }}
                >
                  {top3Left.map((tag, index) => (
                    <div
                      style={{
                        ...tagItemStyle,
                        backgroundColor:
                          tag.key &&
                          tagColorData.find((tagObj) => tagObj.name == tag.key)
                            .color,
                      }}
                      className="fontsize-sm"
                      key={index}
                    >
                      {tag.key}
                    </div>
                  ))}
                </div>
              </div>
              {top3Right && (
                <div style={itemRightStyle}>
                  <div className="fontsize-md">
                    {tagRatio[index + 1].category}
                  </div>
                  <div
                    style={{
                      ...flexContainerStyle,
                      width: isXLarge || isMedium ? "300px" : "195px",
                    }}
                  >
                    {top3Right.map((tag, i) => (
                      <div
                        style={{
                          ...tagItemStyle,
                          backgroundColor:
                            tag.key &&
                            tagColorData.find(
                              (tagObj) => tagObj.name == tag.key
                            ).color,
                        }}
                        className="fontsize-sm"
                        key={i}
                      >
                        {tag.key}
                      </div>
                    ))}
                  </div>
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
      {/* -------------------------- 카테고리 선호도 -------------------------- */}
      <div style={containerStyle}>
        <div style={titleContainerStyle}>
          <span style={titleTextStyle} className="fontsize-lg">
            # 카테고리 선호도
          </span>
          <img
            src={questionMarkImg}
            style={questionMarkStyle}
            alt="물음표"
            className="cursor-pointer rounded-full"
            onClick={toggleCategoryDescription}
            onMouseOver={() => setShowCategoryDescription(true)}
            onMouseOut={() => setShowCategoryDescription(false)}
          />
          <div className="relative h-full">
            <p
              style={{
                ...descriptionStyle,
                visibility: showCategoryDescription ? "visible" : "hidden",
                position: "absolute",
                top: isXLarge
                  ? "12px"
                  : isLarge
                  ? "8px"
                  : isMedium
                  ? "7px"
                  : "6px",
              }}
            >
              투표에 많이 참여한 카테고리
            </p>
          </div>
          <button
            className="bg-amber-300 rounded-full ml-auto px-5 py-2 fontsize-sm hover:bg-amber-400"
            onClick={handleRecommend}
          >
            쇼핑몰 추천받기
          </button>
        </div>
        <div style={tagContentsContainerStyle}>
          {/* ------------- 관심있는 카테고리 ------------- */}
          {topCategory.key ? (
            <>
              <div style={subTitleContainerStyle}>
                <div style={subTitleStyle} className="fontsize-lg">
                  가장 관심있는 카테고리 :
                </div>
                <div style={categoryTextStyle} className="fontsize-xl">
                  " {topCategory.key} "
                </div>
              </div>

              <div style={descriptionContainerStyle}>
                <div style={responsiveDescriptionContainerStyle}>
                  <div style={responsiveDescriptionSubContainerStyle}>
                    <div className="fontsize-sm">참여한 투표의</div>
                    <div style={descriptionDataStyle} className="fontsize-sm">
                      {topCategory && topCategory.value.toFixed(0)}%
                    </div>
                    <div className="fontsize-sm">가</div>
                  </div>
                </div>
                <div style={responsiveDescriptionSubContainerStyle}>
                  <div style={descriptionDataStyle} className="fontsize-sm">
                    {topCategory.key}
                  </div>
                  <div className="fontsize-sm">카테고리에 속해있어요!</div>
                </div>
              </div>
            </>
          ) : (
            <p className="fontsize-md font-[#4A4A4A]">
              투표 참여 기록이 없어요
            </p>
          )}

          {topCategory.key && <div style={barStyle}></div>}

          {/* ------------- 랜덤 선호도 비교 ------------- */}
          {topCategory.key && (
            <div style={randomContainerStyle}>
              <div style={quotesStyle} className="fontsize-xl">
                “
              </div>
              <div style={mentContainerStyle}>
                <div style={flexContainerStyle}>
                  <div style={mentDataStyle} className="fontsize-md">
                    {user.nickname}
                  </div>
                  <div className="fontsize-md">님과 같은</div>
                  <div style={mentDataStyle} className="fontsize-md">
                    {ageId * 10}대
                  </div>
                  <div style={mentDataStyle} className="fontsize-md">
                    {user.gender == "MALE" ? "남성" : "여성"}
                  </div>
                  <div className="fontsize-md">의</div>
                  <div style={mentDataStyle} className="fontsize-md">
                    {othersTopTag && othersTopTag.value.toFixed(0)}%
                  </div>
                  <div className="fontsize-md">는</div>
                </div>
                <div style={flexContainerStyle}>
                  <div style={mentDataStyle} className="fontsize-md">
                    " {topCategory.key} "
                  </div>
                  <div className="fontsize-md">
                    {["의류", "가구"].includes(topCategory.key) ? "를" : "을"}{" "}
                    고를 때
                  </div>
                  <div
                    style={{
                      ...mentDataStyle,
                      color: "black",
                      backgroundColor:
                        othersTopTag &&
                        tagColorData.find(
                          (item) => item.name == othersTopTag.key
                        ).color,
                    }}
                    className="fontsize-md"
                  >
                    {othersTopTag.key}
                  </div>
                  <div className="fontsize-md">
                    {["가성비", "브랜드", "소재"].includes(othersTopTag.key)
                      ? "를"
                      : "을"}{" "}
                    눈여겨봐요!
                  </div>
                </div>
              </div>
              <div style={quotesStyle} className="fontsize-xl">
                ”
              </div>
            </div>
          )}
        </div>
      </div>

      {/* -------------------------- 태그 선호도 -------------------------- */}
      <div style={containerStyle}>
        <div style={titleContainerStyle}>
          <span style={titleTextStyle} className="fontsize-lg">
            # 태그 선호도
          </span>
          <img
            src={questionMarkImg}
            style={questionMarkStyle}
            alt="물음표"
            className="cursor-pointer rounded-full"
            onClick={toggleTagDescription}
            onMouseOver={() => setShowTagDescription(true)}
            onMouseOut={() => setShowTagDescription(false)}
          />
          <p
            style={{
              ...descriptionStyle,
              visibility: showTagDescription ? "visible" : "hidden",
            }}
          >
            내가 선택한 태그 통계
          </p>
        </div>
        <div style={tagContentsContainerStyle}>
          {/* ------------- 드롭다운 버튼 ------------- */}
          <div style={dropdownContainerStyle}>
            <div style={flexContainerStyle}>
              <div style={subTitleStyle} className="fontsize-md">
                나는
              </div>
              <div style={relativeContainerStyle}>
                <div
                  onClick={toggleDropdown}
                  style={dropdownButtonStyle}
                  ref={dropdownButtonRef}
                >
                  <div style={dropdownStyle}>
                    {selectedCategory !== null
                      ? filteredCategoryData.find(
                          (c) => c.id === parseInt(selectedCategory)
                        )?.name
                      : "카테고리 선택"}
                    {isOpen ? (
                      <span style={arrowStyle}>∧</span>
                    ) : (
                      <span style={arrowStyle}>∨</span>
                    )}
                  </div>
                </div>
                {isOpen && (
                  <div style={dropdownMenuStyle} ref={dropdownMenuRef}>
                    {filteredCategoryData.map((category) => (
                      <div
                        key={category.id}
                        onClick={() =>
                          handleCategoryChange({
                            target: { value: category.id },
                          })
                        }
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#FFE69C")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "#FFFFFF")
                        }
                        style={dropdownItemStyle}
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={subTitleStyle} className="fontsize-md">
                {selectedCategory === 1 || selectedCategory === 2 ? "를" : "을"}{" "}
                구매 할 때
              </div>
              <div style={restStyle} className="fontsize-md">
                ,
              </div>
            </div>
            <div style={subTitleStyle} className="fontsize-md">
              어떤 요소를 중요하게 생각할까?
            </div>
          </div>

          {/* ------------- 차트 그래프 ------------- */}
          <div style={chartContainerStyle}>
            {tagRatio && (
              <MyStatisticsChart
                tagRatio={tagRatio.length > 1 ? tagRatio : null}
                selectedCategory={selectedCategory}
              />
            )}
          </div>

          <div style={barStyle}></div>

          {/* ------------- 카테고리별 선호 태그 ------------- */}
          <div style={subTitleStyle} className="fontsize-lg">
            카테고리별 선호 태그 TOP 3
          </div>
          {tagRatio.length > 0 && renderTop3Categories}
        </div>
      </div>
      {showModal && (
        <RecommendModal topCategory={topCategory} closeModal={closeModal} />
      )}
    </>
  );
};

export default MyStatistics;
```




```src\components\MyPage\MyStatisticsChart.jsx
// 리액트
import React from "react";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// Recharts 라이브러리
import { PieChart, Pie, Cell } from "recharts";

// 카테고리 및 소비성향 데이터 불러오기
import categoryData from "/src/stores/categoryData";
import tagColorData from "/src/stores/tagColorData";


const MyStatisticsChart = ({ tagRatio, selectedCategory }) => {

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // ----------- 데이터 -----------
  const categoryName = categoryData.find(
    (item) => item.id == selectedCategory
  ).name;

  // tagRatio에서 선택된 카테고리의 데이터 추출
  const targetData =
    tagRatio && tagRatio.find((item) => item.category == categoryName);

  // 드랍다운 버튼으로 선택한 카테고리의 데이터를 파이차트에 쓸 수 있는 형태의 데이터로 가공
  // ex) [{name: "가성비", value: 10, color: 태그별 색 코드},
  //      {name: "소재", value: 50, color: 태그별 색 코드}]

  const data =
    targetData &&
    Object.entries(targetData)
      .filter(([key]) => key !== "category")
      .map(([name, value]) => ({
        name,
        value,
        color: tagColorData.find((item) => item.name === name).color,
      }));

  // console.log(categoryName, data);

  // ----------- 라디안과 각도 간의 변환 상수 -----------
  const RADIAN = Math.PI / 180;

  // ----------- 라벨 생성 함수 -----------
  const generateLabel = ({ cx, cy, midAngle, outerRadius, name, percent }) => {
    const radius = outerRadius * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // ----------- 글자 스타일 -----------
    const textStyle = {
      // 위치
      textAnchor: "middle", // 수평 가운데 정렬
      dominantBaseline: "middle", // 수직 가운데 정렬

      // 글자
      fill: "#6C6C6C",
    };

    return (
      <>
        <text
          x={x}
          y={isXLarge ? y - 16 : isLarge ? y - 14 : isMedium ? y - 12 : y - 10}
          dominantBaseline="central"
          style={textStyle}
          className="fontsize-md"
        >
          {name}
        </text>
        <text
          x={x}
          y={isXLarge ? y + 16 : isLarge ? y + 14 : isMedium ? y + 12 : y + 10}
          dominantBaseline="central"
          style={textStyle}
          className="fontsize-sm"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </>
    );
  };

  return (
    <>
      {data && data.length > 0 ? (
        <PieChart
          width={isXLarge ? 500 : isLarge ? 437.5 : isMedium ? 375 : 312.5}
          height={isXLarge ? 500 : isLarge ? 437.5 : isMedium ? 375 : 312.5}
        >
          <Pie
            cx="50%"
            cy="50%"
            labelLine={false}
            label={generateLabel}
            outerRadius={isXLarge ? 240 : isLarge ? 210 : isMedium ? 180 : 150}
            nameKey="name"
            dataKey="value"
            data={data}
          >
            {data.map((tag, index) => (
              <Cell key={`cell-${index}`} fill={tag.color} strokeWidth={2} />
            ))}
          </Pie>
        </PieChart>
      ) : (
        <div className="w-full h-[500px] py-10">
          <p className="fontsize-sm text-center">
            해당 카테고리의 투표에 참여한 기록이 없어요
          </p>
        </div>
      )}
    </>
  );
};

export default MyStatisticsChart;
```




### openvidu
```src\components\openvidu\AddVoteItemModal.jsx
import React, { useState, useRef, useEffect } from "react";

const settingButton = "text-white font-bold py-2 px-4 rounded";

const AddVoteItemModal = ({ isOpen, onClose }) => {
  const [imgFile, setImgFile] = useState("");
  const [previewImgFile, setPreviewImgFile] = useState("");
  const [text, setText] = useState("");
  const imgRef = useRef();

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    // console.log(file);
    setImgFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImgFile(reader.result);
    };
  };

  if (!isOpen) return null;

  const handleCancel = () => {
    setImgFile("");
    setText("");
    onClose("");
  };

  const handleSubmit = () => {
    if (imgFile) {
      onClose("img", [imgFile, previewImgFile]);
    } else if (text) {
      onClose("text", [text]);
    }
    setImgFile("");
    setText("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center text-center">
      <div className="bg-white p-6 rounded-md w-[450px] h-[350px] relative">
        <h2 className="text-2xl mb-4 font-bold">투표 선택지 추가하기</h2>
        <div className="flex flex-col items-center space-y-3">
          {imgFile && (
            <img
              src={previewImgFile}
              className="w-48 h-40 mx-auto"
              alt="이미지 미리보기"
            />
          )}

          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={saveImgFile}
            ref={imgRef}
            className="w-3/5"
          />
          {!imgFile && (
            <>
              <p>또는</p>
              <input
                type="text"
                className="w-3/5"
                placeholder="텍스트 추가해쥬(15자 이내)"
                value={text}
                onChange={(e) => {
                  if (e.target.value.length > 15) {
                    window.alert("글자수가 15자를 넘었습니다");
                    setText(e.target.value.slice(0, 15));
                  } else {
                    setText(e.target.value);
                  }
                }}
              />
            </>
          )}
        </div>
        <div
          id="button"
          className="flex justify-center space-x-4 absolute inset-x-0 bottom-0 mb-2"
        >
          <button
            className={`bg-sky-500 hover:bg-sky-700 ${settingButton}`}
            onClick={handleSubmit}
          >
            확인
          </button>
          <button
            className={`bg-red-500 hover:bg-red-700 ${settingButton}`}
            onClick={handleCancel}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVoteItemModal;
```



```src\components\openvidu\CreateVideoRoom.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AddVoteItemModal from "./AddVoteItemModal";
import useAuthStore from "/src/stores/userState";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import API_URL from "/src/stores/apiURL";

/*
<uuid란?>
uuid는 범용고유식별자(Universal Unique IDentifier)라고 한다.
네트워크상에 존재하는 개체들을 식별하고 구별하기 위해 개발 주체가 스스로 이름을 짓도록 하며 고유성을 충족시킬 수 있는 방법이다.

uuid v4는 충분히 안전하게 유일한 uuid를 발급해주며 uuid가 중복될 수 있는 통계적 가능성 역시 극히 희박하기에 uuid가 중복되면 어쩌지 하는 걱정은 안해도 된다. 
*/

const logoStyle = {
  // 글자
  fontFamily: "HSSantokkiRegular", // 로고 폰트로 변경
  fontSize: "70px", // 글자 크기
  color: "#FFD257", // 글자 색: 노란색
};

const settingButton = "text-white py-2 px-4 rounded-xl";

const CreateVideoRoom = () => {
  // 화면 구성 => VideoRoomComponent와 유사하게, 채팅창 부분은 빈 상태로
  // 방송 시작하기 버튼 => 제목, 투표항목, 호스트 닉네임, 세션 아이디 넘겨주기(VideoComponent와 서버에) => VideoComponent에서 isHost=true이면 enterRoom 건너뛰게..?
  const settingButton = "text-white py-2 px-4 rounded-xl";
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();
  const videoRef = useRef(null);
  const memberId = user.memberId;
  const nickName = user.nickname;
  const [title, setTitle] = useState("");
  const [voteItem, setVoteItem] = useState([]);
  const [previewVoteItem, setPreviewVoteItem] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const thumbnailRef = useRef();
  const [isEnoughSize, setIsEnoughSize] = useState(true);
  const createVote = useAuthStore((state) => state.createVote);

  // 서버로 지금골라쥬 방의 정보를 보내는 함수
  const sendRoomInfo = async (
    sessionId,
    memberId,
    title,
    voteItem,
    thumbnail
  ) => {
    try {
      // FormData 형식으로 변환
      const formData = new FormData();
      formData.append("sessionId", sessionId);
      formData.append("memberId", memberId);
      formData.append("liveTitle", title);
      formData.append("liveImgUrl", thumbnail);

      const voteItemForAxios = [];
      voteItem.forEach((item) => {
        if (item instanceof File) {
          voteItemForAxios.push({ imgUrl: item, description: null, count: 0 });
        } else if (typeof item === "string") {
          voteItemForAxios.push({ imgUrl: null, description: item, count: 0 });
        }
      });

      voteItemForAxios.forEach((item, index) => {
        if (item.imgUrl) {
          formData.append(`liveVoteItemDtoList[${index}].imgUrl`, item.imgUrl);
        }
        if (item.description) {
          formData.append(
            `liveVoteItemDtoList[${index}].description`,
            item.description
          );
        }
        formData.append(`liveVoteItemDtoList[${index}].count`, item.count);
      });

      // formdata 확인용 코드
      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      const response = await axios.post(API_URL + "/lives", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.header.result) {
        // res.data.body에서 liveId를 얻은 후 videoComponent로 진입
        return response.data.body.liveId;
      } else {
        window.alert(response.data.header.message);
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const startBroadcast = async () => {
    if ((title.length < 1) | (voteItem.length < 2) | thumbnail) {
      window.alert("제목, 투표 항목(2개 이상), 썸네일을 모두 등록하세요!");
    } else {
      // sessionId 생성 (랜덤한 값)
      const sessionId = "Session" + uuidv4();
      // console.log("sessionId :", sessionId);
      // sendRoomInfo : 서버로 라이브 방 생성을 요청 -> 응답으로 liveId를 받음
      const liveId = await sendRoomInfo(
        sessionId,
        memberId,
        title,
        voteItem,
        thumbnail
      );
      // console.log(liveId);
      if (liveId !== false) {
        // console.log("방송 생성 성공");
        createVote();
        navigate("/EnterVideoRoom", {
          state: {
            sessionId: sessionId,
            liveId: liveId,
            isHost: true,
          },
        });
      }
    }
  };

  useEffect(() => {
    const initWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // Assign the stream to the video element
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    initWebcam();

    return () => {
      // Clean up the stream when the component is unmounted
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
    };
  }, [isEnoughSize]);

  const addVoteItem = (item) => {
    setVoteItem((prevVoteItem) => {
      const newVoteItem = [...prevVoteItem, item];
      // console.log(newVoteItem);
      return newVoteItem;
    });
  };

  // 미리보기용 voteItem 배열 -> 서버 전송용은 미리보기 이미지를 보내면 안되기 때문에 분리함
  const addPreviewVoteItem = (item) => {
    setPreviewVoteItem((prevVoteItem) => {
      const newVoteItem = [...prevVoteItem, item];
      // console.log(newVoteItem);
      return newVoteItem;
    });
  };

  const addVoteItemTag = () => {
    const newArr = [];
    for (let i = 0; i < 4 - voteItem.length; i++) {
      newArr.push(
        <div
          className="border flex justify-center items-center text-center hover:text-amber-500 w-1/2 h-1/2"
          key={i}
          onClick={openModal}
        >
          투표 항목 추가
        </div>
      );
    }
    return newArr;
  };

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = thumbnailRef.current.files[0];
    // console.log(file);
    setThumbnail(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewThumbnail(reader.result);
    };
  };

  // 모달 열기
  const openModal = () => {
    setModalOpen(true);
  };

  // 모달을 닫는데, item이 담겨서 닫히면 => voteItem 배열에 추가, item이 안 담겨서 닫히면 그냥 모달만 닫음
  const closeModal = (type, item) => {
    setModalOpen(false);
    if (type == "img") {
      // console.log(item);
      addVoteItem(item[0]);
      addPreviewVoteItem(item[1]);
    } else if (type == "text") {
      addVoteItem(item[0]);
      addPreviewVoteItem(item[0]);
    }
  };

  const handleExit = () => {
    navigate("/BroadcastPage");
    window.location.reload();
  };

  // ----------------- 화면 사이즈가 충분한지 체크 --------------
  // 화면 너비가 768px보다 작으면 -> 안내문 띄우기
  function handleResize() {
    // Get the width of the browser window
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      setIsEnoughSize(false);
    } else {
      setIsEnoughSize(true);
    }
  }

  // Add event listener for the resize event
  window.addEventListener("resize", handleResize);

  return (
    <>
      <div id="logo" className="m-5 text-center">
        <p style={logoStyle}>골라쥬</p>
      </div>
      {isEnoughSize ? (
        <div className="container mx-auto space-y-3">
          <div id="header" className="flex justify-between m-1">
            <p className="fontsize-md font-bold my-auto text-gray-900">
              지금 골라쥬 생성
            </p>
            <div id="button" className="space-x-2">
              <button
                className={`bg-sky-500 hover:bg-sky-700 ${settingButton}`}
                onClick={startBroadcast}
              >
                방송 시작하기
              </button>
              <button
                className={`bg-red-500 hover:bg-red-700 ${settingButton}`}
                onClick={handleExit}
              >
                나가기
              </button>
            </div>
          </div>
          <div id="body" className="flex flex-row justify-between gap-7 pb-20">
            <div id="video+detail" className="basis-2/3 flex flex-col gap-y-5">
              <div className="basis-3/5">
                <video
                  ref={videoRef}
                  className="w-full h-full rounded-md"
                  style={{ transform: "scaleX(-1)" }}
                  autoPlay
                  playsInline
                  muted // Mute the local audio to prevent feedback
                />
              </div>
              <div
                id="detail"
                className="basis-2/5 rounded-md p-3 space-y-3 bg-gray-100"
              >
                <div
                  id="host-info"
                  className="flex text-center items-center space-x-2"
                >
                  <img
                    className="w-8 h-8 rounded-full border border-black"
                    src={
                      // user.profileImgUrl이 숫자면 -> 소비성향테스트 결과 번호 -> 해당 번호의 png 파일을 src로 지정
                      !isNaN(user.profileImgUrl)
                        ? `/assets/images/sobiTest/${user.profileImgUrl}.png`
                        : user.profileImgUrl
                    }
                    alt=""
                  />
                  <p className="fontsize-sm">{nickName}</p>
                </div>
                <form>
                  <input
                    type="text"
                    name="title"
                    placeholder="방송 제목을 입력하세요(50자 이내)"
                    value={title}
                    onChange={(e) => {
                      if (e.target.value.length > 50) {
                        window.alert("글자수가 50자를 넘었습니다");
                        setTitle(e.target.value.slice(0, 50));
                      } else {
                        setTitle(e.target.value);
                      }
                    }}
                    className="w-full focus:outline-none rounded-md"
                  />
                </form>
              </div>
            </div>
            <div
              id="vote+thumbnail"
              className="basis-1/3 flex flex-col gap-y-5"
            >
              <div
                id="vote"
                className="mb-3 basis-1/3 bg-white border-2 rounded-md"
              >
                <div className="w-full h-full justify-center items-center inline-flex flex-wrap">
                  {previewVoteItem &&
                    previewVoteItem.map((item, index) => {
                      if (item.slice(0, 10) === "data:image") {
                        return (
                          <div
                            className="flex border justify-center items-center w-1/2 h-1/2"
                            key={index}
                          >
                            <img
                              src={item}
                              className="size-2/3"
                              alt="이미지 미리보기"
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div
                            className="border flex fontsize-sm font-bold justify-center items-center text-center bg-gray-50 w-1/2 h-1/2"
                            key={index}
                          >
                            {item}
                          </div>
                        );
                      }
                    })}
                  {addVoteItemTag()}
                </div>
                <AddVoteItemModal isOpen={isModalOpen} onClose={closeModal} />
              </div>
              <div
                id="thumbnail"
                className="basis-2/3 rounded-md text-center flex flex-col justify-around items-center p-10 bg-gray-100"
              >
                <p className="fontsize-sm font-bold">방송 썸네일 추가</p>
                {previewThumbnail && (
                  <img
                    src={previewThumbnail}
                    className="w-48 h-40 mx-auto"
                    alt="이미지 미리보기"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  id="thumbnail"
                  onChange={saveImgFile}
                  ref={thumbnailRef}
                  className="w-3/5"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container my-96 mx-auto text-center space-y-5">
          <p className="fontsize-lg">
            740px보다 작은 화면에서는 <br />
            이용하실 수 없습니다.
          </p>
          <p className="fontsize-lg">
            화면을 키우거나, <br />
            메인으로 돌아가주세요.
          </p>
          <button
            className={`bg-gray-400 hover:bg-gray-500 fontsize-sm ${settingButton}`}
            onClick={() => {
              navigate("/");
            }}
          >
            메인으로 돌아가기
          </button>
        </div>
      )}
    </>
  );
};

export default CreateVideoRoom;
```





```src\components\openvidu\index.js
import React from "react";
import ReactDOM from "react-dom";
import VideoComponent from "./VideoComponent";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<VideoComponent />, document.getElementById("root"));
registerServiceWorker();
```





```src\components\openvidu\OvVideo.jsx
import React, { useRef, useEffect } from "react";

const video = {
  position: "relative",
  zIndex: 999,
  width: "100%",
  height: "auto",
  float: "left",
  cursor: "pointer",
  borderRadius: "10px",
};

export default function OpenViduVideoComponent({ streamManager }) {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <video style={video} autoPlay={true} ref={videoRef} />;
}
```





```src\components\openvidu\registerServiceWorker.js
// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export default function register() {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          // console.log(
          //   'This web app is being served cache-first by a service ' +
          //     'worker. To learn more, visit https://goo.gl/SC7cgQ'
          // );
        });
      } else {
        // Is not local host. Just register service worker
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and
              // the fresh content will have been added to the cache.
              // It's the perfect time to display a "New content is
              // available; please refresh." message in your web app.
              // console.log('New content is available; please refresh.');
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              // console.log('Content is cached for offline use.');
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Error during service worker registration:", error);
    });
}

function checkValidServiceWorker(swUrl) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404 ||
        response.headers.get("content-type").indexOf("javascript") === -1
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      // console.log(
      //   "No internet connection found. App is running in offline mode."
      // );
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
```





```src\components\openvidu\UserVideoComponent.jsx
import React from "react";
import OpenViduVideoComponent from "./OvVideo.jsx";

const streamComponent = {
  position: "relative",
  background: "#f8f8f8",
  paddingLeft: "5px",
  paddingRight: "5px",
  color: "#777777",
  fontWeight: "bold",
  borderBottomRightRadius: "4px",
};

const nameTag = {
  position: "absolute",
  zIndex: 9999,
  margin: "0",
  background: "white",
  borderRadius: "0.2rem",
};

export default function UserVideoComponent({ streamManager }) {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent" style={streamComponent}>
          <OpenViduVideoComponent streamManager={streamManager} />
          {/* 네임태그는 나중에 지울 것 */}
          {/* <p style={nameTag}>{getNicknameTag()}</p> */}
        </div>
      ) : null}
    </div>
  );
}
```





```src\components\openvidu\VideoComponent.jsx
import { OpenVidu } from "openvidu-browser";

import axios from "axios";
import API_URL from "/src/stores/apiURL";
import React, { useCallback, useEffect, useRef, useState } from "react";
import UserVideoComponent from "./UserVideoComponent.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import ChattingForm from "./Chat/ChattingForm.jsx";
import ChattingList from "./Chat/ChattingList.jsx";
import useAuthStore from "/src/stores/userState";
import Vote from "./Vote.jsx";
import { Button, Input, CircularProgress } from "@mui/material";

const OPENVIDU_SERVER_URL = import.meta.env.VITE_OPENVIDU_API_URL;
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

const settingButton = "text-white py-2 px-4 rounded-xl";

const logoStyle = {
  // 글자
  fontFamily: "HSSantokkiRegular", // 로고 폰트로 변경
  fontSize: "70px", // 글자 크기
  color: "#FFD257", // 글자 색: 노란색
};

export default function VideoComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const [isEnoughSize, setIsEnoughSize] = useState(true);
  const liveId = location.state.liveId; // createVideoRoom이나 broadcastpage에서 넘어올때 state에 담아서 줌
  const [title, setTitle] = useState("");
  const [hostNickName, setHostNickName] = useState("");
  const [mySessionId, setMySessionId] = useState(location.state.sessionId);
  const isHost = location.state.isHost; // isHost로 분기해서 isHost=true면 화면을 publish하고 아니면 publish는 없이 subscribe만 함
  const myUserName = user.nickname;
  const [session, setSession] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [messageList, setMessageList] = useState([]); // 메세지 정보를 담을 배열
  const [audioState, setAudioSate] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0); // 총 유저수
  // console.log("isHost?:", isHost);

  useEffect(() => {
    // 컴포넌트가 마운트 될 때, liveId로 방송 정보 GET 요청을 보냄
    axios
      .get(API_URL + `/lives/${liveId}`)
      .then((res) => {
        setTitle(res.data.body.title);
        setHostNickName(res.data.body.nickName);
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  const OV = useRef(new OpenVidu());

  // session에 진입하기!
  const joinSession = useCallback(() => {
    const mySession = OV.current.initSession(); // OV 가 useRef로 생성된 객체이므로 .current로 내부에 접근해야함

    // stream이 새로 생성되면(본인 외의 방송 참여자) subscribe하고 subscribers에 추가 => 현재는 방송자만 stream을 생성하므로 방송자 입장에서는 subscribers가 없고, 시청자 입장에서는 방송자의 stream만 subscribers에 담겨있음
    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((subscribers) => [...subscribers, subscriber]);
    });

    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    mySession.on("connectionCreated", ({ stream }) => {
      // 유저가 접속할 때마다 인원수를 += 1
      setTotalUsers((prevTotalUsers) => {
        return prevTotalUsers + 1;
      });
    });

    mySession.on("connectionDestroyed", ({ stream }) => {
      // 유저가 접속을 끊을 때마다 -= 1
      setTotalUsers((prevTotalUsers) => {
        return prevTotalUsers - 1;
      });
    });

    // 채팅 신호 수신하여 메세지 리스트 업데이트
    mySession.on("signal:chat", (event) => {
      setMessageList((prevMessageList) => {
        return [...prevMessageList, event.data];
      });
    });

    setSession(mySession);
  }, []);

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken().then(async (token) => {
        try {
          await session.connect(token, { clientData: myUserName });

          // 방송자(isHost=true)일 때만 stream을 publish, 시청자는 session에 connect만 함
          if (isHost) {
            let publisher = await OV.current.initPublisherAsync(undefined, {
              audioSource: undefined,
              videoSource: undefined,
              publishAudio: audioState,
              publishVideo: true,
              resolution: "640x480",
              frameRate: 30,
              insertMode: "APPEND",
              mirror: true,
            });

            session.publish(publisher);

            const devices = await OV.current.getDevices();
            const videoDevices = devices.filter(
              (device) => device.kind === "videoinput"
            );
            const currentVideoDeviceId = publisher.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .getSettings().deviceId;
            // const currentVideoDevice = videoDevices.find(
            //   (device) => device.deviceId === currentVideoDeviceId
            // );

            // console.log("publisher:", publisher);
            setPublisher(publisher);
            // setCurrentVideoDevice(currentVideoDevice);
          }
        } catch (error) {
          // console.log(
          //   "There was an error connecting to the session:",
          //   error.code,
          //   error.message
          // );
        }
      });
    }
  }, [session]);

  // subscribers 변경이 잘 되는지 확인하기 위한 코드 => 배포 시, 삭제
  useEffect(() => {
    // console.log("구독자 변경: ", subscribers);
  }, [subscribers]);

  const leaveSession = useCallback(() => {
    // Leave the session
    if (session) {
      session.disconnect();
    }

    // Reset all states and OpenVidu object
    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setPublisher(undefined);

    // Host이면 지금골라쥬 방 삭제 요청
    if (isHost) {
      axios.delete(API_URL + `/lives/${liveId}`).then;
      //( console.log("라이브 방송 삭제"));
    } else {
      // Host가 아니면 퇴장 요청
      // api/lives/{liveId}/exit/{memberId} 에 POST 요청을 보내면서 방에서 퇴장
      axios
        .post(API_URL + `/lives/${liveId}/exit/${user.memberId}`)
        .then((res) => {
          // console.log("라이브 방송 퇴장 성공");
        })
        .catch((err) => {
          // console.log(err);
          // console.log("라이브 방송 퇴장 실패");
        });
    }

    navigate("/BroadcastPage");
    window.location.reload();
  }, [session]);

  // 메세지 보내기(Sender of the message (after 'session.connect'))
  const sendMsg = (msg, currentSession) => {
    // this.state.session으로는 자식이 인식할 수 없으므로 currentSession을 자식에게 props로 넘겨주고 다시 받음
    currentSession
      .signal({
        data: msg, // .signal의 data는 문자열만 넘겨야한다
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "chat", // The type of message (optional)
      })
      .then(() => {
        // console.log("Message successfully sent");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteSubscriber = useCallback((streamManager) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      } else {
        return prevSubscribers;
      }
    });
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  const getToken = useCallback(async () => {
    if (isHost) {
      return createSession(mySessionId).then((sessionId) =>
        createToken(sessionId)
      );
    } else {
      return createToken(mySessionId);
    }
  }, [mySessionId]);

  const createSession = async (sessionId) => {
    const response = await axios.post(
      OPENVIDU_SERVER_URL + "openvidu/api/sessions",
      { customSessionId: sessionId },
      {
        headers: {
          Authorization:
            "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    );
    return response.data.sessionId; // The sessionId
  };

  const createToken = async (sessionId) => {
    let myRole = isHost ? "PUBLISHER" : "SUBSCRIBER";
    const response = await axios.post(
      OPENVIDU_SERVER_URL +
        "openvidu/api/sessions/" +
        sessionId +
        "/connection",
      { role: myRole },
      {
        headers: {
          Authorization:
            "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    );
    return response.data.token; // The token
  };

  // 로딩 페이지를 통한 방 입장
  const enterOnAirRoom = () => {
    joinSession();
    // api/lives/{liveId}/enter/{memberId} 에 POST 요청을 보내면서 방에 입장
    axios
      .post(API_URL + `/lives/${liveId}/enter/${user.memberId}`)
      .then((res) => {
        // console.log("라이브 방송 입장 성공");
      })
      .catch((err) => {
        // console.log(err);
        // console.log("라이브 방송 입장 실패");
      });
  };

  // ----------------- 화면 사이즈가 충분한지 체크 --------------
  // 화면 너비가 768px보다 작으면 -> 안내문 띄우기
  function handleResize() {
    // Get the width of the browser window
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      setIsEnoughSize(false);
    } else {
      setIsEnoughSize(true);
    }
  }

  // Add event listener for the resize event
  window.addEventListener("resize", handleResize);

  return (
    <>
      {isEnoughSize ? (
        <>
          <div id="logo" className="m-5 text-center">
            <p style={logoStyle}>골라쥬</p>
          </div>
          {/* 방송 화면으로 진입하기 전, 한번 막음 => joinSession이 동작하는 단계가 필요하기 때문*/}
          {session === undefined ? (
            <div
              id="join"
              className="container my-24 mx-auto flex flex-col justify-center items-center space-y-10"
            >
              <h1 className="fontsize-md text-center">
                글씨를 클릭하면, 방송으로 입장합니다.
              </h1>
              <div
                id="spinner"
                className="box-content w-[400px] h-[400px] flex items-center justify-center"
              >
                <CircularProgress
                  variant="determinate"
                  sx={{
                    color: (theme) =>
                      theme.palette.grey[
                        theme.palette.mode === "light" ? 200 : 800
                      ],
                    position: "absolute",
                  }}
                  size={400}
                  thickness={3}
                  value={100}
                />
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  sx={{
                    color: "#FFD257",
                    animationDuration: "3000ms",
                    position: "absolute",
                  }}
                  size={400}
                  thickness={3}
                />
                <button
                  className="text-5xl font-bold text-gray-700 z-10 hover:text-amber-300"
                  onClick={enterOnAirRoom}
                >
                  지금골라쥬
                </button>
              </div>
              <button
                className={`bg-gray-400 hover:bg-gray-500 fontsize-sm ${settingButton}`}
                onClick={() => {
                  leaveSession();
                  navigate("/");
                }}
              >
                메인으로 돌아가기
              </button>
            </div>
          ) : null}

          <div className="container mx-auto space-y-3">
            {/* 방송 화면으로 진입 후 */}
            {session !== undefined ? (
              // 방송자의 영상 송출 부분
              <div id="session">
                {isHost ? (
                  <div
                    id="session-header"
                    className="flex justify-between mb-3"
                  >
                    <div className="space-x-2">
                      <p className="fontsize-md">지금골라쥬 방송중</p>
                    </div>
                    <button
                      className={`bg-red-500 hover:bg-red-700 ${settingButton}`}
                      id="buttonLeaveSession"
                      onClick={leaveSession}
                      value="Leave session"
                    >
                      방송 종료
                    </button>
                  </div>
                ) : (
                  <div
                    id="session-header"
                    className="flex justify-between mb-2"
                  >
                    <p className="fontsize-md">지금골라쥬 시청중</p>
                    <button
                      className={`bg-red-500 hover:bg-red-700 ${settingButton}`}
                      id="buttonLeaveSession"
                      onClick={leaveSession}
                      value="Leave session"
                    >
                      나가기
                    </button>
                  </div>
                )}
                <div
                  id="sub-container"
                  className="flex flex-row justify-between gap-7 h-[625px] my-16"
                >
                  <div
                    id="video+detail"
                    className="basis-2/3 flex flex-col gap-y-5"
                  >
                    {isHost && (
                      <div
                        id="main-video"
                        className="basis-4/5 w-full h-full rounded-md flex flex-col justify-center"
                      >
                        <UserVideoComponent streamManager={publisher} />
                      </div>
                    )}
                    {!isHost &&
                      (subscribers[0] ? (
                        <div
                          id="main-video"
                          className="basis-4/5 w-full h-full rounded-md flex flex-col justify-center"
                          style={{ transform: "scaleX(-1)" }}
                        >
                          <UserVideoComponent streamManager={subscribers[0]} />
                        </div>
                      ) : (
                        <div
                          id="main-video"
                          className="basis-4/5 w-full h-full rounded-md flex flex-col justify-center"
                        >
                          <p className="text-center fontsize-lg">
                            방송이 종료되었습니다
                          </p>
                        </div>
                      ))}
                    <div
                      id="detail"
                      className="basis-1/5 rounded-md p-3 space-y-3 bg-gray-100"
                    >
                      {/* 방송 정보는 지금 골라쥬 목록에서 받아오기 <- location으로 이전 페이지의 정보 state 가져오기 */}
                      <div className="flex flex-row justify-between">
                        <div
                          id="host-info"
                          className="flex text-center items-center space-x-2"
                        >
                          <p className="text-lg">{hostNickName}님의 방송</p>
                        </div>
                        <div>시청자 수 : {totalUsers}</div>
                      </div>
                      <p className="text-xl font-bold px-5">{title}</p>
                    </div>
                  </div>
                  <div
                    id="vote+chatting"
                    className="basis-1/3 flex flex-col gap-y-5"
                  >
                    <div
                      id="vote"
                      className="mb-3 basis-1/4 border-2 rounded-md bg-gray-100"
                    >
                      <Vote liveId={liveId} />
                    </div>
                    <div
                      id="chatting"
                      className="grow rounded-md bg-gray-100 p-1 lg:max-h-[30rem] max-h-[25rem]"
                    >
                      <ChattingList messageList={messageList}></ChattingList>
                      <ChattingForm
                        myUserName={myUserName}
                        onMessage={sendMsg}
                        currentSession={session}
                      ></ChattingForm>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <div className="container my-96 mx-auto text-center space-y-5">
          <p className="fontsize-lg">
            740px보다 작은 화면에서는 <br />
            이용하실 수 없습니다.
          </p>
          <p className="fontsize-lg">
            화면을 키우거나, <br />
            메인으로 돌아가주세요.
          </p>
          <button
            className={`bg-gray-400 hover:bg-gray-500 fontsize-sm ${settingButton}`}
            onClick={() => {
              leaveSession();
              navigate("/");
            }}
          >
            메인으로 돌아가기
          </button>
        </div>
      )}
    </>
  );
}
```




```src\components\openvidu\Vote.jsx
import axios from "axios";
import API_URL from "/src/stores/apiURL";
import useAuthStore from "/src/stores/userState";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Vote = ({ liveId }) => {
  const [voteItem, setVoteItem] = useState([]);
  const [voteItemCount, setVoteItemCount] = useState([]);
  const user = useAuthStore((state) => state.user);

  // 서버에서 투표 아이템별 표 수에 대한 정보를 받아오기 -> 투표 아이템별 표 수 상태 업데이트
  const getVoteResult = async () => {
    // 일정 시간마다 동작하도록 작성(setInterval 사용)
    axios
      .get(API_URL + `/lives/${liveId}`)
      .then((res) => {
        const tmpVoteItemCount = [];
        res.data.body.liveVoteItemDtoResList.forEach((item) => {
          tmpVoteItemCount.push(item.count ? item.count : 0);
        });
        // console.log("새로 가져옴:", tmpVoteItemCount);
        setVoteItemCount(tmpVoteItemCount);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  // 처음 컴포넌트가 마운트될 때, liveId를 기반으로 해당 방송 내의 투표 정보를 가져옴
  useEffect(() => {
    axios
      .get(API_URL + `/lives/${liveId}`)
      .then((res) => {
        const tmpVoteItem = [];
        const tmpVoteItemCount = [];
        res.data.body.liveVoteItemDtoResList.forEach((item) => {
          if (item.imgUrl) {
            tmpVoteItem.push({ id: item.id, item: item.imgUrl });
          } else if (item.description) {
            tmpVoteItem.push({ id: item.id, item: item.description });
          }
          tmpVoteItemCount.push(item.count ? item.count : 0);
        });
        // console.log(tmpVoteItem);
        // console.log(tmpVoteItemCount);
        setVoteItem(tmpVoteItem);
        setVoteItemCount(tmpVoteItemCount);
      })
      .catch((err) => {
        // console.log(err);
      });

    const intervalGet = setInterval(() => {
      getVoteResult();
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalGet);
  }, []);

  const [isVoteHoveredArr, setIsVoteHoveredArr] = useState(
    Array(voteItem.length).fill(false)
  ); // 각 투표 선택지 위에 마우스가 올라가 있는지
  const [isVotedArr, setIsVotedArr] = useState(
    Array(voteItem.length).fill(false)
  ); // 각 투표 선택지가 선택되었는지 여부
  const [isVoted, setIsVoted] = useState(false); // 투표를 했는지 여부

  // ------------ 방송 내 투표 관련 기능 ----------------
  // 투표하기
  const handleVote = (index, item) => {
    setIsVoted(true); // 투표한 상태로 변경 (-> 투표 선택지 변경 가능)
    setIsVotedArr(() => {
      const arr = Array(voteItem.length).fill(false);
      arr[index] = true;
      return [...arr];
    });
    // console.log(item.id, item.item);
    // api/lives/vote 로 post 요청 보내기 {memberId: number, liveId: number, liveVoteItemId: number} data 보내야함
    axios
      .post(API_URL + "/lives/vote", {
        memberId: user.memberId,
        liveId: liveId,
        liveVoteItemId: item.id,
      })
      .then((res) => {
        // console.log("투표성공", res);
        // 투표 성공 후, 투표 표 수 데이터 다시 받아서 렌더링
        getVoteResult();
      })
      .catch((err) => {
        // console.log("투표실패", err);
      });
  };

  return (
    <>
      <div className="w-full h-full justify-center items-center inline-flex flex-wrap">
        {voteItem &&
          voteItem.map((item, index) => {
            // item.item.length가 50자보다 길면 -> img URL로 판단
            if (item.item.length > 50) {
              return (
                <div
                  className={`relative border flex justify-center items-center bg-gray-50 w-1/2 h-[90px] cursor-pointer ${
                    isVotedArr[index] ? "border-red-400 border-4" : ""
                  }`}
                  key={index}
                  onMouseEnter={() =>
                    setIsVoteHoveredArr((prevArr) => {
                      prevArr[index] = true;
                      return [...prevArr];
                    })
                  }
                  onMouseLeave={() =>
                    setIsVoteHoveredArr((prevArr) => {
                      prevArr[index] = false;
                      return [...prevArr];
                    })
                  }
                  onClick={() => handleVote(index, item)}
                >
                  {isVoteHoveredArr[index] ? (
                    <p className="fontsize-sm font-bold text-center text-amber-300">
                      투표하기
                    </p>
                  ) : (
                    <img
                      src={item.item}
                      className="size-2/3"
                      alt="이미지 미리보기"
                    />
                  )}
                  {isVoted && (
                    <p className="absolute bottom-0 right-0 m-1 font-normal fontsize-xs">
                      {voteItemCount[index]} 표
                    </p>
                  )}
                </div>
              );
            } else {
              return (
                <div
                  className={`relative border flex fontsize-sm font-bold justify-center items-center text-center bg-gray-50 w-1/2 h-[90px] cursor-pointer ${
                    isVotedArr[index] ? "border-red-400 border-4" : ""
                  }`}
                  key={index}
                  onMouseEnter={() =>
                    setIsVoteHoveredArr((prevArr) => {
                      prevArr[index] = true;
                      return [...prevArr];
                    })
                  }
                  onMouseLeave={() =>
                    setIsVoteHoveredArr((prevArr) => {
                      prevArr[index] = false;
                      return [...prevArr];
                    })
                  }
                  onClick={() => handleVote(index, item)}
                >
                  {isVoteHoveredArr[index] ? (
                    <p className="fontsize-sm font-bold text-amber-300">
                      투표하기
                    </p>
                  ) : (
                    item.item
                  )}
                  {isVoted && (
                    <p className="absolute bottom-0 right-0 m-1 font-normal fontsize-xs">
                      {voteItemCount[index]} 표
                    </p>
                  )}
                </div>
              );
            }
          })}
      </div>
    </>
  );
};

export default Vote;
```





#### Chat
```src\components\openvidu\Chat\ChatComponent.css
#chatContainer {
  position: absolute;
  z-index: 0;
  width: 400px;
  height: 600px;
}

#chatToolbar {
  height: 43px;
  background-color: #9a47d5;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  padding-top: 13px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  color: #ffffff;
}

#closeButton {
  position: absolute;
  right: 0;
  top: -8px;
}

#chatComponent {
  background-color: #b8b8b8;
  position: absolute;
  /* z-index: 3; */
  top: -6vh;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: calc(100% - 80px);
  width: calc(100% - 30px);
  border-radius: 20px;
}

.message-wrap {
  /* position: absolute; */
  /* top: 0; */
  /* left: -40vh; */
  height: calc(100% - 100px);
  overflow: auto;
  /* z-index: 1000; */
}

#remoteUserss {
  margin-right: -40px;
}

.message {
  position: relative;
  /* padding: 7px 0; */
}
/* .user-img {
  position: absolute;
  border-radius: 45px;
  width: 60px;
  height: 60px;
  top: 15px;
} */

#chatInput {
  text-align: left;
}

.msg-detail {
  width: calc(100% - 65px);
  display: inline-block;
}

.msg-detail p {
  margin: 0;
  font-size: 15px;
}

.msg-info > p {
  font-size: 0.8em;
  color: #000000;
  font-style: italic;
  /* text-align: left; */
}

.msg-content {
  position: relative;
  margin-top: 5px;
  border-radius: 5px;
  padding: 8px;
  color: #000000;
  width: auto;
  max-width: 80%;
}

span.triangle {
  border-radius: 2px;
  height: 8px;
  width: 8px;
  top: 12px;
  display: block;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
}

.text {
  word-break: break-all;
  color: #000000;
}

/* Start message from other user */

.message > .left .msg-detail .msg-info {
  text-align: left;
}

.message.left .msg-detail {
  padding-left: 65px;
}

.message.left .user-img {
  left: -5px;
  border: 1px solid #f0f0f094;
}

.message.left .msg-detail .msg-content {
  background-color: #f0f0f0;
  float: left;
}
.message.left .msg-detail .msg-content span.triangle {
  background-color: #f0f0f0;
  border-bottom-width: 0;
  border-left-width: 0;
  left: -5px;
}

/* End message from other user */

/* Start my messages */

.message.right .msg-detail .msg-info {
  text-align: right;
}
.message.right .user-img {
  right: -5px;
  border: 1px solid #c8ffe8ab;
}

.message.right .msg-detail .msg-content {
  background-color: #c8ffe8;
  float: right;
}
.message.right .msg-detail .msg-content span.triangle {
  background-color: #c8ffe8;
  border-bottom-width: 0;
  border-left-width: 0;
  right: -5px;
}

/* End my messages */

#messageInput {
  position: absolute;
  bottom: 0px;
  width: 100%;
  background-color: #ffffff;
  text-align: center;
  padding: 10px 0px;
  height: 30px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
#messageInput input {
  width: 90%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  margin-left: -6%;
  color: #000000;
}

#sendButton {
  background-color: #81e9b0;
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 1px solid #7ae2a9;
  box-shadow: none !important;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #6b6b6b;
}

.chatComponentLight ::-webkit-scrollbar-thumb {
  background-color: #eeeeee !important;
}
```



```src\components\openvidu\Chat\ChatComponent.js
import React, { Component } from "react";
// import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
// import HighlightOff from "@material-ui/icons/HighlightOff";
import Send from "@material-ui/icons/Send";

import "./ChatComponent.css";
import { Tooltip } from "@material-ui/core";

export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      message: "",
    };
    this.chatScroll = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.close = this.close.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.props.user
      .getStreamManager()
      .stream.session.on("signal:chat", (event) => {
        const data = JSON.parse(event.data);
        let messageList = this.state.messageList;
        messageList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
        });

        this.setState({ messageList: messageList });
        // console.log(messageList);
        this.scrollToBottom();
      });
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handlePressKey(event) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }

  sendMessage() {
    // console.log(this.state.message);
    if (this.props.user && this.state.message) {
      let message = this.state.message.replace(/ +(?= )/g, "");
      if (message !== "" && message !== " ") {
        const data = {
          message: message,
          nickname: this.props.user.getNickname(),
          streamId: this.props.user.getStreamManager().stream.streamId,
        };
        this.props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    this.setState({ message: "" });
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.chatScroll.current.scrollTop =
          this.chatScroll.current.scrollHeight;
      } catch (err) {}
    }, 20);
  }

  close() {
    this.props.close(undefined);
  }

  render() {
    const styleChat = { display: this.props.chatDisplay };
    return (
      <div id="chatContainer">
        <div id="chatComponent" style={styleChat}>
          <div id="chatToolbar">
            <span>채팅창</span>
          </div>
          <div className="message-wrap" ref={this.chatScroll}>
            {this.state.messageList.map((data, i) => (
              <div
                key={i}
                id="remoteUsers"
                className={
                  "message" +
                  (data.connectionId !== this.props.user.getConnectionId()
                    ? " left"
                    : " right")
                }
              >
                <div className="msg-detail">
                  <div className="msg-info">
                    <p> {data.nickname}</p>
                  </div>
                  <div className="msg-content">
                    <span className="triangle" />
                    <p className="text">{data.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div id="messageInput">
            <input
              placeholder="Send a message"
              id="chatInput"
              value={this.state.message}
              onChange={this.handleChange}
              onKeyPress={this.handlePressKey}
            />
            <Tooltip title="Send message">
              <Fab size="small" id="sendButton" onClick={this.sendMessage}>
                <Send />
              </Fab>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}
```





```src\components\openvidu\Chat\ChattingForm.jsx
import React, { useState } from "react";
import { Send } from "@mui/icons-material";
import { Button, Input, Tooltip } from "@mui/material";
import styled from "styled-components";

const ChattingForm = (props) => {
  const [message, setMessage] = useState("");

  // 메세지를 보내는 함수
  const sendMessage = (event) => {
    event.preventDefault();
    if (message.trim() !== "") {
      props.onMessage(
        `${props.myUserName}: ` + message.trim(),
        props.currentSession
      ); // 공백을 제거하여 전달
    }
    setMessage("");
  };

  // 입력 데이터 변경
  const inputChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const checkEnter = (event) => {
    if (event.key === "Enter") {
      sendMessage(event);
    }
  };

  return (
    <div onSubmit={sendMessage} className="flex justify-stretch">
      <div className="flex-none w-20 text-center m-auto">
        {props.myUserName.length <= 6
          ? props.myUserName
          : props.myUserName.length.slice(0, 6) + "..."}
      </div>
      <Input
        className="flex-grow"
        placeholder="메세지를 입력하세요"
        id="chat-input"
        value={message}
        onChange={inputChangeHandler}
        onKeyUp={checkEnter}
        style={{
          background: "rgba(255, 255, 255)",
          border: "1px solid rgba(177, 177, 177)",
          borderRadius: "5px",
          padding: "5px",
          color: "black",
        }}
      ></Input>
      <Tooltip title="메세지 보내기">
        <Button
          className="flex-none w-10"
          variant="contained"
          style={{ color: "white", background: "#FFD257" }}
          onClick={sendMessage}
        >
          <Send></Send>
        </Button>
      </Tooltip>
    </div>
  );
};

export default ChattingForm;
```




```src\components\openvidu\Chat\ChattingList.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import _ from "lodash";

const StyledChattingList = styled.div`
  height: 87%;
  background: white;
  text-align: left;
  overflow: scroll;
  padding-left: 10px;
`;

const ChatDiv = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ProfileDiv = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 70%;
  overflow: hidden;
  border: 1px solid rgba(33, 33, 33);
`;

const ProfileImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
//   color: rgba(100, 100, 100);
const MessageSenderDiv = styled.div`
  color: rgba(210, 210, 210);
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  font-weight: bold;
  font-size: large;
  margin-left: 5px;
`;

const MessageContentDiv = styled.div`
  width: 230px;
  color: black;
  font-weight: bold;
  font-size: large;
  margin-left: 5px;
`;

const ChattingList = (props) => {
  const scrollRef = useRef();
  const boxRef = useRef(null);

  const [scrollState, setScrollState] = useState(true);

  const scrollEvent = _.debounce(() => {
    const scrollTop = boxRef.current.scrollTop; // 스크롤 위치
    const clientHeight = boxRef.current.clientHeight; // 요소의 높이(메세지 박스 창의 높이)
    const scrollHeight = boxRef.current.scrollHeight; // 스크롤의 높이

    // 스크롤이 맨 아래에 있을때
    setScrollState(
      scrollTop + clientHeight >= scrollHeight - 100 ? true : false
    );
  }, 100);

  const scroll = useCallback((event) => {
    event.stopPropagation();
    scrollEvent();
  }, []);

  useEffect(() => {
    if (scrollState) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [props.messageList]);

  useEffect(() => {
    boxRef.current.addEventListener("scroll", scroll);
  });

  return (
    <StyledChattingList ref={boxRef}>
      <div>
        {props.messageList.map((msg, i) => (
          <div key={i}>
            <ChatDiv>
              <div>
                <MessageSenderDiv>{msg.split(":")[0]}</MessageSenderDiv>
                <MessageContentDiv>{msg.split(":")[1]}</MessageContentDiv>
              </div>
            </ChatDiv>
          </div>
        ))}
      </div>
      <div ref={scrollRef}></div>
    </StyledChattingList>
  );
};

export default ChattingList;
```




### StatisticPage
```src\components\StatisticPage\StatisticPageChart.jsx
// 리액트 및 훅/라이브러리
import React, { useEffect, useState } from "react";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// Recharts 라이브러리
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

// 카테고리 및 소비성향 데이터 불러오기
import categoryData from "/src/stores/categoryData";
import sobiTIData from "/src/stores/testResultData";


const StatisticPageChart = ({
  selectedCategoryId,
  itemCount,
  selectedRadioValues,
  selectedDropdownValues,
}) => {

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // ----------- 사용자 유형 색 리스트 -----------
  const colorList = ["#2CB16A", "#FC9D2B", "#00A1FF", "#FF665A"];

  // ----------- 선택한 카테고리에 대한 태그 통계 배열 초기화 -----------
  const [selectedTagDataArray, setSelectedTagDataArray] = useState(
    categoryData[selectedCategoryId].tags.map((tag) => ({
      tag,
      userType1: 0,
      userType2: 0,
      userType3: 0,
      userType4: 0,
    }))
  );

  // ----------- 데이터를 서버에서 가져오는 함수 -----------
  const fetchData = async () => {
    // ----------- 응답 데이터를 담을 배열 -----------
    const responseDataArray = [];
    // ----------- itemCount 수 만큼 반복 -----------
    for (let i = 1; i <= itemCount; i++) {
      const genderId = selectedRadioValues[`성별-${i}`]
      const requestData = {
        memberId: 0,
        typeId: selectedDropdownValues[`소비성향-${i}`],
        age: selectedRadioValues[`나이-${i}`],
        gender: genderId == 1 ? "MALE" : (genderId == 2 ? "FEMALE" : 0),
        categoryId: selectedCategoryId,
      };

      try {
        // axios.post를 사용하여 서버에 비동기 요청을 보내고 응답을 기다림
        const responseData = await axios.post(
          `${API_URL}/statistics`,
          requestData
        );

        // responseDataArray에 서버 응답 데이터 추가
        responseDataArray.push(responseData.data);
        // console.log('요청', requestData);
        // console.log('응답', responseData.data);
      } catch (error) {
        console.error("axios 에러", error);
      }
    }

    // ----------- 업데이트 할 배열 선언 및 데이터 채우기 -----------
    const updatedDataArray = [...selectedTagDataArray];
    responseDataArray.forEach((responseData, userType) => {
      responseData.slice(1, 6).forEach((tagData, tagIndex) => {
        const tagRatio = (tagData.count / responseData[0].count) * 100;
        updatedDataArray[tagIndex][`userType${userType + 1}`] = tagRatio;
        updatedDataArray[tagIndex]["tag"] = tagData.tag;
      });
    });

    // console.log('응답 데이터 배열', responseDataArray)
    // console.log("태그 통계", updatedDataArray)

    // ----------- 배열 업데이트 -----------
    setSelectedTagDataArray([...updatedDataArray]);
  };

  // ----------- 값이 변경될 때 fetchData 함수 호출 -----------
  useEffect(() => {
    fetchData();
  }, [
    selectedCategoryId,
    itemCount,
    selectedRadioValues,
    selectedDropdownValues,
  ]);

  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    width: "100%",
    height: isXLarge ? "800px" : isLarge ? "700px" : isMedium ? "600px" : "500px",
  };

  // ----------- flex 컨테이너 스타일 -----------
  const flexContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- legend 컨테이너 스타일 -----------
  const legendContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 컨텐츠 정렬
    flexWrap: "wrap", // 가로 길이를 넘어가면 줄바꿈
  };

  // ----------- legend 아이템 스타일 -----------
  const legendItemStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    flex: isXLarge || isLarge ? "0 0 50%" : "0 0 100%", // 한 줄에 최대 2개/1개의 항목
    marginBottom: "10px", // 각 항목 사이의 간격
  };

  // ----------- legend 아이콘 스타일 -----------
  const legendIconStyle = {
    // 디자인
    marginRight: "5px",
    marginBottom: isXLarge ? "5px" : isLarge ? "4px" : "3px",
    width: isXLarge ? "20px" : isLarge ? "17px" : isMedium ? "14px" : "11px",
    height: isXLarge ? "20px" : isLarge ? "17px" : isMedium ? "14px" : "11px",
  };

  // --------------------------------- css 끝 ---------------------------------


  // ----------- itemCount 수 만큼 Radar를 생성 -----------
  const radars = [];
  for (let i = 1; i <= itemCount; i++) {
    const ageId = selectedRadioValues[`나이-${i}`] ?? 0;
    const genderId = selectedRadioValues[`성별-${i}`] ?? 0;
    const testId = selectedDropdownValues[`소비성향-${i}`] ?? 0;

    const ageValue =
      ageId == 0 ? "전체" : ageId == 5 ? "50대 이상" : `${ageId}0대`;
    const genderValue =
      genderId == 0 ? "전체" : genderId == 1 ? "남성" : "여성";
    const testValue = testId == 0 ? "전체" : sobiTIData[testId - 1].title;

    radars.push(
      <Radar
        key={`유형 ${i}`}
        name={`유형 ${i} : ${ageValue}/${genderValue}/${testValue}`}
        dataKey={`userType${i}`}
        stroke={colorList[i - 1]}
        fill={colorList[i - 1]}
        fillOpacity={0.3}
      />
    );
  }

  // ----------- 커스텀 레전드 렌더링 함수 -----------
  const CustomLegend = (props) => {
    const { payload } = props;
    return (
      <ul style={legendContainerStyle}>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={legendItemStyle}>
            <div
              style={{
                ...legendIconStyle,
                backgroundColor: entry.color,
              }}
            ></div>
            <span className="fontsize-md" style={{ color: entry.color }}>
              {entry.value}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div style={containerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy={isXLarge || isLarge ? "44%" : "37%"}
            outerRadius={isXLarge ? 300 : isLarge ? 250 : isMedium ? 190 : 130}
            data={selectedTagDataArray}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="tag" />
            <PolarRadiusAxis
              angle={54}
              tickFormatter={(value) => `${value.toFixed(1)}%`}
            />
            {radars}
            <Legend content={<CustomLegend />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default StatisticPageChart;
```



```src\components\StatisticPage\StatisticPageGroupItem.jsx
// 리액트
import React from "react";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 소비성향 데이터 불러오기
import sobiTIData from "/src/stores/testResultData.js";


const StatisticPageGroupItem = ({ number, onRadioChange, onDropdownChange }) => {

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // ----------- 유저 정보 데이터 -----------
  const userTypes = [
    { label: "나이", options: ['전체', '10대', '20대', '30대', '40대', '50대 이상'], type: "radio" },
    { label: "성별", options: ['전체', '남성', '여성'], type: "radio" },
    { label: "소비성향", options: ['전체', ...sobiTIData.map(item => item.title)], type: "dropdown" },
  ];

  // ----------- 사용자 유형 색 리스트 -----------
  const colorList = ["#2CB16A", "#FC9D2B", "#00A1FF", "#FF665A",]


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom: isXLarge ? "30px" : isLarge ? "25px" : isMedium ? "20px" : "15px",
    padding: isXLarge ? "20px 30px" : isLarge ? "17px 26px" : isMedium ? "14px 22px" : "11px 18px",
    width: "100%",
    borderRadius: isXLarge ? "30px" : isLarge ? "25px" : isMedium ? "20px" : "15px",
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)", // 그림자 효과
  };

  // ----------- 제목 스타일 -----------
  const titleStyle = {
    // 글자
    color: colorList[number - 1] || colorList[0],
    fontWeight: "bold"
  }

  // ----------- flex 컨테이너 스타일 -----------
  const flexContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- 타입 컨테이너 스타일 -----------
  const typeContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 컨텐츠 정렬
    justifyContent: "space-between",
    flexWrap: "wrap", // 가로 길이를 넘어가면 줄바꿈
  }

  // ----------- 타입 아이템 스타일 -----------
  const typeItemStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    marginTop: isXLarge ? "20px" : isLarge ? "18px" : isMedium ? "16px" : "14px",
    paddingLeft:  isXLarge ? "50px" : isLarge ? "30px" : isMedium ? "20px" : "7px",
    height: isXLarge ? "50px" : isLarge ? "40px" : isMedium ? "30px" : "25px",
    borderRadius: "30px",
    backgroundColor: "#F0F0F0",
  }

  // ----------- 나이 컨테이너 스타일 -----------
  const ageContainerStyle = {
    // 상속
    ...typeItemStyle,

    // 디자인
    width: "100%",
  }

  // ----------- 성별 컨테이너 스타일 -----------
  const genderContainerStyle = {
    // 상속
    ...typeItemStyle,

    // 디자인
    width: isXLarge || isLarge ? "55%" : "100%",
  }

  // ----------- 소비성향 컨테이너 스타일 -----------
  const textContainerStyle = {
    // 상속
    ...typeItemStyle,

    // 디자인
    paddingRight: isXLarge ? "20px" : isLarge ? "10px" : "0",
    width: isXLarge || isLarge ? "44%" : "100%",
  }

  // ----------- 사용자 유형 스타일 -----------
  const typeStyle = {
    // 디자인
    marginTop: isXLarge ? "5px" : isLarge ? "4px" : isMedium ? "3px" : "2px",
    marginRight: isXLarge ? "50px" : isLarge ? "30px" : isMedium ? "10px" : "5px",
  }

  // ----------- 옵션 컨테이너 스타일 -----------
  const optionContainerStyle = {
    // 디자인
    width: isXLarge ? "110px" : isLarge ? "80px" : isMedium ? "44px" : "38px",
  }

  // ----------- 라디오 옵션 스타일 -----------
  const optionStyle = {
    // 디자인
    marginLeft: isXLarge ? "10px" : isLarge ? "8px" : "4px",
  }

  // ----------- 드롭다운 스타일 -----------
  const dropdownStyle = {
    // 디자인
    border: "none",
    backgroundColor: "#F0F0F0",

    // 글자
    fontSize: isXLarge ? "16px" : isLarge ? "14px" : isMedium ? "12px" : "10px",
  }

  // --------------------------------- css 끝 ---------------------------------


  // ----------- '50대 이상'인 경우만 옵션의 width를 증가시키는 함수 -----------
  const getOptionContainerStyle = (option) => {
    if (option === '50대 이상') {
      return {
        ...optionContainerStyle,
        width:
          isXLarge ? "110px" :
          isLarge ? "80px" :
          isMedium ? "70px" : "60px",
      };
    }
    return optionContainerStyle;
  };

  return (
    <>
      <div style={containerStyle}>
        <div style={titleStyle} className="fontsize-md">사용자 유형 { number }</div>
        <div style={typeContainerStyle}>
          {userTypes.map((userType, index) => (
            <div
              style={{
                ...(index === 0 ? ageContainerStyle : 
                    index === 1 ? genderContainerStyle : textContainerStyle ),
              }}
              key={index}
            >
              <div style={typeStyle} className="fontsize-sm">{userType.label}</div>
              {userType.type === "radio" ? (
                <div style={flexContainerStyle}>
                  {userType.options.map((option, optionIndex) => (
                    <div style={getOptionContainerStyle(option)} key={optionIndex}>
                      <input
                        type="radio"
                        name={`${userType.label}-${number}`}
                        value={optionIndex}
                        onChange={(e) => onRadioChange(userType.label, number, e.target.value)}
                        defaultChecked={optionIndex === 0}
                      />
                      <label style={optionStyle} className="fontsize-xs">{option}</label>
                    </div>
                  ))}
                </div>
              ) : (
                <select
                  style={dropdownStyle}
                  onChange={(e) => onDropdownChange(userType.label, number, e.target.value)}
                >
                  {userType.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={optionIndex}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StatisticPageGroupItem;
```




### VoteDetailPage
```src\components\VoteDetailPage\ChatForm.jsx
// ChatForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "/src/stores/apiURL";

const ChatForm = ({ onSubmit, userid, choiced, voteId }) => {
  const [value, setValue] = useState("");
  const [chatList, setChatList] = useState([]);

  const handleChange = (e) => {
    if (e.target.value.length > 50) {
      window.alert("글자수가 50자를 넘었습니다");
      setValue(e.target.value.slice(0, 50));
    } else {
      setValue(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      voteId: voteId,
      memberId: userid,
      voteItemId: choiced,
      commentDesc: value,
      commentMentionId: 0,
    };
    try {
      await axios.post(`${API_URL}/votes/details/comments`, body);
      onSubmit(value, userid, choiced);
      setValue("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setChatList([
      ...chatList,
      { content: value, userId: userid, voteItemId: choiced },
    ]);
  }, [value, userid, choiced]);

  // enter키로도 입력 가능
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <>
      <div className="bg-white py-4 flex items-center">
        <input
          type="text"
          className="flex-1 border rounded-sm px-4 py-2 h-12 focus:outline-none"
          placeholder="댓글을 입력해 주세요(50자 이내)"
          onChange={handleChange}
          value={value.slice(0, 50)}
          onKeyPress={handleKeyPress}
        />
        <button
          type="submit"
          className="bg-amber-300 rounded-sm p-2 ml-2 h-12 w-20 hover:bg-amber-400 focus:outline-none"
          onClick={handleSubmit}
        >
          전송
        </button>
      </div>
    </>
  );
};

export default ChatForm;
```




```src\components\VoteDetailPage\ChatList.jsx
// ChatList.jsx
import React from "react";

// 커스텀 스토어를 이용한 상태 관리
import useAuthStore from "/src/stores/userState";


const ChatList = ({ list, choiced2, onLike }) => {
  // console.log(list);
  const colorMap = [
    "text-[#FF595E]",
    "text-[#FFCA3A]",
    "text-[#8AC926]",
    "text-[#1982C4]",
  ];

  const user = useAuthStore((state) => state.user);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString(); // Get date in format MM/DD/YYYY
    const formattedTime = date.toLocaleTimeString(); // Get time in format HH:MM:SS
    return `${formattedDate} ${formattedTime.slice(0, -3)}`; // 형식: YYYY.MM.DD 오전/오후 HH:mm
  };

  const items = () =>
    list.map((v, k) => (
      <div
        key={k}
        className={`px-3 flex ${
          v.voteItemId === choiced2 ? "justify-end" : ""
        }`}
      >
        <div
          style={{ background: (v.memberId === user.memberId) ? "#FFE69C" : "#FFFFFF" }}
          className={"text-black p-2 rounded-lg max-w-xs"}
        >
          <small
            className={`fontsize-xs ${colorMap[v.voteItemId % 4]}`}
          >
            {v.memberNickname} ({formatCreatedAt(v.createAt)})
          </small>
          <p
            style={{ fontFamily: "GmarketSansLight", fontWeight: "bold" }}
            className="chat-content fontsize-sm"
          >
            {v.commentDesc}
          </p>
          {/* <button className='fontsize-xs' disabled={v.liked ? true : false} onClick={() => onLike(k)}>좋아요: {v.commentLikesCnt}👍</button> */}
        </div>
      </div>
    ));

  return (
    <>
      <div
        style={{
          overflowY: "auto", // 세로 스크롤을 가능하게 하기 위해 추가
          scrollbarWidth: "thin", // 스크롤바를 얇게 만듦
          scrollbarColor: "#BEBEBE transparent", // 스크롤바 색상 (track, thumb 순서)
        }}
        className="flex-1 overflow-y-auto py-4 bg-gray-100 h-[500px]"
      >
        <div className="flex flex-col space-y-2">{items()}</div>
      </div>
    </>
  );
};

export default ChatList;
```




```src\components\VoteDetailPage\VoteDetail.jsx
// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from "react";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

import VoteCardItem from "../VotePage/VoteCardItem";
import VoteDetailHeader from "./VoteDetailHeader";
import VoteDetailResult from "./VoteDetailResult";
import VoteDetailChat from "./VoteDetailChat";
import useAuthStore from "/src/stores/userState";
import useModalStore from "/src/stores/modalState";
import { useParams } from "react-router-dom";

// 투표 상세페이지의 투표 정보 보내는 내용(서버 to item)
const VoteDetail = () => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  const detailVoteId = useModalStore((state) => state.detailVoteId);
  const detailVoteHandle = useModalStore((state) => state.detailVoteHandle);
  const [clicked, setClicked] = useState([false, false, false, false]);
  const [voteDetail, setVoteDetail] = useState();
  // 유저의 이메일정보
  const user = useAuthStore((state) => state.user);

  const [selectedVoteItem, setSelectedVoteItem] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [countList, setCountList] = useState([]);

  // 유저의 나이대
  const year = user.birthday.year;
  const month = user.birthday.month;
  const day = user.birthday.day;

  const now = new Date(); // 현재 날짜
  const currentYear = now.getFullYear(); // 현재 연도
  const currentMonth = now.getMonth() + 1; // 현재 월
  const currentDay = now.getDate(); // 현재 일

  let age = currentYear - year; // 만 나이 계산

  // 생일이 아직 지나지 않았다면 만 나이에서 1을 빼야 합니다.
  if (currentMonth < month || (currentMonth === month && currentDay < day)) {
    age--;
  }

  // 10대부터 50대까지 나이대 계산
  let ageGroup;
  if (age < 20) {
    ageGroup = 1;
  } else if (age < 30) {
    ageGroup = 2;
  } else if (age < 40) {
    ageGroup = 3;
  } else if (age < 50) {
    ageGroup = 4;
  } else {
    ageGroup = 5;
  }

  useEffect(() => {
    const params = new URLSearchParams();

    params.append("memberId", user.memberId);
    params.append("voteId", detailVoteId);
    params.append("filter.age", -1);
    params.append("filter.gender", "A");
    params.append("filter.typeId", -1);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/votes/detail`, {
          params,
        });
        // 요청 성공 시 응답 데이터를 상태에 저장합니다.
        // console.log(data.body);
        setVoteDetail(data.body);
        setSelectedVoteItem(data.body.chosenItem);
      } catch (error) {
        // 요청 실패 시 오류 처리를 수행합니다.
        console.error(error);
      }
    };
    fetchData();
  }, [detailVoteId]);

  // 모달창 닫는 로직
  const setVoteDetailModalClose = useModalStore(
    (state) => state.setVoteDetailModalClose
  );
  const handleClose = () => {
    setVoteDetailModalClose();
  };

  ///////////// 상훈 추가 /////////////
  ///////////////////////////////////
  /////////////////////////////////////

  // 클릭 시 isSelect 상태 변수를 false로 업데이트 하는 함수
  const handleClick = (itemId, selection) => {
    // console.log(itemId)
    // console.log(`선택지 ${itemId + 1}: ${selection}`);
    setCountList((prevCountList) =>
      prevCountList.map((count, i) =>
        voteDetail.voteItemList[i].voteItemId === itemId ? count + 1 : count
      )
    );

    let plusCount = totalCount + 1;
    setTotalCount(plusCount);
    setSelectedVoteItem(itemId);
    detailVoteHandle(itemId);
    // console.log(selectedVoteItem);
  };

  // axios 요청 후 처리를 위한 로직
  useEffect(() => {
    let newTotalCount = 0;
    if (voteDetail) {
      voteDetail.voteItemList.forEach((item) => {
        newTotalCount += item.count;
      });
      setTotalCount(newTotalCount);
      setCountList((prevCountList) =>
        voteDetail.voteItemList.map((item) => item.count)
      );
    }
  }, [voteDetail]);

  useEffect(() => {
    voteDetail ? setSelectedVoteItem(voteDetail.chosenItem) : null;
  }, [voteDetail]);

  // --------------------------------- css 시작 ---------------------------------

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    padding: isXLarge ? "40px" : isLarge ? "35px" : isMedium ? "30px" : "25px",
    width: isXLarge
      ? "900px"
      : isLarge
      ? "690px"
      : isMedium
      ? "450px"
      : "360px",
    maxHeight: "800px",
    borderRadius: "10px",
    background: "#FFFFFF",
    // whiteSpace: "nowrap", // 줄바꿈 방지

    // 스크롤바
    overflowY: "auto", // 세로 스크롤을 가능하게 하기 위해 추가
    scrollbarWidth: "thin", // 스크롤바를 얇게 만듦
    scrollbarColor: "#FFD257 transparent", // 스크롤바 색상 (track, thumb 순서)
  };

  // ----------- 이미지 아이템 스타일 -----------
  const imgItemStyle = {
    // 디자인
    width: isXLarge ? "200px" : isLarge ? "160px" : isMedium ? "100px" : "90px",
    height: isXLarge
      ? "260px"
      : isLarge
      ? "208px"
      : isMedium
      ? "140px"
      : "130px",
    marginRight: isXLarge ? "20px" : isLarge ? "15px" : "10px",
    borderRadius: "5px",

    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
  };

  // --------------------------------- css 끝 ---------------------------------

  return (
    <>
      <div
        id="outer-layer"
        className="fixed inset-0 z-50 bg-black bg-opacity-50 py-10 flex justify-center items-center"
        onClick={(e) => {
          if (e.target.id == "outer-layer") {
            setVoteDetailModalClose();
          }
        }}
      >
        {voteDetail && (
          <div style={bodyStyle}>
            <VoteDetailHeader
              className=""
              {...voteDetail.voteInfo}
              onClose={handleClose}
            />
            <div className="py-4 flex justify-around items-center h-full gap-2">
              {/* 투표한 안한 사람( voteDetail.chosenItem = null )은 투표가 가능하게  */}
              {voteDetail.voteItemList.map((item, itemIndex) => (
                <VoteCardItem
                  key={item.voteItemId}
                  item={item}
                  categoryId={voteDetail.voteInfo.categoryId}
                  voteId={voteDetail.voteInfo.voteId}
                  totalCount={totalCount}
                  count={countList[itemIndex]}
                  selectedVoteItem={selectedVoteItem}
                  path="/VotePage"
                  onClicked={(voteItemId) => handleClick(voteItemId)}
                />
              ))}
            </div>
            {selectedVoteItem && (
              <>
                {voteDetail.voteInfo.categoryId !== 5 && (
                  <VoteDetailResult voteResults={voteDetail.voteItemList} />
                )}

                <p className="pt-12 pb-4 fontsize-sm">💬 댓글</p>
                <VoteDetailChat
                  commentList={voteDetail.commentList}
                  chosenItem={selectedVoteItem} //선택한 아이템이 투표에 몇번째 인지 보내줘야한다...
                  userId={user.memberId}
                  voteId={detailVoteId}
                />
              </>
            )}
            {!selectedVoteItem && (
              <div className="mt-20 text-center">
                <span className="fontsize-sm">
                  투표에 참여하면 댓글을 확인할 수 있어요!
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default VoteDetail;
```




```src\components\VoteDetailPage\VoteDetailChat.jsx
// VoteDetailChat.jsx
import React, { useState, useEffect } from "react";
import ChatForm from "./ChatForm";
import ChatList from "./ChatList";
import axios from "axios";
import API_URL from "../../stores/apiURL";
import useAuthStore from "/src/stores/userState";

const VoteDetailChat = ({ commentList, chosenItem, userId, voteId }) => {
  // state 설정
  const [list, setList] = useState(commentList);
  const [likes, setLikes] = useState(commentList.liked); // 좋아요를 누른 계정 추적 상태
  const [userid, setUserid] = useState(userId); // 사용자 아이디
  const [choiced, setChoiced] = useState(chosenItem); // 사용자 선택지

  // const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  // const [totalPage, setTotalPage] = useState(1); // 총 페이지 수

  const user = useAuthStore((state) => state.user);

  // 기존의 댓글 데이터
  // userid:아이디, content:대화 내용, date: 작성일자, liked: 좋아요 수, choiced: 선택지
  // useEffect(() => {
  // 페이지네이션 기능
  //   const fetchData = async () => {
  //     const response = await fetch(`/api/comments?page=${currentPage}&limit=20`);
  //     const data = await response.json();
  //     setList(data.comments);
  //     setTotalPage(Math.ceil(data.total / 20));
  //   };
  //   fetchData();
  // }, [currentPage]);

  useEffect(() => {
    setList(commentList);
    // console.log(commentList)
  }, [commentList]);

  // 새로운 댓글 추가
  const addList = (content) => {
    const now = new Date();
    const createAt = now.toISOString();
    setList([
      ...list,
      {
        memberId: userid,
        memberNickname: user.nickname,
        commentDesc: content,
        createAt: createAt,
        liked: false,
        commentLikesCnt: 0,
        voteItemId: choiced,
      },
    ]);
  };
  // 좋아요 기능
  const handleLike = (index) => {
    const newList = [...list];
    // console.log(list);

    // 이미 좋아요를 눌렀다면 return
    if (newList.liked === true) {
      return;
    }

    // 좋아요 수 증가
    newList[index].liked = String(Number(newList[index].liked) + 1);
    setList(newList);

    // 좋아요를 누른 계정 기록
    setLikes({ ...likes, [newList[index].userid]: true });
    // console.log(newList)
    // 서버에 좋아요 증가 정보 POST 요청s
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${API_URL}/votes/details/comments/likes`,
          {
            memberId: userId,
            commentId: newList[index].commentId,
          }
        );

        if (!response.ok) {
          // 에러 처리
          console.error(response.statusText);
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    // 좋아요 버튼 비활성화
    const likeButton = document.querySelectorAll(".fontsize-xs")[index];
    likeButton.disabled = true;
  };

  return (
    <>  
      <div className=''>
        {/* 기존 댓글과 나의 선택을 전달 */}
        {/* list: 채팅 내역 / choiced: 내가 선택한 item / onLike: 좋아요 선택한 것 */}
        <ChatList 
          choiced2={choiced} 
          onLike={handleLike}
          list={list} 
        />
        {/* 새 댓글을 채팅 입력창과 */}
        <ChatForm 
          onSubmit={addList} 
          userid={userid}
          choiced={choiced}
          voteId={voteId}
          list={list}
        />
        {/* 페이지네이션 UI 추가 */}
        {/* <Pagination currentPage={currentPage} totalPage={totalPage} onChangePage={setCurrentPage} /> */}
      </div>
    </>
  );
};

export default VoteDetailChat;
```




```src\components\VoteDetailPage\VoteDetailHeader.jsx
import React, { useState } from "react";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 커스텀 스토어를 이용한 상태 관리
import useAuthStore from "/src/stores/userState";

const VoteDetailHeader = (props) => {
  // 좋아요 상태 변수
  const [isVoteLike, setIsVoteLike] = useState(props.liked);
  const [voteLikesCount, setVoteLikesCount] = useState(props.likesCnt);

  const user = useAuthStore((state) => state.user);

  // console.log(props);

  // 좋아요 관리 함수
  const handleLike = async () => {
    try {
      const response = await axios.post(API_URL + "/votes/likes", {
        memberId: user.memberId,
        voteId: props.voteId,
      });

      // 현재 좋아요 상태를 업데이트
      // 만약 이미 좋아요를 눌렀었다면 좋아요 수를 1 감소시키고, 그렇지 않으면 1 증가시킴
      setVoteLikesCount(isVoteLike ? voteLikesCount - 1 : voteLikesCount + 1);

      // 좋아요 상태를 반전시킴
      setIsVoteLike(!isVoteLike);
      // console.log('POST request response:', response.data);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  return (
    <>
      <div className="w-auto h-auto flex flex-col pt-4 pb-12 bg-white overflow-hidden max-w-xxl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="p-auto">
              <span className="fontsize-sm font-bold text-gray-700">
                {props.memberNickname}님
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              className="flex items-center px-2 py-1 rounded-md hover:outline hover:outline-3 hover:outline-red-300"
              onClick={handleLike}
            >
              <span className="text-red-500 fontsize-sm">
                {" "}
                {isVoteLike ? "❤" : "♡"}
              </span>
              <span className="text-red-500 fontsize-sm ml-2">
                {props.likesCnt}
              </span>
            </button>

            <div className="flex items-center ml-4 mr-2">
              <span className="fontsize-sm ml-2">
                참여자 수 : {props.totalChoiceCnt}
              </span>
            </div>

            {/* <button
              className="p-1 w-auto h-auto rounded-full bg-red-200 flex items-center justify-center"
              onClick={() => props.onClose()}
            >
              X
            </button> */}
          </div>
        </div>

        <span className="fontsize-md pt-4">"{props.title}"</span>
      </div>
    </>
  );
};

export default VoteDetailHeader;
```





```src\components\VoteDetailPage\VoteDetailResult.jsx
import React, { useState } from "react";

// 임시 데이터를 상위 컴포넌트로부터 받아오는 props로 변경
const VoteDetailResult = ({ voteResults, totalChoiceCnt }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const colorMap = [
    "bg-[#FF595E]",
    "bg-[#FFCA3A]",
    "bg-[#8AC926]",
    "bg-[#1982C4]",
  ];
  const handleClick = (index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = !newSelectedOptions[index];
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <div
      className="mx-auto py-4 flex justify-around items-center gap-2"
      style={{ display: "flex" }}
    >
      {voteResults.map((result, index) => (
        <button onClick={() => handleClick(index)}>
          <div className={`${colorMap[result.voteItemId%4]} rounded-lg w-auto m-auto p-1`} key={index}>
            {/* <h2>선택비율 : {Math.round((result.count / totalChoiceCnt) * 100)}%</h2> */}
            <p className="fontsize-sm mx-3">태그 통계</p>
            {selectedOptions[index] && (
              <div className="py-4 bg-white">
                {result.tagCountList.map((tag) => (
                  <p className="fontsize-xs pt-1" key={tag.tagName}>
                    {tag.tagName}:{" "}
                    {result.count === 0
                      ? "0 %"
                      : Math.round((tag.count / result.count) * 100)}
                    %
                  </p>
                ))}
              </div>
            )}
          </div>
        </button>
      ))}
      {/* 사용자 유형 필터링 핑료 */}
    </div>
  );
};

export default VoteDetailResult;
```



### VotePage
```src\components\VotePage\VoteCard.jsx
// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from "react";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 커스텀 스토어를 이용한 상태 관리
import useAuthStore from "/src/stores/userState";
import useModalStore from "/src/stores/modalState";

// 투표 카드 컴포넌트
import VoteCardItem from "./VoteCardItem";
import { selectClasses } from "@mui/base";

const VoteCard = (props) => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // 부모 컴포넌트로부터 투표 정보 전달 받음
  const {
    liked,
    likesCnt,
    chosenItemId,
    voteItemList,
    voteId,
    voteTitle,
    categoryName,
    categoryId,
  } = props;

  // 선택 상태 변수 선언
  const [totalCount, setTotalCount] = useState(0);
  const [countList, setCountList] = useState([]);

  // 좋아요 상태 변수
  const [isVoteLike, setIsVoteLike] = useState(liked);
  const [voteLikesCount, setVoteLikesCount] = useState(likesCnt);
  const [selectedVoteItem, setSelectedVoteItem] = useState(chosenItemId);
  // 로그인한 사용자 정보 가져오기
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setLoginModalOpen = useModalStore((state) => state.setLoginModalOpen); // 로그인 모달이 열립니다

  // 모달창
  const setVoteDetailModalOpen = useModalStore(
    (state) => state.setVoteDetailModalOpen
  );

  // 클릭 시 isSelect 상태 변수를 false로 업데이트 하는 함수
  const handleClick = (itemId, selection) => {
    // console.log(itemId)
    // console.log(`선택지 ${itemId + 1}: ${selection}`);
    setCountList((prevCountList) =>
      prevCountList.map((count, i) =>
        voteItemList[i].voteItemId === itemId ? count + 1 : count
      )
    );

    let plusCount = totalCount + 1;
    setTotalCount(plusCount);
    setSelectedVoteItem(itemId);
    // console.log(selectedVoteItem);
  };

  // 모달창 여는 함수
  const openModal = () => {
    // Call the function to open the modal window
    setVoteDetailModalOpen(voteId, handleClick);
  };

  // 좋아요 관리 함수
  const handleLike = async () => {
    try {
      const response = await axios.post(API_URL + "/votes/likes", {
        memberId: user.memberId,
        voteId: voteId,
      });

      // 현재 좋아요 상태를 업데이트
      // 만약 이미 좋아요를 눌렀었다면 좋아요 수를 1 감소시키고, 그렇지 않으면 1 증가시킴
      setVoteLikesCount(isVoteLike ? voteLikesCount - 1 : voteLikesCount + 1);

      // 좋아요 상태를 반전시킴
      setIsVoteLike(!isVoteLike);
      // console.log('POST request response:', response.data);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };
  useEffect(() => {
    let newTotalCount = 0;
    voteItemList.forEach((item) => {
      newTotalCount += item.count;
    });
    setTotalCount(newTotalCount);
    setCountList((prevCountList) => voteItemList.map((item) => item.count));
  }, []);

  // --------------------------------- css 시작 ---------------------------------

  // ----------- flex 컨테이너 스타일 -----------
  const flexContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------

  const getDynamicContainerHeight = () => {
    if (isXLarge) {
      return "500px";
    } else if (isLarge) {
      return "400px";
    } else if (isMedium) {
      return "290px";
    } else {
      return "290px";
    }
  };

  const contentContainerStyle = {
    // 디자인
    marginBottom: "20px",
    padding: isXLarge
      ? "20px 30px"
      : isLarge
      ? "16px 24px"
      : isMedium
      ? "12px 18px"
      : "8px 12px",
    maxWidth: "1160px",
    minWidth: "240px",
    // height: "484px",
    height: getDynamicContainerHeight(),
    borderRadius: "30px",
    background: "#FFFFFF",

    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  // ----------- 카테고리 이름 스타일 -----------
  const categoryNameStyle = {
    // 디자인
    marginLeft: isXLarge
      ? "20px"
      : isLarge
      ? "15px"
      : isMedium
      ? "10px"
      : "5px",

    // 글자
    color: "#4A4A4A",
  };

  // ----------- 카드 컨테이너 스타일 -----------
  const getDynamicCardHeight = () => {
    if (isXLarge) {
      return "400px";
    } else if (isLarge) {
      return "270px";
    } else if (isMedium) {
      return "200px";
    } else {
      return "200px";
    }
  };

  const cardContainerStyle = {
    // 디자인
    // height: "319px",
    height: getDynamicCardHeight(),
  };

  // ----------- 버튼 컨테이너 스타일 -----------
  const buttonContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 컨텐츠 정렬
    justifyContent: "space-between",
  };

  // ----------- 버튼 공통 스타일 -----------
  const commonButtonStyle = {
    // 디자인
    padding: isXLarge
      ? "12px 20px 8px"
      : isLarge
      ? "11px 18px 7px"
      : isMedium
      ? "10px 16px 6px"
      : "9px 14px 5px",
    borderRadius: "8px",
    transition: "background 0.2s",
  };

  // ----------- 좋아요 버튼 스타일 -----------
  const likeButtonStyle = {
    // 상속
    ...commonButtonStyle,

    // 디자인
    border: "3px solid",

    // 글자
    color: isVoteLike ? "#FF595E" : "#4A4A4A", // 좋아요 상태에 따라 색상 변경
  };

  // --------------------------------- css 끝 ---------------------------------

  return (
    <>
      <div
        style={contentContainerStyle}
        onClick={(event) => {
          event.stopPropagation();
          if (!isLoggedIn) {
            setLoginModalOpen();
          }
        }}
      >
        {/* ------------------ 투표 제목 및 카테고리 ------------------ */}
        <div
          style={{
            ...flexContainerStyle,
            height: "50px",
            marginBottom: "10px",
          }}
        >
          <div className="fontsize-lg">{voteTitle}</div>
          <p style={categoryNameStyle} className="fontsize-md">
            {categoryName}
          </p>
        </div>

        {/* ------------------ 투표 카드 아이템 ------------------ */}
        <div
          style={cardContainerStyle}
          className="flex justify-around items-center"
        >
          {voteItemList.map((item, itemIndex) => (
            <VoteCardItem
              key={item.voteItemId}
              item={item}
              categoryId={categoryId}
              voteId={voteId}
              totalCount={totalCount}
              count={countList[itemIndex]}
              selectedVoteItem={selectedVoteItem}
              voteItemLength={voteItemList.length}
              path="/VotePage"
              onClicked={(voteItemId) => handleClick(voteItemId)}
            />
          ))}
        </div>

        {/* ------------------ 좋아요, 상세보기 버튼 ------------------ */}
        <div
          style={{
            ...buttonContainerStyle,
            height: "55px",
            marginTop: "10px",
          }}
        >
          <button
            style={likeButtonStyle}
            className={`fontsize-sm ${
              isVoteLike ? "hover:bg-pink-50" : "hover:bg-gray-200"
            }`}
            onClick={handleLike}
          >
            {isVoteLike ? "❤ 좋아요 취소" : "♡ 좋아요"} {voteLikesCount}
          </button>
          <button
            onClick={openModal}
            style={commonButtonStyle}
            className="fontsize-sm bg-amber-300 hover:bg-amber-400"
          >
            상세보기 →
          </button>
        </div>
      </div>
    </>
  );
};

export default VoteCard;
```




```src\components\VotePage\VoteCardItem.jsx
// 리액트 및 훅/라이브러리
import React, { useEffect, useState } from "react";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// Material-UI의 Container 컴포넌트
import { Container } from "@mui/system";

// 커스텀 스토어를 이용한 상태 관리
import useAuthStore from "/src/stores/userState";

// 카테고리 데이터 불러오기
import categoryData from "/src/stores/categoryData";

// 각 투표에 관한 정보를 받아서 출력하는 곳
const VoteCardItem = (props) => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // Props에서 필요한 값 추출
  const {
    item,
    categoryId,
    voteId,
    onClicked,
    totalCount,
    count,
    selectedVoteItem,
    voteItemLength,
  } = props;

  // 로그인한 사용자 정보 가져오기
  const user = useAuthStore((state) => state.user);
  const [selectedItem, setselectedItem] = useState(selectedVoteItem);
  // console.log(categoryData[categoryId].tags) 호버하면 얘네가 왜 출력될까??

  // 선택된 카테고리의 태그 가져오기
  const selection = categoryData[categoryId].tags;

  // 상태 변수 선언
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(0);
  const [memberId, setMemberId] = useState(0);
  const voteItemId = item.voteItemId;
  const doVote = useAuthStore((state) => state.doVote);
  useEffect(() => {
    setselectedItem(selectedVoteItem);
  }, [selectedVoteItem]);
  // console.log(categoryData[categoryId].tags) 호버하면 얘네가 왜 출력될까??

  // 투표하기 기능
  const onTagClick = (index) => {
    // console.log("onTagClick"+index)
    const dto = {
      memberId: user.memberId,
      voteId: voteId,
      voteItemId: voteItemId,
      categoryId: categoryId,
      tagId: (categoryId - 1) * 5 + index + 1,
    };
    // Send axios request
    axios
      .post(API_URL + "/votes/choices", dto)
      .then((response) => {
        // Handle success
        // console.log("Axios request successful:", response.data);
        doVote(); // 투표하면 2포인트 증가
      })
      .catch((error) => {
        // Handle error
        console.error("Axios request failed:", error);
      });
  };

  const getDynamicHeight = () => {
    if (isXLarge) {
      return "289px";
    } else if (isLarge) {
      return "220px";
    } else if (isMedium) {
      return "140px";
    } else {
      return "130px";
    }
  };
  return (
    <>
      <div className="flex flex-col">
        <div
          style={{
            marginLeft: "15px",
            height: "30px",
            color: "#FF6D6D",
            visibility: selectedItem === voteItemId ? "visible" : "hidden",
          }}
          className="fontsize-sm"
        >
          My Pick
        </div>
        <div
          style={{
            width:
              voteItemLength === 2
                ? isXLarge
                  ? "280px"
                  : isLarge
                  ? "220px"
                  : isMedium
                  ? "120px"
                  : "110px"
                : voteItemLength === 3
                ? isXLarge
                  ? "220px"
                  : isLarge
                  ? "160px"
                  : isMedium
                  ? "100px"
                  : "90px"
                : isXLarge
                ? "160px"
                : isLarge
                ? "130px"
                : isMedium
                ? "90px"
                : "70px",
            // height: "289px",
            height: getDynamicHeight(),
            border: "5px solid",
            borderColor: selectedItem === voteItemId ? "#FF6D6D" : "white",
          }}
          className="flex flex-col w-full h-full"
        >
          {" "}
          {/* 높이를 조정했습니다. */}
          {/* 이미지를 띄워지는 배경 */}
          <Container
            className="w-full p-0 relative rounded-xl"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ maxWidth: "100%" }}
          >
            {/* 투표하는 기능 내부 */}
            {(selectedItem === 0 || !selectedItem || clicked !== 0) &&
            (hover || clicked !== 0) ? (
              <div
                className={`absolute inset-0 w-full bg-orange-200 opacity-50 flex flex-col justify-between`}
                onMouseLeave={() => {}}
              >
                {/* 선택지의 묶음 */}
                {selection.map((tag, index) => (
                  <button
                    key={index}
                    className={`h-1/5 w-full flex items-center justify-center cursor-pointer "text-black"
                    ${
                      clicked - 1 === index
                        ? "text-white bg-blue-500"
                        : "text-black"
                    }
                        border-t-2 border-white text-max-xl`}
                    onClick={() => {
                      if (clicked === 0 && user.memberId != null) {
                        setClicked(index + 1);
                        onTagClick(index);
                        onClicked(voteItemId);
                      } else {
                      }
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            ) : null}

            {/* 투표 이미지 */}
            <img
              className="mx-auto w-2/3 h-full object-cover"
              alt="Vote Image"
              src={item.voteItemImgUrl}
              // 로컬에서 임시로 이미지를 확인하기 위한 부분
              // src="/assets/images/tmp_profile.png"
            />
          </Container>
          {/* 버튼을 누르면 생기는 상세페이지 */}
          <div className="w-full flex flex-col justify-center items-center">
            {selectedItem !== 0 && selectedItem ? (
              <p className="fontsize-md pb-2">{`${(
                (count / totalCount) *
                100
              ).toFixed(2)}%`}</p>
            ) : (
              <p className="pb-2 fontsize-sm text-center invisible">
                투표 비율
              </p>
            )}
            <h2 className="fontsize-sm font-bold">
              {item.price ? `${item.price.toLocaleString()}원` : ""}
            </h2>
            <p
              className="fontsize-xs pt-2"
              style={{ fontFamily: "GmarketSansLight", fontWeight: "bold" }}
            >
              {item.voteItemDesc}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoteCardItem;
```



```src\components\VotePage\VotePageHeader.jsx
// 리액트 및 훅/라이브러리
import React, { useState, useEffect, useRef } from 'react';

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 카테고리 데이터 불러오기
import categoryData from "/src/stores/categoryData";


const VotePageHeader = ({ onSearch, onSearchTerm, onSearchCategory }) => {

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();
  
  // ----------- 카테고리 드롭다운 state 관리 -----------
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0); // 상태 초기화

  // ----------- 카테고리 선택 변경 이벤트 핸들러-----------
  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value; // 선택된 카테고리의 ID 가져오기
    setSelectedCategory(selectedCategoryId); // 선택된 카테고리 ID로 상태 업데이트
    onSearchCategory(selectedCategoryId); // 선택된 카테고리 ID를 상위 컴포넌트에 전달
  };

  // ----------- 드롭다운 토글 함수 -----------
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // ----------- 검색 입력 변경 이벤트 핸들러 -----------
  const handleChange = (event) => {
    onSearchTerm(event.target.value); // 입력된 검색어로 상태 업데이트
  };

  // ----------- 검색 버튼 클릭 이벤트 핸들러 -----------
  const handleSearchClick = () => {
    onSearch(); // 입력 완료된 검색어를 상위 컴포넌트에 전달
  };

  // ----------- 드롭다운 버튼 ref -----------
  const dropdownButtonRef = useRef();
  const dropdownMenuRef = useRef();

  // ----------- 드롭다운 밖 클릭 시 메뉴 닫음 -----------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (dropdownButtonRef.current && !dropdownButtonRef.current.contains(event.target)) &&
        (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target))
      ) {
        // 클릭이 메뉴 버튼 및 메뉴 외부에 있으면 메뉴를 닫습니다.
        setIsOpen(false);
      }
    };
  
    // 페이지에 클릭 이벤트를 추가합니다.
    document.addEventListener('mousedown', handleClickOutside);
  
    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);


  // --------------------------------- css 시작 ---------------------------------

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    marginLeft: "auto",
    marginBottom: isXLarge || isLarge ? "15px" : "5px",
    whiteSpace: "nowrap", // 줄바꿈 방지

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: isXLarge || isLarge ? "flex-start" : "center",
  };

  // ----------- 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    paddingRight: "20px",
    width: isXLarge || isLarge ? "440px" : isMedium ? "270px" : "216px",
    height: isXLarge || isLarge ? "50px" : isMedium ? "40px" : "35px",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",

    // 글자
    color: "#4A4A4A",

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "space-between",
  };

  // ----------- 서브 컨테이너 스타일 -----------
  const subContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  }

  // ----------- relative 컨테이너 스타일 -----------
  const relativeContainerStyle = {
    // 위치
    position: "relative",
  };

  // ----------- 드롭다운 버튼 스타일 -----------
  const dropdownButtonStyle = {
    // 디자인
    marginRight: "5px",
    padding: isXLarge || isLarge ? "2px 10px 0px 14px" : isMedium ? "2px 10px 0px 12px" : "2px 10px 0px 10px",
    border: "none",
    width: isXLarge || isLarge ? "110px" : isMedium ? "105px" : "80px",
    height: isXLarge || isLarge ? "50px" : isMedium ? "40px" : "35px",
    cursor: "pointer",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- 드롭다운 스타일 -----------
  const dropdownStyle = {
    // 디자인
    width: "100%",

    // 글자
    fontSize: isXLarge || isLarge ? "16px" : isMedium ? "15px" : "14px",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }

  // ----------- 화살표 스타일 -----------
  const arrowStyle = {
    // 글자
    fontFamily: "GmarketSansBold",
    fontWeight: "bold",
  }

  // ----------- 드롭다운 메뉴 스타일 -----------
  const dropdownMenuStyle = {
    // 위치
    position: "absolute",
    left: 0,
    zIndex: 1,

    // 디자인
    marginTop: "4px",
    padding: isXLarge ? "0 8px" : isLarge ? "0 7px" : isMedium ? "0 6px" : "0 5px",
    width: isXLarge || isLarge ? "110px" : isMedium ? "105px" : "100px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", // 메뉴 그림자
    borderRadius: "4px",
    backgroundColor: "#FFFFFF",
  };

  // ----------- 드롭다운 아이템 스타일 -----------
  const dropdownItemStyle = {
    // 디자인
    margin: isXLarge ? "8px 0" : isLarge ? "7px 0" : isMedium ? "6px 0" : "5px 0",
    padding: isXLarge ? "8px" : isLarge ? "7px" : isMedium ? "6px" : "5px",
    cursor: "pointer",

    // 글자
    fontSize: isXLarge || isLarge ? "16px" : isMedium ? "14px" : "12px",
  };

  // ----------- 검색 창 스타일 -----------
  const searchStyle = {
    // 디자인
    padding: "2px 10px 0px 10px",
    border: "none",
    width: isXLarge || isLarge ? "210px" : isMedium ? "115px" : "90px",
    height: isXLarge || isLarge ? "40px" : isMedium ? "30px" : "25px",
    
    // 글자
    fontSize: isXLarge || isLarge ? "16px" : isMedium ? "15px" : "14px",
  }

  // ----------- 검색 버튼 스타일 -----------
  const searchButtonStyle = {
    // 디자인
    paddingTop: "4px",
    border: "none",
    backgroundColor: "#FFFFFF",

    // 글자
    fontSize: isXLarge || isLarge ? "20px" : isMedium ? "18px" : "16px",
  }

  // --------------------------------- css 끝 ---------------------------------

  
  return (
    <>
      <div style={bodyStyle}>
        <div style={containerStyle}>
          <div style={subContainerStyle}>

            {/* ------------- 카테고리 드롭다운 버튼 ------------- */}
            <div style={relativeContainerStyle}>
              <div
                value={selectedCategory}
                onClick={toggleDropdown}
                style={dropdownButtonStyle}
                ref={dropdownButtonRef}
              >
                <div style={dropdownStyle}>
                  {selectedCategory !== null
                    ? categoryData.find(
                        (c) => c.id === parseInt(selectedCategory)
                      )?.name
                    : categoryData[0].name
                  }
                  {isOpen ? (
                    <span style={arrowStyle}>∧</span>
                  ) : (
                    <span style={arrowStyle}>∨</span>
                  )}
                </div>
              </div>
              {isOpen && (
                <div style={dropdownMenuStyle} ref={dropdownMenuRef}>
                  {categoryData.map(
                    (category) => (
                      <div
                        key={category.id}
                        onClick={() => {
                          handleCategoryChange({
                            target: { value: category.id },
                          })
                          setIsOpen(false)
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#FFE69C")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "#FFFFFF")
                        }
                        style={dropdownItemStyle}
                      >
                        {category.name}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* ------------- 검색 창  ------------- */}
            <input
              type="text"
              placeholder={isXLarge || isLarge ? "검색어를 입력하세요" : "검색"}
              onChange={handleChange} // Wire up the handleChange event handler
              style={searchStyle}
            />
          </div>

          {/* ------------- 검색 버튼  ------------- */}
          <button
            type="button"
            onClick={handleSearchClick} // Wire up the handleSearchClick event handler  
            style={searchButtonStyle}
          >
            🔍︎
          </button>
        </div>

      </div>
    </>
  );
};

export default VotePageHeader;
```



```src\components\VotePage\VotePageList.jsx
// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from "react";

// 투표 카드 컴포넌트
import VoteCard from "./VoteCard";

const VotePageList = ({ voteList }) => {
  useEffect(() => {
    // console.log("VoteList has changed:", voteList);
    setVotes(voteList);
  }, [voteList]);
  const [votes, setVotes] = useState(voteList);

  return (
    <div>
      {votes.map((vote) => (
        // (vote.chosenItemId === 0) ?
        // (
        <VoteCard
          key={`${vote.voteId}-card`}
          vote={vote}
          liked={vote.liked}
          likesCnt={vote.likesCnt}
          chosenItemId={vote.chosenItemId}
          voteItemList={vote.voteItemList}
          voteId={vote.voteId}
          voteTitle={vote.voteTitle}
          categoryName={vote.categoryName}
          categoryId={vote.categoryId}
        />
        //  ) : null
      ))}
    </div>
  );
};

export default VotePageList;
```




```src\components\VotePage\VoteProduct.jsx
// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 커스텀 스토어를 이용한 상태 관리
import useAuthStore from "/src/stores/userState";
import useModalStore from "/src/stores/modalState";

const VoteProduct = () => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // 설명 state 추가
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  // 카테고리 상태 변수 추가
  const [category, setCategory] = useState("");
  // 모달창 닫기
  const setVoteProductCreateModalClose = useModalStore(
    (state) => state.setVoteProductCreateModalClose
  );

  const [voteItems, setVoteItems] = useState([
    { voteItemImg: null, voteItemDesc: "", price: "" },
    { voteItemImg: null, voteItemDesc: "", price: "" },
  ]);
  const [previewImages, setPreviewImages] = useState([]);

  // 사용자 ID를 저장할 state 변수 추가
  const user = useAuthStore((state) => state.user);
  // 모달창 닫는 로직
  const setVoteProductModalClose = useModalStore(
    (state) => state.setVoteProductCreateModalClose
  );

  const createVote = useAuthStore((state) => state.createVote);
  const navigate = useNavigate();

  const handleInputChange = (e, index, field) => {
    const updatedItems = [...voteItems];
    const value =
      field === "price" ? parseFloat(e.target.value) || 0 : e.target.value;
    if (updatedItems[index]) {
      updatedItems[index] = { ...updatedItems[index], [field]: value };
    } else {
      updatedItems[index] = { voteItemImg: null, [field]: value };
    }
    setVoteItems(updatedItems);
  };

  const addVoteItem = () => {
    if (voteItems.length > 3) {
      alert("최대 개수를 초과하였습니다.");
      return;
    }
    setVoteItems((prevState) => [
      ...prevState,
      { voteItemImg: null, voteItemDesc: "", price: "" },
    ]);
    setPreviewImages((prevState) => [...prevState, null]);
  };
  // Function to handle changing voting item image
  const handleVoteItemImageChange = (index, event) => {
    const newVoteItems = [...voteItems];
    // 여기서 취소를 눌러도 유지되게끔 바꿀 수도 있음.
    newVoteItems[index].voteItemImg = event.target.files[0];
    setVoteItems(newVoteItems);

    const newPreviewImages = [...previewImages];
    // 그림을 넣으려다 취소를 눌렀을 때 제거되기 때문에 보관하던 이미지도 제거했다.
    event.target.files[0]
      ? (newPreviewImages[index] = URL.createObjectURL(event.target.files[0]))
      : (newPreviewImages[index] = null);
    setPreviewImages(newPreviewImages);
  };

  // 투표 항목 삭제 함수 (마지막 항목 삭제)
  const removeVoteItem = () => {
    if (voteItems.length === 0) {
      return;
    }
    const updatedItems = [...voteItems];
    updatedItems.pop(); // 마지막 항목 삭제
    setVoteItems(updatedItems);

    const updatedPreviewImages = [...previewImages];
    updatedPreviewImages.pop(); // 마지막 항목에 해당하는 이미지 삭제
    setPreviewImages(updatedPreviewImages);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title === "") {
      alert("제목을 입력해쥬!");
      return;
    }

    if (voteItems && voteItems.length < 2) {
      alert("최소 2개 이상의 사진을 첨부해쥬!");
      return;
    }

    if (event.target.category.value === "") {
      alert("카테고리를 선택해쥬!");
      return;
    }

    if (event.target.description.value === "") {
      alert("내용을 입력해쥬!");
      return;
    }
    const formData = new FormData();
    formData.append("memberEmail", user.email);
    formData.append("title", event.target.title.value);
    formData.append("description", event.target.description.value);
    formData.append("categoryId", event.target.category.value);
    voteItems.forEach((item, index) => {
      formData.append(`voteItemList[${index}].voteItemImg`, item.voteItemImg);
      formData.append(`voteItemList[${index}].voteItemDesc`, item.voteItemDesc);
      formData.append(`voteItemList[${index}].price`, item.price);
    });

    try {
      const response = await axios.post(API_URL + "/votes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(response.data);
      createVote(); // 투표 만들면 10포인트 차감
      navigate("/VotePage");
      setVoteProductModalClose();
    } catch (error) {
      console.error(error);
      alert("Failed to create poll.");
    }
  };

  // --------------------------------- css 시작 ---------------------------------

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    padding: isXLarge ? "40px" : isLarge ? "35px" : isMedium ? "30px" : "25px",
    width: isXLarge
      ? "800px"
      : isLarge
      ? "640px"
      : isMedium
      ? "450px"
      : "360px",
    maxHeight: "800px",
    borderRadius: "10px",
    background: "#FFFFFF",
    whiteSpace: "nowrap", // 줄바꿈 방지

    // 스크롤바
    overflowY: "auto", // 세로 스크롤을 가능하게 하기 위해 추가
    scrollbarWidth: "thin", // 스크롤바를 얇게 만듦
    scrollbarColor: "#FFD257 transparent", // 스크롤바 색상 (track, thumb 순서)
  };

  // ----------- 이미지 아이템 스타일 -----------
  const imgItemStyle = {
    // 디자인
    width: isXLarge ? "200px" : isLarge ? "160px" : isMedium ? "100px" : "90px",
    height: isXLarge
      ? "260px"
      : isLarge
      ? "208px"
      : isMedium
      ? "140px"
      : "130px",
    marginRight: isXLarge ? "20px" : isLarge ? "15px" : "10px",
    borderRadius: "5px",

    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
  };

  // --------------------------------- css 끝 ---------------------------------

  return (
    <>
      <div
        id="outer-layer"
        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
        onClick={(e) => {
          if (e.target.id == "outer-layer") {
            setVoteProductCreateModalClose();
          }
        }}
      >
        <div style={bodyStyle}>
          <form onSubmit={handleSubmit}>
            {/* ------------- 제목 입력 ------------- */}
            <div className="mb-5">
              <label
                htmlFor="title"
                className="my-10 block text-center fontsize-xl"
              >
                <span style={{ color: "#1982C4" }} className="fontsize-xl">
                  구매{" "}
                </span>
                골라쥬
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border-0 focus:shadow-md
                bg-gray-100 py-4 px-6 text-base text-[#6B7280]"
              />
            </div>

            {/* ------------- 카테고리 선택 ------------- */}
            <div className="mb-5">
              {/* <label
                htmlFor="category"
                className="mb-3 block text-base font-medium text-[#FF7F50]"
              >
                카테고리:
              </label> */}
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border-0 focus:shadow-md
                bg-gray-100 py-4 px-6 text-base text-[#6B7280]"
              >
                <option value="">카테고리를 선택하세요</option>
                <option value="1">의류</option>
                <option value="2">가구</option>
                <option value="3">신발</option>
                <option value="4">전자제품</option>
              </select>
            </div>
            <div className="mb-5">
              {/* <label
                htmlFor="description"
                className="mb-3 block text-base font-medium text-[#FF7F50]"
              >
                투표 내용:
              </label> */}
              <textarea
                name="description"
                id="description"
                placeholder="투표 내용을 입력하세요"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  height: isXLarge ? "189px" : isLarge ? "145.5px" : "86px",
                }}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] focus:shadow-md"
              />
            </div>

            {/* ------------- 투표 항목 추가 부분 ------------- */}
            {voteItems.map((voteItem, index) => (
              <div
                key={index}
                className="flex items-center mb-6 pt-4 border-t-2 border-gray-200"
              >
                <div
                  style={{
                    ...imgItemStyle,
                    overflow: "hidden",
                  }}
                  className="p-2 bg-gray-100 hover:bg-gray-200"
                  key={index}
                >
                  <label htmlFor={`voteItem${index + 1}`} className="relative">
                    <input
                      type="file"
                      name={`voteItemImgs`}
                      id={`voteItem${index + 1}`}
                      onChange={(e) => handleVoteItemImageChange(index, e)}
                      multiple
                    />
                    {previewImages[index] && (
                      <img
                        src={previewImages[index]}
                        alt=""
                        className="mt-3 rounded-lg"
                      />
                    )}
                  </label>

                  {!previewImages[index] && (
                    <label
                      htmlFor={`voteItem${index + 1}`}
                      style={{ paddingBottom: "20px" }}
                      className="fontsize-xs relative flex items-center h-full justify-center text-center cursor-pointer"
                    >
                      아이템 {index + 1}
                    </label>
                  )}
                </div>

                {/* ------------- 가격, 내용 설명 입력 ------------- */}
                <div
                  style={{
                    height: isXLarge
                      ? "260px"
                      : isLarge
                      ? "208px"
                      : isMedium
                      ? "140px"
                      : "130px",
                  }}
                >
                  <input
                    name={`price-${index}`}
                    id={`price-${index}`}
                    placeholder="가격을 입력하세요"
                    value={voteItem.price || ""}
                    onChange={(e) => handleInputChange(e, index, "price")}
                    style={{
                      width: isXLarge
                        ? "483.5px"
                        : isLarge
                        ? "378.5px"
                        : isMedium
                        ? "263.5px"
                        : "210px",
                    }}
                    className="mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] focus:shadow-md"
                  />
                  <div>
                    <textarea
                      name={`content-${index}`}
                      id={`content-${index}`}
                      placeholder="내용을 입력하세요"
                      value={voteItem.voteItemDesc || ""}
                      onChange={(e) =>
                        handleInputChange(e, index, "voteItemDesc")
                      }
                      style={{
                        width: isXLarge
                          ? "483.5px"
                          : isLarge
                          ? "378.5px"
                          : isMedium
                          ? "263.5px"
                          : "210px",
                        height: isXLarge
                          ? "189px"
                          : isLarge
                          ? "145.5px"
                          : isMedium
                          ? "86px"
                          : "85.5px",
                      }}
                      className="rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* ------------- 항목 추가, 제거 버튼 ------------- */}
            <div
              style={{
                gap: isXLarge
                  ? "16px"
                  : isLarge
                  ? "14px"
                  : isMedium
                  ? "12px"
                  : "10px",
              }}
              className="flex mb-5"
            >
              <button
                style={{
                  fontSize: isXLarge
                    ? "50px"
                    : isLarge
                    ? "40px"
                    : isMedium
                    ? "30px"
                    : "20px",
                  fontFamily: "GmarketSansLight",
                  cursor: voteItems.length > 3 ? "not-allowed" : "pointer",
                  borderRadius: "5px",
                }}
                className="w-1/2 mx-2 flex items-center pt-3 h-14 justify-center bg-gray-100 hover:bg-gray-200"
                type="button"
                onClick={addVoteItem}
                disabled={voteItems.length > 3}
              >
                +
              </button>
              <button
                style={{
                  fontSize: isXLarge
                    ? "50px"
                    : isLarge
                    ? "40px"
                    : isMedium
                    ? "30px"
                    : "20px",
                  fontFamily: "GmarketSansLight",
                  cursor: voteItems.length < 3 ? "not-allowed" : "pointer",
                  borderRadius: "5px",
                }}
                className="w-1/2 mx-2 flex items-center pt-3 h-14 justify-center cursor-pointer bg-gray-100 hover:bg-gray-200"
                type="button"
                onClick={removeVoteItem}
                disabled={voteItems.length < 3}
              >
                -
              </button>
            </div>

            {/* ------------- 취소하기, 투표 올리기 버튼 ------------- */}
            <div
              style={{ marginBottom: "40px" }}
              className="flex justify-between"
            >
              <button
                onClick={setVoteProductModalClose}
                className="w-1/2 mx-2 p-3 rounded-full bg-white hover:bg-gray-200 text-center fontsize-sm border-4 border-gray-300"
              >
                취소하기
              </button>
              <button
                type="submit"
                className="w-1/2 mx-2 p-3 rounded-full bg-amber-300 hover:bg-amber-400 text-center fontsize-sm"
              >
                투표 올리기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VoteProduct;
```



```src\components\VotePage\VoteSimple.jsx
// 리액트 및 훅/라이브러리
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 커스텀 스토어를 이용한 상태 관리
import useModalStore from "/src/stores/modalState";
import useAuthStore from "/src/stores/userState";

const VoteSimple = () => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  const [voteItems, setVoteItems] = useState([
    { voteItemImg: null, voteItemDesc: "", price: "" },
    { voteItemImg: null, voteItemDesc: "", price: "" },
  ]);
  const [previewImages, setPreviewImages] = useState([]);

  const [title, setTitle] = useState("");
  // 사용자 ID를 저장할 state 변수 추가
  const user = useAuthStore((state) => state.user);
  // 모달창 닫는 로직
  const setVoteSimpleModalClose = useModalStore(
    (state) => state.setVoteSimpleCreateModalClose
  );

  const createVote = useAuthStore((state) => state.createVote);
  const navigate = useNavigate();

  const addVoteItem = () => {
    if (voteItems.length > 3) {
      alert("최대 개수를 초과하였습니다.");
      return;
    }
    setVoteItems((prevState) => [
      ...prevState,
      { voteItemImg: null, voteItemDesc: "", price: "" },
    ]);
    setPreviewImages((prevState) => [...prevState, null]);
  };
  // Function to handle changing voting item image
  const handleVoteItemImageChange = (index, event) => {
    const newVoteItems = [...voteItems];
    // 여기서 취소를 눌러도 유지되게끔 바꿀 수도 있음.
    newVoteItems[index].voteItemImg = event.target.files[0];
    setVoteItems(newVoteItems);

    const newPreviewImages = [...previewImages];
    // 그림을 넣으려다 취소를 눌렀을 때 제거되기 때문에 보관하던 이미지도 제거했다.
    event.target.files[0]
      ? (newPreviewImages[index] = URL.createObjectURL(event.target.files[0]))
      : (newPreviewImages[index] = null);
    setPreviewImages(newPreviewImages);
  };

  // 투표 항목 삭제 함수 (마지막 항목 삭제)
  const removeVoteItem = () => {
    if (voteItems.length === 0) {
      return;
    }
    const updatedItems = [...voteItems];
    updatedItems.pop(); // 마지막 항목 삭제
    setVoteItems(updatedItems);

    const updatedPreviewImages = [...previewImages];
    updatedPreviewImages.pop(); // 마지막 항목에 해당하는 이미지 삭제
    setPreviewImages(updatedPreviewImages);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title === "") {
      alert("제목을 입력해쥬!");
      return;
    }

    if (voteItems && voteItems.length < 2) {
      alert("최소 2개 이상의 사진을 첨부해쥬!");
      return;
    }

    const formData = new FormData();
    formData.append("memberEmail", user.email);
    formData.append("title", event.target.title.value);
    formData.append("description", "simple");
    formData.append("categoryId", 5);
    voteItems.forEach((item, index) => {
      formData.append(`voteItemList[${index}].voteItemImg`, item.voteItemImg);
      formData.append(`voteItemList[${index}].voteItemDesc`, "");
      formData.append(`voteItemList[${index}].price`, "");
    });

    try {
      const response = await axios.post(API_URL + "/votes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(response.data);
      createVote(); // 투표 만들면 10포인트 차감
      setVoteSimpleModalClose();
      navigate("/VotePage");
    } catch (error) {
      console.error(error);
      alert("Failed to create poll.");
    }
  };

  // --------------------------------- css 시작 ---------------------------------

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    padding: isXLarge ? "40px" : isLarge ? "35px" : isMedium ? "30px" : "25px",
    width: isXLarge
      ? "800px"
      : isLarge
      ? "640px"
      : isMedium
      ? "450px"
      : "360px",
    maxHeight: "800px",
    borderRadius: "10px",
    background: "#FFFFFF",
    whiteSpace: "nowrap", // 줄바꿈 방지

    // 스크롤바
    overflowY: "auto", // 세로 스크롤을 가능하게 하기 위해 추가
    scrollbarWidth: "thin", // 스크롤바를 얇게 만듦
    scrollbarColor: "#FFD257 transparent", // 스크롤바 색상 (track, thumb 순서)
  };

  // ----------- 이미지 컨테이너 스타일 -----------
  const imgContainerStyle = {
    // 디자인
    margin: isXLarge
      ? "30px 0"
      : isLarge
      ? "27px 0"
      : isMedium
      ? "24px 0"
      : "21px 0",

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "space-between",
    gap: isXLarge ? "16px" : isLarge ? "14px" : isMedium ? "12px" : "10px",
  };

  // ----------- 이미지 아이템 스타일 -----------
  const imgItemStyle = {
    // 디자인
    width: isXLarge ? "120px" : isLarge ? "90px" : isMedium ? "57.5px" : "44px",
    height: isXLarge
      ? "180px"
      : isLarge
      ? "140px"
      : isMedium
      ? "100px"
      : "80px",
    borderRadius: "5px",

    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
  };

  // --------------------------------- css 끝 ---------------------------------

  return (
    <>
      <div
        id="outer-layer"
        className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
        onClick={(e) => {
          if (e.target.id == "outer-layer") {
            setVoteSimpleModalClose();
          }
        }}
      >
        <div style={bodyStyle}>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* ------------- 제목 입력 ------------- */}
            <div>
              <label
                htmlFor="title"
                className="my-10 block text-center fontsize-xl"
              >
                <span style={{ color: "#8AC926" }} className="fontsize-xl">
                  간단{" "}
                </span>
                골라쥬
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border-0 focus:shadow-md
                  bg-gray-100 py-4 px-6 text-base text-[#6B7280]"
              />
            </div>

            {/* ------------- 사진 첨부 ------------- */}
            <div style={imgContainerStyle}>
              <div
                style={{
                  gap: isXLarge
                    ? "16px"
                    : isLarge
                    ? "14px"
                    : isMedium
                    ? "12px"
                    : "10px",
                }}
                className="flex"
              >
                {voteItems.map((voteItem, index) => (
                  <div
                    style={{
                      ...imgItemStyle,
                      overflow: "hidden",
                    }}
                    className="p-2 bg-gray-100 hover:bg-gray-200"
                    key={index}
                  >
                    <label
                      htmlFor={`voteItem${index + 1}`}
                      className="relative"
                    >
                      <input
                        type="file"
                        name={`voteItemImgs`}
                        id={`voteItem${index + 1}`}
                        onChange={(e) => handleVoteItemImageChange(index, e)}
                        multiple
                      />
                      {previewImages[index] && (
                        <img
                          src={previewImages[index]}
                          alt=""
                          className="mt-3 rounded-lg"
                        />
                      )}
                    </label>

                    {!previewImages[index] && (
                      <label
                        htmlFor={`voteItem${index + 1}`}
                        style={{ paddingBottom: "20px" }}
                        className="fontsize-xs relative flex items-center h-full justify-center text-center cursor-pointer"
                      >
                        아이템 {index + 1}
                      </label>
                    )}
                  </div>
                ))}
              </div>

              {/* ------------- 항목 추가, 제거 버튼------------- */}
              <div
                style={{
                  gap: isXLarge
                    ? "16px"
                    : isLarge
                    ? "14px"
                    : isMedium
                    ? "12px"
                    : "10px",
                }}
                className="flex"
              >
                <button
                  style={{
                    ...imgItemStyle,
                    width: isXLarge
                      ? "80px"
                      : isLarge
                      ? "70px"
                      : isMedium
                      ? "50px"
                      : "40px",
                    fontSize: isXLarge
                      ? "50px"
                      : isLarge
                      ? "40px"
                      : isMedium
                      ? "30px"
                      : "20px",
                    fontFamily: "GmarketSansLight",
                    cursor: voteItems.length > 3 ? "not-allowed" : "pointer",
                  }}
                  className="flex items-center pt-3 h-full justify-center bg-gray-100 hover:bg-gray-200"
                  type="button"
                  onClick={addVoteItem}
                  disabled={voteItems.length > 3}
                >
                  +
                </button>
                <button
                  style={{
                    ...imgItemStyle,
                    width: isXLarge
                      ? "80px"
                      : isLarge
                      ? "70px"
                      : isMedium
                      ? "50px"
                      : "40px",
                    fontSize: isXLarge
                      ? "50px"
                      : isLarge
                      ? "40px"
                      : isMedium
                      ? "30px"
                      : "20px",
                    fontFamily: "GmarketSansLight",
                    cursor: voteItems.length < 3 ? "not-allowed" : "pointer",
                  }}
                  className="flex items-center pt-3 h-full justify-center cursor-pointer bg-gray-100 hover:bg-gray-200"
                  type="button"
                  onClick={removeVoteItem}
                  disabled={voteItems.length < 3}
                >
                  -
                </button>
              </div>
            </div>

            {/* ------------- 취소하기, 투표 올리기 버튼 ------------- */}
            <div
              style={{ marginBottom: "40px" }}
              className="flex justify-between"
            >
              <button
                onClick={setVoteSimpleModalClose}
                className="w-1/2 mx-2 p-3 rounded-full bg-white hover:bg-gray-200 text-center fontsize-sm border-4 border-gray-300"
              >
                취소하기
              </button>
              <button
                type="submit"
                className="w-1/2 mx-2 p-3 rounded-full bg-amber-300 hover:bg-amber-400 text-center fontsize-sm"
              >
                투표 올리기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VoteSimple;
```



## pages
```src\pages\BroadcastPage.jsx
// 리액트 및 훅/라이브러리
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 커스텀 스토어를 이용한 상태 관리
import useModalStore from "/src/stores/modalState";

// 투표 관련 컴포넌트
import BroadcastItem from "../components/BroadcastItem";
import VoteButton from "../components/VoteButton";
import VoteSimple from "../components/VotePage/VoteSimple";
import VoteProduct from "../components/VotePage/VoteProduct";

// react-helmet-async 라이브러리에서 Helmet을 import
import { Helmet } from "react-helmet-async";

// 이미지 가져오기
import questionMarkImg from "/assets/images/question_mark_img.png";

const BroadcastPage = () => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // ----------- 상세 설명 토글하기 위한 상태 -----------
  const [showHotDescription, setShowHotDescription] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  // ----------- 상태 토글 함수 -----------
  const toggleHotDescription = () => {
    setShowHotDescription(!showHotDescription);
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const navigate = useNavigate();
  const [userNickName, setUserNickName] = useState("");
  const [liveItem, setLiveItem] = useState([]);

  // ------------- 투표 생성 버튼 모달과 관련된 함수 -----------
  const isVoteSimpleCreateModalOpened = useModalStore(
    (state) => state.isVoteSimpleCreateModalOpened
  );
  const isVoteProductCreateModalOpened = useModalStore(
    (state) => state.isVoteProductCreateModalOpened
  );

  useEffect(() => {
    window.scrollTo({ top: 0 }); // 페이지 로드되면 최상단으로 가기
    axios
      .get(API_URL + "/lives/listWithTop3")
      .then((res) => {
        // console.log(res.data.body);
        setLiveItem(res.data.body);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  // --------------------------------- css 시작 ---------------------------------

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    padding: "30px 0", // 상하단 여백: 50px
    width: isXLarge
      ? "1000px"
      : isLarge
      ? "740px"
      : isMedium
      ? "460px"
      : "375px",
    whiteSpace: "nowrap", // 줄바꿈 방지
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom: isXLarge
      ? "50px"
      : isLarge
      ? "45px"
      : isMedium
      ? "40px"
      : "35px",
  };

  // ----------- 제목 컨테이너 스타일 -----------
  const titleContainerStyle = {
    // 디자인
    marginBottom: isXLarge || isLarge ? "20px" : "15px",
    height: isXLarge ? "45px" : isLarge ? "40px" : isMedium ? "35px" : "30px",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- 제목 스타일 -----------
  const titleTextStyle = {
    // 디자인
    marginTop: "5px",
    marginRight: "5px",
  };

  // ----------- 물음표 스타일 -----------
  const questionMarkStyle = {
    // 디자인
    margin: "0 5px",
    width: "16px",
    height: "16px",
  };

  // ----------- 설명 스타일 -----------
  const descriptionStyle = {
    // 디자인
    padding: "2px 5px 0",
    borderRadius: "3px",
    backgroundColor: "#6B6B6B",

    // 글자
    fontSize: "13px",
    color: "#FFFFFF",
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const contentsContainerStyle = {
    // 디자인
    borderRadius: isXLarge
      ? "50px"
      : isLarge
      ? "40px"
      : isMedium
      ? "30px"
      : "20px",
  };

  // --------------------------------- css 끝 ---------------------------------

  return (
    <>
      <VoteButton />
      <Helmet>
        <title>지금골라쥬</title>
      </Helmet>

      {/* ------------- 투표 버튼 ------------- */}
      <VoteButton />

      {/* ------------- Body ------------- */}
      <div style={bodyStyle}>
        <div id="hot-broadcast" style={containerStyle}>
          <div style={titleContainerStyle}>
            <span style={titleTextStyle} className="fontsize-lg">
              # 지금
            </span>
            <span
              style={titleTextStyle}
              className="text-red-300 font-bold fontsize-lg"
            >
              당장
            </span>
            <span style={titleTextStyle} className="fontsize-lg">
              골라쥬
            </span>
            <img
              src={questionMarkImg}
              style={questionMarkStyle}
              alt="물음표"
              className="cursor-pointer rounded-full"
              onClick={toggleHotDescription}
              onMouseOver={() => setShowHotDescription(true)}
              onMouseOut={() => setShowHotDescription(false)}
            />
            <p
              style={{
                ...descriptionStyle,
                visibility: showHotDescription ? "visible" : "hidden",
              }}
            >
              현재 시청자 높은 방송 TOP 3
            </p>
          </div>
          <div
            style={contentsContainerStyle}
            className="flex flex-row space-x-10 sm:space-x-5 bg-red-100 px-24 py-10 sm:px-10 sm:py-5 min-h-[200px]"
          >
            {liveItem.length > 0 ? (
              liveItem.slice(0, 3).map((item, index) => {
                return <BroadcastItem key={index} index={index} item={item} />;
              })
            ) : (
              <p className="fontsize-sm">
                현재 방송 중인 지금 골라쥬가 없습니다.
              </p>
            )}
          </div>
        </div>

        <div id="broadcast-list" style={containerStyle}>
          <div style={titleContainerStyle}>
            <span style={titleTextStyle} className="fontsize-lg">
              # 지금 골라쥬
            </span>
            <img
              src={questionMarkImg}
              style={questionMarkStyle}
              alt="물음표"
              className="cursor-pointer rounded-full"
              onClick={toggleDescription}
              onMouseOver={() => setShowDescription(true)}
              onMouseOut={() => setShowDescription(false)}
            />
            <p
              style={{
                ...descriptionStyle,
                visibility: showDescription ? "visible" : "hidden",
              }}
            >
              최신순 방송 목록
            </p>
          </div>
          <div
            style={contentsContainerStyle}
            className="relative grid grid-cols-4 sm:grid-cols-3 bg-white p-7 gap-10 min-h-[300px]"
          >
            {liveItem.length > 3 ? (
              liveItem.slice(3).map((item, index) => {
                return <BroadcastItem key={index} item={item} />;
              })
            ) : (
              <div className="absolute left-20 top-10">
                <p className="fontsize-sm">
                  현재 방송 중인 지금 골라쥬가 충분하지 않습니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {isVoteSimpleCreateModalOpened && <VoteSimple></VoteSimple>}
      {isVoteProductCreateModalOpened && <VoteProduct></VoteProduct>}
    </>
  );
};

export default BroadcastPage;
```




```src\pages\MainPage.jsx
// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// 일정시간 내 함수가 1번만 동작하도록 방어하는 함수
import { debounce } from "lodash";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 커스텀 스토어를 이용한 상태 관리
import useModalStore from "/src/stores/modalState";
import useAuthStore from "/src/stores/userState";

// 메인 페이지 컴포넌트
import MainVoteList from "../components/MainPage/MainVoteList";
import MainWord from "../components/MainPage/MainWord";
import SwipeVote from "../components/MainPage/SwipeVote";
import VoteButton from "../components/VoteButton";

// 투표 관련 컴포넌트
import VoteSimple from "../components/VotePage/VoteSimple";
import VoteProduct from "../components/VotePage/VoteProduct";
import VoteDetail from "../components/VoteDetailPage/VoteDetail";

// 모달 컴포넌트
import LoginModal from "../components/LoginForm";
import SignupModal from "../components/SignupForm";

const MainPage = () => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // ------------------ 로그인 관련 ------------------

  // 로그인한 사용자 정보 가져오기
  const user = useAuthStore((state) => state.user);

  // 로그인 여부 및 상태 업데이트 함수
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  // 로그인 및 회원가입 모달 창 상태
  const isLoginModalOpened = useModalStore((state) => state.isLoginModalOpened);
  const isSignupModalOpened = useModalStore(
    (state) => state.isSignupModalOpened
  );

  // 투표 모달 창 상태
  const isVoteDetailModalOpened = useModalStore(
    (state) => state.isVoteDetailModalOpened
  );
  const isVoteSimpleCreateModalOpened = useModalStore(
    (state) => state.isVoteSimpleCreateModalOpened
  );
  const isVoteProductCreateModalOpened = useModalStore(
    (state) => state.isVoteProductCreateModalOpened
  );

  // 상세페이지
  const setVoteDetailModalOpen = useModalStore(
    (state) => state.setVoteDetailModalOpen
  );
  // 모달 창 열기 함수
  const setLoginModalOpen = useModalStore((state) => state.setLoginModalOpen);
  const setSignupModalOpen = useModalStore((state) => state.setSignupModalOpen);

  useEffect(() => {
    // gollajyu-cookie가 쿠키에 담겨 있으면, 소셜로그인을 한 사용자 -> 로직 처리 후, gollajyu-cookie 제거하기
    const isSocialLogin = document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("gollajyu-cookie="));

    if (isSocialLogin) {
      axios.get(API_URL + "/members/addInfo").then((res) => {
        // console.log(res.data.body);
        if (res.data.body.typeId) {
          const data = {
            email: res.data.body.email,
            password: "소셜 구글 로그인",
          };
          logIn(data);
          document.cookie =
            "gollajyu-cookie" +
            "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } else {
          // 신규 가입자 처리
          window.alert("신규 가입자입니다. 회원가입을 진행해주세요.");
          setSignupModalOpen();
        }
      });
    }
  }, []);

  // 로그인 함수
  const logIn = (data) => {
    axios
      .post(API_URL + "/members/login", data, {
        withCredentials: true,
      })
      .then((response) => {
        setLoggedIn(response.data.body);
        window.location.reload(); // 로그인 후, 메인페이지 새로고침
        // console.log("로그인 완료", response);
      })
      .catch((err) => {
        console.error("로그인 오류", err);
      });
  };

  // ------------------ 데이터 통신 관련 ------------------

  // 초기 카테고리 아이디 설정
  const categoryId = 0;

  // 투표 목록 데이터 및 로딩 상태 관련 상태 설정
  const [voteListData, setVoteListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const [lastPageNo, setLastPageNo] = useState(Infinity);
  const [isLastPage, setIsLastPage] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  // pageNo 올리는 함수
  const increasePageNo = () => {
    setPageNo((prev) => {
      // console.log("lastPageNo:", lastPageNo);
      if (prev === lastPageNo) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  // 데이터 가져오기 함수
  const fetchData = debounce(async () => {
    try {
      const response = await axios.get(`${API_URL}/votes`, {
        params: {
          categoryId: categoryId,
          memberId: user ? user.memberId : null,
          pageNo: pageNo,
        },
      });

      const data = response.data.body.voteInfoList;
      // console.log("pageNo:", pageNo);
      // console.log(response.data);
      setLastPageNo(response.data.body.lastPageNo);
      setVoteListData((prevData) => {
        return [...prevData, ...data];
      });
      setIsLoading(false); // 데이터를 가져온 후 로딩 상태를 false로 설정
    } catch (error) {
      setIsLoading(false); // 에러 발생 시 로딩 상태를 false로 설정
    }
  }, 300);

  // 페이지 로드 시(컴포넌트가 처음 마운트 될 때만) 데이터 가져오기
  useEffect(() => {
    window.scrollTo({ top: 0 }); // 페이지 로드되면 최상단으로 가기
    // console.log("pageNo 증가", pageNo);
    fetchData();
    setInitialRender(false);
    if (pageNo === lastPageNo) {
      setIsLastPage(true);
    }
  }, [pageNo]);

  useEffect(() => {
    // voteListData 길이가 일정 수준보다 작으면 increasePageNo 함수를 실행하고 fetchData 요청을 다시 보낸다.
    // 단, lastPageNo와 현재 pageNo가 같으면 alert를 띄우고 요청을 더 이상 보내지 않는다.
    if (!initialRender && voteListData.length <= 3) {
      increasePageNo(); // fetchData()는 위의 useEffect에 의해서 처리됨
    }
  }, [voteListData]);

  // --------------------------------- css 시작 ---------------------------------

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  };

  // ----------- 로딩중 스타일 -----------
  const loadingStyle = {
    // 디자인
    width: "100%",
    height: "604px",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // ----------- 문구 컨테이너 스타일 -----------
  const mainWordContainerStyle = {
    // 디자인
    padding: "100px 0",
    width: "100%",
    background: "#FFFFFF",
  };

  // ----------- 투표 리스트 컨테이너 스타일 -----------
  const mainVoteListContainerStyle = {
    // 디자인
    padding: "100px 0",
    width: "100%",
  };

  // --------------------------------- css 끝 ---------------------------------

  return (
    <>
      <Helmet>
        <title>골라쥬</title>
      </Helmet>

      {/* ----------- 투표 버튼 컴포넌트 ----------- */}
      <VoteButton />

      {/* ----------- 메인 콘텐츠 영역 ----------- */}
      <div style={bodyStyle}>
        {isLoading ? (
          <>
            {/* 로딩 중일 떄 */}
            <div
              style={loadingStyle}
              className="bg-gradient-to-tl from-blue-400 to-red-400"
            >
              <p>Loading...</p>
            </div>
          </>
        ) : (
          <>
            {/* 로딩 완료 시 */}
            <div className="bg-gradient-to-tl from-blue-400 to-red-400 w-full">
              {/* 스와이프 투표 컴포넌트 */}
              <SwipeVote
                voteList={voteListData}
                isLastPage={isLastPage}
                increasePageNo={increasePageNo}
              />
            </div>

            {/* 무작위 그룹의 선호도를 문구 컴포넌트 */}
            <div style={mainWordContainerStyle}>
              <MainWord />
            </div>

            {/* 메인 투표 리스트 컴포넌트 */}
            <div
              style={mainVoteListContainerStyle}
              onClick={(event) => {
                event.stopPropagation();
                if (!isLoggedIn) {
                  setLoginModalOpen();
                }
              }}
            >
              <MainVoteList />
            </div>
          </>
        )}
      </div>
      {/* ----------- 로그인, 회원가입, 투표 관련 모달 ----------- */}
      {isLoginModalOpened && <LoginModal></LoginModal>}
      {isSignupModalOpened && <SignupModal></SignupModal>}
      {isVoteDetailModalOpened && <VoteDetail />}
      {isVoteSimpleCreateModalOpened && <VoteSimple />}
      {isVoteProductCreateModalOpened && <VoteProduct />}
    </>
  );
};
export default MainPage;
```




```src\pages\MyPage.jsx
// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 컴포넌트 불러오기
import MyProfile from "../components/MyPage/MyProfile";
import MyActivities from "../components/MyPage/MyActivities";
import MyStatistics from "../components/MyPage/MyStatistics";

// react-helmet-async 라이브러리에서 Helmet을 import
import { Helmet } from "react-helmet-async";

const MyPage = () => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // ----------- 링크 목록 -----------
  const mypageLinkItems = [
    { to: "/Mypage", text: "내 프로필 요약" },
    { to: "/Mypage/MyActivities", text: "내 활동 요약" },
    { to: "/Mypage/MyStatistics", text: "내 통계 요약" },
  ];

  // --------------------------------- css 시작 ---------------------------------

  // ----------- 해더 스타일 -----------
  const headerStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    width: "100%",
    height: isXLarge || isLarge ? "200px" : "160px",
    whiteSpace: "nowrap", // 줄바꿈 방지

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  };

  // ----------- 해더 컨테이너 스타일 -----------
  const headerContainerStyle = {
    // 디자인
    width: isXLarge
      ? "1000px"
      : isLarge
      ? "740px"
      : isMedium
      ? "460px"
      : "375px",
    hegith: "200px",

    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
    alignItems: isXLarge || isLarge ? "flex-start" : "center",
    justifyContent: "center",
  };

  // ----------- 해더 제목 스타일 -----------
  const headerTitleStyle = {
    // 디자인
    marginBottom: "20px",

    // 글자
    color: "#000000",
  };

  // ----------- 해더 링크 컨테이너 스타일 -----------
  const headerLinkContainerStyle = {
    // 디자인
    height: "28.5px",
  };

  // ----------- 해더 링크 스타일 -----------
  const headerLinkStyle = {
    // 디자인
    marginRight: isXLarge || isLarge ? "30px" : "7.5px",
    marginLeft: isXLarge || isLarge ? "0" : "7.5px",

    // 글자
    color: "#000000",
    fontSize: isXLarge || isLarge ? "19px" : "16px",
    whiteSpace: "nowrap",
  };

  // ----------- 활성화 된 해더 링크 스타일 -----------
  const activeheaderLinkStyle = {
    // 상속
    ...headerLinkStyle,

    // 글자
    fontWeight: "bold",
  };

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    padding: "30px 0", // 상하단 여백: 50px
    width: isXLarge
      ? "1000px"
      : isLarge
      ? "740px"
      : isMedium
      ? "460px"
      : "375px",
    whiteSpace: "nowrap", // 줄바꿈 방지
  };

  // --------------------------------- css 끝 ---------------------------------

  const [isProfileActive, setIsProfileActive] = useState(true);
  const [isActivitiesActive, setIsActivitiesActive] = useState(false);
  const [isStatisticsActive, setIsStatisticsActive] = useState(false);

  const setIsActives = [
    setIsProfileActive,
    setIsActivitiesActive,
    setIsStatisticsActive,
  ];
  const isActives = [isProfileActive, isActivitiesActive, isStatisticsActive];
  const changeActiveLink = (activeIndex) => {
    setIsActives.forEach((item, index) => {
      setIsActives[index](index === activeIndex);
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 }); // 페이지 로드되면 최상단으로 가기
  }, []);

  return (
    <>
      <Helmet>
        <title>마이페이지</title>
      </Helmet>

      {/* ------------- Header ------------- */}
      <div
        style={headerStyle}
        className="bg-gradient-to-tl from-gray-200 to-[#FF9999]"
      >
        <div style={headerContainerStyle}>
          <p style={headerTitleStyle} className="fontsize-lg text-center">
            마이 페이지
          </p>
          <div style={headerLinkContainerStyle}>
            {mypageLinkItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                end
                style={({ isActive }) =>
                  isActive ||
                  (index == 1 &&
                    (window.location.pathname.startsWith(
                      "/Mypage/MyActivities/0"
                    ) ||
                      window.location.pathname.startsWith(
                        "/Mypage/MyActivities/1"
                      ) ||
                      window.location.pathname.startsWith(
                        "/Mypage/MyActivities/2"
                      )))
                    ? activeheaderLinkStyle
                    : headerLinkStyle
                }
                onClick={() => changeActiveLink(index)} // 함수를 래핑하여 전달
              >
                <span key={index}>{isActives[index] ? "☑" : "☐"}</span>{" "}
                {item.text}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* ------------- Body ------------- */}
      <div style={bodyStyle}>
        <Routes>
          <Route path="/" element={<MyProfile />} />
          <Route path="/MyActivities/*" element={<MyActivities />} />
          <Route path="/MyStatistics" element={<MyStatistics />} />
        </Routes>
      </div>
    </>
  );
};

export default MyPage;
```




```src\pages\StatisticPage.jsx
// 리액트 및 훅/라이브러리
import React, { useState, useEffect, useRef } from "react";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 커스텀 스토어를 이용한 상태 관리
import useModalStore from "/src/stores/modalState";

// 카테고리 데이터 불러오기
import categoryData from "/src/stores/categoryData";

// 통계 페이지 관련 컴포넌트
import StatisticPageChart from "../components/StatisticPage/StatisticPageChart";
import StatisticPageGroupItem from "../components/StatisticPage/StatisticPageGroupItem";

// 투표 페이지 관련 컴포넌트
import VoteSimple from "../components/VotePage/VoteSimple";
import VoteProduct from "../components/VotePage/VoteProduct";
import VoteButton from "../components/VoteButton";

// 이미지 가져오기
import questionMarkImg from "/assets/images/question_mark_img.png";

// react-helmet-async 라이브러리에서 Helmet을 import
import { Helmet } from "react-helmet-async";

const StatisticPage = () => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  //  ----------- 상세 설명 토글하기 위한 상태 -----------
  const [showDescription, setShowDescription] = useState(false);

  // ----------- 상태 토글 함수 -----------
  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  // ----------- 카테고리 드롭다운 state 관리 -----------
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);

  // ----------- 카테고리가 변경될 때 호출되는 함수 -----------
  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
    setIsOpen(false);
  };

  // ----------- 드롭다운 토글 함수 -----------
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // ----------- 드롭다운 버튼 ref -----------
  const dropdownButtonRef = useRef();
  const dropdownMenuRef = useRef();

  // ----------- 드롭다운 밖 클릭 시 메뉴 닫음 -----------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target) &&
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target)
      ) {
        // 클릭이 메뉴 버튼 및 메뉴 외부에 있으면 메뉴를 닫습니다.
        setIsOpen(false);
      }
    };

    // 페이지에 클릭 이벤트를 추가합니다.
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  // ----------- 사용자 유형 count state 관리 -----------
  const [itemCount, setItemCount] = useState(1);
  const isAddButtonActive = itemCount < 4;
  const isRemoveButtonActive = itemCount > 1;

  // ----------- 화면에 처음 접근할 때 스크롤이 내려가는 것을 막기 위한 상태 관리 -----------
  const isInitialMount = useRef(true);
  const isAddButtonClicked = useRef(false);

  // ----------- itemCount가 변경될 때마다 화면을 가장 아래로 스크롤 -----------
  useEffect(() => {
    // 초기 마운트 시에는 스크롤 이벤트를 발생시키지 않음
    if (!isInitialMount.current && isAddButtonClicked.current) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({ top: 0 }); // 페이지 로드되면 최상단으로 가기
      // 초기 마운트 이후 isInitialMount를 false로 설정
      isInitialMount.current = false;
    }
  }, [itemCount]);

  // ----------- 라디오 및 드롭다운 값이 변경될 때 해당 값을 객체 안에 추가 -----------
  const [selectedRadioValues, setSelectedRadioValues] = useState({});
  const [selectedDropdownValues, setSelectedDropdownValues] = useState({});

  const handleRadioChange = (label, number, value) => {
    setSelectedRadioValues((prevValues) => ({
      ...prevValues,
      [`${label}-${number}`]: value,
    }));
  };

  const handleDropdownChange = (label, number, value) => {
    setSelectedDropdownValues((prevValues) => ({
      ...prevValues,
      [`${label}-${number}`]: value,
    }));
  };

  // ----------- 버튼 클릭 시 사용자 유형 추가 및 제거하는 함수 -----------
  const handleAddButtonClick = () => {
    if (itemCount < 4) {
      setItemCount((prevCount) => prevCount + 1);
      isAddButtonClicked.current = true; // 버튼 클릭 시 화면이 내려갈 수 있게 함
    }
  };

  const handleRemoveButtonClick = () => {
    if (itemCount > 1) {
      setItemCount((prevCount) => prevCount - 1);

      // ----------- 사용자 유형 제거 시 객채에서 정보 제거 -----------
      delete selectedRadioValues[`나이-${itemCount}`];
      delete selectedRadioValues[`성별-${itemCount}`];
      delete selectedDropdownValues[`소비성향-${itemCount}`];
    }
  };

  // --------------------------------- css 시작 ---------------------------------

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    padding: "30px 0", // 상하단 여백: 50px
    width: isXLarge
      ? "1000px"
      : isLarge
      ? "740px"
      : isMedium
      ? "460px"
      : "375px",
    whiteSpace: "nowrap", // 줄바꿈 방지
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom: isXLarge
      ? "50px"
      : isLarge
      ? "45px"
      : isMedium
      ? "40px"
      : "375px",
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
    height: isXLarge ? "45px" : isLarge ? "40px" : isMedium ? "35px" : "30px",
  };

  // ----------- 제목 스타일 -----------
  const titleTextStyle = {
    // 디자인
    marginTop: "5px",
    marginRight: "5px",
  };

  // ----------- 물음표 스타일 -----------
  const questionMarkStyle = {
    // 디자인
    margin: "0 5px",
    width: "16px",
    height: "16px",
  };

  // ----------- 설명 스타일 -----------
  const descriptionStyle = {
    // 디자인
    padding: "2px 5px 0",
    borderRadius: "3px",
    backgroundColor: "#6B6B6B",

    // 글자
    fontSize: "13px",
    color: "#FFFFFF",
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const contentsContainerStyle = {
    // 디자인
    padding: isXLarge ? "40px" : isLarge ? "35px" : isMedium ? "30px" : "25px",
    borderRadius: isXLarge
      ? "50px"
      : isLarge
      ? "40px"
      : isMedium
      ? "30px"
      : "20px",
    background: "#FFFFFF",
  };

  // ----------- 드롭다운 컨테이너 스타일 -----------
  const dropdownContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: isXLarge ? "center" : "flex-start",
    flexDirection: isXLarge ? "row" : "column",
  };

  // ----------- 서브 제목 스타일 -----------
  const subTitleStyle = {
    // 디자인
    marginTop: "3px",
  };

  // ----------- relative 컨테이너 스타일 -----------
  const relativeContainerStyle = {
    // 위치
    position: "relative",

    // 디자인
    margin: isXLarge
      ? "0 10px"
      : isLarge
      ? "0 8px"
      : isMedium
      ? "0 6px"
      : "0 4px",
  };

  // ----------- 드롭다운 버튼 스타일 -----------
  const dropdownButtonStyle = {
    // 디자인
    padding:
      isXLarge || isLarge
        ? "0px 10px 0px 14px"
        : isMedium
        ? "0px 10px 0px 12px"
        : "0 10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: isXLarge || isLarge ? "110px" : isMedium ? "105px" : "100px",
    height: isXLarge || isLarge ? "50px" : isMedium ? "40px" : "35px",
    cursor: "pointer",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- 드롭다운 스타일 -----------
  const dropdownStyle = {
    // 디자인
    width: "100%",

    // 글자
    fontSize: isXLarge || isLarge ? "16px" : isMedium ? "15px" : "14px",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  // ----------- 화살표 스타일 -----------
  const arrowStyle = {
    // 글자
    fontFamily: "GmarketSansBold",
    fontWeight: "bold",
  };

  // ----------- 드롭다운 메뉴 스타일 -----------
  const dropdownMenuStyle = {
    // 위치
    position: "absolute",
    left: 0,
    zIndex: 1,

    // 디자인
    marginTop: "4px",
    padding: isXLarge || isLarge ? "0 7px" : isMedium ? "0 6px" : "0 5px",
    width: isXLarge || isLarge ? "110px" : isMedium ? "105px" : "100px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#FFFFFF",
  };

  // ----------- 드롭다운 아이템 스타일 -----------
  const dropdownItemStyle = {
    // 디자인
    margin: isXLarge
      ? "8px 0"
      : isLarge
      ? "7px 0"
      : isMedium
      ? "6px 0"
      : "5px 0",
    padding: isXLarge ? "8px" : isLarge ? "7px" : isMedium ? "6px" : "5px",
    cursor: "pointer",

    // 글자
    fontSize: isXLarge || isLarge ? "16px" : isMedium ? "14px" : "12px",
  };

  // ----------- 쉼표 스타일 -----------
  const restStyle = {
    // 디자인
    marginRight: isXLarge ? "10px" : "0",
  };

  // ----------- 구분선 스타일 -----------
  const barStyle = {
    // 디자인
    margin: isXLarge
      ? "30px 0"
      : isLarge
      ? "25px 0"
      : isMedium
      ? "20px 0"
      : "15px 0",
    width: "100%",
    height: "3px",
    backgroundColor: "#F0F0F0",
  };

  // ----------- 차트 컨테이너 스타일 -----------
  const chartContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    marginTop: "20px",

    // 컨텐츠 정렬
    justifyContent: "center",
  };

  // ----------- 그룹 컨테이너 스타일 -----------
  const groupContainerStyle = {
    // 상속
    ...subTitleStyle,

    // 디자인
    marginBottom: "20px",
  };

  // ----------- 추가 버튼 컨테이너 스타일 -----------
  const addButtonContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 컨텐츠 정렬
    justifyContent: "center",
  };

  // ----------- 추가 버튼 스타일 -----------
  const addButtonStyle = {
    width: isXLarge ? "70px" : isLarge ? "60px" : isMedium ? "50px" : "40px",
    height: isXLarge ? "70px" : isLarge ? "60px" : isMedium ? "50px" : "40px",
    fontSize: isXLarge ? "44px" : isLarge ? "38px" : isMedium ? "32px" : "26px",
  };

  // --------------------------------- css 끝 ---------------------------------

  // ------------- 투표 생성 버튼 모달과 관련된 함수 -----------
  const isVoteSimpleCreateModalOpened = useModalStore(
    (state) => state.isVoteSimpleCreateModalOpened
  );
  const isVoteProductCreateModalOpened = useModalStore(
    (state) => state.isVoteProductCreateModalOpened
  );

  return (
    <>
      <Helmet>
        <title>통계보여쥬</title>
      </Helmet>

      {/* ------------- 투표 버튼 ------------- */}
      <VoteButton />

      {/* ------------- Body ------------- */}
      <div style={bodyStyle}>
        <div style={containerStyle}>
          <div style={titleContainerStyle}>
            <span style={titleTextStyle} className="fontsize-lg">
              # 선호 태그 통계
            </span>
            <img
              src={questionMarkImg}
              style={questionMarkStyle}
              alt="물음표"
              className="cursor-pointer rounded-full"
              onClick={toggleDescription}
              onMouseOver={() => setShowDescription(true)}
              onMouseOut={() => setShowDescription(false)}
            />
            <p
              style={{
                ...descriptionStyle,
                visibility: showDescription ? "visible" : "hidden",
              }}
            >
              사용자 유형별 태그 선호도 비교
            </p>
          </div>
          <div style={contentsContainerStyle}>
            {/* ------------- 드롭다운 버튼 ------------- */}
            <div style={dropdownContainerStyle}>
              <div style={flexContainerStyle}>
                <div style={subTitleStyle} className="fontsize-md">
                  다른 사람들은
                </div>
                <div style={relativeContainerStyle}>
                  <div
                    onClick={toggleDropdown}
                    style={dropdownButtonStyle}
                    ref={dropdownButtonRef}
                  >
                    <div style={dropdownStyle}>
                      {selectedCategoryId !== null
                        ? categoryData.find(
                            (c) => c.id === parseInt(selectedCategoryId)
                          )?.name
                        : categoryData[1].name}
                      {isOpen ? (
                        <span style={arrowStyle}>∧</span>
                      ) : (
                        <span style={arrowStyle}>∨</span>
                      )}
                    </div>
                  </div>
                  {isOpen && (
                    <div style={dropdownMenuStyle} ref={dropdownMenuRef}>
                      {categoryData.map(
                        (category) =>
                          // 첫 번째(전체), 마지막(간단) 투표 항목은 포함하지 않음
                          category.id !== 0 &&
                          category.id !== 5 && (
                            <div
                              key={category.id}
                              onClick={() =>
                                handleCategoryChange({
                                  target: { value: category.id },
                                })
                              }
                              onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#FFE69C")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "#FFFFFF")
                              }
                              style={dropdownItemStyle}
                            >
                              {category.name}
                            </div>
                          )
                      )}
                    </div>
                  )}
                </div>
                <div style={subTitleStyle} className="fontsize-md">
                  {selectedCategoryId === 1 || selectedCategoryId === 2
                    ? "를"
                    : "을"}{" "}
                  구매 할 때
                </div>
                <div style={restStyle} className="fontsize-md">
                  ,
                </div>
              </div>
              <div style={subTitleStyle} className="fontsize-md">
                어떤 요소를 중요하게 생각할까?
              </div>
            </div>

            {/* ------------- 차트 그래프 ------------- */}
            <div style={chartContainerStyle}>
              <StatisticPageChart
                selectedCategoryId={selectedCategoryId}
                itemCount={itemCount}
                selectedRadioValues={selectedRadioValues}
                selectedDropdownValues={selectedDropdownValues}
              />
            </div>

            <div style={barStyle}></div>

            {/* ------------- 사용자 그룹 선택 ------------- */}
            <div style={groupContainerStyle} className="fontsize-lg">
              사용자 그룹 선택
            </div>
            <div>
              {[...Array(itemCount)].map((_, index) => (
                <StatisticPageGroupItem
                  key={index}
                  number={index + 1}
                  onRadioChange={handleRadioChange}
                  onDropdownChange={handleDropdownChange}
                />
              ))}
              <div style={addButtonContainerStyle}>
                <button
                  style={{
                    ...addButtonStyle,
                    opacity: isAddButtonActive ? 1 : 0.5,
                  }}
                  onClick={handleAddButtonClick}
                  disabled={!isAddButtonActive} // 4개 이상일 시 버튼 비활성화
                >
                  +
                </button>
                {itemCount > 1 && (
                  <button
                    style={{
                      ...addButtonStyle,
                      opacity: isRemoveButtonActive ? 1 : 0.5,
                    }}
                    onClick={handleRemoveButtonClick}
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isVoteSimpleCreateModalOpened && <VoteSimple></VoteSimple>}
      {isVoteProductCreateModalOpened && <VoteProduct></VoteProduct>}
    </>
  );
};

export default StatisticPage;
```




```src\pages\TestPage.jsx
// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 커스텀 스토어를 이용한 상태 관리
import useAuthStore from "/src/stores/userState";
import useModalStore from "/src/stores/modalState";

// 소비성향 결과 컴포넌트
import TestItem from "../components/TestItem";

// 이미지 가져오기
import mainImg from "/assets/images/sobiTest/tmp_mainImg.png";

// Material-UI에서 제공하는 LinearProgress 및 스타일링 관련 컴포넌트
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const TestPage = () => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  const navigate = useNavigate();
  const location = useLocation();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  const questions = [
    "힘찬 하루를 다짐하며 시계를 보니 벌써 9시를 넘긴 시간, 지각하는 동기를 본 나는?",
    "외부 미팅을 진행하는 중... 갑자기 부장님이 째려보시는 것 같은데...?",
    "미팅을 마치고 내 자리에 앉아 열심히 일하는 중 들려오는 동료의 과자 먹는 소리!",
    "오전 일을 일찍 끝마치고 남는 시간, 점심 뭐 먹지..? 고민하는 나는…",
    "점심 식사 뒤 커피 수혈은 필수, 병원에서는 커피를 너무 많이 마시니 줄이라고 했었는데...",
    "사무실로 들어와 자료를 복사하기 위해 복사기로 향하는 나는...",
    "친하게 지내는 동기가 복권을 들고 기대에 부풀어 있을 때",
    "퇴근 후 친구와 쇼핑하려고 만났는데 친구가 안 어울리는 옷을 입고 와서 나에게 어떠냐고 물으면...",
    "의류 매장으로 들어가 바지를 입는 중, 어라...? 원래 맞던 사이즈인데... 잘 안 들어간다...?!",
    "바지를 구입 후, 명품관으로 가는 친구. 요즘 사치가 조금 심한 것 같은데...",
    "쇼핑을 마치고 매장을 나오던 중, 갖고싶은 한정판이 딱 하나 남았는데 이번 달 예산이 빠듯하면...",
    "친구와 헤어진 뒤 집으로 돌아온 나, 방에 들어가 쇼핑한 짐을 푸는데...",
  ];

  const answers = [
    [
      '"떼잉 쯧쯧..." 사무실 내 자리에 앉아 혀를 끌끌 찬다.',
      '"어.. 너도..?" 지하철 안 동기 옆자리에서 나란히 가고 있다.',
    ],
    [
      "'뭐지? 내가 너무 쓸데없는 말까지 한 건가?' 말을 너무 많이 한 것 같아 후회한다.",
      "'내가 아무런 말이 없어서 화가 나셨나...?' 나의 생각을 이야기하지 않은 것을 후회한다.",
    ],
    [
      "적막한 것보다는 어느 정도의 소리가 자극이 되기도 한다.",
      "나는 시끄러운 환경에서는 일을 제대로 할 수 없다.",
    ],
    [
      "리뷰를 찾아보고 평점이 높은 음식점을 고른다.",
      '"음... 일단 나가면 뭐라도 있겠지?" 감을 믿고 일단 나간다',
    ],
    [
      "'아쉽지만 건강을 위한 일이니까...' 커피가 안 들어간 음료를 마신다.",
      "'커피는 내 삶의 일부인 걸...?' 아메리카노 더블샷을 주문한다.",
    ],
    [
      '"점심 맛있게 먹었어요?" 지나가는 모든 직원에게 인사하며 말을 건다.',
      "'양면을 할까 단면을 할까...?' 목표는 오직 복사 뿐, 복사기로 직진한다.",
    ],
    [
      '"그거 당첨되어도 서울에 집 못 살텐데..." 현실적인 얘기를 해준다.',
      '"당첨되면 나는 노트북 하나면 돼~" 한 술 더 뜬다.',
    ],
    [
      '"그거 돈 주고 산 거 맞아...?" 직설적으로 말한다.',
      '"와.너.무.잘.어.울.려" 기분 좋은 말이라도 해준다.',
    ],
    [
      "현실과 타협해 지금 입기 적절한 바지를 산다.",
      "나는 다이어트에 성공할 수 있다. 이전에 입던 사이즈를 고수한다.",
    ],
    [
      '"너 돈이 참 많구나?" 할 말은 한다.',
      "'그럴만한 이유가 있겠지...?' 좋게좋게 생각한다.",
    ],
    [
      '"돈 없는 거렁뱅이가 뭘 사..." 아쉽지만 다음 기회를 노린다.',
      '"지금 아니면 언제 사겠어?"... 일단 할부로 지르고 본다.',
    ],
    [
      "바지는 접어서 서랍에, 패딩은 행거로... 모든 물건을 깔끔하게 정리한다.",
      "쇼핑백을 바닥에 던져두고 다음에 입을 때까지 열어보지 않는다.",
    ],
  ];

  const cheeringPhrase = [
    "나의 소비성향 알아보기 시-작",
    "영-차! 영-차!",
    "절반이 넘었어요!!",
    "곧 끝나요!!!",
  ];

  // question, answer를 "" 표시에서 자르거나 글자 길이로 자르거나 보기 편하게 수정하는 과정 필요함 => width 픽셀 고정으로 어느 정도 해결, 완전히는 아님

  const [response, setResponse] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(-1);

  // TODO 테스트 페이지에서 벗어날 때, 회원가입이 진행되지 않는다는 알림창이 뜨도록 하고 싶음

  const handleResponse = (answerType) => {
    // console.log(questionNumber, answerType);
    setResponse((prevResponse) => {
      return [...prevResponse, answerType];
    });
    setQuestionNumber(questionNumber + 1);
  };

  const signUp = (memberInfo) => {
    const isSocialLogin = document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("gollajyu-cookie="));

    if (isSocialLogin) {
      // 소셜로그인인데, 신규가입자인 경우
      const socialMemberInfo = {
        email: memberInfo.email,
        nickname: memberInfo.nickname,
        year: memberInfo.year,
        month: memberInfo.month,
        day: memberInfo.day,
        gender: memberInfo.gender == "F" ? "FEMALE" : "MALE",
        typeId: memberInfo.typeId,
      };
      // console.log(socialMemberInfo);
      axios
        .put(API_URL + "/members", socialMemberInfo)
        .then((response) => {
          // console.log("소셜로그인 회원가입:", response);
          if (!response.data.header.result) {
            // console.log(response.data.header.message);
            navigate("/");
            window.alert("회원가입되지 않았음, 콘솔창 확인 바람");
          } else {
            window.alert(`${memberInfo.nickname}님 회원가입을 환영합니다.`);
            const data = {
              email: memberInfo.email,
              password: memberInfo.password,
            };
            logIn(data);
          }
          document.cookie =
            "gollajyu-cookie" +
            "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        })
        .catch((err) => {
          // console.log("회원가입 에러");
          // console.log(err);
        });
    } else {
      // 일반 신규 가입자인 경우
      axios
        .post(API_URL + "/members", memberInfo)
        .then((response) => {
          // console.log(response);
          if (!response.data.header.result) {
            // console.log(response.data.header.message);
            navigate("/");
            window.alert("회원가입되지 않았음, 콘솔창 확인 바람");
          } else {
            window.alert(`${memberInfo.nickname}님 회원가입을 환영합니다.`);
            const data = {
              email: memberInfo.email,
              password: memberInfo.password,
            };
            logIn(data);
          }
        })
        .catch((err) => {
          // console.log("회원가입 에러");
          // console.log(err);
        });
    }
  };

  const logIn = (data) => {
    axios
      .post(API_URL + "/members/login", data, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log("로그인 완료");
        setLoggedIn(response.data.body);
        // 로그인 후, 테스트 결과 페이지로 이동
        navigate("/TestResultPage");
      })
      .catch((err) => {
        // console.log("로그인 과정에서 에러남");
        // console.log(err);
      });
  };

  const goResultPage = () => {
    const getMBTI = (response) => {
      const MBTI = {
        ISTP: 1,
        ISFP: 2,
        ESTP: 3,
        ESFP: 4,
        ISTJ: 5,
        ISFJ: 6,
        ESFJ: 7,
        ESTJ: 8,
        INTJ: 9,
        INTP: 10,
        ENTJ: 11,
        ENTP: 12,
        INFJ: 13,
        INFP: 14,
        ENFJ: 15,
        ENFP: 16,
      };

      const EI = response[1] + response[2] + response[5] < 2 ? "E" : "I",
        SN = response[4] + response[6] + response[8] < 2 ? "S" : "N",
        TF = response[7] + response[9] + response[10] < 2 ? "T" : "F",
        JP = response[0] + response[3] + response[11] < 2 ? "J" : "P";
      // console.log(EI + SN + TF + JP);
      return MBTI[EI + SN + TF + JP];
    };

    // 테스트 결과(typeId)를 memberInfo에 담아서 회원가입 및 로그인 시키기
    const memberInfo = location.state.memberInfo;
    const result = getMBTI(response);
    memberInfo.typeId = result;
    // console.log(memberInfo);
    signUp(memberInfo);
  };

  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 6,
    borderRadius: 5,
    // transition: "all 2s",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "lightgrey",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#FFD257",
      animationDuration: "10s",
    },
  }));

  // --------------------------------- css 시작 ---------------------------------

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    padding: "30px 0", // 상하단 여백: 50px
    width: isXLarge
      ? "1000px"
      : isLarge
      ? "740px"
      : isMedium
      ? "460px"
      : "375px",
    // whiteSpace: "nowrap", // 줄바꿈 방지

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "center",
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const contentContainerStyle = {
    // 디자인
    padding: isXLarge ? "40px" : isLarge ? "35px" : isMedium ? "30px" : "25px",
    width: isXLarge ? "50%" : isLarge ? "60%" : "80%",
    height: isXLarge
      ? "750px"
      : isLarge
      ? "675px"
      : isMedium
      ? "600px"
      : "525px",
    borderRadius: isXLarge
      ? "50px"
      : isLarge
      ? "40px"
      : isMedium
      ? "30px"
      : "20px",
    background: "#FFFFFF",
  };

  // ----------- 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    height: isXLarge
      ? "670px"
      : isLarge
      ? "605px"
      : isMedium
      ? "540px"
      : "475px",

    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const imgStyle = {
    padding: "0 40px",
  };

  // --------------------------------- css 끝 ---------------------------------

  return (
    <>
      <div style={bodyStyle}>
        <div style={contentContainerStyle}>
          <div>
            {questionNumber === -1 ? (
              <div style={containerStyle}>
                <h1 className="text-center fontsize-lg">
                  <span className="text-sky-600 fontsize-lg">선택</span>
                  으로 알아보는
                  <br />
                  <span className="text-lime-500 fontsize-lg">
                    소비성향
                  </span>{" "}
                  테스트
                </h1>
                <img style={imgStyle} src={mainImg} alt="" />
                <button
                  className="border rounded-full p-4 w-2/3 bg-amber-300 hover:bg-amber-400"
                  onClick={() => {
                    setQuestionNumber(questionNumber + 1);
                  }}
                >
                  테스트 시작하기
                </button>
              </div>
            ) : null}
            {questionNumber >= 0 && questionNumber <= 11 ? (
              <>
                <div>
                  <div className="mx-auto mb-5 max-w-lg transition ease-in duration-300">
                    <div className="flex justify-between">
                      <p className="fontsize-xs">
                        {cheeringPhrase[Math.floor(questionNumber / 3)]}
                      </p>
                      <p className="fontsize-xs">{questionNumber + 1} /12</p>
                    </div>
                    <BorderLinearProgress
                      className=""
                      variant="determinate"
                      value={((questionNumber + 1) / 12) * 100}
                      // 애니메이션 적용 (후순위) -> 쉽지 않음
                    />
                  </div>
                  <TestItem
                    data={{
                      answer: answers[questionNumber],
                      question: questions[questionNumber],
                    }}
                    handleResponse={handleResponse}
                  />
                </div>
              </>
            ) : null}
            {questionNumber === 12 ? (
              <div
                style={containerStyle}
                className="flex flex-col items-center space-y-10 sm:space-y-16"
              >
                <p className="text-center fontsize-lg">
                  <span className="text-rose-500 fontsize-lg">두근두근</span>
                  <br />
                  당신의{" "}
                  <span className="text-lime-500 fontsize-lg">소비성향</span>은?
                </p>
                <img style={imgStyle} src={mainImg} alt="" />
                <button
                  className="border rounded-full p-4 w-2/3 bg-amber-300 hover:bg-amber-400"
                  onClick={() => {
                    goResultPage();
                  }}
                >
                  결과 보러가기
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestPage;
```




```src\pages\TestResultPage.jsx
// 리액트 및 훅/라이브러리
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 커스텀 스토어를 이용한 상태 관리
import useAuthStore from "/src/stores/userState";
import useModalStore from "/src/stores/modalState";

// 투표 관련 컴포넌트
import VoteButton from "../components/VoteButton";
import TestResultHeader from "../components/TestResultHeader";
import VoteSimple from "../components/VotePage/VoteSimple";
import VoteProduct from "../components/VotePage/VoteProduct";

// 소비성향 데이터 가져오기
import sobiTIData from "/src/stores/testResultData.js";

// 이미지 가져오기
import questionMarkImg from "/assets/images/question_mark_img.png";

// react-helmet-async 라이브러리에서 Helmet을 import
import { Helmet } from "react-helmet-async";

import { debounce } from "lodash";

const items = [
  "프렌치 마카롱",
  "티라미수",
  "포춘쿠키",
  "지하철 만쥬",
  "곤약젤리",
  "오곡라떼",
  "콜라",
  "고구마 말랭이",
  "붕어빵",
  "나초",
  "에너지바",
  "슈크림",
  "우유식빵",
  "민트초코",
  "초코파이",
  "초코잼",
];

const TestResultPage = () => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  //  ----------- 상세 설명 토글하기 위한 상태 -----------
  const [showDescription, setShowDescription] = useState(false);

  // ----------- 상태 토글 함수 -----------
  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  // ------------- 투표 생성 버튼 모달과 관련된 함수 -----------
  const isVoteSimpleCreateModalOpened = useModalStore(
    (state) => state.isVoteSimpleCreateModalOpened
  );
  const isVoteProductCreateModalOpened = useModalStore(
    (state) => state.isVoteProductCreateModalOpened
  );

  const [isMyResult, setIsMyResult] = useState(true);
  const [result, setResult] = useState(1);
  const [matchingData, setMatchingData] = useState({});

  useEffect(() => {
    // 네비게이션 바 또는 마이페이지를 통해서 소비성향알려쥬로 진입했을 경우
    if (isMyResult) {
      setResult(user.typeId);
      setMatchingData(sobiTIData.find((data) => data.id === user.typeId));
    }
  }, []);

  useEffect(() => {
    // 소비성향 아이템 클릭 시, 해당 결과 렌더링
    window.scrollTo({ top: 0 });
    setMatchingData(sobiTIData.find((data) => data.id === result));
  }, [result]);

  // --------------------------------- css 시작 ---------------------------------

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    padding: "30px 0", // 상하단 여백: 50px
    width: isXLarge
      ? "1000px"
      : isLarge
      ? "740px"
      : isMedium
      ? "460px"
      : "375px",
    // whiteSpace: "nowrap", // 줄바꿈 방지
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom: isXLarge
      ? "50px"
      : isLarge
      ? "45px"
      : isMedium
      ? "40px"
      : "375px",
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
    height: isXLarge ? "45px" : isLarge ? "40px" : isMedium ? "35px" : "30px",
  };

  // ----------- 제목 스타일 -----------
  const titleTextStyle = {
    // 디자인
    marginTop: "5px",
    marginRight: "5px",
  };

  // ----------- 물음표 스타일 -----------
  const questionMarkStyle = {
    // 디자인
    margin: "0 5px",
    width: "16px",
    height: "16px",
  };

  // ----------- 설명 스타일 -----------
  const descriptionStyle = {
    // 디자인
    padding: "2px 5px 0",
    borderRadius: "3px",
    backgroundColor: "#6B6B6B",

    // 글자
    fontSize: "13px",
    color: "#FFFFFF",
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const contentsContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    padding: isXLarge ? "40px" : isLarge ? "35px" : isMedium ? "30px" : "25px",
    borderRadius: isXLarge
      ? "50px"
      : isLarge
      ? "40px"
      : isMedium
      ? "30px"
      : "20px",
    background: "#FFFFFF",

    // 컨텐츠 정렬
    flexDirection: "column",
  };

  // ----------- 조합 컨테이너 스타일 -----------
  const combinationContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    margin: "20px 0 40px 0",
    width: "100%",

    // 컨텐츠 정렬
    flexDirection: isXLarge || isLarge ? "row" : "column",
  };

  // ----------- 조합 아이템 스타일 -----------
  const combinationItemrStyle = {
    // 디자인
    width: isXLarge || isLarge ? "50%" : "100%",
  };

  // ----------- 왼쪽 아이템 스타일 -----------
  const combinationLeftItemrStyle = {
    // 상속
    ...combinationItemrStyle,

    // 디자인
    marginRight: isXLarge || isLarge ? "10px" : "0px",
    marginBottom: isXLarge || isLarge ? "0px" : "10px",
  };

  // ----------- 오른쪽 아이템 스타일 -----------
  const combinationRightItemrStyle = {
    // 상속
    ...combinationItemrStyle,

    // 디자인
    marginLeft: isXLarge || isLarge ? "10px" : "0px",
    marginTop: isXLarge || isLarge ? "0px" : "10px",
  };

  // --------------------------------- css 끝 ---------------------------------

  return (
    <>
      <Helmet>
        <title>소비성향알려쥬</title>
      </Helmet>

      {/* ------------- 투표 버튼 ------------- */}
      <VoteButton />

      {/* ------------- Body ------------- */}
      <div style={bodyStyle}>
        <div style={containerStyle}>
          <div style={titleContainerStyle}>
            <span style={titleTextStyle} className="fontsize-lg">
              {isMyResult ? "# 나의 결과" : "# 모든 결과 유형"}
            </span>
            <img
              src={questionMarkImg}
              style={questionMarkStyle}
              alt="물음표"
              className="cursor-pointer rounded-full"
              onClick={toggleDescription}
              onMouseOver={() => setShowDescription(true)}
              onMouseOut={() => setShowDescription(false)}
            />
            <p
              style={{
                ...descriptionStyle,
                visibility: showDescription ? "visible" : "hidden",
              }}
            >
              {isMyResult ? "소비성향 테스트 결과" : "다른 소비성향 목록"}
            </p>
          </div>
          <div style={contentsContainerStyle}>
            {isMyResult ? (
              <></>
            ) : (
              <div className="flex flex-wrap mb-5 w-4/5 justify-center">
                {items.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={`m-1 px-3 py-2 border border-amber-200 rounded-lg ${
                        result === index + 1 ? `bg-amber-300` : ""
                      }`}
                      onClick={() => {
                        setResult(index + 1);
                      }}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            )}
            {matchingData && (
              <>
                <TestResultHeader data={matchingData} result={result} />
                <div
                  id="description"
                  className="bg-stone-100 p-10 rounded-lg break-keep"
                >
                  {matchingData.description?.map((item, index) => (
                    <li className="p-2 fontsize-sm" key={index}>
                      {item}
                    </li>
                  ))}
                </div>

                <div style={combinationContainerStyle}>
                  <div
                    id="good_chemi"
                    style={combinationLeftItemrStyle}
                    className="p-3 bg-stone-50 flex flex-col border rounded-lg"
                  >
                    <p className="fontsize-md my-4 px-2">
                      <span className="fontsize-md text-red-400 font-bold">
                        환상
                      </span>
                      의 조합
                    </p>
                    <div className="p-3">
                      <p className="fontsize-sm">
                        {sobiTIData.find(
                          (data) => data.id === matchingData.good_chemi
                        )?.subTitle || null}
                      </p>
                      <p className="fontsize-md font-bold">
                        {sobiTIData.find(
                          (data) => data.id === matchingData.good_chemi
                        )?.title || null}
                      </p>
                    </div>
                  </div>
                  <div
                    id="bad_chemi"
                    style={combinationRightItemrStyle}
                    className="p-3 bg-stone-50 flex flex-col border rounded-lg"
                  >
                    <p className="fontsize-md my-4 px-2">
                      <span className="fontsize-md text-blue-600 font-bold">
                        환장
                      </span>
                      의 조합
                    </p>
                    <div className="p-3">
                      <p className="fontsize-sm">
                        {sobiTIData.find(
                          (data) => data.id === matchingData.bad_chemi
                        )?.subTitle || null}
                      </p>
                      <p className="fontsize-md font-bold">
                        {sobiTIData.find(
                          (data) => data.id === matchingData.bad_chemi
                        )?.title || null}
                      </p>
                    </div>
                  </div>
                </div>

                {isMyResult ? (
                  <>
                    <button
                      className="w-2/5 xs:w-1/2 p-5 rounded-full bg-amber-300 hover:bg-amber-400 fontsize-sm"
                      onClick={() => {
                        setIsMyResult(false);
                        window.scrollTo({ top: 0 });
                      }}
                    >
                      모든 결과 보기
                    </button>
                    <button
                      className="fontsize-sm hover:font-bold mt-10"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      메인페이지로 가기
                    </button>
                  </>
                ) : (
                  <button
                    className="hover:font-bold"
                    onClick={() => {
                      window.scrollTo({ top: 0 });
                    }}
                  >
                    TOP
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {isVoteSimpleCreateModalOpened && <VoteSimple></VoteSimple>}
      {isVoteProductCreateModalOpened && <VoteProduct></VoteProduct>}
    </>
  );
};

export default TestResultPage;
```




```src\pages\VotePage.jsx
// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from "react";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 커스텀 스토어를 이용한 상태 관리
import useAuthStore from "/src/stores/userState";
import useModalStore from "/src/stores/modalState";

// 투표 페이지 관련 컴포넌트
import VotePageHeader from "../components/VotePage/VotePageHeader";
import VotePageList from "../components/VotePage/VotePageList";
import VoteSimple from "../components/VotePage/VoteSimple";
import VoteProduct from "../components/VotePage/VoteProduct";
import VoteButton from "../components/VoteButton";

// 투표 모달 컴포넌트
import VoteDetail from "../components/VoteDetailPage/VoteDetail";

// react-helmet-async 라이브러리에서 Helmet을 import
import { Helmet } from "react-helmet-async";

const VotePage = () => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  const user = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [voteListData, setVoteListData] = useState(null);
  const [prevVoteList, setPrevVoteList] = useState();
  const [sortType, setSortType] = useState("latest"); // 추가된 부분

  // 정렬 함수
  const handleSort = (type) => {
    try {
      let sortedData;
      if (type === "popular") {
        sortedData = voteListData
          .slice()
          .sort((a, b) => b.likesCnt - a.likesCnt);
      } else {
        sortedData = prevVoteList ? prevVoteList.slice() : [];
      }
      setVoteListData(sortedData);
      setSortType(type);
    } catch (error) {
      console.error("정렬 또는 검색 중 오류 발생:", error);
    }
  };

  // 검색 카테고리
  const [searchCategory, setSearchCategory] = useState(0);

  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState(null);
  // 검색 함수
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const searchData = await fetchData(searchCategory, searchTerm);
      await setVoteListData(searchData.body.voteList);
      await setPrevVoteList(searchData.body.voteList);
      setIsLoading(false);
      // console.log(searchCategory, searchTerm);
    } catch (error) {
      // 오류 처리
      console.error("데이터 가져오기 실패:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0 }); // 페이지 로드되면 최상단으로 가기
    // Fetch data when the page is turned on
    handleSearch();
    // console.log("렌더링");
  }, []);

  // searchCategory와 searchTerm을 매개변수로 받는 함수
  const fetchData = async (categoryId, keyword) => {
    try {
      // GET 요청 보내기
      const response = await axios.get(`${API_URL}/votes/search`, {
        params: {
          categoryId: categoryId, // 클라이언트 파라미터명을 서버의 요청 핸들러 메서드 파라미터명에 맞춤
          keyword: keyword, // 클라이언트 파라미터명을 서버의 요청 핸들러 메서드 파라미터명에 맞춤
        },
      });
      // 성공적으로 받은 데이터 처리
      // console.log("데이터 가져오기 성공:", response.data);
      return response.data; // 요청한 데이터 반환
    } catch (error) {
      // 오류 처리
      console.error("데이터 가져오기 실패:", error);
      throw error; // 오류 다시 던지기
    }
  };

  // ------------- 투표 생성 버튼 모달과 관련된 함수 -----------
  const isVoteDetailModalOpened = useModalStore(
    (state) => state.isVoteDetailModalOpened
  );
  const isVoteSimpleCreateModalOpened = useModalStore(
    (state) => state.isVoteSimpleCreateModalOpened
  );
  const isVoteProductCreateModalOpened = useModalStore(
    (state) => state.isVoteProductCreateModalOpened
  );

  // --------------------------------- css 시작 ---------------------------------

  // ----------- 해더 스타일 -----------
  const headerStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    width: "100%",
    height: isXLarge || isLarge ? "200px" : "160px",
    whiteSpace: "nowrap", // 줄바꿈 방지

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "center",
  };

  // ----------- 해더 컨테이너 스타일 -----------
  const headerContainerStyle = {
    // 디자인
    width: isXLarge
      ? "1000px"
      : isLarge
      ? "740px"
      : isMedium
      ? "460px"
      : "375px",
    hegith: "200px",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
  };

  // ----------- 해더 제목 스타일 -----------
  const headerTitleStyle = {
    // 디자인
    marginBottom: "20px",

    // 글자
    color: "#000000",

    // 컨텐츠 정렬
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "space-between",
  };

  // ----------- 해더 링크 컨테이너 스타일 -----------
  const headerLinkContainerStyle = {
    // 디자인
    height: "28.5px",
  };

  // ----------- 해더 링크 스타일 -----------
  const headerLinkStyle = {
    // 디자인
    marginRight: isXLarge || isLarge ? "30px" : "15px",

    // 글자
    color: "#000000",
    fontSize: isXLarge || isLarge ? "19px" : "16px",
    whiteSpace: "nowrap",
  };

  // ----------- 활성화 된 해더 링크 스타일 -----------
  const activeheaderLinkStyle = {
    // 상속
    ...headerLinkStyle,

    // 글자
    fontWeight: "bold",
  };

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    padding: "30px 0", // 상하단 여백: 50px
    width: isXLarge
      ? "1000px"
      : isLarge
      ? "740px"
      : isMedium
      ? "460px"
      : "375px",
    // whiteSpace: "nowrap", // 줄바꿈 방지
  };

  // --------------------------------- css 끝 ---------------------------------

  return (
    <>
      <Helmet>
        <title>투표모아쥬</title>
      </Helmet>

      {/* ------------- 투표 버튼 ------------- */}
      <VoteButton />

      {/* ------------- Header ------------- */}
      <div
        style={headerStyle}
        className="bg-gradient-to-tl from-gray-200 to-[#FF9999]"
      >
        <div style={headerContainerStyle}>
          <div>
            <p style={headerTitleStyle} className="fontsize-lg">
              투표모아쥬
            </p>
            <div style={headerLinkContainerStyle}>
              {/* ------------- 최신순 인기순 버튼 ------------- */}
              <button
                style={
                  sortType === "latest"
                    ? activeheaderLinkStyle
                    : headerLinkStyle
                } // 수정된 부분
                onClick={() => handleSort("latest")}
              >
                {sortType === "latest" ? "☑" : "☐"} 최신순
              </button>
              <button
                style={
                  sortType === "popular"
                    ? activeheaderLinkStyle
                    : headerLinkStyle
                } // 수정된 부분
                onClick={() => handleSort("popular")}
              >
                {sortType === "popular" ? "☑" : "☐"} 인기순
              </button>
            </div>
          </div>

          <VotePageHeader
            onSearchTerm={setSearchTerm}
            onSearchCategory={setSearchCategory}
            onSearch={handleSearch}
          />
        </div>
      </div>

      {/* ------------- Body ------------- */}
      <div style={bodyStyle} className="min-h-screen">
        {" "}
        {/* 정렬 함수를 props로 전달 */}
        <div className="grid grid-cols-1">
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div>
              <VotePageList voteList={voteListData} />{" "}
            </div>
          )}
        </div>
        {/* 정렬 상태를 props로 전달 */}
      </div>

      {/* ------------- 투표 생성 모달 ------------- */}
      {isVoteDetailModalOpened && <VoteDetail />}
      {isVoteSimpleCreateModalOpened && <VoteSimple />}
      {isVoteProductCreateModalOpened && <VoteProduct />}
    </>
  );
};

export default VotePage;
```



## stores
```src\stores\apiURL.js
const API_URL = import.meta.env.VITE_API_URL;

export default API_URL;
```



```src\stores\categoryData.js
const categoryData = [
  {
    id: 0,
    name:"전체",
    tags:[]
  },
  {
    id: 1,
    name: "의류",
    tags: ["가성비", "브랜드", "소재", "색감", "모양"],
  },
  {
    id: 2,
    name: "가구",
    tags: ["가성비", "브랜드", "소재", "색감", "모양"],
  },
  {
    id: 3,
    name: "신발",
    tags: ["가성비", "브랜드", "디자인", "기능성", "내구성"],
  },
  {
    id: 4,
    name: "전자제품",
    tags: ["가성비", "브랜드", "디자인", "기능성", "내구성"],
  },
  {
    id: 5,
    name: "간단",
    tags: ["선택"],
  },

];

export default categoryData;
```




```src\stores\modalState.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  isLoginModalOpened: false,
  isSignupModalOpened: false,
  isVoteDetailModalOpened: false,
  isVoteSimpleCreateModalOpened: false,
  isVoteProductCreateModalOpened: false,
  detailVoteId: 0,

  // 로그인폼 열립니다 => 하나가 열리면, 다른 모달은 모두 닫힘으로 바뀜
  setLoginModalOpen: () =>
    set(() => ({
      isLoginModalOpened: true,
      isSignupModalOpened: false,
      isVoteDetailModalOpened: false,
      isVoteSimpleCreateModalOpened: false,
      isVoteProductCreateModalOpened: false,
    })),

  // 로그인폼 닫힙니다
  setLoginModalClose: () =>
    set(() => ({
      isLoginModalOpened: false,
    })),

  // 회원가입폼 열립니다
  setSignupModalOpen: () =>
    set(() => ({
      isLoginModalOpened: false,
      isSignupModalOpened: true,
      isVoteDetailModalOpened: false,
      isVoteSimpleCreateModalOpened: false,
      isVoteProductCreateModalOpened: false,
    })),

  // 회원가입폼 닫힙니다
  setSignupModalClose: () =>
    set(() => ({
      isSignupModalOpened: false,
    })),

  // 투표 상세페이지 모달 열립니다
  setVoteDetailModalOpen: (voteId, handleClick) =>
    set(() => ({
      isLoginModalOpened: false,
      isSignupModalOpened: false,
      isVoteDetailModalOpened: true,
      isVoteSimpleCreateModalOpened: false,
      isVoteProductCreateModalOpened: false,
      detailVoteId: voteId, // voteId를 설정
      detailVoteHandle: handleClick,
    })),

  // 투표 상세페이지 모달 닫힙니다
  setVoteDetailModalClose: () =>
    set(() => ({
      isVoteDetailModalOpened: false,
    })),

  // 간편투표 생성페이지 모달 열립니다
  setVoteSimpleCreateModalOpen: () =>
    set(() => ({
      isLoginModalOpened: false,
      isSignupModalOpened: false,
      isVoteDetailModalOpened: false,
      isVoteSimpleCreateModalOpened: true,
      isVoteProductCreateModalOpened: false,
    })),

  // 간편투표 생성페이지 모달 닫힙니다
  setVoteSimpleCreateModalClose: () =>
    set(() => ({
      isVoteSimpleCreateModalOpened: false,
    })),

  // 구매투표 생성페이지 모달 열립니다
  setVoteProductCreateModalOpen: () =>
    set(() => ({
      isLoginModalOpened: false,
      isSignupModalOpened: false,
      isVoteDetailModalOpened: false,
      isVoteSimpleCreateModalOpened: false,
      isVoteProductCreateModalOpened: true,
    })),

  // 구매투표 생성페이지 모달 닫힙니다
  setVoteProductCreateModalClose: () =>
    set(() => ({
      isVoteProductCreateModalOpened: false,
    })),

  // 상세페이지 모달을 열기 위한 voteId를 설정합니다
  setDetailVoteId: (voteId) => set(() => ({ 
    detailVoteId: voteId
  })),
});

const useModalStore = create(
  process.env.NODE_ENV !== "production" ? devtools(store) : store
);

export default useModalStore;
```



```src\stores\responsiveUtils.js
import { useMediaQuery } from "react-responsive";

/**
 * useResponsiveQueries 커스텀 훅
 * 
 * 반응형 웹 디자인을 위한 미디어 쿼리 훅을 사용하여
 * 다양한 화면 크기에 대한 상태를 반환합니다.
 * 
 * @returns {Object} 반응형 상태 객체
 * @property {boolean} isXLarge - 화면이 1024px 이상인 경우 true, 아닌 경우 false
 * @property {boolean} isLarge - 화면이 768px 이상이면서 1023.98px 미만인 경우 true, 아닌 경우 false
 * @property {boolean} isMedium - 화면이 480px 이상이면서 767.98px 미만인 경우 true, 아닌 경우 false
 * @property {boolean} isSmall - 화면이 479.98px 이하인 경우 true, 아닌 경우 false
 */

export const useResponsiveQueries = () => {
  return {
    isXLarge: useMediaQuery({ query: "(min-width:1024px)" }),
    isLarge: useMediaQuery({ query: "(min-width:768px) and (max-width:1023.98px)" }),
    isMedium: useMediaQuery({ query: "(min-width:480px) and (max-width:767.98px)" }),
    isSmall: useMediaQuery({ query: "(max-width:479.98px)" }),
  };
};
```



```src\stores\responsiveUtils.js
import { useMediaQuery } from "react-responsive";

/**
 * useResponsiveQueries 커스텀 훅
 * 
 * 반응형 웹 디자인을 위한 미디어 쿼리 훅을 사용하여
 * 다양한 화면 크기에 대한 상태를 반환합니다.
 * 
 * @returns {Object} 반응형 상태 객체
 * @property {boolean} isXLarge - 화면이 1024px 이상인 경우 true, 아닌 경우 false
 * @property {boolean} isLarge - 화면이 768px 이상이면서 1023.98px 미만인 경우 true, 아닌 경우 false
 * @property {boolean} isMedium - 화면이 480px 이상이면서 767.98px 미만인 경우 true, 아닌 경우 false
 * @property {boolean} isSmall - 화면이 479.98px 이하인 경우 true, 아닌 경우 false
 */

export const useResponsiveQueries = () => {
  return {
    isXLarge: useMediaQuery({ query: "(min-width:1024px)" }),
    isLarge: useMediaQuery({ query: "(min-width:768px) and (max-width:1023.98px)" }),
    isMedium: useMediaQuery({ query: "(min-width:480px) and (max-width:767.98px)" }),
    isSmall: useMediaQuery({ query: "(max-width:479.98px)" }),
  };
};
```



```src\stores\tagColorData.js
const tagColorData = [
  {
    id: 0,
    name: "가성비",
    color: "#8FD9B6",
  },
  {
    id: 1,
    name: "브랜드",
    color: "#D395D0",
  },
  {
    id: 2,
    name: "소재",
    color: "#CDDF5A",
  },
  {
    id: 3,
    name: "색감",
    color: "#FFA959",
  },
  {
    id: 4,
    name: "모양",
    color: "#8CB0F6",
  },
  {
    id: 5,
    name: "디자인",
    color: "#FF9999",
  },
  {
    id: 6,
    name: "기능성",
    color: "#5EC4DC",
  },
  {
    id: 7,
    name: "내구성",
    color: "#FFDF38",
  },
];

export default tagColorData;
```




```src\stores\testResultData.js
const sobiTIData = [
  {
    id: 1,
    subTitle: "이왕이면 다홍치마",
    title: "프렌치 마카롱",
    postfix: "은",
    characteristic: "예쁘면 일단 사야 하지 않겠어요?",
    tag: ["과소비", "사치", "신상 최고"],
    description: [
      "배부르게 밥 먹고 눈앞에 마카롱 보이면 일단 사요. 저 예쁜 빛깔 보고도 안 살 수 있나?",
      "새로운 것을 좋아하고 사치품의 유혹에 잘 넘어가는 편이에요.",
      "새로운 것만 좋아하면 그나마 다행인데 꽂히는 건 다 사야 해요. 사과폰 사과패드에 이어서 사과 노트북까지 사야 직성이 풀려요.",
      "틀에 박힌 것을 싫어해요. 예산에 구애받기 싫어서 충동적으로 결제해요.",
      "다음 달 카드값에 대한 마지노선만 정하고 넘을까 말까 스릴넘치는 소비를 즐겨요.",
      "정기결제 귀찮아서 해지 못한지 반년째에요. 그래도 당장 14,500원이 아쉬운 순간엔 해지해요.",
      "아이쇼핑만 해야지 다짐해도 점원분이 이렇게 추천해 주시면 사야 하는 게 인지상정이잖아요?",
      "내 소비를 패턴으로 보려고 하지 마세요. 사고 싶은 건 일단 다 사고 질리면 안 살 거니까요.",
    ],
    good_chemi: 15,
    bad_chemi: 9,
  },
  {
    id: 2,
    subTitle: "부드럽고 고급진",
    title: "티라미수",
    postfix: "는",
    characteristic: "어차피 먹을 거라면 특별한 게 좋겠어요.",
    tag: ["배려", "사치", "쿨거래"],
    description: [
      "티라미수처럼 부드러운 마음을 가졌지만 가끔은 파우더를 잔뜩 뿌려 사치 부리고 싶어요.",
      "점심 메뉴 고를 때면 먹고 싶은 음식이 있어도 다른 사람에게 맞춰줘요.",
      "그러다가도 가끔은 나만을 위한 파인다이닝을 즐겨야 해요.",
      "중고거래하러 나가면 판매자가 쿨거래 고맙다고 말해요. 사실은 가격을 못 깎는 건데 말이죠.",
      "명품이나 트렌디함에서 뒤처질 수 없어요. 그렇다고 과소비하면 초코파우더 코로 마신 것보다 고통스러운 한 달을 보내요.",
    ],
    good_chemi: 13,
    bad_chemi: 10,
  },
  {
    id: 3,
    subTitle: "오늘은 운이 좋군",
    title: "포춘쿠키",
    postfix: "는",
    characteristic: "좋은 말 나올 때까지 500번 뽑아볼 거에요.",
    tag: ["스릴", "즉흥적", "자신감"],
    description: [
      "한 번 사는 인생인데 스릴 있는 것도 해보고 싶어요.",
      "무조건 300만 원 받기 vs 10% 확률로 1,000만 원 받기를 고르래요. 당연히 후자 아니에요?",
      "한정판이라는 말만 들리면 일단 관심이 가요. 결제하고 집에 와보면 전시해둔 한정판만 500개에요.",
      "이번 회식은 내가 쏠게요. 근데 착각하진 마세요. 너네가 좋은 게 아니라 내가 좋은 사람이고 싶은 거니까",
      "주식을 하면 왠지 내가 사는 종목은 다 오를 것만 같아요.",
      "게임을 해도 내가 원하는 아이템은 무조건 뽑아야 해요. 확률이 0.002%라고요? 50,000번 뽑으면 결국엔 나오겠죠 뭐.",
      "주변 사람들이 계속 도박 중독 상담은 1336이래요.",
    ],
    good_chemi: 11,
    bad_chemi: 16,
  },
  {
    id: 4,
    subTitle: "냄새로 유혹하는",
    title: "지하철 만쥬",
    postfix: "는",
    characteristic: "그런데 왜 냄새만 맛있는 거죠?",
    tag: ["충동구매", "복세편살", "낙천적"],
    description: [
      "지하철 환승하다가 만쥬 냄새 맡으면 못 지나쳐요. 막상 사도 한 개 먹고 안 먹는데 또 속았어요.",
      "복잡한 세상 편하게 살고 싶어요. 재테크 그냥 안 하고 덜 쓰죠 뭐.",
      "월급 들어오면 저번 달 고생한 나를 위한 선물은 꼭 줘야해요.",
      "좋은 건 좋은 거니까 일단 사고 생각할래요. 근데 뭐가 좋은진 나도 잘 몰라요.",
      "가격 비교를 왜 하는지 모르겠어요. 이거 살지 저거 살지 고민할 시간에 결제하면 벌써 배송 시작하는데 말이에요.",
      "소액결제 500번 하고 고지서 보면 깜짝 놀라요. 그래도 덜 먹고 덜 사면 어떻게든 해결될 거에요.",
    ],
    good_chemi: 9,
    bad_chemi: 5,
  },
  {
    id: 5,
    subTitle: "간식도 철저하게",
    title: "곤약젤리",
    postfix: "는",
    characteristic: "목표를 위해서라면 간식도 칼로리 계산 다 해서 먹어요.",
    tag: ["계획적", "계산적", "큰그림"],
    description: [
      "철저하고 계획적이라서 월급날 아침부터 이번 달 예산을 짜기 시작해요.",
      "아무리 급해도 신용카드 한도는 절대 안 건드려요. 발급받을 때부터 지켜온 나만의 규칙은 한 달에 100만 원이니까요.",
      "즉흥적인 게 세상에서 제일 싫어요. 내 점심식대는 8,000원인데 10,000원짜리 점심 특선 먹자는 부장님 보면 화가 잔뜩 나요.",
      "그래도 내 이미지를 위해서라면 한 달에 한 번 우리 팀 아이스크림은 쏠 수 있어요. 즉흥적이라고요? 이것도 계획의 일부에요.",
      "그렇지만 사랑하는 사람을 위해서는 아끼지 않아요. 이러려고 아끼는 거니까 아닌 사람들은 토달지 마세요.",
    ],
    good_chemi: 2,
    bad_chemi: 3,
  },
  {
    id: 6,
    subTitle: "고소하고 배부른",
    title: "오곡라떼",
    postfix: "는",
    characteristic: "뜨끈-하고 든든-한 오곡라떼를 사먹고 말지",
    tag: ["가성비", "재정관리", "아나바다"],
    description: [
      "물건 살 때 가장 중요한 건 가성비에요. 가심비라는 말은 근본 없으니까 저리 치우세요.",
      "안정된 삶을 위해서는 재정관리가 필수에요. 경기 침체를 극복할 방법은 저.금. 아나바다 하세요.",
      "똑같은 제품도 용량에 따라서 100mL 당 가격 다르니까 확인하고 사요.",
      "햇반이랑 오뚜기밥 중에서 뭐가 더 좋냐고 물어보면 세일하는 브랜드가 더 좋아요.",
      "특별히 사치 부리지도 않아서 주변에서 노잼으로 보지만 내가 만족하면 되는 거 아니에요?",
      "취미생활도 혼자서 할 수 있는 일이 더 좋아요. 내가 한 만큼만 결제하면 되잖아요.",
    ],
    good_chemi: 10,
    bad_chemi: 12,
  },
  {
    id: 7,
    subTitle: "톡! 쏘는 시원함",
    title: "콜라",
    postfix: "는",
    characteristic: "부딪히고 흔들린 날 감당할 수 없을 거에요.",
    tag: ["스트레스", "폭풍쇼핑", "한도초과"],
    description: [
      "합리적으로 보이지만 멘탈 터지면 카드로 막 긁다가 한도 초과에요. 이건 내가 감당 못하니까 엄마 찬스 써야 해요.",
      "현실적이고 실리를 추구해서 나만의 지출 계획이 있어요. 하지만 계획이 흔들리면 불안해서 터져버릴지도 몰라요.",
      "스트레스가 쌓이고 쌓이면 친구 불러서 1차 2차 3차 다 내가 쏴요. 술 깨고 결제 문자 온 거 보면 한숨밖에 안 나와요.",
      "혼자 있으면 아까워서 밥 굶어도 옆에 친구 있으면 친구 밥은 내가 사줘야 해요.",
      "남들 스트레스도 내 것처럼 다가와요. 걱정되는 친구 힘든 일 상담해 주고 밥도 술도 다 내가 쏴요. 손해 본 기분이지만 부담 주기는 싫어서 조용히 가계부에 적어요.",
      "일상에서 벗어나는 게 싫어서 이직엔 관심 없어요. '나를 돈으로 사려는 건가?' 라고 하기엔 너무 많은 돈을 제시하면 사인하러 갈게요.",
    ],
    good_chemi: 1,
    bad_chemi: 8,
  },
  {
    id: 8,
    subTitle: "쫄깃하게 말린",
    title: "고구마 말랭이",
    postfix: "는",
    characteristic: "지나치게 말리면 딱딱해지고 말 거에요.",
    tag: ["절약", "자린고비", "적금"],
    description: [
      "지나치게 아껴서 3년짜리 적금은 무조건 만기까지 채워야 해요.",
      "포인트나 쿠폰은 꼭 챙기는데 쇼핑을 안 해서 포인트가 안 쌓여요.",
      "아끼는 게 중요한 게 아니라 돈을 많이 벌고 많이 갖고 있는 게 중요해요.",
      "남들보다 예산을 더 빡빡하게 짜요. 라면 한 봉지로 삼시세끼 먹을 수도 있어요.",
      "해왔던 대로 하는 게 편해요. 화장품도 쓰던 것만 써요. 단종되면 뭘 사야 할지 모르겠어요.",
    ],
    good_chemi: 14,
    bad_chemi: 4,
  },
  {
    id: 9,
    subTitle: "겨울이면 생각나는",
    title: "붕어빵",
    postfix: "은",
    characteristic: "틀에 박힌 듯 철저하게 살고 싶어요.",
    tag: ["계획적 소비", "계산적", "주택청약"],
    description: [
      "돈 관리를 잘 하지만 월급 들어오면 사야겠다고 생각한 물건은 무조건 사요.",
      "이게 어떻게 돈 관리 잘 하는 거냐고요? 그거 말곤 아무것도 안 사거든요.",
      "겨울이 오면 주머니에 현금 3,000원을 꼭 들고 다녀요. 언제 어디서 붕어빵을 만날지 모르니까요.",
      "계획을 짜고 그대로 진행되는 게 뿌듯해요. 주택 청약은 이런 나를 위해 존재하는 상품 같아요.",
      "생각이 많아지면 실수가 생겨요. 지폐 세다 보면 처음엔 10장, 두 번 짼 11장, 마지막은 왜 9장이에요?",
      "겉으로는 계산적인 것처럼 보여도 내 사람에게는 누구보다 촉촉할 거에요.",
      "아이쇼핑만 해야지 다짐해도 점원분이 이렇게 추천해 주시면 사야 하는 게 인지상정이잖아요?",
      "내 소비를 패턴으로 보려고 하지 마세요. 사고 싶은 건 일단 다 사고 질리면 안 살 거니까요.",
    ],
    good_chemi: 6,
    bad_chemi: 7,
  },
  {
    id: 10,
    subTitle: "소스와 함께면 기쁨이 배가 되는",
    title: "나초",
    postfix: "는",
    characteristic: "호기심이 가는 일이라면 뭐든지 찍먹 해봐야해요.",
    tag: ["호기심", "실용적", "자기계발"],
    description: [
      "담백한 나지만 이 소스 저 소스 다 찍어보고 싶어요.",
      "평상시엔 필요한 만큼만 사고 떨어지면 다시 사는 실용적인 소비를 해요. 그 외의 부분은 통장으로 가요.",
      "그렇지만 새로운 경험을 위해서라면 실용성은 고려하지 않아요.",
      "나를 표현하는 건 외적인 것이 아니라 내면이라 생각해서 서점 가면 책만 500권씩 사둬요",
      "아, 책을 좋아하는 거지 부지런히 읽는 건 아니에요. 500권 다 프롤로그밖에 못 읽었거든요.",
      "중학교 때도 수학 문제집 5권씩 사서 집합만 풀고 뒤는 뭔지도 몰라요.",
    ],
    good_chemi: 12,
    bad_chemi: 14,
  },
  {
    id: 11,
    subTitle: "과자야 건강식품이야?",
    title: "에너지바",
    postfix: "는",
    characteristic: "놀 때도 일할 때도 힘이 필요하잖아요",
    tag: ["의욕적", "과시욕", "자본주의"],
    description: [
      "내가 열심히 일하는 이유는 열심히 벌어서 열심히 놀기 위해서에요.",
      "때로는 일을 너무 중요하게 생각해서 개인 생활을 잊을 때가 있어요.",
      "과시적인 성향도 있어요. 내가 어떤 사람인지 보여주기 위해서 명품 시계, 명품 가방을 구입하기도 해요.",
      "이 세상은 돈으로 굴러가고 돈이 곧 영향력이에요. 물질만능주의 아니냐고요? 어쩌겠어요 자본주의가 날 이렇게 만든걸",
      "이런 날 보면 주변에서 행복은 돈으로 살 수 없대요. 나는 돈 쓰면서 행복을 느끼는데 말이에요.",
      "그래서 나도 한마디 해줘요. 행복은 돈으로 살 수 없다는 생각이 들면 돈이 부족한 건 아닐까 의심해보라고",
    ],
    good_chemi: 3,
    bad_chemi: 1,
  },
  {
    id: 12,
    subTitle: "내 안의 다른 나",
    title: "슈크림",
    postfix: "은",
    characteristic: "겉은 딱딱해 보여도 속은 부드러워요.",
    tag: ["양면성", "결정장애", "합리화"],
    description: [
      "돈이 좋아서 내 연봉은 무조건 높았으면 좋겠어요! 그렇지만 돈 개념 자체는 별로 없어서 신입 희망 연봉으로 5,000만 원 받고 싶어요.",
      "잘 모르는 물건을 사는 건 어려워요. 이거 살까, 저거 살까 2시간 고민하다 보면 매장 닫는다고 해서 급하게 결제하고 다른 거 살 걸 후회해요.",
      "그렇지만 뛰어난 분석력으로 나한테 바가지 씌우는 건 직감으로 알아차려요. 설득력도 좋아서 결국엔 원가까지 깎아낼 수 있어요.",
      "하지만 귀찮으면 분석도 설득도 없어요. 여행지에서는 '바가지도 쓰는 거지 하면서' 귀찮음을 합리화해요.",
      "주변에선 내 능력을 보고 못 하는 게 없다고 입이 마르도록 칭찬해요. 쓸데없는 물건에 허투루 돈 쓰는 거 빼면요.",
      "그렇지만 내가 좋아하는 물건을 사는 건데 어쩌겠어요. 이런 것도 사려고 돈 버는 거 아니겠어요?",
      "사람도 마찬가지예요. 내가 좋아하는 사람한테 모든 걸 줘도 아깝지 않은데 싫어하는 사람은 국물도 없으니 얼쩡거리지 말고 저리 가세요.",
    ],
    good_chemi: 8,
    bad_chemi: 15,
  },
  {
    id: 13,
    subTitle: "담백하고 부드러운",
    title: "우유식빵",
    postfix: "은",
    characteristic: "어떤 잼과 함께하느냐 그것이 문제로다.",
    tag: ["팔랑귀", "공동구매", "근묵자흑"],
    description: [
      "잼에 따라 맛이 달라지는 식빵처럼, 내 옆에 누가 있는지에 따라 소비도 달라져요.",
      "이쪽에서 누가 좋다고 하면 일단 사요. 택배 받아보면 뭔지도 모르겠어요.",
      "그런데 저쪽에서 누가 좋은 보험 나왔다고 하면 일단 가입하러 가요. 이런 식으로 가입한 암보험만 3개에요.",
      "내 소비패턴을 말하자면 강약약 중강약약이에요. 강이랑 중강은 누가 꼬드긴 거니까 사실 약약약약이라고 우길래요.",
      "일단 한 번 세운 계획은 수정 없어요. 10년 전에 세운 내 집 마련 계획 아직도 실천 중이에요.",
      "잘못된 것 같은 느낌에 계획을 바꾸려고 해도 내 부동산 지식은 10년 전에 머물러있어요.",
      "집이 너무 좋아요 나랑 같이 여행 가고 싶으면 계획은 짜오세요. 돈은 쾌척할 수 있어요.",
    ],
    good_chemi: 4,
    bad_chemi: 11,
  },
  {
    id: 14,
    subTitle: "호불호 갈리는",
    title: "민트초코",
    postfix: "는",
    characteristic: "민초의 매력을 느끼지 못하다니.. 안됐다..",
    tag: ["주관적 소비", "호불호", "자기계발"],
    description: [
      "돈에 대해서는 큰 관심이 없지만 나에게 중요한 걸 위해서 라면 모든 걸 다 써도 좋아요",
      "마치 31가지 맛 아이스크림 중에서 5가지 고르라는데 5개 모두 민트초코로 채우고 싶은 것처럼요",
      "민초의 매력을 잘 알지도 못하면서 호불호를 논하지 마세요",
      "다른 건 다 참아도 나한테 중요한 걸 평가하는 건 못 참겠어요 돈으로 모든 걸 살 수 없어요",
      "이 세상에는 돈 이상의 가치가 분명히 존재하거든요 일을 고를 때도 얼마를 받고 일하는지보다는 얼마나 의미 있는 일인지가 더 중요해요",
      "자기 계발 역시 나에게 중요한 가치에요 자격증 공부에 드는 돈은 하나도 안 아까워요",
      "늦잠자서 시험장에 못 갈 뿐이죠 어떨 때 보면 돈에 관심이 없는 게 아니라 돈 개념이 없는 것도 같아요",
      "옆에서 재테크 알려준다고 해도 관심 없으니까 안 알려줬으면 좋겠어요.",
    ],
    good_chemi: 5,
    bad_chemi: 2,
  },
  {
    id: 15,
    subTitle: "말하지 않아도 알아요",
    title: "초코파이",
    postfix: "는",
    characteristic: "내 생일은 굶어도 소중한 사람 생일은 꼭 챙겨야 해요.",
    tag: ["情", "사교적", "안빈낙도"],
    description: [
      "물욕도 별로 없고, 돈을 많이 모아야겠다는 욕심도 없어요. 돈은 수단이지, 그 자체가 목적은 아니잖아요?",
      "나를 위한 소비는 별로 없지만, 사람들과 어울리다보면 지출이 생겨요",
      "이렇게 다른 사람을 위해서 소비를 하다 보면 종종 감당이 안 돼요. 다음 달에 마이너스 통장이라도 만들어야 할까 봐요.",
      "다른 사람들을 배려하는 편이에요. 나는 백반 먹고 싶었는데 옆에서 패밀리 레스토랑 가자고 하면 어쩔 수 없이 따라가요.",
      "더치페이 했는데 친구들이 돈 안 보내주면 내가 산 셈 치죠 뭐...",
      "체력이 좋아서 지칠 줄 몰라요. 이 일, 저 일 다 받아서 하는 프리랜서였다면 아마 고소득자였을 거에요.",
    ],
    good_chemi: 16,
    bad_chemi: 13,
  },
  {
    id: 16,
    subTitle: "너무달아도맛있으면0칼로리",
    title: "초코잼",
    postfix: "은",
    characteristic: "어차피 한 번 사는 인생, 현재를 즐기고 싶어요.",
    tag: ["YOLO", "유행", "티끌모아티끌"],
    description: [
      "복잡한 세상 편하게 살고 싶어요. 내가 좋아하는 건 뭐든 할 거니까 말리지 마세요.",
      "앱 다운받으면 할인해준다고 해도 귀찮아서 그냥 정가로 사요.",
      "티끌은 모아봤자 티끌이니까 저축은 크게 신경 안 써요. 어차피 서울에 집 사려면 내 월급은 진짜 티끌이니까요.",
      "새롭고 재미있는 걸 보면 일단 해봐야 해요. 요즘 홈 시네마가 유행이라던데 생각하는 순간 이미 빔프로젝터 어디 설치할지 생각 끝났어요.",
      "그렇다고 자기관리를 안 하진 않아요. 내가 운동 열심히 하는 이유를 묻는다면 술 먹고 죄책감 안 느끼려고 그런 거에요.",
    ],
    good_chemi: 7,
    bad_chemi: 6,
  },
];

export default sobiTIData;
```


```src\stores\userState.js
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = persist(
  (set) => ({
    isLoggedIn: false,
    user: {},
    setLoggedIn: (data) => set(() => ({ isLoggedIn: true, user: data })),
    setLogout: () => set(() => ({ isLoggedIn: false, user: {} })),
    // 닉네임 변경 시, 포인트 차감 100
    updateNickname: (nickname) =>
      set((state) => ({
        user: {
          ...state.user,
          nickname: nickname,
          point: state.user.point - 100,
        },
      })),
    // 구매 골라쥬, 간단 골라쥬, 지금 골라쥬 생성 시 포인트 차감 10
    createVote: () =>
      set((state) => ({
        user: {
          ...state.user,
          point: state.user.point - 10,
        },
      })),
    // 투표 참여 시, 포인트 획득 2
    doVote: () =>
      set((state) => ({
        user: {
          ...state.user,
          point: state.user.point + 2,
        },
      })),
  }),
  {
    name: "userStorage",
  }
);

const useAuthStore = create(
  process.env.NODE_ENV !== "production" ? devtools(store) : store
);

export default useAuthStore;

// import useAuthStore from "/src/stores/userState";

// const user = useAuthStore((state) => state.user);

// user.memberId

// user에 담겨있는 데이터
// {
//     "memberId": 0,
//     "email": "string",
//     "typeId": 0,
//     "nickname": "string",
//     "birthday": {
//       "year": 0,
//       "month": 0,
//       "day": 0
//     },
//     "gender": "string",
//     "point": 0,
//     "profileImgUrl": "string"
// }
```
