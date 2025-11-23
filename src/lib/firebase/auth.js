// src/lib/firebase/auth.js
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';
import { auth } from './config'; 

export const handleSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const handleSignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export const handleSignOut = () => {
    return signOut(auth);
};
