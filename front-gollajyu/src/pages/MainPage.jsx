import React from "react";
import MainVoteList from "../components/MainPage/MainVoteList";
import MainWord from "../components/MainPage/MainWord";
import SwipeVote from "../components/MainPage/SwipeVote";
import useModalStore from "../stores/modalState";
import useAuthStore from "../stores/userState";
import LoginModal from "../components/LoginForm";
import SignupModal from "../components/SignupForm";
import TmpModal from "../components/TmpModal"; // 임시 모달

const MainPage = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isLoginModalOpened = useModalStore((state) => state.isLoginModalOpened);
  const isSignupModalOpened = useModalStore(
    (state) => state.isSignupModalOpened
  );
  const isVoteDetailModalOpened = useModalStore(
    (state) => state.isVoteDetailModalOpened
  );
  const isVoteSimpleCreateModalOpened = useModalStore(
    (state) => state.isVoteSimpleCreateModalOpened
  );
  const isVoteProductCreateModalOpened = useModalStore(
    (state) => state.isVoteProductCreateModalOpened
  );
  const setLoginModalOpen = useModalStore((state) => state.setLoginModalOpen);

  // TODO 비로그인 사용자가 메인에서 무엇을 누르든 로그인창이 뜨도록 처리
  const handleClick = () => {
    if (!isLoggedIn) {
      setLoginModalOpen();
    }
  };
  return (
    <>
      <div>
        <div className="bg-gradient-to-tl from-blue-400 to-red-400">
          <MainWord />
          <SwipeVote />
        </div>
        <MainVoteList />
      </div>
      {isLoginModalOpened && <LoginModal></LoginModal>}
      {isSignupModalOpened && <SignupModal></SignupModal>}
      {isVoteDetailModalOpened && <TmpModal></TmpModal>}
      {isVoteSimpleCreateModalOpened && <TmpModal></TmpModal>}
      {isVoteProductCreateModalOpened && <TmpModal></TmpModal>}
    </>
  );
};

export default MainPage;
