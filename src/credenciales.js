// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvU1qryIT5RntYqbIkrXITQD1PHdB9H3A",
  authDomain: "graydive-challenge.firebaseapp.com",
  projectId: "graydive-challenge",
  storageBucket: "graydive-challenge.appspot.com",
  messagingSenderId: "750309982104",
  appId: "1:750309982104:web:36ac39694ddaa549aab5ed",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;
