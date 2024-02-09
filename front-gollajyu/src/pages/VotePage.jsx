import React, { useEffect, useState, useRef } from "react";
import VotePageList from "../components/VotePage/VotePageList";
import VotePageHeader from "../components/VotePage/VotePageHeader";
import TmpModal from "../components/TmpModal"; // 임시 모달
import VoteSimple from "../components/VotePage/VoteSimple";
import VoteProduct from "../components/VotePage/VoteProduct";
import VoteButton from "../components/VoteButton";
import useModalStore from "../stores/modalState";
import API_URL from "../stores/apiURL";
import axios from "axios";
import useAuthStore from "../stores/userState";

const VotePage = () => {
  const user = useAuthStore((state) => state.user);
  const [voteListData, setVoteListData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [prevVoteList, setPrevVoteList] = useState();


// 정렬 함수
  const handleSort = (type) => {
    try {
      let sortedData;
      if (type === 'popular') {
        sortedData = voteListData.slice().sort((a, b) => b.likesCnt - a.likesCnt);
      } else {
        sortedData = prevVoteList;
      }
      setVoteListData(sortedData);
    } catch (error) {
      console.error('정렬 또는 검색 중 오류 발생:', error);
    }
  };

  // 검색 카테고리
  const [searchCategory, setSearchCategory] = useState(0);

  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState(null);
  // 검색 함수
  const handleSearch = async () => {
    try {
      const searchData = await fetchData(searchCategory, searchTerm);
      await setVoteListData(searchData.body.voteList);
      await setPrevVoteList(searchData.body.voteList);
      setIsLoading(false);
      console.log(searchCategory, searchTerm);
    } catch (error) {
      // 오류 처리
      console.error('데이터 가져오기 실패:', error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // Fetch data when the page is turned on
    handleSearch();
    console.log("렌더링");
  }, []);


// searchCategory와 searchTerm을 매개변수로 받는 함수
const fetchData = async (categoryId, keyword) => {
  try {
    // GET 요청 보내기
    const response = await axios.get(`${API_URL}/votes/search`, {
      params: {
        categoryId: categoryId, // 클라이언트 파라미터명을 서버의 요청 핸들러 메서드 파라미터명에 맞춤
        keyword: keyword // 클라이언트 파라미터명을 서버의 요청 핸들러 메서드 파라미터명에 맞춤
      }
    });
    // 성공적으로 받은 데이터 처리
    console.log('데이터 가져오기 성공:', response.data);
    return response.data; // 요청한 데이터 반환
  } catch (error) {
    // 오류 처리
    console.error('데이터 가져오기 실패:', error);
    throw error; // 오류 다시 던지기
  }
};



  // ------------- 투표 생성 버튼 모달과 관련된 함수 -----------
  const isVoteDetailModalOpened = useModalStore(
    (state) => state.isVoteDetailModalOpened
  );
  const isVoteSimpleCreateModalOpened = useModalStore(
    (state) => state.isVoteSimpleCreateModalOpened
  );
  const isVoteProductCreateModalOpened = useModalStore(
    (state) => state.isVoteProductCreateModalOpened
  );



  return (
    <div>
      <VoteButton />
      <VotePageHeader onSort={handleSort} onSearchTerm={setSearchTerm} onSearchCategory={setSearchCategory} onSearch={handleSearch} />{" "}
      {/* 정렬 함수를 props로 전달 */}
      <div>
      {isLoading ? (
          <p>Loading...</p>
        ) : (
        <div><VotePageList voteList={voteListData}/>{" "}
        </div>
        )
      }</div>
      {/* 정렬 상태를 props로 전달 */}
      {isVoteDetailModalOpened && <TmpModal></TmpModal>}
      {isVoteSimpleCreateModalOpened && <VoteSimple></VoteSimple>}
      {isVoteProductCreateModalOpened && <VoteProduct></VoteProduct>}
    </div>
  );
};

export default VotePage;
