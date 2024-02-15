// 리액트
import React from "react";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";


const TestItem = (props) => {

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  const { handleResponse, data } = props;
  const { question, answer } = data;


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    height: isXLarge ? "670px" : isLarge ? "605px" : isMedium ? "540px" : "475px",
    
    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  }

  // --------------------------------- css 끝 ---------------------------------


  return (
    <>
      <div className="container mx-auto flex flex-col justify-between items-center sm:h-[415px] md:h-[480px] lg:h-[545px] xl:h-[610px]">
        <h1 className="flex items-center fontsize-sm text-center break-keep h-3/4">
          {question}
        </h1>
        <div className="flex flex-col justify-end space-y-3 items-center h-1/4">
          <button
            className="border border-amber-300 border-2 text-base rounded-full px-10 py-1 hover:bg-amber-300 w-full h-1/2 break-keep"
            onClick={() => handleResponse(0)}
          >
            {answer[0]}
          </button>
          <button
            className="border border-amber-300 border-2 text-base rounded-full px-10 py-1 hover:bg-amber-300 w-full h-1/2 break-keep"
            onClick={() => handleResponse(1)}
          >
            {answer[1]}
          </button>
        </div>
      </div>
    </>
  );
};

export default TestItem;
