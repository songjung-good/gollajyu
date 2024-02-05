// VoteDetailChat.jsx
import React, { useState, useEffect } from 'react'

// import하는 컴포넌트
import ChatForm from './ChatForm';
import ChatList from './ChatList';

const VoteDetailChat = () => {
  // state 설정
  const [list, setList] = useState([]);

  // componentDidMount와 같은 기능을 하는 useEffect
  useEffect(() => {
    setList([
      {userid: 'qwerty1', content:'hello111111', date:'2022-04-24'},
      {userid: 'qwerty2', content:'hello222222', date:'2022-04-24'},
      {userid: 'qwerty3', content:'hello333333', date:'2022-04-24'}
    ]);
  }, []); // 빈 배열을 넣어주면 컴포넌트가 mount될 때 한 번만 실행됩니다.

  return (
    <ul className='chat'>
      <ChatForm />
      <ChatList list={list} />
    </ul>
  );
}

export default VoteDetailChat;


// 만약 props를 안나눠도 된다면.
// const Chat = (props) => {
//   return (
//      <ul className = 'Chat'>
//         <CommentForm {...props} />
//         <CommentList {...props} />
//      </ul>
//   )
// }
