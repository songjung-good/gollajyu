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
