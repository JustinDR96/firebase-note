import React from "react";
import { NoteList } from "../../components";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>My Notes</h1>
      <NoteList />
    </div>
  );
}

export default Dashboard;
