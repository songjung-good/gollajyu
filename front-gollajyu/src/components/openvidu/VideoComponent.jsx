import { OpenVidu } from "openvidu-browser";

import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import UserVideoComponent from "./UserVideoComponent.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import ChattingForm from "./chat/ChattingForm";
import ChattingList from "./chat/ChattingList";
import { Button, Input, CircularProgress } from "@mui/material";
import tmpProfileImg from "/assets/images/tmp_profile.png";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "https://demos.openvidu.io/";

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
  const [chatDisplay, setChatDisplay] = useState(true); // 채팅창 보이기(초깃값: true)
  const [audioState, setAudioSate] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0); // 총 유저수
  const voteItem = location.state.voteItem
    ? location.state.voteItem
    : ["임시", "임시", "임시", "임시"];
  const title = location.state.title ? location.state.title : "임시 제목";
  const hostNickName = location.state.hostNickName
    ? location.state.hostNickName
    : "임시 닉네임";
  console.log("isHost?:", isHost);

  const OV = useRef(new OpenVidu());

  // sessionId가 변경되는 경우 -> MySessionId 상태 변경
  const handleChangeSessionId = useCallback((e) => {
    setMySessionId(e.target.value);
  }, []);

  // userName이 변경되는 경우 -> MyUserName 상태 변경
  const handleChangeUserName = useCallback((e) => {
    setMyUserName(e.target.value);
  }, []);

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
            const currentVideoDevice = videoDevices.find(
              (device) => device.deviceId === currentVideoDeviceId
            );

            console.log("publisher:", publisher);
            setPublisher(publisher);
            setCurrentVideoDevice(currentVideoDevice);
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

  // 전면, 후면 카메라 변경 함수 => 현재 사용 X, 화면 공유 함수 작성 시 참고할 수 있을 듯
  // const switchCamera = useCallback(async () => {
  //   try {
  //     const devices = await OV.current.getDevices();
  //     const videoDevices = devices.filter(
  //       (device) => device.kind === "videoinput"
  //     );

  //     if (videoDevices && videoDevices.length > 1) {
  //       const newVideoDevice = videoDevices.filter(
  //         (device) => device.deviceId !== currentVideoDevice.deviceId
  //       );

  //       if (newVideoDevice.length > 0) {
  //         const newPublisher = OV.current.initPublisher(undefined, {
  //           videoSource: newVideoDevice[0].deviceId,
  //           publishAudio: true,
  //           publishVideo: true,
  //           mirror: true,
  //         });

  //         if (session) {
  //           await session.unpublish(mainStreamManager);
  //           await session.publish(newPublisher);
  //           setCurrentVideoDevice(newVideoDevice[0]);
  //           setMainStreamManager(newPublisher);
  //           setPublisher(newPublisher);
  //         }
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, [currentVideoDevice, session, mainStreamManager]);

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

  // 현재 화면에서 벗어나는 동작(navbar 눌러서 이동)하면 막는 알림 한번 띄워주기
  // 추가해야되는 기능
  // 단순히 useEffect(() => {return leaveSession()}) 을 하면, 방송화면 들어가기 전 화면에서 계속 실행됨(왜...)

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
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  }, [mySessionId]);

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  };

  // 로딩 페이지를 통한 방 입장
  const enterOnAirRoom = () => {
    joinSession();
  };

  return (
    <>
      <div id="logo" className="m-5 text-center">
        <p style={logoStyle}>골라쥬</p>
      </div>
      {/* 방송 화면으로 진입하기 전, 한번 막음 => joinSession이 동작하는 단계가 필요하기 때문*/}
      {session === undefined ? (
        <div
          id="join"
          className="container my-24 mx-auto flex flex-col justify-center items-center space-y-10"
        >
          <h1 className="text-2xl text-center">
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
            className={`bg-gray-400 hover:bg-gray-500 ${settingButton}`}
            onClick={() => {
              leaveSession();
              navigate("/");
            }}
          >
            메인으로 돌아가기
          </button>
        </div>
      ) : null}

      <div className="container my-7 mx-auto space-y-3">
        {/* 방송 화면으로 진입 후 */}
        {session !== undefined ? (
          // 방송자의 영상 송출 부분
          <div id="session">
            {isHost ? (
              <div id="session-header" className="flex justify-between mb-3">
                <div className="space-x-2">
                  <button
                    className={`bg-sky-500 hover:bg-sky-700 ${settingButton}`}
                    onClick={screenShare}
                  >
                    화면 공유
                  </button>
                  <button
                    className={`bg-sky-500 hover:bg-sky-700 ${settingButton}`}
                    onClick={mute}
                  >
                    {audioState
                      ? "마이크 음소거 (안됨)"
                      : "마이크 음소거 해제 (안됨)"}
                  </button>
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
              className="flex flex-row justify-between gap-7"
            >
              <div
                id="video+detail"
                className="basis-2/3 flex flex-col gap-y-5"
              >
                {isHost && (
                  <div
                    id="main-video"
                    className="basis-3/5 w-full h-full rounded-md"
                  >
                    <UserVideoComponent streamManager={publisher} />
                  </div>
                )}
                {!isHost && (
                  <div
                    id="main-video"
                    className="basis-3/5 w-full h-full rounded-md"
                    style={{ transform: "scaleX(-1)" }}
                  >
                    <UserVideoComponent streamManager={subscribers[0]} />
                  </div>
                )}
                <div
                  id="detail"
                  className="basis-2/5 rounded-md p-3 space-y-3 bg-gray-100"
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
                  className="mb-3 basis-1/3 border-2 rounded-md bg-gray-100"
                >
                  {voteItem && (
                    <div className="w-full h-full justify-center items-center inline-flex flex-wrap">
                      {voteItem.map((item) => (
                        <div className="flex border justify-center items-center w-1/2 h-1/2 text-center text-2xl">
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {chatDisplay && (
                  <div
                    id="chatting"
                    className="basis-2/3 rounded-md bg-gray-100 p-1"
                  >
                    <ChattingList messageList={messageList}></ChattingList>
                    <ChattingForm
                      myUserName={myUserName}
                      onMessage={sendMsg}
                      currentSession={session}
                    ></ChattingForm>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
