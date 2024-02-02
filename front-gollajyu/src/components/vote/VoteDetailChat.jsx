import React, { useState } from 'react';

// 임시 채팅 데이터
const chatData = [
  { user: 'Emily', color: 'pink', message: '저는 옵션1을 선택했습니다. 이유는...', time: '10:00 AM' },
  { user: 'John', color: 'green', message: '저는 옵션2를 선택했습니다. 이유는...', time: '10:05 AM' },
  { user: 'Emily', color: 'pink', message: '그렇군요. 저는 옵션1이 더 좋다고 생각하는데...', time: '10:10 AM' },
  // 추가 채팅 데이터
  // ...
];

// const VoteDetailChat = () => {
//   const [comment, setComment] = useState('');

//   const handleInput = (e) => {
//     setComment(e.target.value);
//   };

//   const handleCommentSubmit = () => {
//     // 댓글 전송 로직
//   };

//   return (
//     <div className="p-4">
//       <div className="border border-gray-200 rounded-lg p-4 mb-4">
//         {chatData.map((chat, index) => (
//           <div key={index} className={`flex flex-col ${chat.color === 'pink' ? 'items-end' : ''}`}>
//             <div className={`text-sm rounded-lg p-2 my-1 text-white ${chat.color === 'pink' ? 'bg-pink-500' : 'bg-green-500'}`}>
//               <p>{chat.message}</p>
//               <p className="text-xs text-white">{chat.time}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="border border-gray-200 rounded-lg p-2 flex items-center">
//         <input
//           type="text"
//           className="flex-grow mr-2 p-2"
//           placeholder="댓글을 입력하세요..."
//           value={comment}
//           onChange={handleInput}
//         />
//         <button
//           className="border border-gray-200 rounded-lg p-2"
//           onClick={handleCommentSubmit}
//         >
//           전송
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VoteDetailChat;


const VoteDetailChat = ({ addList }) => {
    const [value, setValue] = useState('');

    const handleChange = e => {
        setValue(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const obj = {userid: 'jenny', content: value, date: '2022-04-25', updateFlag: true};
        addList(obj);
        setValue('');
    };

    return(
        <li className='comment-form'>
            <form onSubmit={handleSubmit}>
                <span className='ps_box'>
                    <input 
                        type="text" 
                        className='int'
                        placeholder='댓글을 입력해 주세요.'
                        onChange={handleChange}
                        value={value}
                    />
                </span>
                <input type="submit" className='btn' value='등록'/>
            </form>
        </li>
    )
};

export default VoteDetailChat;
