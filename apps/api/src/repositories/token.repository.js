// src/repositories/token.repository.js
import { pool } from "../db.js";

export async function simpan({ anggotaId, hashToken, kedaluwarsa }) {
  await pool.query(
    "INSERT INTO token_refresh (anggota_id, hash_token, kedaluwarsa) VALUES ($1, $2, $3)",
    [anggotaId, hashToken, kedaluwarsa]
  );
}

// mencabut token dan mengembalikan barisnya bila token itu masih aktif
export async function cabut(hashToken) {
  const { rows } = await pool.query(
    `UPDATE token_refresh SET dicabut_pada = now()
      WHERE hash_token = $1 AND dicabut_pada IS NULL AND kedaluwarsa > now()
      RETURNING anggota_id`, [hashToken]);
  return rows[0] ?? null;
}

export async function cabutSemuaMilik(anggotaId) {
  await pool.query(
    "UPDATE token_refresh SET dicabut_pada = now() WHERE anggota_id = $1 AND dicabut_pada IS NULL",
    [anggotaId]);
}
