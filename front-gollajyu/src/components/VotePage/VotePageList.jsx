// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from 'react';

// 투표 카드 컴포넌트
import VoteCard from './VoteCard';


const VotePageList = ({ voteList }) => {
  useEffect(() => {
    console.log("VoteList has changed:", voteList);
    setVotes(voteList)
  }, [voteList]);
  const [votes, setVotes] = useState(voteList);

  return (
    <div>
      {votes.map((vote) => (
        <VoteCard
        key={vote.voteId}  // Use a different key for VoteCard
        vote={vote} />
      ))}
    </div>
  );
};

export default VotePageList;
