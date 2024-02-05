import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { EffectCoverflow, Navigation, HashNavigation } from 'swiper/modules';
import VoteCard from '../vote/VoteCard';

// 임시 사진
import image1 from '/favicon1.png';

export default function SwipeVote() {
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

  // 임시데이터
  const votes = [
    {
      id: 1,
      options: [
        { id: 'a1', image: image1, title: '옵션 1' },
        { id: 'a2', image: 'image2.png', title: '옵션 2' },
        { id: 'a3', image: 'image3.png', title: '옵션 3' },
      ],
    },
    {
        id: 2,
        options: [
          { id: 'a1', image: 'image1.png', title: '옵션 1' },
          { id: 'a2', image: 'image2.png', title: '옵션 2' },
          { id: 'a3', image: 'image3.png', title: '옵션 3' },
          { id: 'a3', image: 'image3.png', title: '옵션 3' },
        ],
      },
    {
      id: 3,
      options: [
        { id: 'a1', image: 'image1.png', title: '옵션 1' },
        { id: 'a3', image: 'image3.png', title: '옵션 3' },
      ],
    },
    // 추가 투표 데이터
    // ...
  ];

  return (
    <div className="py-10">
      <Swiper
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
          <SwiperSlide key={vote.id} data-hash={vote.id} style={{ width: '1024px' }}>
            <div>
              <VoteCard 
                key={vote.id}
                options={vote.options}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
