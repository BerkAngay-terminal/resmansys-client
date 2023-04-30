import { initializeApp, getApps, getApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const firebaseConfig = {
    apiKey: "AIzaSyA_a7GZViWYscDMJRr1aPsZZuljPVoHq7c",
    authDomain: "resmansys-89d2f.firebaseapp.com",
    projectId: "resmansys-89d2f",
    storageBucket: "resmansys-89d2f.appspot.com",
    messagingSenderId: "12272088761",
    appId: "1:12272088761:web:d614abfadb1763fb9acd68"
};

// const firebase = initializeApp();
const firebase = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export default firebase;