import React, { useEffect, useState } from "react";
import VoteCardItem from '../VotePage/VoteCardItem';
import VoteDetailHeader from './VoteDetailHeader';
import VoteDetailReselt from './VoteDetailReselt';
import VoteDetailChat from './VoteDetailChat';
import axios from "axios";
import API_URL from "/src/stores/apiURL";
import useAuthStore from "/src/stores/userState";
import useModalStore from "/src/stores/modalState";
import { useParams } from 'react-router-dom';

// 투표 상세페이지의 투표 정보 보내는 내용(서버 to item)
const VoteDetail = () => {
  const detailVoteId = useModalStore((state) => state.detailVoteId);
  const [clicked, setClicked] = useState([false, false, false, false]);
  const [voteDetail, setVoteDetail] = useState();
  // 유저의 이메일정보
  const user = useAuthStore((state) => state.user);

  const [selectedVoteItem, setSelectedVoteItem] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [countList, setCountList] = useState([]);

  // 유저의 나이대
  const year = user.birthday.year;
  const month = user.birthday.month;
  const day = user.birthday.day;
  
  const now = new Date(); // 현재 날짜
  const currentYear = now.getFullYear(); // 현재 연도
  const currentMonth = now.getMonth() + 1; // 현재 월
  const currentDay = now.getDate(); // 현재 일
  
  let age = currentYear - year; // 만 나이 계산

    // 생일이 아직 지나지 않았다면 만 나이에서 1을 빼야 합니다.
  if (currentMonth < month || (currentMonth === month && currentDay < day)) {
    age--;
  }

  // 10대부터 50대까지 나이대 계산
  let ageGroup;
  if (age < 20) {
    ageGroup = 1;
  } else if (age < 30) {
    ageGroup = 2;
  } else if (age < 40) {
    ageGroup = 3;
  } else if (age < 50) {
    ageGroup = 4;
  } else {
    ageGroup = 5;
  }
  
  useEffect(() => {
    const params = new URLSearchParams();

    params.append("memberId", user.memberId);
    params.append("voteId", detailVoteId);
    params.append("filter.age", -1);
    params.append("filter.gender", 'A');
    params.append("filter.typeId", -1);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/votes/detail`, {
          params
        });
        // 요청 성공 시 응답 데이터를 상태에 저장합니다.
        setVoteDetail(data.body);
      } catch (error) {
        // 요청 실패 시 오류 처리를 수행합니다.
        console.error(error);
      }
    };
    fetchData();
  }, [detailVoteId]);


  // 모달창 닫는 로직
  const setVoteDetailModalClose = useModalStore(
    (state) => state.setVoteDetailModalClose
    );
  const handleClose = () => {
    setVoteDetailModalClose();
  };

  
  ///////////// 상훈 추가 /////////////
  ///////////////////////////////////
  /////////////////////////////////////

  // 클릭 시 isSelect 상태 변수를 false로 업데이트 하는 함수
  const handleClick = (itemId, selection) => {
    // console.log(itemId)
    // console.log(`선택지 ${itemId + 1}: ${selection}`);
    setCountList(prevCountList => 
      prevCountList.map((count, i) => voteItemList[i].voteItemId === itemId ? count + 1 : count));

    let plusCount = totalCount + 1;
    setTotalCount(plusCount);
    setSelectedVoteItem(itemId);
    console.log(selectedVoteItem);
  };

  // axios 요청 후 처리를 위한 로직
  useEffect(() => {
    let newTotalCount = 0;
    if (voteDetail) {
    voteDetail.voteItemList.forEach((item) => {
      newTotalCount += item.count;
    })
    setTotalCount(newTotalCount);
    setCountList(prevCountList => voteDetail.voteItemList.map(item => item.count))
   }
  }, [voteDetail]);
  
  useEffect(() => {
    (voteDetail) ? setSelectedVoteItem(voteDetail.chosenItem)
    : null;

    }, [voteDetail])
  
  return (
    <div
      id="outer-layer"
      className="fixed inset-0 z-50 bg-black bg-opacity-50 py-10 flex justify-center items-center"
      onClick={(e) => {
        if (e.target.id == "outer-layer") {
          setVoteDetailModalClose();
        }
      }}
    >
      {voteDetail && (
        <div className="mx-auto max-h-[800px] w-full max-w-[1000px] overflow-auto rounded-xl bg-white">
          <VoteDetailHeader
            className=""
            {...voteDetail.voteInfo}
            onClose={handleClose}
          />
          <div className="p-2 flex justify-around items-center h-full">
            {/* 투표한 안한 사람( voteDetail.chosenItem = null )은 투표가 가능하게  */}
            {voteDetail.voteItemList.map((item, itemIndex) => (
            <VoteCardItem 
            key={item.voteItemId}
            item={item}
            categoryId={voteDetail.voteInfo.categoryId}
            voteId={voteDetail.voteInfo.voteId}
            totalCount={totalCount}
            count={item.count}
            selectedVoteItem={selectedVoteItem}
            path="/VotePage"
            onClicked={(voteItemId) => handleClick(voteItemId)}
          />
            ))}
          </div>
          {voteDetail.chosenItem && (
            <>
              <VoteDetailReselt
                voteResults={voteDetail.voteItemList}
              />
              <VoteDetailChat
                commentList={voteDetail.commentList}
                chosenItem={voteDetail.chosenItem}  //선택한 아이템이 투표에 몇번째 인지 보내줘야한다...
                userId={user.memberId}
                voteId={detailVoteId}
              />
            </>
          )}
        </div>
      )}      
    </div>
  );
};

export default VoteDetail;