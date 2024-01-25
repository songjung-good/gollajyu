import React, { useState, useEffect } from 'react';
// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
// 투표 받아오기
import VoteCard from "./VoteCard";
// import required modules
import { EffectCoverflow, Navigation, HashNavigation } from 'swiper/modules';

export default function SwipeVote() {
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
    <div className="py-7 px-7">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        spaceBetween={30}
        centeredSlides={true}
        navigation={true}
        slidesPerView={'auto'}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Navigation, HashNavigation]}
        className="mySwiper"
        style={{ padding: '30px', height: 'calc(100% + 60px)' }}
      >
        {['slide1', 'slide2', 'slide3'].map((hash, index) => (
          <SwiperSlide key={hash} data-hash={hash}>
            <div>
              <VoteCard />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
