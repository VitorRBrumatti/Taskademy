import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAH1OWXRAx1jvpqAgcJcsmyoyzpm_nDmD8",
  authDomain: "taskademy-back.firebaseapp.com",
  projectId: "taskademy-back",
  storageBucket: "taskademy-back.firebasestorage.app",
  messagingSenderId: "431038032821",
  appId: "1:431038032821:web:c1707165005b049ce7c7fc",
  measurementId: "G-LS11YWR61Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);