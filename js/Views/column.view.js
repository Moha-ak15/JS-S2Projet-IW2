import { creerCarteLivre } from "./book.view.js";
import {
  changementStatut,
  detailsLivre,
} from "../Controller/library.controller.js";

const zones = {
  "a-lire": document.getElementById("a-lire"),
  "en-cours": document.getElementById("en-cours"),
  termines: document.getElementById("termines"),
};

export function afficherTousLesLivres(livres) {
  Object.values(zones).forEach((zone) => (zone.innerHTML = ""));
  livres.forEach((livre) => {
    const carte = creerCarteLivre(livre);
    zones[livre.statut].appendChild(carte);
  });
  activerDragAndDrop();
}

function activerDragAndDrop() {
  Object.entries(zones).forEach(([statut, zone]) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("drag-hover");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("drag-hover");
    });

    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("drag-hover");

      const id = e.dataTransfer.getData("text/plain");
      changementStatut(id, statut);
    });
  });
}
