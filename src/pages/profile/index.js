// src/pages/profile/index.js
import React, { useState, useEffect } from 'react';
import AppLayout from '../../components/common/AppLayout';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';

// Mock data riwayat laporan
const mockReportHistory = [
    { id: 'LPR-12345', date: '2025-10-01', target: 'BCA 9876', modus: 'Fiktif', status: 'Verified', reports: 15 },
    { id: 'LPR-54321', date: '2025-11-15', target: 'HP 0812xxxx', modus: 'Jasa Palsu', status: 'Pending', reports: 0 },
    { id: 'LPR-90123', date: '2025-11-18', target: 'IG @scammer', modus: 'Phishing', status: 'Processing', reports: 3 },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Verified': return 'bg-safe-green text-green-900';
        case 'Pending': return 'bg-safe-yellow text-yellow-900';
        case 'Processing': return 'bg-neon-purple text-purple-900';
        default: return 'bg-gray-500 text-white';
    }
};

const ProfilePage = () => {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user) {
        // Dalam aplikasi nyata: ambil data riwayat laporan dari Supabase/DB
        // fetchReportHistory(user.uid).then(data => setHistory(data));
        setHistory(mockReportHistory);
    }
  }, [user]);
  
  const handleViewPdf = (reportId) => {
      router.push(`/report/preview?id=${reportId}`);
  }

  if (loading || !user) return null; // Ditangani oleh AuthContext

  return (
    <AppLayout>
      <div className="py-10">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Selamat Datang, <span className="text-neon-blue">{user.displayName || user.email}</span>
        </h1>
        <p className="text-gray-400 mb-8">Panel Laporan Anda ({user.email})</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Kartu Informasi */}
            <div className="bg-black-primary/80 p-5 rounded-lg border border-neon-purple/20">
                <p className="text-sm text-gray-400">Total Laporan</p>
                <p className="text-3xl font-bold text-neon-blue">{history.length}</p>
            </div>
            <div className="bg-black-primary/80 p-5 rounded-lg border border-neon-purple/20">
                <p className="text-sm text-gray-400">Laporan Diverifikasi</p>
                <p className="text-3xl font-bold text-safe-green">{history.filter(h => h.status === 'Verified').length}</p>
            </div>
            <div className="bg-black-primary/80 p-5 rounded-lg border border-neon-purple/20">
                <p className="text-sm text-gray-400">Akun Dibuat</p>
                <p className="text-xl font-bold text-gray-300">{new Date(user.metadata.creationTime).toLocaleDateString()}</p>
            </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-700 pb-2">Riwayat Laporan Anda</h2>
        
        {/* Tabel Riwayat Laporan */}
        <div className="overflow-x-auto bg-black-primary/80 rounded-lg border border-gray-700">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-900 text-gray-400">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Target</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Modus</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    {history.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-900 transition duration-150">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neon-blue">{report.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{report.target}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{report.modus}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}>
                                    {report.status} ({report.reports} Verifikasi)
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                {report.status === 'Verified' ? (
                                    <Button variant="secondary" onClick={() => handleViewPdf(report.id)} className="py-1 px-3 text-xs">
                                        Unduh PDF
                                    </Button>
                                ) : (
                                    <span className="text-gray-500 text-xs">Menunggu</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Tombol Logout */}
        <div className="mt-10 pt-5 border-t border-gray-700 flex justify-end">
            <Button onClick={signOut} variant="tertiary" className="bg-red-700 hover:bg-red-600 text-white">
                Keluar Akun
            </Button>
        </div>

      </div>
    </AppLayout>
  );
};

export default ProfilePage;
