# Image Cropping Feature Guide - Pengurus DPW

## Overview

Fitur crop foto pengurus DPW telah ditingkatkan dengan antarmuka yang mirip dengan aplikasi Photo di Windows. Sistem ini memungkinkan admin untuk dengan mudah upload, crop, rotate, dan menyunting foto pengurus.

## Features

### 1. **Enhanced Crop Modal**

Interface crop yang baru dengan:

- Preview gambar besar di area utama
- Panel kontrol di samping kanan
- Desain profesional seperti Windows Photo App
- Responsif untuk desktop dan mobile

### 2. **Aspect Ratio Presets**

- **Bebas (Free)**: Crop dengan rasio bebas
- **1:1 (Square)**: Sempurna untuk foto profil pengurus (default untuk pengurus)
- **16:9**: Landscape format
- **4:3**: Format klasik
- **9:16**: Portrait format

### 3. **Zoom Control**

- Slider zoom interaktif
- Tombol zoom + dan - untuk kontrol granular
- Real-time preview saat zoom berubah

### 4. **Rotation & Transform**

- **Putar 90°**: Rotasi searah jarum jam
- **Putar -90°**: Rotasi berlawanan jarum jam
- **Flip Horizontal**: Balik gambar secara horizontal
- **Flip Vertical**: Balik gambar secara vertikal
- **Reset**: Kembalikan gambar ke posisi asli

### 5. **Drag & Drop Upload**

- Tahan file ke area upload untuk upload otomatis
- Atau klik untuk browse file
- Validasi format (PNG, JPG, GIF)
- Limit file: Max 5MB

### 6. **Live Preview**

- Preview ukuran 1:1 di panel kanan
- Update real-time saat melakukan perubahan
- Menunjukkan hasil crop yang sebenarnya

## How to Use (Admin Panel)

### Step 1: Navigate to Pengurus Section

1. Login ke Admin Panel
2. Klik tab "Pengurus"
3. Form "Tambah Pengurus DPW" akan muncul

### Step 2: Upload Foto

**Option A: Drag & Drop**

- Klik area "📁 Klik atau drag file di sini"
- Atau drag file langsung ke area tersebut
- Preview akan muncul setelah upload

**Option B: Traditional Click**

- Klik area upload
- Pilih file dari komputer
- Preview akan muncul

### Step 3: Crop Foto

1. Hover di atas preview gambar
2. Klik tombol "✂️ Crop" atau langsung klik gambar
3. Crop Modal akan terbuka

### Step 4: Edit Gambar

Di dalam Crop Modal:

**Rapsiun Aspek (Recommended: 1:1)**

- Pilih preset rasio yang sesuai
- Untuk foto profil pengurus, gunakan 1:1
- Button akan highlight menunjukkan pilihan aktif

**Zoom**

- Gunakan slider atau tombol +/-
- Lihat preview di panel kanan
- Tekan enter atau tunggu untuk update real-time

**Rotasi**

- Klik "⟳ Putar 90°" untuk rotasi searah jarum jam
- Klik "⟲ Putar -90°" untuk rotasi berlawanan arah

**Transform**

- "↔ Horizontal": Balik kiri-kanan
- "↕ Vertikal": Balik atas-bawah

**Reset**

- Klik "↺ Reset" untuk kembalikan ke posisi asli

### Step 5: Simpan Crop

1. Setelah puas dengan hasil
2. Klik tombol biru "✓ Simpan Crop" di bawah
3. Gambar yang di-crop akan kembali ke preview form
4. Lanjutkan dengan mengisi data pengurus lainnya

### Step 6: Submit Form

1. Isi data pengurus:
   - Nama Lengkap
   - Jabatan
2. Klik "Tambah Pengurus" atau "Simpan Perubahan" (jika edit)

## Tips & Tricks

### Untuk Foto Profil Circular

- Gunakan rasio **1:1** (default untuk pengurus)
- Posisikan wajah di tengah crop area
- Pastikan guides (garis-garis pemandu) sejajar dengan fitur penting

### Untuk Zoom Sempurna

- Mulai dari zoom normal (1x)
- Zoom in untuk menghilangkan area yang tidak perlu
- Jangan zoom terlalu tinggi (distorsi)

### Ketika Foto Miring

- Gunakan tombol rotate 90° beberapa kali sampai posisi benar
- Atau gunakan flip jika gambar terbalik

### Kualitas Terbaik

- Upload gambar dengan resolusi tinggi (min 400x400 px)
- Format: PNG (lossless) atau JPG (compressed)
- Hindari gambar blur atau low resolution

## Keyboard Shortcuts

- Saat di Crop Modal:
  - `Escape`: Tutup modal (batal)
  - `Enter`: Simpan crop (jika tersedia)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers yang support Cropper.js

## Troubleshooting

### Gambar tidak muncul

- Pastikan file gambar valid (PNG/JPG/GIF)
- Cek ukuran file (< 5MB)
- Coba refresh halaman

### Preview tidak update

- Tunggu beberapa detik
- Klik area gambar untuk trigger update manual
- Close dan buka crop modal lagi

### Crop tidak tersimpan

- Pastikan klik tombol "✓ Simpan Crop" (biru)
- Cek console browser (F12) untuk error
- Coba edit lagi

### Rasio aspek terkunci

- Klik preset rasio untuk change
- Klik "Bebas" untuk unlock rasio

## Technical Details

### File Upload Validation

```
- Format: image/png, image/jpeg, image/gif
- Max Size: 5MB
- Recommended: 400x400px minimum
```

### Crop Output

- Format: PNG (lossless)
- Quality: 95%
- Max Canvas: 4096x4096px

### Integration

- Library: Cropper.js v1.5.13
- UI Framework: Tailwind CSS v4
- Validation: SweetAlert2

## Support

Untuk bantuan lebih lanjut:

1. Cek console browser (F12 > Console) untuk error messages
2. Screenshot hasil untuk dokumentasi
3. Contact admin support dengan detail masalah

---

**Last Updated**: March 17, 2026
**Version**: 2.1 (Enhanced UI with Windows Photo-like Interface)
