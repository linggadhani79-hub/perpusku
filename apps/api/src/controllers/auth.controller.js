// src/controllers/auth.controller.js
import * as auth from "../services/auth.service.js";

const OPSI_COOKIE = {
  httpOnly: true,                                   // tidak dapat dibaca JavaScript -> kebal XSS
  secure: process.env.NODE_ENV === "production",    // hanya lewat HTTPS di produksi
  sameSite: "strict",                               // mitigasi CSRF
  path: "/api/auth",                                // hanya dikirim ke rute autentikasi
};

function kirimSesi(res, { accessToken, refreshToken, pengguna }) {
  res.cookie("refreshToken", refreshToken, { ...OPSI_COOKIE, maxAge: 7 * 24 * 60 * 60 * 1000 });
  res.json({ accessToken, pengguna });
}

export async function daftar(req, res) {
  res.status(201).json(await auth.daftar(req.body));
}
export async function masuk(req, res) {
  kirimSesi(res, await auth.masuk(req.body));
}
export async function refresh(req, res) {
  kirimSesi(res, await auth.perbarui(req.cookies.refreshToken));
}
export async function keluar(req, res) {
  await auth.keluar(req.cookies.refreshToken);
  res.clearCookie("refreshToken", OPSI_COOKIE);
  res.status(204).end();
}
