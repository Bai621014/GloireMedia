import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuration optimisée pour le déploiement Web3
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Plus rapide pour le build sur Render
    minify: 'terser', // Compression maximale pour la vitesse
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@supabase/supabase-js'],
        },
      },
    },
  },
});
