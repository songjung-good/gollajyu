import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { EffectCoverflow, Navigation, HashNavigation } from 'swiper/modules';
import SwipeCard from "./SwipeCard";

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
    <div className="py-7 px-7" style={{ margin: '-15px' }}>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        spaceBetween={50} // 여기를 조절하여 좌우 여백을 변경
        centeredSlides={true}
        navigation={true}
        slidesPerView={'auto'}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Navigation, HashNavigation]}
        className="mySwiper"
        style={{ padding: '30px', height: 'calc(100% + 60px)' }}
      >
        {['slide1', 'slide2', 'slide3'].map((hash, index) => (
          <SwiperSlide key={hash} data-hash={hash} style={{ width: '1024px' }}>
            <div>
              <SwipeCard />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
