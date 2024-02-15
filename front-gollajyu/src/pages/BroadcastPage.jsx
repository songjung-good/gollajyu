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

// 모달 컴포넌트
import TmpModal from "../components/TmpModal"; // 임시 모달

// 이미지 가져오기
import questionMarkImg from "/assets/images/question_mark_img.png";
import tmpThumbnailImg from "/assets/images/nowGollajyu.png";



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
    width: isXLarge ? "1000px" : isLarge ? "740px" : isMedium ? "460px" : "375px",
    whiteSpace: "nowrap", // 줄바꿈 방지
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom: isXLarge ? "50px" : isLarge ? "45px" : isMedium ? "40px" : "35px",
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
  }
  
  // ----------- 설명 스타일 -----------
  const descriptionStyle = {
    // 디자인
    padding: "2px 5px 0",
    borderRadius: "3px",
    backgroundColor: "#6B6B6B",

    // 글자
    fontSize: "13px",
    color: "#FFFFFF",
  }

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const contentsContainerStyle = {
    // 디자인
    borderRadius: isXLarge ? "50px" : isLarge ? "40px" : isMedium ? "30px" : "20px",
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
        <div
          id="hot-broadcast"
          style={containerStyle}
        >
          <div style={titleContainerStyle}>
            <span style={titleTextStyle} className="fontsize-lg"># 지금</span>
            <span style={titleTextStyle} className="text-red-300 font-bold fontsize-lg">당장</span>
            <span style={titleTextStyle} className="fontsize-lg">골라쥬</span>
            <img
              src={questionMarkImg}
              style={questionMarkStyle}
              alt="물음표"
              className="cursor-pointer rounded-full"
              onClick={toggleHotDescription}
              onMouseOver={() => setShowHotDescription(true)}
              onMouseOut={() => setShowHotDescription(false)}
            />
            <p style={{
              ...descriptionStyle,
              visibility: showHotDescription ? "visible" : "hidden"
            }}>
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
              <p className="fontsize-sm">현재 방송 중인 지금 골라쥬가 없습니다.</p>
            )}
          </div>
        </div>

        <div
          id="broadcast-list"
          style={containerStyle}
        >
          <div style={titleContainerStyle}>
            <span style={titleTextStyle} className="fontsize-lg"># 지금 골라쥬</span>
            <img
              src={questionMarkImg}
              style={questionMarkStyle}
              alt="물음표"
              className="cursor-pointer rounded-full"
              onClick={toggleDescription}
              onMouseOver={() => setShowDescription(true)}
              onMouseOut={() => setShowDescription(false)}
            />
            <p style={{
              ...descriptionStyle,
              visibility: showDescription ? "visible" : "hidden"
            }}>
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
