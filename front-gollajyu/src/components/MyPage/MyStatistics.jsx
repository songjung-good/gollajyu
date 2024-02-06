import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import MyStatisticsChart from "./MyStatisticsChart";
import categoryData from '/src/stores/categoryData';
import tagColorData from '/src/stores/tagColorData';

const MyStatistics = () => {

  // ----------- 반응형 웹페이지 구현 -----------
  const isXLarge = useMediaQuery({
    query : "(min-width:1024px)",
  });
  const isLarge = useMediaQuery({
    query : "(min-width:768px) and (max-width:1023.98px)"
  });
  const isMedium = useMediaQuery({
    query : "(min-width:480px) and (max-width:767.98px)"
  });
  const isSmall = useMediaQuery({
    query : "(max-width:479.98px)"
  });

  // ----------- 카테고리 드롭다운 state 관리 -----------
  const [isOpen, setIsOpen] = useState(false);
  const [
    selectedCategory, 
    setSelectedCategory
  ] = useState(categoryData[0].id);

  // ----------- 카테고리가 변경될 때 호출되는 함수 -----------
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setIsOpen(false);
  };

  // ----------- 드롭다운 토글 함수 -----------
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // ----------- 카테고리 아이템 목록 (임시) -----------
  const categoryItems = [
    {
      category: '의류',
      0: 30,
      1: 20,
      2: 20,
      3: 15,
      4: 15,
    },
    {
      category: '신발',
      0: 45,
      1: 35,
      5: 30,
      6: 20,
      7: 10,
    },
    {
      category: '가구',
      0: 40,
      1: 30,
      2: 60,
      3: 10,
      4: 80,
    },
    {
      category: '전자제품',
      0: 0,
      1: 10,
      5: 20,
      6: 30,
      7: 40,
    },
  ];


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom:
      isXLarge ? "50px" :
      isLarge ? "45px" :
      isMedium ? "40px" : "35px",
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
    height:
      isXLarge ? "60px" :
      isLarge ? "50px" :
      isMedium ? "45px" : "40px",
  };

  // ----------- 제목 스타일 -----------
  const titleTextStyle = {
    // 디자인
    marginTop:
      isXLarge ? "5px" :
      isLarge ? "3px" :
      isMedium ? "5px" : "4px",
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const contentsContainerStyle = {
    // 디자인
    padding:
      isXLarge ? "40px" :
      isLarge ? "35px" :
      isMedium ? "30px" : "25px",
    borderRadius:
      isXLarge ? "50px" :
      isLarge ? "40px" :
      isMedium ? "30px" : "20px",
    background: "#FFFFFF",
  };

  // ----------- 서브 제목 컨테이너 스타일 -----------
  const subTitleContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    marginBottom: isXLarge || isLarge ? "20px" : "10px",
  };
  
  // ----------- 서브 제목 스타일 -----------
  const subTitleStyle = {
    // 디자인
    marginTop: "3px",
  };

  // ----------- 카테고리 글자 스타일 -----------
  const categoryTextStyle = {
    // 디자인
    marginLeft: "15px",

    // 글자
    color: "#FF595E",
  };

  // ----------- 설명 컨테이너 스타일 -----------
  const descriptionContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    flexDirection: isXLarge || isLarge ? "row" : "column",
  }

  // ----------- 반응형 설명 컨테이너 스타일 -----------
  const responsiveDescriptionContainerStyle  = {
    // 컨텐츠 정렬
    display: "flex",
    flexDirection: !isSmall ? "row" : "column",
  }

  // ----------- 반응형 설명 서브 컨테이너 스타일 -----------
  const responsiveDescriptionSubContainerStyle  = {
    // 상속
    ...flexContainerStyle,

    // 글자
    color: "#4A4A4A",
  }

  // ----------- 설명 데이터 글자 스타일 -----------
  const descriptionDataStyle = {
    // 디자인
    margin:
      isXLarge ? "0 10px" :
      isLarge ? "0 8px" :
      isMedium ? "0 6px" : "0 4px",

    // 글자
    color: "#FF595E",
  }

  // ----------- 쉼표 스타일 -----------
  const restStyle = {
    // 디자인
    marginRight: "10px",
  }

  // ----------- 구분선 스타일 -----------
  const barStyle = {
    // 디자인
    margin: 
      isXLarge ? "30px 0" :
      isLarge ? "25px 0" :
      isMedium ? "20px 0" : "15px 0",
    width: "100%",
    height: "3px",
    backgroundColor: "#F0F0F0",
  };

  // ----------- 무작위 멘트 컨테이너 스타일 -----------
  const randomContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "center", // 둘레 균일 간격으로 정렬
  }

  // ----------- 멘트 컨테이너 스타일 -----------
  const mentContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 컨텐츠 정렬
    flexDirection: "column",
    justifyContent: "center",
  }

  // ----------- 멘트 데이터 스타일 -----------
  const mentDataStyle = {
    // 디자인
    margin:
      isXLarge ? "0 10px" :
      isLarge ? "0 8px" :
      isMedium ? "0 6px" : "0 4px",

    // 글자
    color: "#FF595E",
  }

  // ----------- 따옴표 스타일 -----------
  const quotesStyle = {
    // 디자인
    margin:
      isXLarge ? "0 12px" :
      isLarge ? "0 8px" :
      isMedium ? "0 4px" : "0",
  }

  // ----------- 태그 선호도 컨테이너 스타일 -----------
  const tagContentsContainerStyle = {
    // 상속
    ...contentsContainerStyle,

    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
  };

  // ----------- 드롭다운 컨테이너 스타일 -----------
  const dropdownContainerStyle = {
    // 디자인
    width: "100%",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: isXLarge || isLarge ? "center" : "flex-start",
    flexDirection: isXLarge || isLarge  ? "row" : "column",
  }

  // ----------- relative 컨테이너 스타일 -----------
  const relativeContainerStyle = {
    // 위치
    position: 'relative',
    
    // 디자인
    margin:
      isXLarge ? "0 10px" :
      isLarge ? "0 8px" :
      isMedium ? "0 6px" : "0 4px",
  }

  // ----------- 드롭다운 버튼 스타일 -----------
  const dropdownButtonStyle = {
    // 디자인
    padding:
      isXLarge ? "8px" :
      isLarge ? "7px" :
      isMedium ? "6px" : "5px",
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
  }

  // ----------- 드롭다운 메뉴 스타일 -----------
  const dropdownMenuStyle = {
    // 위치
    position: "absolute",
    left: 0,
    zIndex: 1,

    // 디자인
    marginTop: "4px",
    padding:
      isXLarge ? "0 8px" :
      isLarge ? "0 7px" :
      isMedium ? "0 6px" : "0 5px",
    width:
      isXLarge ? "120px" :
      isLarge ? "110px" :
      isMedium ? "100px" : "90px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#FFFFFF",
  }

  // ----------- 드롭다운 아이템 스타일 -----------
  const dropdownItemStyle = {
    // 디자인
    margin:
      isXLarge ? "8px 0" :
      isLarge ? "7px 0" :
      isMedium ? "6px 0" : "5px 0", 
    padding:
      isXLarge ? "8px" :
      isLarge ? "7px" :
      isMedium ? "6px" : "5px",
    cursor: "pointer",
  }

  // ----------- 차트 컨테이너 스타일 -----------
  const chartContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    marginTop: "20px",

    // 컨텐츠 정렬
    justifyContent: "center",
  }

  // ----------- 정보 컨테이너 스타일 -----------
  const infoContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    width: "100%",

    // 컨텐츠 정렬
    flexDirection: isXLarge || isLarge ? "row" : "column",
  }

  // ----------- 정보 아이템 스타일 -----------
  const infoItemStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    margin: isXLarge || isLarge ? "10px 0" : "5px 0",
    padding:
      isXLarge ? "10px 20px" :
      isLarge ? "8px 18px" :
      isMedium ? "6px 16px" : "4px 14px",
    width: isXLarge || isLarge ? "50%" : "100%", // (반응형) 큰 화면에서 아이템이 한 줄에 두 개씩 나타나게 함
    height:
      isXLarge ? "60px" :
      isLarge ? "52px" :
      isMedium ? "44px" : "36px",
    backgroundColor: "#F0F0F0",

    // 컨텐츠 정렬
    justifyContent: "space-between",
  };

  // ----------- 왼쪽 아이템 스타일 -----------
  const itemLeftStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    marginRight: 
      isXLarge ? "16px" :
      isLarge ? "12px" : "0px",
  };

  // ----------- 오른쪽 아이템 스타일 -----------
  const itemRightStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    marginLeft:
      isXLarge ? "16px" :
      isLarge ? "12px" : "0px",
  };

  // ----------- 태그 아이템 스타일 -----------
  const tagItemStyle = {
    // 디자인
    marginLeft: isXLarge || isMedium ? "20px" : "5px",
    paddingTop: "5px",
    width:
      isXLarge || isMedium ? "80px" :
      isMedium ? "70px" : "60px",
    borderRadius: "20px",

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "center", // 태그 가운데 정렬
  };

  // --------------------------------- css 끝 ---------------------------------

  
  // ----------- 배열에서 가장 높은 세 Tag를 찾는 함수 -----------
  const findTop3Tags = (obj) => {
    const sortedTags = Object.entries(obj).sort((a, b) => b[1] - a[1]);
    const top3Tags = sortedTags.slice(1, 4);

    return top3Tags.map(([key, value]) => ({ key, value }));
  };

  // ----------- 각 객체에서 가장 높은 세 값을 찾아 렌더링 하는 함수 -----------
  const renderTop3Categories = categoryItems.map((item, index) => {
    if (index % 2 === 0) {
      const top3Left = findTop3Tags(item);
      const top3Right = categoryItems[index + 1] ? findTop3Tags(categoryItems[index + 1]) : null;

      return (
        <>
          <div style={infoContainerStyle} key={index}>
            <div style={itemLeftStyle}>
              <div className="fontsize-md">{item.category}</div>
              <div style={flexContainerStyle}>
                {top3Left.map((tag, i) => (
                  <div
                    style={{
                      ...tagItemStyle,
                      backgroundColor: tagColorData[tag.key].color,
                    }}
                    className="fontsize-sm"
                    key={i}
                  >{tagColorData[tag.key].name}</div>
                ))}
              </div>
            </div>
            {top3Right && (
              <div style={itemRightStyle}>
                <div className="fontsize-md">{categoryItems[index + 1].category}</div>
                <div style={flexContainerStyle}>
                  {top3Right.map((tag, i) => (
                    <div
                      style={{
                        ...tagItemStyle,
                        backgroundColor: tagColorData[tag.key].color,
                      }}
                      className="fontsize-sm"
                      key={i}
                    >{tagColorData[tag.key].name}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      );
    }
    return null; // 홀수 index는 처리하지 않음
  });

  return (
    <>
      {/* -------------------------- 카테고리 선호도 -------------------------- */}
      <div style={containerStyle}>
        <div style={titleContainerStyle}>
          <span style={titleTextStyle} className="fontsize-xl">카테고리 선호도</span>
        </div>
        <div style={tagContentsContainerStyle}>

          {/* ------------- 관심있는 카테고리 ------------- */}
          <div style={subTitleContainerStyle}>
            <div style={subTitleStyle} className="fontsize-lg">가장 관심있는 카테고리 :</div>
            <div style={categoryTextStyle} className="fontsize-xl">" 의류 "</div>
          </div>
          <div style={descriptionContainerStyle}>
            <div style={responsiveDescriptionContainerStyle}>
              <div style={responsiveDescriptionSubContainerStyle}>
                <div className="fontsize-sm">작성한 투표의</div>
                <div style={descriptionDataStyle} className="fontsize-sm">[40]%</div>
                <div style={restStyle} className="fontsize-sm">,</div>
              </div>
              <div style={responsiveDescriptionSubContainerStyle}>
                <div className="fontsize-sm">참여한 투표의</div>
                <div style={descriptionDataStyle} className="fontsize-sm">[50]%</div>
                <div className="fontsize-sm">가</div>
              </div>
            </div>
            <div style={responsiveDescriptionSubContainerStyle}>
              <div style={descriptionDataStyle} className="fontsize-sm">[의류]</div>
              <div className="fontsize-sm">카테고리에 속해있어요!</div>
            </div>
          </div>
          {/* --------------------------------------- */}

          <div style={barStyle}></div>

          {/* ------------- 랜덤 선호도 비교 ------------- */}
          <div style={randomContainerStyle}>
            <div style={quotesStyle} className="fontsize-xl">"</div>
            <div style={mentContainerStyle}>
              <div style={flexContainerStyle}>
                <div style={mentDataStyle} className="fontsize-md">[닉네임]</div>
                <div className="fontsize-md">님과 같은</div>
                <div style={mentDataStyle} className="fontsize-md">[20대]</div>
                <div style={mentDataStyle} className="fontsize-md">[남성]</div>
                <div className="fontsize-md">의</div>
                <div style={mentDataStyle} className="fontsize-md">[42%]</div>
                <div className="fontsize-md">는</div>
              </div>
              <div style={flexContainerStyle}>
                <div style={mentDataStyle} className="fontsize-md">" 의류 "</div>
                <div className="fontsize-md">를 고를 때</div>
                <div style={mentDataStyle} className="fontsize-md">[태그 1]</div>
                <div className="fontsize-md">을 눈여겨봐요!</div>
              </div>
            </div>
            <div style={quotesStyle} className="fontsize-xl">"</div>
          </div>
          {/* --------------------------------------- */}

        </div>
      </div>

      {/* -------------------------- 태그 선호도 -------------------------- */}
      <div style={containerStyle}>
        <div style={titleContainerStyle}>
          <span style={titleTextStyle} className="fontsize-xl">태그 선호도</span>
        </div>
        <div style={tagContentsContainerStyle}>

          {/* ------------- 드롭다운 버튼 ------------- */}
          <div style={dropdownContainerStyle}>
            <div style={flexContainerStyle}>
              <div style={subTitleStyle} className="fontsize-md">나는</div>
              <div style={relativeContainerStyle}>
                <div
                  onClick={toggleDropdown}
                  style={dropdownButtonStyle}
                  className="fontsize-sm"
                >
                  {selectedCategory !== null
                    ? categoryData.find((c) => c.id === parseInt(selectedCategory))?.name
                    : '카테고리 선택'}
                </div>
                {isOpen && (
                  <div style={dropdownMenuStyle}>
                    {categoryData.map((category) => (
                      <div
                        key={category.id}
                        onClick={() => handleCategoryChange({ target: { value: category.id } })}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#FFE69C"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#FFFFFF"}
                        style={dropdownItemStyle}
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={subTitleStyle} className="fontsize-md">을(를) 구매 할 때</div>
              <div style={restStyle} className="fontsize-md">,</div>
            </div>
            <div style={subTitleStyle} className="fontsize-md">어떤 요소를 중요하게 생각할까?</div>
          </div>
          {/* --------------------------------------- */}

          {/* ------------- 차트 그래프 ------------- */}
          <div style={chartContainerStyle}>
            <MyStatisticsChart />
          </div>
          {/* --------------------------------------- */}

          <div style={barStyle}></div>

          {/* ------------- 카테고리별 선호 태그 ------------- */}
          <div style={subTitleStyle} className="fontsize-lg">카테고리별 선호 태그 TOP 3</div>
          {renderTop3Categories}
          {/* --------------------------------------- */}

        </div>
      </div>
    </>
  );
};

export default MyStatistics;
