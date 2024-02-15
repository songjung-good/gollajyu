// 리액트
import React from "react";

// 내 투표 컴포넌트
import MyActivitiesVoteItem from "./MyActivitiesVoteItem";


const MyActivitiesLiked = ({ props, transferVoteId }) => {
  // console.log("좋아요한 투표:", props);

  const openVoteDetailModal = (voteId) => {
    transferVoteId(voteId);
  };

  return (
    <>
      {props.length >= 1 ? (
        props.map((item, index) => {
          return (
            <div key={index} onClick={() => openVoteDetailModal(item.voteId)}>
            <MyActivitiesVoteItem voteItem={item} />
          </div>
          );
        })
      ) : (
        <p className="fontsize-sm">좋아요한 투표가 없습니다</p>
      )}
    </>
  );
};

export default MyActivitiesLiked;
