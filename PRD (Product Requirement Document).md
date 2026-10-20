# Product Requirement Document (PRD)

## Portal DPW PAN NTT

| Atribut | Keterangan |
|---|---|
| Produk | Portal informasi Dewan Pimpinan Wilayah Partai Amanat Nasional Nusa Tenggara Timur |
| Versi dokumen | 1.0 |
| Tanggal | 9 Oktober 2026 |
| Status | Draf berdasarkan implementasi proyek saat ini |
| Bahasa produk | Bahasa Indonesia |

## 1. Ringkasan Produk

Portal DPW PAN NTT adalah situs publik untuk menyampaikan profil organisasi, visi dan misi, struktur pengurus, berita, dokumentasi kegiatan, agenda, statistik, serta informasi kontak. Konten berita, foto, susunan pengurus, agenda, dan statistik dapat dikelola melalui halaman admin yang terhubung ke API dan basis data.

Produk terdiri dari dua permukaan utama:

1. **Portal publik** yang responsif untuk masyarakat, kader, media, dan pihak berkepentingan.
2. **Panel admin** untuk mengelola konten yang ditampilkan pada portal.

Dokumen ini mendeskripsikan kemampuan yang ditemukan pada kode proyek. Fitur yang tampil sebagai antarmuka tetapi belum memiliki integrasi nyata, serta ketidakselarasan antarimplementasi, dicatat sebagai batasan atau hal yang perlu dikonfirmasi dan bukan dianggap sebagai kemampuan produksi yang sudah terjamin.

## 2. Latar Belakang dan Masalah

Organisasi membutuhkan kanal daring terpusat yang dapat:

- Menyediakan informasi resmi dan mudah diakses tentang DPW PAN NTT.
- Menampilkan kegiatan dan kabar terbaru kepada publik.
- Menyajikan struktur organisasi, dokumentasi foto, agenda, dan statistik.
- Memungkinkan staf yang berwenang memperbarui konten tanpa mengubah kode situs.

## 3. Tujuan Produk

### Tujuan

- Menyediakan pengalaman portal yang konsisten pada perangkat desktop dan seluler.
- Memudahkan pengunjung menemukan informasi organisasi, berita, dokumentasi, dan agenda.
- Memungkinkan admin membuat, membaca, memperbarui, dan menghapus konten utama melalui panel admin.
- Menampilkan konten dari API/basis data dan tetap menyediakan konten awal atau cache lokal ketika sumber data tidak tersedia.

### Indikator keberhasilan yang disarankan

Target angka belum ditetapkan di dalam proyek dan perlu disepakati pemilik produk.

- Pengunjung dapat mencapai halaman Berita, Dokumentasi, Pengurus, dan Agenda dari navigasi atau tautan kontekstual.
- Admin dapat menyimpan perubahan konten dan perubahan terlihat pada portal setelah data dimuat ulang.
- Halaman penting dapat digunakan pada ukuran layar ponsel dan desktop.
- Pengunjung dapat membuka detail berita atau dokumentasi melalui tautan yang dapat dibagikan.

## 4. Pengguna dan Kebutuhan

### Pengunjung publik

Masyarakat, kader, media, dan mitra yang membutuhkan informasi resmi.

- Mengetahui profil, visi-misi, sejarah, serta nilai organisasi.
- Melihat struktur dan profil pengurus.
- Menemukan berita berdasarkan kata kunci dan kategori.
- Menjelajahi foto kegiatan serta melihat beberapa foto dalam satu dokumentasi.
- Mengetahui waktu dan lokasi agenda.
- Menemukan alamat dan informasi kontak kantor.

### Admin konten

Staf yang bertanggung jawab atas pemutakhiran informasi portal.

- Masuk ke panel admin.
- Membuat, memperbarui, dan menghapus berita, dokumentasi, data pengurus, agenda, dan statistik.
- Mengunggah gambar dan meninjau pratinjau sebelum menyimpan.
- Mengedit beberapa gambar untuk satu entri dokumentasi.
- Menggunakan editor konten berita serta alat crop gambar untuk foto pengurus.

## 5. Ruang Lingkup Produk

### Termasuk

- Beranda dengan carousel, nilai inti, statistik, agenda terdekat, berita terbaru, dan cuplikan dokumentasi.
- Halaman profil/sejarah yang memuat visi-misi, platform perjuangan, lini masa, pesan ketua, dan konten pendukung.
- Daftar pengurus dan bagan struktur inti berdasarkan jabatan.
- Daftar dan detail dokumentasi, termasuk pencarian, kategori, pemuatan bertahap, dan hingga lima gambar per entri.
- Daftar dan detail berita, termasuk pencarian, kategori, tanggal, ringkasan, konten, dan salin tautan.
- Halaman agenda yang mengurutkan kegiatan berdasarkan tanggal.
- Panel admin untuk konten yang disebutkan di atas.
- Penyimpanan data server dan cache/konten awal sisi klien.
- Informasi kontak, peta, tautan sosial, serta formulir newsletter di footer.

