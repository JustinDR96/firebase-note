import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJM-8u5LJ_QE1IG1VZzNkNTAyoXHPW5Sc",
  authDomain: "fir-notes-c9335.firebaseapp.com",
  projectId: "fir-notes-c9335",
  storageBucket: "fir-notes-c9335.appspot.com",
  messagingSenderId: "58549928768",
  appId: "1:58549928768:web:3fd11a5a7977cb6b2570a5",
  measurementId: "G-E7ZWCPGZGB",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialiser Firestore
const firestore = getFirestore(app);

// Fonction pour ajouter une note
const addNote = async (noteData) => {
  try {
    // Ajouter une note dans Firestore
    await addDoc(collection(firestore, "notes"), noteData);
    console.log("Note ajoutée avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'ajout de la note :", error);
  }
};

export { firestore, addNote };
