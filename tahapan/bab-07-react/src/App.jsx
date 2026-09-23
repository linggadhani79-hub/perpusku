import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import KotakCari from "./components/KotakCari.jsx";
import FilterKategori from "./components/FilterKategori.jsx";
import DaftarBuku from "./components/DaftarBuku.jsx";
import { dataBuku } from "./data/buku.js";

export default function App() {
  const [buku, setBuku] = useState(dataBuku);
  const [kata, setKata] = useState("");
  const [kategori, setKategori] = useState("Semua");

  // derived state: dihitung ulang setiap render, tidak disimpan terpisah
  const hasil = buku.filter(
    (b) =>
      (kategori === "Semua" || b.kategori === kategori) &&
      `${b.judul} ${b.penulis}`.toLowerCase().includes(kata.toLowerCase())
  );

  function pinjam(id) {
    setBuku((lama) =>
      lama.map((b) => (b.id === id ? { ...b, stok: b.stok - 1, dipinjam: true } : b))
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="hero">
          <p className="label">Perpustakaan Kampus</p>
          <h1>Temukan buku berikutnya<br />untuk dibaca.</h1>
          <KotakCari nilai={kata} onUbah={setKata} />
          <FilterKategori aktif={kategori} onPilih={setKategori} />
        </section>
        <DaftarBuku buku={hasil} onPinjam={pinjam} />
      </main>
      <footer>© 2026 Perpustakaan Kampus · Dibuat dengan React</footer>
    </>
  );
}
