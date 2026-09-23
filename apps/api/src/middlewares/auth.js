// src/middlewares/auth.js
import jwt from "jsonwebtoken";

export function wajibLogin(req, res, next) {
  const [skema, token] = (req.headers.authorization ?? "").split(" ");
  if (skema !== "Bearer" || !token) {
    return res.status(401).json({ pesan: "Silakan login terlebih dahulu" });
  }
  try {
    req.pengguna = jwt.verify(token, process.env.JWT_SECRET); // { sub, nama, peran, exp }
    next();
  } catch {
    res.status(401).json({ pesan: "Token tidak valid atau kedaluwarsa" });
  }
}

export const hanyaPeran = (...peran) => (req, res, next) =>
  peran.includes(req.pengguna?.peran)
    ? next()
    : res.status(403).json({ pesan: "Anda tidak memiliki akses" });
