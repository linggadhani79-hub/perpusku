// src/components/Navbar.jsx
import { NavLink, Link } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { pengguna, keluar } = useAuth();
  const kelas = ({ isActive }) => (isActive ? "aktif" : "");
  return (
    <header className="navbar">
      <Link to="/" className="logo"><span className="logo-ikon">P</span>PerpusKu</Link>
      <nav>
        <NavLink to="/" end className={kelas}>Katalog</NavLink>
        {pengguna?.peran === "anggota" && <NavLink to="/pinjaman" className={kelas}>Pinjaman Saya</NavLink>}
        {pengguna && pengguna.peran !== "anggota" && <NavLink to="/petugas" className={kelas}>Dasbor</NavLink>}
        {pengguna
          ? <button className="tombol tombol-kecil" onClick={keluar}>Keluar ({pengguna.nama.split(" ")[0]})</button>
          : <Link to="/masuk" className="tombol tombol-kecil">Masuk</Link>}
      </nav>
    </header>
  );
}
