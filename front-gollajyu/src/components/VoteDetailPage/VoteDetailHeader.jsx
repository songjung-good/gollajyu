import React from 'react';

const VoteDetailHeader = (props) => {
  return (
    <div className="w-auto h-auto relative bg-white rounded-md overflow-hidden max-w-xxl mx-auto mt-16">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
        <div className="w-auto h-auto rounded-full border border-black mr-4 flex items-center justify-center">
          <span className="mx-2 text-base font-normal">
            {props.category}
          </span>
        </div>
          <div className="p-4">
            <span className="text-xl font-normal">{props.voteNickname} | {props.title}</span>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <div className="flex items-center font-color-red">
            ♥<span className="text-base font-normal ml-2">{props.likesCnt}</span>
          </div>
          <div className="flex items-center ml-4 mr-2">
            ρ<span className="text-base font-normal ml-2">{props.totalChoiceCnt}</span>
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