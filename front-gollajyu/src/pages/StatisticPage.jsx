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
    width: isXLarge ? "1000px" : isLarge ? "740px" : isMedium ? "460px" : "375px",
    whiteSpace: "nowrap", // 줄바꿈 방지
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom: isXLarge ? "50px" : isLarge ? "45px" : isMedium ? "40px" : "375px",
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
    padding: isXLarge ? "40px" : isLarge ? "35px" : isMedium ? "30px" : "25px",
    borderRadius: isXLarge ? "50px" : isLarge ? "40px" : isMedium ? "30px" : "20px",
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
    margin: isXLarge ? "0 10px" : isLarge ? "0 8px" : isMedium ? "0 6px" : "0 4px",
  };

  // ----------- 드롭다운 버튼 스타일 -----------
  const dropdownButtonStyle = {
    // 디자인
    padding: isXLarge || isLarge ? "0px 10px 0px 14px" : isMedium ? "0px 10px 0px 12px" : "0 10px",
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
    padding: isXLarge || isLarge ? "0 7px" : isMedium ? "0 6px" : "0 5px",
    width: isXLarge || isLarge ? "110px" : isMedium ? "105px" : "100px",
    border: "1px solid #ccc",
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

  // ----------- 쉼표 스타일 -----------
  const restStyle = {
    // 디자인
    marginRight: isXLarge ? "10px" : "0",
  };

  // ----------- 구분선 스타일 -----------
  const barStyle = {
    // 디자인
    margin: isXLarge ? "30px 0" : isLarge ? "25px 0" : isMedium ? "20px 0" : "15px 0",
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
            <p style={{
              ...descriptionStyle,
              visibility: showDescription ? "visible" : "hidden"
            }}>
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
                        : categoryData[1].name
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
                  {selectedCategoryId === 1 || selectedCategoryId === 2 ? "를" : "을"} 구매 할 때
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
