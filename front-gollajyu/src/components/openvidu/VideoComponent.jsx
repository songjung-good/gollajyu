import { OpenVidu } from "openvidu-browser";

import axios from "axios";
import API_URL from "/src/stores/apiURL";
import React, { useCallback, useEffect, useRef, useState } from "react";
import UserVideoComponent from "./UserVideoComponent.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import ChattingForm from "./Chat/ChattingForm.jsx";
import ChattingList from "./Chat/ChattingList.jsx";
import useAuthStore from "/src/stores/userState";
import Vote from "./Vote.jsx";
import { Button, Input, CircularProgress } from "@mui/material";

// Footer
import Footer from "../../components/Footer";

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
  const user = useAuthStore((state) => state.user);
  const [isEnoughSize, setIsEnoughSize] = useState(true);
  const liveId = location.state.liveId; // createVideoRoom이나 broadcastpage에서 넘어올때 state에 담아서 줌
  const [title, setTitle] = useState("");
  const [hostNickName, setHostNickName] = useState("");
  const [mySessionId, setMySessionId] = useState(location.state.sessionId);
  const isHost = location.state.isHost; // isHost로 분기해서 isHost=true면 화면을 publish하고 아니면 publish는 없이 subscribe만 함
  const myUserName = user.nickname;
  const [session, setSession] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [messageList, setMessageList] = useState([]); // 메세지 정보를 담을 배열
  const [audioState, setAudioSate] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0); // 총 유저수
  // console.log("isHost?:", isHost);

  useEffect(() => {
    // 컴포넌트가 마운트 될 때, liveId로 방송 정보 GET 요청을 보냄
    axios
      .get(API_URL + `/lives/${liveId}`)
      .then((res) => {
        setTitle(res.data.body.title);
        setHostNickName(res.data.body.nickName);
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

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

            // console.log("publisher:", publisher);
            setPublisher(publisher);
            // setCurrentVideoDevice(currentVideoDevice);
          }
        } catch (error) {
          // console.log(
          //   "There was an error connecting to the session:",
          //   error.code,
          //   error.message
          // );
        }
      });
    }
  }, [session]);

  // subscribers 변경이 잘 되는지 확인하기 위한 코드 => 배포 시, 삭제
  useEffect(() => {
    // console.log("구독자 변경: ", subscribers);
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
    setPublisher(undefined);

    // Host이면 지금골라쥬 방 삭제 요청
    if (isHost) {
      axios.delete(API_URL + `/lives/${liveId}`).then;
      //( console.log("라이브 방송 삭제"));
    } else {
      // Host가 아니면 퇴장 요청
      // api/lives/{liveId}/exit/{memberId} 에 POST 요청을 보내면서 방에서 퇴장
      axios
        .post(API_URL + `/lives/${liveId}/exit/${user.memberId}`)
        .then((res) => {
          // console.log("라이브 방송 퇴장 성공");
        })
        .catch((err) => {
          // console.log(err);
          // console.log("라이브 방송 퇴장 실패");
        });
    }

    navigate("/BroadcastPage");
    window.location.reload();
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
        // console.log("Message successfully sent");
      })
      .catch((error) => {
        console.error(error);
      });
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
    // api/lives/{liveId}/enter/{memberId} 에 POST 요청을 보내면서 방에 입장
    axios
      .post(API_URL + `/lives/${liveId}/enter/${user.memberId}`)
      .then((res) => {
        // console.log("라이브 방송 입장 성공");
      })
      .catch((err) => {
        // console.log(err);
        // console.log("라이브 방송 입장 실패");
      });
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
      {isEnoughSize ? (
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
                  <div
                    id="session-header"
                    className="flex justify-between mb-2"
                  >
                    <p className="fontsize-md">지금골라쥬 시청중</p>
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
                  className="flex flex-row justify-between gap-7 h-[625px] my-16"
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
                    {!isHost &&
                      (subscribers[0] ? (
                        <div
                          id="main-video"
                          className="basis-4/5 w-full h-full rounded-md flex flex-col justify-center"
                          style={{ transform: "scaleX(-1)" }}
                        >
                          <UserVideoComponent streamManager={subscribers[0]} />
                        </div>
                      ) : (
                        <div
                          id="main-video"
                          className="basis-4/5 w-full h-full rounded-md flex flex-col justify-center"
                        >
                          <p className="text-center fontsize-lg">
                            방송이 종료되었습니다
                          </p>
                        </div>
                      ))}
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
                          <p className="text-lg">{hostNickName}님의 방송</p>
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
                      <Vote liveId={liveId} />
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
