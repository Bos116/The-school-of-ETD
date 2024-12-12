// Import the functions you need from the SDKs you need 
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzkuB1ljxuVeHRTgDsKmwY5y8-iAcm6Jw",
  authDomain: "blog-app-b346d.firebaseapp.com",
  projectId: "blog-app-b346d",
  storageBucket: "blog-app-b346d.firebasestorage.app",
  messagingSenderId: "990475489108",
  appId: "1:990475489108:web:c88fa9f4548b72b03242c1"
};

// Initialize Firebase and Database, Auth, and googleauth provider
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app) 
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
