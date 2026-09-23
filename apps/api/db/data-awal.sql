-- db/data-awal.sql : data contoh katalog
INSERT INTO kategori (nama) VALUES ('Teknologi'), ('Sains'), ('Sastra'), ('Umum');

INSERT INTO buku (isbn, judul, penulis, tahun, stok, kategori_id) VALUES
 ('9786230000011', 'Algoritma Pemrograman', 'B. N. Widyaningrum', 2026, 4, 1),
 ('9786230000028', 'Basis Data Modern', 'L. K. Ramadhani', 2023, 2, 1),
 ('9789793062792', 'Laskar Pelangi', 'Andrea Hirata', 2005, 0, 3),
 ('9786230000035', 'Fisika Dasar', 'S. Mahendra', 2019, 7, 2),
 ('9786230000042', 'Jaringan Komputer', 'F. F. Yuana', 2024, 3, 1),
 ('9789799731234', 'Bumi Manusia', 'Pramoedya Ananta Toer', 1980, 1, 3),
 ('9786230000059', 'Statistika Terapan', 'R. Kartika', 2021, 5, 2),
 ('9786230000066', 'Desain Antarmuka Web', 'D. Prasetyo', 2025, 0, 1);
