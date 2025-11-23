// src/lib/firebase/auth.js
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { app } from './config'; // Asumsi path ke firebase/config Anda

// Mendapatkan instance Auth
export const auth = getAuth(app); // Ekspor instance auth

// Fungsi Sign In
export const handleSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Fungsi Sign Up
export const handleSignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Fungsi Google Sign In
export const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

// Fungsi Sign Out
export const handleSignOut = () => {
    return signOut(auth);
};