### Tidak termasuk atau belum terbukti tersedia

- Pengelolaan pengguna admin, tingkat akses, atau alur reset kata sandi.
- Publikasi newsletter ke layanan email; implementasi saat ini hanya mensimulasikan keberhasilan pendaftaran.
- Kanal kontak langsung/Media Center yang terintegrasi; tombol kontak pada area berita belum tampak terhubung ke alur pengiriman.
- Komentar, akun pengunjung, pendaftaran anggota, donasi, pembayaran, dan transaksi.
- Moderasi, persetujuan konten, penjadwalan publikasi, analitik, serta notifikasi.
- Pengelolaan konten profil/visi-misi dari panel admin.
- Pencarian global lintas berita, dokumentasi, pengurus, dan agenda.

## 6. Alur Pengguna Utama

### 6.1 Menemukan informasi

1. Pengunjung membuka Beranda.
2. Pengunjung menelusuri carousel, nilai inti, statistik, agenda, berita, atau dokumentasi.
3. Pengunjung memilih menu atau tautan pada konten untuk membuka halaman terkait.
4. Pengunjung kembali ke halaman daftar melalui kontrol kembali atau navigasi situs.

### 6.2 Membaca berita

1. Pengunjung membuka Pusat Berita.
2. Pengunjung mencari berdasarkan judul/ringkasan atau memilih kategori.
3. Daftar hasil ditampilkan secara bertahap melalui tombol muat lebih banyak.
4. Pengunjung memilih berita untuk membuka detail.
5. Detail dapat dibagikan menggunakan tautan hash `#news/{id}` atau tombol salin tautan.

### 6.3 Menjelajahi dokumentasi

1. Pengunjung membuka Dokumentasi.
2. Pengunjung mencari judul atau memilih kategori.
3. Pengunjung memuat lebih banyak hasil bila tersedia.
4. Pengunjung memilih entri untuk melihat foto utama dan foto tambahan.
5. Detail dapat dibuka melalui tautan hash `#dokumentasi/{id}`.

### 6.4 Mengelola konten

1. Admin membuka halaman Admin dan mengirim kredensial melalui alur login.
2. Admin memilih tab konten: Berita, Dokumentasi, Pengurus, Agenda, atau Statistik.
3. Admin membuat entri baru atau memilih entri yang sudah ada untuk diedit/dihapus.
4. Admin mengisi data dan memilih gambar bila diperlukan; gambar dapat dipratinjau, dan foto pengurus mendukung crop/transform.
5. Admin menyimpan perubahan; panel mengirimkan data ke API dan menampilkan hasil operasi.

## 7. Persyaratan Fungsional

Prioritas: **P0** = inti produk, **P1** = penting, **P2** = peningkatan.

### 7.1 Portal publik

| ID | Prioritas | Persyaratan |
|---|---|---|
| PUB-01 | P0 | Sistem menyediakan navigasi ke Beranda, Profil, Pengurus DPW, Dokumentasi, dan Berita, termasuk menu seluler. |
| PUB-02 | P0 | Beranda menampilkan carousel visual, nilai inti, statistik, agenda mendatang, berita terkini, dan cuplikan dokumentasi. |
| PUB-03 | P0 | Halaman Profil menampilkan visi, misi, platform perjuangan, sejarah/lini masa, dan pesan ketua. Navigasi Profil/Sejarah saat ini menggunakan permukaan konten yang sama. |
| PUB-04 | P0 | Halaman Pengurus menampilkan daftar pengurus dan bagan struktur inti dari data jabatan yang tersedia. |
| PUB-05 | P0 | Halaman Berita menampilkan daftar berita, tanggal, kategori, gambar, dan ringkasan; mendukung pencarian judul/ringkasan, filter kategori, serta pemuatan bertahap. |
| PUB-06 | P0 | Halaman detail berita menampilkan judul, tanggal, gambar, dan isi; menyediakan kembali ke daftar dan salin tautan. |
| PUB-07 | P0 | Halaman Dokumentasi mendukung pencarian judul, filter kategori, dan pemuatan bertahap; detail menampilkan seluruh gambar terkait (maksimum lima pada model data saat ini). |
| PUB-08 | P0 | Halaman Agenda menampilkan judul, tanggal, dan lokasi kegiatan, diurutkan dari tanggal terdekat; menampilkan keadaan kosong bila tidak ada agenda. |
| PUB-09 | P1 | Sistem menyediakan URL hash yang dapat membuka halaman dan detail konten secara langsung serta menyinkronkan navigasi browser kembali/maju. |
| PUB-10 | P1 | Footer menyediakan informasi kontak, lokasi peta, tautan sosial, tautan cepat, dan formulir newsletter. Newsletter harus diberi label sebagai simulasi sampai integrasi pengiriman benar-benar tersedia. |

