import { defineConfig } from 'vite';
// Wersja lokalna: jeden skrypt IIFE (bez type=module), żeby index.html działał po dwukliku z dysku (file://).
export default defineConfig({
  base: './',
  server: { port: 8781, host: '127.0.0.1' },
  build: {
    outDir: 'dist', chunkSizeWarningLimit: 3000, assetsInlineLimit: 0, modulePreload: false, cssCodeSplit: false,
    rollupOptions: { output: { format: 'iife', inlineDynamicImports: true } },
  },
  plugins: [{
    name: 'file-protocol',
    enforce: 'post',
    transformIndexHtml: { order: 'post', handler: h => h.replace(/<script type="module" crossorigin/g, '<script defer').replace(/ crossorigin/g, '') },
  }],
});
