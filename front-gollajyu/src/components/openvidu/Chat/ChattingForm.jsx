import React, { useState } from "react";
import { Send } from "@mui/icons-material";
import { Button, Input, Tooltip } from "@mui/material";
import styled from "styled-components";

const ChattingForm = (props) => {
  const [message, setMessage] = useState("");

  // 메세지를 보내는 함수
  const sendMessage = (event) => {
    event.preventDefault();
    if (message.trim() !== "") {
      props.onMessage(
        `${props.myUserName}: ` + message.trim(),
        props.currentSession
      ); // 공백을 제거하여 전달
    }
    setMessage("");
  };

  // 입력 데이터 변경
  const inputChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const checkEnter = (event) => {
    if (event.key === "Enter") {
      sendMessage(event);
    }
  };

  return (
    <div onSubmit={sendMessage} className="flex justify-stretch">
      <div className="flex-none w-20 text-center m-auto">
        {props.myUserName.length <= 6
          ? props.myUserName
          : props.myUserName.length.slice(0, 6) + "..."}
      </div>
      <Input
        className="flex-grow"
        placeholder="메세지를 입력하세요"
        id="chat-input"
        value={message}
        onChange={inputChangeHandler}
        onKeyUp={checkEnter}
        style={{
          background: "rgba(255, 255, 255)",
          border: "1px solid rgba(177, 177, 177)",
          borderRadius: "5px",
          padding: "5px",
          color: "black",
        }}
      ></Input>
      <Tooltip title="메세지 보내기">
        <Button
          className="flex-none w-10"
          variant="contained"
          style={{ color: "white", background: "#FFD257" }}
          onClick={sendMessage}
        >
          <Send></Send>
        </Button>
      </Tooltip>
    </div>
  );
};

export default ChattingForm;
