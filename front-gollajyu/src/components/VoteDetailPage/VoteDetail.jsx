import React, { useEffect, useState } from "react";
import VoteCardItem from '../VotePage/VoteCardItem';
import VoteDetailHeader from './VoteDetailHeader';
import VoteDetailReselt from './VoteDetailReselt';
import VoteDetailChat from './VoteDetailChat';
import axios from "axios";
import API_URL from "../../stores/apiURL";
import useAuthStore from "../../stores/userState";
import useModalStore from "../../stores/modalState";
import { useParams } from 'react-router-dom';

// 투표 상세페이지의 투표 정보 보내는 내용(서버 to item)
const VoteDetail = () => {
  const { voteId } = useParams();
  const [clicked, setClicked] = useState([false, false, false, false]);
  const [voteDetail, setVoteDetail] = useState();

  // 유저의 이메일정보
  const user = useAuthStore((state) => state.user);

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
    params.append("voteId", 85);
    params.append("filter.age", ageGroup);
    params.append("filter.gender", 'MALE');
    params.append("filter.typeId", 2);

    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/votes/detail`, {
          params
        });
        console.log(voteId)
        // 요청 성공 시 응답 데이터를 상태에 저장합니다.
        setVoteDetail(data.body);
      } catch (error) {
        // 요청 실패 시 오류 처리를 수행합니다.
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // 투표 클릭 부분
  const handleClick = (index) => {
    const newClicked = clicked.map((item, i) => (i === index ? !item : item));
    setClicked(newClicked);
  };

  // 모달창 닫는 로직
  const setVoteDetailModalClose = useModalStore(
    (state) => state.setVoteDetailModalClose
    );
  const handleClose = () => {
    setVoteDetailModalClose();
  };

  return (
    <div className="bg-white shadow-md rounded-md max-w-5xl mx-auto">
      {voteDetail && (
        <>
          <VoteDetailHeader
            {...voteDetail.voteInfo}
            onClose={handleClose}
          />
          <div className="p-2 flex justify-around items-center h-full">
            {/* {voteDetail.voteItemListInfo.map((item) => (
              <VoteCardItem
                key={item.voteItemId}
                src={item.voteItemImgUrl}
                item={item} // 전체 item 객체 전달
                categoryId={1} // categoryData 객체 전달
                isSelect={selectedVoteItemId === item.voteItemId} // 선택된 항목 ID 정보 전달
                onClick={(index) => handleClick(item.voteItemId, index)} // onClick 함수를 전달
                user={user} // 로그인 사용자 정보 전달
              />
            ))} */}
          </div>
          {voteDetail.hasVoted && (
            <>
              <VoteDetailReselt
                totalchoicecnt={voteDetail.voteInfo.totalChoiceCnt}
                itemchoicecnt={item.choiceCnt}
                tagCountList={item.tagCountList}
              />
              <VoteDetailChat 
                commentList={voteDetail.commentList}
              />
            </>
          )}
        </>
      )}      
    </div>
  );
};

export default VoteDetail;