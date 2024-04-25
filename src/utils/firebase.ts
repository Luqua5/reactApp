// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4mOAYqgYnsyMwTeolIA3NEnW4VpkWwqc",
  authDomain: "appreact-40234.firebaseapp.com",
  projectId: "appreact-40234",
  storageBucket: "appreact-40234.appspot.com",
  messagingSenderId: "170475038682",
  appId: "1:170475038682:web:2342e501d39244834a42e3",
  measurementId: "G-HJ3HF8F5JL"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTOREDB = getFirestore(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);