// src/hooks/useReportForm.js
import { useState } from 'react';
import { generateFileHash, applyWatermark } from '../lib/hashUtils'; 

const initialFormData = {
  step: 1,
  // Step 1: Data Dasar
  rekening: '',
  bank: '',
  nomorHP: '',
  username: '',
  // Step 2: Bukti & Kronologi
  modus: '',
  kerugian: 0,
  buktiFiles: [], // Array of {file, name, size, hashId}
  // Step 3: Identitas Pelaku
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
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  // Update data KTP dari AI OCR
  const setKtpData = (data) => {
      setFormData(prev => ({
          ...prev,
          ktpData: { ...prev.ktpData, ...data }
      }));
  }

  // Menghapus file bukti dari daftar
  const removeFile = (hashId) => {
      setFormData(prev => ({
          ...prev,
          buktiFiles: prev.buktiFiles.filter(f => f.hashId !== hashId)
      }));
  }

  // Menambahkan file bukti dan membuat Hash ID
  const handleFileChange = async (filesList) => {
    const newFileObjects = [];

    for (const file of filesList) {
        // 1. Terapkan Watermark (Placeholder)
        const watermarkedFile = applyWatermark(file); 
        
        // 2. Buat Hash ID (Integritas)
        const hashId = await generateFileHash(watermarkedFile); 

        newFileObjects.push({
            file: watermarkedFile,
            name: file.name,
            size: file.size,
            hashId: hashId, // Kunci integritas bukti
        });
    }

    setFormData(prev => ({
        ...prev,
        buktiFiles: [...prev.buktiFiles, ...newFileObjects]
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return {
    formData,
    handleChange,
    handleFileChange,
    setKtpData,
    removeFile,
    nextStep,
    prevStep,
    resetForm,
    isFirstStep: formData.step === 1,
    isLastStep: formData.step === 4,
  };
};
