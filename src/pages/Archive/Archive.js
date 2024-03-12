import React from "react";
import { NoteList } from "../../components";

function Archive() {
  return (
    <div className="dashboard">
      <h1>Archived Notes</h1>
      <NoteList deleteStatus={false} archiveStatus={true} />
    </div>
  );
}

export default Archive;
