import React, { useState } from 'react';
import VoteCardItem from './VoteCardItem';

export default function VoteCard(props) {
  const [clicked, setClicked] = useState([false, false, false, false]);

  const handleClick = (index) => {
    const newClicked = clicked.map((item, i) => (i === index ? !item : item));
    setClicked(newClicked);
  };

  // 여기서 정보를 보내준다 (서버에서 받아온 데이터를 item으로 넘긴다.)
  return (
    <div className="mx-auto my-10 max-w-5xl py-2 px-2 bg-white rounded-xl" style={{ height: '450px'}}>
      <div className=" ">
        카테고리
      </div>
      <div className="p-2 flex justify-around items-center h-full" >
        {Array(props.options.length).fill(null).map((_, index) => (
          <VoteCardItem 
            key={index}
            src={props.options.image}
            product={`Title ${index + 1}`}
            detail={`detail ${index + 1}`}
            category={`1`}
            path="/VotePage"
            clicked={clicked[index]}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
} 