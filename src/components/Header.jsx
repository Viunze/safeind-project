// src/components/Header.jsx

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'; 
import BackButton from './BackButton';

export default function Header() {
  // Mengambil currentUser dan fungsi logout dari Context
  const { currentUser, logout } = useAuth(); 
  const router = useRouter();
  
  // Tampilkan tombol kembali di semua halaman kecuali Home (/) dan Login
  const showBackButton = router.pathname !== '/' && router.pathname !== '/auth/login'; 

  const handleLogout = async () => {
    try {
        await logout(); // Menggunakan fungsi logout dari AuthContext
        router.push('/auth/login');
    } catch (error) {
        console.error("Gagal Logout:", error);
        // Anda bisa menambahkan toast.error di sini jika perlu notifikasi gagal logout
    }
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 py-3 px-6 shadow-lg sticky top-0 z-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        
        {/* Logo Safeind dan Nama Aplikasi */}
        <div className="flex items-center space-x-3">
          <Image
            // URL logo dari files.catbox.moe
            src="https://files.catbox.moe/yu8hip.png" 
            alt="Safeind Logo"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <Link href="/" className="text-xl font-extrabold text-primary-neon tracking-wider">
            SAFEIND
          </Link>
        </div>

        {/* Navigasi dan Profile */}
        <nav className="flex items-center space-x-4">
          {currentUser ? (
            <>
              {/* Jika user login */}
              <Link href="/profile" className="text-gray-300 hover:text-white transition text-sm">Profil</Link>
              <button onClick={handleLogout} className="text-red-400 hover:text-red-500 transition text-sm">Keluar</button>
            </>
          ) : (
            // Jika user belum login
            <Link href="/auth/login" className="text-primary-neon hover:text-white transition text-sm font-semibold">Masuk</Link>
          )}
        </nav>
      </div>
      
      {/* Tombol Kembali (BackButton) */}
      {showBackButton && (
        <div className="max-w-6xl mx-auto mt-2">
           <BackButton fallbackUrl="/" />
        </div>
      )}
    </header>
  );
}
