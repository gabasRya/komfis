// DATA PENJELASAN LAPISAN BUMI UNTUK SMP
export const layerExplanations = {
  Crust: {
    name: "Crust (Kerak Bumi)",
    detail:
      "Crust adalah lapisan terluar dan paling tipis. Di sinilah kita hidup! Crust dibagi menjadi Crust Kontinental (daratan) yang tebal dan Crust Samudra (di bawah laut) yang tipis. Lapisan ini padat dan keras.",
    color: 0x4caf50,
  },
  Mantle: {
    name: "Mantle (Mantel Bumi)",
    detail:
      "Mantle adalah lapisan paling tebal, terletak di bawah Crust. Sebagian besar terdiri dari batuan padat yang panas, namun lapisan atasnya (Astenosfer) bisa bergerak sangat lambat seperti cairan kental. Pergerakan lambat ini yang menyebabkan lempeng Bumi bergerak (Tectonic Plates)!",
    color: 0xffc107,
  },
  "Outer Core": {
    name: "Outer Core (Inti Luar)",
    detail:
      "Outer Core adalah cairan panas yang didominasi oleh besi dan nikel. Pergerakan cairan logam ini menciptakan medan magnet Bumi (Magnetosfer) yang sangat penting untuk melindungi kita dari radiasi Matahari.",
    color: 0xff5722,
  },
  "Inner Core": {
    name: "Inner Core (Inti Dalam)",
    detail:
      "Inner Core adalah bola padat di pusat Bumi. Walaupun suhunya sangat panas (setara permukaan Matahari!), tekanan ekstrem membuat besi dan nikel di sini tetap padat. Inti Dalam adalah bagian terpanas dari Bumi.",
    color: 0xff0000,
  },
};

// LAPISAN BUMI (dari luar ke dalam)
export const layersConfig = [
  {
    name: "Crust",
    radius: 1.5,
    color: layerExplanations["Crust"].color,
    isFullSphere: false,
    info: "Crust (5-70km)",
  },
  {
    name: "Mantle",
    radius: 1.2,
    color: layerExplanations["Mantle"].color,
    isFullSphere: false,
    info: "Mantle (2950km)",
  },
  {
    name: "Outer Core",
    radius: 0.9,
    color: layerExplanations["Outer Core"].color,
    isFullSphere: false,
    info: "Outer core (2200km)",
  },
  {
    name: "Inner Core",
    radius: 0.6,
    color: layerExplanations["Inner Core"].color,
    isFullSphere: true,
    info: "Inner core (1270km)",
  },
];
