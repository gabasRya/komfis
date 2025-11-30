import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import './style.css'; 

// [Kode Setup Three.js: Scene, Camera, Renderer, Controls, Light, earthGroup, LayersConfig, dll. seperti sebelumnya]
// (Hanya menyalin bagian yang diubah atau ditambahkan di bawah)

// SCENE
const scene = new THREE.Scene();

// Tambahkan Ambient Light agar semua sisi terlihat jelas
const ambientLight = new THREE.AmbientLight(0x404040, 3);
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 4);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- CSS2DRenderer UNTUK LABEL TEKS ---
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none'; 
document.body.appendChild(labelRenderer.domElement);

// --- ORBIT CONTROLS ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false; 
controls.minDistance = 2; 
controls.maxDistance = 10; 

// LIGHT
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 2);
scene.add(light);

// GROUP UTAMA untuk semua objek Bumi
const earthGroup = new THREE.Group();
scene.add(earthGroup);

// --- FUNCTION PENCIPTAAN GEOMETRI ---

function createLayer(radius, color, isFullSphere = false, isRightHalfCrust = false) {
  let sphereGeo;
  
  if (isFullSphere && !isRightHalfCrust) { 
    sphereGeo = new THREE.SphereGeometry(radius, 32, 32);
  } else if (isRightHalfCrust) { 
    sphereGeo = new THREE.SphereGeometry(radius, 32, 32, 0, Math.PI);
  } else { 
    sphereGeo = new THREE.SphereGeometry(radius, 32, 32, 0, Math.PI);
  }
  
  const mat = new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide }); 
  const mesh = new THREE.Mesh(sphereGeo, mat);
  
  if (!isFullSphere) {
    if (isRightHalfCrust) {
      mesh.rotation.y = Math.PI / 2; 
    } else {
      mesh.rotation.y = -Math.PI / 2; 
    }
  }
  
  return mesh;
}

// --- DATA PENJELASAN BARU UNTUK SMP ---
const layerExplanations = {
    'Crust': {
        name: 'Crust (Kerak Bumi)',
        detail: 'Crust adalah lapisan terluar dan paling tipis. Di sinilah kita hidup! Crust dibagi menjadi Crust Kontinental (daratan) yang tebal dan Crust Samudra (di bawah laut) yang tipis. Lapisan ini padat dan keras.',
        color: 0x4CAF50
    },
    'Mantle': {
        name: 'Mantle (Mantel Bumi)',
        detail: 'Mantle adalah lapisan paling tebal, terletak di bawah Crust. Sebagian besar terdiri dari batuan padat yang panas, namun lapisan atasnya (Astenosfer) bisa bergerak sangat lambat seperti cairan kental. Pergerakan lambat ini yang menyebabkan lempeng Bumi bergerak (Tectonic Plates)!',
        color: 0xFFC107
    },
    'Outer Core': {
        name: 'Outer Core (Inti Luar)',
        detail: 'Outer Core adalah cairan panas yang didominasi oleh besi dan nikel. Pergerakan cairan logam ini menciptakan medan magnet Bumi (Magnetosfer) yang sangat penting untuk melindungi kita dari radiasi Matahari.',
        color: 0xFF5722
    },
    'Inner Core': {
        name: 'Inner Core (Inti Dalam)',
        detail: 'Inner Core adalah bola padat di pusat Bumi. Walaupun suhunya sangat panas (setara permukaan Matahari!), tekanan ekstrem membuat besi dan nikel di sini tetap padat. Inti Dalam adalah bagian terpanas dari Bumi.',
        color: 0xFF0000
    }
};

// LAPISAN BUMI (dari luar ke dalam)
const layersConfig = [
  { name: 'Crust', radius: 1.5, color: layerExplanations['Crust'].color, isFullSphere: false, info: 'Crust (5-70km)' }, 
  { name: 'Mantle', radius: 1.2, color: layerExplanations['Mantle'].color, isFullSphere: false, info: 'Mantle (2950km)' }, 
  { name: 'Outer Core', radius: 0.9, color: layerExplanations['Outer Core'].color, isFullSphere: false, info: 'Outer core (2200km)' }, 
  { name: 'Inner Core', radius: 0.6, color: layerExplanations['Inner Core'].color, isFullSphere: true, info: 'Inner core (1270km)' },
];

// Variabel untuk menyimpan objek mesh
let leftCrustMesh; 
let rightCrustMesh; 
const innerLayers = []; 
const layerLabels = []; 
const interactableObjects = []; // Tambahkan ini untuk Raycasting

