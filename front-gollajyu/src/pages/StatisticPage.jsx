import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import categoryData from "/src/stores/categoryData";
import tagColorData from "/src/stores/tagColorData";
import TmpModal from "../components/TmpModal"; // 임시 모달
import VoteButton from "../components/VoteButton";
import useModalStore from "../stores/modalState";

const StatisticPage = () => {
  // ----------- 반응형 웹페이지 구현 -----------
  const isXLarge = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const isLarge = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023.98px)",
  });
  const isMedium = useMediaQuery({
    query: "(min-width:480px) and (max-width:767.98px)",
  });
  const isSmall = useMediaQuery({
    query: "(max-width:479.98px)",
  });

  // ----------- 카테고리 드롭다운 state 관리 -----------
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryData[0].id);

  // ----------- 카테고리가 변경될 때 호출되는 함수 -----------
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setIsOpen(false);
  };

  // ----------- 드롭다운 토글 함수 -----------
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // --------------------------------- css 시작 ---------------------------------

  // ----------- body 스타일 -----------
  const body = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    padding: "50px 0", // 상하단 여백: 50px
    // (반응형) 컨텐츠 가로 길이
    width: isXLarge
      ? "1000px"
      : isLarge
      ? "740px"
      : isMedium
      ? "560px"
      : "375px",
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
    height: isXLarge ? "60px" : isLarge ? "50px" : isMedium ? "45px" : "40px",
  };

  // ----------- 제목 스타일 -----------
  const titleTextStyle = {
    // 디자인
    marginTop: isXLarge ? "5px" : isLarge ? "3px" : isMedium ? "5px" : "4px",
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
    alignItems: isXLarge || isLarge ? "center" : "flex-start",
    flexDirection: isXLarge || isLarge ? "row" : "column",
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
    padding: isXLarge ? "8px" : isLarge ? "7px" : isMedium ? "6px" : "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  };

  // ----------- 드롭다운 메뉴 스타일 -----------
  const dropdownMenuStyle = {
    // 위치
    position: "absolute",
    left: 0,
    zIndex: 1,

    // 디자인
    marginTop: "4px",
    padding: isXLarge
      ? "0 8px"
      : isLarge
      ? "0 7px"
      : isMedium
      ? "0 6px"
      : "0 5px",
    width: isXLarge ? "120px" : isLarge ? "110px" : isMedium ? "100px" : "90px",
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
      <VoteButton />
      <div style={body}>
        {/* ------------- 카테고리 선호도 ------------- */}
        <div style={containerStyle}>
          <div style={titleContainerStyle}>
            <span style={titleTextStyle} className="fontsize-xl">
              사용자별 선호 태그 통계
            </span>
          </div>
          <div style={contentsContainerStyle}>
            <div style={flexContainerStyle}>
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
                      className="fontsize-sm"
                    >
                      {selectedCategory !== null
                        ? categoryData.find(
                            (c) => c.id === parseInt(selectedCategory)
                          )?.name
                        : "카테고리 선택"}
                    </div>
                    {isOpen && (
                      <div style={dropdownMenuStyle}>
                        {categoryData.map((category) => (
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
                    을(를) 구매 할 때
                  </div>
                  <div style={restStyle} className="fontsize-md">
                    ,
                  </div>
                </div>
                <div style={subTitleStyle} className="fontsize-md">
                  어떤 요소를 중요하게 생각할까?
                </div>
              </div>
              {/* --------------------------------------- */}
            </div>
            <div style={barStyle}></div>
          </div>
        </div>
      </div>
      {isVoteSimpleCreateModalOpened && <TmpModal></TmpModal>}
      {isVoteProductCreateModalOpened && <TmpModal></TmpModal>}
    </>
  );
};

export default StatisticPage;
