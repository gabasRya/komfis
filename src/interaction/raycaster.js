import * as THREE from "three";

import { updateInfoPanel } from "../ui/infoPanel.js";
import {
  crustLabelObject,
  crustLine,
  layerLabels,
} from "../earth/earthGroup.js";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// State expand/collapse
export let isExpanded = false;

export function setExpanded(value) {
  isExpanded = value;
}

/**
 * Fungsi pusat untuk menangani klik layer,
 * baik dari raycaster (klik objek 3D) maupun navbar.
 */
export function handleLayerClick(clickedObject) {
  if (!clickedObject || !clickedObject.userData) return;

  const layerName = clickedObject.userData.layerName;
  if (!layerName) return;

  // 1. Update panel info
  updateInfoPanel(layerName);

  // 2. Expand/Collapse jika layer adalah "Crust"
  if (layerName === "Crust") {
    isExpanded = !isExpanded;

    crustLabelObject.visible = isExpanded;
    crustLine.visible = isExpanded;

    layerLabels.forEach((item) => {
      item.label.visible = isExpanded;
      item.line.visible = isExpanded;
    });
  }
}

/**
 * Setup interaksi klik raycaster pada objek 3D.
 */
export function setupClickHandler(camera, interactableObjects) {
  function onMouseClick(event) {
    // Hitung posisi mouse
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(interactableObjects);

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      handleLayerClick(clickedObject); // pakai fungsi pusat
    }
  }

  window.addEventListener("click", onMouseClick, false);
}

// EVENT DARI NAVBAR
window.addEventListener("layer-clicked", (e) => {
  handleLayerClick(e.detail.object);
});
