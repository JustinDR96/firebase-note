import React from "react";
import { NoteList, NoteForm } from "../../components";

function Dashboard() {
  return (
    <div className="dashboard">
      <NoteForm />
      <h1>My Notes</h1>

      <NoteList
        deleteStatus={false}
        archiveStatus={false}
        priorityStatus={true}
      />
      <hr />
      <NoteList
        deleteStatus={false}
        archiveStatus={false}
        priorityStatus={false}
      />
    </div>
  );
}

export default Dashboard;
