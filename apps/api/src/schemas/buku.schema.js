// src/schemas/buku.schema.js
import { z } from "zod";

export const skemaBuku = z.object({
  judul: z.string().trim().min(3, "Judul minimal 3 karakter"),
  penulis: z.string().trim().min(3),
  isbn: z.string().regex(/^\d{13}$/, "ISBN harus 13 digit").optional(),
  kategori: z.enum(["Teknologi", "Sains", "Sastra", "Umum"]),
  tahun: z.coerce.number().int().min(1900).max(new Date().getFullYear()),
  stok: z.coerce.number().int().min(0).default(1),
});

// untuk PATCH: semua kolom opsional dan TANPA nilai bawaan,
// agar kolom yang tidak dikirim tidak ikut berubah
export const skemaUbahBuku = skemaBuku
  .extend({ stok: z.coerce.number().int().min(0) })
  .partial();
