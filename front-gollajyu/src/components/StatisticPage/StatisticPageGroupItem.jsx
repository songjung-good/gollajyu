import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import sobiTIData from "../../stores/testResultData.js";

const MyActivitiesCommentItem = () => {

  // ----------- 반응형 웹페이지 구현 -----------
  const isXLarge = useMediaQuery({
    query: "(min-width:1024px)",
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

  // ----------- 예시 데이터 (임시) -----------
  const userTypesData = [
    { label: "나이", options: ['전체', '10대', '20대', '30대', '40대', '50대 이상'], type: "radio" },
    { label: "성별", options: ['전체', '남자', '여자'], type: "radio" },
    { label: "소비성향", options: ['전체', ...sobiTIData.map(item => item.title)], type: "dropdown" },
  ];


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom: "30px",
    padding:
      isXLarge ? "20px 30px" :
      isLarge ? "17px 26px" :
      isMedium ? "14px 22px" : "11px 18px",
    width: "100%",
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)", // 그림자 효과
  };

  // ----------- flex 컨테이너 스타일 -----------
  const flexContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- 타입 컨테이너 스타일 -----------
  const typeContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 컨텐츠 정렬
    flexWrap: "wrap", // 가로 길이를 넘어가면 줄바꿈
  }

  // ----------- 나이 컨테이너 스타일 -----------
  const ageContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    marginTop: "20px",
    width: "100%",
  }

  // ----------- 성별 컨테이너 스타일 -----------
  const genderContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    marginTop: "20px",
    width: isXLarge || isLarge ? "55%" : "100%",
  }

  // ----------- 소비성향 컨테이너 스타일 -----------
  const textContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    marginTop: "20px",
    width: isXLarge || isLarge ? "40%" : "100%",
  }

  // ----------- 사용자 유형 스타일 -----------
  const typeStyle = {

  }

  // ----------- 라디오 아이템 스타일 -----------
  const radioItemStyle = {
    // 디자인
    marginLeft:
      isXLarge ? "60px" :
      isLarge ? "30px" :
      isMedium ? "20px" : "15px",
  }

  // --------------------------------- css 끝 ---------------------------------


  return (
    <>
      <div style={containerStyle}>
        <div>사용자 유형 [1]</div>
        <div style={typeContainerStyle}>
          {userTypesData.map((type, index) => (
            <div
              style={{
                ...(index === 0 ? ageContainerStyle : 
                    index === 1 ? genderContainerStyle : textContainerStyle ),
              }}
              key={index}
            >
              <div style={typeStyle}>{type.label}</div>
              {type.type === "radio" ? (
                <div style={flexContainerStyle}>
                  {type.options.map((option, optionIndex) => (
                    <div style={radioItemStyle} key={optionIndex}>
                      <input type="radio" name={type.label} value={option} />
                      <label>{option}</label>
                    </div>
                  ))}
                </div>
              ) : (
                <select>
                  {type.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyActivitiesCommentItem;
