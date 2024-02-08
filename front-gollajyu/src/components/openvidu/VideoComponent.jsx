import { OpenVidu } from "openvidu-browser";

import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import UserVideoComponent from "./UserVideoComponent.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import ChattingForm from "./Chat/ChattingForm.jsx";
import ChattingList from "./Chat/ChattingList.jsx";
import Vote from "./Vote.jsx";
import { Button, Input, CircularProgress } from "@mui/material";
import tmpProfileImg from "/assets/images/tmp_profile.png";

const OPENVIDU_SERVER_URL = import.meta.env.VITE_OPENVIDU_API_URL;
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

const settingButton = "text-white py-2 px-4 rounded-xl";

const logoStyle = {
  // 글자
  fontFamily: "HSSantokkiRegular", // 로고 폰트로 변경
  fontSize: "70px", // 글자 크기
  color: "#FFD257", // 글자 색: 노란색
};

export default function VideoComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEnoughSize, setIsEnoughSize] = useState(true);
  const [profileImg, setProfileImg] = useState(tmpProfileImg);
  const [mySessionId, setMySessionId] = useState(location.state.sessionId);
  const isHost = location.state.isHost; // isHost로 분기해서 isHost=true면 화면을 publish하고 아니면 publish는 없이 subscribe만 함
  const [myUserName, setMyUserName] = useState(
    isHost ? "방송자" : location.state.userNickName
  );
  const [session, setSession] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [messageList, setMessageList] = useState([]); // 메세지 정보를 담을 배열
  const [audioState, setAudioSate] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0); // 총 유저수
  const voteItem = location.state.voteItem
    ? location.state.voteItem
    : ["임시", "임시", "임시", "임시"];
  const [isVoteHoveredArr, setIsVoteHoveredArr] = useState(
    Array(voteItem.length).fill(false)
  ); // 각 투표 선택지 위에 마우스가 올라가 있는지
  const [isVotedArr, setIsVotedArr] = useState(
    Array(voteItem.length).fill(false)
  ); // 각 투표 선택지가 선택되었는지 여부
  const [isVoted, setIsVoted] = useState(false); // 투표를 했는지 여부
  const [voteCounts, setVoteCounts] = useState([]); // 투표 아이템 별 표 수
  const title = location.state.title ? location.state.title : "임시 제목";
  const hostNickName = location.state.hostNickName
    ? location.state.hostNickName
    : "임시 닉네임";
  console.log("isHost?:", isHost);

  const OV = useRef(new OpenVidu());

  // session에 진입하기!
  const joinSession = useCallback(() => {
    const mySession = OV.current.initSession(); // OV 가 useRef로 생성된 객체이므로 .current로 내부에 접근해야함

    // stream이 새로 생성되면(본인 외의 방송 참여자) subscribe하고 subscribers에 추가 => 현재는 방송자만 stream을 생성하므로 방송자 입장에서는 subscribers가 없고, 시청자 입장에서는 방송자의 stream만 subscribers에 담겨있음
    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((subscribers) => [...subscribers, subscriber]);
    });

    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    mySession.on("connectionCreated", ({ stream }) => {
      // 유저가 접속할 때마다 인원수를 += 1
      setTotalUsers((prevTotalUsers) => {
        return prevTotalUsers + 1;
      });
    });

    mySession.on("connectionDestroyed", ({ stream }) => {
      // 유저가 접속을 끊을 때마다 -= 1
      setTotalUsers((prevTotalUsers) => {
        return prevTotalUsers - 1;
      });
    });

    // 채팅 신호 수신하여 메세지 리스트 업데이트
    mySession.on("signal:chat", (event) => {
      setMessageList((prevMessageList) => {
        return [...prevMessageList, event.data];
      });
    });

    setSession(mySession);
  }, []);

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken().then(async (token) => {
        try {
          await session.connect(token, { clientData: myUserName });

          // 방송자(isHost=true)일 때만 stream을 publish, 시청자는 session에 connect만 함
          if (isHost) {
            let publisher = await OV.current.initPublisherAsync(undefined, {
              audioSource: undefined,
              videoSource: undefined,
              publishAudio: audioState,
              publishVideo: true,
              resolution: "640x480",
              frameRate: 30,
              insertMode: "APPEND",
              mirror: true,
            });

            session.publish(publisher);

            const devices = await OV.current.getDevices();
            const videoDevices = devices.filter(
              (device) => device.kind === "videoinput"
            );
            const currentVideoDeviceId = publisher.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .getSettings().deviceId;
            // const currentVideoDevice = videoDevices.find(
            //   (device) => device.deviceId === currentVideoDeviceId
            // );

            console.log("publisher:", publisher);
            setPublisher(publisher);
            // setCurrentVideoDevice(currentVideoDevice);
          }
        } catch (error) {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        }
      });
    }
  }, [session, myUserName]);

  // subscribers 변경이 잘 되는지 확인하기 위한 코드 => 배포 시, 삭제
  useEffect(() => {
    console.log("구독자 변경: ", subscribers);
  }, [subscribers]);

  const leaveSession = useCallback(() => {
    // Leave the session
    if (session) {
      session.disconnect();
    }

    // Reset all states and OpenVidu object
    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setMyUserName("Anonymous");
    setPublisher(undefined);

    navigate("/BroadcastPage");
  }, [session]);

  // 메세지 보내기(Sender of the message (after 'session.connect'))
  const sendMsg = (msg, currentSession) => {
    // this.state.session으로는 자식이 인식할 수 없으므로 currentSession을 자식에게 props로 넘겨주고 다시 받음
    currentSession
      .signal({
        data: msg, // .signal의 data는 문자열만 넘겨야한다
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "chat", // The type of message (optional)
      })
      .then(() => {
        console.log("Message successfully sent");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const screenShare = useCallback(async () => {
    // try {
    //   const devices = await OV.current.getDevices();
    //   const videoDevices = devices.filter(
    //     (device) => device.kind === "videoinput"
    //   );
    //   if (videoDevices && videoDevices.length > 1) {
    //     const newVideoDevice = videoDevices.filter(
    //       (device) => device.deviceId !== currentVideoDevice.deviceId
    //     );
    //     if (newVideoDevice.length > 0) {
    //       const newPublisher = OV.current.initPublisher(undefined, {
    //         videoSource: newVideoDevice[0].deviceId,
    //         publishAudio: true,
    //         publishVideo: true,
    //         mirror: true,
    //       });
    //       if (session) {
    //         await session.unpublish(mainStreamManager);
    //         await session.publish(newPublisher);
    //         setCurrentVideoDevice(newVideoDevice[0]);
    //         setMainStreamManager(newPublisher);
    //         setPublisher(newPublisher);
    //       }
    //     }
    //   }
    // } catch (e) {
    //   console.error(e);
    // }
  }, [session]);

  // 사용 X
  const mute = () => {
    // publishAudio(true) 도 되고 publishVideo(false)도 되는데 publishAudio(false) 하면 openvidu-browser.js 에서 에러나고 멈춤
    if (audioState) {
      // publisher.publishAudio(false);
      setAudioSate(false);
    } else {
      // publisher.publishAudio(true);
      setAudioSate(true);
    }
  };

  const deleteSubscriber = useCallback((streamManager) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      } else {
        return prevSubscribers;
      }
    });
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  const getToken = useCallback(async () => {
    if (isHost) {
      return createSession(mySessionId).then((sessionId) =>
        createToken(sessionId)
      );
    } else {
      return createToken(mySessionId);
    }
  }, [mySessionId]);

  const createSession = async (sessionId) => {
    const response = await axios.post(
      OPENVIDU_SERVER_URL + "openvidu/api/sessions",
      { customSessionId: sessionId },
      {
        headers: {
          Authorization:
            "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    );
    return response.data.sessionId; // The sessionId
  };

  const createToken = async (sessionId) => {
    let myRole = isHost ? "PUBLISHER" : "SUBSCRIBER";
    const response = await axios.post(
      OPENVIDU_SERVER_URL +
        "openvidu/api/sessions/" +
        sessionId +
        "/connection",
      { role: myRole },
      {
        headers: {
          Authorization:
            "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    );
    return response.data.token; // The token
  };

  // 로딩 페이지를 통한 방 입장
  const enterOnAirRoom = () => {
    joinSession();
  };

  // ------------ 방송 내 투표 관련 기능 ----------------
  const handleVote = (index, item) => {
    // TODO 클릭하면, 해당 item 투표수 1 증가시키는 요청을 서버로 보내기
    // 투표한 상태로 변경
    setIsVoted(true);
    setIsVotedArr(() => {
      const arr = Array(voteItem.length).fill(false);
      arr[index] = true;
      // console.log("선택:", arr);
      return [...arr];
    });
    console.log(index, item);
  };

  const getVoteRate = async () => {
    // TODO 서버에서 투표 아이템별 표 수에 대한 정보를 받아오기 -> 투표 아이템별 표 수 상태 업데이트, 일정 시간마다 동작하도록 작성
    // const response = await axios.get(
    //url 기타 등등
    // )
    setVoteCounts(); // 서버에서 받은 투표 아이템별 표 수 넣기 -> id, count 또는 name, count + 총 참여자 수
  };

  // 투표를 하면 -> 서버에서 투표 아이템별 표 수에 대한 정보 받아오기
  useEffect(() => {
    getVoteRate();
  }, [isVoted]);

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
      {isEnoughSize ? (
        <>
          <div id="logo" className="m-2 text-center">
            <p style={logoStyle}>골라쥬</p>
          </div>
          {/* 방송 화면으로 진입하기 전, 한번 막음 => joinSession이 동작하는 단계가 필요하기 때문*/}
          {session === undefined ? (
            <div
              id="join"
              className="container my-24 mx-auto flex flex-col justify-center items-center space-y-10"
            >
              <h1 className="fontsize-md text-center">
                글씨를 클릭하면, 방송으로 입장합니다.
              </h1>
              <div
                id="spinner"
                className="box-content w-[400px] h-[400px] flex items-center justify-center"
              >
                <CircularProgress
                  variant="determinate"
                  sx={{
                    color: (theme) =>
                      theme.palette.grey[
                        theme.palette.mode === "light" ? 200 : 800
                      ],
                    position: "absolute",
                  }}
                  size={400}
                  thickness={3}
                  value={100}
                />
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  sx={{
                    color: "#FFD257",
                    animationDuration: "3000ms",
                    position: "absolute",
                  }}
                  size={400}
                  thickness={3}
                />
                <button
                  className="text-5xl font-bold text-gray-700 z-10 hover:text-amber-300"
                  onClick={enterOnAirRoom}
                >
                  지금골라쥬
                </button>
              </div>
              <button
                className={`bg-gray-400 hover:bg-gray-500 fontsize-sm ${settingButton}`}
                onClick={() => {
                  leaveSession();
                  navigate("/");
                }}
              >
                메인으로 돌아가기
              </button>
            </div>
          ) : null}

          <div className="container mx-auto space-y-3">
            {/* 방송 화면으로 진입 후 */}
            {session !== undefined ? (
              // 방송자의 영상 송출 부분
              <div id="session">
                {isHost ? (
                  <div
                    id="session-header"
                    className="flex justify-between mb-3"
                  >
                    <div className="space-x-2">
                      <p className="fontsize-md">지금골라쥬 방송중</p>
                      {/* <button
                        className={`bg-sky-500 hover:bg-sky-700 ${settingButton}`}
                        onClick={screenShare}
                      >
                        화면 공유
                      </button> */}
                      {/* <button
                    className={`bg-sky-500 hover:bg-sky-700 ${settingButton}`}
                    onClick={mute}
                    >
                    {audioState
                      ? "마이크 음소거 (안됨)"
                      : "마이크 음소거 해제 (안됨)"}
                    </button> */}
                    </div>
                    <button
                      className={`bg-red-500 hover:bg-red-700 ${settingButton}`}
                      id="buttonLeaveSession"
                      onClick={leaveSession}
                      value="Leave session"
                    >
                      방송 종료
                    </button>
                  </div>
                ) : (
                  <div id="session-header" className="flex justify-end mb-2">
                    <button
                      className={`bg-red-500 hover:bg-red-700 ${settingButton}`}
                      id="buttonLeaveSession"
                      onClick={leaveSession}
                      value="Leave session"
                    >
                      나가기
                    </button>
                  </div>
                )}
                <div
                  id="sub-container"
                  className="flex flex-row justify-between gap-7 h-[625px]"
                >
                  <div
                    id="video+detail"
                    className="basis-2/3 flex flex-col gap-y-5"
                  >
                    {isHost && (
                      <div
                        id="main-video"
                        className="basis-4/5 w-full h-full rounded-md flex flex-col justify-center"
                      >
                        <UserVideoComponent streamManager={publisher} />
                      </div>
                    )}
                    {!isHost && (
                      <div
                        id="main-video"
                        className="basis-4/5 w-full h-full rounded-md flex flex-col justify-center"
                        style={{ transform: "scaleX(-1)" }}
                      >
                        <UserVideoComponent streamManager={subscribers[0]} />
                      </div>
                    )}
                    <div
                      id="detail"
                      className="basis-1/5 rounded-md p-3 space-y-3 bg-gray-100"
                    >
                      {/* 방송 정보는 지금 골라쥬 목록에서 받아오기 <- location으로 이전 페이지의 정보 state 가져오기 */}
                      <div className="flex flex-row justify-between">
                        <div
                          id="host-info"
                          className="flex text-center items-center space-x-2"
                        >
                          <img
                            className="w-8 h-8 rounded-full border border-black"
                            src={tmpProfileImg}
                            alt=""
                          />
                          <p className="text-lg">{hostNickName}</p>
                        </div>
                        <div>시청자 수 : {totalUsers}</div>
                      </div>
                      <p className="text-xl font-bold px-5">{title}</p>
                    </div>
                  </div>
                  <div
                    id="vote+chatting"
                    className="basis-1/3 flex flex-col gap-y-5"
                  >
                    <div
                      id="vote"
                      className="mb-3 basis-1/4 border-2 rounded-md bg-gray-100"
                    >
                      <Vote />
                      {/* TODO 투표 결과 다시 받아오기 (새로고침) 버튼 추가 */}
                      {/* <div className="w-full h-full justify-center items-center inline-flex flex-wrap">
                        {voteItem &&
                          voteItem.map((item, index) => {
                            if (item.slice(0, 10) === "data:image") {
                              return (
                                <div
                                  className={`relative border flex justify-center items-center bg-gray-50 w-1/2 h-[90px] cursor-pointer ${
                                    isVotedArr[index]
                                      ? "border-red-400 border-4"
                                      : ""
                                  }`}
                                  key={index}
                                  onMouseEnter={() =>
                                    setIsVoteHoveredArr((prevArr) => {
                                      prevArr[index] = true;
                                      return [...prevArr];
                                    })
                                  }
                                  onMouseLeave={() =>
                                    setIsVoteHoveredArr((prevArr) => {
                                      prevArr[index] = false;
                                      return [...prevArr];
                                    })
                                  }
                                  onClick={() => handleVote(index, item)}
                                >
                                  {isVoteHoveredArr[index] ? (
                                    <p className="fontsize-sm font-bold text-center text-amber-300">
                                      투표하기
                                    </p>
                                  ) : (
                                    <img
                                      src={item}
                                      className="size-2/3"
                                      alt="이미지 미리보기"
                                    />
                                  )}
                                  {isVoted && (
                                    <p className="absolute bottom-0 right-0 m-1 font-normal fontsize-xs">
                                      100표
                                    </p>
                                  )}
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  className={`relative border flex fontsize-sm font-bold justify-center items-center text-center bg-gray-50 w-1/2 h-[90px] cursor-pointer ${
                                    isVotedArr[index]
                                      ? "border-red-400 border-4"
                                      : ""
                                  }`}
                                  key={index}
                                  onMouseEnter={() =>
                                    setIsVoteHoveredArr((prevArr) => {
                                      prevArr[index] = true;
                                      return [...prevArr];
                                    })
                                  }
                                  onMouseLeave={() =>
                                    setIsVoteHoveredArr((prevArr) => {
                                      prevArr[index] = false;
                                      return [...prevArr];
                                    })
                                  }
                                  onClick={() => handleVote(index, item)}
                                >
                                  {isVoteHoveredArr[index] ? (
                                    <p className="fontsize-sm font-bold text-amber-300">
                                      투표하기
                                    </p>
                                  ) : (
                                    item
                                  )}
                                  {isVoted && (
                                    <p className="absolute bottom-0 right-0 m-1 font-normal fontsize-xs">
                                      100표
                                    </p>
                                  )}
                                </div>
                              );
                            }
                          })}
                      </div> */}
                    </div>
                    <div
                      id="chatting"
                      className="grow rounded-md bg-gray-100 p-1 lg:max-h-[30rem] max-h-[25rem]"
                    >
                      <ChattingList messageList={messageList}></ChattingList>
                      <ChattingForm
                        myUserName={myUserName}
                        onMessage={sendMsg}
                        currentSession={session}
                      ></ChattingForm>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </>
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
              leaveSession();
              navigate("/");
            }}
          >
            메인으로 돌아가기
          </button>
        </div>
      )}
    </>
  );
}
