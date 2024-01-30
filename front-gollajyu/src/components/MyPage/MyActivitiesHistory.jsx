import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

// ----------- Hover 커스텀 훅 -----------
const useHoverState = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return [hovered, handleMouseEnter, handleMouseLeave];
};

const MyActivitiesHistory = () => {
  // ----------- 반응형 웹페이지 구현 -----------
  const isLarge = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const isMedium = useMediaQuery({
    query : "(min-width:768px) and (max-width:1024px)"
  });
  const isSmall = useMediaQuery({
    query : "(max-width:768px)"
  });

  // ----------- 내 활동 아이템 hover -----------
  const [
    ItemHovered,
    ItemMouseEnter,
    ItemMouseLeave
  ] = useHoverState();


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom: "30px",
    padding: "20px 30px",
    width: "100%",
    height: "200px",
    borderRadius: "20px", // 둥근 테두리
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)", // 그림자 효과

    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  // ----------- 정보 컨테이너 스타일 -----------
  const infoContainerStyle = {
    // 디자인  
    height: "40px",
    width: "100%",

    // 글자
    fontSize: "20px",

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "space-between", // 항목 균일 간격으로 정렬
  }

  // ----------- 정보 첫 번째 컨테이너 스타일 -----------
  const infoFirtstContainerStyle = {
    // 디자인
    width: "49%",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }

  // ----------- 정보 두 번째 컨테이너 스타일 -----------
  const infoSecondContainerStyle = {
    // 상속
    ...infoFirtstContainerStyle,

    // 디자인
    width: "2%",

    // 컨텐츠 정렬
    justifyContent: "center",
  }

  // ----------- 정보 세 번째 컨테이너 스타일 -----------
  const infoThirdContainerStyle = {
    // 상속
    ...infoFirtstContainerStyle,

    // 컨텐츠 정렬
    justifyContent: "end",
    justifyContent: "space-between",
  }

  // ----------- 텍스트 스타일 -----------
  const textStyle = {
    // 글자
    // fontSize: "20px",
  }

  // ----------- 댓글 수 스타일 -----------
  const commentNumberStyle = {
    // 글자
    color: "#868FF4",
  }

  // ----------- 좋아요 수 스타일 -----------
  const likeNumberStyle = {
    // 글자
    color: "#FF6D6D",
  }

  // ----------- 작성 시간 스타일 -----------
  const timeStyle = {
    // 글자
    color: "#4A4A4A",
  }

  // ----------- 투표 컨테이너 스타일 -----------
  const voteContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  }

  // ----------- 투표 아이템 스타일 -----------
  const voteItemStyle = {
    // 디자인
    margin: "0 15px",
    padding: "10px",
    width: isLarge ? "150px" : "120px",
    border: "5px solid", 

    // 글자
    fontSize: "20px",

    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }

  // ----------- 투표 비율 스타일 -----------
  const ratioStyle = {
    fontSize: "16px",
  }



  // --------------------------------- css 끝 ---------------------------------

  // ----------- VoteItem 컴포넌트 정의 -----------
  const VoteItem = ({ label, ratio, isMyChoice }) => {
    // 가장 높은 비율의 선택지 찾기
    const highestRatioOption = voteOptions.reduce((maxOption, currentOption) => {
      return currentOption.ratio > maxOption.ratio ? currentOption : maxOption;
    }, { ratio: -1 }); // 초기 비율을 -1로 설정하여 모든 비율보다 작도록 함

    // ----------- myPick 스타일 -----------
    const myPickStyle = {
      marginLeft: "15px", 
      color: isMyChoice ? "#FF6D6D" : "#FFFFFF",
    };

    // ----------- 투표 아이템 스타일 -----------
    const itemStyle = {
      ...voteItemStyle,

      // 가장 높은 비율의 선택지 배경 색 추가
      backgroundColor: ratio === highestRatioOption.ratio ? "#FFE69C" : "#F0F0F0",

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
      <div>
        <div style={myPickStyle}>My Pick</div>
        <div style={itemStyle}>
          <div>{label}</div>
          <div style={ratioStyle}>{ratio} %</div>
        </div>
      </div>
    );
  };

  // ----------- Vote 컴포넌트 사용 함수 -----------
  const Vote = ({ voteOptions }) => {
    return (
      <div style={voteContainerStyle}>
        {voteOptions.map((option, index) => (
          <VoteItem
            key={index}
            label={option.label}
            ratio={option.ratio}
            isMyChoice={option.isMyChoice}
          />
        ))}
      </div>
    );
  };

  // ----------- 예시 데이터 (임시) -----------
  const voteOptions = [
    { label: "[선택지 1]", ratio: 10, isMyChoice: false },
    { label: "[선택지 2]", ratio: 30, isMyChoice: true },
    { label: "[선택지 3]", ratio: 60, isMyChoice: false },
    { label: "[선택지 4]", ratio: 0, isMyChoice: false },
  ];

  return (
    <>
      <NavLink>
        <div style={containerStyle}>
          <div style={infoContainerStyle}>
            <div style={infoFirtstContainerStyle}>
              <div style={textStyle}>[제목]</div>
              <div style={commentNumberStyle}>[[댓글]]</div>
              <div style={textStyle}>[카테고리]</div>
            </div>
            <div style={infoSecondContainerStyle}>
              <div style={textStyle}>|</div>
            </div>
            <div style={infoThirdContainerStyle}>
            <div style={likeNumberStyle}>❤ [좋아요]</div>
              <div style={timeStyle}>[작성 시간]</div>
            </div>
          </div>
          <div style={voteContainerStyle}>
            <Vote voteOptions={voteOptions} />
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default MyActivitiesHistory;
