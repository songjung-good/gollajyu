// VoteDetailChat.jsx
import React, { useState, useEffect } from 'react'

// import하는 컴포넌트
import ChatForm from './ChatForm';
import ChatList from './ChatList';

const VoteDetailChat = () => {
  // state 설정
  const [list, setList] = useState([]);
  const [likes, setLikes] = useState({}); // 좋아요를 누른 계정 추적 상태
  const [userid, setUserid] = useState('새로운댓글'); // 사용자 아이디
  const [choiced, setChoiced] = useState('002'); // 사용자 선택지

  // componentDidMount와 같은 기능을 하는 useEffect 
  // 기존의 댓글 데이터
  // userid:아이디, content:대화 내용, date: 작성일자, liked: 좋아요 수, choiced: 선택지
  useEffect(() => {
    setList([
      {userid: '검은목의진주?1', content:'그거 왜 삼?', date:'2022-04-24', liked: '1', choiced: '002'},
      {userid: '알달순2', content:'언제까지 진행해야하지?', date:'2022-04-24', liked: '2', choiced: '003'},
      {userid: '가로수3', content:'너무너무 잠와요...', date:'2022-04-24', liked: '5', choiced: '001'},
    ]);
  }, []); // 빈 배열을 넣어주면 컴포넌트가 mount될 때 한 번만 실행됩니다.

    // 새로운 댓글 추가
    const addList = (content) => {
      setList([...list, {userid, content, date:'2022-04-24', liked: '0', choiced}]);
    }
    // 좋아요 기능
    const handleLike = (index) => {
      const newList = [...list];
      // 이미 좋아요를 눌렀다면 return
      if (likes[newList[index].userid]) return;
      newList[index].liked = String(Number(newList[index].liked) + 1);
      setList(newList);
      // 좋아요를 누른 계정 기록
      setLikes({ ...likes, [newList[index].userid]: true });
    }
    
    return (
      <div>
        {/* 기존 댓글과 나의 선택을 전달 */}
        <ChatList list={list} choiced={choiced} onLike={handleLike} />
        {/* 새 댓글을 채팅 입력창과 */}
        <ChatForm onSubmit={addList} userid={userid} choiced={choiced} />
    </div>
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
