import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Vote = () => {
  const voteItem = ["임시", "임시"]; //, "임시", "임시"];
  // TODO roomId를 가지고 해당 room에 연결된 voteItem을 가져오는 요청해야함
  const [isVoteHoveredArr, setIsVoteHoveredArr] = useState(
    Array(voteItem.length).fill(false)
  ); // 각 투표 선택지 위에 마우스가 올라가 있는지
  const [isVotedArr, setIsVotedArr] = useState(
    Array(voteItem.length).fill(false)
  ); // 각 투표 선택지가 선택되었는지 여부
  const [isVoted, setIsVoted] = useState(false); // 투표를 했는지 여부
  const [voteCounts, setVoteCounts] = useState([]); // 투표 아이템 별 표 수 (서버로 요청)

  // ------------ 방송 내 투표 관련 기능 ----------------
  const handleVote = (index, item) => {
    // TODO 클릭하면, 해당 item 투표수 1 증가시키는 요청을 서버로 보내기
    // 투표한 상태로 변경 (-> 투표 선택지 변경 가능하게?)
    setIsVoted(true);
    setIsVotedArr(() => {
      const arr = Array(voteItem.length).fill(false);
      arr[index] = true;
      // console.log("선택:", arr);
      return [...arr];
    });
    console.log(index, item);
  };

  const getVoteRate = async () => {
    // TODO 서버에서 투표 아이템별 표 수에 대한 정보를 받아오기 -> 투표 아이템별 표 수 상태 업데이트, 일정 시간마다 동작하도록 작성(setInterval 사용)
    // const response = await axios.get(
    //url 기타 등등
    // )
    setVoteCounts(); // 서버에서 받은 투표 아이템별 표 수 넣기 -> id, count 또는 name, count + 총 참여자 수
  };

  // 투표를 하면 -> 서버에서 투표 아이템별 표 수에 대한 정보 받아오기
  useEffect(() => {
    getVoteRate();
  }, [isVoted]);

  return (
    <div className="w-full h-full justify-center items-center inline-flex flex-wrap">
      {/* TODO 투표 결과 다시 받아오기 (새로고침) 버튼 추가 */}
      {voteItem &&
        voteItem.map((item, index) => {
          if (item.slice(0, 10) === "data:image") {
            return (
              <div
                className={`relative border flex justify-center items-center bg-gray-50 w-1/2 h-[90px] cursor-pointer ${
                  isVotedArr[index] ? "border-red-400 border-4" : ""
                }`}
                key={index}
                onMouseEnter={() =>
                  setIsVoteHoveredArr((prevArr) => {
                    prevArr[index] = true;
                    return [...prevArr];
                  })
                }
                onMouseLeave={() =>
                  setIsVoteHoveredArr((prevArr) => {
                    prevArr[index] = false;
                    return [...prevArr];
                  })
                }
                onClick={() => handleVote(index, item)}
              >
                {isVoteHoveredArr[index] ? (
                  <p className="fontsize-sm font-bold text-center text-amber-300">
                    투표하기
                  </p>
                ) : (
                  <img src={item} className="size-2/3" alt="이미지 미리보기" />
                )}
                {isVoted && (
                  <p className="absolute bottom-0 right-0 m-1 font-normal fontsize-xs">
                    100표
                  </p>
                )}
              </div>
            );
          } else {
            return (
              <div
                className={`relative border flex fontsize-sm font-bold justify-center items-center text-center bg-gray-50 w-1/2 h-[90px] cursor-pointer ${
                  isVotedArr[index] ? "border-red-400 border-4" : ""
                }`}
                key={index}
                onMouseEnter={() =>
                  setIsVoteHoveredArr((prevArr) => {
                    prevArr[index] = true;
                    return [...prevArr];
                  })
                }
                onMouseLeave={() =>
                  setIsVoteHoveredArr((prevArr) => {
                    prevArr[index] = false;
                    return [...prevArr];
                  })
                }
                onClick={() => handleVote(index, item)}
              >
                {isVoteHoveredArr[index] ? (
                  <p className="fontsize-sm font-bold text-amber-300">
                    투표하기
                  </p>
                ) : (
                  item
                )}
                {isVoted && (
                  <p className="absolute bottom-0 right-0 m-1 font-normal fontsize-xs">
                    100표
                  </p>
                )}
              </div>
            );
          }
        })}
    </div>
  );
};

export default Vote;
