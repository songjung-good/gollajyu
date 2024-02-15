// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 태그 색상 데이터 불러오기
import tagColorData from '/src/stores/tagColorData';


// 카테고리, 태그 및 유저 정보 데이터
const categories = ['의류', '가구', '신발', '전자제품']
const tagTypes1 = ['가성비', '브랜드', '소재', '색감', '모양']
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

  // 카테고리 종류에 따라 태그 종류 변경
  const firstTagTypes = firstCategoryIndex < 2 ? tagTypes1 : tagTypes2;
  const secondTagTypes = secondCategoryIndex < 2 ? tagTypes1 : tagTypes2;

  // 랜덤 유저 정보 생성
  const userInfo = [ageTypes, genderTypes, testTypes].map(getRandomItem);

  // 문장 생성 및 반환
  const words = `${categories[firstCategoryIndex]} 에서 ${firstTagTypes[firstTagIndex]} ${['가성비', '브랜드', '소재'].includes(firstTagTypes[firstTagIndex]) ? '를' : '을'} 선호하는
    “ ${userInfo[0]} ${userInfo[1]} ${userInfo[2]} ” ${['프렌치 마카롱', '붕어빵', '슈크림', '식빵', '초코잼'].includes(userInfo[2]) ? '은' : '는'}
    ${categories[secondCategoryIndex]} 에서 ${secondTagTypes[secondTagIndex]} ${['가성비', '브랜드', '소재'].includes(secondTagTypes[secondTagIndex]) ? '를' : '을'} 선호해요`;

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

  // ----------- flex 컨테이너 스타일 -----------
  const flexContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    margin: "200px auto",
    padding: "0 20px",
    maxWidth: "1160px",
    minWidth: "240px",
    width: "100%",

    // 컨텐츠 정렬
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  // ----------- 보조 문구 스타일 -----------
  const textStyle = {
    // 디자인
    marginBottom: "20px",
    padding: "8px 20px 4px",
    width: isXLarge || isLarge ? "500px" : "350px",
    backgroundColor: "#FFE69C",

    // 글자
    fontSize: isXLarge || isLarge ? "32px" : "24px",
    fontWeight: "bold",
  }
  
  // ----------- 문구 컨테이너 스타일 -----------
  const wordContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    width: isXLarge ? "100%" : "90%",

    // 컨텐츠 정렬
    justifyContent: "center",
  }

  // ----------- 메인 문구 스타일 -----------
  const mainWordStyle = {
    // 글자
    fontSize: isXLarge || isLarge ? "22px" : "14px",
  }

  // ----------- 버튼 스타일 -----------
  const buttonStyle = {
    // 디자인
    marginTop: "60px",

    // 글자
    fontSize: "18px",
    fontWeight: "bold",
  }

  // --------------------------------- css 끝 ---------------------------------


  return (
    <>
      <div style={bodyStyle}>
        <p style={textStyle}># 다른 사람들의 구매 스타일</p>
        <div style={wordContainerStyle}>
          <div className="tracking-wider">
            {phrase.split(' ').map((word, index) => {
              const tagColor = tagColorData.find(tag => tag.name === word)?.color;
              return (
                <span key={index} style={{
                  ...mainWordStyle,
                  color: tagColor || "#4A4A4A",
                }}
                >
                  {word + ' '}
                </span>
              );
            })}
          </div>
        </div>
        <Link to="/StatisticPage">
          <button style={buttonStyle} className="text-amber-500 hover:text-amber-600">
            더 자세히 알아보기 →
          </button>
        </Link>
      </div>
    </>
  );
};

export default MainWord;