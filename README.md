# PerpusKu — Kode Sumber Buku *Pemrograman Full Stack JavaScript*

Kode sumber pendamping buku **Pemrograman Full Stack JavaScript: Dari Dasar Koding hingga Arsitektur Aplikasi Modern** karya **Lingga Kurnia Ramadhani, M.Kom.** (Yayasan Putra Adi Dharma, 2026).

PerpusKu adalah aplikasi perpustakaan kampus yang dibangun bertahap dari Bab 3 sampai Bab 15: katalog buku, login anggota dan petugas, peminjaman dengan denda, serta dasbor sirkulasi.

## Isi repositori

| Folder | Isi | Bab |
|---|---|---|
| `tahapan/bab-03-06-statis` | HTML, CSS, dan JavaScript murni | 3–6 |
| `tahapan/bab-07-react` | Frontend React + Vite dengan data lokal | 7 |
| `tahapan/bab-08-next` | Versi Next.js (App Router) | 8 |
| `apps/api` | Backend Express 5 + PostgreSQL, JWT, Zod, pengujian Vitest | 9–11, 14 |
| `apps/web` | Frontend React lengkap: katalog, masuk, pinjaman, dasbor | 7, 8, 15 |
| `compose.yaml`, `.github/`, `e2e/` | Docker Compose, CI GitHub Actions, uji Playwright | 14 |

Editor yang disarankan: **Visual Studio Code**. Kebutuhan: **Node.js 24** dan **PostgreSQL 17+** (atau Docker).

## Cara mengunduh

- **Tanpa Git:** klik tombol hijau **Code → Download ZIP**, ekstrak, lalu buka foldernya di VS Code.
- **Dengan Git:** `git clone https://github.com/linggadhani79-hub/perpusku.git`

## Menjalankan setiap tahap

### Bab 3–6: versi statis
Buka `tahapan/bab-03-06-statis` di VS Code, pasang ekstensi **Live Server**, lalu klik **Go Live** → `http://127.0.0.1:5500/index.html`.
(Jangan klik ganda `index.html`; `data/buku.json` tidak dapat dimuat lewat `file://`.)

### Bab 7: React
```bash
cd tahapan/bab-07-react
npm install
npm run dev        # http://localhost:5173
```

### Bab 8: Next.js (membutuhkan API aplikasi lengkap yang sudah berjalan)
```bash
cd tahapan/bab-08-next
cp .env.local.example .env.local
npm install
npm run dev        # http://localhost:3001/katalog
```

### Bab 9–15: aplikasi lengkap
1. Siapkan PostgreSQL dengan pengguna `perpus`, kata sandi `sandi`, serta basis data `perpusku` dan `perpusku_test`.
2. Backend:
   ```bash
   cd apps/api
   cp .env.example .env
   npm install
   npm run db:init    # membuat tabel dan data contoh
   npm run dev        # http://localhost:3000
   npm test           # pengujian API
   ```
3. Frontend (terminal kedua):
   ```bash
   cd apps/web
   npm install
   npm run dev        # http://localhost:5173
   npm test           # uji komponen React
   ```
4. Akun uji (kata sandi `rahasia123`):
   - `rina@kampus.ac.id` — anggota
   - `sena@kampus.ac.id` — petugas (dasbor di `/petugas`)
5. Uji *end-to-end* (di akar repositori, saat API dan web berjalan):
   ```bash
   npm install
   npx playwright install chromium
   npm run e2e
   ```

### Dengan Docker
```bash
cp .env.example .env
docker compose up -d --build
docker compose exec api node scripts/db-init.js
# buka http://localhost:8080
```

## Lisensi
Kode dalam repositori ini dirilis dengan lisensi MIT (lihat `LICENSE`). Isi buku tetap dilindungi hak cipta penerbit.
