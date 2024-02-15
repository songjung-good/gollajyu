// ChatList.jsx
import React from "react";

const ChatList = ({ list, choiced2, onLike }) => {
  // console.log(list);
  const colorMap = [
    "bg-green-300",
    "bg-yellow-300",
    "bg-blue-300",
    "bg-orange-300",
  ];

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString(); // Get date in format MM/DD/YYYY
    const formattedTime = date.toLocaleTimeString(); // Get time in format HH:MM:SS
    return `${formattedDate} ${formattedTime.slice(0, -3)}`; // 형식: YYYY.MM.DD 오전/오후 HH:mm
  };

  const items = () =>
    list.map((v, k) => (
      <div
        key={k}
        className={`px-3 flex ${
          v.voteItemId === choiced2 ? "justify-end" : ""
        }`}
      >
        <div
          className={`${
            colorMap[v.voteItemId % 4]
          } text-black p-2 rounded-lg max-w-xs`}
        >
          <small>
            {v.memberNickname} ({formatCreatedAt(v.createAt)})
          </small>
          <p className="chat-content">{v.commentDesc}</p>
          {/* <button className='fontsize-xs' disabled={v.liked ? true : false} onClick={() => onLike(k)}>좋아요: {v.commentLikesCnt}👍</button> */}
        </div>
      </div>
    ));

  return (
    <div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-2">{items()}</div>
      </div>
    </div>
  );
};

export default ChatList;
