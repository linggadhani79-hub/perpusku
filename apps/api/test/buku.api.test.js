// test/buku.api.test.js
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("API buku", () => {
  it("GET /api/buku mengembalikan daftar", async () => {
    const res = await request(app).get("/api/buku");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/buku tanpa login ditolak 401", async () => {
    const res = await request(app).post("/api/buku").send({ judul: "Uji" });
    expect(res.status).toBe(401);
  });

  it("GET /api/buku/999999 mengembalikan 404", async () => {
    const res = await request(app).get("/api/buku/999999");
    expect(res.status).toBe(404);
  });
});
