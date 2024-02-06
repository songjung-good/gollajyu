import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import sobiTIData from "../../stores/testResultData.js";

const StatisticPageGroupItem = ({ number, onRadioChange, onDropdownChange }) => {

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

  // ----------- 예시 데이터 -----------
  const userTypes = [
    { label: "나이", options: ['전체', '10대', '20대', '30대', '40대', '50대 이상'], type: "radio" },
    { label: "성별", options: ['전체', '남자', '여자'], type: "radio" },
    { label: "소비성향", options: ['전체', ...sobiTIData.map(item => item.title)], type: "dropdown" },
  ];

  // ----------- 사용자 유형 색 리스트 -----------
  const colorList = ["#2CB16A", "#FC9D2B", "#00A1FF", "#FF665A",]


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom:
      isXLarge ? "30px" :
      isLarge ? "25px" :
      isMedium ? "20px" : "15px",
    padding:
      isXLarge ? "20px 30px" :
      isLarge ? "17px 26px" :
      isMedium ? "14px 22px" : "11px 18px",
    width: "100%",
    borderRadius:
      isXLarge ? "30px" :
      isLarge ? "25px" :
      isMedium ? "20px" : "15px",
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)", // 그림자 효과
  };

  // ----------- 제목 스타일 -----------
  const titleStyle = {
    // 글자
    color: colorList[number - 1] || colorList[0],
    fontWeight: "bold"
  }

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
    justifyContent: "space-between",
    flexWrap: "wrap", // 가로 길이를 넘어가면 줄바꿈
  }

  // ----------- 타입 아이템 스타일 -----------
  const typeItemStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    marginTop:
      isXLarge ? "20px" :
      isLarge ? "18px" :
      isMedium ? "16px" : "14px",
    paddingLeft: 
      isXLarge ? "50px" :
      isLarge ? "30px" :
      isMedium ? "20px" : "7px",
    height:
      isXLarge ? "50px" :
      isLarge ? "40px" :
      isMedium ? "30px" : "25px",
    borderRadius: "30px",
    backgroundColor: "#F0F0F0",
  }

  // ----------- 나이 컨테이너 스타일 -----------
  const ageContainerStyle = {
    // 상속
    ...typeItemStyle,

    // 디자인
    width: "100%",
  }

  // ----------- 성별 컨테이너 스타일 -----------
  const genderContainerStyle = {
    // 상속
    ...typeItemStyle,

    // 디자인
    width: !isSmall ? "55%" : "100%",
  }

  // ----------- 소비성향 컨테이너 스타일 -----------
  const textContainerStyle = {
    // 상속
    ...typeItemStyle,

    // 디자인
    paddingRight: 
      isXLarge ? "20px" :
      isLarge ? "10px" : "0",
    width: !isSmall ? "44%" : "100%",
  }

  // ----------- 사용자 유형 스타일 -----------
  const typeStyle = {
    // 디자인
    marginTop:
      isXLarge ? "5px" :
      isLarge ? "4px" :
      isMedium ? "3px" : "2px",
    marginRight:
      isXLarge ? "50px" :
      isLarge ? "30px" :
      isMedium ? "10px" : "5px",
  }

  // ----------- 옵션 컨테이너 스타일 -----------
  const optionContainerStyle = {
    // 디자인
    width:
      isXLarge ? "110px" :
      isLarge ? "80px" :
      isMedium ? "62px" : "38px",
  }

  // ----------- 라디오 옵션 스타일 -----------
  const optionStyle = {
    // 디자인
    marginLeft:
      isXLarge ? "10px" :
      isLarge ? "8px" :
      isMedium ? "6px" : "4px",
  }

  // ----------- 드롭다운 스타일 -----------
  const dropdownStyle = {
    // 디자인
    border: "none",
    backgroundColor: "#F0F0F0",

    // 글자
    fontSize:
      isXLarge ? "16px" :
      isLarge ? "14px" :
      isMedium ? "12px" : "10px",
  }

  // --------------------------------- css 끝 ---------------------------------


  // ----------- '50대 이상'인 경우만 옵션의 width를 증가시키는 함수 -----------
  const getOptionContainerStyle = (option) => {
    if (option === '50대 이상') {
      return {
        ...optionContainerStyle,
        width:
          isXLarge ? "110px" :
          isLarge ? "80px" :
          isMedium ? "70px" : "60px",
      };
    }
    return optionContainerStyle;
  };

  return (
    <>
      <div style={containerStyle}>
        <div style={titleStyle} className="fontsize-md">사용자 유형 { number }</div>
        <div style={typeContainerStyle}>
          {userTypes.map((userType, index) => (
            <div
              style={{
                ...(index === 0 ? ageContainerStyle : 
                    index === 1 ? genderContainerStyle : textContainerStyle ),
              }}
              key={index}
            >
              <div style={typeStyle} className="fontsize-sm">{userType.label}</div>
              {userType.type === "radio" ? (
                <div style={flexContainerStyle}>
                  {userType.options.map((option, optionIndex) => (
                    <div style={getOptionContainerStyle(option)} key={optionIndex}>
                      <input
                        type="radio"
                        name={`${userType.label}-${number}`}
                        value={option}
                        onChange={(e) => onRadioChange(userType.label, number, e.target.value)}
                      />
                      <label style={optionStyle} className="fontsize-xs">{option}</label>
                    </div>
                  ))}
                </div>
              ) : (
                <select
                  style={dropdownStyle}
                  onChange={(e) => onDropdownChange(userType.label, number, e.target.value)}
                >
                  {userType.options.map((option, optionIndex) => (
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

export default StatisticPageGroupItem;
