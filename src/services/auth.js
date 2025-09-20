import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';



export const loginEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const signupEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const loginGoogleWeb = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);
