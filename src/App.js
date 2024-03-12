import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Trash from "./pages/Trash/Trash";
import Archive from "./pages/Archive/Archive";
import { Navbar } from "./components";

function App() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  return (
    <div className="App">
      <button
        className={`nav-icon-button ${isButtonClicked ? "clicked" : ""}`}
        onClick={() => {
          setIsNavOpen(!isNavOpen);
          setIsButtonClicked(!isButtonClicked);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      </button>
      {isNavOpen && <Navbar />}
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
