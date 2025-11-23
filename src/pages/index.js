// src/pages/index.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header'; 
import { useAuth } from '../context/AuthContext'; 

export default function Home() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { currentUser } = useAuth(); 
  
  const handleCheck = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Redirect ke halaman cek dengan query
      router.push(`/check/${encodeURIComponent(query)}`);
    }
  };

  const handleReportClick = () => {
    if (currentUser) {
      router.push('/report');
    } else {
      // Redirect ke login jika belum login
      router.push('/auth/login'); 
    }
  };

  return (
    <div className="min-h-screen bg-dark-background text-white">
      <Header /> 
      
      <main className="max-w-6xl mx-auto p-8 pt-20">
        <section className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Cek & Laporkan Penipu Anti Ribet.
          </h1>
          <p className="text-lg text-gray-400 mb-12">
            Platform pelapor & pengecek penipu online paling lengkap di Indo.
          </p>

          <form onSubmit={handleCheck} className="flex max-w-lg mx-auto mb-10 bg-gray-700 rounded-xl shadow-lg border border-primary-neon/50">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cek Nomor Rekening / Nomor HP / Username Penipu..."
              className="flex-grow p-4 bg-transparent text-white placeholder-gray-400 focus:outline-none rounded-l-xl"
              required
            />
            <button
              type="submit"
              className="px-6 py-4 bg-primary-neon text-white font-semibold rounded-r-xl hover:bg-blue-600 transition"
            >
              Cek Penipu
            </button>
          </form>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleReportClick}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-md"
            >
              <span role="img" aria-label="Lapor">🚨</span>
              <span>Lapor Penipu Cepat</span>
            </button>
            <button
              // Aksi Download PDF (fungsi placeholder)
              className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-700 transition shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586V4a1 1 0 011-1z" clipRule="evenodd" />
                <path d="M16 17a1 1 0 01-1 1H5a1 1 0 01-1-1v-2a1 1 0 012 0v2h8v-2a1 1 0 012 0v2z" />
              </svg>
              <span>Download PDF</span>
            </button>
          </div>
        </section>
      </main>

      <footer className="py-4 text-center text-gray-500 border-t border-gray-800 absolute bottom-0 w-full">
        © 2025 SAFEIND. Aman Bersama Komunitas.
      </footer>
    </div>
  );
}
