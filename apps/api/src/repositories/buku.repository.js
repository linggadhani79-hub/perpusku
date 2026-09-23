// src/repositories/buku.repository.js
import { pool } from "../db.js";

export async function cari({ q = "", kategori, offset = 0, limit = 10 }) {
  const { rows } = await pool.query(
    `SELECT b.id, b.judul, b.penulis, b.tahun, b.stok, k.nama AS kategori
       FROM buku b LEFT JOIN kategori k ON k.id = b.kategori_id
      WHERE b.judul ILIKE $1 AND ($2::text IS NULL OR k.nama = $2)
      ORDER BY b.judul
      LIMIT $3 OFFSET $4`,
    [`%${q}%`, kategori ?? null, limit, offset]
  );
  return rows;
}

export async function cariById(id) {
  const { rows } = await pool.query(
    `SELECT b.*, k.nama AS kategori FROM buku b
       LEFT JOIN kategori k ON k.id = b.kategori_id WHERE b.id = $1`, [id]);
  return rows[0] ?? null;
}

export async function simpan({ isbn, judul, penulis, tahun, stok, kategori }) {
  const { rows } = await pool.query(
    `INSERT INTO buku (isbn, judul, penulis, tahun, stok, kategori_id)
     VALUES ($1, $2, $3, $4, $5, (SELECT id FROM kategori WHERE nama = $6))
     RETURNING *`,
    [isbn ?? null, judul, penulis, tahun, stok, kategori]
  );
  return rows[0];
}

export async function ubah(id, data) {
  const { rows } = await pool.query(
    `UPDATE buku SET judul = COALESCE($2, judul), penulis = COALESCE($3, penulis),
            tahun = COALESCE($4, tahun), stok = COALESCE($5, stok)
      WHERE id = $1 RETURNING *`,
    [id, data.judul, data.penulis, data.tahun, data.stok]
  );
  return rows[0] ?? null;
}

export async function hapus(id) {
  const { rowCount } = await pool.query("DELETE FROM buku WHERE id = $1", [id]);
  return rowCount > 0;
}
