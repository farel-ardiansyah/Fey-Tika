FAIRY GARDEN INVITATION — PANDUAN SINGKAT

1. Cara menjalankan
   - Ekstrak folder fairy-garden-invitation.
   - Buka file index.html menggunakan Google Chrome, Microsoft Edge, atau browser lain.
   - Koneksi internet diperlukan untuk memuat font dan file lokal di folder assets.

2. Mengubah nama, tanggal, acara, lokasi, dan rekening
   - Buka file script.js dengan VS Code atau Notepad.
   - Edit bagian const CONFIG = { ... } di bagian paling atas.
   - Untuk tanggal countdown, gunakan format ISO, misalnya:
     eventDate: "2026-12-20T08:00:00+08:00"
   - Ganti whatsapp dengan nomor tujuan berformat kode negara tanpa tanda +.
     Contoh: "62812xxxxxxxx".

3. Foto prewedding (sudah terpasang)
   Semua file ada di folder assets/ :
   - Sampul undangan   : prewed-4.jpeg  (diatur di style.css, bagian .cover)
   - Foto oval utama   : prewed-1.jpeg  (style.css, .p-oval)
   - Mempelai pria     : prewed-7.jpeg  (style.css, .p-groom)
   - Mempelai wanita   : prewed-8.jpeg  (style.css, .p-bride)
   - Foto bulat penutup: prewed-3.jpeg  (style.css, .p-round)
   - Galeri Kenangan   : 9 foto + 1 video (prewed-10.mp4) di index.html,
     bagian <div class="gal">. Ketuk foto untuk memperbesar, geser atau
     pakai tombol panah untuk pindah foto. Saat video diputar, musik latar
     otomatis dijeda lalu dilanjutkan lagi.
   - Mengganti foto galeri: ubah data-src dan src pada tombol .gallery-photo.
     Atur bagian wajah yang ditampilkan dengan nilai --pos (contoh 50% 20%).
   - prewed-10-poster.jpg adalah gambar sampul video di galeri.

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