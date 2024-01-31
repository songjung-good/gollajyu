import React, { useState } from 'react';
import VoteCardItem from './VoteCardItem';

export default function VoteCard() {
  const [clicked, setClicked] = useState([false, false, false, false]);

  const handleClick = (index) => {
    const newClicked = clicked.map((item, i) => (i === index ? !item : item));
    setClicked(newClicked);
  };

  // 여기서 정보를 받아온다
  return (
    <div className="mx-auto my-10 max-w-screen-xl py-2 px-2 bg-white rounded-xl" style={{ height: '450px'}}>
      <div className="flex justify-between items-center h-full" >
        {Array(4).fill(null).map((_, index) => (
          <VoteCardItem 
            key={index}
            src={`이미지 주소`}
            title={`Title ${index + 1}`}
            detail={`detail ${index + 1}`}
            category={`a`}
            path="/VotePage"
            clicked={clicked[index]}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
}