import React from "react";
import MyActivitiesVoteItem from "./MyActivitiesVoteItem";

const MyActivitiesCreated = (props) => {
  console.log("작성한 투표:", props);
  return (
    <>
      <MyActivitiesVoteItem />
      <MyActivitiesVoteItem />
      <MyActivitiesVoteItem />
      <MyActivitiesVoteItem />
    </>
  );
};

export default MyActivitiesCreated;
