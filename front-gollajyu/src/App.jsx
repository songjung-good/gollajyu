import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <Router>
      <div>
        <NavigationBar />
      </div>
    </Router>
  );
}

export default App;
