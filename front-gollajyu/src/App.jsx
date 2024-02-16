import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
// import VoteButton from "./components/VoteButton";
import MainPage from "./pages/MainPage";
import VotePage from "./pages/VotePage";
import BroadcastPage from "./pages/BroadcastPage";
import StatisticPage from "./pages/StatisticPage";
import TestPage from "./pages/TestPage";
import TestResultPage from "./pages/TestResultPage";
import MyPage from "./pages/MyPage";
import VideoComponent from "./components/openvidu/VideoComponent";
import CreateVideoRoom from "./components/openvidu/CreateVideoRoom";
import "./App.css";

// 추후 적용
// NavigationBar가 나타나지 않아야하는 곳: EnterVideoRoom, CreateVideoRoom => 적용 완료
// VoteButton이 나타나야하는 곳: VotePage, BroadcastPage, MainPage => 추후에 컴포넌트 내부로 넣기

const Navbar = () => {
  return (
    <>
      <NavigationBar />
      {/* body 배경색 있음 */}
      <div className="body min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/EnterVideoRoom" element={<VideoComponent />} />
          <Route path="/CreateVideoRoom" element={<CreateVideoRoom />} />
        </Route>
        <Route element={<Navbar />}>
          <Route path="/" element={<MainPage />} />
          {/* 로그인 사용자만 접근할 수 있는 라우터 -> PrivateRoute 내부에 있음 */}
          <Route element={<PrivateRoute />}>
            <Route path="/VotePage" element={<VotePage />} />
            <Route path="/BroadcastPage" element={<BroadcastPage />} />
            <Route path="/StatisticPage" element={<StatisticPage />} />
            <Route path="/TestResultPage" element={<TestResultPage />} />
            <Route path="/MyPage/*" element={<MyPage />} />
          </Route>
          <Route path="/TestPage" element={<TestPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
