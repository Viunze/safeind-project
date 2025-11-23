// src/lib/ocrService.js

/**
 * Simulasi Data KTP yang berhasil diekstrak (AI Auto Complete).
 */
const mockOcrResult = {
    namaLengkap: 'BUDI SANTOSO',
    nik: '3273xxxxxxxxxxxx', // NIK harus disamarkan
    ttl: 'BANDUNG, 10-01-1985',
    alamat: 'JL. MERDEKA NO. 45 RT 001/002',
};

/**
 * Melakukan pemindaian OCR pada gambar KTP yang diunggah.
 * @param {File} ktpImageFile - File gambar KTP.
 * @returns {Promise<object>} Data identitas yang diekstrak.
 */
export const extractKtpData = async (ktpImageFile) => {
    console.log("Memulai pemindaian OCR KTP untuk:", ktpImageFile.name);

    // --- PENTING: Implementasi nyata harus mengirim file ini ke API OCR ---

    // Simulasi penundaan proses OCR canggih
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Asumsi OCR sukses
    console.log("Data KTP berhasil diekstrak.");
    return mockOcrResult;
};
