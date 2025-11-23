// src/lib/hashUtils.js

/**
 * Mengubah ArrayBuffer menjadi string hexadecimal.
 * @param {ArrayBuffer} buffer 
 * @returns {string} Hash string
 */
const bufferToHex = (buffer) => {
  return Array.prototype.map.call(new Uint8Array(buffer), x => (('00' + x.toString(16)).slice(-2))).join('');
}

/**
 * Menghasilkan SHA-256 Hash dari sebuah File (Blob).
 * Ini memastikan integritas dan tidak adanya manipulasi pada bukti.
 * @param {File} file - File bukti yang diunggah.
 * @returns {Promise<string>} SHA-256 Hash unik dari file.
 */
export const generateFileHash = async (file) => {
  if (!window.crypto || !window.crypto.subtle) {
    console.error("Web Cryptography API not supported. Cannot generate file hash.");
    return `MOCK_HASH_${Date.now()}`; // Fallback hash
  }

  try {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
    return bufferToHex(hashBuffer);
  } catch (error) {
    console.error("Error during file hashing:", error);
    return `ERROR_HASH_${Date.now()}`;
  }
}

/**
 * Implementasi Auto Watermark (Placeholder)
 * Di aplikasi nyata, ini memerlukan library Canvas/Image Processing.
 */
export const applyWatermark = (file) => {
    // Di sini akan ada kode untuk menambahkan watermark 'SAFEIND - ID Laporan' ke file
    console.log(`Applying SAFEIND watermark to: ${file.name}`);
    return file; // Untuk saat ini, kembalikan file aslinya
}
