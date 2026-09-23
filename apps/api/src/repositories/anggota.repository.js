// src/repositories/anggota.repository.js
import { pool } from "../db.js";

export async function cariByEmail(email) {
  const { rows } = await pool.query(
    `SELECT id, nama, email, peran, hash_sandi AS "hashSandi"
       FROM anggota WHERE email = $1`, [email]);
  return rows[0] ?? null;
}

export async function cariById(id) {
  const { rows } = await pool.query("SELECT id, nama, email, peran FROM anggota WHERE id = $1", [id]);
  return rows[0] ?? null;
}

export async function simpan({ nama, email, hashSandi, peran = "anggota" }) {
  const { rows } = await pool.query(
    `INSERT INTO anggota (nama, email, hash_sandi, peran)
     VALUES ($1, $2, $3, $4) RETURNING id, nama, email, peran`,
    [nama, email, hashSandi, peran]
  );
  return rows[0];
}
