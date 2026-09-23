// src/services/statistik.service.js
import { pool } from "../db.js";

export async function ringkasan() {
  const [angka, harian, tindakLanjut] = await Promise.all([
    pool.query(`SELECT
        COUNT(*) FILTER (WHERE tgl_pinjam = CURRENT_DATE)::int                       AS "hariIni",
        COUNT(*) FILTER (WHERE tgl_pinjam = CURRENT_DATE - 1)::int                   AS "kemarin",
        COUNT(*) FILTER (WHERE tgl_kembali IS NULL)::int                             AS "dipinjam",
        COUNT(*) FILTER (WHERE tgl_kembali IS NULL AND jatuh_tempo < CURRENT_DATE)::int AS "terlambat",
        COALESCE(SUM(denda) FILTER (WHERE date_trunc('month', tgl_kembali) = date_trunc('month', CURRENT_DATE)), 0)::int AS "dendaBulanIni"
      FROM peminjaman`),
    pool.query(`SELECT to_char(h, 'YYYY-MM-DD') AS tanggal, COUNT(p.id)::int AS jumlah
        FROM generate_series(CURRENT_DATE - 6, CURRENT_DATE, interval '1 day') AS h
        LEFT JOIN peminjaman p ON p.tgl_pinjam = h::date
        GROUP BY h ORDER BY h`),
    pool.query(`SELECT a.nama, b.judul, p.jatuh_tempo, (CURRENT_DATE - p.jatuh_tempo) AS telat
        FROM peminjaman p JOIN anggota a ON a.id = p.anggota_id JOIN buku b ON b.id = p.buku_id
        WHERE p.tgl_kembali IS NULL AND p.jatuh_tempo <= CURRENT_DATE + 1
        ORDER BY p.jatuh_tempo LIMIT 5`),
  ]);
  return { ...angka.rows[0], harian: harian.rows, tindakLanjut: tindakLanjut.rows };
}
