import React from "react";
import { Routes, Route } from "react-router-dom";
import SideBarContainer from "../components/SideBarContainer";
import MyProfile from "../components/MyProfile";
import MyActivities from "../components/MyActivities";

const MyPage = () => {
  const body = {
    marginTop: "100px",
    marginLeft: "300px",
    width: "100%",
    height: "1200px",
  }

  return (
    <div>
      <SideBarContainer />
      <div style={body}>
        <Routes>
          <Route path="/MyPage" element={<MyProfile />} />
          <Route path="/MyPage/MyActivities" element={<MyActivities />} />
        </Routes>
      </div>
    </div>
  );
};

export default MyPage;
