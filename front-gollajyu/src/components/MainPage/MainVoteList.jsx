// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";


// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

const MainVoteList = ({ transferVoteId }) => {

  // ----------- 반응형 웹페이지 구현 -----------
  const isXLarge = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const isLarge = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023.98px)",
  });
  const isMedium = useMediaQuery({
    query: "(min-width:480px) and (max-width:767.98px)",
  });
  const isSmall = useMediaQuery({
    query: "(max-width:479.98px)",
  });
  
  const [listsData, setListsData] = useState([]);

  // 메인페이지로 값 전송
  const openVoteDetailModal = (voteId) => {
    transferVoteId(voteId)
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
