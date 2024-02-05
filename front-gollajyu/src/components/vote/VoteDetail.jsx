import React, { useState, useEffect } from 'react';
import VoteCardItem from './VoteCardItem';
import VoteDetailHeader from './VoteDetailHeader';
import VoteDetailReselt from './VoteDetailReselt';
import VoteDetailChat from './VoteDetailChat';

// const VoteDetail = ({ voteId }) => {
//   const [voteDetail, setVoteDetail] = useState(null);

//   useEffect(() => {
//     // 여기서 voteId를 이용해 서버에 투표 정보를 요청하는 로직을 작성합니다.
//     // 요청이 성공하면, setVoteDetail을 이용해 상태를 업데이트합니다.
//   }, [voteId]);

//   // 나머지 코드...
// };

// 임시 데이터
const voteDetail = {
  author: 'Emily Jones',
  createdAt: '2024-01-30',
  participants: 123,
  likes: 456,
  title: '가을 시즌에 어울리는 옷은?',
  category: '3',
  items: [
    {
      image: 'https://example.com/image1.jpg',
      text: '옵션1',
      tagResults: [120, 200, 150, 130],
    },
    {
      image: 'https://example.com/image2.jpg',
      text: '옵션2',
      tagResults: [120, 200, 150, 130],
    },
    {
      image: 'https://example.com/image3.jpg',
      text: '옵션3',
      tagResults: [120, 200, 150, 130],
    },
    {
      image: 'https://example.com/image4.jpg',
      text: '옵션4',
      tagResults: [120, 200, 150, 130],// 각 투표 옵션에 몇 표가 들어갔는지
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
        {Array(voteDetail.items.length).fill(null).map((_, index) => (
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
        <VoteDetailReselt 
          voteResults={voteDetail.items}
        />
        <VoteDetailChat />
      </>
      )}
    </div>
  );
};

export default VoteDetail;