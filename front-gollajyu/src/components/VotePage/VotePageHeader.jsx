import React, { useState } from 'react';

const VotePageHeader = ({ onSort, onSearch }) => {
  const [inputValue, setInputValue] = useState('');  // 로컬 상태 추가

  const handleSort = (sortType) => {
    // TODO: 정렬 로직 구현
    console.log(`Sorting by: ${sortType}`);
  };

  // 입력 필드 변경 이벤트 핸들러
  const handleChange = (event) => {
    setInputValue(event.target.value); // 입력값을 로컬 상태에 저장
  };

  // 검색 버튼 클릭 이벤트 핸들러
  const handleSearchClick = () => {
    onSearch(inputValue); // 입력 완료된 검색어를 상위 컴포넌트에 전달
  };

  return (
    <div className="vote-controls container mx-auto my-4 max-w-5xl px-4">
      <div className="flex justify-between">
        <div>
        <button 
          onClick={() => onSort('latest')} 
          className="border border-orange-500 mr-2 mt-4 fontsize-max-sm rounded-full px-4 py-2 hover:bg-orange-500 hover:text-white active:bg-orange-600 active:text-white">
          최신순
        </button>
        <button
          onClick={() => onSort('popular')}
          className="border border-orange-500 mr-2 mt-4 fontsize-max-sm rounded-full px-4 py-2 hover:bg-orange-500 hover:text-white active:bg-orange-600 active:text-white">
          인기순
        </button>
        </div>
        <input 
          type="search"
          placeholder="투표 검색..."
          onChange={handleChange} // 변경 이벤트 핸들러를 설정
          className="border p-1 mt-4 fontsize-md"
        />
        <button 
          onClick={handleSearchClick}
          className="ml-2 border border-orange-500 mt-4 fontsize-max-sm rounded-full px-4 py-2 hover:bg-orange-500 hover:text-white active:bg-orange-600 active:text-white">
          검색
        </button>
      </div>
    </div>
  );
};

export default VotePageHeader;