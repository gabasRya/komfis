import { layerExplanations } from "../earth/layers.js";

// Dapatkan elemen panel dari DOM
const infoPanel = document.getElementById("info-panel");
const panelTitle = document.getElementById("panel-title");
const panelContent = document.getElementById("panel-content");

// Fungsi untuk memperbarui panel penjelasan
export function updateInfoPanel(layerName) {
  if (layerName && layerExplanations[layerName]) {
    const data = layerExplanations[layerName];
    panelTitle.textContent = data.name;
    panelContent.textContent = data.detail;

    // Ubah warna border panel berdasarkan lapisan
    infoPanel.style.borderColor = `#${data.color
      .toString(16)
      .padStart(6, "0")}`;
  }
}

// Inisialisasi panel saat aplikasi dimuat
export function initInfoPanel() {
  updateInfoPanel("Crust");
}
