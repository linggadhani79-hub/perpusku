// src/controllers/buku.controller.js
import * as service from "../services/buku.service.js";

export async function index(req, res) {
  const { q, kategori } = req.query;
  const halaman = Number(req.query.halaman ?? 1);
  res.json(await service.daftar({ q, kategori, halaman }));
}
export async function show(req, res) {
  res.json(await service.detail(Number(req.params.id)));
}
export async function store(req, res) {
  res.status(201).json(await service.tambah(req.body));
}
export async function update(req, res) {
  res.json(await service.ubah(Number(req.params.id), req.body));
}
export async function destroy(req, res) {
  await service.hapus(Number(req.params.id));
  res.status(204).end();
}
