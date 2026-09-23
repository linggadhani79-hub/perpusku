// app/katalog/page.jsx  (Server Component)
import TombolPinjam from "./TombolPinjam";

export const revalidate = 60; // ISR: halaman dibuat ulang paling cepat tiap 60 detik

async function ambilBuku() {
  const res = await fetch(`${process.env.API_URL}/api/buku`);
  if (!res.ok) throw new Error("Gagal memuat buku");
  return res.json();
}

export default async function HalamanKatalog() {
  const buku = await ambilBuku();
  return (
    <main>
      <h1>Katalog</h1>
      <ul>
        {buku.map((b) => (
          <li key={b.id}>
            {b.judul} — stok {b.stok}
            <TombolPinjam id={b.id} tersedia={b.stok > 0} />
          </li>
        ))}
      </ul>
    </main>
  );
}
