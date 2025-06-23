// ✅ view.js

import { changementStatut, detailsLivre } from "./library.controller.js";

const zones = {
  "a-lire": document.getElementById("a-lire"),
  "en-cours": document.getElementById("en-cours"),
  "termines": document.getElementById("termines")
}


export function afficherTousLesLivres(livres) {
  Object.values(zones).forEach((zone) => (zone.innerHTML = ""));
  livres.forEach((livre) => {
    const carte = creerCarteLivre(livre);
    zones[livre.statut].appendChild(carte);
  });
}

function creerCarteLivre(livre) {
  const carte = document.createElement("div");
  carte.className = "card mb-3";

  const body = document.createElement("div");
  body.className = "card-body";

  const titre = document.createElement("h5");
  titre.className = "card-title";
  titre.innerText = livre.titre;

  const auteur = document.createElement("p");
  auteur.className = "card-text";
  auteur.innerText = `Auteur : ${livre.auteur}`;

  const btnDetail = document.createElement("button");
  btnDetail.className = "btn btn-sm btn-outline-primary me-1";
  btnDetail.innerText = "Détails";
  btnDetail.addEventListener("click", () => detailsLivre(livre.id));

  const btnEdit = document.createElement("button");
  btnEdit.className = "btn btn-sm btn-outline-warning me-1";
  btnEdit.innerText = "✏️";
  btnEdit.addEventListener("click", () => {
    const nouveauTitre = prompt("Nouveau titre :", livre.titre);
    const nouvelAuteur = prompt("Nouvel auteur :", livre.auteur);
    const nouvelleNote = prompt("Note :", livre.note);
    const nouveauCommentaire = prompt("Commentaire :", livre.commentaire);
    if (nouveauTitre && nouvelAuteur !== null) {
      globalThis._gererModif(livre.id, {
        titre: nouveauTitre,
        auteur: nouvelAuteur,
        note: nouvelleNote,
        commentaire: nouveauCommentaire,
      });
    }
  });

  const btnSupprimer = document.createElement("button");
  btnSupprimer.className = "btn btn-sm btn-outline-danger me-1";
  btnSupprimer.innerText = "🗑️";
  btnSupprimer.addEventListener("click", () => {
    if (confirm("Supprimer ce livre ?")) {
      globalThis._gererSupp(livre.id);
    }
  });

  const btnSuivant = document.createElement("button");
  btnSuivant.className = "btn btn-sm btn-outline-success";
  btnSuivant.innerText = "→";
  btnSuivant.addEventListener("click", () => {
    const prochain = prochainStatut(livre.statut);
    changementStatut(livre.id, prochain);
  });

  body.appendChild(titre);
  body.appendChild(auteur);
  body.appendChild(btnDetail);
  body.appendChild(btnEdit);
  body.appendChild(btnSupprimer);
  if (livre.statut !== "termines") body.appendChild(btnSuivant);

  carte.appendChild(body);
  return carte;
}


function prochainStatut(statut) {
  if (statut === "a-lire") return "en-cours";
  if (statut === "en-cours") return "termines";
  return "termines";
}

export function afficherModalLivre(livre) {
  const zone = document.getElementById("contenu-modal");
  zone.innerHTML = `
    <h5>${livre.titre}</h5>
    <p><strong>Auteur :</strong> ${livre.auteur}</p>
    <p><strong>Statut :</strong> ${livre.statut}</p>
    <p><strong>Note :</strong> ${livre.note || "–"}</p>
    <p><strong>Commentaire :</strong> ${livre.commentaire || "–"}</p>
  `;
  const modal = new bootstrap.Modal(document.getElementById("modalDetails"));
  modal.show();
}
