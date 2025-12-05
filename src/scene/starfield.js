import * as THREE from "three";

// Buat texture bintang berupa lingkaran gradient
function generateStarTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;

  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);

  gradient.addColorStop(0.0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
  gradient.addColorStop(1.0, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createStarfield() {
  const starTexture = generateStarTexture();

  // Generate posisi bintang
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 4500;
  const starPositions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i++) {
    starPositions[i] = (Math.random() - 0.5) * 300;
  }

  starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(starPositions, 3)
  );

  // Material bulat, glow ringan
  const starMaterial = new THREE.PointsMaterial({
    map: starTexture,
    transparent: true,
    color: 0xffffff,
    size: 0.9,
    sizeAttenuation: true,
    depthWrite: false,
  });

  const starField = new THREE.Points(starGeometry, starMaterial);
  return starField;
}
