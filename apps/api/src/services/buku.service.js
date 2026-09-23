// src/services/buku.service.js
import { AppError } from "../utils/AppError.js";
import * as repo from "../repositories/buku.repository.js";

export async function daftar({ q, kategori, halaman = 1, per = 10 }) {
  return repo.cari({ q, kategori, offset: (halaman - 1) * per, limit: per });
}
export async function detail(id) {
  const buku = await repo.cariById(id);
  if (!buku) throw new AppError("Buku tidak ditemukan", 404);
  return buku;
}
export const tambah = (data) => repo.simpan(data);
export async function ubah(id, data) {
  const buku = await repo.ubah(id, data);
  if (!buku) throw new AppError("Buku tidak ditemukan", 404);
  return buku;
}
export async function hapus(id) {
  if (!(await repo.hapus(id))) throw new AppError("Buku tidak ditemukan", 404);
}
