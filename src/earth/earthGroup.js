import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { layersConfig } from "./layers.js";
import { createLayer } from "./createLayer.js";
import { scene } from "../scene/setup.js";

// GROUP UTAMA untuk semua objek Bumi
export const earthGroup = new THREE.Group();

// Variabel untuk menyimpan objek mesh
export let leftCrustMesh;
export let rightCrustMesh;
export const innerLayers = [];
export const layerLabels = [];
export const interactableObjects = [];

// --- PEMBUATAN OBJEK CRUST ---
const crustConfig = layersConfig[0];
leftCrustMesh = createLayer(
  crustConfig.radius,
  crustConfig.color,
  crustConfig.isFullSphere
);
leftCrustMesh.userData.layerName = crustConfig.name;
earthGroup.add(leftCrustMesh);
interactableObjects.push(leftCrustMesh);

rightCrustMesh = createLayer(crustConfig.radius, crustConfig.color, false, true);
rightCrustMesh.userData.layerName = crustConfig.name;
earthGroup.add(rightCrustMesh);
interactableObjects.push(rightCrustMesh);

// Buat lapisan dalam, label, dan garis penunjuk
for (let i = 1; i < layersConfig.length; i++) {
  const layer = layersConfig[i];
  const mesh = createLayer(layer.radius, layer.color, layer.isFullSphere);
  mesh.position.x = 0;
  mesh.userData.layerName = layer.name;
  innerLayers.push(mesh);
  earthGroup.add(mesh);
  interactableObjects.push(mesh);

  // Tambahkan glow effect untuk Inner Core
  if (layer.name === "Inner Core") {
    // Buat sprite glow di belakang Inner Core
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = 128;
    glowCanvas.height = 128;
    const ctx = glowCanvas.getContext("2d");
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255, 100, 50, 1)");
    gradient.addColorStop(0.3, "rgba(255, 80, 30, 0.6)");
    gradient.addColorStop(0.6, "rgba(255, 50, 0, 0.3)");
    gradient.addColorStop(1, "rgba(255, 30, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);

    const glowTexture = new THREE.CanvasTexture(glowCanvas);
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glowSprite = new THREE.Sprite(glowMaterial);
    glowSprite.scale.set(2, 2, 1);
    mesh.add(glowSprite);
  }

  // --- Buat Label Teks ---
  const div = document.createElement("div");
  div.className = "label";
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

// --- Label Crust Utama ---
const crustLabelDiv = document.createElement("div");
crustLabelDiv.className = "label";
crustLabelDiv.textContent = layersConfig[0].info;
export const crustLabelObject = new CSS2DObject(crustLabelDiv);
crustLabelObject.position.set(0, 0, 0);
crustLabelObject.visible = false;
earthGroup.add(crustLabelObject);

const crustLineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
const crustLinePoints = [new THREE.Vector3(), new THREE.Vector3()];
const crustLineGeo = new THREE.BufferGeometry().setFromPoints(crustLinePoints);
export const crustLine = new THREE.Line(crustLineGeo, crustLineMat);
crustLine.visible = false;
earthGroup.add(crustLine);

// --- Label untuk "Structure of the Earth" ---
const titleDiv = document.createElement("div");
titleDiv.className = "title-label";
titleDiv.textContent = "Structure of the Earth";
export const titleLabel = new CSS2DObject(titleDiv);
titleLabel.position.set(3, -2, 0);

// Tambahkan ke scene utama
scene.add(earthGroup);
scene.add(titleLabel);
