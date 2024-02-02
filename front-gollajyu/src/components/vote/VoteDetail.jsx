import React, { useState } from 'react';
import VoteCardItem from './VoteCardItem';
import VoteDetailHeader from './VoteDetailHeader';
import VoteDetailReselt from './VoteDetailReselt';
import VoteDetailChat from './VoteDetailChat';

// 임시 데이터
const voteDetail = {
  author: 'Emily Jones',
  createdAt: '2024-01-30',
  participants: 123,
  likes: 456,
  title: '가을 시즌에 어울리는 옷은?',
  category: '신발',
  options: [
    {
      image: 'https://example.com/image1.jpg',
      text: '옵션1'
    },
    {
      image: 'https://example.com/image2.jpg',
      text: '옵션2'
    },
    {
      image: 'https://example.com/image3.jpg',
      text: '옵션3'
    },
    {
      image: 'https://example.com/image4.jpg',
      text: '옵션4'
    },
  ],
  hasVoted: true  // 사용자가 투표에 참여했는지 여부
};

// 투표 상세페이지의 투표 정보 보내는 내용(서버 to item)
const VoteDetail = () => {
  const [clicked, setClicked] = useState([false, false, false, false]);

  const handleClick = (index) => {
    const newClicked = clicked.map((item, i) => (i === index ? !item : item));
    setClicked(newClicked);
  };
  return (
    <div className="bg-white shadow-md rounded-md max-w-5xl mx-auto">
      <VoteDetailHeader {...voteDetail} />
      <div className="p-2 flex justify-around items-center h-full" >
        {Array(voteDetail.options.length).fill(null).map((_, index) => (
          <VoteCardItem 
            key={index}
            src={`1`}
            product={`Title ${index + 1}`}
            detail={`detail ${index + 1}`}
            category={voteDetail.category}
            path="/VotePage"
            clicked={clicked[index]}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      {voteDetail.hasVoted && (
        <>
        <VoteDetailReselt />
        <VoteDetailChat />
      </>
      )}
    </div>
  );
};

export default VoteDetail;
