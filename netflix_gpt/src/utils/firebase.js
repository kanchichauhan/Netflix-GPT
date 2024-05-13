// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpo7faeWQ5tf4ryfWQY8YDq3OBSmkhyEA",
  authDomain: "netflix-gpt-project-37bf4.firebaseapp.com",
  projectId: "netflix-gpt-project-37bf4",
  storageBucket: "netflix-gpt-project-37bf4.appspot.com",
  messagingSenderId: "362584647611",
  appId: "1:362584647611:web:54d4a5a0a29dcc7b72069e",
  measurementId: "G-XKH008H8NB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);