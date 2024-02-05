import React from "react";
import OpenViduVideoComponent from "./OvVideo.jsx";

const streamComponent = {
  position: "relative",
  background: "#f8f8f8",
  paddingLeft: "5px",
  paddingRight: "5px",
  color: "#777777",
  fontWeight: "bold",
  borderBottomRightRadius: "4px",
};

const nameTag = {
  position: "absolute",
  zIndex: 9999,
  margin: "0",
  background: "white",
  borderRadius: "0.2rem",
};

export default function UserVideoComponent({ streamManager }) {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent" style={streamComponent}>
          <OpenViduVideoComponent streamManager={streamManager} />
          {/* 네임태그는 나중에 지울 것 */}
          {/* <p style={nameTag}>{getNicknameTag()}</p> */}
        </div>
      ) : null}
    </div>
  );
}
