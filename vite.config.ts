
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const cacheBustPlugin = (): Plugin => ({
  name: "cache-bust-check",
  apply: "build",
  transformIndexHtml(html) {
    const script = `<script>
(function () {
  var current = document.querySelector('script[type="module"]');
  if (!current) return;
  var loaded = current.getAttribute("src");
  fetch("/index.html?_=" + Date.now(), { cache: "no-store" })
    .then(function (response) { return response.text(); })
    .then(function (html) {
      var match = html.match(/src="(\\/assets\\/index-[^"]+\\.js)"/);
      if (match && match[1] !== loaded) location.reload();
    })
    .catch(function () {});
})();
</script>`;
    return html.replace("</head>", `${script}\n</head>`);
  },
});

export default defineConfig({
  plugins: [react(), cacheBustPlugin()],
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
});
