import React from "react";
import SwipeVote from "../components/SwipeVote"
import MainVoteList from "../components/MainVoteList"
import MainWord from "../components/MainWord";

const MainPage = () => {
  return (
    <div>
      <div className="bg-gradient-to-tl from-blue-400 to-red-400">
        <MainWord />
        <SwipeVote />
      </div>
      <MainVoteList />
    </div>
  );
};

export default MainPage;
