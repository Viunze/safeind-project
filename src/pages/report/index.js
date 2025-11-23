// src/pages/report/index.js
import React from 'react';
import AppLayout from '../../components/common/AppLayout';
import { useReportForm } from '../../hooks/useReportForm';
import { useAuth } from '../../hooks/useAuth';
import NeonInput from '../../components/common/NeonInput';
import Button from '../../components/common/Button';
import KtpScanner from '../../components/features/reporting/KtpScanner'; // Komponen placeholder

// --- Step Components ---

const Step1DataDasar = ({ formData, handleChange }) => (
  <>
    <NeonInput 
      label="Nomor Rekening Penipu"
      id="rekening"
      name="rekening"
      value={formData.rekening}
      onChange={handleChange}
      placeholder="Wajib diisi"
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
    />
    <NeonInput 
      label="Username (IG/FB/Marketplace)"
      id="username"
      name="username"
      value={formData.username}
      onChange={handleChange}
    />
  </>
);

const Step2Bukti = ({ formData, handleFileChange }) => (
    <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-200">Upload Bukti Chat & Pembayaran</h3>
        <p className="text-sm text-gray-500">
            Bukti Anda akan otomatis di-watermark dan diberi Hash ID untuk mencegah manipulasi (Mode Bukti Aman).
        </p>
        
        {/* Placeholder untuk Upload Area */}
        <div className="p-8 border-2 border-dashed border-neon-purple/50 rounded-lg text-center cursor-pointer hover:bg-black-primary/50 transition">
            <input 
                type="file" 
                multiple 
                onChange={(e) => handleFileChange(e.target.files)} 
                className="hidden"
                id="file-upload"
            />
            <label htmlFor="file-upload" className="text-neon-blue font-medium block cursor-pointer">
                Klik atau seret file di sini (Screenshot, PDF, Gambar)
            </label>
            {formData.buktiFiles.length > 0 && (
                <p className="mt-2 text-sm text-gray-400">{formData.buktiFiles.length} file terpilih.</p>
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
        <h3 className="text-xl font-semibold text-gray-200">Identitas Pelaku (Opsional - Sangat Dianjurkan)</h3>
        
        {/* Placeholder KTP Scanner (AI OCR) */}
        <KtpScanner setKtpData={setKtpData} /> 

        {formData.ktpData.namaLengkap ? (
            <div className="p-4 bg-neon-purple/10 border border-neon-purple/50 rounded-lg">
                <p className="font-bold text-neon-purple">✅ Data KTP Terekstrak Otomatis:</p>
                <p className="text-sm">Nama: {formData.ktpData.namaLengkap}</p>
                <p className="text-sm">NIK: {formData.ktpData.nik}</p>
                {/* User tinggal Konfirmasi (tombol di StepWizard utama) */}
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

// --- Main Component ---

const ReportPage = () => {
  const { loading } = useAuth();
  const router = useRouter();
  const { 
    formData, 
    handleChange, 
    handleFileChange, 
    setKtpData,
    nextStep, 
    prevStep, 
    submitReport, 
    isFirstStep, 
    isLastStep 
  } = useReportForm(4); // Total 4 Steps (1-Data, 2-Bukti, 3-ID, 4-Preview)

  const renderStep = () => {
    switch (formData.step) {
      case 1:
        return <Step1DataDasar formData={formData} handleChange={handleChange} />;
      case 2:
        return <Step2Bukti formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} />;
      case 3:
        return <Step3IdentitasPelaku formData={formData} handleChange={handleChange} setKtpData={setKtpData} />;
      case 4:
        // Ini akan jadi PDF Preview Page (Step 4)
        return <div className="text-center py-10">
                    <h2 className="text-2xl font-bold text-neon-blue">Preview Laporan Resmi</h2>
                    <p className="text-gray-400">Anda akan melihat detail laporan dan PDF yang akan di-generate.</p>
                </div>; 
      default:
        return null;
    }
  };

  const handleNext = () => {
      // Tambahkan validasi dasar di sini sebelum nextStep()
      if (formData.step === 1 && (!formData.rekening || !formData.bank)) {
          alert("Nomor Rekening dan Bank wajib diisi di Step 1.");
          return;
      }
      if (formData.step === 2 && !formData.modus) {
          alert("Modus dan Kerugian wajib diisi di Step 2.");
          return;
      }
      nextStep();
  }

  const handleSubmit = async () => {
    if (formData.step === 4) {
      const success = await submitReport();
      if (success) {
        router.push('/report/preview?id=LPR-12345'); // Arahkan ke halaman preview dengan ID laporan
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
        
        {/* Progress Bar Sederhana */}
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
            <Button onClick={handleSubmit} variant="primary">
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
