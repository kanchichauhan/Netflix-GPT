// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwpmqWsujbuIWwOSPdoJNmewbdkbji75E",
  authDomain: "netflixgpt-ec929.firebaseapp.com",
  projectId: "netflixgpt-ec929",
  storageBucket: "netflixgpt-ec929.appspot.com",
  messagingSenderId: "732239826369",
  appId: "1:732239826369:web:090093d0d3a2bcc7a0b340",
  measurementId: "G-1LRN1D08F7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
