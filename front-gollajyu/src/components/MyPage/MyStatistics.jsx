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

// 카테고리 및 소비성향 데이터 불러오기
import categoryData from "/src/stores/categoryData";
import tagColorData from "/src/stores/tagColorData";

// 차트 컴포넌트
import MyStatisticsChart from "./MyStatisticsChart";

// Material-UI의 CircularProgress 컴포넌트
import { CircularProgress } from "@mui/material";


const filteredCategoryData = categoryData.filter((category) => {
  return category.name !== "전체" && category.name !== "간단";
});

const RecommendModal = ({ topCategory, closeModal }) => {
  const user = useAuthStore((state) => state.user);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(API_URL + `/members/${user.memberId}/recommends`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setData("Error");
      });
  }, []);
  const handleClick = (linkUrl) => {
    window.open(linkUrl);
  };
  return (
    <div
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center text-center"
      onClick={() => closeModal()}
    >
      <div className="bg-white p-6 rounded-3xl xl:w-[700px] xl:h-[620px] lg:w-[600px] lg:h-[550px] md:w-[460px] md:h-[460px] sm:w-[255px] sm:h-[530px] relative">
        <div>
          <h1 className="fontsize-lg">{topCategory.key} 추천 쇼핑몰</h1>
          <p className="fontsize-xs mb-5">
            이미지 클릭 시, 쇼핑몰로 이동합니다
          </p>
        </div>
        <button
          className="absolute right-2 top-2 bg-red-400 rounded-full w-[3.5rem] h-[2.2rem] px-auto py-auto"
          onClick={() => closeModal()}
        >
          닫기
        </button>
        {data.length == 0 && (
          <div className="flex flex-col h-1/2 items-center justify-center">
            <CircularProgress size={100} sx={{ color: "#FFD257" }} />
            <p className="my-5">열심히 찾고 있어요...!</p>
          </div>
        )}

        {data.length > 0 && data !== "Error" && (
          <div className="grid grid-cols-3 sm:grid-cols-2 gap-1">
            {data.slice(0, 6).map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(item.linkUrl)}
                className="rounded-3xl w-[12rem] h-[15rem] mx-auto px-3 pt-3 pb-10 cursor-pointer hover:bg-amber-100"
              >
                <img
                  src={item.imageUrl}
                  alt="사이트 이미지"
                  className="rounded-3xl w-full"
                />
                <p className="fontsize-sm break-keep">{item.text}</p>
              </div>
            ))}
          </div>
        )}

        {data === "Error" && (
          <p className="fontsize-md my-10">
            투표 이력이 존재하지 않아 사이트 추천이 어렵습니다. <br />
            투표에 참여해쥬~
          </p>
        )}
      </div>
    </div>
  );
};


