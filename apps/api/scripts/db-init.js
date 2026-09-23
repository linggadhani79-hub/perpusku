// scripts/db-init.js : membuat tabel, mengisi data contoh, dan akun uji
import "dotenv/config";
import fs from "node:fs";
import bcrypt from "bcrypt";
import { pool } from "../src/db.js";

const sql = (f) => fs.readFileSync(new URL(`../db/${f}`, import.meta.url), "utf8");
await pool.query(sql("skema.sql"));
await pool.query(sql("data-awal.sql"));

const hash = await bcrypt.hash("rahasia123", 12);
await pool.query(
  `INSERT INTO anggota (nama, email, hash_sandi, peran) VALUES
   ('Sena Mahendra', 'sena@kampus.ac.id', $1, 'petugas'),
   ('Rina Kartika',  'rina@kampus.ac.id', $1, 'anggota'),
   ('Budi Santoso',  'budi@kampus.ac.id', $1, 'anggota'),
   ('Dewi Anggraini','dewi@kampus.ac.id', $1, 'anggota'),
   ('Fajar Nugroho', 'fajar@kampus.ac.id', $1, 'anggota')`, [hash]);

// riwayat peminjaman 7 hari terakhir agar dasbor berisi (sebagian besar sudah dikembalikan)
await pool.query(`
  INSERT INTO peminjaman (anggota_id, buku_id, tgl_pinjam, jatuh_tempo, tgl_kembali)
  SELECT 3 + (g % 3), 1 + (g % 8), CURRENT_DATE - (g % 7), CURRENT_DATE - (g % 7) + 7,
         CASE WHEN g > 6 THEN CURRENT_DATE - (g % 7) + 2 END
    FROM generate_series(1, 30) AS g`);
await pool.query(`
  INSERT INTO peminjaman (anggota_id, buku_id, tgl_pinjam, jatuh_tempo) VALUES
   (2, 2, CURRENT_DATE - 10, CURRENT_DATE - 3),
   (3, 6, CURRENT_DATE - 8,  CURRENT_DATE - 1)`);
console.log("Basis data siap. Akun uji: sena@kampus.ac.id (petugas), rina@kampus.ac.id (anggota), sandi: rahasia123");
await pool.end();
