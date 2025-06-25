import {
  getLivres,
  ajouterLivre,
  changerStatut,
  getLivreParId,
  sauvegarderDansLocalStorage,
  chargerDepuisLocalStorage,
  modifierLivre,
  supprimerLivre,
  chargerDataJSON,
} from "../Models/library.model.js";

import { afficherLoader, cacherLoader } from "../Views/loader.view.js";

import { afficherModalLivre } from "../Views/modal.view.js";
import { afficherTousLesLivres } from "../Views/column.view.js";
import { afficherToaster } from "../Views/toaster.view.js";

document.addEventListener("DOMContentLoaded", async () => {
  await chargerDataJSON();
  chargerDepuisLocalStorage();
  afficherTousLesLivres(getLivres());

  document.getElementById("ajouter-btn").addEventListener("click", () => {
    const titre = prompt("Titre du livre :");
    const auteur = prompt("Auteur :");
    if (titre && auteur) {
      ajouterLivre({ titre, auteur, statut: "a-lire" });
      sauvegarderDansLocalStorage();
      afficherTousLesLivres(getLivres());
    }
  });

  globalThis._gererModif = editerLivre;
  globalThis._gererSupp = suppressionLivre;
});

export function changementStatut(id, nouveauStatut) {
  changerStatut(id, nouveauStatut);
  sauvegarderDansLocalStorage();
  afficherTousLesLivres(getLivres());

  afficherToaster("Livre déplacé vers : " + nouveauStatut, "success");
}

export function detailsLivre(id) {
  const livre = getLivreParId(id);
  if (livre) afficherModalLivre(livre);
}

function editerLivre(id, donnees) {
  modifierLivre(id, donnees);
  sauvegarderDansLocalStorage();
  afficherTousLesLivres(getLivres());
}

function suppressionLivre(id) {
  supprimerLivre(id);
  sauvegarderDansLocalStorage();
  afficherTousLesLivres(getLivres());
}

document.getElementById("loader").style.display = "none";
