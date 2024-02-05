import React from "react";
import VotePageList from "../components/vote/VotePageList";
import VotePageHeader from "../components/vote/VotePageHeader";
import TmpModal from "../components/TmpModal"; // 임시 모달
import useModalStore from "../stores/modalState";

const VotePage = () => {
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
      <VotePageHeader />
      <VotePageList />
      {isVoteDetailModalOpened && <TmpModal></TmpModal>}
      {isVoteSimpleCreateModalOpened && <TmpModal></TmpModal>}
      {isVoteProductCreateModalOpened && <TmpModal></TmpModal>}
    </div>
  );
};

export default VotePage;
