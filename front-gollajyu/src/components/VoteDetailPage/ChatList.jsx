// ChatList.jsx
import React from "react";

// 커스텀 스토어를 이용한 상태 관리
import useAuthStore from "/src/stores/userState";


const ChatList = ({ list, choiced2, onLike }) => {
  // console.log(list);
  const colorMap = [
    "text-[#FF595E]",
    "text-[#FFCA3A]",
    "text-[#8AC926]",
    "text-[#1982C4]",
  ];

  const user = useAuthStore((state) => state.user);

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
          style={{ background: (v.memberId === user.memberId) ? "#FFE69C" : "#FFFFFF" }}
          className={"text-black p-2 rounded-lg max-w-xs"}
        >
          <small
            className={`fontsize-xs ${colorMap[v.voteItemId % 4]}`}
          >
            {v.memberNickname} ({formatCreatedAt(v.createAt)})
          </small>
          <p
            style={{ fontFamily: "GmarketSansLight", fontWeight: "bold" }}
            className="chat-content fontsize-sm"
          >
            {v.commentDesc}
          </p>
          {/* <button className='fontsize-xs' disabled={v.liked ? true : false} onClick={() => onLike(k)}>좋아요: {v.commentLikesCnt}👍</button> */}
        </div>
      </div>
    ));

  return (
    <>
      <div
        style={{
          overflowY: "auto", // 세로 스크롤을 가능하게 하기 위해 추가
          scrollbarWidth: "thin", // 스크롤바를 얇게 만듦
          scrollbarColor: "#BEBEBE transparent", // 스크롤바 색상 (track, thumb 순서)
        }}
        className="flex-1 overflow-y-auto py-4 bg-gray-100 h-[500px]"
      >
        <div className="flex flex-col space-y-2">{items()}</div>
      </div>
    </>
  );
};

export default ChatList;
