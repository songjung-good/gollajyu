import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import DefaultProfileImage from "/assets/images/default_profile_img.png";
import PointImage from "/assets/images/point_img.png";

const MyActivities = () => {
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


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    marginBottom: "50px",
  };

  // ----------- 제목 및 버튼 컨테이너 스타일 -----------
  const titleContainerStyle = {
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
    width: "50px",
    height: "50px",
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
    padding: "10px 20px",
    width: isSmall? "100%" : "50%",
    height: "60px",
    backgroundColor: "#F0F0F0",

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "space-between", // 항목 균일 간격으로 정렬
    alignItems: "center",
  };

  // ----------- 아이템 서브 컨테이너 스타일 -----------
  const itemSubContainerStyle = {
    // 디자인
    width: "100%",
    margin: !isSmall ? "10px 0" : "0",

    // 컨텐츠 정렬
    display: "flex",
    flexDirection: !isSmall ? "row" : "column",
  }

  // ----------- 왼쪽 아이템 스타일 -----------
  const itemLeftStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    margin: isSmall ? "10px 0" : "0 20px 0 0",
  };

  // ----------- 오른쪽 아이템 스타일 -----------
  const itemRightStyle = {
    // 상속
    ...infoItemStyle,

    // 디자인
    margin: isSmall ? "10px 0" : "0 0 0 20px",
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
        <div style={titleContainerStyle}>
          <span style={titleTextStyle}>활동정보</span>
        </div>
        <div style={profileContainerStyle}>
          <div style={infoContainerStyle}>
            <img
              src={PointImage}
              alt="프로필 이미지"
              style={profileImageStyle}
            />
            <div style={nicknameStyle}>[닉네임]</div>
            <div style={emailStyle}>[512]</div>
          </div>
          <div style={barStyle}></div>
          <div style={{
            ...infoContainerStyle,
            flexDirection: "column"
          }}>
            <div style={itemSubContainerStyle}>
              <div style={itemLeftStyle}>
                <div style={itemTextStyle}>투표작성</div>
                <div style={mediumTextStyle}>[12]개</div>
              </div>
              <div style={itemRightStyle}>
                <div style={itemTextStyle}>누적 투표 좋아요</div>
                <div style={mediumTextStyle}>[12]</div>
              </div>
            </div>
            <div style={itemSubContainerStyle}>
              <div style={itemLeftStyle}>
                <div style={itemTextStyle}>투표 참여</div>
                <div style={mediumTextStyle}>[12]회</div>
              </div>
              <div style={itemRightStyle}>
                <div style={itemTextStyle}>지금 골라쥬 방송</div>
                <div style={mediumTextStyle}>[12]회</div>
              </div>
            </div>
            <div style={itemSubContainerStyle}>
              <div style={itemLeftStyle}>
                <div style={itemTextStyle}>댓글 작성</div>
                <div style={mediumTextStyle}>[12]개</div>
              </div>
              <div style={itemRightStyle}>
                <div style={itemTextStyle}>누적 댓글 좋아요</div>
                <div style={mediumTextStyle}>[12]</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------- 소비성향 ------------- */}
      <div style={containerStyle}>
        <div style={titleContainerStyle}>
          <span style={titleTextStyle}>활동기록</span>
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

export default MyActivities;
