import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYlFYpn1UTBOodA2hCLr_3CVhFgzx6Ui0",
  authDomain: "contentgenerator-5d9d5.firebaseapp.com",
  projectId: "contentgenerator-5d9d5",
  storageBucket: "contentgenerator-5d9d5.appspot.com",
  messagingSenderId: "151081768159",
  appId: "1:151081768159:web:3d155702c54f070e5f456a",
  measurementId: "G-2HPWZ3ZS5Q"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
