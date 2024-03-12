import React, { useEffect, useState } from "react";
import {
  doc,
  collection,
  onSnapshot,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { firestore, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const NoteList = ({
  deleteStatus = false,
  archiveStatus = false,
  priorityStatus = false,
}) => {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState({});
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(
          collection(firestore, "notes"),
          where("userId", "==", user.uid),
          where("delete", "==", deleteStatus),
          where("archive", "==", archiveStatus),
          where("isUrgent", "==", priorityStatus)
        );

        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          let notes = [];
          snapshot.forEach((doc) => {
            notes.push({ id: doc.id, ...doc.data() });
          });
          setNotes(notes);
        });

        return () => unsubscribeSnapshot();
      } else {
        setNotes([]);
      }
    });

    return () => unsubscribeAuth();
  }, [deleteStatus, archiveStatus, priorityStatus]);

  const deleteNote = async (id) => {
    try {
      const noteRef = doc(firestore, "notes", id);
      await updateDoc(noteRef, { delete: true });
      console.log("Note marquée comme supprimée !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la note :", error);
    }
  };

  const archiveNote = async (id) => {
    try {
      const noteRef = doc(firestore, "notes", id);
      await updateDoc(noteRef, { archive: true });
      console.log("Note archivée !");
    } catch (error) {
      console.error("Erreur lors de l'archivage de la note :", error);
    }
  };

  const updateNote = async (id) => {
    try {
      const noteRef = doc(firestore, "notes", id);
      await updateDoc(noteRef, formValues[id]);
      setEditing({ ...editing, [id]: false });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la note :", error);
    }
  };

  return (
    <div className="note-container">
      {notes.map((note) => (
        <div
          className="note-card"
          key={note.id}
          style={{ backgroundColor: note.color }}
        >
          <div className="note-btn">
            {note.isUrgent ? (
              <span className="priority">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 -960 960 960"
                  width="20"
                  className="svg-edit"
                >
                  <path d="M480-120q-33 0-56.5-23.5T400-200q0-33 23.5-56.5T480-280q33 0 56.5 23.5T560-200q0 33-23.5 56.5T480-120Zm-80-240v-480h160v480H400Z" />
                </svg>
              </span>
            ) : null}
            <button onClick={() => setEditing({ ...editing, [note.id]: true })}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
            </button>
            <button onClick={() => archiveNote(note.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="m480-240 160-160-56-56-64 64v-168h-80v168l-64-64-56 56 160 160ZM200-640v440h560v-440H200Zm0 520q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v499q0 33-23.5 56.5T760-120H200Zm16-600h528l-34-40H250l-34 40Zm264 300Z" />
              </svg>
            </button>
            <button onClick={() => deleteNote(note.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="Red"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            </button>
          </div>
          {editing[note.id] ? (
            <form
              className="form-edit"
              onSubmit={(e) => {
                e.preventDefault();
                updateNote(note.id);
              }}
            >
              <input
                type="text"
                value={formValues[note.id]?.title || note.title}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [note.id]: {
                      ...formValues[note.id],
                      title: e.target.value,
                    },
                  })
                }
              />
              <textarea
                value={formValues[note.id]?.message || note.message}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [note.id]: {
                      ...formValues[note.id],
                      message: e.target.value,
                    },
                  })
                }
              />
              <div className="edit-btn">
                <button type="submit">Mettre à jour</button>
                <button
                  type="button"
                  onClick={() => setEditing({ ...editing, [note.id]: false })}
                >
                  Annuler
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="note-content">
                <p className="note-date">
                  {new Date(note.createdAt).toLocaleDateString("fr-FR")}
                </p>
                <h2 className="note-title">{note.title}</h2>
                <p className="note-message">{note.message}</p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default NoteList;
