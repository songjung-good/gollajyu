import React from "react";
import { useMediaQuery } from "react-responsive";
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import categoryData from "/src/stores/categoryData";

const StatisticPageChart = ({ selectedCategory, itemCount, selectedRadioValues, selectedDropdownValues }) => {

  // ----------- 반응형 웹페이지 구현 -----------
  const isXLarge = useMediaQuery({
    query : "(min-width:1024px)",
  });
  const isLarge = useMediaQuery({
    query : "(min-width:768px) and (max-width:1023.98px)"
  });
  const isMedium = useMediaQuery({
    query : "(min-width:480px) and (max-width:767.98px)"
  });
  const isSmall = useMediaQuery({
    query : "(max-width:479.98px)"
  });

  // ----------- 드롭다운으로 선택한 카테고리 -----------
  const selectedCategoryData = categoryData[selectedCategory - 1];
  const selectedTagData = [
    {
      subject: selectedCategoryData.tags[0],
      A: 120,
      B: 110,
      C: 50,
      D: 30,
      fullMark: 150,
    },
    {
      subject: selectedCategoryData.tags[1],
      A: 98,
      B: 130,
      C: 50,
      D: 30,
      fullMark: 150,
    },
    {
      subject: selectedCategoryData.tags[2],
      A: 86,
      B: 130,
      C: 50,
      D: 30,
      fullMark: 150,
    },
    {
      subject: selectedCategoryData.tags[3],
      A: 99,
      B: 100,
      C: 50,
      D: 30,
      fullMark: 150,
    },
    {
      subject: selectedCategoryData.tags[4],
      A: 85,
      B: 90,
      C: 50,
      D: 70,
      fullMark: 150,
    },
  ];

  // ----------- 사용자 유형 색 리스트 -----------
  const colorList = ["#2CB16A", "#FC9D2B", "#00A1FF", "#FF665A",]


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    width: "100%",
    height:
      isXLarge ? "600px" :
      isLarge ? "500px" :
      isMedium ? "400px" : "300px",
  };

  // --------------------------------- css 끝 ---------------------------------

  // ----------- itemCount 수 만큼 Radar를 생성 -----------
  const radars = [];
  for (let i = 1; i <= itemCount; i++) {
    const ageValue = selectedRadioValues[`나이-${i}`] || '전체';
    const genderValue = selectedRadioValues[`성별-${i}`] || '전체';
    const tasteValue = selectedDropdownValues[`소비성향-${i}`] || '전체';

    radars.push(
      <Radar
        key={`유형 ${i}`}
        name={`${ageValue}/${genderValue}/${tasteValue}`}
        dataKey={String.fromCharCode(64 + i)}  // A, B, C, D
        stroke={colorList[i-1]}
        fill={colorList[i-1]}
        fillOpacity={0.3}
      />
    );
  }

  return (
    <>
      <div style={containerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={selectedTagData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={54} domain={[0, 150]} />
            {radars}
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default StatisticPageChart;
