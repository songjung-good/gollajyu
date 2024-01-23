import React, { useState } from "react";
import NowGollajyuImage from "/@images/now_gollajyu_img.png";
import SimpleGollajyuImage from "/@images/simple_gollajyu_img.png";
import PurchaseGollajyuImage from "/@images/purchase_gollajyu_img.png";

const VoteButton = () => {
  const [buttonHovered, setButtonHovered] = useState(false);
  const [nowGollajyuHovered, setNowGollajyuHovered] = useState(false);
  const [simpleGollajyuHovered, setSimpleGollajyuHovered] = useState(false);
  const [purchaseGollajyuHovered, setPurchaseGollajyuHovered] = useState(false);

  const voteButtonContainerStyle = {
    position: "fixed",
    bottom: "50px",
    right: "100px",
  };

  const voteButtonStyle = {
    position: "relative",
    width: "70px",
    height: "70px",
    backgroundColor: "#FF9999",
    borderRadius: "50%",
    fontFamily: "GmarketSansMedium",
    color: "#FFFFFF",
    cursor: "pointer",
  };

  const boxStyle = {
    position: "absolute",
    width: "300px",
    height: "60px",
    backgroundColor: "#F0F0F0",
    borderRadius: "50px",
    right: "5px",
    bottom: "80px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };
  
  const textContainerStyle = {
    display: "flex",
    alignItems: "center",
  };
  
  const textStyle = {
    fontFamily: "GmarketSansMedium",
    color: "#000000",
    marginLeft: "30px",
  };

  const textPointStyle = {
    ...textStyle,
    marginLeft: "10px",
    fontFamily: "GmarketSansLight",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#FFA800",
  }

  const textExplanationStyle = {
    ...textStyle,
    fontSize: "14px",
    color: "#4A4A4A",
  }
  
  const circleStyle = {
    position: "absolute",
    bottom: "80px",
    right: "50%",
    transform: "translateX(+50%)",
    width: "60px",
    height: "60px",
    backgroundColor: "#FF9999",
    borderRadius: "50%",
    transition: "bottom 0.5s ease",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
  };
  
  const closeButtonStyle = {
    position: "absolute",
    bottom: "290px",
    right: "50%",
    transform: "translateX(+50%)",
    width: "60px",
    fontFamily: "GmarketSansMedium",
    color: "#4A4A4A",
  };


  const buttonHover = () => {
    setButtonHovered(true);
  };

  const buttonCloseClick = () => {
    setButtonHovered(false);
  };

  const nowGollajyuHover = () => {
    setNowGollajyuHovered(true);
  };

  const nowGollajyuLeave = () => {
    setNowGollajyuHovered(false);
  };

  const simpleGollajyuHover = () => {
    setSimpleGollajyuHovered(true);
  };

  const simpleGollajyuLeave = () => {
    setSimpleGollajyuHovered(false);
  };

  const purchaseGollajyHover = () => {
    setPurchaseGollajyuHovered(true);
  };

  const purchaseGollajyLeave = () => {
    setPurchaseGollajyuHovered(false);
  };

  return (
    <div
      style={voteButtonContainerStyle}
      onMouseEnter={buttonHover}
    >
      <button style={voteButtonStyle}>
        투표<br />
        생성
        {buttonHovered && (
          <>
            <div onMouseLeave={nowGollajyuLeave}>
              {nowGollajyuHovered && (
                <div style={boxStyle}>
                  <div style={textContainerStyle}>
                    <div style={textStyle}>지금골라쥬!</div>
                    <div style={textPointStyle}>(10P 차감됩니다)</div>
                  </div>
                  <div style={textContainerStyle}>
                    <div style={textExplanationStyle}>라이브 방송으로 선택을 맡겨봐요</div>
                  </div>
                </div>
              )}
              <div
                style={circleStyle}
                onMouseEnter={nowGollajyuHover}
              >
                <img style={imageStyle} src={NowGollajyuImage} alt="지금골라쥬" />
              </div>
            </div>

            <div onMouseLeave={simpleGollajyuLeave}>
              {simpleGollajyuHovered && (
                <div style={{ ...boxStyle, bottom: "150px" }}>
                  <div style={textContainerStyle}>
                    <div style={textStyle}>간단골라쥬!</div>
                    <div style={textPointStyle}>(10P 차감됩니다)</div>
                  </div>
                  <div style={textContainerStyle}>
                    <div style={textExplanationStyle}>간단한 질문으로 선택을 맡겨봐요</div>
                  </div>
                </div>
              )}
              <div
                style={{ ...circleStyle, bottom: "150px" }}
                onMouseEnter={simpleGollajyuHover}
              >
                <img style={imageStyle} src={SimpleGollajyuImage} alt="간단골라쥬" />
              </div>
            </div>

            <div onMouseLeave={purchaseGollajyLeave}>
              {purchaseGollajyuHovered && (
                <div style={{ ...boxStyle, bottom: "220px" }}>
                  <div style={textContainerStyle}>
                    <div style={textStyle}>구매골라쥬!</div>
                    <div style={textPointStyle}>(10P 차감됩니다)</div>
                  </div>
                  <div style={textContainerStyle}>
                    <div style={textExplanationStyle}>상세한 질문으로 선택을 맡겨봐요</div>
                  </div>
                </div>
              )}
              <div
                style={{ ...circleStyle, bottom: "220px" }}
                onMouseEnter={purchaseGollajyHover}
              >
                <img style={imageStyle} src={PurchaseGollajyuImage} alt="구매골라쥬" />
              </div>
            </div>

            <div style={closeButtonStyle} onClick={buttonCloseClick}>X</div>
          </>
        )}
      </button>
    </div>
  );
};

export default VoteButton;
