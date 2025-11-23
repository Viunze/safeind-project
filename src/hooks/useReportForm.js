// src/hooks/useReportForm.js
import { useState } from 'react';

const initialFormData = {
  step: 1,
  namaPenipu: '',
  rekening: '',
  bank: '',
  nomorHP: '',
  username: '',
  modus: '',
  kerugian: 0,
  buktiFiles: [], // Array of file objects
  ktpData: { // Data hasil OCR
    namaLengkap: '',
    nik: '',
    ttl: '',
    alamat: '',
  },
  identitasManual: '',
};

export const useReportForm = (totalSteps = 4) => {
  const [formData, setFormData] = useState(initialFormData);

  const nextStep = () => {
    setFormData(prev => ({
      ...prev,
      step: Math.min(prev.step + 1, totalSteps),
    }));
  };

  const prevStep = () => {
    setFormData(prev => ({
      ...prev,
      step: Math.max(prev.step - 1, 1),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Khusus untuk update data KTP (dari AI OCR)
  const setKtpData = (data) => {
      setFormData(prev => ({
          ...prev,
          ktpData: { ...prev.ktpData, ...data }
      }));
  }

  // Khusus untuk upload file bukti
  const handleFileChange = (files) => {
    // Di sini seharusnya ada proses Auto Watermark & Auto Hash ID
    // Untuk saat ini, kita simpan file object-nya saja.
    setFormData(prev => ({
        ...prev,
        buktiFiles: [...prev.buktiFiles, ...files]
    }));
  };

  const submitReport = async () => {
    // 1. Panggil service untuk menyimpan laporan ke database (Supabase)
    // 2. Jika sukses, arahkan ke halaman preview PDF
    console.log("Submitting Report:", formData);
    // Contoh: await reportService.save(formData);
    
    // Setelah submit, reset form:
    // setFormData(initialFormData); 
    return true; // Asumsi sukses
  };

  return {
    formData,
    handleChange,
    handleFileChange,
    setKtpData,
    nextStep,
    prevStep,
    submitReport,
    isFirstStep: formData.step === 1,
    isLastStep: formData.step === totalSteps,
  };
};
