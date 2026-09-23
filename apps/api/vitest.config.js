// vitest.config.js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    env: {
      NODE_ENV: "test",
      // basis data KHUSUS pengujian, dikosongkan & diisi ulang sebelum pengujian
      DATABASE_URL: process.env.DATABASE_URL_TEST ?? "postgresql://perpus:sandi@localhost:5432/perpusku_test",
      JWT_SECRET: "rahasia-uji",
      JWT_REFRESH_SECRET: "rahasia-uji-2",
    },
    globalSetup: "./test/siapkan-db.js",
    fileParallelism: false,   // file uji berbagi satu basis data, jadi dijalankan bergantian
  },
});
