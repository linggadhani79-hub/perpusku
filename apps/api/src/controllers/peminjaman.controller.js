// src/controllers/peminjaman.controller.js
import * as service from "../services/peminjaman.service.js";

export async function store(req, res) {
  res.status(201).json(await service.pinjam(req.pengguna.sub, Number(req.body.bukuId)));
}
export async function kembali(req, res) {
  res.json(await service.kembalikan(Number(req.params.id)));
}
export async function saya(req, res) {
  res.json(await service.milik(req.pengguna.sub));
}
