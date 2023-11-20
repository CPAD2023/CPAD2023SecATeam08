// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import{getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2dDXklB8-pQKXBN17aQ4L21_lgAd17ZU",
  authDomain: "laundry-app-1a967.firebaseapp.com",
  projectId: "laundry-app-1a967",
  storageBucket: "laundry-app-1a967.appspot.com",
  messagingSenderId: "934895261344",
  appId: "1:934895261344:web:531eb39fa18a810c189bc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const db=getFirestore();
export {auth,db};