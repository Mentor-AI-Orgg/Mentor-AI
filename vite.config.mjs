import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: 'frontend',
  plugins: [react()],
  publicDir: 'public',
  resolve: {
    alias: {
      '@shared': path.join(repoRoot, 'shared')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false
  },
  server: {
    port: 5173,
    fs: {
      allow: [repoRoot]
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
});
