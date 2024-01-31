import React from "react";
import MainVoteList from "../components/MainVoteList"
import MainWord from "../components/MainWord";
import SwipeVote from "../components/SwipeVote";
import PostsGrid from "../components/MainVoteList";
import useModalStore from "../stores/modalState";
import useAuthStore from "../stores/userState";
import LoginModal from "../components/LoginForm";
import SignupModal from "../components/SignupForm";

const MainPage = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isLoginModalOpened = useModalStore((state) => state.isLoginModalOpened);
  const isSignupModalOpened = useModalStore(
    (state) => state.isSignupModalOpened
  );
  const setLoginModalOpen = useModalStore((state) => state.setLoginModalOpen);

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
      <div>
        <h1>This is the Main Page</h1>
        <p>이 곳은 메인 페이지 입니다.</p>
        <SwipeVote />
        <PostsGrid />
      </div>
    </>
  );
};

export default MainPage;
