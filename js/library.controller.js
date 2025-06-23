import {
  getLivres,
  ajouterLivre,
  changerStatut,
  getLivreParId,
  sauvegarderDansLocalStorage,
  chargerDepuisLocalStorage,
  modifierLivre,
  supprimerLivre,
} from "./library.model.js";

import { afficherTousLesLivres, afficherModalLivre } from "./library.view.js";

document.addEventListener("DOMContentLoaded", () => {
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
