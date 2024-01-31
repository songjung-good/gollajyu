import React from 'react';
import VoteCard from './VoteCard';

const VotePageList = () => {
  // 임시 데이터
  const votes = [
    {
      id: 1,
      options: [
        { id: 'a1', image: 'image1.png', title: '옵션 1' },
        { id: 'a2', image: 'image2.png', title: '옵션 2' },
        { id: 'a3', image: 'image3.png', title: '옵션 3' },
      ],
    },
    {
        id: 2,
        options: [
          { id: 'a1', image: 'image1.png', title: '옵션 1' },
          { id: 'a2', image: 'image2.png', title: '옵션 2' },
          { id: 'a3', image: 'image3.png', title: '옵션 3' },
          { id: 'a3', image: 'image3.png', title: '옵션 3' },
        ],
      },
    {
      id: 1,
      options: [
        { id: 'a1', image: 'image1.png', title: '옵션 1' },
        { id: 'a3', image: 'image3.png', title: '옵션 3' },
      ],
    },
    // 추가 투표 데이터
    // ...
  ];

  return (
    <div>
      {votes.map((vote) => (
        <VoteCard
          key={vote.id}
          options={vote.options} />
      ))}
    </div>
  );
};

export default VotePageList;
