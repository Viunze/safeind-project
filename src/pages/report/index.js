// src/pages/report/index.js
import React from 'react';
import AppLayout from '../../components/common/AppLayout';
import { useRouter } from 'next/router';
import { useReportForm } from '../../hooks/useReportForm';
import { useAuth } from '../../hooks/useAuth';
import { createReport } from '../../services/reportService'; // Diperlukan untuk submit
import NeonInput from '../../components/common/NeonInput';
import Button from '../../components/common/Button';
import KtpScanner from '../../components/features/reporting/KtpScanner';

// --- Step Components (Inner Components) ---

const Step1DataDasar = ({ formData, handleChange }) => (
  <>
    <NeonInput 
      label="Nomor Rekening Penipu"
      id="rekening"
      name="rekening"
      value={formData.rekening}
      onChange={handleChange}
      placeholder="Wajib diisi: 10 digit, dst."
      required
    />
    <NeonInput 
      label="Bank (Contoh: BCA, BRI)"
      id="bank"
      name="bank"
      value={formData.bank}
      onChange={handleChange}
      required
    />
    <NeonInput 
      label="Nomor HP Penipu (WA/Telepon)"
      id="nomorHP"
      name="nomorHP"
      value={formData.nomorHP}
      onChange={handleChange}
      placeholder="Contoh: 0812xxxxxxxx"
    />
    <NeonInput 
      label="Username (IG/FB/Marketplace)"
      id="username"
      name="username"
      value={formData.username}
      onChange={handleChange}
      placeholder="Contoh: @sellerfiktif"
    />
  </>
);

const Step2Bukti = ({ formData, handleChange, handleFileChange, removeFile }) => (
    <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-200">Upload Bukti Chat & Pembayaran</h3>
        <p className="text-sm text-gray-500">
            Bukti dijamin: otomatis di-watermark dan diberi Hash ID untuk Mode Bukti Aman.
        </p>
        
        {/* Upload Area */}
        <div className="p-4 border-2 border-dashed border-neon-purple/50 rounded-lg text-center cursor-pointer hover:bg-black-primary/50 transition">
            <input 
                type="file" 
                multiple 
                onChange={(e) => handleFileChange(e.target.files)} 
                className="hidden"
                id="file-upload"
                accept="image/*, application/pdf"
            />
            <label htmlFor="file-upload" className="text-neon-blue font-medium block cursor-pointer">
                Klik atau seret file di sini
            </label>
        </div>

        {/* Daftar File Terupload */}
        <div className="pt-2">
            {formData.buktiFiles.map((fileObj) => (
                <div key={fileObj.hashId} className="flex justify-between items-center bg-gray-900 p-2 rounded text-sm mb-1 border border-gray-700">
                    <span className="truncate w-3/4">{fileObj.name} 
                        <span className="text-xs text-gray-500 ml-2">({(fileObj.size / 1024).toFixed(1)} KB)</span>
                    </span>
                    <button 
                        onClick={() => removeFile(fileObj.hashId)}
                        className="text-safe-red hover:text-red-400 text-xs ml-2"
                    >
                        [Hapus]
                    </button>
                </div>
            ))}
            {formData.buktiFiles.length === 0 && (
                 <p className="text-sm text-gray-500 text-center">Belum ada file bukti yang diunggah.</p>
            )}
        </div>

        <NeonInput
            label="Modus Penipuan (Wajib diisi)"
            id="modus"
            name="modus"
            value={formData.modus}
            onChange={handleChange}
            placeholder="Contoh: Jual beli barang fiktif di Instagram"
            required
        />
         <NeonInput
            label="Kerugian (Rupiah)"
            id="kerugian"
            name="kerugian"
            type="number"
            value={formData.kerugian}
            onChange={handleChange}
            required
        />
    </div>
);

const Step3IdentitasPelaku = ({ formData, handleChange, setKtpData }) => (
    <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-200">Identitas Pelaku (Opsional - AI Auto Complete)</h3>
        
        {/* KTP Scanner Component */}
        <KtpScanner setKtpData={setKtpData} /> 

        {formData.ktpData.namaLengkap ? (
            <div className="p-4 bg-neon-purple/10 border border-neon-purple/50 rounded-lg">
                <p className="font-bold text-neon-purple">✅ Data KTP Terekstrak Otomatis (Perlu Konfirmasi):</p>
                <p className="text-sm">Nama Lengkap: {formData.ktpData.namaLengkap}</p>
                <p className="text-sm">NIK: {formData.ktpData.nik}</p>
                <p className="text-sm text-gray-500 mt-2">Anda bisa edit data di atas sebelum submit jika ada kesalahan ekstrak.</p>
            </div>
        ) : (
             <NeonInput
                label="Tulis Identitas Pelaku Lainnya (Jika ada)"
                id="identitasManual"
                name="identitasManual"
                value={formData.identitasManual}
                onChange={handleChange}
                placeholder="Contoh: Nama di WA adalah Budi Santoso, Pria, dari Jakarta"
            />
        )}
    </div>
);

