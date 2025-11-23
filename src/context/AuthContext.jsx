// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase/config'; // <-- KOREKSI: Import AUTH dari config.js
import { handleSignOut } from '../lib/firebase/auth'; 

// 1. Definisikan dan Export Context (Perbaikan untuk error "AuthContext is not exported")
export const AuthContext = createContext({
    currentUser: null,
    loading: true,
    logout: () => Promise.resolve(), 
});

// 2. Export Hook useAuth
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Export Provider
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
