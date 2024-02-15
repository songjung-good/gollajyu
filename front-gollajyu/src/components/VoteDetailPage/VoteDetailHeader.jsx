import React from 'react';

const VoteDetailHeader = (props) => {
  return (
    <div className="w-auto h-auto relative bg-white overflow-hidden max-w-xxl mx-auto">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <div className="p-auto">
            <span className="text-xl font-normal">({props.memberNickname})</span>
          </div>
          <div className="p-auto">
            <span className="text-xl font-normal">"{props.title}"</span>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <div className="flex items-center font-color-red">
            ♡<span className="text-base font-normal ml-2">{props.likesCnt}</span>
          </div>
          <div className="flex items-center ml-4 mr-2">
            <span className="text-base font-normal ml-2">참여자 수 : {props.totalChoiceCnt}</span>
          </div>
          <button
            className="p-1 w-auto h-auto rounded-full bg-red-200 flex items-center justify-center"
            onClick={() => props.onClose()}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoteDetailHeader;