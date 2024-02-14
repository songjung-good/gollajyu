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
        sortedData = prevVoteList;
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
      console.log("데이터 가져오기 성공:", response.data);
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
    height: isXLarge || isLarge ? "260px" : "160px",
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
    hegith: "260px",

    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
    alignItems: isXLarge || isLarge ? "flex-start" : "center",
    justifyContent: "space-between",
  };

  // ----------- 해더 제목 스타일 -----------
  const headerTitleStyle = {
    // 디자인
    marginBottom: "20px",

    // 글자
    fontSize: isXLarge || isLarge ? "32px" : "24px",
    color: "#FFFFFF",
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
    color: "#4A4A4A",
    fontSize: isXLarge || isLarge ? "19px" : "16px",
    whiteSpace: "nowrap",
  };

  // ----------- 활성화 된 해더 링크 스타일 -----------
  const activeheaderLinkStyle = {
    // 상속
    ...headerLinkStyle,

    // 글자
    color: "#FFFFFF",
  };

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    padding: "50px 0", // 상하단 여백: 50px
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
        className="bg-gradient-to-tl from-blue-400 to-red-400"
      >
        <div style={headerContainerStyle}>
          <VotePageHeader
            onSearchTerm={setSearchTerm}
            onSearchCategory={setSearchCategory}
            onSearch={handleSearch}
          />
          <div>
            <p style={headerTitleStyle}>투표모아쥬</p>
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
                최신순
              </button>
              <button
                style={
                  sortType === "popular"
                    ? activeheaderLinkStyle
                    : headerLinkStyle
                } // 수정된 부분
                onClick={() => handleSort("popular")}
              >
                인기순
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ------------- Body ------------- */}
      <div style={bodyStyle}>
        {" "}
        {/* 정렬 함수를 props로 전달 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
