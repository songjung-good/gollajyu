import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "./stores/userState";
import useModalStore from "./stores/modalState";

// 로그인 유저만 접근 가능
// 비로그인 유저 접근 불가
const PrivateRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setLoginModalOpen = useModalStore((state) => state.setLoginModalOpen);

  if (!isLoggedIn) {
    setLoginModalOpen();
    return <Navigate to="/" />; // 경로 이동으로 인해 새로고침 현상 있음
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
