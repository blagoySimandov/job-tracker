import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//TODO: move to NEXT_PUBLIC 'env' variables
const firebaseConfig = {
  apiKey: "AIzaSyBfSlZ9Kn2_NDrRho5I1AgYPa06TkAaf2g",
  authDomain: "job-app-tracker-50357.firebaseapp.com",
  projectId: "job-app-tracker-50357",
  storageBucket: "job-app-tracker-50357.firebasestorage.app",
  messagingSenderId: "207097255766",
  appId: "1:207097255766:web:87e0f78e1f161c02e4a8f7",
  measurementId: "G-9QFJXJX4VT",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();
