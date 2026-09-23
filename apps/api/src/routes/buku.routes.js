// src/routes/buku.routes.js
import { Router } from "express";
import * as c from "../controllers/buku.controller.js";
import { skemaBuku, skemaUbahBuku } from "../schemas/buku.schema.js";
import { validasi } from "../middlewares/validasi.js";
import { wajibLogin, hanyaPeran } from "../middlewares/auth.js";

const r = Router();
r.get("/", c.index);
r.get("/:id", c.show);
r.post("/", wajibLogin, hanyaPeran("petugas", "admin"), validasi(skemaBuku), c.store);
r.patch("/:id", wajibLogin, hanyaPeran("petugas", "admin"), validasi(skemaUbahBuku), c.update);
r.delete("/:id", wajibLogin, hanyaPeran("admin"), c.destroy);
export default r;
