import { detailsLivre } from "../Controller/library.controller.js";

export function creerCarteLivre(livre) {
  const carte = document.createElement("div");
  carte.className = "card mb-3";
  carte.draggable = true;
  carte.dataset.id = livre.id;

  // Drag start event
  carte.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", livre.id);
  });

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

  carte.draggable = true;

  carte.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", livre.id);
    carte.classList.add("dragging");
  });

  carte.addEventListener("dragend", () => {
    carte.classList.remove("dragging");
  });

  body.appendChild(titre);
  body.appendChild(auteur);
  body.appendChild(btnDetail);
  body.appendChild(btnEdit);
  body.appendChild(btnSupprimer);
  carte.appendChild(body);
  return carte;
}
