import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { getDatabase, ref, set, get, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAXTkoOZ7uZy8SUZGX-IRqS2YLLaiKnnME",
  authDomain: "parcial-2-f3af5.firebaseapp.com",
  databaseURL: "https://parcial-2-f3af5-default-rtdb.firebaseio.com",
  projectId: "parcial-2-f3af5",
  storageBucket: "parcial-2-f3af5.firebasestorage.app",
  messagingSenderId: "996653330776",
  appId: "1:996653330776:web:6c7acba98fc89d273b352d",
  measurementId: "G-3J82SXRJ4Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const baseDatos = getDatabase(app);

export { auth, baseDatos };

export const crearCuenta = (correo: string, contrasena: string) => 
  createUserWithEmailAndPassword(auth, correo, contrasena);

export const iniciarSesion = (correo: string, contrasena: string) => 
  signInWithEmailAndPassword(auth, correo, contrasena);

export const cerrarSesion = () => signOut(auth);

export const observarAutenticacion = (callback: (usuario: User | null) => void) => 
  onAuthStateChanged(auth, callback);

export const guardarArbol = (uid: string, arbol: unknown) => 
  set(ref(baseDatos, `usuarios/${uid}/arbol`), arbol);

export const obtenerArbol = (uid: string) => 
  get(ref(baseDatos, `usuarios/${uid}/arbol`));

export const actualizarArbol = (uid: string, actualizaciones: unknown) => 
  update(ref(baseDatos, `usuarios/${uid}`), actualizaciones as Record<string, unknown>);
