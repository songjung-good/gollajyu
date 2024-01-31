import React from "react";
import VotePageList from "../components/vote/VotePageList";
import VoteControls from "../components/vote/VoteControls";

const VotePage = () => {
  return (
    <div>
      <VoteControls />
      <VotePageList />
    </div>
  );
};

export default VotePage;
