// test/auth.api.test.js
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

const akun = { email: "rina@kampus.ac.id", sandi: "rahasia123" };
const ambilCookie = (res) => res.headers["set-cookie"][0].split(";")[0];

describe("autentikasi", () => {
  it("menolak kata sandi salah dengan 401", async () => {
    const res = await request(app).post("/api/auth/masuk").send({ ...akun, sandi: "salah" });
    expect(res.status).toBe(401);
  });

  it("merotasi refresh token dan menolak token lama", async () => {
    const masuk = await request(app).post("/api/auth/masuk").send(akun);
    const lama = ambilCookie(masuk);
    const baru = await request(app).post("/api/auth/refresh").set("Cookie", lama);
    expect(baru.status).toBe(200);
    expect(baru.body.accessToken).toBeTruthy();
    const ulang = await request(app).post("/api/auth/refresh").set("Cookie", lama);
    expect(ulang.status).toBe(401);                        // token lama sudah dicabut
  });

  it("keluar mencabut sesi", async () => {
    const masuk = await request(app).post("/api/auth/masuk").send(akun);
    const cookie = ambilCookie(masuk);
    const keluar = await request(app).post("/api/auth/keluar").set("Cookie", cookie);
    expect(keluar.status).toBe(204);
    const refresh = await request(app).post("/api/auth/refresh").set("Cookie", cookie);
    expect(refresh.status).toBe(401);
  });
});
