// src/services/reportService.js
import { supabase } from '../lib/supabase/config';

const REPORT_TABLE = 'reports'; // Asumsi nama tabel Anda di Supabase

/**
 * 1. Menyimpan laporan baru ke database.
 * @param {object} reportData - Data laporan dari useReportForm.
 * @param {string} userId - UID user dari Firebase Auth.
 */
export const createReport = async (reportData, userId) => {
  const { 
    rekening, bank, nomorHP, username, modus, kerugian, 
    ktpData, identitasManual, buktiFiles 
  } = reportData;

  // Struktur data yang akan disimpan (perlu disesuaikan dengan skema tabel Supabase Anda)
  const reportToInsert = {
    user_id: userId,
    target_identifier: rekening || nomorHP || username,
    rekening_bank: `${bank} ${rekening}`,
    contact_info: nomorHP,
    username_sosmed: username,
    modus_penipuan: modus,
    kerugian: kerugian,
    pelaku_ktp_data: ktpData, // Simpan sebagai JSON
    pelaku_identitas_manual: identitasManual,
    status: 'Pending', // Default status laporan
    // Catatan: BuktiFiles harus disimpan di Supabase Storage dan linknya disimpan di sini.
  };

  try {
    const { data, error } = await supabase
      .from(REPORT_TABLE)
      .insert([reportToInsert])
      .select();

    if (error) throw error;
    
    // Asumsi data[0] adalah laporan yang baru dibuat
    console.log("Laporan sukses dibuat:", data[0]);
    return data[0]; 

  } catch (error) {
    console.error('Error creating report:', error.message);
    throw new Error(`Gagal menyimpan laporan: ${error.message}`);
  }
};

/**
 * 2. Mencari data penipu berdasarkan query (Real-Time Checker).
 * @param {string} query - Nomor rekening, HP, atau username.
 */
export const checkScammer = async (query) => {
  // Bersihkan query dan ubah ke huruf kecil untuk pencarian case-insensitive
  const normalizedQuery = query.toLowerCase().trim();

  try {
    // Mencari di kolom target_identifier (rekening, hp, username)
    const { data, error } = await supabase
      .from(REPORT_TABLE)
      .select('id, modus_penipuan, status')
      .ilike('target_identifier', `%${normalizedQuery}%`); // Menggunakan ilike untuk pencarian sebagian

    if (error) throw error;

    if (data.length === 0) {
      return { status: 'green', reports: 0, details: [] };
    }
    
    // Logika Status Berdasarkan Data
    const verifiedReports = data.filter(r => r.status === 'Verified').length;
    const totalReports = data.length;
    
    let status = 'yellow';
    if (verifiedReports > 5) { // Threshold 5 verifikasi (bisa disesuaikan)
        status = 'red';
    } else if (totalReports > 0) {
        status = 'yellow';
    }

    return { 
      status, 
      reports: totalReports, 
      details: data,
      verifiedReports: verifiedReports
    };

  } catch (error) {
    console.error('Error checking scammer:', error.message);
    // Jika ada error database, tetap kembalikan status aman untuk user
    return { status: 'green', reports: 0, details: [] };
  }
};

/**
 * 3. Mengambil riwayat laporan oleh user.
 */
export const fetchUserReports = async (userId) => {
  try {
    const { data, error } = await supabase
      .from(REPORT_TABLE)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;

  } catch (error) {
    console.error('Error fetching user reports:', error.message);
    return [];
  }
};
