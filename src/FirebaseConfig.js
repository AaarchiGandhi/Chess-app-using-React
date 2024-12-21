import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyD3uJ_Vng0rf9TICuGhMG0Ub2qYpBI38GY",
  authDomain: "chess-app-1b6a5.firebaseapp.com",
  projectId: "chess-app-1b6a5",
  storageBucket: "chess-app-1b6a5.appspot.com",
  messagingSenderId: "560429654457",
  appId: "1:560429654457:web:a76bf61da1303eaf0dd668",
  measurementId: "G-Z1XG9NXD8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getAuth(app);
export const googleProvider = new GoogleAuthProvider();