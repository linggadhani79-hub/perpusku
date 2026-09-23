// src/pages/PinjamanSaya.jsx
import { useEffect, useState } from "react";
import { api } from "../api/klien.js";

const tgl = (s) => new Date(s).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

export default function PinjamanSaya() {
  const [data, setData] = useState(null);
  useEffect(() => { api("/peminjaman/saya").then(setData); }, []);
  if (!data) return <p className="kosong">Memuat…</p>;
  return (
    <main className="isi-halaman">
      <h1>Pinjaman Saya</h1>
      <div className="panel">
        <table>
          <thead><tr><th>Judul</th><th>Dipinjam</th><th>Jatuh tempo</th><th>Status</th></tr></thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.id}>
                <td>{p.judul}</td><td>{tgl(p.tgl_pinjam)}</td><td>{tgl(p.jatuh_tempo)}</td>
                <td>{p.tgl_kembali ? "Dikembalikan" : new Date(p.jatuh_tempo) < new Date() ? <span className="pil telat">Terlambat</span> : <span className="pil aktif">Dipinjam</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
