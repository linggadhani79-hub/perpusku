// src/services/auth.service.js
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import * as repoAnggota from "../repositories/anggota.repository.js";
import * as repoToken from "../repositories/token.repository.js";

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
const UMUR_REFRESH_MS = 7 * 24 * 60 * 60 * 1000; // 7 hari

// yang disimpan di basis data hanya hash-nya, bukan token asli
const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

async function terbitkanToken(a) {
  const accessToken = jwt.sign({ sub: a.id, nama: a.nama, peran: a.peran }, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ sub: a.id, jti: crypto.randomUUID() }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
  await repoToken.simpan({
    anggotaId: a.id,
    hashToken: hashToken(refreshToken),
    kedaluwarsa: new Date(Date.now() + UMUR_REFRESH_MS),
  });
  return { accessToken, refreshToken, pengguna: { id: a.id, nama: a.nama, peran: a.peran } };
}

export async function daftar({ nama, email, sandi }) {
  if (await repoAnggota.cariByEmail(email)) throw new AppError("Email sudah terdaftar", 409);
  const hashSandi = await bcrypt.hash(sandi, 12);
  const anggota = await repoAnggota.simpan({ nama, email, hashSandi, peran: "anggota" });
  return { id: anggota.id, nama, email };
}

export async function masuk({ email, sandi }) {
  const a = await repoAnggota.cariByEmail(email);
  // pesan sama untuk email/sandi salah agar penyerang tidak bisa menebak email terdaftar
  if (!a || !(await bcrypt.compare(sandi, a.hashSandi))) {
    throw new AppError("Email atau kata sandi salah", 401);
  }
  return terbitkanToken(a);
}

// rotasi: refresh token lama dicabut dan diganti yang baru setiap kali dipakai
export async function perbarui(refreshToken) {
  if (!refreshToken) throw new AppError("Sesi tidak ditemukan", 401);
  let data;
  try {
    data = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
  } catch {
    throw new AppError("Sesi berakhir, silakan login ulang", 401);
  }
  const aktif = await repoToken.cabut(hashToken(refreshToken));
  if (!aktif) {
    // token sah tetapi sudah pernah dipakai/dicabut: kemungkinan dicuri -> cabut semua sesi
    await repoToken.cabutSemuaMilik(data.sub);
    throw new AppError("Sesi tidak valid, silakan login ulang", 401);
  }
  const a = await repoAnggota.cariById(data.sub);
  if (!a) throw new AppError("Akun tidak ditemukan", 401);
  return terbitkanToken(a);
}

export async function keluar(refreshToken) {
  if (refreshToken) await repoToken.cabut(hashToken(refreshToken));
}
