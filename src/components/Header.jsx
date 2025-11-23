// src/components/Header.jsx
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import BackButton from './BackButton'; 

export default function Header() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  
  // Tampilkan tombol kembali di semua halaman kecuali Home (/)
  const showBackButton = router.pathname !== '/'; 

  return (
    <header className="bg-gray-900 border-b border-gray-700 py-4 px-6 shadow-lg sticky top-0 z-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        
        {/* Logo Safeind dan Nama Aplikasi */}
        <div className="flex items-center space-x-3">
          <Image
            src="https://files.catbox.moe/yu8hip.png" 
            alt="Safeind Logo"
            width={32} // Ukuran lebih kecil agar rapi
            height={32}
            className="rounded-full object-cover"
          />
          <Link href="/" className="text-2xl font-extrabold text-primary-neon tracking-wider">
            SAFEIND
          </Link>
        </div>

        {/* Navigasi dan Profile */}
        <nav className="flex items-center space-x-6">
          {currentUser ? (
            <>
              {/* Tambahkan navigasi internal di sini */}
              <Link href="/profile" className="text-gray-300 hover:text-white transition">Profil</Link>
              <button onClick={logout} className="text-red-400 hover:text-red-500 transition">Keluar</button>
            </>
          ) : (
            <Link href="/auth/login" className="text-primary-neon hover:text-white transition">Masuk</Link>
          )}
        </nav>
      </div>
      
      {/* Letakkan BackButton di sini agar terpisah dari navigasi utama */}
      {showBackButton && (
        <div className="max-w-6xl mx-auto mt-2">
           <BackButton fallbackUrl="/" />
        </div>
      )}
    </header>
  );
}
