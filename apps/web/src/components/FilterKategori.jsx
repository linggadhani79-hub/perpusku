const KATEGORI = ["Semua", "Teknologi", "Sains", "Sastra"];

export default function FilterKategori({ aktif, onPilih }) {
  return (
    <div className="chip-grup">
      {KATEGORI.map((k) => (
        <button
          key={k}
          className={k === aktif ? "chip aktif" : "chip"}
          onClick={() => onPilih(k)}
        >
          {k}
        </button>
      ))}
    </div>
  );
}
