import React, { useState, useEffect } from 'react';
// 스와이퍼
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { EffectCoverflow, Navigation, HashNavigation } from 'swiper/modules';
// 투표
import VoteCard from '../vote/VoteCard';


export default function SwipeVote() {
    // 드롭다운 옵션
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ['의류', '신발', '가구', 'ㅁㅇ'];
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

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

  // 필요한 데이터 
  const votes = [
    {
      id: 1,
      options: [
        { id: 'a1', image: 'image1.png', title: '옵션 1' },
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
    <div className="pt-10">
      {/* 드롭다운 */}
      <div className="relative cursor-pointer w-40">  
        <div
          className={`flex items-center justify-between space-x-5 px-4 rounded-full ${isOpen ? 'bg-orange-500' : 'bg-white'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <a className="menu-hover my-2 py-2 text-base font-medium text-black lg:mx-4">
          {selectedOption || '카테고리'}
          </a>
          {/* 화살표 */}
          <span>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </div>
        {isOpen && (
          <div className="absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl">
            {options.map((option, index) => (
              <a key={index} className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2" onClick={() => handleOptionClick(option)}>
                {option}
              </a>  
            ))}
          </div>
        )}
      </div>
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
          <SwiperSlide 
            key={vote.id} 
            data-hash={vote.id} 
            style={{ width: '1024px' }}
          >
            <div>
              <VoteCard
                key={vote.id}
                options={vote.options}
                selectedOption={selectedOption}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
