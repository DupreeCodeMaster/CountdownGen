// script.js
let interval;

function startCountdown() {
  clearInterval(interval);
  document.getElementById("message").textContent = "";
  document.querySelectorAll(".firework").forEach(fw => fw.style.opacity = "0");

  const title = document.getElementById("title").value;
  const datetime = document.getElementById("date").value;
  const endDate = new Date(datetime);

  document.getElementById("countdown-title").textContent = title;

  interval = setInterval(() => {
    const now = new Date();
    const diff = endDate - now;

    if (diff <= 0) {
      clearInterval(interval);
      document.getElementById("countdown").textContent = "00:00:00:00";
      document.getElementById("message").textContent = "🎉 Congratulations, have fun!";
      document.querySelectorAll(".firework").forEach(fw => fw.style.opacity = "1");
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("countdown").textContent =
      `${String(days).padStart(2, '0')}d : ` +
      `${String(hours).padStart(2, '0')}h : ` +
      `${String(minutes).padStart(2, '0')}m : ` +
      `${String(seconds).padStart(2, '0')}s`;
  }, 1000);

  // URL für Wiederverwendung + QR
  const link = `${location.origin}${location.pathname}#title=${encodeURIComponent(title)}&date=${encodeURIComponent(datetime)}`;
  new QRious({
    element: document.getElementById("qr"),
    value: link,
    size: 200
  });
}

// Automatisch starten, wenn Parameter in URL sind
window.onload = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);

  if (params.has("title")) {
    document.getElementById("title").value = decodeURIComponent(params.get("title"));
    document.getElementById("countdown-title").textContent = params.get("title");
  }
  if (params.has("date")) {
    document.getElementById("date").value = decodeURIComponent(params.get("date"));
  }
  if (params.has("title") && params.has("date")) {
    startCountdown();
  }
};
