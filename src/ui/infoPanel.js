import { layerExplanations } from "../earth/layers.js";

const infoPanel = document.getElementById("info-panel");

// Ringkas
const panelTitle = document.getElementById("panel-title");
const panelContent = document.getElementById("panel-content");

// Detail
const layerTitle = document.getElementById("layer-title");
const layerShort = document.getElementById("layer-short"); // akan dikosongkan
const layerFull = document.getElementById("layer-full");

// Toggle
const toggleBtn = document.getElementById("panel-toggle-btn");
let isDetailOpen = false;

// Convert bullet string → HTML bullet list
function formatFullInfo(text) {
  const splitPoint = text.indexOf("Informasi Penting:");

  // Jika tidak ada bagian "Informasi Penting"
  if (splitPoint === -1) return `<p>${text}</p>`;

  // Pisahkan intro dan poin penting
  const intro = text.substring(0, splitPoint).trim();
  const bulletPart = text
    .substring(splitPoint + "Informasi Penting:".length)
    .trim();

  // Ambil bullet "•"
  const bulletItems = bulletPart
    .split("•")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  // Susun ulang menjadi HTML rapi
  return `
    <p>${intro}</p>
    <br>
    <strong>Informasi Penting:</strong>
    <ul>
      ${bulletItems.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

export function updateInfoPanel(layerName) {
  const data = layerExplanations[layerName];
  if (!data) return;

  // Ringkas
  panelTitle.textContent = data.name;
  panelContent.textContent = data.shortInfo;

  // Detail
  layerTitle.textContent = data.name;

  // Short info disembunyikan di mode detail
  layerShort.style.display = "none";

  // Format bullet point di full info
  layerFull.innerHTML = formatFullInfo(data.fullInfo);

  // Border color
  infoPanel.style.borderColor = `#${data.color.toString(16).padStart(6, "0")}`;
}

toggleBtn.addEventListener("click", () => {
  isDetailOpen = !isDetailOpen;

  document.getElementById("panel-summary").style.display = isDetailOpen
    ? "none"
    : "block";

  document.getElementById("panel-detail").style.display = isDetailOpen
    ? "block"
    : "none";

  // Short info hanya muncul di ringkasan, bukan detail
  layerShort.style.display = "none";

  toggleBtn.textContent = isDetailOpen ? "Tutup Detail" : "Lihat Detail";
});

export function initInfoPanel() {
  updateInfoPanel("Crust");
}
