// src/pages/auth/login.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
// Impor fungsi login/signup/google dari library Firebase
import { handleSignIn, handleSignUp, handleGoogleSignIn } from '../../lib/firebase/auth'; 
import toast from 'react-hot-toast'; // Import Toast

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle antara Login dan Register
  const router = useRouter();
  
  // Asumsi handleSignIn/handleSignUp sudah memanggil fungsi Firebase
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await handleSignIn(email, password);
        toast.success("Login berhasil! Selamat datang kembali."); // Notif Sukses
        router.push('/');
      } else {
        await handleSignUp(email, password);
        toast.success("Registrasi berhasil! Silakan login."); // Notif Sukses
        setIsLogin(true); // Kembali ke halaman login
      }
    } catch (error) {
      // Gunakan toast.error sebagai ganti alert()
      toast.error(`Aksi gagal: ${error.message.split('auth/')[1]?.replace('-', ' ') || error.message}`); 
    }
  };

  const signInWithGoogle = async () => {
    try {
        await handleGoogleSignIn();
        toast.success("Login dengan Google berhasil!"); // Notif Sukses
        router.push('/');
    } catch (error) {
        toast.error(`Gagal Login Google: ${error.message}`); // Notif Gagal
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-background">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-primary-neon mb-6">
          {isLogin ? 'Masuk ke SAFEIND' : 'Daftar Akun Baru'}
        </h2>
        
        {/* Form Login/Register */}
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-primary-neon"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-primary-neon"
          />
          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-primary-neon text-white font-semibold hover:bg-blue-600 transition duration-200"
          >
            {isLogin ? 'Masuk' : 'Daftar Sekarang'}
          </button>
        </form>

        <div className="mt-6 space-y-3">
          <div className="flex items-center">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-4 text-gray-400 text-sm">ATAU</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          {/* Tombol Login Google */}
          <button
            onClick={signInWithGoogle}
            type="button"
            className="w-full p-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-200 flex items-center justify-center"
          >
            {/* Ganti dengan ikon Google SVG jika ada */}
            <span className="mr-2 text-xl">G</span> 
            Masuk dengan Google
          </button>
        </div>

        <p className="mt-6 text-center text-gray-400 text-sm">
          {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary-neon hover:underline"
          >
            {isLogin ? 'Daftar di sini' : 'Masuk di sini'}
          </button>
        </p>
      </div>
    </div>
  );
}
