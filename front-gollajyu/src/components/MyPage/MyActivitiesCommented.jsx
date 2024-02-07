import React from "react";
import MyActivitiesCommentItem from "./MyActivitiesCommentItem";

const MyActivitiesCommented = ({ props }) => {
  // console.log("작성한 댓글:", props);
  return (
    <>
      {props.length >= 1 ? (
        props.map((item, index) => {
          return <MyActivitiesCommentItem key={index} commentItem={item} />;
        })
      ) : (
        <p>좋아요한 투표가 없습니다</p>
      )}
    </>
  );
};

export default MyActivitiesCommented;
