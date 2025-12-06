// DATA PENJELASAN LAPISAN BUMI UNTUK SMP
export const layerExplanations = {
  Crust: {
    name: "Crust (Kerak Bumi)",
    shortInfo:
      "Kerak Bumi adalah lapisan terluar tempat kita hidup. Ketebalan kerak samudra sekitar 6 km, sedangkan kerak benua sekitar 40 km. Kerak tersusun dari batuan seperti basalt dan granit, dan bermanfaat sebagai tempat hidup makhluk hidup serta menyediakan sumber daya alam.",

    fullInfo:
      "Kerak Bumi adalah lapisan paling luar dan merupakan tempat berlangsungnya kehidupan. Kerak terbagi menjadi dua jenis yaitu kerak samudra dan kerak benua. Kerak samudra berada di bawah lautan dan memiliki ketebalan sekitar 6 sampai 7 km, tersusun dari batuan basalt yang lebih padat. Kerak benua berada di daratan, lebih tebal yaitu antara 16 sampai 80 km dengan rata-rata sekitar 41 km, dan tersusun dari batuan granit yang lebih ringan. Kerak ini sering mengalami perubahan karena pergerakan lempeng dan dapat memicu gempa atau pembentukan gunung berapi.\n\nInformasi Penting:\n• Ketebalan kerak samudra 6–7 km\n• Ketebalan kerak benua 16–80 km (rata-rata 41 km)\n• Komposisi utama basalt & granit\n• Termasuk lapisan paling tipis\n• Tempat terjadinya gempa dan pembentukan gunung",
    color: 0x4caf50,
  },
  Mantle: {
    name: "Mantle (Mantel Bumi)",
    shortInfo:
      "Mantle adalah lapisan paling tebal, terletak di bawah Crust. Sebagian besar terdiri dari batuan padat yang panas, namun lapisan atasnya (Astenosfer) bisa bergerak sangat lambat seperti cairan kental. Pergerakan lambat ini yang menyebabkan lempeng Bumi bergerak (Tectonic Plates)!",
    fullInfo:
      "Mantel merupakan lapisan terbesar dalam struktur Bumi dengan ketebalan sekitar 2900 km. Mantel tersusun dari batuan padat yang sangat panas dan dapat bergerak perlahan. Gerakan ini menyebabkan terjadinya arus panas dari dalam Bumi ke permukaan, yang menggerakkan lempeng dan memunculkan peristiwa seperti gempa, pembentukan pegunungan, dan gunung berapi.\n\nInformasi Penting:\n• Ketebalan mantel sekitar 2900 km\n• Menyusun 84% volume Bumi\n• Tersusun dari batuan kaya magnesium & besi\n• Batuan padat namun dapat bergerak lambat\n• Gerakan mantel menggerakkan lempeng Bumi",
    color: 0xffc107,
  },
  "Outer Core": {
    name: "Outer Core (Inti Luar)",
    shortInfo:
      "Inti luar adalah lapisan logam cair setebal sekitar 2200 km. Pergerakan cairan besi dan nikel membentuk medan magnet Bumi yang melindungi kita dari radiasi Matahari.",
    fullInfo:
      "Inti luar terletak di bawah mantel dan terdiri dari logam cair yang sangat panas, terutama besi dan nikel. Inti luar memiliki ketebalan sekitar 2200 km. Karena suhunya sangat tinggi, logam di sini tetap cair. Pergerakan logam cair inilah yang menghasilkan medan magnet Bumi, yang sangat penting karena melindungi Bumi dari radiasi Matahari dan membantu arah kompas.\n\nInformasi Penting:\n• Ketebalan inti luar sekitar 2200 km\n• Tersusun dari besi cair dan sedikit nikel\n• Suhu sangat tinggi\n• Gerakan logam cair membentuk medan magnet Bumi",
    color: 0xff5722,
  },
  "Inner Core": {
    name: "Inner Core (Inti Dalam)",
    shortInfo:
      "Inti dalam adalah bola logam padat di pusat Bumi dengan suhu 5000–6000°C. Walau panas, tekanannya sangat besar sehingga tetap padat dan membantu membentuk medan magnet Bumi.",
    fullInfo:
      "Inti dalam adalah pusat Bumi yang berbentuk bola logam padat. Meskipun suhunya mencapai 5000–6000°C, tekanan yang sangat besar membuat inti dalam tetap padat. Inti dalam terutama terdiri dari besi dengan sedikit nikel. Inti dalam bekerja bersama inti luar dalam membentuk medan magnet Bumi dan menjaga kestabilan struktur bagian dalam Bumi.\n\nInformasi Penting:\n• Radius inti dalam 1200–1250 km\n• Tersusun dari besi & sedikit nikel\n• Suhu 5000–6000°C\n• Sangat padat karena tekanan ekstrem\n• Membantu pembentukan medan magnet Bumi",
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
