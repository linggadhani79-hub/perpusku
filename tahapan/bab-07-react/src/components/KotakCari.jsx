export default function KotakCari({ nilai, onUbah }) {
  return (
    <form className="cari" role="search" onSubmit={(e) => e.preventDefault()}>
      <input
        type="search"
        placeholder="Cari judul atau penulis…"
        aria-label="Cari buku"
        value={nilai}
        onChange={(e) => onUbah(e.target.value)}
      />
      <button type="submit" className="tombol">Cari</button>
    </form>
  );
}
