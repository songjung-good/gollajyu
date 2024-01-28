import React from "react";
import SwipeVote from "../components/SwipeVote"
import PostsGrid from "../components/MainVoteList"


const MainPage = () => {
  return (
    <div>
      <SwipeVote />
      <PostsGrid />
    </div>
  );
};

export default MainPage;
