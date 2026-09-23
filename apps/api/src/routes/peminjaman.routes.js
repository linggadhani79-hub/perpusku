// src/routes/peminjaman.routes.js
import { Router } from "express";
import * as c from "../controllers/peminjaman.controller.js";
import { wajibLogin, hanyaPeran } from "../middlewares/auth.js";

const r = Router();
r.use(wajibLogin);                                  // semua rute di bawah ini wajib login
r.post("/", hanyaPeran("anggota"), c.store);
r.get("/saya", c.saya);
r.patch("/:id/kembali", hanyaPeran("petugas", "admin"), c.kembali);
export default r;
