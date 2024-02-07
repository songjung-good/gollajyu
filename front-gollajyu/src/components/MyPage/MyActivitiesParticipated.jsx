import React from "react";
import MyActivitiesVoteItem from "./MyActivitiesVoteItem";

const MyActivitiesParticipated = ({ props }) => {
  // console.log("참여한 투표:", props);
  return (
    <>
      {props.length >= 1 ? (
        props.map((item, index) => {
          return <MyActivitiesVoteItem key={index} voteItem={item} />;
        })
      ) : (
        <p>참여한 투표가 없습니다</p>
      )}
    </>
  );
};

export default MyActivitiesParticipated;
