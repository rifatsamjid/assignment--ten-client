// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwdoNXfHIVtI93limoDMgv82QV40qoxnk",
  authDomain: "assignment-ten-76e7a.firebaseapp.com",
  projectId: "assignment-ten-76e7a",
  storageBucket: "assignment-ten-76e7a.firebasestorage.app",
  messagingSenderId: "636351201120",
  appId: "1:636351201120:web:21a76e569fdcd010232805"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
