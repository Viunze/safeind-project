// src/pages/_app.js

// BARIS INI WAJIB ADA & DI ATAS untuk memuat Tailwind CSS
import '../styles/globals.css'; 
import { AuthProvider } from '../context/AuthContext'; 

function MyApp({ Component, pageProps }) {
 
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
