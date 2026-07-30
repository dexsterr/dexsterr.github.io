
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: '/',
  server: {
    host: true,
    port: 8080,
    hmr: {
      port: 8080,
    },
    watch: {
      ignored: ['**/assets/**'],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: '.',
    assetsDir: 'assets',
    emptyOutDir: false,
  },
}));
