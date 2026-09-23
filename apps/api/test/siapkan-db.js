// test/siapkan-db.js : dijalankan sekali sebelum seluruh pengujian
import { execFileSync } from "node:child_process";

export default function () {
  execFileSync("node", ["scripts/db-init.js"], {
    env: {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL_TEST ?? "postgresql://perpus:sandi@localhost:5432/perpusku_test",
    },
    stdio: "ignore",
  });
}
