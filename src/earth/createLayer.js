import * as THREE from "three";
import { layerExplanations } from "./layers.js";

// LOAD TEXTURES
const textureLoader = new THREE.TextureLoader();
export const earthTexture = textureLoader.load("/textures/earth_map.jpg");
export const mantleTexture = textureLoader.load("/textures/mantle_map.jpg");
export const outerCoreTexture = textureLoader.load("/textures/outer_core_map.webp");

// FUNCTION PENCIPTAAN GEOMETRI LAYER
export function createLayer(
  radius,
  color,
  isFullSphere = false,
  isRightHalfCrust = false
) {
  let sphereGeo;
  if (isFullSphere && !isRightHalfCrust) {
    sphereGeo = new THREE.SphereGeometry(radius, 32, 32);
  } else if (isRightHalfCrust) {
    sphereGeo = new THREE.SphereGeometry(radius, 32, 32, 0, Math.PI);
  } else {
    sphereGeo = new THREE.SphereGeometry(radius, 32, 32, 0, Math.PI);
  }

  let mat;
  if (color === layerExplanations["Crust"].color) {
    // CRUST → gunakan texture bumi
    mat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      side: THREE.DoubleSide,
    });
  } else if (color === layerExplanations["Mantle"].color) {
    // MANTLE → gunakan texture mantle dengan sedikit emissive
    mat = new THREE.MeshStandardMaterial({
      map: mantleTexture,
      emissive: 0x442200,
      emissiveIntensity: 0.3,
      side: THREE.DoubleSide,
    });
  } else if (color === layerExplanations["Outer Core"].color) {
    // OUTER CORE → gunakan texture dengan emissive untuk efek panas
    mat = new THREE.MeshStandardMaterial({
      map: outerCoreTexture,
      emissive: 0xff6600,
      emissiveIntensity: 0.5,
      side: THREE.DoubleSide,
    });
  } else {
    // INNER CORE → material yang memancarkan cahaya terang (seperti matahari)
    mat = new THREE.MeshBasicMaterial({
      color: 0xff6633,
      side: THREE.DoubleSide,
    });
  }

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
