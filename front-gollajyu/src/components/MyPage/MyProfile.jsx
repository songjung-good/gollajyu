import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import TestResultHeader from "../TestResultHeader";
import sobiTIData from "../../stores/testResultData.js";
import useAuthStore from "../../stores/userState";
import API_URL from "../../stores/apiURL";
import DefaultProfileImage from "/assets/images/default_profile_img.png";

const MyProfile = () => {
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

  // ----------- 버튼 hover -----------
  const [buttonHovered, setButtonHovered] = useState(false);
  const [testButtonHovered, setTestButtonHovered] = useState(false);

  // ----------- state 정의 -----------
  const [result, setResult] = useState(1);
  const [matchingData, setMatchingData] = useState({});

  // ----------- result가 변경될 때마다 실행되는 함수 -----------
  const user = useAuthStore((state) => state.user); // local storage에 로그인 시 저장된 user 데이터를 가져옴 -> 네비게이션바에서도 이렇게 사용가능 (위의 import 참고)
  useEffect(() => {
    setResult(user.typeId);
    setMatchingData(sobiTIData.find((data) => data.id === user.typeId));
  }, []);

  // --------------------------------- css 시작 ---------------------------------

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
  const titleStyle = {
    // 디자인
    marginTop: isXLarge ? "5px" : isLarge ? "3px" : isMedium ? "5px" : "4px",
  };

  // ----------- 버튼 스타일 -----------
  const buttonStyle = {
    // 디자인
    marginLeft: "20px",
    width: isXLarge ? "100px" : isLarge ? "90px" : isMedium ? "80px" : "70px",
    height: isXLarge ? "40px" : isLarge ? "36px" : isMedium ? "32px" : "28px",
    border: "3px solid",
    borderRadius: "5px",
    borderColor: "#BEBEBE",
    background: buttonHovered ? "#D9D9D9" : "#FFFFFF", // 마우스 호버 시 배경 색상 변경
    transition: "background 0.5s ease", // 마우스 호버 시 색깔 천천히 변경

    // 글자
    color: "#9C9C9C", // 글자 색: 연한 회색
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const contentContainerStyle = {
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

  // ----------- 프로필 이미지 스타일 -----------
  const profileImageStyle = {
    // 디자인
    marginRight: "40px",
    width: isXLarge ? "100px" : isLarge ? "90px" : isMedium ? "80px" : "70px",
    height: isXLarge ? "100px" : isLarge ? "90px" : isMedium ? "80px" : "70px",
    borderRadius: "50%",
  };

  // ----------- 프로필 글자 스타일 -----------
  const profileTextStyle = {
    // 디자인
    marginTop: "10px",
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

  // ----------- 정보 컨테이너 스타일 -----------
  const infoContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 컨텐츠 정렬
    flexDirection: isXLarge || isLarge ? "row" : "column",
  };

  // ----------- 정보 아이템 스타일 -----------
  const infoItemStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    margin: isXLarge || isLarge ? "10px 0" : "5px 0",
    padding: isXLarge
      ? "10px 20px"
      : isLarge
      ? "8px 18px"
      : isMedium
      ? "6px 16px"
      : "4px 14px",
    width: isXLarge || isLarge ? "50%" : "100%", // (반응형) 큰 화면에서 아이템이 한 줄에 두 개씩 나타나게 함
    height: isXLarge ? "60px" : isLarge ? "52px" : isMedium ? "44px" : "36px",
    backgroundColor: "#F0F0F0",

    // 컨텐츠 정렬
    justifyContent: "space-between",
  };

  // ----------- 왼쪽 아이템 스타일 -----------
  const infoItemLeftStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    marginRight: isXLarge ? "16px" : isLarge ? "12px" : "0px",
  };

  // ----------- 오른쪽 아이템 스타일 -----------
  const infoItemRightStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    marginLeft: isXLarge ? "16px" : isLarge ? "12px" : "0px",
  };

  // ----------- 정보 데이터 스타일 -----------
  const infoDataStyle = {
    // 디자인
    marginTop: "3px",

    // 글자
    color: "#4A4A4A",
  };

  // ----------- 쇠비성향 컨텐츠 컨테이너 스타일 -----------
  const testContainerStyle = {
    // 상속
    ...contentContainerStyle,
    ...flexContainerStyle,

    // 컨텐츠 정렬
    flexDirection: "column",
  };

  // ----------- 소비성향 자세히 알아보기 버튼 스타일 -----------
  const testButtonStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    marginTop: "10px",
    width: isXLarge
      ? "300px"
      : isLarge
      ? "270px"
      : isMedium
      ? "240px"
      : "210px",
    height: isXLarge ? "70px" : isLarge ? "60px" : isMedium ? "50px" : "40px",
    borderRadius: "50px",
    background: testButtonHovered ? "#E6BE3D" : "#FFD257", // 마우스 호버 시 배경 색상 변경
    transition: "background 0.5s ease",

    // 컨텐츠 정렬
    justifyContent: "center",
  };

  // --------------------------------- css 끝 ---------------------------------

  return (
    <>
      {/* ------------- 기본정보 ------------- */}
      <div style={containerStyle}>
        <div style={titleContainerStyle}>
          <span style={titleStyle} className="fontsize-xl">
            기본정보
          </span>
          <button
            style={buttonStyle}
            className="fontsize-sm"
            onMouseOver={() => setButtonHovered(true)}
            onMouseOut={() => setButtonHovered(false)}
          >
            수정하기
          </button>
        </div>
        <div style={contentContainerStyle}>
          <div style={flexContainerStyle}>
            <img
              src={
                // user.profileImgUrl이 숫자면 -> 소비성향테스트 결과 번호 -> 해당 번호의 png 파일을 src로 지정
                !isNaN(user.profileImgUrl)
                  ? `/assets/images/sobiTest/${user.profileImgUrl}.png`
                  : user.profileImgUrl
              }
              alt="프로필 이미지"
              style={profileImageStyle}
            />
            <div>
              <div style={profileTextStyle} className="fontsize-lg">
                {user.nickname}
              </div>
              <div style={profileTextStyle} className="fontsize-md">
                {user.email}
              </div>
            </div>
          </div>
          <div style={barStyle}></div>
          <div style={infoContainerStyle}>
            <div style={infoItemLeftStyle}>
              <div className="fontsize-md">생년월일</div>
              <div style={infoDataStyle} className="fontsize-sm">
                {`${user.birthday.year}.${String(user.birthday.month).padStart(
                  2,
                  "0"
                )}.${String(user.birthday.day).padStart(2, "0")}`}
              </div>
            </div>
            <div style={infoItemRightStyle}>
              <div className="fontsize-md">성별</div>
              <div style={infoDataStyle} className="fontsize-sm">
                {user.gender === "MALE" ? "남성" : "여성"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------- 소비성향 ------------- */}
      <div style={containerStyle}>
        <div style={titleContainerStyle}>
          <span style={titleStyle} className="fontsize-xl">
            소비성향
          </span>
        </div>
        <div style={testContainerStyle}>
          <TestResultHeader data={matchingData} result={result} />
          <NavLink
            to="/TestResultPage"
            end
            style={testButtonStyle}
            className="fontsize-md"
            onMouseOver={() => setTestButtonHovered(true)}
            onMouseOut={() => setTestButtonHovered(false)}
          >
            자세히 알아보기
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
