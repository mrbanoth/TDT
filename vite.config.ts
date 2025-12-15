// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // Image optimization options
      jpg: { quality: 80 },
      jpeg: { quality: 80 },
      png: { quality: 80 },
      webp: { quality: 80 },
    }),
    visualizer({ open: true }),
  ],

  server: {
    port: 8080,
    strictPort: true,
    proxy: {
      // Proxy for Contentful assets
      '/contentful-assets': {
        target: 'https://images.ctfassets.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/contentful-assets/, ''),
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});