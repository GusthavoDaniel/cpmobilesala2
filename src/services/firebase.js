
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDdYcS_e9OT00ff7Oa1pGPSraMMOTZeccM",
  authDomain: "listatarefasplus-cee28.firebaseapp.com",
  projectId: "listatarefasplus-cee28",
  storageBucket: "listatarefasplus-cee28.appspot.com", 
  messagingSenderId: "920474423714",
  appId: "1:920474423714:web:8e34271652e15b81bce2fb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
