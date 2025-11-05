// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFLKgwpwBy3ePUinKdHWLDcJLw3hO5mnA",
  authDomain: "firereactapp-ca04e.firebaseapp.com",
  projectId: "firereactapp-ca04e",
  storageBucket: "firereactapp-ca04e.firebasestorage.app",
  messagingSenderId: "128922505255",
  appId: "1:128922505255:web:b7078dd47cad389c343e02",
  measurementId: "G-JPN7Q3DW4S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
