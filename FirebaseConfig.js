// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFLLn7rEsNwN1RX7HWipX5c2gphWXTb_0",
  authDomain: "clip-a301d.firebaseapp.com",
  projectId: "clip-a301d",
  storageBucket: "clip-a301d.appspot.com",
  messagingSenderId: "163550400412",
  appId: "1:163550400412:web:651af6e7d1ec0589b2c259",
};

// Initialize Firebase
export const FB_APP = initializeApp(firebaseConfig);
export const FB_DB = getFirestore(FB_APP);
export const FB_AUTH = getAuth(FB_APP);
export const storage = getStorage(FB_APP);
