import React from "react";
import { useMediaQuery } from "react-responsive";
import { PieChart, Pie, Cell } from "recharts";
import categoryData from "/src/stores/categoryData";
import tagColorData from "/src/stores/tagColorData";

const MyStatisticsChart = ({ tagRatio, selectedCategory }) => {
  // ----------- 반응형 웹페이지 구현 -----------
  const isXLarge = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const isLarge = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023.98px)",
  });
  const isMedium = useMediaQuery({
    query: "(min-width:480px) and (max-width:767.98px)",
  });
  const isSmall = useMediaQuery({
    query: "(max-width:479.98px)",
  });

  // ----------- 데이터 -----------

  const categoryName = categoryData.find(
    (item) => item.id == selectedCategory
  ).name;

  // tagRatio에서 선택된 카테고리의 데이터 추출
  const targetData =
    tagRatio && tagRatio.find((item) => item.category == categoryName);

  // 드랍다운 버튼으로 선택한 카테고리의 데이터를 파이차트에 쓸 수 있는 형태의 데이터로 가공
  // ex) [{name: "가성비", value: 10, color: 태그별 색 코드},
  //      {name: "소재", value: 50, color: 태그별 색 코드}]

  const data =
    targetData &&
    Object.entries(targetData)
      .filter(([key]) => key !== "category")
      .map(([name, value]) => ({
        name,
        value,
        color: tagColorData.find((item) => item.name === name).color,
      }));

  // console.log(categoryName, data);

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
    };

    return (
      <>
        <text
          x={x}
          y={isXLarge ? y - 16 : isLarge ? y - 14 : isMedium ? y - 12 : y - 10}
          dominantBaseline="central"
          style={textStyle}
          className="fontsize-md"
        >
          {name}
        </text>
        <text
          x={x}
          y={isXLarge ? y + 16 : isLarge ? y + 14 : isMedium ? y + 12 : y + 10}
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
      {data && data.length > 0 ? (
        <PieChart
          width={isXLarge ? 500 : isLarge ? 437.5 : isMedium ? 375 : 312.5}
          height={isXLarge ? 500 : isLarge ? 437.5 : isMedium ? 375 : 312.5}
        >
          <Pie
            cx="50%"
            cy="50%"
            labelLine={false}
            label={generateLabel}
            outerRadius={isXLarge ? 240 : isLarge ? 210 : isMedium ? 180 : 150}
            nameKey="name"
            dataKey="value"
            data={data}
          >
            {data.map((tag, index) => (
              <Cell key={`cell-${index}`} fill={tag.color} strokeWidth={2} />
            ))}
          </Pie>
        </PieChart>
      ) : (
        <div className="w-full h-[500px] py-10">
          <p className="fontsize-sm text-center">
            해당 카테고리의 투표에 참여한 기록이 없어요
          </p>
        </div>
      )}
    </>
  );
};

export default MyStatisticsChart;
