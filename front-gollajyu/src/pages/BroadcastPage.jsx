import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import API_URL from "../stores/apiURL";
import BroadcastItem from "../components/BroadcastItem";
import VoteButton from "../components/VoteButton";
import tmpThumbnailImg from "/assets/images/nowGollajyu.png";
import TmpModal from "../components/TmpModal"; // 임시 모달
import useModalStore from "../stores/modalState";

const BroadcastPage = () => {
  const navigate = useNavigate();
  const [userNickName, setUserNickName] = useState("");
  const [liveItem, setLiveItem] = useState([]);

  // ------------- 투표 생성 버튼 모달과 관련된 함수 -----------
  const isVoteSimpleCreateModalOpened = useModalStore(
    (state) => state.isVoteSimpleCreateModalOpened
  );
  const isVoteProductCreateModalOpened = useModalStore(
    (state) => state.isVoteProductCreateModalOpened
  );

  // const enterRoom = () => {
  //   navigate("/EnterVideoRoom", {
  //     state: {
  //       isHost: false,
  //       sessionId: "SessionABCDEFG",
  //       userNickName: userNickName,
  //     },
  //   });
  // };
  // const createRoom = () => {
  //   navigate("/EnterVideoRoom", {
  //     state: {
  //       isHost: true,
  //       sessionId: "SessionABCDEFG",
  //     },
  //   });
  // };
  // const handleInput = (event) => {
  //   setUserNickName(event.target.value);
  //   console.log(userNickName);
  // };

  // const dummyData = [
  //   {
  //     thumbnail: tmpThumbnailImg,
  //     title: "최고의 반려동물은? 고양이 vs 강아지",
  //     viewerCnt: 1000,
  //     sessionId: "sessionABCD",
  //     hostNickName: "고라파덕",
  //     createdDate: new Date("2024-01-24 14:11"),
  //     voteItem: ["고양이", "강아지", "햄스터", "도마뱀"],
  //   },
  //   {
  //     thumbnail: tmpThumbnailImg,
  //     title: "최고의 반려동물은? 고양이 vs 강아지",
  //     viewerCnt: 2,
  //     sessionId: "sessionABCD",
  //     hostNickName: "고라파덕",
  //     createdDate: new Date("2024-01-24 15:11"),
  //     voteItem: ["고양이", "강아지"],
  //   },
  //   {
  //     thumbnail: tmpThumbnailImg,
  //     title: "최고의 반려동물은? 고양이 vs 강아지",
  //     viewerCnt: 123,
  //     sessionId: "sessionABCD",
  //     hostNickName: "고라파덕",
  //     createdDate: new Date("2024-01-24 16:11"),
  //     voteItem: ["고양이", "강아지"],
  //   },
  //   {
  //     thumbnail: tmpThumbnailImg,
  //     title: "최고의 반려동물은? 고양이 vs 강아지",
  //     viewerCnt: 78,
  //     sessionId: "sessionABCD",
  //     hostNickName: "고라파덕",
  //     createdDate: new Date("2024-01-24 14:10"),
  //     voteItem: ["고양이", "강아지"],
  //   },
  //   {
  //     thumbnail: tmpThumbnailImg,
  //     title: "최고의 반려동물은? 고양이 vs 강아지",
  //     viewerCnt: 44,
  //     sessionId: "sessionABCD",
  //     hostNickName: "고라파덕",
  //     createdDate: new Date("2024-01-24 14:04"),
  //     voteItem: ["고양이", "강아지"],
  //   },
  //   {
  //     thumbnail: tmpThumbnailImg,
  //     title: "최고의 반려동물은? 고양이 vs 강아지",
  //     viewerCnt: 678,
  //     sessionId: "sessionABCD",
  //     hostNickName: "고라파덕",
  //     createdDate: new Date("2024-01-24 10:11"),
  //     voteItem: ["고양이", "강아지"],
  //   },
  //   {
  //     thumbnail: tmpThumbnailImg,
  //     title: "최고의 반려동물은? 고양이 vs 강아지",
  //     viewerCnt: 707,
  //     sessionId: "sessionABCD",
  //     hostNickName: "고라파덕",
  //     createdDate: new Date("2024-01-24 12:11"),
  //     voteItem: ["고양이", "강아지"],
  //   },
  //   {
  //     thumbnail: tmpThumbnailImg,
  //     title: "최고의 반려동물은? 고양이 vs 강아지",
  //     viewerCnt: 500,
  //     sessionId: "sessionABCD",
  //     hostNickName: "고라파덕",
  //     createdDate: new Date("2024-01-24 14:30"),
  //     voteItem: ["고양이", "강아지"],
  //   },
  //   {
  //     thumbnail: tmpThumbnailImg,
  //     title: "최고의 반려동물은? 고양이 vs 강아지",
  //     viewerCnt: 10,
  //     sessionId: "sessionABCD",
  //     hostNickName: "고라파덕",
  //     createdDate: new Date("2024-01-24 14:50"),
  //     voteItem: ["고양이", "강아지"],
  //   },
  // ];

  useEffect(() => {
    axios
      .get(API_URL + "/lives/listWithTop3")
      .then((res) => {
        console.log(res.data.body);
        setLiveItem(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 반응형 컨테이너 크기 = xl:w-[1000px] lg:w-[740px] md:w-[560px] sm:w-[375px]
  return (
    <>
      <VoteButton />
      {/* <button
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
      </div> */}
      <div className="container mx-auto my-5 flex flex-col items-center space-y-10 xl:w-[1000px] lg:w-[740px] md:w-[560px] sm:w-[375px]">
        <div id="page-info">
          <p className="text-black-70 fontsize-sm mx-4 mt-16">
            <span className="font-bold fontsize-sm">라이브 방송</span>을
            시청하며
            <span className="font-bold fontsize-sm"> 실시간 투표</span>를 하고
            <span className="font-bold fontsize-sm"> 의견을 공유</span>할 수
            있어요
          </p>
        </div>
        <div
          id="hot-broadcast"
          className="basis-1/5 xl:w-[1000px] lg:w-[740px] md:w-[560px] sm:w-[375px]"
        >
          <p className="px-5 py-3 fontsize-lg font-bold">
            지금 <span className="text-red-300 fontsize-lg">당장</span> 골라쥬
            <p className="fontsize-xs">현재 시청자 TOP3</p>
          </p>
          <div className="flex flex-row space-x-10 sm:space-x-5 bg-red-100 rounded-3xl px-24 py-10 sm:px-10 sm:py-5">
            {liveItem &&
              liveItem.slice(0, 3).map((item, index) => {
                return <BroadcastItem key={index} index={index} item={item} />;
              })}
            {/* {dummyData
              .sort((a, b) => b.viewerCnt - a.viewerCnt)
              .slice(0, 3)
              .map((item, index) => {
                return <BroadcastItem key={index} index={index} item={item} />;
              })} */}
          </div>
        </div>
        <div
          id="broadcast-list"
          className="grow xl:w-[1000px] lg:w-[740px] md:w-[560px] sm:w-[375px]"
        >
          <p className="px-5 py-3 fontsize-lg font-bold">
            지금 골라쥬
            <p className="fontsize-xs">최신순</p>
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-3 bg-white rounded-3xl p-7 gap-10">
            {liveItem.length > 3 ? (
              liveItem.slice(3).map((item, index) => {
                return <BroadcastItem key={index} item={item} />;
              })
            ) : (
              <div>
                <p>현재 방송중인 지금 골라쥬가</p>
                <p>충분하지 않습니다ㅠㅠ</p>
              </div>
            )}
            {/* {dummyData
              .sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime())
              .map((item, index) => {
                return <BroadcastItem key={index} item={item} />;
              })} */}
          </div>
        </div>
      </div>
      {isVoteSimpleCreateModalOpened && <TmpModal></TmpModal>}
      {isVoteProductCreateModalOpened && <TmpModal></TmpModal>}
    </>
  );
};

export default BroadcastPage;
