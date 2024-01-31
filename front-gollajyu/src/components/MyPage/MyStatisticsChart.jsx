import React, { useState } from "react";
import { PieChart, Pie, Cell, Label } from 'recharts';

const MyStatisticsChart = () => {
  const data = [
    { name: '가성비', value: 35, color: '#8FD9B6' },
    { name: '브랜드', value: 25, color: '#D395D0' },
    { name: '디자인', value: 20, color: '#FF9999' },
    { name: '기능성', value: 10, color: '#5EC4DC' },
    { name: '내구성', value: 10, color: '#FFDF38' },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <>
      <PieChart width={600} height={600}>
        <Pie
          cx="50%"
          cy="50%"
          labelLine={false}
          label={true}
          outerRadius={200}
          nameKey="name"
          dataKey="value"
          data={data}
          activeIndex={activeIndex}
          onMouseEnter={(d, i) => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
        >
          {data.map((tag, index) => (
            <Cell
              key={`cell-${index}`}
              fill={tag.color}
              strokeWidth={index === activeIndex ? 3 : 7}
            />
          ))}
          <Label
            content={({ value, name, percent }) => `${name}: ${value} (${(percent * 100).toFixed(2)}%)`}
            position="center"
            fill="white" // 글자 색상을 지정합니다.
          />
        </Pie>
      </PieChart>
    </>
  );
};

export default MyStatisticsChart;
