import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import DefaultProfileImage from "/assets/images/default_profile_img.png";

const MyProfile = () => {
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
  
  // ----------- 버튼 hover -----------
  const [
    buttonHovered,
    setButtonHovered
  ] = useState(false);


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom: "50px",
  };

  // ----------- 제목 및 버튼 컨테이너 스타일 -----------
  const titleButtonContainerStyle = {
    // 디자인
    marginBottom: "20px",
    height: "60px",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- 제목 스타일 -----------
  const titleTextStyle = {
    // 디자인
    marginTop: "5px",

    // 글자
    fontSize: "32px",
  };

  // ----------- 큰 글자 스타일 -----------
  const bigTextStyle = {
    // 글자
    fontSize: "24px",
  };

  // ----------- 중간 글자 스타일 -----------
  const mediumTextStyle = {
    // 글자
    fontSize: "20px",
    color: "#4A4A4A", // 글자 색: 회색
  };

  // ----------- 작은 글자 스타일 -----------
  const smallTextStyle = {
    // 글자
    fontSize: "20px",
  };

  // ----------- 버튼 스타일 -----------
  const buttonStyle = {
    // 디자인
    marginLeft: "20px",
    width: "90px", // 버튼 넓이: 90px
    height: "40px", // 버튼 높이: 40px
    border: "3px solid", // 테두리 스타일
    borderRadius: "5px", // 둥근 테두리: 5px
    borderColor: "#BEBEBE", // 테두리 색: 연한 회색
    background: buttonHovered ? "#D9D9D9" : "#FFFFFF", // 마우스 호버 시 배경 색상 변경
    transition: "background 0.5s ease", // 마우스 호버 시 색깔 천천히 변경

    // 글자
    color: "#9C9C9C", // 글자 색: 회색
  };

  // ----------- 프로필 컨테이너 스타일 -----------
  const profileContainerStyle = {
    // 디자인
    padding: "40px",
    borderRadius: "50px",
    background: "#FFFFFF",
  };

  // ----------- 내 정보 컨테이너 스타일 -----------
  const infoContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- 프로필 이미지 스타일 -----------
  const profileImageStyle = {
    // 디자인
    marginRight: "40px",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
  };

  // ----------- 닉네임 스타일 -----------
  const nicknameStyle = {
    // 상속
    ...bigTextStyle,

    // 디자인
    marginTop: "20px",
  };

  // ----------- 이메일 스타일 -----------
  const emailStyle = {
    // 상속
    ...mediumTextStyle,

    // 디자인
    marginTop: "10px",
  };

  // ----------- 구분선 스타일 -----------
  const barStyle = {
    // 디자인
    margin: "30px 0",
    height: "3px",
    width: "100%",
    backgroundColor: "#F0F0F0",
  };

  // ----------- 내 정보 아이템 스타일 -----------
  const infoItemStyle = {
    // 디자인
    margin: "10px 0",
    padding: "10px 20px",
    width: isSmall? "100%" : "50%",
    height: "60px",
    backgroundColor: "#F0F0F0",

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "space-between", // 항목 균일 간격으로 정렬
    alignItems: "center",
  };

  // ----------- 왼쪽 아이템 스타일 -----------
  const itemLeftStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    marginRight: isSmall ? "0px" : "20px",
  };

  // ----------- 오른쪽 아이템 스타일 -----------
  const itemRightStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    marginLeft: isSmall ? "0px" : "20px",
  };

  // ----------- 아이템 텍스트 스타일 -----------
  const itemTextStyle = {
    // 글자
    fontSize: !isLarge ? "22px" : "24px"
  }

  // ----------- 소비성향 이미지 스타일 -----------
  const testImageStyle = {
    // 디자인
    marginRight: "20px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  };

  // --------------------------------- css 끝 ---------------------------------


  return (
    <>
      {/* ------------- 기본정보 ------------- */}
      <div style={containerStyle}>
        <div style={titleButtonContainerStyle}>
          <span style={titleTextStyle}>기본정보</span>
          <button
            style={buttonStyle}
            onMouseOver={() => setButtonHovered(true)}
            onMouseOut={() => setButtonHovered(false)}
          >
            수정하기
          </button>
        </div>
        <div style={profileContainerStyle}>
          <div style={infoContainerStyle}>
            <img
              src={DefaultProfileImage}
              alt="프로필 이미지"
              style={profileImageStyle}
            />
            <div>
              <div style={nicknameStyle}>[닉네임]</div>
              <div style={emailStyle}>[이메일]</div>
            </div>
          </div>
          <div style={barStyle}></div>
          <div style={{
            ...infoContainerStyle,
            flexDirection: isSmall? "column" : "row"
          }}>
            <div style={itemLeftStyle}>
              <div style={itemTextStyle}>생년월일</div>
              <div style={mediumTextStyle}>[생년월일]</div>
            </div>
            <div style={itemRightStyle}>
              <div style={itemTextStyle}>성별</div>
              <div style={mediumTextStyle}>[성별]</div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------- 소비성향 ------------- */}
      <div style={containerStyle}>
        <div style={titleButtonContainerStyle}>
          <span style={titleTextStyle}>소비성향</span>
        </div>
        <div style={profileContainerStyle}>
          <div style={infoContainerStyle}>
            <img
              src={DefaultProfileImage}
              alt="소비성향 이미지"
              style={testImageStyle}
            />
            <div style={bigTextStyle}>["소비성향"]</div>
          </div>
          <div style={barStyle}></div>
          <div style={smallTextStyle}>[소비성향에 대한 설명]</div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
