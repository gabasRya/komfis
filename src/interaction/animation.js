import * as THREE from "three";
import { isExpanded } from "./raycaster.js";
import {
  innerLayers,
  rightCrustMesh,
  layerLabels,
  crustLabelObject,
  crustLine,
} from "../earth/earthGroup.js";
import { layersConfig } from "../earth/layers.js";

// KONSTANTA ANIMASI
const EXPAND_OFFSET_INCREMENT = 0.3;
const ANIMATION_SPEED = 0.05;
const CRUST_RIGHT_HIDE_POS = 10;

// PARAMETER UNTUK PENATAAN LABEL
const LABEL_FINAL_X = 2.0;
const LABEL_Y_SPACING = 0.6;
const CRUST_LABEL_Y_START = 2.0;

export function startAnimation(scene, camera, renderer, labelRenderer, controls) {
  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    if (isExpanded) {
      // Lapisan keluar
      for (let i = 0; i < innerLayers.length; i++) {
        const targetOffsetX = (i + 1) * EXPAND_OFFSET_INCREMENT;
        innerLayers[i].position.x +=
          (targetOffsetX - innerLayers[i].position.x) * ANIMATION_SPEED;
        layerLabels[i].initialX = innerLayers[i].position.x;
      }

      // Crust kanan menghilang
      rightCrustMesh.position.x +=
        (CRUST_RIGHT_HIDE_POS - rightCrustMesh.position.x) * ANIMATION_SPEED;
    } else {
      // Lapisan masuk
      for (let i = 0; i < innerLayers.length; i++) {
        innerLayers[i].position.x +=
          (0 - innerLayers[i].position.x) * ANIMATION_SPEED;
        layerLabels[i].initialX = innerLayers[i].position.x;
      }

      // Crust kanan muncul kembali
      rightCrustMesh.position.x +=
        (0 - rightCrustMesh.position.x) * ANIMATION_SPEED;
    }

    // UPDATE POSISI LABEL DAN GARIS
    if (isExpanded) {
      // --- 1. CRUST ---
      const crustRadius = layersConfig[0].radius;
      const crustYTarget = CRUST_LABEL_Y_START;
      crustLabelObject.position.set(LABEL_FINAL_X, crustYTarget, 0);

      // P1: Titik dekat permukaan Crust (45 derajat)
      const crustP1 = new THREE.Vector3(
        -(crustRadius * Math.cos(Math.PI / 4)),
        crustRadius * Math.sin(Math.PI / 4),
        0
      );

      // P2: Titik label
      const crustP2 = new THREE.Vector3(LABEL_FINAL_X - 0.1, crustYTarget, 0);

      // Update garis Crust
      crustLine.geometry.setFromPoints([crustP1, crustP2]);
      crustLine.geometry.attributes.position.needsUpdate = true;

      // --- 2. LAPISAN DALAM (Mantle, Outer Core, Inner Core) ---
      layerLabels.forEach((item, index) => {
        const layerIndex = index + 1;
        const currentLayerX = item.initialX;

        // Y target untuk label
        const yTarget = CRUST_LABEL_Y_START - (index + 1) * LABEL_Y_SPACING;

        // Perhitungan Offset Y yang Disesuaikan
        let startYOffset;
        let horizontalOffset;

        // Mantle (layerIndex 1)
        if (layerIndex === 1) {
          startYOffset = layersConfig[1].radius * 0.9;
          horizontalOffset = 0.3;
        }
        // Outer Core (layerIndex 2)
        else if (layerIndex === 2) {
          startYOffset = layersConfig[2].radius * 0.7;
          horizontalOffset = 0.25;
        }
        // Inner Core (layerIndex 3)
        else {
          startYOffset = layersConfig[3].radius * -0.4;
          horizontalOffset = 0.2;
        }

        // P1: Titik awal di permukaan potongan lapisan
        const p1 = new THREE.Vector3(currentLayerX, startYOffset, 0);

        // P2: Titik belok horizontal
        const p2 = new THREE.Vector3(
          currentLayerX + horizontalOffset,
          startYOffset,
          0
        );

        // P3: Titik akhir garis
        const p3 = new THREE.Vector3(LABEL_FINAL_X - 0.1, yTarget, 0);

        // Update posisi label
        item.label.position.set(LABEL_FINAL_X, yTarget, 0);

        // Update garis (3 titik: P1 -> P2 -> P3)
        const linePoints = [p1, p2, p3];
        item.line.geometry.setFromPoints(linePoints);
        item.line.geometry.attributes.position.needsUpdate = true;
      });
    }

    labelRenderer.render(scene, camera);
    renderer.render(scene, camera);
  }

  animate();
}
