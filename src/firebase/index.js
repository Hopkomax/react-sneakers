import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/firestore";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqR0twwTsQkYTauUXpjKVUL0UAPYD6PMg",
  authDomain: "react-sneakers-9b5d2.firebaseapp.com",
  projectId: "react-sneakers-9b5d2",
  storageBucket: "react-sneakers-9b5d2.appspot.com",
  messagingSenderId: "652578991003",
  appId: "1:652578991003:web:596ada887fb0a9983d0f3e",
};
export const db = firebase.initializeApp(firebaseConfig).firestore();
