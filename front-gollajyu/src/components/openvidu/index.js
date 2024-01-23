import React from "react";
import ReactDOM from "react-dom";
import VideoComponent from "./VideoComponent";
import registerServiceWorker from "./registerServiceWorker";
import "./openvidu.css";

ReactDOM.render(<VideoComponent />, document.getElementById("root"));
registerServiceWorker();
