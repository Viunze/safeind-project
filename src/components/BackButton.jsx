// src/components/BackButton.jsx
import { useRouter } from 'next/router';

export default function BackButton({ fallbackUrl = '/' }) {
  const router = useRouter();

  const handleBack = () => {
    // Cek apakah ada history sebelumnya
    if (window.history.length > 1) {
      router.back();
    } else {
      // Jika tidak ada history (misalnya akses langsung), redirect ke fallback
      router.push(fallbackUrl);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="text-primary-neon hover:text-white transition duration-200 p-2 rounded-md"
      aria-label="Go back"
    >
      &larr; Kembali
    </button>
  );
}
