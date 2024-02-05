import React from "react";
import { useMediaQuery } from "react-responsive";
import { PieChart, Pie, Cell } from 'recharts';
import categoryData from '/src/stores/categoryData';
import tagColorData from '/src/stores/tagColorData';

const MyStatisticsChart = () => {

  // ----------- 반응형 웹페이지 구현 -----------
  const isXLarge = useMediaQuery({
    query: "(min-width:1024px)",
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

  // ----------- 데이터 배열 (임시) -----------
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

    // ----------- 글자 스타일 -----------
    const textStyle = {
      // 위치
      textAnchor: "middle", // 수평 가운데 정렬
      dominantBaseline: "middle", // 수직 가운데 정렬

      // 글자
      fill: "#6C6C6C",
    }

    return (
      <>
        <text
          x={x}
          y={
            isXLarge ? y - 16 :
            isLarge ? y - 14 :
            isMedium ? y - 12 : y - 10
          }
          dominantBaseline="central"
          style={textStyle}
          className="fontsize-md"
        >
          {name}
        </text>
        <text
          x={x}
          y={
            isXLarge ? y + 16 :
            isLarge ? y + 14 :
            isMedium ? y + 12 : y + 10
          }
          dominantBaseline="central"
          style={textStyle}
          className="fontsize-sm"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </>
    );
  };

  return (
    <>
      <PieChart
        width={
          isXLarge ? 500 :
          isLarge ? 437.5 :
          isMedium ? 375 : 312.5
        }
        height={
          isXLarge ? 500 :
          isLarge ? 437.5 :
          isMedium ? 375 : 312.5
        }
      >
        <Pie
          cx="50%"
          cy="50%"
          labelLine={false}
          label={generateLabel}
          outerRadius={
            isXLarge ? 240 :
            isLarge ? 210 :
            isMedium ? 180 : 150
          }
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
