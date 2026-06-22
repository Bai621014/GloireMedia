/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Optimisé pour les conteneurs (Render)
  images: {
    domains: ['placeholder-project.supabase.co'],
  },
};

module.exports = nextConfig;
