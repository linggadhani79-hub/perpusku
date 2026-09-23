// src/pages/Katalog.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../api/klien.js";
import { useAuth } from "../context/AuthContext.jsx";
import KotakCari from "../components/KotakCari.jsx";
import FilterKategori from "../components/FilterKategori.jsx";
import DaftarBuku from "../components/DaftarBuku.jsx";

export default function Katalog() {
  const [buku, setBuku] = useState([]);
  const [kata, setKata] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [pesan, setPesan] = useState("");
  const { pengguna } = useAuth();
  const navigasi = useNavigate();

  useEffect(() => {
    const ac = new AbortController();
    const params = new URLSearchParams({ q: kata });
    if (kategori !== "Semua") params.set("kategori", kategori);
    fetch(`/api/buku?${params}`, { signal: ac.signal })
      .then((r) => r.json())
      .then(setBuku)
      .catch((e) => e.name !== "AbortError" && setPesan("Gagal memuat katalog"));
    return () => ac.abort();
  }, [kata, kategori]);

  async function pinjam(id) {
    if (!pengguna) return navigasi("/masuk");
    try {
      await api("/peminjaman", { method: "POST", body: { bukuId: id } });
      setBuku((lama) => lama.map((b) => (b.id === id ? { ...b, stok: b.stok - 1, dipinjam: true } : b)));
      setPesan("Berhasil dipinjam. Jatuh tempo 7 hari lagi.");
    } catch (err) {
      setPesan(err.message);
    }
  }

  return (
    <main>
      <section className="hero">
        <p className="label">Perpustakaan Kampus</p>
        <h1>Temukan buku berikutnya<br />untuk dibaca.</h1>
        <KotakCari nilai={kata} onUbah={setKata} />
        <FilterKategori aktif={kategori} onPilih={setKategori} />
        {pesan && <p className="pesan" role="status">{pesan}</p>}
      </section>
      <DaftarBuku buku={buku} onPinjam={pinjam} />
    </main>
  );
}
