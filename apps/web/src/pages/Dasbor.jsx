// src/pages/Dasbor.jsx
import { useEffect, useState } from "react";
import { api } from "../api/klien.js";
import { useAuth } from "../context/AuthContext.jsx";

const HARI = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const rupiah = (n) => "Rp" + n.toLocaleString("id-ID");

export default function Dasbor() {
  const [s, setS] = useState(null);
  const { pengguna } = useAuth();
  useEffect(() => { api("/statistik").then(setS); }, []);
  if (!s) return <p className="kosong">Memuat dasbor…</p>;

  const puncak = Math.max(...s.harian.map((h) => h.jumlah), 1);
  const selisih = s.kemarin ? Math.round(((s.hariIni - s.kemarin) / s.kemarin) * 100) : 0;
  return (
    <main className="isi-halaman">
      <div className="atas">
        <div>
          <h1>Dasbor Sirkulasi</h1>
          <p>{new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
        <div className="pengguna"><span className="avatar">{pengguna.nama.split(" ").map((k) => k[0]).join("")}</span>{pengguna.nama}</div>
      </div>
      <div className="statistik">
        <div className="stat"><p>Peminjaman hari ini</p><b>{s.hariIni}</b><span className={selisih >= 0 ? "naik" : "turun"}>{selisih >= 0 ? "▲" : "▼"} {Math.abs(selisih)}% dari kemarin</span></div>
        <div className="stat"><p>Sedang dipinjam</p><b>{s.dipinjam}</b><span className="redup">buku di tangan anggota</span></div>
        <div className="stat"><p>Terlambat</p><b>{s.terlambat}</b><span className="turun">perlu dihubungi</span></div>
        <div className="stat"><p>Denda bulan ini</p><b>{rupiah(s.dendaBulanIni)}</b><span className="redup">sudah dibayar</span></div>
      </div>
      <div className="dua">
        <div className="panel">
          <h2>Peminjaman 7 hari terakhir</h2>
          <div className="batang">
            {s.harian.map((h, i) => (
              <div key={h.tanggal} className={i === s.harian.length - 1 ? "ini" : ""} style={{ height: `${(h.jumlah / puncak) * 100}%` }}>
                <em>{h.jumlah}</em>
              </div>
            ))}
          </div>
          <div className="hari">{s.harian.map((h) => <span key={h.tanggal}>{HARI[new Date(h.tanggal).getDay()]}</span>)}</div>
        </div>
        <div className="panel">
          <h2>Perlu tindak lanjut</h2>
          <table>
            <thead><tr><th>Anggota</th><th>Buku</th><th>Status</th></tr></thead>
            <tbody>
              {s.tindakLanjut.map((t, i) => (
                <tr key={i}>
                  <td>{t.nama}</td><td>{t.judul}</td>
                  <td>{t.telat > 0 ? <span className="pil telat">Telat {t.telat} hari</span>
                    : t.telat === 0 ? <span className="pil aktif">Hari ini</span>
                    : <span className="pil aktif">Tempo besok</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
