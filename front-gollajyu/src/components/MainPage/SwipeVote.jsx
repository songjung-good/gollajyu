// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from "react";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// Swiper 라이브러리 및 스타일
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, HashNavigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

// 투표 컴포넌트
import VoteCard from "../VotePage/VoteCard";

const SwipeVote = (props) => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // 부모 컴포넌트로부터 투표 목록 전달 받음
  const { voteList, isLastPage, increasePageNo } = props;
  // console.log("마지막 페이지니?", isLastPage);

  // 슬라이드 관련 상태 -> 안씀
  const [activeSlide, setActiveSlide] = useState(0);

  // ------------------ Swiper 업데이트 함수 ------------------
  useEffect(() => {
    const swiperInstance = document.querySelector(".mySwiper").swiper;
    swiperInstance.on("slideChange", () => {
      setActiveSlide(swiperInstance.activeIndex);
      // console.log("지금:", swiperInstance.activeIndex, "/", voteList.length);
      if (swiperInstance.activeIndex > voteList.length - 3 && !isLastPage) {
        // console.log("얼마 안남음");
        increasePageNo();
      } else if (
        isLastPage &&
        swiperInstance.activeIndex === voteList.length - 1
      ) {
        window.alert("더 이상 불러올 투표가 없어요");
      }
    });
    return () => {
      swiperInstance.off("slideChange");
    };
  }, [voteList]);

  // --------------------------------- css 시작 ---------------------------------

  // ----------- Swiper 스타일 -----------
  const swiperStyle = {
    // 디자인
    paddingTop: "60px",
    paddingBottom: "60px",
  };

  // ----------- Swiper Slide 스타일 -----------
  const getDynamicMaxWidth = () => {
    if (isXLarge) {
      return "70rem";
    } else if (isLarge) {
      return "60rem";
    } else if (isMedium) {
      return "50rem";
    } else {
      return "40rem";
    }
  };

  const getDynamicHeight = () => {
    if (isXLarge) {
      return "31rem";
    } else if (isLarge) {
      return "35rem";
    } else if (isMedium) {
      return "41rem";
    } else {
      return "48rem";
    }
  };

  const swiperSlideStyle = {
    // 디자인
    padding: "0 20px",
    maxWidth: getDynamicMaxWidth(),
    minWidth: "5rem",
    height: getDynamicHeight(),

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "center",
  };

  // ----------- vote Card  스타일 -----------
  const voteCardStyle = {
    width: "92.5%",
  };

  // --------------------------------- css 끝 ---------------------------------

  return (
    <>
      {/* ------------------ Swiper ------------------ */}
      <Swiper
        key="swiper-instance"
        effect={"coverflow"}
        grabCursor={true}
        spaceBetween={70} // 여기를 조절하여 좌우 여백을 변경
        centeredSlides={true}
        navigation={true} // 네비게이션(화살표 버튼)
        slidesPerView={"auto"}
        loop={false}
        speed={1000} // 슬라이드가 넘어가는데 필요한 최소 시간 설정(1초)
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
        {voteList.map((vote, index) => (
          <SwiperSlide
            key={vote.voteId}
            data-hash={vote.voteId}
            style={swiperSlideStyle}
          >
            <div style={voteCardStyle}>
              {activeSlide !== index ? (
                <div
                  id="block"
                  className="absolute z-10 w-5/6 rounded-3xl"
                  style={swiperSlideStyle}
                >
                  {" "}
                </div>
              ) : null}
              <VoteCard
                key={`${vote.voteId}-card`}
                liked={vote.liked}
                likesCnt={vote.likesCnt}
                chosenItemId={vote.chosenItemId}
                voteItemList={vote.voteItemList}
                voteId={vote.voteId}
                voteTitle={vote.voteTitle}
                categoryName={vote.categoryName}
                categoryId={vote.categoryId}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwipeVote;
