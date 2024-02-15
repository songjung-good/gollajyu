// ChatForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "/src/stores/apiURL";

const ChatForm = ({ onSubmit, userid, choiced, voteId }) => {
  const [value, setValue] = useState("");
  const [chatList, setChatList] = useState([]);

  const handleChange = (e) => {
    if (e.target.value.length > 50) {
      window.alert("글자수가 50자를 넘었습니다");
      setValue(e.target.value.slice(0, 50));
    } else {
      setValue(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      voteId: voteId,
      memberId: userid,
      voteItemId: choiced,
      commentDesc: value,
      commentMentionId: 0,
    };
    try {
      await axios.post(`${API_URL}/votes/details/comments`, body);
      onSubmit(value, userid, choiced);
      setValue("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setChatList([
      ...chatList,
      { content: value, userId: userid, voteItemId: choiced },
    ]);
  }, [value, userid, choiced]);

  // enter키로도 입력 가능
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <>
      <div className="bg-white py-4 flex items-center">
        <input
          type="text"
          className="flex-1 border rounded-sm px-4 py-2 h-12 focus:outline-none"
          placeholder="댓글을 입력해 주세요(50자 이내)"
          onChange={handleChange}
          value={value.slice(0, 50)}
          onKeyPress={handleKeyPress}
        />
        <button
          type="submit"
          className="bg-amber-300 rounded-sm p-2 ml-2 h-12 w-20 hover:bg-amber-400 focus:outline-none"
          onClick={handleSubmit}
        >
          전송
        </button>
      </div>
    </>
  );
};

export default ChatForm;
