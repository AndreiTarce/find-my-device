// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const provider = new GoogleAuthProvider();

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUduiswoj_-e7IbNMXRtt4XvSK9x9ufGk",
    authDomain: "proiect-licenta-632d6.firebaseapp.com",
    projectId: "proiect-licenta-632d6",
    storageBucket: "proiect-licenta-632d6.appspot.com",
    messagingSenderId: "856535409340",
    appId: "1:856535409340:web:9615de48a8e1d8470ea6b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
// export const db = getFirestore(app);
export const db = getFirestore(app);
// connectFirestoreEmulator(db, "localhost", 8080);
