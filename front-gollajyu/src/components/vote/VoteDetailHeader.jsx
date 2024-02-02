import React from 'react';

// 투표모아쥬의 정렬 및 검색 기능의 공간입니다~
const VoteDetailHeader = ( props ) => {
  return (
    <div className="w-auto h-auto relative bg-white rounded-md overflow-hidden max-w-xxl mx-auto mt-16">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <div className="w-auto h-auto bg-gray-200 rounded-lg border border-black mr-4 flex items-center justify-center">
            <span className="text-base font-normal">{props.category}</span>
          </div>
          <div className="flex items-center font-color-red">
            ♥<span className="text-base font-normal ml-2">{props.likes}</span>
          </div>
          <div className="flex items-center ml-4">
            ρ<span className="text-base font-normal ml-2">{props.participants}</span>
          </div>
        </div>
        <button className="w-auto h-auto bg-red-200 rounded-full flex items-center justify-center">X</button>
      </div>
      <div className="p-4">
        <span className="text-xl font-normal">{props.author} | {props.createdAt}</span>
      </div>
    </div>
  );
};

export default VoteDetailHeader;
``
