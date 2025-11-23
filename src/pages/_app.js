// src/pages/_app.js

// PASTIKAN import path ini benar
import { AuthProvider } from '../context/AuthContext'; 

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
// ...
