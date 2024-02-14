import React, { useState } from 'react';
// 태그 색상 데이터 불러오기
import tagColorData from '/src/stores/tagColorData';

// 임시 데이터를 상위 컴포넌트로부터 받아오는 props로 변경
const VoteDetailResult = ({voteResults, totalChoiceCnt}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const colorMap = [
    'bg-green-300',
    'bg-yellow-300',
    'bg-blue-300',
    'bg-orange-300'
  ];
  const handleClick = (index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = !newSelectedOptions[index];
    setSelectedOptions(newSelectedOptions);
  };
  
  return (
    <div className='mx-auto p-2 flex justify-around items-center' style={{display: "flex"}}>
      {voteResults.map((result, index) => (
        <button onClick={() => handleClick(index)}>
        <div className={`${colorMap[result.voteItemId%4]} rounded-lg`} key={index} style={{border: "1px solid black", width: "280px", margin: "10px", padding: "10px"}}>
          {/* <h2>선택비율 : {Math.round((result.count / totalChoiceCnt) * 100)}%</h2> */}
          <h2>자세한 정보를 알고 싶다면...!</h2>
          {selectedOptions[index] && (
            <div>
              {result.tagCountList.map((tag) => (
                <p key={tag.tagName}>
                  {tag.tagName}: {Math.round((tag.count /  result.count) * 100)}%
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