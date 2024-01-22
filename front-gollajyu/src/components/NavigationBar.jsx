import React from "react";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  const isLoggedIn = true; // 로그인 상태

  const navigationBarStyle = {
    background: "#4A4A4A",
    padding: "10px",
  };

  const listStyle = {
    listStyleType: "none",
    display: "flex",
  };

  const listItemStyle = {
    marginRight: "10px",
  };

  const lastItemStyle = {
    marginLeft: "auto",
  };

  return (
    <nav style={navigationBarStyle}>
      <ul style={listStyle}>
        <li style={listItemStyle}>
          <NavLink to="/">골라쥬</NavLink>
        </li>
        <li style={listItemStyle}>
          <NavLink to="/VotePage">투표모아쥬</NavLink>
        </li>
        <li style={listItemStyle}>
          <NavLink to="/BroadcastPage">지금골라쥬</NavLink>
        </li>
        <li style={listItemStyle}>
          <NavLink to="/StatisticPage">통계보여쥬</NavLink>
        </li>
        <li style={listItemStyle}>
          <NavLink to="/TestPage">소비성향알려쥬</NavLink>
        </li>
        <li style={{ ...listItemStyle, ...lastItemStyle }}>
          {isLoggedIn ? (
            <>
              <NavLink to="/MyPage">내프로필</NavLink>
              <span style={{ margin: "0 5px" }}>|</span>
              <button>로그아웃</button>
            </>
          ) : (
            <>
              <NavLink to="/Login">로그인</NavLink>
              <span style={{ margin: "0 5px" }}>|</span>
              <NavLink to="/SignUp">회원가입</NavLink>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
