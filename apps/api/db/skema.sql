-- db/skema.sql : struktur basis data PerpusKu
DROP TABLE IF EXISTS token_refresh, peminjaman, anggota, buku, kategori CASCADE;

CREATE TABLE kategori (
  id    SERIAL PRIMARY KEY,
  nama  VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE buku (
  id           SERIAL PRIMARY KEY,
  isbn         CHAR(13) UNIQUE,
  judul        VARCHAR(200) NOT NULL,
  penulis      VARCHAR(120) NOT NULL,
  tahun        SMALLINT CHECK (tahun BETWEEN 1900 AND 2100),
  stok         INTEGER NOT NULL DEFAULT 0 CHECK (stok >= 0),
  kategori_id  INTEGER REFERENCES kategori(id) ON DELETE SET NULL,
  dibuat_pada  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE anggota (
  id          SERIAL PRIMARY KEY,
  nama        VARCHAR(120) NOT NULL,
  email       VARCHAR(160) NOT NULL UNIQUE,
  hash_sandi  TEXT NOT NULL,
  peran       VARCHAR(10) NOT NULL DEFAULT 'anggota'
              CHECK (peran IN ('anggota', 'petugas', 'admin'))
);

CREATE TABLE peminjaman (
  id             SERIAL PRIMARY KEY,
  anggota_id     INTEGER NOT NULL REFERENCES anggota(id),
  buku_id        INTEGER NOT NULL REFERENCES buku(id),
  tgl_pinjam     DATE NOT NULL DEFAULT CURRENT_DATE,
  jatuh_tempo    DATE NOT NULL,
  tgl_kembali    DATE,
  denda          INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE token_refresh (
  id           SERIAL PRIMARY KEY,
  anggota_id   INTEGER NOT NULL REFERENCES anggota(id) ON DELETE CASCADE,
  hash_token   CHAR(64) NOT NULL UNIQUE,
  kedaluwarsa  TIMESTAMPTZ NOT NULL,
  dicabut_pada TIMESTAMPTZ
);

CREATE INDEX idx_buku_judul ON buku (judul);
CREATE INDEX idx_pinjam_anggota_aktif ON peminjaman (anggota_id) WHERE tgl_kembali IS NULL;
