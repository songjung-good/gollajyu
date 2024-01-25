import React, { useState } from "react";
import DefaultProfileImage from "/assets/images/default_profile_img.png";

const MyProfile = () => {
  // 버튼 hover
  const [informationButtonHovered, setInformationButtonHovered] =
    useState(false);
  const [testButtonHovered, setTestButtonHovered] = useState(false);

  const body = {
    padding: "70px",
  };

  const containerStyle = {
    marginBottom: "50px",
  };

  const titleButtonContainerStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  };

  const meduimFontStyle = {
    fontFamily: "GmarketSansMedium",
  };

  const bigTextStyle = {
    ...meduimFontStyle,
    fontSize: "24px",
  };

  const mediumTextStyle = {
    ...meduimFontStyle,
    fontSize: "20px",
    color: "#4A4A4A", // 글자 색: 회색
  };

  const smallTextStyle = {
    fontSize: "20px",
  };

  const buttonStyle = {
    ...meduimFontStyle,

    // 디자인
    marginLeft: "20px",
    width: "90px", // 버튼 넓이: 90px
    height: "40px", // 버튼 높이: 40px
    border: "3px solid", // 테두리 스타일
    borderRadius: "5px", // 둥근 테두리: 5px
    borderColor: "#BEBEBE", // 테두리 색: 연한 회색
    transition: "background 0.5s ease", // 마우스 호버 시 색깔 천천히 변경

    // 글자
    color: "#9C9C9C", // 글자 색: 회색
  };

  const informationButtonStyle = {
    ...buttonStyle,
    background: informationButtonHovered ? "#D9D9D9" : "#FFFFFF", // 마우스 호버 시 배경 색상 변경
  };

  const testButtonStyle = {
    ...buttonStyle,
    background: testButtonHovered ? "#D9D9D9" : "#FFFFFF", // 마우스 호버 시 배경 색상 변경
  };

  const profileContainerStyle = {
    padding: "40px",
    borderRadius: "50px",
    background: "#FFFFFF",
  };

  const infoContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const profileImageStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginRight: "40px",
  };

  const nicknameStyle = {
    ...bigTextStyle,
    marginTop: "20px",
  };

  const emailStyle = {
    ...mediumTextStyle,
    marginTop: "10px",
  };

  const barStyle = {
    margin: "30px 0",
    height: "3px",
    width: "100%",
    backgroundColor: "#F0F0F0",
  };

  const infoItemStyle = {
    display: "flex",
    justifyContent: "space-between", // 항목 균일 간격으로 정렬
    alignItems: "center",
    padding: "10px 20px",
    width: "50%",
    backgroundColor: "#F0F0F0",
  };

  const itemLeftStyle = {
    ...infoItemStyle,
    marginRight: "20px",
  };

  const itemRightStyle = {
    ...infoItemStyle,
    marginLeft: "20px",
  };

  const testImageStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "20px",
  };

  return (
    <div style={body}>
      <div style={containerStyle}>
        <div style={titleButtonContainerStyle}>
          <span style={bigTextStyle}>기본정보</span>
          <button
            style={informationButtonStyle}
            onMouseOver={() => setInformationButtonHovered(true)}
            onMouseOut={() => setInformationButtonHovered(false)}
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
          <div style={infoContainerStyle}>
            <div style={itemLeftStyle}>
              <div style={bigTextStyle}>생년월일</div>
              <div style={mediumTextStyle}>[생년월일]</div>
            </div>
            <div style={itemRightStyle}>
              <div style={bigTextStyle}>성별</div>
              <div style={mediumTextStyle}>[성별]</div>
            </div>
          </div>
        </div>
      </div>

      <div style={containerStyle}>
        <div style={titleButtonContainerStyle}>
          <span style={bigTextStyle}>소비성향</span>
          <button
            style={testButtonStyle}
            onMouseOver={() => setTestButtonHovered(true)}
            onMouseOut={() => setTestButtonHovered(false)}
          >
            다시하기
          </button>
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
    </div>
  );
};

export default MyProfile;
