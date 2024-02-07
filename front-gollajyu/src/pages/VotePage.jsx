import React, { useState } from "react";
import VotePageList from "../components/vote/VotePageList";
import VotePageHeader from "../components/vote/VotePageHeader";
import TmpModal from "../components/TmpModal"; // 임시 모달
import VoteButton from "../components/VoteButton";
import useModalStore from "../stores/modalState";
import API_URL from "../stores/apiURL";
import axios from "axios";

const VotePage = () => {
  // 정렬 상태
  const [sortType, setSortType] = useState(null);
  // 정렬 함수
  const handleSort = (type) => {
    setSortType(type);
  };

  // 검색 카테고리
  const [searchCategory, setSearchCategory] = useState();

  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState("");
  // 검색 함수
  const handleSearch = () => {
    fetchData(searchCategory, searchTerm);
    console.log(searchCategory, searchTerm)
  };


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
      <VotePageList sortType={sortType} searchTerm={searchTerm} />{" "}
      {/* 정렬 상태를 props로 전달 */}
      {isVoteDetailModalOpened && <TmpModal></TmpModal>}
      {isVoteSimpleCreateModalOpened && <TmpModal></TmpModal>}
      {isVoteProductCreateModalOpened && <TmpModal></TmpModal>}
    </div>
  );
};

export default VotePage;