// --- PEMBUATAN OBJEK ---
const crustConfig = layersConfig[0];
leftCrustMesh = createLayer(crustConfig.radius, crustConfig.color, crustConfig.isFullSphere);
leftCrustMesh.userData.layerName = crustConfig.name; // Tambahkan nama lapisan
earthGroup.add(leftCrustMesh);
interactableObjects.push(leftCrustMesh);

rightCrustMesh = createLayer(crustConfig.radius, crustConfig.color, false, true);
rightCrustMesh.userData.layerName = crustConfig.name; // Tambahkan nama lapisan
earthGroup.add(rightCrustMesh);
interactableObjects.push(rightCrustMesh);


// Buat lapisan dalam, label, dan garis penunjuk
for (let i = 1; i < layersConfig.length; i++) {
  const layer = layersConfig[i];
  const mesh = createLayer(layer.radius, layer.color, layer.isFullSphere);
  mesh.position.x = 0; 
  mesh.userData.layerName = layer.name; // Tambahkan nama lapisan
  innerLayers.push(mesh);
  earthGroup.add(mesh);
  interactableObjects.push(mesh); // Tambahkan ke daftar interaktif

  // --- Buat Label Teks ---
  const div = document.createElement('div');
  div.className = 'label';
  div.textContent = layer.info;
  const label = new CSS2DObject(div);
  label.position.set(0, 0, 0); 
  label.visible = false; 
  earthGroup.add(label);

  // --- Buat Garis Penunjuk ---
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });
  const points = [];
  points.push(new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()); 
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  line.visible = false; 
  earthGroup.add(line);

  layerLabels.push({ mesh, label, line, initialX: 0 }); 
}

// --- Tambahkan Label Crust Utama (Label Object dan Line) ---
const crustLabelDiv = document.createElement('div');
crustLabelDiv.className = 'label';
crustLabelDiv.textContent = layersConfig[0].info;
const crustLabelObject = new CSS2DObject(crustLabelDiv);
crustLabelObject.position.set(0, 0, 0); 
crustLabelObject.visible = false; 
earthGroup.add(crustLabelObject);

const crustLineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
const crustLinePoints = [
  new THREE.Vector3(), new THREE.Vector3()
];
const crustLineGeo = new THREE.BufferGeometry().setFromPoints(crustLinePoints);
const crustLine = new THREE.Line(crustLineGeo, crustLineMat);
crustLine.visible = false; 
earthGroup.add(crustLine);

// Tambahkan label untuk "Structure of the Earth"
const titleDiv = document.createElement('div');
titleDiv.className = 'title-label';
titleDiv.textContent = 'Structure of the Earth';
const titleLabel = new CSS2DObject(titleDiv);
titleLabel.position.set(3, -2, 0); 
scene.add(titleLabel);


// --- INTERAKSI KLIK ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isExpanded = false; 
const EXPAND_OFFSET_INCREMENT = 0.3; 
const ANIMATION_SPEED = 0.05; 
const CRUST_RIGHT_HIDE_POS = 10; 

// Dapatkan elemen panel dari DOM
const infoPanel = document.getElementById('info-panel');
const panelTitle = document.getElementById('panel-title');
const panelContent = document.getElementById('panel-content');

// Fungsi untuk memperbarui panel penjelasan
function updateInfoPanel(layerName) {
    if (layerName && layerExplanations[layerName]) {
        const data = layerExplanations[layerName];
        panelTitle.textContent = data.name;
        panelContent.textContent = data.detail;
        
        // Opsional: Ubah warna border panel berdasarkan lapisan
        infoPanel.style.borderColor = `#${data.color.toString(16).padStart(6, '0')}`;
    }
}

// Inisialisasi panel saat aplikasi dimuat
updateInfoPanel('Crust'); // Set default atau biarkan seperti di HTML

function onMouseClick(event) {
  // Perhitungan posisi mouse seperti biasa
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // Ganti intersectObjects dengan array baru yang berisi semua objek yang dapat diklik
  const intersects = raycaster.intersectObjects(interactableObjects);

  if (intersects.length > 0) {
    // Objek pertama yang disentuh adalah lapisan yang diklik
    const clickedObject = intersects[0].object;
    const layerName = clickedObject.userData.layerName;

    // --- LOGIKA MENAMPILKAN PENJELASAN ---
    if (layerName) {
        updateInfoPanel(layerName);
    }
    
    // --- LOGIKA EXPAND/COLLAPSE (Seperti sebelumnya) ---
    if (clickedObject.userData.layerName === 'Crust') {
      isExpanded = !isExpanded; 
      // Segera set visibilitas label dan garis setelah klik
      crustLabelObject.visible = isExpanded;
      crustLine.visible = isExpanded;
      layerLabels.forEach(item => {
        item.label.visible = isExpanded;
        item.line.visible = isExpanded;
      });
    }
  }
}

