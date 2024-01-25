import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import tmpProfileImg from "/assets/images/tmp_profile.png";
import AddVoteItemModal from "./AddVoteItemModal";

const CreateVideoRoom = () => {
  // 화면 구성 => VideoRoomComponent와 유사하게, 채팅창 부분은 빈 상태로
  // 방송 시작하기 버튼 => 제목, 투표항목, 호스트 닉네임, 세션 아이디 넘겨주기(VideoComponent와 서버에) => VideoComponent에서 isHost=true이면 enterRoom 건너뛰게..?
  const settingButton = "text-white py-2 px-4 rounded";

  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [profileImg, setProfileImg] = useState(tmpProfileImg);
  const [nickName, setNickName] = useState(
    localStorage.userNickName ? localStorage.userNickName : "고라파덕"
  );
  const [title, setTitle] = useState("");
  const [voteItem, setVoteItem] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const startBroadcast = () => {};

  useEffect(() => {
    const initWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // Assign the stream to the video element
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    initWebcam();

    return () => {
      // Clean up the stream when the component is unmounted
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
    };
  }, []);

  const addVoteItem = (item) => {
    setVoteItem((prevVoteItem) => {
      const newVoteItem = [...prevVoteItem, item];
      // console.log(newVoteItem);
      return newVoteItem;
    });
  };

  const addVoteItemTag = () => {
    const newArr = [];
    for (let i = 0; i < 4 - voteItem.length; i++) {
      newArr.push(
        <div
          className="border flex justify-center items-center text-center hover:text-amber-500"
          key={i}
          onClick={openModal}
        >
          투표 항목 추가
        </div>
      );
    }
    return newArr;
  };

  const openModal = () => {
    setModalOpen(true);
  };

  // 모달을 닫는데, item이 담겨서 닫히면 => voteItem 배열에 추가, item이 안 담겨서 닫히면 그냥 모달만 닫음
  const closeModal = (item) => {
    setModalOpen(false);
    if (item) {
      console.log(item);
      addVoteItem(item);
    }
  };

  const handleExit = () => {
    navigate("/BroadcastPage");
  };

  return (
    <div className="container mx-5 rounded-lg bg-neutral-300 p-6 my-12 mx-auto space-y-3">
      <div id="header" className="flex justify-between m-1">
        <p className="text-2xl font-bold my-auto">지금 골라쥬 생성</p>
        <div id="button" className="space-x-2">
          <button className={`bg-sky-500 hover:bg-sky-700 ${settingButton}`}>
            방송 시작하기
          </button>
          <button
            className={`bg-red-500 hover:bg-red-700 ${settingButton}`}
            onClick={handleExit}
          >
            나가기
          </button>
        </div>
      </div>
      <div id="body" className="flex flex-row justify-between gap-7">
        <div id="video+detail" className="basis-2/3 flex flex-col gap-y-5">
          <div className="basis-3/5">
            <video
              ref={videoRef}
              className="w-full h-full rounded-md"
              style={{ transform: "scaleX(-1)" }}
              autoPlay
              playsInline
              muted // Mute the local audio to prevent feedback
            />
          </div>
          <div
            id="detail"
            className="basis-2/5 bg-white rounded-md p-3 space-y-3"
          >
            <div
              id="host-info"
              className="flex text-center items-center space-x-2"
            >
              <img
                className="w-8 h-8 rounded-full border border-black"
                // style={{ width: "40px", height: "40px" }}
                src={tmpProfileImg}
                alt=""
              />
              <p className="text-lg">{nickName}</p>
            </div>
            <form>
              <input
                type="text"
                name="title"
                placeholder="방송 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full focus:outline-none rounded-md"
              />
            </form>
          </div>
        </div>
        <div id="vote+chatting" className="basis-1/3 flex flex-col gap-y-5">
          <div
            id="vote"
            className="mb-3 basis-1/3 bg-white border-2 rounded-md"
          >
            <div className="grid grid-cols-2 h-full">
              {/* 이미지 들어갔을때 화질이랑 칸 크기 달라지는거 수정해야함 */}
              {voteItem &&
                voteItem.map((item, index) => {
                  if (item.slice(0, 10) === "data:image") {
                    return (
                      <div className="flex border justify-center items-center">
                        <img
                          src={item}
                          className="size-32 m-0"
                          alt="이미지 미리보기"
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className="border flex text-2xl justify-center items-center text-center h-full"
                        key={index}
                      >
                        {item}
                      </div>
                    );
                  }
                })}
              {addVoteItemTag()}
            </div>
            <AddVoteItemModal isOpen={isModalOpen} onClose={closeModal} />
          </div>
          <div
            id="chatting"
            className="basis-2/3 bg-white rounded-md text-center flex justify-center items-center p-5"
          >
            <p>채팅창은 방송 시작 후 활성화됩니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVideoRoom;
