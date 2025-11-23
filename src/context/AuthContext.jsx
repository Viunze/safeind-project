// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase/config'; // Impor 'auth' yang mungkin undefined jika Env Vars gagal
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
    // Safety check: Hanya jalankan onAuthStateChanged jika 'auth' terdefinisi
    if (auth) { 
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Jika inisialisasi gagal (auth undefined), set loading=false 
      // agar tampilan bisa dimuat dan error ditangani di konsol.
      setLoading(false);
      console.error("Firebase Auth object is undefined. Check Environment Variables in Vercel.");
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
      {!loading && children}
    </AuthContext.Provider>
  );
};
