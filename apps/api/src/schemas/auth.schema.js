// src/schemas/auth.schema.js
import { z } from "zod";

export const skemaDaftar = z.object({
  nama: z.string().trim().min(3, "Nama minimal 3 karakter"),
  email: z.email("Format email tidak valid").toLowerCase(),
  sandi: z.string().min(8, "Kata sandi minimal 8 karakter"),
});

export const skemaMasuk = z.object({
  email: z.email("Format email tidak valid").toLowerCase(),
  sandi: z.string().min(1, "Kata sandi wajib diisi"),
});
