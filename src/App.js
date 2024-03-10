import React, { useState } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
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
      <Dashboard />
    </div>
  );
}

export default App;
