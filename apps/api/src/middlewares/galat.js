// src/middlewares/galat.js
export function tidakDitemukan(req, res) {
  res.status(404).json({ pesan: `Rute ${req.originalUrl} tidak ada` });
}

export function penanganGalat(err, req, res, next) {
  const status = err.status ?? 500;
  if (status === 500) console.error(err);          // catat galat tak terduga
  res.status(status).json({
    pesan: status === 500 ? "Terjadi kesalahan pada server" : err.message,
  });
}
