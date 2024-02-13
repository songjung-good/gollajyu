// 리액트 및 훅/라이브러리
import React, { useState } from 'react';

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// Material-UI의 Container 컴포넌트
import { Container } from '@mui/system';

// 커스텀 스토어를 이용한 상태 관리
import useAuthStore from "/src/stores/userState";

// 카테고리 데이터 불러오기
import categoryData from '/src/stores/categoryData';

// 각 투표에 관한 정보를 받아서 출력하는 곳
const VoteCardItem = (props) => {

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();
  
  // Props에서 필요한 값 추출
  const { item, categoryId, voteId, onClick, totalCount, count, selectedVoteItem } = props;

  // 로그인한 사용자 정보 가져오기
  const user = useAuthStore((state) => state.user);

  // console.log(categoryData[categoryId].tags) 호버하면 얘네가 왜 출력될까??
  // console.log(isSelect, clicked, "cliked")
  
  // 선택된 카테고리의 태그 가져오기
  const selection = categoryData[categoryId].tags;

  // 상태 변수 선언
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(0);
  const [memberId, setMemberId] = useState(0);
  const voteItemId = item.voteItemId;
  const doVote = useAuthStore((state) => state.doVote);

  // console.log(categoryData[categoryId].tags) 호버하면 얘네가 왜 출력될까??
  // console.log(isSelect, clicked, "cliked")

  // 투표하기 기능
  const onTagClick = (index) => {
    // console.log("onTagClick"+index)
    const dto = {
      memberId: user.memberId,
      voteId: voteId,
      voteItemId: voteItemId,
      categoryId: categoryId,
      tagId: (categoryId - 1) * 5 + index + 1,
    };


    // Send axios request
    axios
      .post(API_URL + "/votes/choices", dto)
      .then((response) => {
        // Handle success
        console.log("Axios request successful:", response.data);
        doVote(); // 투표하면 2포인트 증가
      })
      .catch((error) => {
        // Handle error
        console.error("Axios request failed:", error);
      });
  };

  // TODO: 비로그인 상태에서 로그인 창 띄우기


  return (
    <>
      <div style={{ maxWidth: "280px" }} className="flex flex-col w-full h-full">
        {" "}
        {/* 높이를 조정했습니다. */}
        {/* 이미지를 띄워지는 배경 */}
        <Container
          className="h-4/5 w-full p-2 relative rounded-xl"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{ maxWidth: "100%" }}
        >
          {/* 호버 시 */}
          {((selectedVoteItem === 0) && hover) ? (
            <div
              className={`absolute inset-0 w-full bg-orange-200 opacity-50 rounded-xl flex flex-col justify-between`}
              onMouseLeave={() => {}}
            >
              {/* 선택지의 묶음 */}
              {selection.map((tag, index) => (
                <button
                  key={index}
                  className={`h-1/5 w-full flex items-center justify-center cursor-pointer ${
                    (clicked - 1 === index)
                      ? "text-white bg-blue-500"
                      : "text-black"
                  } border-t-2 border-white text-max-xl`}
                  onClick={() => {
                    if (clicked === 0 && user.memberId != null) {
                      setClicked(index + 1);
                      onTagClick(index);
                      onClick(voteItemId);
                    } else {
                    }
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          ) : (selectedVoteItem === voteItemId) ?
          (<div>
            당신이 선택한 아이템
          </div>
            ) : null}

          {/* 투표 이미지 */}
          <img
            className="h-full w-full object-cover"
            alt="Vote Image"
            src={item.voteItemImgUrl}
          />
        </Container>
        {/* 버튼을 누르면 생기는 상세페이지 */}
        <div className="h-1/3 w-full flex flex-col justify-center items-center">
          <p>
          {selectedVoteItem !== 0 ? `${(count / totalCount * 100).toFixed(2)}%` : '%'}
          </p>
          <h2 className="text-lg font-bold mb-2">
            {item.price ? `${item.price.toLocaleString()}원` : ""}
          </h2>
          <p>{item.voteItemDesc}</p>
        </div>
      </div>
    </>
  );
}

export default VoteCardItem;
