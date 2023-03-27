import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCk2s4J1l9r-kSAolZu76dUHrJRQ17xa0A",
  authDomain: "babble-7bac9.firebaseapp.com",
  projectId: "babble-7bac9",
  storageBucket: "babble-7bac9.appspot.com",
  messagingSenderId: "27690724559",
  appId: "1:27690724559:web:f6abe894dbc9fb2ee55bba",
  measurementId: "G-VV3F08VD6J"
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore(app);
