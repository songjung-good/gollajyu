import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
  return (
    <>
      <h1>지금 골라쥬 메인페이지</h1>
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
          className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={enterRoom}
        >
          시청자로 진입(Guest)
        </button>
      </div>
    </>
  );
};

export default BroadcastPage;
