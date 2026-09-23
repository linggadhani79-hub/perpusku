export default function KartuBuku({ buku, onPinjam }) {
  const tersedia = buku.stok > 0;
  return (
    <article className="kartu">
      <div className="sampul" style={{ "--warna": buku.warna }}>{buku.judul}</div>
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
