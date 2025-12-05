import "./style.css";

// Import modules
import { scene, camera, renderer, labelRenderer, controls, setupResizeHandler } from "./scene/setup.js";
import { createStarfield } from "./scene/starfield.js";
import { interactableObjects } from "./earth/earthGroup.js";
import { initInfoPanel } from "./ui/infoPanel.js";
import { setupClickHandler } from "./interaction/raycaster.js";
import { startAnimation } from "./interaction/animation.js";

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
