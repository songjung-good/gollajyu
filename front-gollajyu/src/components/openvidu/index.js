import React from "react";
import ReactDOM from "react-dom";
import VideoComponent from "./VideoComponent";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<VideoComponent />, document.getElementById("root"));
registerServiceWorker();
