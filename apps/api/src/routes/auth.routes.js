// src/routes/auth.routes.js
import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as c from "../controllers/auth.controller.js";
import { validasi } from "../middlewares/validasi.js";
import { skemaDaftar, skemaMasuk } from "../schemas/auth.schema.js";

const r = Router();
const batasMasuk = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10 }); // 10 percobaan / 15 menit

r.post("/daftar", validasi(skemaDaftar), c.daftar);
r.post("/masuk", batasMasuk, validasi(skemaMasuk), c.masuk);
r.post("/refresh", c.refresh);
r.post("/keluar", c.keluar);
export default r;
