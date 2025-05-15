import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const runtime = 'nodejs';

const firebaseConfig = {
  apiKey: "AIzaSyCPjdEMlDNp1cBnyS-G7cG5MnsdTcW3q34",
  authDomain: "interviewcompass.firebaseapp.com",
  projectId: "interviewcompass",
  storageBucket: "interviewcompass.firebasestorage.app",
  messagingSenderId: "178829113835",
  appId: "1:178829113835:web:07c61c71648421e19c41ae",
  measurementId: "G-TLHL4TLLEC"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);