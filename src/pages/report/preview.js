// src/pages/report/preview.js
import React, { useState, useEffect } from 'react';
import AppLayout from '../../components/common/AppLayout';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import { generateOfficialPdf } from '../../lib/pdfGenerator';

const PDFPreviewPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [pdfDataUrl, setPdfDataUrl] = useState(null);
  const [generating, setGenerating] = useState(true);

  // --- Mock Data Laporan ---
  // Di aplikasi nyata, Anda akan mengambil data laporan berdasarkan 'id' dari database.
  const mockReportData = {
      id: id,
      rekening: 'BCA 987654321',
      modus: 'Jual beli motor bekas fiktif via Facebook',
      kerugian: 7500000,
      ktpData: { namaLengkap: 'Budi Hartono' },
  };

  useEffect(() => {
    if (id && !loading) {
        // Asumsi jika user sudah login, mereka bisa generate PDF.
        const generate = async () => {
            setGenerating(true);
            try {
                // Panggil fungsi generator yang mengambil data laporan
                const url = await generateOfficialPdf(mockReportData);
                setPdfDataUrl(url);
            } catch (error) {
                console.error("Gagal Generate PDF:", error);
                alert("Gagal membuat PDF. Coba lagi.");
            } finally {
                setGenerating(false);
            }
        };
        generate();
    }
    if (!id && !loading && user) {
        // Jika tidak ada ID, redirect ke profile
        router.push('/profile');
    }
  }, [id, loading, user]);

  const handleDownload = () => {
    if (pdfDataUrl) {
      const link = document.createElement('a');
      link.href = pdfDataUrl;
      link.download = `Laporan_SAFEIND_${id}.pdf`;
      link.click();
    }
  };

  if (loading || !user) return null; // Ditangani oleh AuthContext

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-neon-purple">
            📄 Laporan Resmi Siap Diunduh
        </h1>
        
        <div className="bg-black-primary/80 p-8 rounded-xl border border-neon-blue/20 shadow-xl">
            <p className="text-gray-300 mb-6 text-center">
                Laporan Anda (ID: <span className="text-neon-blue font-mono">{id}</span>) telah diverifikasi dan siap diunduh sebagai dokumen resmi.
            </p>

            <div className="flex justify-center mb-8">
                <Button 
                    onClick={handleDownload}
                    disabled={generating}
                    className="flex items-center gap-2"
                >
                    {generating ? 'Membuat PDF...' : '⬇️ Download Laporan Resmi (PDF)'}
                </Button>
            </div>

            {/* Area Preview PDF */}
            <div className="mt-6 border-2 border-gray-700 h-[500px] overflow-auto bg-gray-900 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-400 mb-2">PDF Preview (Mock)</h3>
                {pdfDataUrl && (
                    <iframe 
                        src={pdfDataUrl} 
                        className="w-full h-full border-none"
                        title="PDF Laporan SafeInd"
                    ></iframe>
                )}
            </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PDFPreviewPage;
