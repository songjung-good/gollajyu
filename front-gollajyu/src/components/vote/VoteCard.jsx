import React, { useState } from 'react';
import VoteCardItem from './VoteCardItem';

// const VoteDetail = ({ voteId }) => {
//   const [voteDetail, setVoteDetail] = useState(null);

//   useEffect(() => {
//     // 여기서 voteId를 이용해 서버에 투표 정보를 요청하는 로직을 작성합니다.
//     // 요청이 성공하면, setVoteDetail을 이용해 상태를 업데이트합니다.
//   }, [voteId]);

//   // 나머지 코드...
// };

// 임시 데이터
const voteData = [
  {
  id: 1,
  author: 'Emily Jones',
  createdAt: '2024-01-30',
  participants: 123,
  likes: 456,
  title: '가을 시즌에 어울리는 옷은?',
  category: '3',
  items: [
    {
      image: 'https://example.com/image1.jpg',
      text: '옵션1',
      tagResults: [120, 200, 150, 130],
    },
    {
      image: 'https://example.com/image2.jpg',
      text: '옵션2',
      tagResults: [120, 200, 150, 130],
    },
    {
      image: 'https://example.com/image3.jpg',
      text: '옵션3',
      tagResults: [120, 200, 150, 130],
    },
    {
      image: 'https://example.com/image4.jpg',
      text: '옵션4',
      tagResults: [120, 200, 150, 130],// 각 투표 옵션에 몇 표가 들어갔는지
    },
  ],
  hasVoted: true  // 사용자가 투표에 참여했는지 여부
},
{
  id: 2,
  author: 'Emily Jones',
  createdAt: '2024-01-30',
  participants: 123,
  likes: 456,
  title: '가을 시즌에 어울리는 옷은?',
  category: '2',
  items: [
    {
      image: 'https://example.com/image1.jpg',
      text: '옵션1',
      tagResults: [120, 200, 150, 130],
    },
    {
      image: 'https://example.com/image4.jpg',
      text: '옵션4',
      tagResults: [120, 200, 150, 130],// 각 투표 옵션에 몇 표가 들어갔는지
    },
  ],
  hasVoted: true  // 사용자가 투표에 참여했는지 여부
},
{
  id: 3,
  author: 'Emily Jones',
  createdAt: '2024-01-30',
  participants: 123,
  likes: 456,
  title: '가을 시즌에 어울리는 옷은?',
  category: '2',
  items: [
    {
      image: 'https://example.com/image1.jpg',
      text: '옵션1',
      tagResults: [120, 200, 150, 130],
    },
    {
      image: 'https://example.com/image4.jpg',
      text: '옵션4',
      tagResults: [120, 200, 150, 130],// 각 투표 옵션에 몇 표가 들어갔는지
    },
    {
      image: 'https://example.com/image4.jpg',
      text: '옵션3',
      tagResults: [120, 200, 150, 130],// 각 투표 옵션에 몇 표가 들어갔는지
    },
  ],
  hasVoted: true  // 사용자가 투표에 참여했는지 여부
},
];



export default function VoteCard(props) {
  const [clicked, setClicked] = useState([false, false, false, false]);

  const handleClick = (index, selection) => {
    const newClicked = clicked.map((item, i) => (i === index ? !item : item));
    setClicked(newClicked);
    // 클릭된 선택지를 콘솔에 출력
    // console.log(`선택지 ${index + 1}: ${selection}`);
  };

  // 여기서 정보를 보내준다 (서버에서 받아온 데이터를 item으로 넘긴다.)
  return (
    <div className="mx-auto mt-2 mb-10 max-w-5xl px-2 bg-white rounded-xl" style={{ height: '450px'}}>
      <div className=" ">
        카테고리
      </div>
      <div className="p-2 flex justify-around items-center h-full" >
        {Array(props.options.length).fill(null).map((_, index) => (
          <VoteCardItem 
            key={index}
            src={props.image}
            product={`Title ${index + 1}`}
            detail={`detail ${index + 1}`}
            category={props.category}
            path="/VotePage"
            clicked={clicked[index]}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
} 