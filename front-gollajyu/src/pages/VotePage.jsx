import React from "react";
import VotePageList from "../components/vote/VotePageList";
import VotePageHeader from "../components/vote/VotePageHeader";

const VotePage = () => {
  return (
    <div>
      <VotePageHeader />
      <VotePageList />
    </div>
  );
};

export default VotePage;
