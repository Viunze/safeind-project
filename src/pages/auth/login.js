// src/pages/auth/login.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'; 
import toast from 'react-hot-toast'; 
import { handleSignIn, handleSignUp, handleGoogleSignIn } from '../../lib/firebase/auth'; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await handleSignIn(email, password); 
        toast.success("Login berhasil! Selamat datang."); 
        router.push('/');
      } else {
        await handleSignUp(email, password); 
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
        await handleGoogleSignIn(); 
        toast.success("Login dengan Google berhasil!"); 
        router.push('/');
    } catch (error) {
        // Ini adalah error yang Anda lihat ("Pastikan domain Anda diizinkan...")
        toast.error("Gagal Login dengan Google. Pastikan domain Anda diizinkan di Firebase."); 
    }
  };
// ... (sisa return JSX sama seperti sebelumnya)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-extrabold text-center text-blue-400 mb-8">
          {isLogin ? 'Masuk ke SAFEIND' : 'Daftar Akun Baru'}
        </h2>
        
        <form onSubmit={handleAuth} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Alamat Email"
            required
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Kata Sandi"
            required
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-blue-500 text-white font-bold tracking-wider hover:bg-blue-600 transition duration-200 shadow-md"
          >
            {isLogin ? 'Masuk' : 'Daftar Sekarang'}
          </button>
        </form>

        <div className="mt-8 space-y-4">
          <div className="flex items-center">
            <hr className="flex-grow border-gray-700" />
            <span className="mx-4 text-gray-500 text-sm">ATAU</span>
            <hr className="flex-grow border-gray-700" />
          </div>

          <button
            onClick={signInWithGoogle}
            type="button"
            className="w-full p-3 rounded-lg bg-white text-gray-800 font-semibold hover:bg-gray-100 transition duration-200 flex items-center justify-center border border-gray-300"
          >
            <Image
                src="https://files.catbox.moe/np3lcq.webp" 
                alt="Logo Google"
                width={20}
                height={20}
                className="mr-3"
            />
            Masuk dengan Google
          </button>
        </div>

        <p className="mt-8 text-center text-gray-400 text-sm">
          {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 font-medium hover:underline focus:outline-none"
          >
            {isLogin ? 'Daftar di sini' : 'Masuk di sini'}
          </button>
        </p>
      </div>
    </div>
  );
}