### 7.2 Panel admin dan pengelolaan konten

| ID | Prioritas | Persyaratan |
|---|---|---|
| ADM-01 | P0 | Panel admin menyediakan login dan logout; operasi pengelolaan harus memerlukan autentikasi yang valid. |
| ADM-02 | P0 | Admin dapat membuat, melihat, mengedit, dan menghapus berita dengan judul, tanggal, kategori, ringkasan, konten, dan gambar. |
| ADM-03 | P0 | Admin dapat membuat, melihat, mengedit, dan menghapus dokumentasi dengan judul, kategori, satu gambar utama, dan hingga empat gambar tambahan. |
| ADM-04 | P0 | Admin dapat membuat, melihat, mengedit, dan menghapus pengurus dengan nama, jabatan, dan foto. |
| ADM-05 | P0 | Admin dapat membuat, melihat, mengedit, dan menghapus agenda dengan judul, tanggal, dan lokasi. |
| ADM-06 | P0 | Admin dapat membuat, melihat, mengedit, dan menghapus statistik dengan kunci, label, nilai, dan sufiks. |
| ADM-07 | P1 | Form menampilkan validasi untuk bidang wajib dan memberikan umpan balik hasil operasi yang jelas. |
| ADM-08 | P1 | Unggahan gambar menyediakan pratinjau; alur pengurus mendukung drag-and-drop dan crop/rotasi/flip/zoom dengan rasio yang telah ditentukan. |
| ADM-09 | P1 | Saat mengedit, gambar yang ada tetap dipertahankan bila admin tidak memilih pengganti. |

### 7.3 Data dan integrasi

| ID | Prioritas | Persyaratan |
|---|---|---|
| DAT-01 | P0 | Data berita, dokumentasi, pengurus, agenda, dan statistik tersedia melalui API untuk dikonsumsi portal. |
| DAT-02 | P0 | Perubahan yang berhasil dari panel admin tersimpan di basis data dan dapat dibaca oleh portal. |
| DAT-03 | P1 | Aplikasi dapat menggunakan data awal/cache lokal saat API tidak tersedia, tanpa membuat kegagalan jaringan tampak sebagai perubahan data yang berhasil tersimpan ke server. |
| DAT-04 | P1 | Sistem menangani data kosong dan konten yang tidak ditemukan dengan pesan serta tindakan kembali yang jelas. |

## 8. Model Data Konten

- **Berita:** ID, judul, tanggal, ringkasan, konten, gambar, kategori.
- **Dokumentasi:** ID, judul, kategori, gambar utama, hingga empat gambar tambahan.
- **Pengurus:** ID, nama, jabatan, gambar.
- **Agenda:** ID, judul, tanggal, lokasi.
- **Statistik:** ID, kunci, label, nilai, sufiks.

Kategori berita yang digunakan antarmuka: Kegiatan Kader, Pernyataan Resmi, Kebijakan Publik, Nasional, Daerah, Umum. Kategori dokumentasi: Nasional, Daerah, Sosial, Kegiatan Kader, Umum.

## 9. Persyaratan Nonfungsional

- **Responsif:** Tata letak dan navigasi dapat digunakan pada layar ponsel, tablet, dan desktop.
- **Bahasa dan format:** Antarmuka publik menggunakan Bahasa Indonesia; tanggal ditampilkan dengan format lokal Indonesia.
- **Performa:** Gambar dimuat dengan ukuran yang sesuai dan konten panjang tidak menghalangi penggunaan navigasi; peta menggunakan pemuatan malas.
- **Kegunaan:** Status memuat, kosong, tidak ditemukan, validasi, dan hasil tindakan harus dapat dipahami.
- **Keandalan:** Kegagalan API tidak boleh menghapus konten cache lokal; data yang tampil dari cache harus dapat dibedakan dari data yang baru tersinkron bila relevan.
- **Keamanan:** Kredensial dan token tidak boleh ditanamkan sebagai rahasia sisi klien; server wajib memvalidasi autentikasi, otorisasi, masukan, dan unggahan. Semua lalu lintas produksi harus menggunakan HTTPS.
- **Aksesibilitas:** Form, tombol, navigasi, modal, dan kontrol carousel harus dapat dioperasikan dengan keyboard dan memiliki nama yang dapat dibaca teknologi bantu.
- **Kompatibilitas:** Mendukung peramban modern desktop dan seluler. Panduan cropper proyek menyebut Chrome/Edge 90+, Firefox 88+, dan Safari 14+ sebagai target referensi.

## 10. Arsitektur dan Integrasi yang Teramati

