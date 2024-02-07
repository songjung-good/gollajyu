import React from "react";
import MyActivitiesVoteItem from "./MyActivitiesVoteItem";

const MyActivitiesParticipated = (props) => {
  console.log("참여한 투표:", props);
  return (
    <>
      <MyActivitiesVoteItem />
      <MyActivitiesVoteItem />
      <MyActivitiesVoteItem />
      <MyActivitiesVoteItem />
    </>
  );
};

export default MyActivitiesParticipated;
