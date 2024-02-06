// ChatList.jsx
import React from 'react';

const ChatList = ({ list, choiced, onLike }) => {
  const colorMap = {
    '001': 'bg-yellow-300',
    '002': 'bg-green-300',
    '003': 'bg-blue-300',
    '004': 'bg-orange-300'
  };

  const items = () => list.map((v, k) => (
    <div key={k} className={`flex ${v.choiced === choiced ? 'justify-end' : ''}`}>
      <div className={`${colorMap[v.choiced]} text-black p-2 rounded-lg max-w-xs`}>
        <small>{v.userid} (좋아요: {v.liked}, 선택지: {v.choiced})</small>
        <p className='chat-content'>{v.content}</p>
        <button onClick={() => onLike(k)}>👍</button>
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
}

export default ChatList;
