// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from 'react';

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// Swiper 라이브러리 및 스타일
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, HashNavigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// 투표 컴포넌트
import VoteCard from '../VotePage/VoteCard';


const SwipeVote = (props) => {

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // 부모 컴포넌트로부터 투표 목록 전달 받음
  const { voteList } = props;

  // 투표 목록 관련 상태
  const [votes, setVotes] = useState(voteList.body.voteInfoList);

  // 슬라이드 관련 상태
  const [activeSlide, setActiveSlide] = useState(0);

  // 드롭다운 관련 상태
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const options = ['전체', '의류', '가구', '신발', '전자제품'];

  // ------------------ 드롭다운 옵션을 클릭했을 때 호출되는 함수 ------------------
  const handleOptionClick = (option) => {

    // 선택한 옵션의 인덱스를 찾아 상태 변경
    const selectedIndex = options.indexOf(option);
    setSelectedOption(option);

    // '전체'가 아닌 경우 해당 카테고리에 해당하는 투표만 필터링하여 업데이트
    const filteredVotes =(selectedIndex != 0) ?
      voteList.body.voteInfoList.filter(vote => vote.categoryId === selectedIndex) :
      voteList.body.voteInfoList;
    setVotes(filteredVotes);

    // 드롭다운을 닫음
    setIsOpen(false);
  };

  // ------------------ Swiper 업데이트 함수 ------------------
  useEffect(() => {
    const swiperInstance = document.querySelector('.mySwiper').swiper;
    swiperInstance.on('slideChange', () => {
      setActiveSlide(swiperInstance.activeIndex);
    });
  
    return () => {
      swiperInstance.off('slideChange');
    };
  }, []);


  // --------------------------------- css 시작 ---------------------------------

  // ----------- flex 컨테이너 스타일 -----------
  const flexContainerStyle = {
    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
  };

  // ----------- 소제목 스타일 -----------
  const subTitleStyle = {
    // 디자인
    marginTop:
      isXLarge ? "6px" :
      isLarge ? "5px" :
      isMedium ? "4px" : "3px",
    marginRight:
      isXLarge ? "30px" :
      isLarge ? "20px" :
      isMedium ? "10px" : "5px",
  };
  
  // ----------- 드롭다운 컨테이너 스타일 -----------
  const dropdownContainerStyle = {
    ...flexContainerStyle,

    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    width:
      isXLarge ? "1000px" :
      isLarge ? "740px" :
      isMedium ? "470px" : "375px",
  }

  // ----------- 드롭다운 버튼 스타일 -----------
  const dropdownButtonStyle = {
    // 상속
    ...flexContainerStyle,
    
    // 디자인
    padding:
      isXLarge ? "0 12px" :
      isLarge ? "0 10px" :
      isMedium ? "0 8px" : "0 6px",
    paddingTop:
      isXLarge ? "4px" :
      isLarge ? "3px" :
      isMedium ? "2px" : "1px",
    width:
      isXLarge ? "180px" :
      isLarge ? "150px" :
      isMedium ? "120px" : "100px",
    height:
      isXLarge ? "56px" :
      isLarge ? "49px" :
      isMedium ? "42px" : "35px",
    borderRadius: "4px",
    backgroundColor: "#FFFFFF",

    // 컨텐츠 정렬
    justifyContent: "space-between",
  };

  // ----------- 드롭다운 메뉴 스타일 -----------
  const dropdownMenuStyle = {
    // 상속
    ...flexContainerStyle,

    // 위치
    position: "absolute",
    left:
    isXLarge ? "190px" :
    isLarge ? "158px" :
    isMedium ? "126px" : "104px",
    top: "0",
    zIndex: 50,

    // 디자인
    padding:
      isXLarge ? "0 12px" :
      isLarge ? "0 10px" :
      isMedium ? "0 8px" : "0 6px",
    borderRadius: "4px",
    backgroundColor: "#FFFFFF",
  };

  // ----------- 드롭다운 아이템 스타일 -----------
  const dropdownItemStyle = {
    // 상속
    ...flexContainerStyle,
    
    // 디자인
    margin:
      isXLarge ? "10px 0" :
      isLarge ? "8px 0" :
      isMedium ? "6px 0" : "4px 0",
    padding:
      isXLarge ? "0 12px" :
      isLarge ? "0 10px" :
      isMedium ? "0 8px" : "0 6px",
    paddingTop:
      isXLarge ? "4px" :
      isLarge ? "3px" :
      isMedium ? "2px" : "1px",
    width:
      isXLarge ? "120px" :
      isLarge ? "100px" :
      isMedium ? "60px" : "45px",
    height:
      isXLarge ? "36px" :
      isLarge ? "33px" :
      isMedium ? "30px" : "27px",
    cursor: "pointer",
  };

  // ----------- 마지막(전자제품) 아이템 스타일 -----------
  const lastItemStyle = {
    // 상속
    ...dropdownItemStyle,
    
    // 디자인
    width:
      isXLarge ? "120px" :
      isLarge ? "100px" :
      isMedium ? "71px" : "60px",
  };

  // ----------- Swiper 스타일 -----------
  const SwiperSlideStyle = {
    width:
      isXLarge ? "1000px" :
      isLarge ? "740px" :
      isMedium ? "470px" : "375px",
    // height:
    //   isXLarge ? "800px" :
    //   isLarge ? "49px" :
    //   isMedium ? "42px" : "35px",
  }

  // --------------------------------- css 끝 ---------------------------------


  return (
    <>
      <div className="pt-10">

        {/* ------------------ 드롭다운 ------------------ */}
        <div style={dropdownContainerStyle}>
          <div className="relative cursor-pointer">
            
            {/* 드롭다운 버튼 */}
            <div
              style={dropdownButtonStyle}
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* 선택된 옵션 */}
              <a className="fontsize-sm">
                {selectedOption || '카테고리 선택'}
              </a>

              {/* 화살표 */}
              {isOpen ?
                (<span className="fontsize-sm">&lt;</span>) :
                (<span className="fontsize-sm">&gt;</span>)
              }
            </div>

            {/* 드롭다운 메뉴 */}
            {isOpen && (
              <div style={dropdownMenuStyle} className="shadow-xl">
                {options.map((option, index) => (
                  <a
                    key={index}
                    style={{
                      ...((index === 4) ? lastItemStyle : dropdownItemStyle),
                    }}
                    className="fontsize-sm"
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#FFE69C"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#FFFFFF"}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </a>  
                ))}
              </div>
            )}

          </div>
        </div>

        {/* ------------------ Swiper ------------------ */}
        <Swiper
          key="swiper-instance"
          effect={'coverflow'}
          grabCursor={true}
          spaceBetween={50} // 여기를 조절하여 좌우 여백을 변경
          centeredSlides={true}
          navigation={true} // 네비게이션(화살표 버튼)
          slidesPerView={'auto'}
          loop={false}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Navigation, HashNavigation]}
          className="mySwiper"
          style={{ padding: '30px' }}
        >
          {votes.map((vote) => (
            <SwiperSlide 
              key={vote.voteId} 
              data-hash={vote.voteId} 
              style={SwiperSlideStyle}
            >
              <div>
                <VoteCard
                  key={`${vote.voteId}-card`}
                  vote={vote}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </>
  );
};

export default SwipeVote;