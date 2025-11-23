// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, handleSignOut } from '../lib/firebase/auth'; // Import auth dan signOut

const AuthContext = createContext({
    currentUser: null,
    loading: true,
    logout: () => Promise.resolve(), // Inisialisasi logout
});

// useAuth diekspor dengan 'export const' untuk memperbaiki error
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const logout = () => handleSignOut(); // Menggunakan fungsi dari auth.js

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
