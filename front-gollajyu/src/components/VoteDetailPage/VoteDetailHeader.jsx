import React, { useState } from "react";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 커스텀 스토어를 이용한 상태 관리
import useAuthStore from "/src/stores/userState";

const VoteDetailHeader = (props) => {
  // 좋아요 상태 변수
  const [isVoteLike, setIsVoteLike] = useState(props.liked);
  const [voteLikesCount, setVoteLikesCount] = useState(props.likesCnt);

  const user = useAuthStore((state) => state.user);

  // console.log(props);

  // 좋아요 관리 함수
  const handleLike = async () => {
    try {
      const response = await axios.post(API_URL + "/votes/likes", {
        memberId: user.memberId,
        voteId: props.voteId,
      });

      // 현재 좋아요 상태를 업데이트
      // 만약 이미 좋아요를 눌렀었다면 좋아요 수를 1 감소시키고, 그렇지 않으면 1 증가시킴
      setVoteLikesCount(isVoteLike ? voteLikesCount - 1 : voteLikesCount + 1);

      // 좋아요 상태를 반전시킴
      setIsVoteLike(!isVoteLike);
      // console.log('POST request response:', response.data);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  return (
    <>
      <div className="w-auto h-auto flex flex-col pt-4 pb-12 bg-white overflow-hidden max-w-xxl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="p-auto">
              <span className="fontsize-sm font-bold text-gray-700">
                {props.memberNickname}님
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              className="flex items-center px-2 py-1 rounded-md hover:outline hover:outline-3 hover:outline-red-300"
              onClick={handleLike}
            >
              <span className="text-red-500 fontsize-sm">
                {" "}
                {isVoteLike ? "❤" : "♡"}
              </span>
              <span className="text-red-500 fontsize-sm ml-2">
                {props.likesCnt}
              </span>
            </button>

            <div className="flex items-center ml-4 mr-2">
              <span className="fontsize-sm ml-2">
                참여자 수 : {props.totalChoiceCnt}
              </span>
            </div>

            {/* <button
              className="p-1 w-auto h-auto rounded-full bg-red-200 flex items-center justify-center"
              onClick={() => props.onClose()}
            >
              X
            </button> */}
          </div>
        </div>

        <span className="fontsize-md pt-4">"{props.title}"</span>
      </div>
    </>
  );
};

export default VoteDetailHeader;
