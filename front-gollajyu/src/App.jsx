import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import MainPage from "./pages/MainPage";
import VotePage from "./pages/VotePage";
import BroadcastPage from "./pages/BroadcastPage";
import StatisticPage from "./pages/StatisticPage";
import TestPage from "./pages/TestPage";
import MyPage from "./pages/MyPage";
import "./App.css"

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <div className="body">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/VotePage" element={<VotePage />} />
          <Route path="/BroadcastPage" element={<BroadcastPage />} />
          <Route path="/StatisticPage" element={<StatisticPage />} />
          <Route path="/TestPage" element={<TestPage />} />
          <Route path="/MyPage" element={<MyPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
