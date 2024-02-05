import React, { useState } from 'react';

// 임시 데이터를 상위 컴포넌트로부터 받아오는 props로 변경
const VoteDetailResult = ({voteResults}) => {
  // props 확인용
  // console.log('voteResults:', voteResults);
  const [selectedOption, setSelectedOption] = useState(null);
  
  return (
    <div className='flex w-full' style={{display: "flex"}}>
      {voteResults.map((result, index) => (
        <div key={index} style={{border: "1px solid black", width: "280px", margin: "10px", padding: "10px"}}>
          <h2>{result.tagResults}: %</h2>
          <button onClick={() => setSelectedOption(selectedOption === index ? null : index)}>▼</button>
          {selectedOption === index && (
            <div>
              {Object.entries(result.tagResults).map(([reason, percentage]) => (
                <p key={reason}>{reason}: {percentage}%</p>
              ))}
            </div>
          )}
        </div>
      ))}
      {/* 사용자 유형 필터링 핑료 */}
    </div>
  );
};

export default VoteDetailResult;