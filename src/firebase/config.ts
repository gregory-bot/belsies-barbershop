import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDONH_JUdd7o-xOI9_0gdHprLAMnCCXcgY",
  authDomain: "belsies-babershop.firebaseapp.com",
  projectId: "belsies-babershop",
  storageBucket: "belsies-babershop.firebasestorage.app",
  messagingSenderId: "819022845852",
  appId: "1:819022845852:web:9a181cec4c69b20020da59",
  measurementId: "G-XJDH33ZJM4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);