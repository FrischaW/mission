// Pesan yang akan ditampilkan
const MESSAGE_TEXT = [
  "Selamat ulang tahun, Mei🎂",
  "Tau ini telat banget yaa… maafkeun😅",
  "Semoga kamu selalu bahagia terus yaa Mei.",
  "Makasih mei udah jadi temen yang baik (meskipun kadang ngeselin wkwk) tapi serius, kamu tuh selalu bikin ketawa. Kalo kata Fahrun tuh, kalo sedih harus ingat kalo selalu ada badut Meifha yang selalu menghibur🤭. thanks ya mei udh mau jadi badutku wkwkw.",
  "ini sedikit alay se tapi jujur semenjak kita temenan aku berasa jadi makin berwarna....",
  "gimana yak, kyk ngerasa Frischa yang dulu tuh balik lagi (aku tau dirimu pasti ketawa baca iki jujur aku pun merasa alay, tapi gapapa lah yaa...)",
  "dan jujur aku kangen sekelas pliss😢 meskipun kita nggak sekelas lgi, tpi tiap ketemu tuh kek auto full battery lagi anjay wkwkw dan ga boong kadang aku kesel dirimu slowrep:(",
  "tapi aku ngerti kok, emang cuma kesel ae tapi ga yang kesel bgt paham ga sihh",
  "Apalagi ya? Hmm...",
  "Semoga segala doa yang disemogakan segera tersemogakan yak, Oh ya, semoga semua sedih yang sempet dirasain belakangan ini diganti sama kebahagiaan yang lebih banyak lagi.",
  "Semoga ke depannya kita nggak pernah jadi asing ya Mei… awas aja lek asing!!!",
  "Semangat semester 5 nya dan ditunggu mie ayamnya🍜🐔",
  "- Chacaw"
].join("\n\n");

// Navigasi antar screen
const screens = [...document.querySelectorAll(".screen")];
function show(id) {
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo({ top: 0 });
}

// Pindah screen
document.addEventListener("click", e => {
  const el = e.target.closest("[data-goto]");
  if (!el) return;
  show(el.dataset.goto);
});

// Modal pesan
const overlay = document.getElementById("overlay");
const messageEl = document.getElementById("message");
const progress = document.getElementById("progress");
const readBtn = document.getElementById("readBtn");
const closeBtn = document.getElementById("closeMsg");

function typeWriter(el, text, speed = 26) {
  return new Promise(resolve => {
    el.textContent = "";
    let i = 0;
    progress.textContent = "Menulis...";
    const timer = setInterval(() => {
      el.textContent += text[i++];
      if (i >= text.length) {
        clearInterval(timer);
        progress.textContent = "Selesai ✓";
        resolve();
      }
    }, speed);
  });
}

readBtn.addEventListener("click", async () => {
  overlay.classList.add("open");
  await typeWriter(messageEl, MESSAGE_TEXT);
});
closeBtn.addEventListener("click", () => {
  overlay.classList.remove("open");
  messageEl.textContent = "";
  progress.textContent = "";
});
overlay.addEventListener("click", e => {
  if (e.target === overlay) closeBtn.click();
});

// ==== Toast helper ====
const toast = document.getElementById("toast");
let toastTimer;
function showToast(msg, duration = 2800){
  if(!toast) return alert(msg); // fallback kalau elemen toast belum ada
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), duration);
}

// ==== Klik B’day Gift -> tampilkan pesan ====
const giftBtn = document.getElementById("giftBtn");
if (giftBtn) {
  giftBtn.addEventListener("click", () => {
    // Pesan kecilnya di sini:
    showToast("Ayok ketemu duluu😊");

    // (Opsional) konfeti mini — butuh CDN canvas-confetti di HTML
    if (typeof confetti === "function") {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    }
  });
}

// Tampilkan screen pertama
show("start");
