// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase/config'; 
import { handleSignOut } from '../lib/firebase/auth'; 

export const AuthContext = createContext({
    currentUser: null,
    loading: true,
    logout: () => Promise.resolve(), 
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FIX: Hanya jalankan onAuthStateChanged jika 'auth' terdefinisi (berhasil diinisialisasi)
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      console.error("Firebase Auth object is undefined. Check Environment Variables.");
      setLoading(false); // Biarkan aplikasi berjalan tanpa auth jika inisialisasi gagal
    }

  }, []);
  
  const logout = () => handleSignOut();

  const value = {
    currentUser,
    loading,
    logout, 
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Tampilkan anak-anak hanya setelah loading selesai */}
      {!loading && children} 
    </AuthContext.Provider>
  );
};
