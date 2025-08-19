// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpgeyrIvfiqnphfnmtXkMIJoO7I7xP_Kc",
  authDomain: "blinkit-api-11.firebaseapp.com",
  projectId: "blinkit-api-11",
  storageBucket: "blinkit-api-11.firebasestorage.app",
  messagingSenderId: "256250564545",
  appId: "1:256250564545:web:752e90d96660417a11a940"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);