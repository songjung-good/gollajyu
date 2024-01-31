import React, { useState } from "react";
import VoteCardItem from "./vote/VoteCardItem";
import NowGollajyuImage from "/assets/images/vote-button/now_gollajyu_img.png";

export default function VoteCard() {
  const [clicked, setClicked] = useState([false, false, false, false]);

  const handleClick = (index) => {
    const newClicked = clicked.map((item, i) => (i === index ? !item : item));
    setClicked(newClicked);
  };

  return (
    <div
      className="mx-auto max-w-screen-lg bg-white"
      style={{ height: "500px" }}
    >
      <div className="flex justify-around items-center h-full">
        {Array(4)
          .fill(null)
          .map((_, index) => (
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