window.addEventListener('click', onMouseClick, false);


// --- PARAMETER UNTUK PENATAAN LABEL DI ATAS ---
const LABEL_FINAL_X = 2.0; 
const LABEL_Y_SPACING = 0.6; 
const CRUST_LABEL_Y_START = 2.0;

// --- ANIMATION LOOP ---
function animate() {
  requestAnimationFrame(animate);

  controls.update(); 

  if (isExpanded) {
    // Lapisan keluar
    for (let i = 0; i < innerLayers.length; i++) {
      const targetOffsetX = (i + 1) * EXPAND_OFFSET_INCREMENT; 
      innerLayers[i].position.x += (targetOffsetX - innerLayers[i].position.x) * ANIMATION_SPEED;
      layerLabels[i].initialX = innerLayers[i].position.x; 
    }
    // Crust kanan menghilang
    rightCrustMesh.position.x += (CRUST_RIGHT_HIDE_POS - rightCrustMesh.position.x) * ANIMATION_SPEED;
  } else {
    // Lapisan masuk
    for (let i = 0; i < innerLayers.length; i++) {
      innerLayers[i].position.x += (0 - innerLayers[i].position.x) * ANIMATION_SPEED;
      layerLabels[i].initialX = innerLayers[i].position.x; 
    }
    // Crust kanan muncul kembali
    rightCrustMesh.position.x += (0 - rightCrustMesh.position.x) * ANIMATION_SPEED;
  }

  // --- UPDATE POSISI LABEL DAN GARIS UNTUK LAPISAN DALAM ---
  if (isExpanded) {
    
    // --- 1. CRUST ---
    const crustRadius = layersConfig[0].radius;
    const crustYTarget = CRUST_LABEL_Y_START; 
    crustLabelObject.position.set(LABEL_FINAL_X, crustYTarget, 0);

    // P1: Titik dekat permukaan Crust (misal 45 derajat)
    const crustP1 = new THREE.Vector3(
      -(crustRadius * Math.cos(Math.PI / 4)), 
      crustRadius * Math.sin(Math.PI / 4), 
      0
    );
    // P2: Titik label (LABEL_FINAL_X, crustYTarget)
    const crustP2 = new THREE.Vector3(LABEL_FINAL_X - 0.1, crustYTarget, 0); 

    // Update garis Crust (Garis Miring Saja)
    crustLine.geometry.setFromPoints([crustP1, crustP2]);
    crustLine.geometry.attributes.position.needsUpdate = true;


    // --- 2. LAPISAN DALAM (Mantle, Outer Core, Inner Core) ---
    layerLabels.forEach((item, index) => {
      const layerIndex = index + 1;
      const currentLayerX = item.initialX; 
      
      // Y target untuk label 
      const yTarget = CRUST_LABEL_Y_START - ((index + 1) * LABEL_Y_SPACING);

        // --- Perhitungan Offset Y yang Disesuaikan (Panah Rapi) ---
        let startYOffset;
        let horizontalOffset;
        
        // Mantle (layerIndex 1)
        if (layerIndex === 1) { 
            startYOffset = layersConfig[1].radius * 0.9; 
            horizontalOffset = 0.3; 
        } 
        // Outer Core (layerIndex 2)
        else if (layerIndex === 2) { 
            startYOffset = layersConfig[2].radius * 0.7; // Ditingkatkan
            horizontalOffset = 0.25; 
        }
        // Inner Core (layerIndex 3)
        else { 
            startYOffset = layersConfig[3].radius * -0.4; 
            horizontalOffset = 0.2; 
        }
        
        // P1: Titik awal di permukaan potongan lapisan
        const p1 = new THREE.Vector3(
          currentLayerX, 
          startYOffset, 
          0
        );

        // P2: Titik belok horizontal 
        const p2 = new THREE.Vector3(
          currentLayerX + horizontalOffset, 
          startYOffset, 
          0
        );

        // P3: Titik akhir garis
        const p3 = new THREE.Vector3(
          LABEL_FINAL_X - 0.1, 
          yTarget, 
          0
        );
      
      // Update posisi label
      item.label.position.set(LABEL_FINAL_X, yTarget, 0); 

      // Update garis (3 titik: P1 -> P2 -> P3)
      const linePoints = [
          p1, 
          p2, 
          p3  
      ];

      item.line.geometry.setFromPoints(linePoints);
      item.line.geometry.attributes.position.needsUpdate = true;
    });
  }


  labelRenderer.render(scene, camera);
  renderer.render(scene, camera);
}
animate();

// RESIZE
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight); 
});