const Step4PDFPreview = ({ formData }) => (
    <div className="text-center py-10 border border-gray-700 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-neon-blue mb-3">Langkah Akhir: Review & Generate</h2>
        <p className="text-gray-400 mb-6">
            Pastikan semua data sudah benar. Setelah ini, laporan akan disimpan dan PDF resmi akan dibuat.
        </p>

        {/* Ringkasan Data Krusial */}
        <div className="text-left max-w-sm mx-auto space-y-2 text-gray-300">
            <p>Rekening/Target: <span className="text-white font-mono">{formData.rekening || formData.nomorHP || formData.username}</span></p>
            <p>Modus: <span className="text-white">{formData.modus}</span></p>
            <p>Kerugian: <span className="text-safe-red">Rp {formData.kerugian.toLocaleString('id-ID')}</span></p>
            <p>Bukti Terlampir: <span className="text-safe-green">{formData.buktiFiles.length} file</span></p>
            <p>Identitas KTP (AI): <span className="text-neon-purple">{formData.ktpData.namaLengkap || 'Tidak Ada'}</span></p>
        </div>
    </div>
);


// --- Main Component ---

const ReportPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { 
    formData, 
    handleChange, 
    handleFileChange, 
    setKtpData,
    removeFile,
    nextStep, 
    prevStep, 
    resetForm,
    isFirstStep, 
    isLastStep 
  } = useReportForm(4); 

  const renderStep = () => {
    switch (formData.step) {
      case 1:
        return <Step1DataDasar formData={formData} handleChange={handleChange} />;
      case 2:
        return <Step2Bukti formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} removeFile={removeFile} />;
      case 3:
        return <Step3IdentitasPelaku formData={formData} handleChange={handleChange} setKtpData={setKtpData} />;
      case 4:
        return <Step4PDFPreview formData={formData} />; 
      default:
        return null;
    }
  };

  const handleNext = () => {
      // Validasi Dasar antar Step
      if (formData.step === 1 && (!formData.rekening || !formData.bank)) {
          alert("Nomor Rekening dan Bank wajib diisi di Step 1.");
          return;
      }
      if (formData.step === 2 && (!formData.modus || formData.kerugian <= 0)) {
          alert("Modus dan Kerugian (harus > 0) wajib diisi di Step 2.");
          return;
      }
      nextStep();
  }

  const handleSubmit = async () => {
    if (!user) {
        alert("Anda harus login untuk menyelesaikan laporan.");
        return;
    }
    
    // Pastikan ini adalah step terakhir sebelum submit
    if (formData.step === 4) {
      alert("Sedang Menyimpan Laporan... Harap Tunggu.");
      
      try {
        const newReport = await createReport(formData, user.uid);
        
        // Bersihkan form setelah sukses
        resetForm(); 
        
        // Redirect ke halaman preview dengan ID laporan yang baru
        router.push(`/report/preview?id=${newReport.id}`); 
        
      } catch (e) {
        alert(e.message || "Terjadi kesalahan saat menyimpan laporan. Cek koneksi Anda.");
      }
    }
  };

  if (loading) return null; // Ditangani di AuthContext

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto bg-black-primary/80 p-6 rounded-xl border border-neon-purple/20 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-neon-blue">
          🚨 Lapor Penipu (Step {formData.step}/4)
        </h1>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-8">
            <div 
                className="bg-neon-purple h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${(formData.step / 4) * 100}%` }}
            ></div>
        </div>

        <div className="min-h-[400px]">{renderStep()}</div>

        <div className="flex justify-between mt-8 pt-4 border-t border-gray-700">
          <Button onClick={prevStep} disabled={isFirstStep} variant="secondary">
            ← Kembali
          </Button>
          
          {isLastStep ? (
            <Button onClick={handleSubmit} variant="primary" className="bg-safe-green hover:bg-green-600">
              ✅ Konfirmasi & Generate PDF
            </Button>
          ) : (
            <Button onClick={handleNext} variant="primary">
              Lanjut →
            </Button>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ReportPage;
