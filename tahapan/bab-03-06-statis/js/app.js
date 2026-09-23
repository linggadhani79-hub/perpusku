// Katalog interaktif PerpusKu: memuat data, mencari, dan menyaring per kategori
const wadah = document.querySelector("#katalog");
const inputCari = document.querySelector("#cari");
const infoJumlah = document.querySelector("#jumlah");
const grupFilter = document.querySelector("#filter-kategori");

let semuaBuku = [];
let kategoriAktif = "Semua";

function buatKartu(buku) {
  const kartu = document.createElement("article");
  kartu.className = "kartu";
  const tersedia = buku.stok > 0;
  kartu.innerHTML = `
    <div class="sampul"></div>
    <div class="info">
      <span class="badge"></span>
      <h3></h3>
      <p class="penulis"></p>
      <div class="bawah">
        <span class="stok ${tersedia ? "ada" : "habis"}"></span>
        <button class="tombol tombol-kecil" ${tersedia ? "" : "disabled"}>Pinjam</button>
      </div>
    </div>`;
  // isi teks dengan textContent agar aman dari XSS
  kartu.querySelector(".sampul").textContent = buku.judul;
  kartu.querySelector(".sampul").style.setProperty("--warna", buku.warna);
  kartu.querySelector(".badge").textContent = buku.kategori;
  kartu.querySelector("h3").textContent = buku.judul;
  kartu.querySelector(".penulis").textContent = buku.penulis;
  kartu.querySelector(".stok").textContent = tersedia ? `${buku.stok} tersedia` : "Habis";
  return kartu;
}

function tampilkan() {
  const kata = inputCari.value.trim().toLowerCase();
  const hasil = semuaBuku.filter((b) =>
    (kategoriAktif === "Semua" || b.kategori === kategoriAktif) &&
    `${b.judul} ${b.penulis}`.toLowerCase().includes(kata)
  );
  wadah.replaceChildren(...hasil.map(buatKartu));
  infoJumlah.textContent = `${hasil.length} buku`;
}

grupFilter.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  grupFilter.querySelector(".aktif").classList.remove("aktif");
  chip.classList.add("aktif");
  kategoriAktif = chip.dataset.kategori;
  tampilkan();
});

inputCari.addEventListener("input", tampilkan);
inputCari.form.addEventListener("submit", (e) => e.preventDefault());

async function muat() {
  try {
    const res = await fetch("data/buku.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    semuaBuku = await res.json();
    tampilkan();
  } catch (err) {
    wadah.textContent = `Gagal memuat katalog: ${err.message}`;
  }
}

muat();
