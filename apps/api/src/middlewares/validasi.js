// src/middlewares/validasi.js
export const validasi = (skema) => (req, res, next) => {
  const hasil = skema.safeParse(req.body);
  if (!hasil.success) {
    return res.status(400).json({
      pesan: "Data tidak valid",
      galat: hasil.error.issues.map((i) => ({ kolom: i.path.join("."), pesan: i.message })),
    });
  }
  req.body = hasil.data;   // data yang sudah dibersihkan
  next();
};
