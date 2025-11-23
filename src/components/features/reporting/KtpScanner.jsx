// src/components/features/reporting/KtpScanner.jsx
import React, { useState } from 'react';
import Button from '../../common/Button';

const KtpScanner = ({ setKtpData }) => {
    const [file, setFile] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleScan = async () => {
        if (!file) return;

        setIsScanning(true);
        try {
            // Import services di sini (jika belum di-import global)
            const { extractKtpData } = await import('../../../lib/ocrService'); 
            
            const extractedData = await extractKtpData(file);
            setKtpData(extractedData); // Update state di useReportForm
            alert("Data KTP berhasil diekstrak otomatis! Klik Lanjut.");

        } catch (error) {
            alert("Gagal memindai KTP. Coba lagi atau isi manual.");
            console.error(error);
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="p-4 bg-gray-900 border border-neon-purple/30 rounded-lg space-y-4">
            <h4 className="text-lg font-semibold text-neon-purple">AI Auto Complete Data Identitas (KTP)</h4>
            <p className="text-sm text-gray-400">
                Fitur canggih untuk auto-ekstrak Nama, NIK, dan Alamat dari foto KTP pelaku. (Opsional)
            </p>

            <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neon-blue/20 file:text-neon-blue hover:file:bg-neon-blue/30"
            />
            
            {file && (
                <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                    <p className="text-sm text-gray-400">{file.name}</p>
                    <Button 
                        onClick={handleScan}
                        disabled={isScanning}
                        variant="primary"
                        className="text-sm py-2 px-4"
                    >
                        {isScanning ? '⏳ Memindai...' : 'Start Scan OCR'}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default KtpScanner;
