import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import categoryData from "/src/stores/categoryData";
import sobiTIData from "/src/stores/testResultData";
import API_URL from "/src/stores/apiURL";
import axios from "axios";

const StatisticPageChart = ({
  selectedCategoryId,
  itemCount,
  selectedRadioValues,
  selectedDropdownValues,
}) => {

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

  // ----------- 사용자 유형 색 리스트 -----------
  const colorList = ["#2CB16A", "#FC9D2B", "#00A1FF", "#FF665A"];

  // ----------- 선택한 카테고리에 대한 태그 통계 배열 초기화 -----------
  const [selectedTagDataArray, setSelectedTagDataArray] = useState(
    categoryData[selectedCategoryId].tags.map((tag) => ({
      tag,
      userType1: 0,
      userType2: 0,
      userType3: 0,
      userType4: 0,
    }))
  );

  // ----------- 데이터를 서버에서 가져오는 함수 -----------
  const fetchData = async () => {
    // ----------- 응답 데이터를 담을 배열 -----------
    const responseDataArray = [];
    // ----------- itemCount 수 만큼 반복 -----------
    for (let i = 1; i <= itemCount; i++) {
      const genderId = selectedRadioValues[`성별-${i}`]
      const requestData = {
        memberId: 0,
        typeId: selectedDropdownValues[`소비성향-${i}`],
        age: selectedRadioValues[`나이-${i}`],
        gender: genderId == 1 ? "MALE" : (genderId == 2 ? "FEMALE" : 0),
        categoryId: selectedCategoryId,
      };

      try {
        // axios.post를 사용하여 서버에 비동기 요청을 보내고 응답을 기다림
        const responseData = await axios.post(
          `${API_URL}/statistics`,
          requestData
        );

        // responseDataArray에 서버 응답 데이터 추가
        responseDataArray.push(responseData.data);
        console.log('요청', requestData);
        console.log('응답', responseData.data);
      } catch (error) {
        console.error("axios 에러", error);
      }
    }

    // ----------- 업데이트 할 배열 선언 및 데이터 채우기 -----------
    const updatedDataArray = [...selectedTagDataArray];
    responseDataArray.forEach((responseData, userType) => {
      responseData.slice(1, 6).forEach((tagData, tagIndex) => {
        const tagRatio = (tagData.count / responseData[0].count) * 100;
        updatedDataArray[tagIndex][`userType${userType + 1}`] = tagRatio;
        updatedDataArray[tagIndex]["tag"] = tagData.tag;
      });
    });

    // console.log('응답 데이터 배열', responseDataArray)
    // console.log("태그 통계", updatedDataArray)

    // ----------- 배열 업데이트 -----------
    setSelectedTagDataArray([...updatedDataArray]);
  };

  // ----------- 값이 변경될 때 fetchData 함수 호출 -----------
  useEffect(() => {
    fetchData();
  }, [
    selectedCategoryId,
    itemCount,
    selectedRadioValues,
    selectedDropdownValues,
  ]);

  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    width: "100%",
    height: isXLarge
      ? "800px"
      : isLarge
      ? "700px"
      : isMedium
      ? "600px"
      : "500px",
  };

  // ----------- flex 컨테이너 스타일 -----------
  const flexContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- legend 컨테이너 스타일 -----------
  const legendContainerStyle = {
    // 상속
    ...flexContainerStyle,

    // 컨텐츠 정렬
    flexWrap: "wrap", // 가로 길이를 넘어가면 줄바꿈
  };

  // ----------- legend 아이템 스타일 -----------
  const legendItemStyle = {
    // 상속
    ...flexContainerStyle,

    // 디자인
    flex: isXLarge || isLarge ? "0 0 50%" : "0 0 100%", // 한 줄에 최대 2개/1개의 항목
    marginBottom: "10px", // 각 항목 사이의 간격
  };

  // ----------- legend 아이콘 스타일 -----------
  const legendIconStyle = {
    // 디자인
    marginRight: "5px",
    marginBottom: isXLarge ? "5px" : isLarge ? "4px" : "3px",
    width: isXLarge ? "20px" : isLarge ? "17px" : isMedium ? "14px" : "11px",
    height: isXLarge ? "20px" : isLarge ? "17px" : isMedium ? "14px" : "11px",
  };

  // --------------------------------- css 끝 ---------------------------------


  // ----------- itemCount 수 만큼 Radar를 생성 -----------
  const radars = [];
  for (let i = 1; i <= itemCount; i++) {
    const ageId = selectedRadioValues[`나이-${i}`] ?? 0;
    const genderId = selectedRadioValues[`성별-${i}`] ?? 0;
    const testId = selectedDropdownValues[`소비성향-${i}`] ?? 0;

    const ageValue =
      ageId == 0 ? "전체" : ageId == 5 ? "50대 이상" : `${ageId}0대`;
    const genderValue =
      genderId == 0 ? "전체" : genderId == 1 ? "남성" : "여성";
    const testValue = testId == 0 ? "전체" : sobiTIData[testId - 1].title;

    radars.push(
      <Radar
        key={`유형 ${i}`}
        name={`유형 ${i} : ${ageValue}/${genderValue}/${testValue}`}
        dataKey={`userType${i}`}
        stroke={colorList[i - 1]}
        fill={colorList[i - 1]}
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
            <div
              style={{
                ...legendIconStyle,
                backgroundColor: entry.color,
              }}
            ></div>
            <span className="fontsize-md" style={{ color: entry.color }}>
              {entry.value}
            </span>
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
            cy={isXLarge || isLarge ? "44%" : "37%"}
            outerRadius={isXLarge ? 300 : isLarge ? 250 : isMedium ? 190 : 130}
            data={selectedTagDataArray}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="tag" />
            <PolarRadiusAxis
              angle={54}
              tickFormatter={(value) => `${value.toFixed(1)}%`}
            />
            {radars}
            <Legend content={<CustomLegend />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default StatisticPageChart;
