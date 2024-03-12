import React, { useState } from "react";
import Modal from "react-modal";
import { addNote, auth } from "../../firebase";

Modal.setAppElement("#root");

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [isUrgent, setIsUrgent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const colors = [
    "#ff4c4c",
    "#4cff4c",
    "#4c4cff",
    "#ffff4c",
    "#4cffff",
    "#ff4cff",
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !message) return;

    try {
      const note = {
        title,
        message,
        color,
        isUrgent,
        createdAt: new Date().toISOString(),
        userId: auth.currentUser.uid, // Ajoute l'ID de l'utilisateur à la note
        archive: false,
        delete: false,
      };

      // Ajouter la note à Firestore
      await addNote(note);

      setTitle("");
      setMessage("");
      setColor("#ffffff");
      setIsUrgent(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la note :", error);
    }
  };

  return (
    <div className="note-form">
      <button
        onClick={() => setIsOpen(true)}
        className="add-modal
      "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v268q-19-9-39-15.5t-41-9.5v-243H200v560h242q3 22 9.5 42t15.5 38H200Zm0-120v40-560 243-3 280Zm80-40h163q3-21 9.5-41t14.5-39H280v80Zm0-160h244q32-30 71.5-50t84.5-27v-3H280v80Zm0-160h400v-80H280v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm-20-80h40v-100h100v-40H740v-100h-40v100H600v40h100v100Z" />
        </svg>
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className={"Modal-container"}
      >
        <div className="container">
          <button onClick={() => setIsOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              fill="red"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
          <h2>Add note</h2>
          <form onSubmit={handleSubmit} className="form-note">
            <div>
              <input
                className="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
              />
            </div>
            <div>
              <textarea
                className="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="type your note here..."
              />
            </div>
            <div className="color">
              {colors.map((colorOption, index) => (
                <label key={index} style={{ backgroundColor: colorOption }}>
                  <input
                    type="radio"
                    value={colorOption}
                    checked={colorOption === color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </label>
              ))}
            </div>
            <div className="urgent">
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="priority"
              />
              <p>Urgent</p>
            </div>
            <button type="submit">ADD</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default NoteForm;
