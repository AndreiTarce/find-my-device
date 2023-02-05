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
    apiKey: "AIzaSyASbFajKMnooEkSx4a0v7EFpBec3iFG71g",
    authDomain: "find-my-device-be27c.firebaseapp.com",
    projectId: "find-my-device-be27c",
    storageBucket: "find-my-device-be27c.appspot.com",
    messagingSenderId: "167215727957",
    appId: "1:167215727957:web:0171726f8e53b12c2edbdc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
// export const db = getFirestore(app);
export const db = getFirestore(app);
// connectFirestoreEmulator(db, "localhost", 8080);
