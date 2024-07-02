// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-1bLWY8XfQPkHHU4ahe4fXPyJFjR1Pkk",
  authDomain: "prueba-1-96eb2.firebaseapp.com",
  databaseURL: "https://prueba-1-96eb2-default-rtdb.firebaseio.com",
  projectId: "prueba-1-96eb2",
  storageBucket: "prueba-1-96eb2.appspot.com",
  messagingSenderId: "848654318661",
  appId: "1:848654318661:web:70fe3b1809cf412035b72c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);