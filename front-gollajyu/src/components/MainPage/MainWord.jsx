import React, { useState, useEffect } from 'react';
import tagColorData from '/src/stores/tagColorData';

// 임시 데이터
const categories = ['의류', '가구', '신발', '전자제품']
const tags1 = ['기능성', '브랜드', '소재', '색감', '모양']
const tags2 = ['가성비', '브랜드', '디자인', '기능성', '내구성']
const userInfo1 = ['남성', '여성']
const userInfo2 =['10대','20대', '30대', '40대', '50대 이상']
const userInfo3 = ['프렌치 마카롱', '티라미수', '포춘쿠키', 
                    '지하철 만쥬', '곤약젤리', '오곡라떼', 
                    '콜라', '고구마 말랭이', '붕어빵', 
                    '나초', '에너지바', '슈크림', '식빵', 
                    '민트초코', '초코파이', '초코잼']

// 랜덤 인덱스
const getRandomItem = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

// 문장 생성
const generateSentence = () => {
  const categoriesIndex = Math.floor(Math.random() * categories.length);
  const tags = categoriesIndex < 2 ? tags1 : tags2;
  const userInfo = [userInfo1, userInfo2, userInfo3].map(getRandomItem);
  const words = `${categories[categoriesIndex]} 에서 ${getRandomItem(tags)} 을 선호하는 
  ${userInfo[0]} ${userInfo[1]} ${userInfo[2]}은/는 
  ${getRandomItem(categories)} 에서 ${getRandomItem(tags)} 을 선호해요`;

  return words;
};

// 색상 지정
const colors = {
  // 의류: '#FF595E',
  // 가구: '#FFCA3A',
  // 신발: '#8AC926',
  // 전자제품: '#1982C4',
  // // 기능성: '#5EC4DC',
  // 브랜드: '#D395D0',
  // 소재: '#CDE05A',
  // 색감: '#FFA959',
  // 모양: '#8CB0F6',
  // 가성비: '#8FD9B6',
  // 디자인: '#FF9999',
  // 내구성: '#FFDF38',
  // 남성: '#FF7F50',
  // 여성: '#FFC107',
  // '10대': '#9400D3',
  // '20대': '#00BFFF',
  // '30대': '#FF7F50',
  // '40대': '#FFC107',
  // '50대 이상': '#9400D3',
};

// 문장 출력 및 css
const MainWord = () => {
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    setPhrase(generateSentence());
  }, []);

  return (
    <div className="px-20 pt-20 w-auto h-auto relative text-center flex justify-center items-center">
      <div className="flex-grow md:flex-grow-4">
        <div className="whitespace-pre-wrap text-pretty font-extrabold text-black fontsize-xl tracking-wider">
          {phrase.split(' ').map((word, index) => {
            const tagColor = tagColorData.find(tag => tag.name === word)?.color;
            return (
              <span key={index} style={{ color: tagColor || colors[word], fontSize: 'inherit' }}>
                {word + ' '}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainWord;