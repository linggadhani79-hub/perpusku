// src/utils/denda.js
export function hitungDenda(jatuhTempo, tglKembali, tarif = 1000) {
  const hari = Math.ceil((tglKembali - jatuhTempo) / 86_400_000);
  return Math.max(0, hari) * tarif;
}
