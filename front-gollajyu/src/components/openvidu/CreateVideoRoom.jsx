import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import tmpProfileImg from "/assets/images/tmp_profile.png";
import AddVoteItemModal from "./AddVoteItemModal";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const logoStyle = {
  // 글자
  fontFamily: "HSSantokkiRegular", // 로고 폰트로 변경
  fontSize: "70px", // 글자 크기
  color: "#FFD257", // 글자 색: 노란색
};

const CreateVideoRoom = () => {
  // 화면 구성 => VideoRoomComponent와 유사하게, 채팅창 부분은 빈 상태로
  // 방송 시작하기 버튼 => 제목, 투표항목, 호스트 닉네임, 세션 아이디 넘겨주기(VideoComponent와 서버에) => VideoComponent에서 isHost=true이면 enterRoom 건너뛰게..?
  const settingButton = "text-white py-2 px-4 rounded-xl";

  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [profileImg, setProfileImg] = useState(tmpProfileImg);
  const [nickName, setNickName] = useState(
    localStorage.userNickName ? localStorage.userNickName : "고라파덕"
  );
  const [title, setTitle] = useState("");
  const [voteItem, setVoteItem] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const thumbnailRef = useRef();

  const sendRoomInfo = async () => {
    await axios();
  };

  const startBroadcast = async () => {
    //sessionId 생성
    //title, hostNickName, voteItem, thumbnail, sessionId, isHost 담아서 VideoRoom으로 진입 + 서버로 데이터 전송

    const sessionId = uuidv4();
    console.log(sessionId);
    const roomIs = await sendRoomInfo(
      sessionId,
      title,
      nickName,
      voteItem,
      thumbnail,
      dispatch // dispatch가 뭐지..?
    );
    if (roomIs !== false) {
      console.log("방송 생성 성공");
      navigate("/enterVideoRoom", {
        state: {
          id: sessionId,
          title: title,
          voteItem: voteItem,
          nickName: nickName,
          thumbnail: thumbnail,
          isHost: true,
        },
      });
    }
  };

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
          className="border flex justify-center items-center text-center hover:text-amber-500 w-1/2 h-1/2"
          key={i}
          onClick={openModal}
        >
          투표 항목 추가
        </div>
      );
    }
    return newArr;
  };

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = thumbnailRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setThumbnail(reader.result);
    };
  };

  // 모달 열기
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
    <>
      <div id="logo" className="m-5 text-center">
        <p style={logoStyle}>골라쥬</p>
      </div>
      <div className="container my-7 mx-auto space-y-3">
        <div id="header" className="flex justify-between m-1">
          <p className="text-2xl font-bold my-auto text-gray-900">
            지금 골라쥬 생성
          </p>
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
              className="basis-2/5 rounded-md p-3 space-y-3 bg-gray-100"
            >
              <div
                id="host-info"
                className="flex text-center items-center space-x-2"
              >
                <img
                  className="w-8 h-8 rounded-full border border-black"
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
          <div id="vote+thumbnail" className="basis-1/3 flex flex-col gap-y-5">
            <div
              id="vote"
              className="mb-3 basis-1/3 bg-white border-2 rounded-md bg-gray-100"
            >
              <div className="w-full h-full justify-center items-center inline-flex flex-wrap">
                {voteItem &&
                  voteItem.map((item, index) => {
                    if (item.slice(0, 10) === "data:image") {
                      return (
                        <div className="flex border justify-center items-center w-1/2 h-1/2">
                          <img
                            src={item}
                            className="size-2/3"
                            alt="이미지 미리보기"
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="border flex text-2xl justify-center items-center text-center w-1/2 h-1/2"
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
              id="thumbnail"
              className="basis-2/3 rounded-md text-center flex flex-col justify-around items-center p-10 bg-gray-100"
            >
              <p className="text-lg font-bold">방송 썸네일 추가</p>
              {thumbnail && (
                <img
                  src={thumbnail}
                  className="w-48 h-40 mx-auto"
                  alt="이미지 미리보기"
                />
              )}
              <input
                type="file"
                accept="image/*"
                id="thumbnail"
                onChange={saveImgFile}
                ref={thumbnailRef}
                className="w-3/5"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateVideoRoom;
