import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import axios from "axios";

// 쿠키에 담긴 JSSESIONID를 axios 요청 헤더에 담아서 보내기 위함
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
