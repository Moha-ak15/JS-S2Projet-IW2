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
