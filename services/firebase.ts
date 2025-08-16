
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUu0aY9RsmVvy3R-jWHUBo8io0Y3CDjfY",
  authDomain: "patrocini-delest-76774.firebaseapp.com",
  projectId: "patrocini-delest-76774",
  storageBucket: "patrocini-delest-76774.firebasestorage.app",
  messagingSenderId: "116961738915",
  appId: "1:116961738915:web:3cce3f76a8bb50eda13f16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
