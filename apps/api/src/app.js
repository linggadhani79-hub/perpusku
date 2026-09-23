// src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { z } from "zod";
import { pencatat } from "./middlewares/pencatat.js";
import { tidakDitemukan, penanganGalat } from "./middlewares/galat.js";
import authRoutes from "./routes/auth.routes.js";
import bukuRoutes from "./routes/buku.routes.js";
import peminjamanRoutes from "./routes/peminjaman.routes.js";
import statistikRoutes from "./routes/statistik.routes.js";

z.config(z.locales.id());               // pesan validasi Zod dalam bahasa Indonesia

const app = express();
app.use(helmet());                       // header keamanan
app.use(cors({ origin: (process.env.ASAL_FRONTEND ?? "http://localhost:5173").split(","), credentials: true }));
app.use(express.json());                 // membaca body JSON
app.use(cookieParser());                 // membaca cookie refreshToken
if (process.env.NODE_ENV !== "test") app.use(pencatat);

app.use("/api/auth", authRoutes);
app.use("/api/buku", bukuRoutes);
app.use("/api/peminjaman", peminjamanRoutes);
app.use("/api/statistik", statistikRoutes);

app.use(tidakDitemukan);
app.use(penanganGalat);

export default app;
