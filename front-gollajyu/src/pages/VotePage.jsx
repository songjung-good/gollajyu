import React, { useState } from "react";
import VotePageList from "../components/vote/VotePageList";
import VotePageHeader from "../components/vote/VotePageHeader";
import TmpModal from "../components/TmpModal"; // 임시 모달
import VoteButton from "../components/VoteButton";
import useModalStore from "../stores/modalState";

const VotePage = () => {
  // 정렬 상태
  const [sortType, setSortType] = useState(null);
  // 정렬 함수
  const handleSort = (type) => {
    setSortType(type);
  };

  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState("");
  // 검색 함수
  const handleSearch = (term) => {
    setSearchTerm(term);
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
      <VotePageHeader onSort={handleSort} onSearch={handleSearch} />{" "}
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
