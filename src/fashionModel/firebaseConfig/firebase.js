// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBcw369DnOprw5wA4hI3mHSQcJOCpxfF8",
  authDomain: "danielpindura.firebaseapp.com",
  projectId: "danielpindura",
  storageBucket: "danielpindura.appspot.com",
  messagingSenderId: "982905532792",
  appId: "1:982905532792:web:6b218a87a4233c2c61d88d",
  measurementId: "G-BY9DL69206"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app)