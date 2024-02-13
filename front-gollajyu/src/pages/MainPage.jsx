// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from "react";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

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
import TmpModal from "../components/TmpModal"; // 임시 모달

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
  });

  // 로그인 함수
  const logIn = (data) => {
    axios
      .post(API_URL + "/members/login", data, {
        withCredentials: true,
      })
      .then((response) => {
        setLoggedIn(response.data.body);
        window.location.reload(); // 로그인 후, 메인페이지 새로고침
        console.log("로그인 완료", response);
      })
      .catch((err) => {
        console.error("로그인 오류", err);
      });
  };

  // ------------------ 데이터 통신 관련 ------------------

  // 초기 카테고리 아이디 설정
  const categoryId = 0;

  // 투표 목록 데이터 및 로딩 상태 관련 상태 설정
  const [voteListData, setVoteListData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 데이터 가져오기 함수
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/votes`, {
        params: {
          categoryId: categoryId,
          memberId: user ? user.memberId : null,
        },
      });
      setVoteListData(response.data);
      setIsLoading(false); // 데이터를 가져온 후 로딩 상태를 false로 설정
      console.log("Axios 요청 성공", response.data);
    } catch (error) {
      setIsLoading(false); // 에러 발생 시 로딩 상태를 false로 설정
      console.error("Axios 요청 오류", error);
    }
  };

  // 페이지 로드 시(컴포넌트가 처음 마운트 될 떄만) 데이터 가져오기
  useEffect(() => {
    window.scrollTo({ top: 0 }); // 페이지 로드되면 최상단으로 가기
    fetchData();
  }, []);

  // --------------------------------- css 시작 ---------------------------------

  // ----------- 로딩중 스타일 -----------
  const loadingStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    height: isXLarge
      ? "1000px"
      : isLarge
      ? "900px"
      : isMedium
      ? "800px"
      : "700px",
  };

  // --------------------------------- css 끝 ---------------------------------

  return (
    <>
      {/* ----------- 투표 버튼 컴포넌트 ----------- */}
      <VoteButton />

      {/* ----------- 메인 콘텐츠 영역 ----------- */}
      <div>
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
            <div className="bg-gradient-to-tl from-blue-400 to-red-400">
              {/* 무작위 그룹의 선호도를 문구 컴포넌트 */}
              <MainWord />

              {/* 스와이프 투표 컴포넌트 */}
              <SwipeVote voteList={voteListData} />
            </div>

            {/* 메인 투표 리스트 컴포넌트 */}
            <MainVoteList />
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
