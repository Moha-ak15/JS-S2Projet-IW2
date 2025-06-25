import "./Controller/library.controller.js";
import {
  chargerDataJSON,
  chargerDepuisLocalStorage,
  getLivres,
} from "./Models/library.model.js";

import { afficherLoader, cacherLoader } from "./Views/loader.view.js";

import { afficherTousLesLivres } from "./Views/column.view.js";

document.addEventListener("DOMContentLoaded", async () => {
  afficherLoader();

  try {
    await chargerDataJSON();
    chargerDepuisLocalStorage();
    afficherTousLesLivres(getLivres());
  } catch (e) {
    console.error("Erreur lors du chargement :", e);
  } finally {
    cacherLoader();
  }
});
