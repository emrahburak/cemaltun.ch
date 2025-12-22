import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  build: {
    // Uyarı limitini biraz artırabiliriz (örneğin 1000kb), ama asıl çözüm altta
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Bu fonksiyon, kütüphaneleri (vendor) ayrı bir dosyaya paketler
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
