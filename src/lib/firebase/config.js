// src/lib/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Hapus 'https://www.gstatic.com/' dan versi jika Anda menggunakan instalasi NPM biasa 
// (rekomendasi untuk proyek Next.js/React).

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBaPUJWt_E0aDPRTsB7KhMx9gQ6MbNas5c", // Ganti dengan key Anda yang sebenarnya
    authDomain: "lyntrix-d309a.firebaseapp.com",
    projectId: "lyntrix-d309a",
    storageBucket: "lyntrix-d309a.firebasestorage.app",
    messagingSenderId: "481360999219",
    appId: "1:481360999219:web:92a5c7097f5fe7fb1a4446",
    measurementId: "G-ZJD7XR61WC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;

// Pastikan analytics hanya diinisialisasi di sisi client (browser)
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

const auth = getAuth(app);

export { app, auth, analytics };