- Frontend dibangun dengan React, TypeScript, Vite, Tailwind CSS, Motion, dan Lucide.
- `src/App.tsx` mengatur navigasi, state konten, hash URL, dan cache `localStorage`.
- Data awal statis disediakan untuk berita, dokumentasi, pengurus, agenda, statistik, serta carousel.
- `api.php` menyediakan operasi login/setup, pembacaan sumber konten, serta pembuatan, pembaruan, dan penghapusan konten melalui MySQL dan unggahan gambar.
- `admin.html` memuat UI panel admin dan berkomunikasi dengan endpoint API PHP.
- `server.js` juga mendefinisikan API berbasis Express/MySQL untuk sebagian konten, tetapi kontrak rute dan cakupannya tidak sama dengan API PHP.
- Konfigurasi Vite memuat dukungan variabel `GEMINI_API_KEY`, tetapi alur pengguna utama yang tampak pada UI tidak menunjukkan fitur AI yang menjadi bagian dari kebutuhan produk saat ini.

### Batasan integrasi yang perlu diputuskan

Implementasi frontend memuat data dari endpoint PHP berbasis `?resource=...`; panel admin juga menggunakan endpoint tersebut. Sementara itu, `server.js` menyediakan rute Express `/api/...` dengan cakupan dan bentuk operasi berbeda. Sebelum rilis/penyempurnaan, pemilik teknis perlu menetapkan satu kontrak API dan satu sumber data otoritatif, termasuk mekanisme unggah gambar serta deployment yang digunakan.

Data berita dari API saat ini digabung dengan data sebelumnya/cache, sedangkan sumber data lain mengganti data lokal hanya bila respons berisi item. Kebijakan cache, penghapusan item, serta kondisi respons kosong perlu diselaraskan agar konten lama tidak muncul kembali secara tidak terduga.

## 11. Kriteria Penerimaan Utama

1. Pengunjung dapat menavigasi halaman utama yang termasuk ruang lingkup dan menggunakannya pada viewport ponsel serta desktop.
2. Pencarian dan filter berita/dokumentasi memperbarui daftar sesuai kata kunci dan kategori, serta tombol muat lebih banyak menambah hasil tanpa mengulang item.
3. Membuka berita atau dokumentasi mengubah URL ke hash detail yang sesuai; membuka URL detail secara langsung menampilkan item atau keadaan tidak ditemukan.
4. Agenda diurutkan berdasarkan tanggal terdekat dan halaman menampilkan pesan yang tepat saat data kosong.
5. Admin yang terautentikasi dapat menyimpan perubahan untuk seluruh tipe konten pada ADM-02 sampai ADM-06, dan data yang tersimpan tampil pada portal setelah sinkronisasi.
6. Admin dapat mempertahankan gambar lama ketika mengedit tanpa unggahan pengganti; gambar baru dapat dipratinjau sebelum disimpan.
7. Kegagalan API menghasilkan penggunaan cache/konten awal yang jelas bagi pengguna dan tidak menampilkan konfirmasi penyimpanan berhasil.
8. Pengiriman newsletter saat ini tidak boleh dianggap berhasil berlangganan secara operasional sebelum layanan email/backend terhubung.

## 12. Asumsi dan Pertanyaan Terbuka

- Apakah domain/API dan basis data yang tercantum di kode merupakan lingkungan produksi aktif atau hanya lingkungan uji?
- Apakah `api.php` atau `server.js` yang menjadi backend resmi? Jika keduanya diperlukan, bagaimana pembagian tanggung jawabnya?
- Apakah data contoh yang tertanam pada frontend merupakan fallback sementara, dan siapa yang bertanggung jawab menggantinya dengan data resmi?
- Siapa saja admin yang boleh masuk, dan apakah diperlukan beberapa peran serta proses pengelolaan akun?
- Apakah konten berita perlu status draf/terbit, tanggal publikasi, penulis, SEO metadata, atau lampiran?
- Apakah newsletter, tautan media sosial, dan tombol Media Center harus benar-benar terhubung pada fase produk berikutnya?
- Apakah kategori konten perlu dapat dikelola admin, dan bagaimana kebijakan kategori “Semua” untuk dokumentasi?
- Apa target kuantitatif untuk performa, aksesibilitas, ketersediaan, dan keberhasilan penggunaan?

## 13. Referensi Implementasi

Dokumen disusun dari struktur dan implementasi yang ada pada `src/App.tsx`, `src/components/`, `src/types.ts`, `src/utils/`, `admin.html`, `api.php`, `server.js`, `package.json`, `vite.config.ts`, dan `IMAGE_CROPPER_GUIDE.md`. Apabila implementasi berubah, persyaratan dan batasan integrasi pada dokumen ini perlu ditinjau kembali.
