// src/components/BackButton.jsx
import { useRouter } from 'next/router';

export default function BackButton({ fallbackUrl = '/' }) {
  const router = useRouter();

  const handleBack = () => {
    // Kembali ke halaman sebelumnya jika riwayat tersedia
    if (window.history.length > 1) {
      router.back();
    } else {
      // Jika tidak, kembali ke halaman utama
      router.push(fallbackUrl);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="text-gray-400 hover:text-white transition duration-200 p-2 rounded-md flex items-center space-x-1"
      aria-label="Kembali"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
      <span>Kembali</span>
    </button>
  );
}
