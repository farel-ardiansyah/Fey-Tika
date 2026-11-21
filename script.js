/* =====================================================
   FAIRY GARDEN WEDDING INVITATION
   JavaScript - Version 2
===================================================== */


/* =====================================================
   1. PENGATURAN UNDANGAN
   Ubah data di bagian ini sesuai data pernikahan.
===================================================== */

const CONFIG = {

    // Urutan tampil di cover, beranda & penutup: Fey & Tika
    groom: {
        firstName: "Fey",
        fullName: "Ferry",
        parents: "Putra dari (Alm.) Bapak Memen & Ibu Nenih Sunaenih",
        instagram: "https://instagram.com/kang_fey22"
    },

    bride: {
        firstName: "Tika",
        fullName: "Dewi Sartika Basir",
        parents: "Putri dari Bapak C. Dg. Sewang & Ibu Juniati",
        instagram: "https://instagram.com/dwsartika23"
    },

    wedding: {
        date: "2026-12-06T11:00:00+08:00",
        dateLabel: "Ahad, 06 Desember 2026",
        coverDate: "06 Desember 2026"
    },

    event: {
        time: "Pukul 11.00 WITA – Selesai",
        address: "Jl. Abd. Kadir Dg. Suro",
        map: "https://maps.app.goo.gl/Ta6cRN8S6Mw4n6nu6?g_st=iw"
    },

    bank: {
        name: "BANK BCA",
        account: "8260498925",
        holder: "Dewi Sartika Basir"
    }

};


/* =====================================================
   2. FUNGSI DASAR
===================================================== */

function setText(id, value) {

    const element = document.getElementById(id);

    if (element && value !== undefined) {
        element.textContent = value;
    }

}


function setLink(id, url) {

    const element = document.getElementById(id);

    if (!element) return;

    try {

        const parsedUrl = new URL(url, window.location.href);

        if (
            parsedUrl.protocol !== "http:" &&
            parsedUrl.protocol !== "https:"
        ) {
            throw new Error("URL tidak valid");
        }

        element.href = parsedUrl.href;

    } catch (error) {

        element.removeAttribute("href");

    }

}


/* =====================================================
   3. MEMASUKKAN DATA MEMPELAI
===================================================== */

function loadCoupleData() {

    // Nama pada cover, beranda & penutup (Fey lebih dulu, lalu Tika)

    setText("coverFirst", CONFIG.groom.firstName);
    setText("coverSecond", CONFIG.bride.firstName);

    setText("heroFirst", CONFIG.groom.firstName);
    setText("heroSecond", CONFIG.bride.firstName);

    setText("closingFirst", CONFIG.groom.firstName);
    setText("closingSecond", CONFIG.bride.firstName);


    // Nama lengkap & orang tua

    setText("brideFullName", CONFIG.bride.fullName);
    setText("groomFullName", CONFIG.groom.fullName);

    setText("brideParents", CONFIG.bride.parents);
    setText("groomParents", CONFIG.groom.parents);


    // Instagram

    const brideSocial = document.getElementById("brideSocial");
    const groomSocial = document.getElementById("groomSocial");

    if (CONFIG.bride.instagram) {
        setLink("brideSocial", CONFIG.bride.instagram);
    } else if (brideSocial) {
        brideSocial.hidden = true;
    }

    if (CONFIG.groom.instagram) {
        setLink("groomSocial", CONFIG.groom.instagram);
    } else if (groomSocial) {
        groomSocial.hidden = true;
    }

}


/* =====================================================
   4. MEMASUKKAN DATA ACARA
===================================================== */

function loadEventData() {

    setText("coverDate", CONFIG.wedding.coverDate);
    setText("countdownDate", CONFIG.wedding.dateLabel);

    setText("eventDate", CONFIG.wedding.dateLabel);
    setText("eventTime", CONFIG.event.time);
    setText("eventAddress", CONFIG.event.address);

    setLink("eventMap", CONFIG.event.map);

    setText("heroDate", CONFIG.wedding.coverDate.toUpperCase());

    // Tombol "Tambah ke Kalender" (Google Calendar)
    const start = new Date(CONFIG.wedding.date);

    if (!Number.isNaN(start.getTime())) {

        const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);

        const fmt = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");

        const calUrl =
            "https://calendar.google.com/calendar/render?action=TEMPLATE" +
            "&text=" + encodeURIComponent("Pernikahan " + CONFIG.groom.firstName + " & " + CONFIG.bride.firstName) +
            "&dates=" + fmt(start) + "/" + fmt(end) +
            "&location=" + encodeURIComponent(CONFIG.event.address);

        setLink("eventCal", calUrl);
        setLink("calBtn", calUrl);

    }

}


