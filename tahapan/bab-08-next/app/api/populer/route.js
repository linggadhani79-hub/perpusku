// app/api/populer/route.js  (Route Handler sebagai Backend for Frontend)
export async function GET() {
  const res = await fetch(`${process.env.API_URL}/api/buku`, { next: { revalidate: 300 } });
  const buku = await res.json();
  // bentuk data disesuaikan untuk widget "Buku Populer": hanya 3 judul dengan stok terbanyak
  const populer = buku
    .toSorted((a, b) => b.stok - a.stok)
    .slice(0, 3)
    .map(({ id, judul, stok }) => ({ id, judul, stok }));
  return Response.json(populer);
}
