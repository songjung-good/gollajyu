import React, { useState, useEffect } from 'react';

const phrases = [
  '전자제품에서 디자인을 선호하는 30대 여성은 의류에서 브랜드를 선호해요',
  '가구에서 가성비를 선호하는 40대 남성은 신발에서 소재를 중요하게 생각해요',
  '신발에서 기능성을 선호하는 20대 여성은 가전제품에서 가성비를 중요하게 생각해요',
  // 여기에 더 많은 문구를 추가하세요
];

const MainWord = () => {
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    setPhrase(phrases[randomIndex]);
  }, []);

  return (
    // 문구 위치 수정
    <div className="px-20 pt-20 w-auto h-auto relative text-center flex justify-center items-center">
      <div className="flex-grow md:flex-grow-4">
        <div className="text-white text-2xl sm-3xl md:text-4xl lg:text-5xl font-medium tracking-wider">
        “{phrase}”
        </div>
      </div>
    </div>
  );
};

export default MainWord;
