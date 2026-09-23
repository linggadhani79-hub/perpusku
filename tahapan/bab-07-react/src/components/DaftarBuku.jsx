import KartuBuku from "./KartuBuku.jsx";

export default function DaftarBuku({ buku, onPinjam }) {
  return (
    <section>
      <div className="judul-bagian">
        <h2>Koleksi Terbaru</h2>
        <p>{buku.length} buku</p>
      </div>
      {buku.length === 0 ? (
        <p className="kosong">Tidak ada buku yang cocok dengan pencarian.</p>
      ) : (
        <div className="katalog">
          {buku.map((b) => (
            <KartuBuku key={b.id} buku={b} onPinjam={onPinjam} />
          ))}
        </div>
      )}
    </section>
  );
}
