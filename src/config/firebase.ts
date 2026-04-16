import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDYAPF9vrO7JhE0Q09O5JZxmw8DNqG2UkI",
  authDomain: "challenge-7-c7f24.firebaseapp.com",
  databaseURL: "https://challenge-7-c7f24-default-rtdb.firebaseio.com",
  projectId: "challenge-7-c7f24",
  storageBucket: "challenge-7-c7f24.firebasestorage.app",
  messagingSenderId: "823067870285",
  appId: "1:823067870285:web:e14f53bd8212e6f8a70804",
  measurementId: "G-WZGLX5QXVF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

export default app;
