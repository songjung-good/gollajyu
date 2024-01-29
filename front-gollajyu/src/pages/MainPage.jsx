import React from "react";
import SwipeVote from "../components/SwipeVote"
import PostsGrid from "../components/MainVoteList"


const MainPage = () => {
  return (
    <div>
      <h1>This is the Main Page</h1>
      <p>이 곳은 메인 페이지 입니다.</p>
      <SwipeVote />
      <PostsGrid />
    </div>
  );
};

export default MainPage;
