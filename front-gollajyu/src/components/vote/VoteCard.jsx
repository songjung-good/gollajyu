import React, { useState } from 'react';
import VoteCardItem from './VoteCardItem';
// import NowGollajyuImage from "/assets/images/vote-button/now_gollajyu_img.png";

export default function VoteCard() {
  const [clicked, setClicked] = useState([false, false, false, false]);

  const NowGollajyuImage = "1"

  const handleClick = (index) => {
    const newClicked = clicked.map((item, i) => (i === index ? !item : item));
    setClicked(newClicked);
  };

  // 아래의 클래스 'px-4'는 좌우 패딩을 설정합니다. 작은 값으로 조정하여 좌우 빈 공간을 줄입니다.
  return (
    <div className="mx-auto my-4 max-w-screen-md px-4 bg-white" style={{ height: '500px' }}>
      <div className="flex justify-between items-center h-full">
        {Array(4).fill(null).map((_, index) => (
          <VoteCardItem 
            key={index}
            src={NowGollajyuImage}
            title={`Title ${index + 1}`}
            path="/VotePage"
            clicked={clicked[index]}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
}