/* Kalender bulan acara (disorot pada tanggal pernikahan) */

function renderCalendar() {

    const grid = document.getElementById("calGrid");

    if (!grid) return;

    const s = CONFIG.wedding.date;

    const year = Number(s.slice(0, 4));
    const month = Number(s.slice(5, 7)) - 1;
    const day = Number(s.slice(8, 10));

    if (!year || month < 0) return;

    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    setText("calMonth", months[month]);

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    grid.replaceChildren();

    for (let i = 0; i < firstDay; i++) {
        grid.appendChild(document.createElement("span"));
    }

    for (let d = 1; d <= totalDays; d++) {

        const cell = document.createElement("span");

        cell.textContent = d;

        if (d === day) cell.className = "hl";

        grid.appendChild(cell);

    }

}


/* Menandai ikon navigasi sesuai bagian yang sedang dilihat */

function setupNavHighlight() {

    const links = document.querySelectorAll(".mobile-nav a");

    const sections = document.querySelectorAll("[data-nav]");

    if (!("IntersectionObserver" in window) || !sections.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const key = entry.target.getAttribute("data-nav");

            links.forEach((link) => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + key
                );
            });

        });

    }, { threshold: 0.45 });

    sections.forEach((section) => observer.observe(section));

}


/* =====================================================
   5. DATA AMPLOP DIGITAL
===================================================== */

function loadBankData() {

    setText("bankName", CONFIG.bank.name);
    setText("bankAccount", CONFIG.bank.account);
    setText("bankHolder", CONFIG.bank.holder);

}


/* =====================================================
   6. NAMA TAMU UNDANGAN DARI URL
===================================================== */

function loadGuestName() {

    const params = new URLSearchParams(window.location.search);

    const guest = params.get("to") || params.get("guest");

    const guestName = document.getElementById("guestName");

    if (guestName && guest && guest.trim()) {

        guestName.textContent = guest.trim();

    } else if (guestName) {

        guestName.textContent = "Teman-teman";

    }

}


/* =====================================================
   7. TOMBOL BUKA UNDANGAN
===================================================== */

function openInvitation() {

    const cover = document.getElementById("cover");
    const invitation = document.getElementById("invitation");

    if (!cover || !invitation) return;

    cover.classList.add("hide");

    invitation.classList.add("show");

    invitation.setAttribute("aria-hidden", "false");

    document.body.classList.remove("is-locked");

    // Mulai animasi latar
    startFairyAnimation();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // Mencoba memutar musik setelah interaksi pengguna

    const music = document.getElementById("backgroundMusic");

    if (music) {

        music.play()
            .then(() => {
                updateMusicButton(true);
            })
            .catch(() => {
                updateMusicButton(false);
            });

    }

}



/* =====================================================
   7B. ANIMASI LATAR (KELOPAK + KUNANG-KUNANG)
   Dimulai setelah tombol "Buka Undangan" diklik.
===================================================== */

let fairyStarted = false;

