import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

// Expo (mobile) não suporta popup nativo do Firebase; use expo-auth-session se quiser OAuth nativo.
// Para fins de CP, aceite e-mail/senha + Google via web build ou use auth-session.
export const loginEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const signupEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const loginGoogleWeb = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);
