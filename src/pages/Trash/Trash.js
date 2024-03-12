import React from "react";
import { NoteList } from "../../components";

function Trash() {
  const noteListConfigs = [
    { deleteStatus: true, archiveStatus: false },
    { deleteStatus: true, archiveStatus: true },
  ];
  return (
    <div className="dashboard">
      <h1>Deleted Notes</h1>
      {noteListConfigs.map((config, index) => (
        <NoteList key={index} {...config} />
      ))}
    </div>
  );
}

export default Trash;