function startFairyAnimation() {

    if (fairyStarted) return;

    const canvas = document.getElementById("fairyCanvas");

    if (!canvas) return;

    // Hormati pengaturan "kurangi gerakan" pada perangkat
    if (window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    fairyStarted = true;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const petals = [];
    const fireflies = [];

    const petalColors = [
        "rgba(244, 196, 208, 0.80)",
        "rgba(250, 226, 232, 0.85)",
        "rgba(255, 255, 255, 0.80)",
        "rgba(214, 229, 205, 0.80)"
    ];

    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    function resize() {

        dpr = Math.min(window.devicePixelRatio || 1, 2);

        width = canvas.clientWidth || window.innerWidth;
        height = canvas.clientHeight || window.innerHeight;

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    }

    function createPetal(startAbove) {

        return {
            x: rand(0, width),
            y: startAbove ? rand(-height * 0.2, -10) : rand(0, height),
            size: rand(6, 12),
            speedY: rand(0.5, 1.2),
            drift: rand(-0.35, 0.35),
            sway: rand(0.6, 1.6),
            swayPhase: rand(0, Math.PI * 2),
            rotation: rand(0, Math.PI * 2),
            spin: rand(-0.02, 0.02),
            color: petalColors[Math.floor(Math.random() * petalColors.length)]
        };

    }

    function createFirefly() {

        return {
            x: rand(0, width),
            y: rand(0, height),
            radius: rand(1.6, 3.2),
            vx: rand(-0.25, 0.25),
            vy: rand(-0.25, 0.25),
            phase: rand(0, Math.PI * 2),
            pulse: rand(0.015, 0.035)
        };

    }

    function populate() {

        const isMobile = width < 700;

        const petalCount = isMobile ? 14 : 26;
        const fireflyCount = isMobile ? 16 : 30;

        petals.length = 0;
        fireflies.length = 0;

        for (let i = 0; i < petalCount; i++) {
            petals.push(createPetal(false));
        }

        for (let i = 0; i < fireflyCount; i++) {
            fireflies.push(createFirefly());
        }

    }

    function drawPetal(p) {

        ctx.save();

        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.55, p.size, 0, 0, Math.PI * 2);
        ctx.fill();

        // garis tengah kelopak
        ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
        ctx.lineWidth = 0.6;

        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.8);
        ctx.lineTo(0, p.size * 0.8);
        ctx.stroke();

        ctx.restore();

    }

    function drawFirefly(f) {

        const glow = 0.35 + 0.65 * ((Math.sin(f.phase) + 1) / 2);

        const gradient = ctx.createRadialGradient(
            f.x, f.y, 0,
            f.x, f.y, f.radius * 6
        );

        gradient.addColorStop(0, "rgba(255, 236, 160, " + (0.9 * glow) + ")");
        gradient.addColorStop(0.4, "rgba(255, 224, 130, " + (0.35 * glow) + ")");
        gradient.addColorStop(1, "rgba(255, 224, 130, 0)");

        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius * 6, 0, Math.PI * 2);
        ctx.fill();

    }

    function frame() {

        ctx.clearRect(0, 0, width, height);

        petals.forEach((p, index) => {

            p.swayPhase += 0.02;

            p.y += p.speedY;
            p.x += p.drift + Math.sin(p.swayPhase) * p.sway * 0.5;
            p.rotation += p.spin;

            if (p.y > height + 20 || p.x < -30 || p.x > width + 30) {
                petals[index] = createPetal(true);
            }

            drawPetal(p);

        });

        fireflies.forEach((f) => {

            f.phase += f.pulse;

            f.x += f.vx + Math.sin(f.phase * 0.7) * 0.15;
            f.y += f.vy + Math.cos(f.phase * 0.6) * 0.15;

            if (f.x < -20) f.x = width + 20;
            if (f.x > width + 20) f.x = -20;
            if (f.y < -20) f.y = height + 20;
            if (f.y > height + 20) f.y = -20;

            drawFirefly(f);

        });

        requestAnimationFrame(frame);

    }

    resize();
    populate();

    window.addEventListener("resize", () => {
        resize();
        populate();
    });

    canvas.classList.add("active");

    requestAnimationFrame(frame);

}


/* =====================================================
   8. FITUR MUSIK LATAR
===================================================== */

function updateMusicButton(isPlaying) {

    const button = document.getElementById("musicToggle");

    if (!button) return;

    button.classList.toggle("playing", isPlaying);

    button.textContent = isPlaying ? "♫" : "♪";

    button.title = isPlaying
        ? "Matikan musik"
        : "Putar musik";

    button.setAttribute(
        "aria-label",
        isPlaying ? "Matikan musik" : "Putar musik"
    );

    button.setAttribute(
        "aria-pressed",
        String(isPlaying)
    );

}


function toggleMusic() {

    const music = document.getElementById("backgroundMusic");

    if (!music) return;

    if (music.paused) {

        music.play()
            .then(() => {
                updateMusicButton(true);
            })
            .catch(() => {
                updateMusicButton(false);
                alert("Musik belum dapat diputar. Periksa file backsound.mp3.");
            });

    } else {

        music.pause();

        updateMusicButton(false);

    }

}


