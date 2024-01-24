import React, { useRef, useEffect } from "react";

const video = {
  position: "relative",
  zIndex: 999,
  width: "100%",
  height: "auto",
  float: "left",
  cursor: "pointer",
  borderRadius: "10px",
};

export default function OpenViduVideoComponent({ streamManager }) {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <video style={video} autoPlay={true} ref={videoRef} />;
}
