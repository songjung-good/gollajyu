import React, { useState } from "react";

// 임시 데이터를 상위 컴포넌트로부터 받아오는 props로 변경
const VoteDetailResult = ({ voteResults, totalChoiceCnt }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const colorMap = [
    "bg-[#FF595E]",
    "bg-[#FFCA3A]",
    "bg-[#8AC926]",
    "bg-[#1982C4]",
  ];
  const handleClick = (index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = !newSelectedOptions[index];
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <div
      className="mx-auto py-4 flex justify-around items-center gap-2"
      style={{ display: "flex" }}
    >
      {voteResults.map((result, index) => (
        <button onClick={() => handleClick(index)}>
          <div className={`${colorMap[result.voteItemId%4]} rounded-lg w-auto m-auto p-1 min-w-[200px]`} key={index}>
            {/* <h2>선택비율 : {Math.round((result.count / totalChoiceCnt) * 100)}%</h2> */}
            <p className="fontsize-sm">태그 통계</p>
            {selectedOptions[index] && (
              <div className="py-4 bg-white">
                {result.tagCountList.map((tag) => (
                  <p className="fontsize-xs pt-1" key={tag.tagName}>
                    {tag.tagName}:{" "}
                    {result.count === 0
                      ? "0 %"
                      : Math.round((tag.count / result.count) * 100)}
                    %
                  </p>
                ))}
              </div>
            )}
          </div>
        </button>
      ))}
      {/* 사용자 유형 필터링 핑료 */}
    </div>
  );
};

export default VoteDetailResult;
