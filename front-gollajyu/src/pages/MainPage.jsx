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
            <div className="bg-gradient-to-tl from-blue-400 to-red-400">
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
