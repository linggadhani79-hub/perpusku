// app/buku/tambah/page.jsx
import { revalidatePath } from "next/cache";

async function simpanBuku(formData) {
  "use server";
  const judul = formData.get("judul");
  console.log("Server Action menerima judul:", judul);
  // ... simpan ke basis data atau panggil API Express (dengan token petugas) ...
  revalidatePath("/katalog");
}

export default function TambahBuku() {
  return (
    <form action={simpanBuku}>
      <input name="judul" required />
      <button type="submit">Simpan</button>
    </form>
  );
}
