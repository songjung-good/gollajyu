// 리액트 및 훅/라이브러리
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 커스텀 스토어를 이용한 상태 관리
import useAuthStore from "/src/stores/userState";
import useModalStore from "/src/stores/modalState";

// 이미지 불러오기
import NowGollajyuImage from "/assets/images/vote-button/now_gollajyu_img.png";
import SimpleGollajyuImage from "/assets/images/vote-button/simple_gollajyu_img.png";
import PurchaseGollajyuImage from "/assets/images/vote-button/purchase_gollajyu_img.png";


const VoteButton = () => {
  
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn); // 로그인 여부

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();
  
  // ----------- 버튼 hover -----------
  const [buttonHovered, setButtonHovered] = useState(false);
  const [nowGollajyuHovered, setNowGollajyuHovered] = useState(false);
  const [simpleGollajyuHovered, setSimpleGollajyuHovered] = useState(false);
  const [purchaseGollajyuHovered, setPurchaseGollajyuHovered] = useState(false);

  // ----------- 투표 생성 버튼 호버/떠남 상태 업데이트 함수 -----------
  const buttonHover = () => {
    setButtonHovered(true);
  };

  const buttonClick = () => {
    setButtonHovered(!buttonHovered);  // 클릭 시 버튼 열고 닫음
  };

  // ----------- '지금골라쥬!' 버튼 호버/떠남 상태 업데이트 함수 -----------
  const nowGollajyuHover = () => {
    setNowGollajyuHovered(true);
  };

  const nowGollajyuLeave = () => {
    setNowGollajyuHovered(false);
  };

  // ----------- '간단골라쥬!' 버튼 호버/떠남 상태 업데이트 함수 -----------
  const simpleGollajyuHover = () => {
    setSimpleGollajyuHovered(true);
  };

  const simpleGollajyuLeave = () => {
    setSimpleGollajyuHovered(false);
  };

  // ----------- '구매골라쥬!' 버튼 호버/떠남 상태 업데이트 함수 -----------
  const purchaseGollajyHover = () => {
    setPurchaseGollajyuHovered(true);
  };

  const purchaseGollajyLeave = () => {
    setPurchaseGollajyuHovered(false);
  };

  // ----------- vote 버튼 밖 클릭 시 메뉴 닫음 -----------
  const buttonRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      // 클릭된 요소가 버튼 영역 안에 있는지 확인
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        // 버튼 외부를 클릭한 경우 세부 버튼을 닫음
        setButtonHovered(false);
      }
    };

    // 페이지에 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 버튼 컨테이너 스타일 -----------
  const voteButtonContainerStyle = {
    // 위치
    position: "fixed", // 버튼 하단에 고정
    zIndex: 49, // 모달 바로 아래 레이어에 위치 (모달은 50)
    bottom: isXLarge ? "50px" : isLarge ? "40px" : isMedium ? "30px" : "20px",
    right: isXLarge ? "50px" : isLarge ? "40px" : isMedium ? "30px" : "20px",
  };

  // ----------- 투표 생성 버튼 스타일 -----------
  const voteButtonStyle = {
    // 위치
    position: "relative", // 자신을 기준 위치로

    // 디자인
    width: isXLarge ? "75px" : isLarge ? "67px" : isMedium ? "59px" : "51px",
    height: isXLarge ? "75px" : isLarge ? "67px" : isMedium ? "59px" : "51px",
    borderRadius: "50%", // 버튼 둥근 테두리: 원
    backgroundColor: "#FF9999",

    // 글자
    color: "#FFFFFF",
  };

  // ----------- 투표 상세 설명 박스 스타일 -----------
  const xButtonStyle = {
    // 디자인
    paddingTop: "2px",
  }

  // ----------- 투표 상세 설명 박스 스타일 -----------
  const boxStyle = {
    // 위치
    position: "absolute", // relative를 기준 위치로
    right: isXLarge ? "15px" : isLarge ? "13px" : isMedium ? "11px" : "9px",

    // 디자인
    width: isXLarge ? "300px" : isLarge ? "270px" : isMedium ? "240px" : "210px",
    height: isXLarge ? "60px" : isLarge ? "54px" : isMedium ? "48px" : "42px",
    borderRadius: "50px",
    backgroundColor: "#F0F0F0",
    boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)", // 그림자 추가

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  // ----------- 텍스트 컨테이너 스타일 -----------
  const textContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "baseline",
  };

  // ----------- 텍스트 스타일 -----------
  const textStyle = {
    // 디자인
    marginLeft: isXLarge ? "30px" : isLarge ? "27px" : isMedium ? "24px" : "21px",

    // 글자
    color: "#000000", // 글자 색: 검정
  };

  // ----------- 포인트 텍스트 스타일 -----------
  const textPointStyle = {
    // 디자인
    marginLeft: isXLarge ? "10px" : isLarge ? "9px" : isMedium ? "8px" : "7px",

    // 글자
    color: "#FFA800", // 글자 색: 주황색
  };

  // ----------- 설명 텍스트 스타일 -----------
  const textDescriptionStyle = {
    // 상속
    ...textStyle, // 기본 텍스트 스타일 상속

    // 글자
    color: "#4A4A4A", // 글자 색: 회색
  };

  // ----------- 투표 세부 버튼 스타일 -----------
  const circleStyle = {
    // 위치
    position: "absolute", // relative를 기준 위치로
    right: "50%", // 화면의 중앙을 기준으로 오른쪽 50% 설정
    transform: `translateX(+50%) translateY(${buttonHovered ? 0 : 100}%)`, // 마우스 호버 시 위치 이동

    // 디자인
    width: isXLarge ? "60px" : isLarge ? "54px" : isMedium ? "48px" : "42px",
    height: isXLarge ? "60px" : isLarge ? "54px" : isMedium ? "48px" : "42px",
    borderRadius: "50%", // 원형 모양으로 설정
    backgroundColor: "#FF9999",
    opacity: buttonHovered ? 1 : 0, // 마우스 호버 시 투명도를 1로, 아닐 경우 0으로 설정
    transition: "opacity 0.5s ease, transform 0.5s ease", // 투명도와 위치 변화에 대한 애니메이션 효과 설정
  };

  // ----------- 이미지 스타일 -----------
  const imageStyle = {
    // 디자인
    width: "100%", // 이미지 가로 길이 100%
    height: "100%", // 이미지 세로 길이 100%
    borderRadius: "50%", // 둥근 테두리 설정
    objectFit: "cover", // 이미지가 부모 요소에 맞게 자동 조절되도록 설정
  };

  // --------------------------------- css 끝 ---------------------------------


  // 모달 상태 변경 함수
  const setLoginModalOpen = useModalStore((state) => state.setLoginModalOpen);
  const setVoteSimpleCreateModalOpen = useModalStore(
    (state) => state.setVoteSimpleCreateModalOpen
  );
  const setVoteProductCreateModalOpen = useModalStore(
    (state) => state.setVoteProductCreateModalOpen
  );

  // ----------- 버튼 아이템 목록 -----------
  const buttonItems = [
    {
      label: "지금골라쥬!",
      image: NowGollajyuImage,
      boxBottom: isXLarge ? 85 : isLarge ? 76 : isMedium ? 67 : 58,
      circleBottom: buttonHovered ? ( isXLarge ? 85 : isLarge ? 76 : isMedium ? 67 : 58 ) : -200,
      description: "라이브 방송으로 선택을 맡겨봐요",
      hovered: nowGollajyuHovered,
      mouseEnter: nowGollajyuHover,
      mouseLeave: nowGollajyuLeave,
      handleClick: () => {
        if (isLoggedIn) {
          // 로그인 사용자 -> 지금골라쥬 생성 페이지로 이동
          navigate("/CreateVideoRoom");
        } else {
          // 비로그인 사용자 -> 로그인창 띄움
          setLoginModalOpen();
        }
      },
    },
    {
      label: "간단골라쥬!",
      image: SimpleGollajyuImage,
      boxBottom: isXLarge ? 155 : isLarge ? 138 : isMedium ? 121 : 104,
      circleBottom: buttonHovered ? ( isXLarge ? 155 : isLarge ? 138 : isMedium ? 121 : 104 ) : -200,
      description: "간단한 질문으로 선택을 맡겨봐요",
      hovered: simpleGollajyuHovered,
      mouseEnter: simpleGollajyuHover,
      mouseLeave: simpleGollajyuLeave,
      handleClick: () => {
        console.log("간단골라쥬 클릭");
        if (isLoggedIn) {
          // 로그인 사용자 -> 생성 모달 띄움
          setVoteSimpleCreateModalOpen();
        } else {
          // 비로그인 사용자 -> 로그인창 띄움
          setLoginModalOpen();
        }
      },
    },
    {
      label: "구매골라쥬!",
      image: PurchaseGollajyuImage,
      boxBottom: isXLarge ? 225 : isLarge ? 200 : isMedium ? 175 : 150,
      circleBottom: buttonHovered ? ( isXLarge ? 225 : isLarge ? 200 : isMedium ? 175 : 150 ) : -200,
      description: "상세한 질문으로 선택을 맡겨봐요",
      hovered: purchaseGollajyuHovered,
      mouseEnter: purchaseGollajyHover,
      mouseLeave: purchaseGollajyLeave,
      handleClick: () => {
        console.log("구매골라쥬 클릭");
        if (isLoggedIn) {
          // 로그인 사용자 -> 생성 모달 띄움
          setVoteProductCreateModalOpen();
        } else {
          // 비로그인 사용자 -> 로그인창 띄움
          setLoginModalOpen();
        }
      },
    },
  ];

  // ----------- 버튼 렌더링 함수 -----------
  const renderButtons = () => {
    return buttonItems.map((button, index) => (
      <div // ----------- 설명란 -----------
        key={index}
        onMouseLeave={() => button.mouseLeave()}
      >
        {button.hovered && buttonHovered && (
          <div style={{
            ...boxStyle,
            bottom: `${button.boxBottom}px`,
          }}>
            <div style={textContainerStyle}>
              <div style={textStyle} className="fontsize-sm">{button.label}</div>
              <div style={textPointStyle} className="fontsize-xs">(10P 차감됩니다)</div>
            </div>
            <div style={textContainerStyle}>
              <div style={textDescriptionStyle} className="fontsize-xs">{button.description}</div>
            </div>
          </div>
        )}
        <div // ------------- 이미지 -------------
          style={{ ...circleStyle, bottom: `${button.circleBottom}px` }}
          onMouseEnter={() => button.mouseEnter()}
          onClick={() => button.handleClick()}
        >
          <img style={imageStyle} src={button.image} alt={button.label} />
        </div>
      </div>
    ));
  };

  return (
    <>
      {!isSmall && ( // 모바일 화면에서 투표 생성 버튼 렌더링 하지 않음
        <div
          style={voteButtonContainerStyle}
          onMouseEnter={buttonHover}
          onClick={buttonClick}  // 클릭 시 세부 버튼 닫기
          ref={buttonRef}
        >
          {/* ------------- 투표 버튼 ------------- */}
          <button style={voteButtonStyle}>
            {buttonHovered ? 
              <p style={xButtonStyle} className="fontsize-md">
                &#10006;
              </p> : (
              <p className="fontsize-sm">
                투표
                <br />
                생성
              </p>
            )}

            {/* ------------- 버튼 렌더링 함수 호출 ------------- */}
            {renderButtons()}
          </button>
        </div>
      )}
    </>
  );
};

export default VoteButton;