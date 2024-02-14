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
        // (vote.chosenItemId === 0) ?
        // (
        <VoteCard
        key={`${vote.voteId}-card`}
        vote={vote}
        liked={vote.liked}
        likesCnt={vote.likesCnt}
        chosenItemId={vote.chosenItemId}
        voteItemList={vote.voteItemList}
        voteId={vote.voteId}
        voteTitle={vote.voteTitle}
        categoryName={vote.categoryName}
        categoryId={vote.categoryId}
        />
        //  ) : null
      ))}
    </div>
  );
};

export default VotePageList;
