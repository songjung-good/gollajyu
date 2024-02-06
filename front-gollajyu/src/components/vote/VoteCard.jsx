import React, { useState } from 'react';
import VoteCardItem from './VoteCardItem';

export default function VoteCard(props) {
  const [isSelect, setIsSelect] = useState(true);
  const { vote } = props;

  const handleClick = (index, selection) => {
    setIsSelect(false)
    console.log(`선택지 ${index + 1}: ${selection}`);
  };

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
      </div>
      
      <div>
        <button>상세보기</button>
        <button>좋아요{vote.likesCnt}</button>
      </div>
    </div>
  );
} 