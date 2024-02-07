import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../stores/apiURL";
import MainVoteList from "../components/MainPage/MainVoteList";
import MainWord from "../components/MainPage/MainWord";
import SwipeVote from "../components/MainPage/SwipeVote";
import useModalStore from "../stores/modalState";
import useAuthStore from "../stores/userState";
import LoginModal from "../components/LoginForm";
import SignupModal from "../components/SignupForm";
import VoteButton from "../components/VoteButton";
import TmpModal from "../components/TmpModal"; // 임시 모달

import { Link } from 'react-router-dom';

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
  
  const user = useAuthStore((state) => state.user);
  // ------------- 로그인 관련 --------------------
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const setLoginModalOpen = useModalStore((state) => state.setLoginModalOpen);
  const setSignupModalOpen = useModalStore((state) => state.setSignupModalOpen);

  useEffect(() => {
    // gollajyu-cookie가 쿠키에 담겨 있으면, 소셜로그인을 한 사용자 -> 로직 처리 후, gollajyu-cookie 제거하기
    const isSocialLogin = document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("gollajyu-cookie="));

    if (isSocialLogin) {
      axios.get(API_URL + "/members/addInfo").then((res) => {
        // console.log(res.data.body);
        if (res.data.body.typeId) {
          const data = {
            email: res.data.body.email,
            password: "소셜 구글 로그인",
          };
          logIn(data);
          document.cookie =
            "gollajyu-cookie" +
            "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } else {
          // 회원가입 시켜
          window.alert("신규 가입자입니다. 회원가입을 진행해주세요.");
          setSignupModalOpen();
        }
      });
    }
  })

  const logIn = (data) => {
    axios
      .post(API_URL + "/members/login", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("로그인 완료");
        console.log(response);
        setLoggedIn(response.data.body);
      })
      .catch((err) => {
        console.log("로그인 과정에서 에러남");
        console.log(err);
      });
  };

  // ------------------ 데이터 통신 관련 --------------------
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


  return (
    <>
      <VoteButton />
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
        }
export default MainPage;
