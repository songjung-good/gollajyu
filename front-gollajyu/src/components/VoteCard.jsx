import React, { useState } from 'react';
import VoteCardItem from './VoteCardItem';
import NowGollajyuImage from "../assets/images/now_gollajyu_img.png";

export default function VoteCard() {
  const [clicked, setClicked] = useState([false, false, false, false]);

  const handleClick = (index) => {
    setClicked(clicked.map((value, i) => i === index ? true : value));
  };

  return (
    <div className="w-1000 h-500 flex justify-around items-center bg-white">
      {Array(4).fill(null).map((_, index) => (
        <VoteCardItem 
          key={index}
          src={NowGollajyuImage}
          title={`Title ${index + 1}`}
          path="/details"
          clicked={clicked[index]}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}
