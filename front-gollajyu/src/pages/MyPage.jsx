import React from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "../components/SideBar";
import MyProfile from "../components/MyProfile";
import MyActivities from "../components/MyActivities";

const MyPage = () => {
  const body = {
    marginTop: "100px",
    marginLeft: "300px",
    width: "100%",
    height: "1000px",
  }

  return (
    <div>
      <SideBar />
      <div style={body}>
        <Routes>
          <Route path="/" element={<MyProfile />} />
          <Route path="/MyActivities" element={<MyActivities />} />
        </Routes>
      </div>
    </div>
  );
};

export default MyPage;
