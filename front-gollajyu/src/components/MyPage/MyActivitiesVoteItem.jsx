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
