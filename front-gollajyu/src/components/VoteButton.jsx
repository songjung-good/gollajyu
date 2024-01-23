import React from "react";

const VoteButton = () => {
  const voteButtonContainerStyle = {
      position: "fixed",
      bottom: "20px",
      right: "20px",
    };
    
  const voteButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };
      
  return (
    <div style={voteButtonContainerStyle}>
      <button style={voteButtonStyle}>투표 생성</button>
    </div>
  );
};

export default VoteButton;
