// app/page.jsx
import Link from "next/link";
export default function Beranda() {
  return <main><h1>PerpusKu</h1><Link href="/katalog">Lihat katalog</Link> · <Link href="/masuk">Masuk</Link></main>;
}