/* =====================================================
   9. COUNTDOWN PERNIKAHAN
===================================================== */

function updateCountdown() {

    const targetDate = new Date(CONFIG.wedding.date).getTime();

    const now = Date.now();

    let difference = targetDate - now;

    if (Number.isNaN(targetDate)) {
        console.error("Tanggal pernikahan tidak valid.");
        return;
    }

    if (difference < 0) {
        difference = 0;
    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    setText("days", String(days).padStart(2, "0"));

    setText("hours", String(hours).padStart(2, "0"));

    setText("minutes", String(minutes).padStart(2, "0"));

    setText("seconds", String(seconds).padStart(2, "0"));

}


/* =====================================================
   10. FITUR GALERI FOTO
===================================================== */

function setupGallery() {

    const galleryPhotos = document.querySelectorAll(".gallery-photo");

    const lightbox = document.getElementById("lightbox");

    const lightboxContent = document.getElementById("lightboxContent");

    const closeButton = document.getElementById("closeLightbox");


    if (!lightbox || !lightboxContent) return;


    galleryPhotos.forEach((photo) => {

        photo.addEventListener("click", () => {

            const imageBackground = window
                .getComputedStyle(photo)
                .backgroundImage;

            if (
                !imageBackground ||
                imageBackground === "none"
            ) {
                return;
            }

            lightboxContent.style.backgroundImage = imageBackground;

            lightboxContent.textContent = "";

            lightbox.classList.add("open");

            lightbox.setAttribute("aria-hidden", "false");

        });

    });


    function closeGallery() {

        lightbox.classList.remove("open");

        lightbox.setAttribute("aria-hidden", "true");

    }


    if (closeButton) {

        closeButton.addEventListener("click", closeGallery);

    }


    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {

            closeGallery();

        }

    });


    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains("open")
        ) {

            closeGallery();

        }

    });

}


/* =====================================================
   11. RSVP DAN UCAPAN
===================================================== */

const STORAGE_KEY = "fairyGardenWeddingMessagesV2";


function getSavedWishes() {

    try {

        const saved = localStorage.getItem(STORAGE_KEY);

        return saved ? JSON.parse(saved) : [];

    } catch (error) {

        console.error("Gagal membaca data ucapan:", error);

        return [];

    }

}


function saveWishes(wishes) {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(wishes)
        );

        return true;

    } catch (error) {

        console.error("Gagal menyimpan data ucapan:", error);

        return false;

    }

}


function renderWishes() {

    const wishesList = document.getElementById("wishesList");

    if (!wishesList) return;

    const wishes = getSavedWishes();

    wishesList.replaceChildren();


    if (wishes.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.className = "empty-wishes";

        emptyMessage.textContent =
            "Belum ada ucapan. Jadilah yang pertama mengirimkan doa.";

        wishesList.appendChild(emptyMessage);

        return;

    }


    // Menampilkan ucapan terbaru lebih dahulu

    wishes.slice().reverse().forEach((wish) => {

        const item = document.createElement("article");

        item.className = "wish-item";


        const name = document.createElement("strong");

        name.textContent = wish.name;


        const status = document.createElement("span");

        status.textContent =
            wish.status + " • " + wish.guests + " orang";


        const message = document.createElement("p");

        message.textContent = wish.message || "Terima kasih atas konfirmasinya.";


        item.appendChild(name);

        item.appendChild(status);

        item.appendChild(message);

        wishesList.appendChild(item);

    });

}


function setupRSVP() {

    const form = document.getElementById("rsvpForm");

    const formNote = document.getElementById("formNote");

    if (!form) return;


    form.addEventListener("submit", (event) => {

        event.preventDefault();


        const formData = new FormData(form);


        const name = String(
            formData.get("name") || ""
        ).trim();

        const status = String(
            formData.get("status") || ""
        );

        const guests = String(
            formData.get("guests") || "1"
        );

        const message = String(
            formData.get("message") || ""
        ).trim();


        if (!name || !status) {

            alert("Silakan lengkapi nama dan konfirmasi kehadiran.");

            return;

        }


        const newWish = {

            name: name,

            status: status,

            guests: guests,

            message: message,

            createdAt: new Date().toISOString()

        };


        const wishes = getSavedWishes();

        wishes.push(newWish);


        const success = saveWishes(wishes);


        if (success) {

            renderWishes();

            form.reset();

            if (formNote) {

                formNote.textContent =
                    "Terima kasih! Konfirmasi dan ucapan berhasil disimpan di browser ini.";

            }

        } else {

            if (formNote) {

                formNote.textContent =
                    "Data tidak berhasil disimpan. Periksa pengaturan penyimpanan browser.";

            }

        }

    });

}


