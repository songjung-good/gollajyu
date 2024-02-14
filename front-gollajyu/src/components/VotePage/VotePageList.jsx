import React, { useState, useEffect } from 'react';
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
      ))}
    </div>
  );
};

export default VotePageList;
