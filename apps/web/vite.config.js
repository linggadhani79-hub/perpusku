// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // permintaan /api/... diteruskan ke API Express, sehingga frontend dan API
    // dianggap satu asal (tanpa masalah CORS dan cookie)
    proxy: { "/api": "http://localhost:3000" },
  },
});
