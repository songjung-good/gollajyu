import React from 'react';

const VoteDetailHeader = (props) => {
  return (
    <>
      <div className="w-auto h-auto flex flex-col pt-4 pb-12 bg-white overflow-hidden max-w-xxl mx-auto">
        <div className="flex justify-between items-center">
        
          <div className="flex items-center">
            <div className="p-auto">
              <span className="fontsize-sm">({props.memberNickname})</span>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="flex items-center">
              <span className="text-red-500 fontsize-sm">❤</span>
              <span className="text-red-500 fontsize-sm ml-2">{props.likesCnt}</span>
            </div>
            
            <div className="flex items-center ml-4 mr-2">
              <span className="fontsize-sm ml-2">참여자 수 : {props.totalChoiceCnt}</span>
            </div>

            {/* <button
              className="p-1 w-auto h-auto rounded-full bg-red-200 flex items-center justify-center"
              onClick={() => props.onClose()}
            >
              X
            </button> */}
          </div>

        </div>

        <span className="fontsize-md pt-4">"{props.title}"</span>

      </div>
    </>
  );
};

export default VoteDetailHeader;