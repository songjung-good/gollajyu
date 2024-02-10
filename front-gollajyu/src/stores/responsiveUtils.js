import { useMediaQuery } from "react-responsive";

/**
 * useResponsiveQueries 커스텀 훅
 * 
 * 반응형 웹 디자인을 위한 미디어 쿼리 훅을 사용하여
 * 다양한 화면 크기에 대한 상태를 반환합니다.
 * 
 * @returns {Object} 반응형 상태 객체
 * @property {boolean} isXLarge - 화면이 1024px 이상인 경우 true, 아닌 경우 false
 * @property {boolean} isLarge - 화면이 768px 이상이면서 1023.98px 미만인 경우 true, 아닌 경우 false
 * @property {boolean} isMedium - 화면이 480px 이상이면서 767.98px 미만인 경우 true, 아닌 경우 false
 * @property {boolean} isSmall - 화면이 479.98px 이하인 경우 true, 아닌 경우 false
 */

export const useResponsiveQueries = () => {
  return {
    isXLarge: useMediaQuery({ query: "(min-width:1024px)" }),
    isLarge: useMediaQuery({ query: "(min-width:768px) and (max-width:1023.98px)" }),
    isMedium: useMediaQuery({ query: "(min-width:480px) and (max-width:767.98px)" }),
    isSmall: useMediaQuery({ query: "(max-width:479.98px)" }),
  };
};