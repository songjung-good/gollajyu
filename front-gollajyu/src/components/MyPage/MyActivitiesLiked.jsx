// 리액트
import React from "react";

// 내 투표 컴포넌트
import MyActivitiesVoteItem from "./MyActivitiesVoteItem";


const MyActivitiesLiked = ({ props }) => {
  // console.log("좋아요한 투표:", props);
  return (
    <>
      {props.length >= 1 ? (
        props.map((item, index) => {
          return <MyActivitiesVoteItem key={index} voteItem={item} />;
        })
      ) : (
        <p className="fontsize-sm">좋아요한 투표가 없습니다</p>
      )}
    </>
  );
};

export default MyActivitiesLiked;
