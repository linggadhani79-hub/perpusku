// app/katalog/TombolPinjam.jsx  (Client Component)
"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function TombolPinjam({ id, tersedia }) {
  const { token } = useAuth();
  const [status, setStatus] = useState("");

  async function pinjam() {
    if (!token) return setStatus("Silakan masuk terlebih dahulu");
    // /api/peminjaman diteruskan ke API Express oleh rewrites di next.config.mjs
    const res = await fetch("/api/peminjaman", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ bukuId: id }),
    });
    const data = await res.json();
    setStatus(res.ok ? "Berhasil dipinjam" : data.pesan);
  }

  return (
    <>
      <button disabled={!tersedia} onClick={pinjam}>Pinjam</button>
      <span> {status}</span>
    </>
  );
}
