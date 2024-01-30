import React, { useState } from 'react';
import VoteCardItem from './vote/VoteCardItem';

export default function SwipeCard() {
  const [clicked, setClicked] = useState([false, false, false, false]);

  const handleClick = (index) => {
    const newClicked = clicked.map((item, i) => (i === index ? !item : item));
    setClicked(newClicked);
  };

  return (
    // w-auto가 안먹히는걸 보니 고정인거 같다
    <div className="mx-auto max-w-auto bg-white rounded-xl" style={{ height: '500px' }}>
      <div className="flex justify-around items-center h-full">
        {Array(4).fill(null).map((_, index) => (
          <VoteCardItem 
            key={index}
            src={`이미지 주소`}
            title={`Title ${index + 1}`}
            detail={`detail ${index + 1}`}
            path="/VotePage"
            clicked={clicked[index]}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
