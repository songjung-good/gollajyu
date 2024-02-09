import axios from "axios";
import API_URL from "../../stores/apiURL";
import useAuthStore from "../../stores/userState";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Vote = ({ liveId }) => {
  const [voteItem, setVoteItem] = useState([]);
  const [voteItemCount, setVoteItemCount] = useState([]);
  const user = useAuthStore((state) => state.user);

  // 서버에서 투표 아이템별 표 수에 대한 정보를 받아오기 -> 투표 아이템별 표 수 상태 업데이트
  const getVoteResult = async () => {
    // TODO 일정 시간마다 동작하도록 작성(setInterval 사용)
    axios
      .get(API_URL + `/lives/${liveId}`)
      .then((res) => {
        const tmpVoteItemCount = [];
        res.data.body.liveVoteItemDtoResList.forEach((item) => {
          tmpVoteItemCount.push(item.count ? item.count : 0);
        });
        console.log("새로 가져옴:", tmpVoteItemCount);
        setVoteItemCount(tmpVoteItemCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 처음 컴포넌트가 마운트될 때, liveId를 기반으로 해당 방송 내의 투표 정보를 가져옴
  useEffect(() => {
    axios
      .get(API_URL + `/lives/${liveId}`)
      .then((res) => {
        const tmpVoteItem = [];
        const tmpVoteItemCount = [];
        res.data.body.liveVoteItemDtoResList.forEach((item) => {
          if (item.imgUrl) {
            tmpVoteItem.push({ id: item.id, item: item.imgUrl });
          } else if (item.description) {
            tmpVoteItem.push({ id: item.id, item: item.description });
          }
          tmpVoteItemCount.push(item.count ? item.count : 0);
        });
        // console.log(tmpVoteItem);
        // console.log(tmpVoteItemCount);
        setVoteItem(tmpVoteItem);
        setVoteItemCount(tmpVoteItemCount);
      })
      .catch((err) => {
        console.log(err);
      });

    const intervalGet = setInterval(() => {
      getVoteResult();
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalGet);
  }, []);

  const [isVoteHoveredArr, setIsVoteHoveredArr] = useState(
    Array(voteItem.length).fill(false)
  ); // 각 투표 선택지 위에 마우스가 올라가 있는지
  const [isVotedArr, setIsVotedArr] = useState(
    Array(voteItem.length).fill(false)
  ); // 각 투표 선택지가 선택되었는지 여부
  const [isVoted, setIsVoted] = useState(false); // 투표를 했는지 여부

  // ------------ 방송 내 투표 관련 기능 ----------------
  // 투표하기
  const handleVote = (index, item) => {
    setIsVoted(true); // 투표한 상태로 변경 (-> 투표 선택지 변경 가능)
    setIsVotedArr(() => {
      const arr = Array(voteItem.length).fill(false);
      arr[index] = true;
      return [...arr];
    });
    console.log(item.id, item.item);
    // api/lives/vote 로 post 요청 보내기 {memberId: number, liveId: number, liveVoteItemId: number} data 보내야함
    axios
      .post(API_URL + "/lives/vote", {
        memberId: user.memberId,
        liveId: liveId,
        liveVoteItemId: item.id,
      })
      .then((res) => {
        console.log("투표성공", res);
        // 투표 성공 후, 투표 표 수 데이터 다시 받아서 렌더링
        getVoteResult();
      })
      .catch((err) => {
        console.log("투표실패", err);
      });
    // 방송 상세조회 GET 요청 보내서 바뀐 결과 받기
  };

  return (
    <>
      <div className="w-full h-full justify-center items-center inline-flex flex-wrap">
        {voteItem &&
          voteItem.map((item, index) => {
            if (item.item.includes("gollajyuImages")) {
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
                    <img
                      src={item.item}
                      className="size-2/3"
                      alt="이미지 미리보기"
                    />
                  )}
                  {isVoted && (
                    <p className="absolute bottom-0 right-0 m-1 font-normal fontsize-xs">
                      {voteItemCount[index]} 표
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
                    item.item
                  )}
                  {isVoted && (
                    <p className="absolute bottom-0 right-0 m-1 font-normal fontsize-xs">
                      {voteItemCount[index]} 표
                    </p>
                  )}
                </div>
              );
            }
          })}
      </div>
    </>
  );
};

export default Vote;
