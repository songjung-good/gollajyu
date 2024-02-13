// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from 'react';

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 커스텀 스토어를 이용한 상태 관리
import useModalStore from "/src/stores/modalState";

// import { Link } from "react-router-dom";
// import { Responsive } from 'react-responsive';


const MainVoteList = () => {
  
  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();

  // 투표 목록 데이터 상태
  const [listsData, setListsData] = useState([]);
  
  // 투표 상세 모달 열기 함수 가져오기
  const setVoteDetailModalOpen = useModalStore(
    (state) => state.setVoteDetailModalOpen
  );

  const openVoteDetailModal = (voteId) => {
    setVoteDetailModalOpen();
    // VoteDetail 컴포넌트가 외부에서 voteId를 받을 수 있도록 전달합니다.
    console.log("VoteDetail 컴포넌트로 voteId 전달:", voteId); // 전달 방법은 상황에 따라 조정
  };

  useEffect(() => {
    // API를 통해 투표 정보를 가져옵니다.
    axios.get(`${API_URL}/votes/ranks`).then((response) => {
      const sortedVotes = response.data.body;
      const lists = [
        {
          key: 0,
          subject: "좋아요 순",
          items: sortedVotes.sortByLikes.slice(0, 5).map((item) => ({
            ...item,
            title: item.title,
            likesCnt: item.likesCnt,
            totalChoiceCnt: item.totalChoiceCnt,
            voteId: item.voteId,
            memberId: item.memberId,
          })),
        },
        {
          key: 1,
          subject: "참여자 순",
          items: sortedVotes.sortByVoter.slice(0, 5).map((item) => ({
            ...item,
            title: item.title,
            likesCnt: item.likesCnt,
            totalChoiceCnt: item.totalChoiceCnt,
            voteId: item.voteId,
            memberId: item.memberId,
          })),
        },
        {
          key: 2,
          subject: "최신순",
          items: sortedVotes.sortByNew.slice(0, 5).map((item) => ({
            ...item,
            title: item.title,
            likesCnt: item.likesCnt,
            totalChoiceCnt: item.totalChoiceCnt,
            voteId: item.voteId,
            memberId: item.memberId,
          })),
        },
        {
          key: 3,
          subject: "박빙투표",
          items: sortedVotes.sortByClose.slice(0, 5).map((item) => ({
            ...item,
            title: item.title,
            likesCnt: item.likesCnt,
            totalChoiceCnt: item.totalChoiceCnt,
            voteId: item.voteId,
            memberId: item.memberId,
          })),
        },
      ];
      setListsData(lists);
    });
  }, []);


  // --------------------------------- css 시작 ---------------------------------

  // ----------- 문구 컨테이너 스타일 -----------
  const textContainerStyle = {
    // 디자인
    marginBottom: isXLarge || isLarge ? "50px" : "20px",
    padding: "0 20px",
    width: "100%",

    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }

  // ----------- 보조 제목 스타일 -----------
  const subTitleStyle = {
    // 디자인
    marginBottom: "20px",
    padding: "8px 20px 4px",
    width: isXLarge || isLarge ? "500px" : "350px",
    backgroundColor: "#FFA8A8",

    // 글자
    fontSize: isXLarge || isLarge ? "32px" : "24px",
    fontWeight: "bold",
  }

  // ----------- 설명 스타일 -----------
  const descriptionStyle = {
    // 글자
    fontSize: isXLarge || isLarge ? "22px" : "14px",
    color: "#4A4A4A",
  }
  
  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    width:
      isXLarge ? "1000px" :
      isLarge ? "740px" :
      isMedium ? "470px" : "375px",
  };

  // ----------- 투표 리스트 컨테이너 스타일 -----------
  const voteListContainerStyle = {
    // 디자인
    marginTop:
      isXLarge ? "50px" :
      isLarge ? "40px" :
      isMedium ? "30px" : "20px",
    padding: "10px",
    width: isXLarge || isLarge ? "45%" : "90%",

  }

  // ----------- 버튼 스타일 -----------
  const buttonStyle = {
    // 디자인
    width: "100%",

    // 컨텐츠 정렬
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }

  // ----------- 좋아요 스타일 -----------
  const likeStyle = {
    // 디자인
    marginRight:
      isXLarge ? "10px" :
      isLarge ? "8px" :
      isMedium ? "6px" : "4px",

    // 글자
    color: "#FF595E",
  }

  // --------------------------------- css 끝 ---------------------------------


  return (
    <>
      <div style={textContainerStyle}>
        <p style={subTitleStyle}># 핫한 투표 리스트</p>
        <p style={descriptionStyle}>어떤 투표들이 인기있는지 확인해보아요</p>
      </div>
      <div style={bodyStyle} className="flex flex-wrap justify-center gap-6">
        {listsData.map((data, index) => (
          <div
            key={data.key}
            style={voteListContainerStyle}
            className="border-t-2 border-amber-400"
          >
            <div className="flex items-center justify-between border-b border-gray-300 pb-2">
              <p className="font-bold fontsize-md">{data.subject}</p>
              <div className="flex items-center justify-center w-10">
                <p>📝</p>
              </div>
            </div>
            <ul className="flex flex-col">
              {data.items.map((item) => (
                <li key={item.voteId} className="border-b border-gray-300">
                  <button
                    style={buttonStyle}
                    onClick={() => openVoteDetailModal(item.voteId)}
                    className="hover:bg-gray-200 py-2"
                  >
                    <div className="flex items-center">
                      <p style={likeStyle} className="fontsize-xs">❤ {item.likesCnt}</p>
                      <p className="fontsize-sm">{item.title}</p>
                    </div>
                    <div className="flex items-center justify-center w-10">
                      <p className="fontsize-xs text-gray-500">{item.totalChoiceCnt}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainVoteList;
