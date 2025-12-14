import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from 'rollup-plugin-visualizer';
import path from "path";
import { componentTagger } from "lovable-tagger";
import { securityHeaders } from "./src/plugins/security-headers";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    base: "/",
    server: {
      host: "::",
      port: 8080,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      isProduction && securityHeaders(),
      mode === 'development' && componentTagger(),
      isProduction && visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist",
      sourcemap: isProduction ? 'hidden' : true,
      minify: isProduction ? 'esbuild' : false,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1600,
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
            contentful: ['contentful'],
            tawkto: ['@tawk.to/tawk-messenger-react'],
            ui: ['@chakra-ui/react', '@emotion/react', 'framer-motion'],
          },
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: ['@tawk.to/tawk-messenger-react'],
    },
    publicDir: "public",
  };
});
