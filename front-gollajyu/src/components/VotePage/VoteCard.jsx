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
