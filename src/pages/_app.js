// src/pages/_app.js
import '../styles/globals.css'; 
import { AuthProvider } from '../context/AuthContext'; 
import { Toaster } from 'react-hot-toast'; // Import Toaster component

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      {/* Konfigurasi Toaster untuk notifikasi in-app */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          // Custom styling menggunakan class Tailwind untuk tampilan dark mode/neon
          className: 'bg-dark-background text-white shadow-xl border border-primary-neon/30',
          style: {
            background: '#1f2937', 
            color: '#f3f4f6',
          }
        }}
      />
    </AuthProvider>
  );
}

export default MyApp;
