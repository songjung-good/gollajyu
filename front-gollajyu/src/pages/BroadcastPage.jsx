import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BroadcastItem from "../components/BroadcastItem";
import tmpThumbnailImg from "/assets/images/nowGollajyu.png";

const BroadcastPage = () => {
  const navigate = useNavigate();
  const [userNickName, setUserNickName] = useState("");
  const enterRoom = () => {
    navigate("/EnterVideoRoom", {
      state: {
        isHost: false,
        sessionId: "SessionABCDEFG",
        userNickName: userNickName,
      },
    });
  };
  const createRoom = () => {
    navigate("/EnterVideoRoom", {
      state: {
        isHost: true,
        sessionId: "SessionABCDEFG",
      },
    });
  };
  const handleInput = (event) => {
    setUserNickName(event.target.value);
    console.log(userNickName);
  };

  const dummyData = [
    {
      thumbnail: tmpThumbnailImg,
      title: "최고의 반려동물은? 고양이 vs 강아지",
      viewerCnt: 1000,
      sessionId: "sessionABCD",
      hostNickName: "고라파덕",
      createdDate: new Date("2024-01-24 14:11"),
      voteItem: ["고양이", "강아지", "햄스터", "도마뱀"],
    },
    {
      thumbnail: tmpThumbnailImg,
      title: "최고의 반려동물은? 고양이 vs 강아지",
      viewerCnt: 2,
      sessionId: "sessionABCD",
      hostNickName: "고라파덕",
      createdDate: new Date("2024-01-24 15:11"),
      voteItem: ["고양이", "강아지"],
    },
    {
      thumbnail: tmpThumbnailImg,
      title: "최고의 반려동물은? 고양이 vs 강아지",
      viewerCnt: 123,
      sessionId: "sessionABCD",
      hostNickName: "고라파덕",
      createdDate: new Date("2024-01-24 16:11"),
      voteItem: ["고양이", "강아지"],
    },
    {
      thumbnail: tmpThumbnailImg,
      title: "최고의 반려동물은? 고양이 vs 강아지",
      viewerCnt: 78,
      sessionId: "sessionABCD",
      hostNickName: "고라파덕",
      createdDate: new Date("2024-01-24 14:10"),
      voteItem: ["고양이", "강아지"],
    },
    {
      thumbnail: tmpThumbnailImg,
      title: "최고의 반려동물은? 고양이 vs 강아지",
      viewerCnt: 44,
      sessionId: "sessionABCD",
      hostNickName: "고라파덕",
      createdDate: new Date("2024-01-24 14:04"),
      voteItem: ["고양이", "강아지"],
    },
    {
      thumbnail: tmpThumbnailImg,
      title: "최고의 반려동물은? 고양이 vs 강아지",
      viewerCnt: 678,
      sessionId: "sessionABCD",
      hostNickName: "고라파덕",
      createdDate: new Date("2024-01-24 10:11"),
      voteItem: ["고양이", "강아지"],
    },
    {
      thumbnail: tmpThumbnailImg,
      title: "최고의 반려동물은? 고양이 vs 강아지",
      viewerCnt: 707,
      sessionId: "sessionABCD",
      hostNickName: "고라파덕",
      createdDate: new Date("2024-01-24 12:11"),
      voteItem: ["고양이", "강아지"],
    },
    {
      thumbnail: tmpThumbnailImg,
      title: "최고의 반려동물은? 고양이 vs 강아지",
      viewerCnt: 500,
      sessionId: "sessionABCD",
      hostNickName: "고라파덕",
      createdDate: new Date("2024-01-24 14:30"),
      voteItem: ["고양이", "강아지"],
    },
    {
      thumbnail: tmpThumbnailImg,
      title: "최고의 반려동물은? 고양이 vs 강아지",
      viewerCnt: 10,
      sessionId: "sessionABCD",
      hostNickName: "고라파덕",
      createdDate: new Date("2024-01-24 14:50"),
      voteItem: ["고양이", "강아지"],
    },
  ];

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={createRoom}
      >
        지금 골라쥬 생성(Host)
      </button>
      <br />
      <div>
        <label htmlFor="nickName">닉네임 : </label>
        <input
          type="text"
          id="nickName"
          name="nickName"
          value={userNickName}
          onChange={handleInput}
        />
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={enterRoom}
        >
          시청자로 진입(Guest)
        </button>
      </div>
      <div className="container mx-auto my-5 sm:w-3/5 lg:w-3/4 h-1/5 flex flex-col space-y-10">
        <div id="page-info">
          <p className="text-black-70 text-xl mx-4">
            <span className="font-bold">라이브 방송</span>을 시청하며
            <span className="font-bold"> 실시간 투표</span>를 하고
            <span className="font-bold"> 의견을 공유</span>할 수 있어요
          </p>
        </div>
        <div id="hot-broadcast" className="basis-1/5">
          <p className="px-5 py-3 text-2xl font-bold">
            지금 <span className="text-red-300">당장</span> 골라쥬
          </p>
          <div className="flex flex-row md:space-x-5 lg:space-x-20 bg-red-100 rounded-[30px] px-20 py-10">
            {dummyData
              .sort((a, b) => b.viewerCnt - a.viewerCnt)
              .slice(0, 3)
              .map((item, index) => {
                return <BroadcastItem key={index} index={index} item={item} />;
              })}
          </div>
        </div>
        <div id="broadcast-list" className="grow">
          <p className="px-5 py-3 text-2xl font-bold">지금 골라쥬</p>
          <div className="grid grid-cols-4 bg-white rounded-[30px] p-7 gap-10">
            {dummyData
              .sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime())
              .map((item, index) => {
                return <BroadcastItem key={index} item={item} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BroadcastPage;