const MyStatistics = () => {

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // ----------- 카테고리 드롭다운 state 관리 -----------
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryData[1].id);

  // ----------- 카테고리가 변경될 때 호출되는 함수 -----------
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setIsOpen(false);
  };

  // ----------- 드롭다운 토글 함수 -----------
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // ----------- 서버에서 내가 참여한 투표를 받아오고 객체로 정리하는 작업 ------
  const user = useAuthStore((state) => state.user);
  const [categoryRatio, setCategoryRatio] = useState({});
  const [tagRatio, setTagRatio] = useState({});
  const [topCategory, setTopCategory] = useState("");
  const [othersTopTag, setOthersTopTag] = useState("");

  // 나이대 구하기
  const currentYear = new Date().getFullYear();
  // 0~9세: 0, 10~19세: 1, 20~29세: 2, ...
  const ageId = Math.floor((currentYear - user.birthday.year) / 10);

  // "전체"를 제외한 카테고리 이름 순서대로 담긴 배열
  const categoryNames = categoryData.map((item) => item.name).slice(1);

  // 함수를 통해 카테고리 별로 태그 비율을 계산하는 기능을 추출합니다.
  const calculateCategoryRatio = (data, totalCount) => {
    const categoryRatio = {};
    for (const category of categoryNames) {
      if (data.hasOwnProperty(category)) {
        const categoryObj = data[category];
        const categoryTotal = categoryObj.find(
          (item) => item.tagId === 0
        ).count;
        categoryRatio[category] = (categoryTotal / totalCount) * 100;
      }
    }
    return categoryRatio;
  };

  // 카테고리 별, 태그 별로 비율을 계산
  const calculateTagRatio = (data) => {
    const tagRatio = [];
    for (const category of categoryNames) {
      if (data.hasOwnProperty(category)) {
        const categoryObj = data[category];
        console.log(category, categoryObj);
        const categoryTotal = categoryObj.find(
          (item) => item.tagId === 0
        ).count;
        const tmpObj = {};
        tmpObj["category"] = category;
        for (const obj of categoryObj) {
          if (obj.tagId !== 0) {
            tmpObj[obj.tag] = (obj.count / categoryTotal) * 100;
          }
        }
        tagRatio.push(tmpObj);
      }
    }
    return tagRatio;
  };

  const getUserStatistics = (topCategory) => {
    const categoryId = categoryData.find(
      (item) => item.name == topCategory.key
    ).id;
    // (현재 유저와 나이대, 성별이 같은 유저)의 (현재 유저가 가장 관심있는 카테고리)에 대한 투표 정보를 가져옴
    const axiosData = {
      memberId: 0,
      typeId: 0,
      age: ageId,
      gender: user.gender,
      categoryId: categoryId,
    };
    axios
      .post(API_URL + "/statistics", axiosData)
      .then((res) => {
        console.log(res);
        const allValue = res.data.find((item) => item.tagId === 0).count;
        const othersTagRatio = {};
        res.data.forEach((item) => {
          if (item.tagId != 0) {
            othersTagRatio[item.tag] = (item.count / allValue) * 100;
          }
        });

        // console.log(othersTagRatio)
        setOthersTopTag(
          Object.entries(othersTagRatio).reduce(
            (prev, [key, value]) => {
              return value > prev.value ? { key, value } : prev;
            },
            { key: null, value: -Infinity }
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 }); // 페이지 로드되면 최상단으로 가기
    axios
      .get(API_URL + `/members/${user.memberId}/votes/statistics`)
      .then((res) => {
        console.log(res);
        // 간단을 제외하고, 참여한 모든 투표 수를 더함
        let totalCount = 0;
        for (const category in res.data) {
          if (res.data.hasOwnProperty(category)) {
            const categoryData = res.data[category];
            const categoryTotal = categoryData.find(
              (item) => item.tagId === 0
            ).count;
            totalCount += categoryTotal;
          }
        }

        const tmpCategoryRatio = calculateCategoryRatio(res.data, totalCount);
        const tmpTagRatio = calculateTagRatio(res.data);
        const tmpTopCategory = Object.entries(tmpCategoryRatio).reduce(
          (prev, [key, value]) => {
            return value > prev.value ? { key, value } : prev;
          },
          { key: null, value: -Infinity }
        );
        setCategoryRatio(tmpCategoryRatio);
        setTagRatio(tmpTagRatio);
        setTopCategory(tmpTopCategory);
        console.log(tmpCategoryRatio);
        console.log(tmpTagRatio);
        getUserStatistics(tmpTopCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // --------------------- 쇼핑몰 크롤링 관련 코드 ---------------------
  const [showModal, setShowModal] = useState(false);

  const handleRecommend = () => {
    // TODO 작은 모달 띄우고, 크롤링한 쇼핑몰을 모달에 랜더링
    setShowModal(true);
    axios.get(API_URL + `/members/${user.memberId}/recommends`);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom: isXLarge ? "50px" : isLarge ? "45px" : isMedium ? "40px" : "35px",
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
    borderRadius: isXLarge ? "50px" : isLarge ? "40px" : isMedium ? "30px" : "20px",
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
  };

  // ----------- 반응형 설명 컨테이너 스타일 -----------
  const responsiveDescriptionContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    flexDirection: !isSmall ? "row" : "column",
  };

  // ----------- 반응형 설명 서브 컨테이너 스타일 -----------
  const responsiveDescriptionSubContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 글자
    color: "#4A4A4A",
  };

  // ----------- 설명 데이터 글자 스타일 -----------
  const descriptionDataStyle = {
    // 디자인
    margin: isXLarge ? "0 10px" : isLarge ? "0 8px" : isMedium ? "0 6px" : "0 4px",

    // 글자
    color: "#FF595E",
  };

  // ----------- 쉼표 스타일 -----------
  const restStyle = {
    // 디자인
    marginRight: "10px",
  };

  // ----------- 구분선 스타일 -----------
  const barStyle = {
    // 디자인
    margin: isXLarge ? "30px 0" : isLarge ? "25px 0" : isMedium ? "20px 0" : "15px 0",
    width: "100%",
    height: "3px",
    backgroundColor: "#F0F0F0",
  };

  // ----------- 무작위 멘트 컨테이너 스타일 -----------
  const randomContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "center", // 둘레 균일 간격으로 정렬
  };

  // ----------- 멘트 컨테이너 스타일 -----------
  const mentContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 컨텐츠 정렬
    flexDirection: "column",
    justifyContent: "center",
  };

  // ----------- 멘트 데이터 스타일 -----------
  const mentDataStyle = {
    // 디자인
    margin: isXLarge ? "0 10px" : isLarge ? "0 8px" : isMedium ? "0 6px" : "0 4px",

    // 글자
    color: "#FF595E",
  };

  // ----------- 따옴표 스타일 -----------
  const quotesStyle = {
    // 디자인
    margin: isXLarge ? "0 12px" : isLarge ? "0 8px" : isMedium ? "0 4px" : "0",
  };

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
    flexDirection: isXLarge || isLarge ? "row" : "column",
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
    width: isXLarge ? "120px" : isLarge ? "110px" : isMedium ? "100px" : "90px",
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
    padding: isXLarge ? "0 8px" : isLarge ? "0 7px" : isMedium ? "0 6px" : "0 5px",
    width: isXLarge ? "120px" : isLarge ? "110px" : isMedium ? "100px" : "90px",
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

  // ----------- 정보 컨테이너 스타일 -----------
  const infoContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    width: "100%",

    // 컨텐츠 정렬
    flexDirection: isXLarge || isLarge ? "row" : "column",
  };

  // ----------- 정보 아이템 스타일 -----------
  const infoItemStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    margin: isXLarge || isLarge ? "10px 0" : "5px 0",
    padding: isXLarge ? "10px 20px" : isLarge ? "8px 18px" : isMedium ? "6px 16px" : "4px 14px",
    width: isXLarge || isLarge ? "50%" : "100%", // (반응형) 큰 화면에서 아이템이 한 줄에 두 개씩 나타나게 함
    height: isXLarge ? "60px" : isLarge ? "52px" : isMedium ? "44px" : "36px",
    backgroundColor: "#F0F0F0",

    // 컨텐츠 정렬
    justifyContent: "space-between",
  };

  // ----------- 왼쪽 아이템 스타일 -----------
  const itemLeftStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    marginRight: isXLarge ? "16px" : isLarge ? "12px" : "0px",
  };

  // ----------- 오른쪽 아이템 스타일 -----------
  const itemRightStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    marginLeft: isXLarge ? "16px" : isLarge ? "12px" : "0px",
  };

  // ----------- 태그 아이템 스타일 -----------
  const tagItemStyle = {
    // 디자인
    marginLeft: isXLarge || isMedium ? "20px" : "5px",
    paddingTop: "5px",
    width: isXLarge || isMedium ? "80px" : isMedium ? "70px" : "60px",
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
  const renderTop3Categories =
    tagRatio.length > 0 &&
    tagRatio.map((item, index) => {
      if (index % 2 === 0) {
        const top3Left = findTop3Tags(item);
        const top3Right = tagRatio[index + 1]
          ? findTop3Tags(tagRatio[index + 1])
          : null;
        return (
          <>
            <div style={infoContainerStyle} key={index}>
              <div style={itemLeftStyle}>
                <div className="fontsize-md">{item.category}</div>
                <div style={flexContainerStyle}>
                  {top3Left.map((tag, index) => (
                    <div
                      style={{
                        ...tagItemStyle,
                        backgroundColor:
                          tag.key &&
                          tagColorData.find((tagObj) => tagObj.name == tag.key)
                            .color,
                      }}
                      className="fontsize-sm"
                      key={index}
                    >
                      {tag.key}
                    </div>
                  ))}
                </div>
              </div>
              {top3Right && (
                <div style={itemRightStyle}>
                  <div className="fontsize-md">
                    {tagRatio[index + 1].category}
                  </div>
                  <div style={flexContainerStyle}>
                    {top3Right.map((tag, i) => (
                      <div
                        style={{
                          ...tagItemStyle,
                          backgroundColor:
                            tag.key &&
                            tagColorData.find(
                              (tagObj) => tagObj.name == tag.key
                            ).color,
                        }}
                        className="fontsize-sm"
                        key={i}
                      >
                        {tag.key}
                      </div>
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
        <div style={titleContainerStyle} className="flex justify-between">
          <span style={titleTextStyle} className="fontsize-xl">
            # 카테고리 선호도
          </span>
          <button
            className="bg-amber-300 rounded-full mx-5 px-5 py-3 fontsize-sm hover:bg-amber-400"
            onClick={handleRecommend}
          >
            쇼핑몰 추천받기
          </button>
        </div>
        <div style={tagContentsContainerStyle}>

          {/* ------------- 관심있는 카테고리 ------------- */}
          <div style={subTitleContainerStyle}>
            <div style={subTitleStyle} className="fontsize-lg">
              가장 관심있는 카테고리 :
            </div>
            <div style={categoryTextStyle} className="fontsize-xl">
              " {topCategory.key} "
            </div>
          </div>
          <div style={descriptionContainerStyle}>
            <div style={responsiveDescriptionContainerStyle}>
              <div style={responsiveDescriptionSubContainerStyle}>
                <div className="fontsize-sm">참여한 투표의</div>
                <div style={descriptionDataStyle} className="fontsize-sm">
                  {topCategory && topCategory.value.toFixed(0)}%
                </div>
                <div className="fontsize-sm">가</div>
              </div>
            </div>
            <div style={responsiveDescriptionSubContainerStyle}>
              <div style={descriptionDataStyle} className="fontsize-sm">
                {topCategory.key}
              </div>
              <div className="fontsize-sm">카테고리에 속해있어요!</div>
            </div>
          </div>

          <div style={barStyle}></div>

          {/* ------------- 랜덤 선호도 비교 ------------- */}
          <div style={randomContainerStyle}>
            <div style={quotesStyle} className="fontsize-xl">
              "
            </div>
            <div style={mentContainerStyle}>
              <div style={flexContainerStyle}>
                <div style={mentDataStyle} className="fontsize-md">
                  {user.nickname}
                </div>
                <div className="fontsize-md">님과 같은</div>
                <div style={mentDataStyle} className="fontsize-md">
                  {ageId * 10}대
                </div>
                <div style={mentDataStyle} className="fontsize-md">
                  {user.gender == "MALE" ? "남성" : "여성"}
                </div>
                <div className="fontsize-md">의</div>
                <div style={mentDataStyle} className="fontsize-md">
                  {othersTopTag && othersTopTag.value.toFixed(0)}%
                </div>
                <div className="fontsize-md">는</div>
              </div>
              <div style={flexContainerStyle}>
                <div style={mentDataStyle} className="fontsize-md">
                  " {topCategory.key} "
                </div>
                <div className="fontsize-md">를 고를 때</div>
                <div
                  style={{
                    ...mentDataStyle,
                    color: "black",
                    backgroundColor:
                      othersTopTag &&
                      tagColorData.find((item) => item.name == othersTopTag.key)
                        .color,
                  }}
                  className="fontsize-md"
                >
                  {othersTopTag.key}
                </div>
                <div className="fontsize-md">을 눈여겨봐요!</div>
              </div>
            </div>
            <div style={quotesStyle} className="fontsize-xl">
              "
            </div>
          </div>

        </div>
      </div>

      {/* -------------------------- 태그 선호도 -------------------------- */}
      <div style={containerStyle}>
        <div style={titleContainerStyle}>
          <span style={titleTextStyle} className="fontsize-xl">
            # 태그 선호도
          </span>
        </div>
        <div style={tagContentsContainerStyle}>

          {/* ------------- 드롭다운 버튼 ------------- */}
          <div style={dropdownContainerStyle}>
            <div style={flexContainerStyle}>
              <div style={subTitleStyle} className="fontsize-md">
                나는
              </div>
              <div style={relativeContainerStyle}>
                <div
                  onClick={toggleDropdown}
                  style={dropdownButtonStyle}
                  className="fontsize-sm"
                >
                  {selectedCategory !== null
                    ? filteredCategoryData.find(
                        (c) => c.id === parseInt(selectedCategory)
                      )?.name
                    : "카테고리 선택"}
                </div>
                {isOpen && (
                  <div style={dropdownMenuStyle}>
                    {filteredCategoryData.map((category) => (
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

          {/* ------------- 차트 그래프 ------------- */}
          <div style={chartContainerStyle}>
            {tagRatio && (
              <MyStatisticsChart
                tagRatio={tagRatio.length > 1 ? tagRatio : null}
                selectedCategory={selectedCategory}
              />
            )}
          </div>

          <div style={barStyle}></div>

          {/* ------------- 카테고리별 선호 태그 ------------- */}
          <div style={subTitleStyle} className="fontsize-lg">
            카테고리별 선호 태그 TOP 3
          </div>
          {tagRatio.length > 0 && renderTop3Categories}

        </div>
      </div>
      {showModal && (
        <RecommendModal topCategory={topCategory} closeModal={closeModal} />
      )}
    </>
  );
};

export default MyStatistics;
