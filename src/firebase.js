import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
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
