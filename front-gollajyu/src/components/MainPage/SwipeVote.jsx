import React, { useState, useEffect } from 'react';
// 스와이퍼
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { EffectCoverflow, Navigation, HashNavigation } from 'swiper/modules';
// 투표
import VoteCard from '../vote/VoteCard';

// 임시 사진
import image1 from '/favicon1.png';


export default function SwipeVote( props ) {
  const { voteList } = props;
  console.log("swipe"+voteList.body.data)
  const [votes, setVotes] = useState(voteList.body.voteInfoList);
  // 슬라이드 기능
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const swiperInstance = document.querySelector('.mySwiper').swiper;

    swiperInstance.on('slideChange', () => {
      setActiveSlide(swiperInstance.activeIndex);
    });
  
    return () => {
      swiperInstance.off('slideChange');
    };
  }, []);

  return (
    <div className="py-10">
      <Swiper
        key="swiper-instance"  // Add a unique key here
        // width={1280}
        effect={'coverflow'}
        grabCursor={true}
        spaceBetween={50} // 여기를 조절하여 좌우 여백을 변경
        centeredSlides={true}
        navigation={true} // 네비게이션(화살표 버튼)
        slidesPerView={'auto'}
        loop={true}
        // breakpoints-480={spaceBetween=20}
        // breakpoints-640={spaceBetween=30}
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
            style={{ width: '1024px' }}
          >
            <div>
              <VoteCard
                key={`${vote.voteId}-card`}  // Use a different key for VoteCard
                vote={vote}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
