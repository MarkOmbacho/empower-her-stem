// Firebase config and initialization
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, setPersistence, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8nZ9wauCiA0ABQT3EjaSxZlzMOUE_CJs",
  authDomain: "empower-her-69d8b.firebaseapp.com",
  projectId: "empower-her-69d8b",
  storageBucket: "empower-her-69d8b.appspot.com",
  messagingSenderId: "791201745097",
  appId: "1:791201745097:web:dc493adff71ce1942ce518",
  measurementId: "G-0M0H0CC3XN"
};

const app = initializeApp(firebaseConfig);
import { getAnalytics } from "firebase/analytics";
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Set session-only persistence
setPersistence(auth, browserSessionPersistence);

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  await signOut(auth);
};
