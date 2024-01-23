import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BroadcastPage = () => {
  const navigate = useNavigate();
  const enterRoom = () => {
    navigate("/EnterVideoRoom", {
      state: { isHost: false, sessionId: "SessionA" },
    });
  };
  const createRoom = () => {
    navigate("/EnterVideoRoom", {
      state: { isHost: true, sessionId: "SessionA" },
    });
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
      <button
        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={enterRoom}
      >
        SessionA로 진입(Guest)
      </button>
    </>
  );
};

export default BroadcastPage;
