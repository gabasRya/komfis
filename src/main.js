import "./style.css";

// Import modules
import {
  scene,
  camera,
  renderer,
  labelRenderer,
  controls,
  setupResizeHandler,
} from "./scene/setup.js";
import { createStarfield } from "./scene/starfield.js";
import { interactableObjects } from "./earth/earthGroup.js";
import { initInfoPanel } from "./ui/infoPanel.js";
import { setupClickHandler } from "./interaction/raycaster.js";
import { startAnimation } from "./interaction/animation.js";
import { layerExplanations } from "./earth/layers.js";

//  NAVBAR — Generate Layer Menu
const menuContainer = document.getElementById("layer-menu");

Object.keys(layerExplanations).forEach((key) => {
  const li = document.createElement("li");

  li.textContent = layerExplanations[key].name.split(" (")[0];
  li.dataset.layer = key;

  li.addEventListener("click", () => {
    console.log("[NAVBAR] clicked:", key);

    const targetObject = interactableObjects.find(
      (obj) => obj.userData.layerName === key
    );

    console.log("[NAVBAR] targetObject found:", targetObject);

    if (targetObject) {
      window.dispatchEvent(
        new CustomEvent("layer-clicked", {
          detail: { object: targetObject },
        })
      );
    } else {
      console.warn("[NAVBAR] Mesh NOT FOUND for:", key);
    }
  });

  menuContainer.appendChild(li);
});

// Tambahkan starfield ke scene
scene.add(createStarfield());

// Inisialisasi UI
initInfoPanel();

// Setup interaksi klik
setupClickHandler(camera, interactableObjects);

// Setup resize handler
setupResizeHandler();

// Mulai animasi
startAnimation(scene, camera, renderer, labelRenderer, controls);
