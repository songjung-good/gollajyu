import React from "react";
import MainVoteList from "../components/MainVoteList"
import MainWord from "../components/MainWord";
import SwipeVote from "../components/SwipeVote";
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
    </>
  );
};

export default MainPage;
