import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// 이미지파일
import voteexample1 from "/@images/voteexample1.PNG";
import voteexample2 from "/@images/voteexample2.PNG";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function SwiperVote() {
    const swiperStyles = {
        width: '100%',
        height: '100%',
        margin: '20px auto',
    };
  
    const slideStyles = {
      textAlign: 'center',
      fontSize: '18px',
      background: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  
    const slideImageStyles = {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    };
  
    const [swiper, setSwiper] = useState(null);
  
    const handleSwiperRef = (ref) => {
      setSwiper(ref);
    };
  
    return (
      <>
        <Swiper
          onSwiper={handleSwiperRef}
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            type: 'fraction',
          }}
          navigation={true}
          className="mySwiper"
          style={swiperStyles}
        >
          <SwiperSlide style={slideStyles}>
            <img src={voteexample2} alt="Slide 1" style={slideImageStyles} />
          </SwiperSlide>
          <SwiperSlide style={slideStyles}>
            <img src={voteexample1} alt="Slide 2" style={slideImageStyles} />
          </SwiperSlide>
          <SwiperSlide style={slideStyles}>
           <img src={voteexample2} alt="Slide 1" style={slideImageStyles} />
          </SwiperSlide>
          <SwiperSlide style={slideStyles}>
            <img src={voteexample1} alt="Slide 2" style={slideImageStyles} />
          </SwiperSlide>
        </Swiper>
      </>
    );
  }