// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged, handleSignOut } from '../lib/firebase/auth'; 
import { auth } from '../lib/firebase/config';

export const AuthContext = createContext();

const unprotectedRoutes = ['/auth/login', '/', '/check/[query]']; 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      const isProtectedRoute = !unprotectedRoutes.some(route => {
          // Handle dynamic routes like /check/[query]
          if (route.includes('[') && route.includes(']')) {
              const regex = new RegExp(`^${route.replace(/\[.*\]/, '.*')}$`);
              return regex.test(router.pathname);
          }
          return route === router.pathname;
      });

      if (!currentUser && isProtectedRoute && router.isReady) {
        // Redirect jika tidak login dan di Protected Route
        router.push('/auth/login');
      }

      if (currentUser && router.pathname === '/auth/login') {
        // Redirect jika sudah login tapi mencoba akses login page
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router.pathname, router.isReady]); // Tambahkan router.isReady untuk memastikan path siap

  const value = {
    user,
    loading,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading && !unprotectedRoutes.includes(router.pathname) ? (
        <div className="flex justify-center items-center min-h-screen bg-black-primary text-neon-blue">
          <p className="animate-pulse">Memuat Data Keamanan...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
