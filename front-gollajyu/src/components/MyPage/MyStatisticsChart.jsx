import React from "react";
import { useMediaQuery } from "react-responsive";
import { PieChart, Pie, Cell } from 'recharts';
import categoryData from '/src/stores/categoryData';
import tagColorData from '/src/stores/tagColorData';

const MyStatisticsChart = () => {
  // ----------- 반응형 웹페이지 구현 -----------
  const isLarge = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const isMedium = useMediaQuery({
    query : "(min-width:768px) and (max-width:1024px)"
  });
  const isSmall = useMediaQuery({
    query : "(max-width:768px)"
  });

  // ----------- 데이터 배열 -----------
  const data = [
    { name: '가성비', value: 15, color: '#8FD9B6' },
    { name: '브랜드', value: 25, color: '#D395D0' },
    { name: '디자인', value: 5, color: '#FF9999' },
    { name: '기능성', value: 10, color: '#5EC4DC' },
    { name: '내구성', value: 5, color: '#FFDF38' },
  ];

  // ----------- 라디안과 각도 간의 변환 상수 -----------
  const RADIAN = Math.PI / 180;

  // ----------- 라벨 생성 함수 -----------
  const generateLabel = ({ cx, cy, midAngle, outerRadius, name, percent }) => {
    const radius = outerRadius * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // ----------- 공통 스타일 -----------
    const commonStyle = {
      // 위치
      textAnchor: 'middle', // 수평 가운데 정렬
      dominantBaseline: 'middle', // 수직 가운데 정렬

      // 글자
      fill: "#6C6C6C",
    }

    // ----------- 태그 이름 스타일 -----------
    const nameStyle = {
      // 상속
      ...commonStyle,

      // 글자
      fontSize: "20px",
    };

    // ----------- 태그 비율 스타일 -----------
    const percentStyle = {
      // 상속
      ...commonStyle,

      // 글자
      fontSize: "16px",
    };

    return (
      <>
        <text
          x={x} y={y - 12}
          dominantBaseline="central"
          style={nameStyle}
        >
          {name}
        </text>
        <text
          x={x} y={y + 12}
          dominantBaseline="central"
          style={percentStyle}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </>
    );
  };

  return (
    <>
      <PieChart width={!isSmall? 500 : 350} height={!isSmall? 500 : 350}>
        <Pie
          cx="50%"
          cy="50%"
          labelLine={false}
          label={generateLabel}
          outerRadius={!isSmall? 240 : 160}
          nameKey="name"
          dataKey="value"
          data={data}
        >
          {data.map((tag, index) => (
            <Cell
              key={`cell-${index}`}
              fill={tag.color}
              strokeWidth={2}
            />
          ))}
        </Pie>
      </PieChart>
    </>
  );
};

export default MyStatisticsChart;
