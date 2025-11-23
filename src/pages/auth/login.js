// src/pages/auth/login.js
import React from 'react';
import { useRouter } from 'next/router';
import { signInWithGoogle } from '../../lib/firebase/auth'; // Import fungsi

const LoginPage = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      // Jika sukses, fungsi akan redirect secara otomatis ke '/'
      router.push('/'); 
    } catch (e) {
      // Error sudah di-log di auth.js, bisa tampilkan notifikasi jika perlu
      console.log('User membatalkan atau terjadi error saat login.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-primary text-gray-50 p-4">
      <div className="bg-black-primary border border-neon-purple/50 p-8 rounded-xl shadow-neon-lg max-w-sm w-full text-center">
        <h1 className="text-4xl font-extrabold mb-2 text-neon-blue">SAFEIND</h1>
        <p className="text-xl mb-6 text-gray-400">
          Akses Aman Komunitas
        </p>

        {/* Tombol Login Google */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-neon-blue text-black font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-80 transition duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-3"
        >
          {/* Ikon Google (asumsi ada di public/assets/icon-google.svg) */}
          <img src="/assets/icon-google.svg" alt="Google Logo" className="w-5 h-5" /> 
          <span>Masuk dengan Google</span>
        </button>
        
        <p className="mt-6 text-xs text-gray-600">
          Kami hanya menggunakan Google Login untuk keamanan dan kemudahan Anda.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
