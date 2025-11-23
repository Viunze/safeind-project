// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; // Asumsi Anda menggunakan firebase/auth
import { auth } from '../lib/firebase/config'; // Asumsi path ke firebase/config Anda

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscription untuk mendengarkan perubahan status autentikasi
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Anda dapat menambahkan fungsi login, logout, register, dll di sini
  const value = {
    currentUser,
    loading,
    // (Tambahkan fungsi auth dari lib/firebase/auth di sini)
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Hanya render children setelah status autentikasi selesai dimuat */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
