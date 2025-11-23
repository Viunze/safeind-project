// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, handleSignOut } from '../lib/firebase/auth'; // Import auth dan signOut dari file auth.js

const AuthContext = createContext({
    currentUser: null,
    loading: true,
    logout: () => Promise.resolve(), // Tambahkan fungsi logout
});

// Pastikan useAuth diekspor dengan 'export const'
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
  
  const logout = () => handleSignOut(); // Gunakan fungsi handleSignOut dari auth.js

  const value = {
    currentUser,
    loading,
    logout, 
    // Fungsi login/signup tidak perlu di sini, tapi diakses langsung dari login.js
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Hanya render children setelah status autentikasi selesai dimuat */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
