import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import firstMedal from "/assets/images/medals/first.png";
import secondMedal from "/assets/images/medals/second.png";
import thirdMedal from "/assets/images/medals/third.png";
import viewerIcon from "/assets/images/viewer_icon.png";

const medalImg = {
  position: "absolute",
  padding: "5px",
  width: "50px",
  hight: "50px",
};

const BroadcastItem = ({ index, item }) => {
  const navigate = useNavigate();
  const enterRoom = () => {
    navigate("/EnterVideoRoom", {
      state: {
        isHost: false,
        sessionId: item.sessionId,
        userNickName: localStorage.userNickName,
        voteItem: item.voteItem,
        title: item.title,
        hostNickName: item.hostNickName,
      },
    });
  };

  return (
    <div onClick={enterRoom}>
      <div id="thumbnail">
        {index === 0 ? <img style={medalImg} src={firstMedal}></img> : null}
        {index === 1 ? <img style={medalImg} src={secondMedal}></img> : null}
        {index === 2 ? <img style={medalImg} src={thirdMedal}></img> : null}
        <img
          className="rounded-[30px] mb-2"
          src={item.thumbnail}
          alt="지금골라쥬 썸네일"
        />
      </div>

      <div className="flex justify-between mx-2">
        <div className="flex">
          <img
            style={{ width: "20px", height: "20px" }}
            src={viewerIcon}
            alt=""
          />
          <p>{item.viewerCnt}</p>
        </div>
        <p className="font-bold">{item.hostNickName}</p>
      </div>
      <p className="mx-2">{item.title}</p>
    </div>
  );
};

export default BroadcastItem;
