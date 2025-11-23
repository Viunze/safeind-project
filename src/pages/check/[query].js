// src/pages/check/[query].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../../components/common/AppLayout';
import StatusCard from '../../components/common/StatusCard';
import Button from '../../components/common/Button';

// Mock Data untuk demonstrasi
const mockDatabase = {
    '123456789': { status: 'red', reports: 12, modus: 'Investasi Bodong', rekening: 'BCA 123456789' },
    '999999999': { status: 'yellow', reports: 2, modus: 'Jual barang tidak sesuai', rekening: 'BRI 999999999' },
    '555555555': { status: 'green', reports: 0 }
};

const ResultsPage = () => {
  const router = useRouter();
  const { query } = router.query;
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      // Simulasi Cek Database Real-Time
      setTimeout(() => {
        const key = query.split(' ').pop(); // Cek berdasarkan angka terakhir/kata
        const data = mockDatabase[key] || mockDatabase['555555555'];
        setResult(data);
        setLoading(false);
      }, 1500);
    }
  }, [query]);

  if (loading || !query) {
    return (
        <AppLayout>
            <div className="text-center py-20 text-gray-400">
                <p className="animate-pulse">Sedang Mencari Data untuk: {query || '...'}</p>
            </div>
        </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="pt-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-300">
            Hasil Pencarian untuk: <span className="text-white bg-gray-800 p-1 rounded">{query}</span>
        </h1>
        
        <StatusCard status={result.status}>
          {result.status === 'red' && (
            <div className="mt-2 text-white/90">
              <p className="mb-2">Ditemukan **{result.reports}** laporan yang diverifikasi terhadap identitas ini.</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>**Rekening/HP:** {result.rekening}</li>
                <li>**Modus Terbanyak:** {result.modus}</li>
                <li>**Laporan Terakhir:** 2 hari lalu</li>
                <li><a href="#" className="text-neon-blue hover:underline">Lihat Semua Bukti & Laporan</a></li>
              </ul>
            </div>
          )}
          {result.status === 'yellow' && (
            <p className="mt-2 text-white/90">
                Ditemukan {result.reports} laporan yang menunggu verifikasi komunitas. Lakukan transaksi dengan hati-hati.
            </p>
          )}
          {result.status === 'green' && (
            <>
              <p className="mt-2 text-white/90">
                Data yang Anda masukkan tidak terdaftar sebagai penipu di database SafeInd.
              </p>
              <Button 
                onClick={() => router.push('/report')}
                variant="secondary" 
                className="mt-4 border-neon-blue text-neon-blue"
              >
                Lapor jika Anda curiga
              </Button>
            </>
          )}
        </StatusCard>

      </div>
    </AppLayout>
  );
};

export default ResultsPage;
