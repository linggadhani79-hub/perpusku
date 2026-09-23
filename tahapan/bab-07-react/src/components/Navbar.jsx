export default function Navbar() {
  return (
    <header className="navbar">
      <a href="/" className="logo"><span className="logo-ikon">P</span>PerpusKu</a>
      <nav>
        <a href="/" className="aktif">Katalog</a>
        <a href="/pinjaman">Pinjaman Saya</a>
        <a href="/masuk" className="tombol tombol-kecil">Masuk</a>
      </nav>
    </header>
  );
}
