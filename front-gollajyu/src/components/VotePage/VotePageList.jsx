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
        key={vote.voteId}  // Use a different key for VoteCard
        vote={vote} />
      ))}
    </div>
  );
};

export default VotePageList;
