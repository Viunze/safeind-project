// src/components/common/AppLayout.jsx
import React from 'react';

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black-primary text-gray-50">
      {/* Header atau Navigasi (Bisa ditambahkan kemudian) */}
      <header className="sticky top-0 z-10 p-4 bg-black-primary/90 border-b border-neon-purple/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-neon-blue tracking-wider">SAFEIND</h1>
          {/* Navigasi / Profile Button */}
          {/* Nanti diisi dengan useAuth().user */}
          <div className="text-sm">Menu / Profile</div> 
        </div>
      </header>

      {/* Konten Utama */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Footer Sederhana */}
      <footer className="p-4 mt-12 text-center text-xs text-gray-600 border-t border-gray-800">
        &copy; {new Date().getFullYear()} SAFEIND. Aman Bersama Komunitas.
      </footer>
    </div>
  );
};

export default AppLayout;
