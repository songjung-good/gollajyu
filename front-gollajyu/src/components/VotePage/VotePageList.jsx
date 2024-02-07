import React from 'react';
import VoteCard from './VoteCard';

const VotePageList = ({ sortType, searchTerm }) => {
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
      id: 3,
      options: [
        { id: 'a1', image: 'image1.png', title: '옵션 1' },
        { id: 'a3', image: 'image3.png', title: '옵션 3' },
      ],
    },
    // 추가 투표 데이터
    // ...
  ];

  // 검색어에 따라 투표를 필터링
  const filteredVotes = votes.filter(vote =>
    vote.options.some(option => option.title.includes(searchTerm))
  );

  // 정렬 로직
  let sortedVotes = filteredVotes;
  if (sortType === 'latest') {
    // 최신순으로 정렬
    sortedVotes = filteredVotes.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sortType === 'popular') {
    // 인기순으로 정렬
    sortedVotes = filteredVotes.sort((a, b) => b.likes - a.likes);
  }

  return (
    <div>
      {/* {sortedVotes.map((vote) => (
        <VoteCard
          key={vote.id}
          options={vote.options} />
      ))} */}
    </div>
  );
};

export default VotePageList;
