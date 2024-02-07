import React from "react";
import MyActivitiesCommentItem from "./MyActivitiesCommentItem";

const MyActivitiesCommented = (props) => {
  console.log("작성한 댓글:", props);
  return (
    <>
      <MyActivitiesCommentItem />
      <MyActivitiesCommentItem />
      <MyActivitiesCommentItem />
      <MyActivitiesCommentItem />
    </>
  );
};

export default MyActivitiesCommented;
