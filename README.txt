FAIRY GARDEN INVITATION — PANDUAN SINGKAT

1. Cara menjalankan
   - Ekstrak folder fairy-garden-invitation.
   - Buka file index.html menggunakan Google Chrome, Microsoft Edge, atau browser lain.
   - Koneksi internet diperlukan untuk memuat font dan beberapa foto contoh dari Unsplash.

2. Mengubah nama, tanggal, acara, lokasi, dan rekening
   - Buka file script.js dengan VS Code atau Notepad.
   - Edit bagian const CONFIG = { ... } di bagian paling atas.
   - Untuk tanggal countdown, gunakan format ISO, misalnya:
     eventDate: "2026-12-20T08:00:00+08:00"
   - Ganti whatsapp dengan nomor tujuan berformat kode negara tanpa tanda +.
     Contoh: "62812xxxxxxxx".

3. Mengganti foto
   - Edit URL gambar pada file style.css.
   - Cari bagian .hero-photo, .photo-bride, .photo-groom, .gallery-one,
     .gallery-two, dan .gallery-three.
   - Ganti URL Unsplash dengan URL foto milik Anda atau file lokal.
   - Untuk file lokal, simpan foto pada folder assets, lalu gunakan contoh:
     background-image: url("assets/foto-pasangan.jpg");

4. Menambahkan musik
   - Simpan file musik MP3 yang Anda miliki secara sah pada folder assets.
   - Beri nama file: backsound.mp3
   - Tombol musik berada di kanan atas setelah undangan dibuka.

5. Fitur RSVP dan ucapan
   - Form RSVP menambahkan ucapan ke daftar pada browser yang sedang dipakai.
   - Data contoh disimpan dengan localStorage, sehingga belum tersimpan ke server
     dan tidak otomatis terlihat di perangkat tamu lain.
   - Agar semua tamu mengirim data ke satu dashboard, perlu ditambahkan backend
     seperti Laravel + database atau layanan database online.

CATATAN
Ini adalah template mandiri bergaya Fairy Garden, bukan salinan kode atau aset
khusus Momenkasih. Tautan contoh yang diberikan tidak dapat dimuat langsung saat
pembuatan, jadi detail visualnya tidak dapat dicocokkan piksel demi piksel.
