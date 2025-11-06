// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOXGQzLfV2uLrGIA0m6uHX3VbkDnkpGDM",
  authDomain: "expt11fauth.firebaseapp.com",
  projectId: "expt11fauth",
  storageBucket: "expt11fauth.firebasestorage.app",
  messagingSenderId: "208016011755",
  appId: "1:208016011755:web:aafa08b0359b1c495ba9ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export default app;
