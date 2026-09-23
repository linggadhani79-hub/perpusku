// src/routes/statistik.routes.js
import { Router } from "express";
import { ringkasan } from "../services/statistik.service.js";
import { wajibLogin, hanyaPeran } from "../middlewares/auth.js";

const r = Router();
r.get("/", wajibLogin, hanyaPeran("petugas", "admin"), async (req, res) => {
  res.json(await ringkasan());
});
export default r;
