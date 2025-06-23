let livres = [
  {
    id: crypto.randomUUID(),
    titre: "Le Seigneur des Anneaux",
    auteur: "J.R.R. Tolkien",
    statut: "a-lire",
    note: "",
    commentaire: "",
  },
  {
    id: crypto.randomUUID(),
    titre: "1984",
    auteur: "George Orwell",
    statut: "en-cours",
    note: "",
    commentaire: "",
  },
  {
    id: crypto.randomUUID(),
    titre: "L'Alchimiste",
    auteur: "Paulo Coelho",
    statut: "termines",
    note: "5",
    commentaire: "Très inspirant.",
  },
];

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
