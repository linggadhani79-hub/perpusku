// src/pages/Masuk.jsx
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

export default function Masuk() {
  const [email, setEmail] = useState("");
  const [sandi, setSandi] = useState("");
  const [galat, setGalat] = useState("");
  const [proses, setProses] = useState(false);
  const { masuk } = useAuth();
  const navigasi = useNavigate();
  const lokasi = useLocation();

  async function kirim(e) {
    e.preventDefault();
    setProses(true);
    try {
      const p = await masuk(email, sandi);
      const tujuan = lokasi.state?.dari?.pathname ?? (p.peran === "anggota" ? "/" : "/petugas");
      navigasi(tujuan, { replace: true });
    } catch (err) {
      setGalat(err.message);
    } finally {
      setProses(false);
    }
  }

  return (
    <div className="halaman-masuk">
      <aside className="panel-kiri">
        <Link to="/" className="logo"><span className="logo-ikon">P</span>PerpusKu</Link>
        <div>
          <h2>Satu kartu anggota, ribuan buku di ujung jari.</h2>
          <p>Pinjam, perpanjang, dan pantau jatuh tempo tanpa antre di meja sirkulasi.</p>
          <div className="rak">
            {[["#264653", 120], ["#e9a23b", 150], ["#2a9d8f", 105], ["#d1495b", 138], ["#5a189a", 96], ["#f6f3ec", 128], ["#2a6f97", 112]]
              .map(([w, t]) => <span key={w} style={{ background: w, height: t }} />)}
          </div>
        </div>
        <small>© 2026 Perpustakaan Kampus</small>
      </aside>
      <main className="form-masuk">
        <form onSubmit={kirim} noValidate>
          <h1>Selamat datang kembali</h1>
          <p className="sub">Masuk dengan email kampus Anda.</p>
          <div className="medan">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="medan">
            <label htmlFor="sandi">Kata sandi</label>
            <input id="sandi" type="password" autoComplete="current-password" value={sandi} onChange={(e) => setSandi(e.target.value)} required />
            {galat && <span className="galat" role="alert">{galat}</span>}
          </div>
          <button className="tombol" disabled={proses}>{proses ? "Memproses…" : "Masuk"}</button>
          <p className="daftar">Belum punya akun? <Link to="/daftar">Daftar sebagai anggota</Link></p>
        </form>
      </main>
    </div>
  );
}
