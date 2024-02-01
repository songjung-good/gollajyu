import React, { useState } from 'react';

// 임의의 데이터
const voteResults = [
  { option: '선택지 1', percentage: 50, reasons: { 가성비: 30, 디자인: 40, 브랜드: 0, 편의성: 30, 기능성: 0 } },
  { option: '선택지 2', percentage: 30, reasons: { 가성비: 20, 디자인: 60, 브랜드: 10, 편의성: 10, 기능성: 0 } },
  { option: '선택지 3', percentage: 20, reasons: { 가성비: 50, 디자인: 20, 브랜드: 10, 편의성: 20, 기능성: 0 } },
];

const VoteDetailReselt = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  
  return (
    <div>
      {voteResults.map((result, index) => (
        <div key={index}>
          <h2>{result.option}: {result.percentage}%</h2>
          <button onClick={() => setSelectedOption(selectedOption === index ? null : index)}>▼</button>
            {selectedOption === index && (
              <div>
                {Object.entries(result.reasons).map(([reason, percentage]) => (
                  <p key={reason}>{reason}: {percentage}%</p>
                ))}
              </div>
          )}
        </div>
      ))}
      {/* 사용자 유형 필터링 부분 구현필요 */}
    </div>
  );
};

export default VoteDetailReselt;
