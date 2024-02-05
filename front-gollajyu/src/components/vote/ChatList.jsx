import React from 'react';

const ChatList = ({ list }) => {
  const items = () => list.map((v, k) => (
    <ul className='chat-row' key={k}>
      <li className='chat-id'>{v.userid}</li>
      <li className='chat-content'>{v.content}</li>
      <li className='chat-date'>{v.date}</li>
    </ul>
  ));

  return (
    <li>
      {items()}
    </li>
  );
}

export default ChatList;
