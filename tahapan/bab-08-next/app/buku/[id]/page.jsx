// app/buku/[id]/page.jsx
export default async function DetailBuku({ params }) {
  const { id } = await params;   // pada Next.js 15+, params berupa Promise
  const res = await fetch(`${process.env.API_URL}/api/buku/${id}`);
  if (res.status === 404) return <p>Buku tidak ditemukan.</p>;
  const buku = await res.json();
  return (
    <article>
      <h1>{buku.judul}</h1>
      <p>{buku.penulis} · {buku.kategori} · {buku.tahun}</p>
    </article>
  );
}
