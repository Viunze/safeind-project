// src/pages/index.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../components/common/AppLayout';
import Button from '../components/common/Button';

const Home = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/check/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <AppLayout>
      <div className="text-center py-16 lg:py-24">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white">
          Cek & Laporkan Penipu <span className="text-neon-purple">Anti Ribet.</span>
        </h1>
        <p className="text-xl text-gray-400 mb-10">
          Platform pelapor & pengecek penipu online paling lengkap di Indo.
        </p>

        {/* Search Bar Besar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10">
          <div className="flex bg-black-primary border border-neon-blue/50 rounded-lg p-1 shadow-neon-lg">
            <input
              type="text"
              placeholder="Cek Nomor Rekening / Nomor HP / Username Penipu..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow p-4 text-lg bg-transparent focus:outline-none text-white placeholder-gray-500"
              required
            />
            <button
              type="submit"
              className="bg-neon-blue hover:bg-neon-purple transition duration-300 text-black font-bold py-3 px-8 rounded-md"
            >
              Cek Penipu
            </button>
          </div>
        </form>

        {/* 3 Tombol Cepat */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button 
            variant="secondary" 
            onClick={() => router.push('/report')}
          >
            🚨 Lapor Penipu Cepat
          </Button>
          {/* Nanti bisa disederhanakan/dihapus jika PDF hanya muncul setelah lapor */}
          <Button 
            variant="tertiary" 
            onClick={() => alert('Fitur Download PDF membutuhkan ID Laporan.')}
          >
            📄 Download PDF
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
