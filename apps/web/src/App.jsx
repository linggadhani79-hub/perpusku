// src/App.jsx
import { Routes, Route, useLocation } from "react-router";
import Navbar from "./components/Navbar.jsx";
import RuteTerlindungi from "./components/RuteTerlindungi.jsx";
import Katalog from "./pages/Katalog.jsx";
import Masuk from "./pages/Masuk.jsx";
import PinjamanSaya from "./pages/PinjamanSaya.jsx";
import Dasbor from "./pages/Dasbor.jsx";

export default function App() {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/masuk" && <Navbar />}
      <Routes>
        <Route path="/" element={<Katalog />} />
        <Route path="/masuk" element={<Masuk />} />
        <Route element={<RuteTerlindungi peran={["anggota"]} />}>
          <Route path="/pinjaman" element={<PinjamanSaya />} />
        </Route>
        <Route element={<RuteTerlindungi peran={["petugas", "admin"]} />}>
          <Route path="/petugas" element={<Dasbor />} />
        </Route>
        <Route path="*" element={<p className="kosong">Halaman tidak ditemukan.</p>} />
      </Routes>
    </>
  );
}
