import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALlvyn0lvCmS1lKrvTV9xZhoobZsYNwdQ",
  authDomain: "syncvision-cd55b.firebaseapp.com",
  projectId: "syncvision-cd55b",
  storageBucket: "syncvision-cd55b.firebasestorage.app",
  messagingSenderId: "1082559671574",
  appId: "1:1082559671574:web:73d52a26176853bbbdf437",
  measurementId: "G-DWERK98W10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Firebase Authentication Functions
export const signup = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing up:", error.message);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in:", error.message);
        throw error;
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        console.log("User signed out.");
    } catch (error) {
        console.error("Error signing out:", error.message);
    }
};
