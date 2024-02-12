// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from 'react';

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 태그 색상 데이터 불러오기
import tagColorData from '/src/stores/tagColorData';


// 카테고리, 태그 및 유저 정보 데이터
const categories = ['의류', '가구', '신발', '전자제품']
const tagTypes1 = ['기능성', '브랜드', '소재', '색감', '모양']
const tagTypes2 = ['가성비', '브랜드', '디자인', '기능성', '내구성']
const ageTypes = ['10대','20대', '30대', '40대', '50대 이상']
const genderTypes = ['남성', '여성']
const testTypes = [
  '프렌치 마카롱', '티라미수', '포춘쿠키', 
  '지하철 만쥬', '곤약젤리', '오곡라떼', 
  '콜라', '고구마 말랭이', '붕어빵', 
  '나초', '에너지바', '슈크림', '식빵', 
  '민트초코', '초코파이', '초코잼'
]

// 각 태그 및 소비성향 별 접미사 정보 데이터
const tagsSuffix1 = ['을', '를', '를', '을', '을']
const tagsSuffix2 = ['를', '를', '을', '을', '을']
const userInfoSuffix = [
  '은', '는', '는', '는', '는', '는', '는', '는',
  '은', '는', '는', '은', '은', '는', '는', '은'
]

// 랜덤 인덱스 반환 함수
const getRandomItem = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

// 랜덤 카테고리 인덱스 생성
const firstCategoryIndex = Math.floor(Math.random() * 4);
let secondCategoryIndex;

// 두 카테고리 인덱스가 서로 다르도록 2번째 카테고리를 설정
do {
  secondCategoryIndex = Math.floor(Math.random() * 4);
} while (secondCategoryIndex === firstCategoryIndex);

// 랜덤 태그 인덱스 생성
const firstTagIndex = Math.floor(Math.random() * 5);
const secondTagIndex = Math.floor(Math.random() * 5);


// ------------------ 문장 생성 함수 ------------------
const generateSentence = () => {

  // 카테고리 종류에 따라 태그 및 접미사 종류 변경
  const firstTagTypes = firstCategoryIndex < 2 ? tagTypes1 : tagTypes2;
  const secondTagTypes = secondCategoryIndex < 2 ? tagTypes1 : tagTypes2;
  const firstTagSuffix = firstCategoryIndex < 2 ? tagsSuffix1 : tagsSuffix2;
  const secondSuffix = secondCategoryIndex < 2 ? tagsSuffix1 : tagsSuffix2;

  // 랜덤 유저 정보 생성
  const userInfo = [ageTypes, genderTypes, testTypes].map(getRandomItem);

  // 문장 생성 및 반환
  const words = `${categories[firstCategoryIndex]} 에서 ${firstTagTypes[firstTagIndex]} ${firstTagSuffix[firstTagIndex]} 선호하는
" ${userInfo[0]} - ${userInfo[1]} - ${userInfo[2]} " ${userInfoSuffix[testTypes.indexOf(userInfo[2])]}
${categories[secondCategoryIndex]} 에서 ${secondTagTypes[secondTagIndex]} ${secondSuffix[secondTagIndex]} 선호해요`;

  return words;
};


const MainWord = () => {

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // phrase 상태 변수 선언 및 초기값 빈 문자열로 설정
  const [phrase, setPhrase] = useState('');

  // 컴포넌트가 마운트될 때마다 문구가 바뀌도록 설정
  useEffect(() => {
    setPhrase(generateSentence());
  }, []);

  // --------------------------------- css 시작 ---------------------------------

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    paddingTop: "50px", // 상단 여백: 50px
    width:
      isXLarge ? "1000px" :
      isLarge ? "740px" :
      isMedium ? "470px" : "375px",
  };

  // ----------- flex 컨테이너 스타일 -----------
  const flexContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };
  
  // ----------- 문구 컨테이너 스타일 -----------
  const wordContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 컨텐츠 정렬
    justifyContent: "center",
  }

  // ----------- 따옴표 스타일 -----------
  const quotesStyle = {
    // 디자인
    margin: "0 40px",
    display: isXLarge ? "block" : "none", 

    // 글자
    fontSize: "160px",
    color: "#FFFFFF"
  }

  // ----------- 메인 문구 스타일 -----------
  const mainWordStyle = {
    // 글자
    fontSize: 
      isXLarge ? "42px" :
      isLarge ? "38px" :
      isMedium ? "34px" : "30px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  }

  // --------------------------------- css 끝 ---------------------------------


  return (
    <>
      <div style={bodyStyle}>
        <div style={wordContainerStyle}>
          <div style={quotesStyle}>“</div>
          <div className="text-center whitespace-pre-wrap font-extrabold tracking-wider">
            {phrase.split(' ').map((word, index) => {
              const tagColor = tagColorData.find(tag => tag.name === word)?.color;
              return (
                <span key={index} style={{
                  ...mainWordStyle,
                  color: tagColor || "#FFFFFF",
                }}
                >
                  {word + ' '}
                </span>
              );
            })}
          </div>
          <div style={quotesStyle}>”</div>
        </div>
      </div>
    </>
  );
};

export default MainWord;