import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import tmpProfileImg from "/assets/images/tmp_profile.png";
import AddVoteItemModal from "./AddVoteItemModal";
import useAuthStore from "../../stores/userState";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import API_URL from "../../stores/apiURL";

/*
<uuid란?>
uuid는 범용고유식별자(Universal Unique IDentifier)라고 한다.
네트워크상에 존재하는 개체들을 식별하고 구별하기 위해 개발 주체가 스스로 이름을 짓도록 하며 고유성을 충족시킬 수 있는 방법이다.

uuid v4는 충분히 안전하게 유일한 uuid를 발급해주며 uuid가 중복될 수 있는 통계적 가능성 역시 극히 희박하기에 uuid가 중복되면 어쩌지 하는 걱정은 안해도 된다. 
*/

const logoStyle = {
  // 글자
  fontFamily: "HSSantokkiRegular", // 로고 폰트로 변경
  fontSize: "70px", // 글자 크기
  color: "#FFD257", // 글자 색: 노란색
};

const settingButton = "text-white py-2 px-4 rounded-xl";

const CreateVideoRoom = () => {
  // 화면 구성 => VideoRoomComponent와 유사하게, 채팅창 부분은 빈 상태로
  // 방송 시작하기 버튼 => 제목, 투표항목, 호스트 닉네임, 세션 아이디 넘겨주기(VideoComponent와 서버에) => VideoComponent에서 isHost=true이면 enterRoom 건너뛰게..?
  const settingButton = "text-white py-2 px-4 rounded-xl";
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();
  const videoRef = useRef(null);
  const memberId = user.memberId;
  const nickName = user.nickname;
  // const [liveId, setLiveId] = useState(null);
  const [title, setTitle] = useState("");
  const [voteItem, setVoteItem] = useState([]);
  const [previewVoteItem, setPreviewVoteItem] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const thumbnailRef = useRef();
  const [isEnoughSize, setIsEnoughSize] = useState(true);
  const createVote = useAuthStore((state) => state.createVote);

  // 서버로 지금골라쥬 방의 정보를 보내는 함수
  const sendRoomInfo = async (
    sessionId,
    memberId,
    title,
    voteItem,
    thumbnail
  ) => {
    try {
      // FormData 형식으로 변환
      const formData = new FormData();
      formData.append("sessionId", sessionId);
      formData.append("memberId", memberId);
      formData.append("liveTitle", title);
      formData.append("liveImgUrl", thumbnail);

      const voteItemForAxios = [];
      voteItem.forEach((item) => {
        if (item instanceof File) {
          voteItemForAxios.push({ imgUrl: item, description: null, count: 0 });
        } else if (typeof item === "string") {
          voteItemForAxios.push({ imgUrl: null, description: item, count: 0 });
        }
      });

      voteItemForAxios.forEach((item, index) => {
        if (item.imgUrl) {
          formData.append(`liveVoteItemDtoList[${index}].imgUrl`, item.imgUrl);
        }
        if (item.description) {
          formData.append(
            `liveVoteItemDtoList[${index}].description`,
            item.description
          );
        }
        formData.append(`liveVoteItemDtoList[${index}].count`, item.count);
      });

      // formdata 확인용 코드
      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      const response = await axios.post(API_URL + "/lives", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.header.result) {
        // res.data.body에서 liveId를 얻은 후 videoComponent로 진입
        return response.data.body.liveId;
      } else {
        window.alert(response.data.header.message);
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const startBroadcast = async () => {
    if ((title.length < 1) | (voteItem.length < 2) | thumbnail) {
      window.alert("제목, 투표 항목(2개 이상), 썸네일을 모두 등록하세요!");
    } else {
      // sessionId 생성 (랜덤한 값)
      const sessionId = "Session" + uuidv4();
      // console.log("sessionId :", sessionId);
      // sendRoomInfo : 서버로 라이브 방 생성을 요청 -> 응답으로 liveId를 받음
      const liveId = await sendRoomInfo(
        sessionId,
        memberId,
        title,
        voteItem,
        thumbnail
      );
      // console.log(liveId);
      if (liveId !== false) {
        console.log("방송 생성 성공");
        createVote();
        navigate("/EnterVideoRoom", {
          state: {
            sessionId: sessionId,
            liveId: liveId,
            isHost: true,
          },
        });
      }
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
  }, [isEnoughSize]);

  const addVoteItem = (item) => {
    setVoteItem((prevVoteItem) => {
      const newVoteItem = [...prevVoteItem, item];
      // console.log(newVoteItem);
      return newVoteItem;
    });
  };

  // 미리보기용 voteItem 배열 -> 서버 전송용은 미리보기 이미지를 보내면 안되기 때문에 분리함
  const addPreviewVoteItem = (item) => {
    setPreviewVoteItem((prevVoteItem) => {
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
    // console.log(file);
    setThumbnail(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewThumbnail(reader.result);
    };
  };

  // 모달 열기
  const openModal = () => {
    setModalOpen(true);
  };

  // 모달을 닫는데, item이 담겨서 닫히면 => voteItem 배열에 추가, item이 안 담겨서 닫히면 그냥 모달만 닫음
  const closeModal = (type, item) => {
    setModalOpen(false);
    if (type == "img") {
      // console.log(item);
      addVoteItem(item[0]);
      addPreviewVoteItem(item[1]);
    } else if (type == "text") {
      addVoteItem(item[0]);
      addPreviewVoteItem(item[0]);
    }
  };

  const handleExit = () => {
    navigate("/BroadcastPage");
  };

  // ----------------- 화면 사이즈가 충분한지 체크 --------------
  // 화면 너비가 768px보다 작으면 -> 안내문 띄우기
  function handleResize() {
    // Get the width of the browser window
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      setIsEnoughSize(false);
    } else {
      setIsEnoughSize(true);
    }
  }

  // Add event listener for the resize event
  window.addEventListener("resize", handleResize);

  return (
    <>
      <div id="logo" className="m-2 text-center">
        <p style={logoStyle}>골라쥬</p>
      </div>
      {isEnoughSize ? (
        <div className="container mx-auto space-y-3">
          <div id="header" className="flex justify-between m-1">
            <p className="fontsize-md font-bold my-auto text-gray-900">
              지금 골라쥬 생성
            </p>
            <div id="button" className="space-x-2">
              <button
                className={`bg-sky-500 hover:bg-sky-700 ${settingButton}`}
                onClick={startBroadcast}
              >
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
                    src={
                      // user.profileImgUrl이 숫자면 -> 소비성향테스트 결과 번호 -> 해당 번호의 png 파일을 src로 지정
                      !isNaN(user.profileImgUrl)
                        ? `/assets/images/sobiTest/${user.profileImgUrl}.png`
                        : user.profileImgUrl
                    }
                    alt=""
                  />
                  <p className="fontsize-sm">{nickName}</p>
                </div>
                <form>
                  <input
                    type="text"
                    name="title"
                    placeholder="방송 제목을 입력하세요(50자 이내)"
                    value={title}
                    onChange={(e) => {
                      if (e.target.value.length > 50) {
                        window.alert("글자수가 50자를 넘었습니다");
                        setTitle(e.target.value.slice(0, 50));
                      } else {
                        setTitle(e.target.value);
                      }
                    }}
                    className="w-full focus:outline-none rounded-md"
                  />
                </form>
              </div>
            </div>
            <div
              id="vote+thumbnail"
              className="basis-1/3 flex flex-col gap-y-5"
            >
              <div
                id="vote"
                className="mb-3 basis-1/3 bg-white border-2 rounded-md"
              >
                <div className="w-full h-full justify-center items-center inline-flex flex-wrap">
                  {previewVoteItem &&
                    previewVoteItem.map((item, index) => {
                      if (item.slice(0, 10) === "data:image") {
                        return (
                          <div
                            className="flex border justify-center items-center w-1/2 h-1/2"
                            key={index}
                          >
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
                            className="border flex fontsize-sm font-bold justify-center items-center text-center bg-gray-50 w-1/2 h-1/2"
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
                <p className="fontsize-sm font-bold">방송 썸네일 추가</p>
                {previewThumbnail && (
                  <img
                    src={previewThumbnail}
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
      ) : (
        <div className="container my-96 mx-auto text-center space-y-5">
          <p className="fontsize-lg">
            740px보다 작은 화면에서는 <br />
            이용하실 수 없습니다.
          </p>
          <p className="fontsize-lg">
            화면을 키우거나, <br />
            메인으로 돌아가주세요.
          </p>
          <button
            className={`bg-gray-400 hover:bg-gray-500 fontsize-sm ${settingButton}`}
            onClick={() => {
              navigate("/");
            }}
          >
            메인으로 돌아가기
          </button>
        </div>
      )}
    </>
  );
};

export default CreateVideoRoom;
