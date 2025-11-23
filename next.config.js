// next.config.js (Di Root Directory, bukan di folder src)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Jika kode Anda di dalam 'src', pastikan ini aktif
  // Next.js v14+ sudah default support src directory.
  // Tapi kadang perlu di override jika ada masalah deployment.
  // Gunakan 'src/' sebagai lokasi dasar halaman.
  // pageExtensions: ['js', 'jsx', 'ts', 'tsx'], 
  
  // Set output agar sesuai dengan Vercel (jika ada konflik)
  output: 'standalone', 
  
  // Optional: untuk menghindari masalah build cache Vercel
  // i18n: { locales: ['en'], defaultLocale: 'en' }, 

  // Agar tidak ada error missing public directory saat build
  experimental: {
    // Menghilangkan build output yang mungkin menyebabkan konflik di Vercel
    outputFileTracingExcludes: {
      '**/*': ['public'],
    },
  },
};

module.exports = nextConfig;
