// 리액트 및 훅/라이브러리
import React, { useState, useEffect, useRef } from 'react';

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 카테고리 데이터 불러오기
import categoryData from "/src/stores/categoryData";


const VotePageHeader = ({ onSearch, onSearchTerm, onSearchCategory }) => {

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();
  
  // ----------- 카테고리 드롭다운 state 관리 -----------
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0); // 상태 초기화

  // ----------- 카테고리 선택 변경 이벤트 핸들러-----------
  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value; // 선택된 카테고리의 ID 가져오기
    setSelectedCategory(selectedCategoryId); // 선택된 카테고리 ID로 상태 업데이트
    onSearchCategory(selectedCategoryId); // 선택된 카테고리 ID를 상위 컴포넌트에 전달
  };

  // ----------- 드롭다운 토글 함수 -----------
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // ----------- 검색 입력 변경 이벤트 핸들러 -----------
  const handleChange = (event) => {
    onSearchTerm(event.target.value); // 입력된 검색어로 상태 업데이트
  };

  // ----------- 검색 버튼 클릭 이벤트 핸들러 -----------
  const handleSearchClick = () => {
    onSearch(); // 입력 완료된 검색어를 상위 컴포넌트에 전달
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


  // --------------------------------- css 시작 ---------------------------------

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    marginLeft: "auto",
    marginBottom: isXLarge || isLarge ? "15px" : "5px",
    whiteSpace: "nowrap", // 줄바꿈 방지

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: isXLarge || isLarge ? "flex-start" : "center",
  };

  // ----------- 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    paddingRight: "20px",
    width: isXLarge || isLarge ? "440px" : isMedium ? "270px" : "216px",
    height: isXLarge || isLarge ? "50px" : isMedium ? "40px" : "35px",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",

    // 글자
    color: "#4A4A4A",

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "space-between",
  };

  // ----------- 서브 컨테이너 스타일 -----------
  const subContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  }

  // ----------- relative 컨테이너 스타일 -----------
  const relativeContainerStyle = {
    // 위치
    position: "relative",
  };

  // ----------- 드롭다운 버튼 스타일 -----------
  const dropdownButtonStyle = {
    // 디자인
    marginRight: "5px",
    padding: isXLarge || isLarge ? "2px 10px 0px 14px" : isMedium ? "2px 10px 0px 12px" : "2px 10px 0px 10px",
    border: "none",
    width: isXLarge || isLarge ? "110px" : isMedium ? "105px" : "80px",
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
    padding: isXLarge ? "0 8px" : isLarge ? "0 7px" : isMedium ? "0 6px" : "0 5px",
    width: isXLarge || isLarge ? "110px" : isMedium ? "105px" : "100px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", // 메뉴 그림자
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

  // ----------- 검색 창 스타일 -----------
  const searchStyle = {
    // 디자인
    padding: "2px 10px 0px 10px",
    border: "none",
    width: isXLarge || isLarge ? "210px" : isMedium ? "115px" : "90px",
    height: isXLarge || isLarge ? "40px" : isMedium ? "30px" : "25px",
    
    // 글자
    fontSize: isXLarge || isLarge ? "16px" : isMedium ? "15px" : "14px",
  }

  // ----------- 검색 버튼 스타일 -----------
  const searchButtonStyle = {
    // 디자인
    paddingTop: "4px",
    border: "none",
    backgroundColor: "#FFFFFF",

    // 글자
    fontSize: isXLarge || isLarge ? "20px" : isMedium ? "18px" : "16px",
  }

  // --------------------------------- css 끝 ---------------------------------

  
  return (
    <>
      <div style={bodyStyle}>
        <div style={containerStyle}>
          <div style={subContainerStyle}>

            {/* ------------- 카테고리 드롭다운 버튼 ------------- */}
            <div style={relativeContainerStyle}>
              <div
                value={selectedCategory}
                onClick={toggleDropdown}
                style={dropdownButtonStyle}
                ref={dropdownButtonRef}
              >
                <div style={dropdownStyle}>
                  {selectedCategory !== null
                    ? categoryData.find(
                        (c) => c.id === parseInt(selectedCategory)
                      )?.name
                    : categoryData[0].name
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
                    (category) => (
                      <div
                        key={category.id}
                        onClick={() => {
                          handleCategoryChange({
                            target: { value: category.id },
                          })
                          setIsOpen(false)
                        }}
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

            {/* ------------- 검색 창  ------------- */}
            <input
              type="text"
              placeholder={isXLarge || isLarge ? "검색어를 입력하세요" : "검색"}
              onChange={handleChange} // Wire up the handleChange event handler
              style={searchStyle}
            />
          </div>

          {/* ------------- 검색 버튼  ------------- */}
          <button
            type="button"
            onClick={handleSearchClick} // Wire up the handleSearchClick event handler  
            style={searchButtonStyle}
          >
            🔍︎
          </button>
        </div>

      </div>
    </>
  );
};

export default VotePageHeader;