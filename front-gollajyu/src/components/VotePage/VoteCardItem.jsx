// 리액트 및 훅/라이브러리
import React, { useEffect, useState } from "react";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// Material-UI의 Container 컴포넌트
import { Container } from "@mui/system";

// 커스텀 스토어를 이용한 상태 관리
import useAuthStore from "/src/stores/userState";

// 카테고리 데이터 불러오기
import categoryData from "/src/stores/categoryData";

// 각 투표에 관한 정보를 받아서 출력하는 곳
const VoteCardItem = (props) => {
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // Props에서 필요한 값 추출
  const {
    item,
    categoryId,
    voteId,
    onClicked,
    totalCount,
    count,
    selectedVoteItem,
    voteItemLength,
  } = props;

  // 로그인한 사용자 정보 가져오기
  const user = useAuthStore((state) => state.user);
  const [selectedItem, setselectedItem] = useState(selectedVoteItem);
  // console.log(categoryData[categoryId].tags) 호버하면 얘네가 왜 출력될까??

  // 선택된 카테고리의 태그 가져오기
  const selection = categoryData[categoryId].tags;

  // 상태 변수 선언
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(0);
  const [memberId, setMemberId] = useState(0);
  const voteItemId = item.voteItemId;
  const doVote = useAuthStore((state) => state.doVote);
  useEffect(() => {
    setselectedItem(selectedVoteItem);
  }, [selectedVoteItem]);
  // console.log(categoryData[categoryId].tags) 호버하면 얘네가 왜 출력될까??

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
        // console.log("Axios request successful:", response.data);
        doVote(); // 투표하면 2포인트 증가
      })
      .catch((error) => {
        // Handle error
        console.error("Axios request failed:", error);
      });
  };

  return (
    <>
      <div className="flex flex-col">
        <div
          style={{
            marginLeft: "15px",
            height: "30px",
            color: "#FF6D6D",
            visibility: selectedItem === voteItemId ? "visible" : "hidden",
          }}
          className="fontsize-sm"
        >
          My Pick
        </div>
        <div
          style={{
            width:
              voteItemLength === 2
                ? isXLarge
                  ? "280px"
                  : isLarge
                  ? "220px"
                  : isMedium
                  ? "120px"
                  : "110px"
                : voteItemLength === 3
                ? isXLarge
                  ? "220px"
                  : isLarge
                  ? "160px"
                  : isMedium
                  ? "100px"
                  : "90px"
                : isXLarge
                ? "160px"
                : isLarge
                ? "130px"
                : isMedium
                ? "90px"
                : "70px",
            height: "289px",
            border: "5px solid",
            borderColor: selectedItem === voteItemId ? "#FF6D6D" : "white",
          }}
          className="flex flex-col w-full h-full"
        >
          {" "}
          {/* 높이를 조정했습니다. */}
          {/* 이미지를 띄워지는 배경 */}
          <Container
            className="w-full p-2 relative rounded-xl"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ maxWidth: "100%" }}
          >
            {/* 투표하는 기능 내부 */}
            {(selectedItem === 0 || !selectedItem || clicked !== 0) &&
            (hover || clicked !== 0) ? (
              <div
                className={`absolute inset-0 w-full bg-orange-200 opacity-50 flex flex-col justify-between`}
                onMouseLeave={() => {}}
              >
                {/* 선택지의 묶음 */}
                {selection.map((tag, index) => (
                  <button
                    key={index}
                    className={`h-1/5 w-full flex items-center justify-center cursor-pointer "text-black"
                    ${
                      clicked - 1 === index
                        ? "text-white bg-blue-500"
                        : "text-black"
                    }
                        border-t-2 border-white text-max-xl`}
                    onClick={() => {
                      if (clicked === 0 && user.memberId != null) {
                        setClicked(index + 1);
                        onTagClick(index);
                        onClicked(voteItemId);
                      } else {
                      }
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            ) : null}

            {/* 투표 이미지 */}
            <img
              className="mx-auto w-2/3 object-cover"
              alt="Vote Image"
              src={item.voteItemImgUrl}
            />
          </Container>
          {/* 버튼을 누르면 생기는 상세페이지 */}
          <div className="w-full flex flex-col justify-center items-center">
            {selectedItem !== 0 && selectedItem ? (
              <p className="fontsize-md pb-2">{`${(
                (count / totalCount) *
                100
              ).toFixed(2)}%`}</p>
            ) : (
              <p className="pb-2 fontsize-sm text-center invisible">
                투표 참여 시, 선택 비율이 공개됩니다.
              </p>
            )}
            <h2 className="fontsize-sm font-bold">
              {item.price ? `${item.price.toLocaleString()}원` : ""}
            </h2>
            <p
              className="fontsize-xs pt-2"
              style={{ fontFamily: "GmarketSansLight", fontWeight: "bold" }}
            >
              {item.voteItemDesc.length > 20
                ? item.voteItemDesc.slice(0, 20) + "..."
                : item.voteItemDesc}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoteCardItem;
