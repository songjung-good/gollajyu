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

  // ----------- Swiper 스타일 -----------
  const swiperStyle = {
    // 디자인
    paddingTop: '60px',
    paddingBottom: '60px',
  }
  
  // ----------- Swiper Slide 스타일 -----------
  const swiperSlideStyle = {
    // 디자인
    maxWidth: "1200px",
    padding: "0 20px",
    minWidth: "240px",
    height: "484px",

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "center",
  }

  // ----------- vote Card  스타일 -----------
  const voteCardStyle = {
    width: "100%",
  }

  // --------------------------------- css 끝 ---------------------------------


  return (
    <>
      {/* ------------------ Swiper ------------------ */}
      <Swiper
        key="swiper-instance"
        effect={'coverflow'}
        grabCursor={true}
        spaceBetween={70} // 여기를 조절하여 좌우 여백을 변경
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
        style={swiperStyle}
      >
        {votes.map((vote) => (
          <SwiperSlide 
            key={vote.voteId} 
            data-hash={vote.voteId} 
            style={swiperSlideStyle}
          >
            <div style={voteCardStyle}>
              <VoteCard
                key={`${vote.voteId}-card`}
                vote={vote}
              />
            </div>
            
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwipeVote;