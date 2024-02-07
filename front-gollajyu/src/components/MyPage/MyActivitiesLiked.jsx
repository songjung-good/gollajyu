import React from "react";
import MyActivitiesVoteItem from "./MyActivitiesVoteItem";

const MyActivitiesLiked = (props) => {
  console.log("좋아요한 투표:", props);
  return (
    <>
      <MyActivitiesVoteItem />
      <MyActivitiesVoteItem />
      <MyActivitiesVoteItem />
      <MyActivitiesVoteItem />
    </>
  );
};

export default MyActivitiesLiked;
