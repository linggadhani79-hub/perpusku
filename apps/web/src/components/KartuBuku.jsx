// src/components/KartuBuku.jsx
const WARNA = ["#264653", "#2a6f97", "#9c6644", "#5a189a", "#1b4332", "#bc4749", "#3d405b", "#e07a5f"];

export default function KartuBuku({ buku, onPinjam }) {
  const tersedia = buku.stok > 0;
  const warna = buku.warna ?? WARNA[(buku.id - 1) % WARNA.length];
  return (
    <article className="kartu">
      <div className="sampul" style={{ "--warna": warna }}>{buku.judul}</div>
      <div className="info">
        <span className="badge">{buku.kategori}</span>
        <h3>{buku.judul}</h3>
        <p className="penulis">{buku.penulis}</p>
        <div className="bawah">
          <span className={tersedia ? "stok ada" : "stok habis"}>
            {tersedia ? `${buku.stok} tersedia` : "Habis"}
          </span>
          <button
            className="tombol tombol-kecil"
            disabled={!tersedia || buku.dipinjam}
            onClick={() => onPinjam(buku.id)}
          >
            {buku.dipinjam ? "Dipinjam ✓" : "Pinjam"}
          </button>
        </div>
      </div>
    </article>
  );
}
