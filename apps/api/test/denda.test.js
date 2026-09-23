// test/denda.test.js
import { describe, it, expect } from "vitest";
import { hitungDenda } from "../src/utils/denda.js";

describe("hitungDenda", () => {
  const tempo = new Date("2026-09-10");

  it("mengembalikan 0 bila dikembalikan tepat waktu", () => {
    expect(hitungDenda(tempo, new Date("2026-09-10"))).toBe(0);
  });

  it("mengembalikan 0 bila dikembalikan lebih awal", () => {
    expect(hitungDenda(tempo, new Date("2026-09-08"))).toBe(0);
  });

  it("menghitung Rp1.000 per hari keterlambatan", () => {
    expect(hitungDenda(tempo, new Date("2026-09-13"))).toBe(3000);
  });

  it("mendukung tarif khusus", () => {
    expect(hitungDenda(tempo, new Date("2026-09-12"), 2500)).toBe(5000);
  });
});
