// src/lib/firebase/auth.js
import { 
    GoogleAuthProvider, 
    signInWithPopup, 
    onAuthStateChanged,
    signOut 
} from "firebase/auth";
import { auth } from './config';

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile'); // Akses profil dasar

/**
 * Handles Google Sign-In using a pop-up window.
 */
export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        
        console.log("Login Berhasil! User:", user.displayName);
        return user;
    } catch (error) {
        console.error("Login Gagal:", error.message, "Code:", error.code);
        throw error; // Lempar error agar bisa ditangani di komponen
    }
}

/**
 * Handles user sign-out.
 */
export async function handleSignOut() {
    try {
        await signOut(auth);
        console.log("Logout Berhasil!");
    } catch (error) {
        console.error("Logout Gagal:", error.message);
        throw error;
    }
}

/**
 * Observer for changes in the user's sign-in state.
 * (Will be used in AuthContext)
 */
export { onAuthStateChanged };
