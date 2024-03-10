import React, { useEffect, useState } from "react";
import {
  deleteDoc,
  doc,
  collection,
  onSnapshot,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { firestore, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState({});
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(
          collection(firestore, "notes"),
          where("userId", "==", user.uid)
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
  }, []);

  const deleteNote = async (id) => {
    try {
      await deleteDoc(doc(firestore, "notes", id));
      console.log("Note supprimée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression de la note :", error);
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
                <h2 className="note-title">
                  {note.title}

                  {note.isUrgent ? (
                    <span>
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
                </h2>
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
