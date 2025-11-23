// src/pages/auth/login.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'; 
import toast from 'react-hot-toast'; 

// PERBAIKAN: Import semua fungsi sebagai Named Export
import { handleSignIn, handleSignUp, handleGoogleSignIn } from '../../lib/firebase/auth'; 

export default function LoginPage() {
    // ... (sisa kode sama seperti sebelumnya)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await handleSignIn(email, password); // Dipanggil dengan benar
        toast.success("Login berhasil! Selamat datang."); 
        router.push('/');
      } else {
        await handleSignUp(email, password); // Dipanggil dengan benar
        toast.success("Registrasi berhasil! Silakan masuk."); 
        setIsLogin(true); 
      }
    } catch (error) {
      const errorMessage = error.message.split('auth/')[1]?.replace(/[()-]/g, ' ') || "Terjadi kesalahan.";
      toast.error(`Gagal: ${errorMessage.trim()}`); 
    }
  };

  const signInWithGoogle = async () => {
    try {
        await handleGoogleSignIn(); // Dipanggil dengan benar
        toast.success("Login dengan Google berhasil!"); 
        router.push('/');
    } catch (error) {
        toast.error("Gagal Login dengan Google. Pastikan domain Anda diizinkan di Firebase."); 
    }
  };

  // ... (sisa return JSX)
}
