// VoteDetailChat.jsx
import React, { useState, useEffect } from 'react'
import ChatForm from './ChatForm';
import ChatList from './ChatList';
import axios from "axios";
import API_URL from "../../stores/apiURL";

const VoteDetailChat = ({commentList, chosenItem, userId, voteId}) => {
  // state 설정
  const [list, setList] = useState(commentList);
  const [likes, setLikes] = useState(commentList.liked); // 좋아요를 누른 계정 추적 상태
  const [userid, setUserid] = useState(userId); // 사용자 아이디
  const [choiced, setChoiced] = useState(chosenItem); // 사용자 선택지
  
  // const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  // const [totalPage, setTotalPage] = useState(1); // 총 페이지 수

  // 기존의 댓글 데이터
  // userid:아이디, content:대화 내용, date: 작성일자, liked: 좋아요 수, choiced: 선택지
  // useEffect(() => {
  // 페이지네이션 기능
  //   const fetchData = async () => {
  //     const response = await fetch(`/api/comments?page=${currentPage}&limit=20`);
  //     const data = await response.json();
  //     setList(data.comments);
  //     setTotalPage(Math.ceil(data.total / 20));
  //   };
  //   fetchData();
  // }, [currentPage]);

  //   setList(
  //     [
  //       {userid: '검은목의진주?1', content:'그거 왜 삼?', date:'2022-04-24', liked: '1', choiced: 2},
  //       {userid: '알달순2', content:'언제까지 진행해야하지?', date:'2022-04-24', liked: '2', choiced: 3},
  //       {userid: '가로수3', content:'너무너무 잠와요...', date:'2022-04-24', liked: '5', choiced: 1},
  //     ]
  //   );
  // }, []); // 빈 배열을 넣어주면 컴포넌트가 mount될 때 한 번만 실행됩니다.

    // 새로운 댓글 추가6
    const addList = (content) => {
      setList([...list, 
        {userid, content, date:'2022-04-24', liked: '0', choiced}
      ]);
    }
    // 좋아요 기능
    const handleLike = (index) => {
      const newList = [...list];
      console.log(list);

      // 이미 좋아요를 눌렀다면 return
      if (newList.liked === true) {
        return;
      }

      // 좋아요 수 증가
      newList[index].liked = String(Number(newList[index].liked) + 1);
      setList(newList);

      // 좋아요를 누른 계정 기록
      setLikes({ ...likes, [newList[index].userid]: true });
    console.log(newList)
    // 서버에 좋아요 증가 정보 POST 요청s
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${API_URL}/votes/details/comments/likes`,
          {
            memberId: userId,
            commentId: newList[index].commentId,
          }
        );

        if (!response.ok) {
          // 에러 처리
          console.error(response.statusText);
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

      // 좋아요 버튼 비활성화
      const likeButton = document.querySelectorAll('.fontsize-xs')[index];
      likeButton.disabled = true;
    };

    return (
      <div>
        {/* 기존 댓글과 나의 선택을 전달 */}
        {/* list: 채팅 내역 / choiced: 내가 선택한 item / onLike: 좋아요 선택한 것 */}
        <ChatList 
          choiced2={choiced} 
          onLike={handleLike}
          list={list} 
        />
        {/* 새 댓글을 채팅 입력창과 */}
        <ChatForm 
          onSubmit={addList} 
          userid={userid}
          choiced={choiced}
          voteId={voteId} 
        />
        {/* 페이지네이션 UI 추가 */}
        {/* <Pagination currentPage={currentPage} totalPage={totalPage} onChangePage={setCurrentPage} /> */}
      </div>
    );
  }

export default VoteDetailChat;