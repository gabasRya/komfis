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

export function setupClickHandler(camera, interactableObjects) {
  function onMouseClick(event) {
    // Perhitungan posisi mouse
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(interactableObjects);

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      const layerName = clickedObject.userData.layerName;

      // LOGIKA MENAMPILKAN PENJELASAN
      if (layerName) {
        updateInfoPanel(layerName);
      }

      // LOGIKA EXPAND/COLLAPSE
      if (clickedObject.userData.layerName === "Crust") {
        isExpanded = !isExpanded;

        // Set visibilitas label dan garis setelah klik
        crustLabelObject.visible = isExpanded;
        crustLine.visible = isExpanded;
        layerLabels.forEach((item) => {
          item.label.visible = isExpanded;
          item.line.visible = isExpanded;
        });
      }
    }
  }

  window.addEventListener("click", onMouseClick, false);
}
