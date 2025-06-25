let livres = [];

export async function chargerDataJSON() {
  const response = await fetch("./data/data.json");
  if (!response.ok) {
    throw new Error("Erreur du chargement des livres.");
  }
  const data = await response.json();
  livres = data.map((livre) => ({
    id: crypto.randomUUID(),
    ...livre,
  }));
}

export function getLivres() {
  return livres;
}

export function ajouterLivre(nouveauLivre) {
  livres.push({
    id: crypto.randomUUID(),
    ...nouveauLivre,
    note: "",
    commentaire: "",
  });
}

export function modifierLivre(id, donnees) {
  const index = livres.findIndex((l) => l.id === id);
  if (index !== -1) {
    livres[index] = { ...livres[index], ...donnees };
  }
}

export function supprimerLivre(id) {
  livres = livres.filter((l) => l.id !== id);
}

export function changerStatut(id, nouveauStatut) {
  modifierLivre(id, { statut: nouveauStatut });
}

export function getLivreParId(id) {
  return livres.find((l) => l.id === id);
}

export function sauvegarderDansLocalStorage() {
  localStorage.setItem("bibliotheque", JSON.stringify(livres));
}

export function chargerDepuisLocalStorage() {
  const donnees = localStorage.getItem("bibliotheque");
  if (donnees) {
    livres = JSON.parse(donnees);
  }
}
