import React, { useState, useEffect } from 'react';

// 임시 데이터
const categories = ['가구', '의류', '신발', '전자제품']
const tags1 = ['소재', '가성비', '색감', '모양', '브랜드']
const tags2 = ['소재', '기능성', '내구성', '디자인', '브랜드']
const userInfo1 = ['남성', '여성']
const userInfo2 =['20대', '30대', '40대', '50대']
const userInfo3 = ['우유식빵', '붕어빵', '단팥빵', '초코파이']

// 랜덤 인덱스
const getRandomItem = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

// 문장 생성
const generateSentence = () => {
  const categoriesIndex = Math.floor(Math.random() * categories.length);
  const tags = categoriesIndex < 2 ? tags1 : tags2;
  const userInfo = [userInfo1, userInfo2, userInfo3].map(getRandomItem);

  const words = `${categories[categoriesIndex]}에서 ${getRandomItem(tags)}을 선호하는 ${userInfo[0]} ${userInfo[1]} ${userInfo[2]}은/는 ${getRandomItem(categories)}에서 ${getRandomItem(tags)}을 선호해요`;
  
  return words;
}

// 문장 출력 및 css
const MainWord = () => {
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    setPhrase(generateSentence());
  }, []);

  return (
    <div className="px-20 pt-20 w-auto h-auto relative text-center flex justify-center items-center">
      <div className="flex-grow md:flex-grow-4">
        <div className="text-white text-1xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium tracking-wider">
        “{phrase}”
        </div>
      </div>
    </div>
  );
};

export default MainWord;