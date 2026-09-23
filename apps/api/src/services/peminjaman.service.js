// src/services/peminjaman.service.js
import { pool } from "../db.js";
import { AppError } from "../utils/AppError.js";
import { hitungDenda } from "../utils/denda.js";

export async function pinjam(anggotaId, bukuId) {
  const klien = await pool.connect();
  try {
    await klien.query("BEGIN");
    const aktif = await klien.query(
      "SELECT COUNT(*)::int AS n FROM peminjaman WHERE anggota_id = $1 AND tgl_kembali IS NULL",
      [anggotaId]
    );
    if (aktif.rows[0].n >= 3) throw new AppError("Maksimal meminjam 3 buku", 422);

    const upd = await klien.query(
      "UPDATE buku SET stok = stok - 1 WHERE id = $1 AND stok > 0 RETURNING id", [bukuId]
    );
    if (upd.rowCount === 0) throw new AppError("Stok buku habis", 409);

    const { rows } = await klien.query(
      `INSERT INTO peminjaman (anggota_id, buku_id, jatuh_tempo)
       VALUES ($1, $2, CURRENT_DATE + 7) RETURNING *`, [anggotaId, bukuId]
    );
    await klien.query("COMMIT");
    return rows[0];
  } catch (err) {
    await klien.query("ROLLBACK");
    throw err;
  } finally {
    klien.release();       // kembalikan koneksi ke pool
  }
}

export async function kembalikan(id, tanggal = new Date()) {
  const klien = await pool.connect();
  try {
    await klien.query("BEGIN");
    const { rows } = await klien.query(
      "SELECT * FROM peminjaman WHERE id = $1 AND tgl_kembali IS NULL FOR UPDATE", [id]);
    if (!rows[0]) throw new AppError("Peminjaman tidak ditemukan atau sudah dikembalikan", 404);
    const denda = hitungDenda(new Date(rows[0].jatuh_tempo), tanggal);
    const hasil = await klien.query(
      "UPDATE peminjaman SET tgl_kembali = $2, denda = $3 WHERE id = $1 RETURNING *",
      [id, tanggal, denda]);
    await klien.query("UPDATE buku SET stok = stok + 1 WHERE id = $1", [rows[0].buku_id]);
    await klien.query("COMMIT");
    return hasil.rows[0];
  } catch (err) {
    await klien.query("ROLLBACK");
    throw err;
  } finally {
    klien.release();
  }
}

export async function milik(anggotaId) {
  const { rows } = await pool.query(
    `SELECT p.id, b.judul, p.tgl_pinjam, p.jatuh_tempo, p.tgl_kembali, p.denda
       FROM peminjaman p JOIN buku b ON b.id = p.buku_id
      WHERE p.anggota_id = $1 ORDER BY p.tgl_pinjam DESC`, [anggotaId]);
  return rows;
}
