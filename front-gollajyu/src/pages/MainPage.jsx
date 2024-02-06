import React, { useState, useEffect } from 'react';
import MainVoteList from "../components/MainPage/MainVoteList";
import MainWord from "../components/MainPage/MainWord";
import SwipeVote from "../components/MainPage/SwipeVote";
import useModalStore from "../stores/modalState";
import useAuthStore from "../stores/userState";
import LoginModal from "../components/LoginForm";
import SignupModal from "../components/SignupForm";
import TmpModal from "../components/TmpModal"; // 임시 모달

import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../stores/apiURL';

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
  
  const user = useAuthStore((state) => state.user);
  const categoryId = 0;
  const [voteListData, setVoteListData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  // Function to fetch data using axios
const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/votes`,
    {params: {
      categoryId: categoryId,
      memberId: (user) ? user.memberId : null
    }
  });
    setVoteListData(response.data)
    setIsLoading(false); // 데이터를 가져온 후 로딩 상태를 false로 설정
    console.log('Data:', response.data);
  } catch (error) {
    console.error('Axios request error:', error);
    setIsLoading(false); // 에러 발생 시 로딩 상태를 false로 설정
  }
};

useEffect(() => {
  // Fetch data when the page is turned on
  fetchData();
}, []); // Empty dependency array ensures it runs only once when the component mounts



  // TODO 비로그인 사용자가 메인에서 무엇을 누르든 로그인창이 뜨도록 처리
  const handleClick = () => {
    if (!isLoggedIn) {
      setLoginModalOpen();
    }
  };
  return (
    <>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-gradient-to-tl from-blue-400 to-red-400">
            <MainWord />
            <SwipeVote voteList={voteListData} />
          </div>
        )}
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