/* =====================================================
   12. SALIN NOMOR REKENING
===================================================== */

async function copyBankAccount() {

    const account = CONFIG.bank.account;

    const button = document.getElementById("copyAccount");

    if (!button) return;


    try {

        if (navigator.clipboard && window.isSecureContext) {

            await navigator.clipboard.writeText(account);

        } else {

            const temporaryInput = document.createElement("textarea");

            temporaryInput.value = account;

            temporaryInput.style.position = "fixed";

            temporaryInput.style.opacity = "0";

            document.body.appendChild(temporaryInput);

            temporaryInput.select();

            const copied = document.execCommand("copy");

            temporaryInput.remove();

            if (!copied) {
                throw new Error("Gagal menyalin rekening");
            }

        }


        button.textContent = "✓ Berhasil disalin";

        button.classList.add("copied");


        setTimeout(() => {

            button.textContent = "Salin nomor rekening";

            button.classList.remove("copied");

        }, 2500);


    } catch (error) {

        console.error("Gagal menyalin rekening:", error);

        alert("Nomor rekening: " + account);

    }

}


/* =====================================================
   13. ANIMASI SAAT SCROLL
===================================================== */

function setupScrollAnimation() {

    const elements = document.querySelectorAll(
        ".oval, .hero-art, .gazebo, .quote-section .quote, " +
        ".section-heading, .person-card, " +
        ".countdown div, .event-card, " +
        ".story-item, .gallery-photo, " +
        ".rsvp-form, .bank-card, " +
        ".closing-section h2"
    );


    elements.forEach((element) => {

        element.classList.add("reveal");

    });


    if (!("IntersectionObserver" in window)) {

        elements.forEach((element) => {

            element.classList.add("active");

        });

        return;

    }


    const observer = new IntersectionObserver(

        (entries, currentObserver) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    currentObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    elements.forEach((element) => {

        observer.observe(element);

    });

}


/* =====================================================
   14. NAVIGASI MOBILE
===================================================== */

function setupMobileNavigation() {

    const links = document.querySelectorAll(".mobile-nav a");

    links.forEach((link) => {

        link.addEventListener("click", () => {

            const target = document.querySelector(link.getAttribute("href"));

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

}


/* =====================================================
   15. EVENT LISTENER
===================================================== */

function setupEventListeners() {

    const openButton = document.getElementById("openInvitation");

    const musicButton = document.getElementById("musicToggle");

    const copyButton = document.getElementById("copyAccount");


    if (openButton) {

        openButton.addEventListener("click", openInvitation);

    }


    if (musicButton) {

        musicButton.addEventListener("click", toggleMusic);

    }


    if (copyButton) {

        copyButton.addEventListener("click", copyBankAccount);

    }

}


/* =====================================================
   16. INISIALISASI WEBSITE
===================================================== */

function initializeInvitation() {

    console.log(
        "Fairy Garden Wedding Invitation berhasil dijalankan."
    );


    // Memuat seluruh data undangan

    loadCoupleData();

    loadEventData();

    loadBankData();

    loadGuestName();

    renderCalendar();


    // Mengaktifkan fitur

    setupEventListeners();

    setupGallery();

    setupRSVP();

    setupMobileNavigation();

    setupScrollAnimation();

    setupNavHighlight();


    // Menampilkan ucapan yang telah tersimpan

    renderWishes();


    // Mengaktifkan countdown

    updateCountdown();

    setInterval(updateCountdown, 1000);


    // Kondisi awal musik

    updateMusicButton(false);

}


// Menjalankan website setelah HTML selesai dimuat

document.addEventListener(
    "DOMContentLoaded",
    initializeInvitation
);