// ChatList.jsx
import React from 'react';

const ChatList = ({ list, choiced2, onLike }) => {
  const colorMap = [
    'bg-green-300',
    'bg-yellow-300',
    'bg-blue-300',
    'bg-orange-300'
  ];

  const items = () => list.map((v, k) => (
    <div key={k} className={`flex ${v.voteItemId === choiced2 ? 'justify-end' : ''}`}>
      <div className={`${colorMap[v.voteItemId%4]} text-black p-2 rounded-lg max-w-xs`}>
        <small>{v.userid} (선택지: {v.voteItemId%4})</small>
        <p className='chat-content'>{v.commentDesc}</p>
        <button className='fontsize-xs' disabled={v.liked ? true : false} onClick={() => onLike(k)}>좋아요: {v.commentLikesCnt}👍</button>
      </div>
    </div>
  ));

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="flex flex-col space-y-2">
        {items()}
      </div>
    </div>
  );
};

export default ChatList;
