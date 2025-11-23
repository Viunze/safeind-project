// src/pages/_app.js
import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext'; // Import AuthProvider

function MyApp({ Component, pageProps }) {
  return (
    // Wrap the entire application with AuthProvider
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
