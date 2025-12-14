import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from 'rollup-plugin-visualizer';
import path from "path";
import { componentTagger } from "lovable-tagger";
import { securityHeaders } from "./src/plugins/security-headers";
import { visualizer as rollupVisualizer } from 'rollup-plugin-visualizer';

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
        // Remove babel configuration as it's not needed with SWC
      }),
      isProduction && securityHeaders(),
      mode === 'development' && componentTagger(),
      isProduction && rollupVisualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: 'dist/stats.html'
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
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true,
      },
      minify: isProduction ? 'esbuild' : false,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1600,
      reportCompressedSize: false,
      rollupOptions: {
        external: [],
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('@tawk.to')) {
                return 'tawkto';
              }
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                return 'vendor';
              }
              if (id.includes('@chakra-ui') || id.includes('@emotion') || id.includes('framer-motion')) {
                return 'ui';
              }
              return 'vendor';
            }
          },
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash][ext]',
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
