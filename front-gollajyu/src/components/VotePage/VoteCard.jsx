import React, { useState } from 'react';
import VoteCardItem from './VoteCardItem';
import useAuthStore from '../../stores/userState';
import axios from 'axios';
import API_URL from '../../stores/apiURL';

export default function VoteCard(props) {
  const [isSelect, setIsSelect] = useState(true);
  const { vote } = props;
  const user = useAuthStore((state) => state.user);
  const [voteLikesCount, setVoteLikesCount] = useState(vote.likesCnt);
  const [isVoteLike, setIsVoteLike] = useState(vote.liked);
  const handleClick = (index, selection) => {
    setIsSelect(false)
    console.log(`선택지 ${index + 1}: ${selection}`);
  };
  // 좋아요 했는지에 따라서 axios 관리 해주기 = 하영이가 잘 해둬서 +-만 고려하면 됐음
  const handleLike = async () => {
    try {
      const response = await axios.post(API_URL+'/votes/likes', {
        memberId: user.memberId,
        voteId: vote.voteId
      });
      setVoteLikesCount((isVoteLike) ? voteLikesCount-1 : voteLikesCount+1);
      setIsVoteLike(!isVoteLike)
      console.log('POST request response:', response.data);
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  }

  // 여기서 정보를 보내준다 (서버에서 받아온 데이터를 item으로 넘긴다.)
  return (
    <div className="mx-auto mb-10 max-w-5xl px-2 bg-white rounded-xl" style={{ height: '450px'}}>
      <div className=" ">
        <p>{vote.categoryName}</p>
        <div>{vote.voteTitle}</div>
      </div>
      <div className="p-2 flex justify-around items-center h-full">
        {vote.voteItemList.map((item, itemIndex) => (
          <VoteCardItem 
            key={item.voteItemId}
            item={item}
            categoryId={vote.categoryId}
            voteId={vote.voteId}
            path="/VotePage"
            onClick={() => handleClick(itemIndex)}
            isSelect={isSelect}
          />
        ))}
              
      <div>
        <button>상세보기</button>
        {/* "liked": true 여부에 따라 좋아요 변경 */}
        <button onClick={handleLike}>{(isVoteLike) ? "좋아요 취소" : "좋아요"}{voteLikesCount}</button>
      </div>
      </div>

    </div>
  );
}