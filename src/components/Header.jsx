// src/components/Header.jsx

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import BackButton from './BackButton';

export default function Header() {
  const { currentUser } = useAuth(); // Hapus logout jika belum dibuat di AuthContext
  const router = useRouter();
  
  // Tampilkan tombol kembali di semua halaman kecuali Home (/) dan Login
  const showBackButton = router.pathname !== '/' && router.pathname !== '/auth/login'; 

  // Fungsi logout placeholder
  const handleLogout = () => {
    // Implementasi Firebase sign out di sini
    // Misalnya: signOut(auth);
    router.push('/auth/login');
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 py-3 px-6 shadow-lg sticky top-0 z-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        
        {/* Logo Safeind dan Nama Aplikasi */}
        <div className="flex items-center space-x-3">
          <Image
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
              <Link href="/profile" className="text-gray-300 hover:text-white transition text-sm">Profil</Link>
              <button onClick={handleLogout} className="text-red-400 hover:text-red-500 transition text-sm">Keluar</button>
            </>
          ) : (
            <Link href="/auth/login" className="text-primary-neon hover:text-white transition text-sm font-semibold">Masuk</Link>
          )}
        </nav>
      </div>
      
      {/* Tombol Kembali */}
      {showBackButton && (
        <div className="max-w-6xl mx-auto mt-2">
           <BackButton fallbackUrl="/" />
        </div>
      )}
    </header>
  );
}
