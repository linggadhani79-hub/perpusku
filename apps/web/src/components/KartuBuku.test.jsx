// src/components/KartuBuku.test.jsx
import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import KartuBuku from "./KartuBuku.jsx";

it("menampilkan label Habis bila stok 0", () => {
  const buku = { id: 3, judul: "Laskar Pelangi", penulis: "Andrea Hirata", kategori: "Sastra", stok: 0 };
  render(<KartuBuku buku={buku} onPinjam={() => {}} />);
  expect(screen.getByText("Habis")).toBeTruthy();
  expect(screen.getByRole("button", { name: "Pinjam" }).disabled).toBe(true);
});
