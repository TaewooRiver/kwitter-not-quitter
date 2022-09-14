import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBlSiPGE2DjAzKHpBni6pRaEdahUK1fwvw",
  authDomain: "kwitter-4f1e6.firebaseapp.com",
  projectId: "kwitter-4f1e6",
  storageBucket: "kwitter-4f1e6.appspot.com",
  messagingSenderId: "146949052781",
  appId: "1:146949052781:web:a773913750bb61883da264"
  };

export default firebase.initializeApp(firebaseConfig);