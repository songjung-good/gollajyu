import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import categoryData from "/src/stores/categoryData";
import testResultData from "/src/stores/testResultData";
import API_URL from "../../stores/apiURL";
import axios from "axios";

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



  const [selectedTagData, setSelectedTagData] = useState([]);




  // ----------- response 데이터를 담을 배열 -----------
  const responseDataArray = [];

  const fetchDataSync = async () => {
  
    // ----------- 각 아이템에 대한 데이터를 담을 배열 -----------
    const requestDataArray = [];

    // ----------- '전체'인지 확인하는 함수 -----------
    const isNotAll = (value) => value !== '전체';

    // ----------- itemCount 수 만큼 데이터 구성 -----------
    for (let i = 1; i <= itemCount; i++) {
      const selectedAgeValue = selectedRadioValues[`나이-${i}`];
      const selectedGenderValue = selectedRadioValues[`성별-${i}`];
      const selectedTestValue = selectedDropdownValues[`소비성향-${i}`];

      const ageValue = isNotAll(selectedAgeValue) ? selectedAgeValue?.charAt(0) : null;
      const genderValue = isNotAll(selectedGenderValue) ? (selectedGenderValue === '남자' ? 'MALE' : 'FEMALE') : null;
      const testResultId = isNotAll(selectedTestValue) ? (testResultData.find(item => item.title === selectedTestValue)?.id || 0) : null;

      requestDataArray.push({
        memberId: 0,
        typeId: testResultId,
        age: ageValue,
        gender: genderValue,
        categoryId: selectedCategory
      });
    }

    for (const data of requestDataArray) {
      try {
        const response = await axios.post(`${API_URL}/statistics`, data);
        responseDataArray.push(response.data);
        console.log(responseDataArray);
      } catch (error) {
        console.error(error);
      }
    }

    return responseDataArray;
  };

  useEffect(() => {
    fetchDataSync().then((responseDataArray) => {
      // 여기에 데이터 추가 작업 완료 후 실행할 코드 작성
      console.log('Data added successfully:', responseDataArray);
      
      const selectedCategoryData = categoryData[selectedCategory];
      const updatedTagData = [];

      for (let i = 0; i < selectedCategoryData.tags.length; i++) {
        selectedTagData.push({
          tag: selectedCategoryData.tags[i],
          type1: 100,
          type2: 70,
          type3: 50,
          type4: 30,
          fullMark: 150,
        });

        console.log(selectedTagData);
      }

      setSelectedTagData(updatedTagData)
    });
  }, [selectedCategory, selectedRadioValues, selectedDropdownValues, itemCount]);

  // ----------- 사용자 유형 색 리스트 -----------
  const colorList = ["#2CB16A", "#FC9D2B", "#00A1FF", "#FF665A",]


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    width: "100%",
    height:
      isXLarge ? "800px" :
      isLarge ? "700px" :
      isMedium ? "600px" : "500px",
  };

  // ----------- flex 컨테이너 스타일 -----------
  const flexContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- legned 컨테이너 스타일 -----------
  const legendContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 컨텐츠 정렬
    flexWrap: "wrap", // 가로 길이를 넘어가면 줄바꿈
  }

  // ----------- legned 아이템 스타일 -----------
  const legendItemStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    flex: isXLarge || isLarge ? "0 0 50%" : "0 0 100%", // 한 줄에 최대 2개/1개의 항목
    marginBottom: '10px', // 각 항목 사이의 간격
  }

  // ----------- legned 아이콘 스타일 -----------
  const legendIconStyle = {
    // 디자인
    marginRight: "5px",
    marginBottom:
      isXLarge ? "5px" :
      isLarge ? "4px" : "3px",
    width:
      isXLarge ? "20px" :
      isLarge ? "17px" :
      isMedium ? "14px" : "11px",
    height:
      isXLarge ? "20px" :
      isLarge ? "17px" :
      isMedium ? "14px" : "11px",
  }

  // --------------------------------- css 끝 ---------------------------------


  // ----------- itemCount 수 만큼 Radar를 생성 -----------
  const radars = [];
  for (let i = 1; i <= itemCount; i++) {
    const ageValue = selectedRadioValues[`나이-${i}`] || ' - ';
    const genderValue = selectedRadioValues[`성별-${i}`] || ' - ';
    const tasteValue = selectedDropdownValues[`소비성향-${i}`] || ' - ';

    radars.push(
      <Radar
        key={`유형 ${i}`}
        name={`유형 ${i} : ${ageValue}/${genderValue}/${tasteValue}`}
        dataKey={`type${i}`}
        stroke={colorList[i-1]}
        fill={colorList[i-1]}
        fillOpacity={0.3}
      />
    );
  }

  // ----------- 커스텀 레전드 렌더링 함수 -----------
  const CustomLegend = (props) => {
    const { payload } = props;
    return (
      <ul style={legendContainerStyle}>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={legendItemStyle}>
            <div style={{
              ...legendIconStyle,
              backgroundColor: entry.color,
            }}></div>
            <span className="fontsize-md" style={{ color: entry.color }}>{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div style={containerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy={ isXLarge || isLarge ? "44%" : "37%" }
            outerRadius={
              isXLarge ? 300 :
              isLarge ? 250 :
              isMedium ? 190 : 130
            }
            data={selectedTagData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="tag" />
            <PolarRadiusAxis angle={54} domain={[0, 150]} />
            {radars}
            <Legend content={<CustomLegend />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default StatisticPageChart;
